import React, { Component } from 'react';
import { Form, Button } from 'antd';
// import Fade from 'react-reveal/Fade';
import { AntInput } from '../../../externalComponents/antd-fields';
import { HTTP, GetObjectFromArr, setFormStateValues, SetDatePicker, GetCurrentDate, SortableDateInTableData } from '../../../services';
import Export from './export';

class Fields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postLoader: false,
      getLoader: false,
      dataOptions: [],
      entriesFrom: [],
      statusListDL: [],
      formValues: {},
      // tableOverFlow: false,
      // colapseIcon: 'double-left',
      // tableOverFlowIcon: 'arrows-alt',
      // tableLabel: 'Generate Reports',
      // tableDesc1: 'You can filter and export reports',
      // customFilterCol: [],
      // fadeDuration: 500,
      fileName: false,
      reportResponseType: false,
      filePath: false
    }//End state
  }//End constructor

  formRef = React.createRef();

  onChangeField = (fieldName, fieldValue) => {
    this.setState({ formValues: setFormStateValues(this.state.formValues, fieldName, fieldValue) }, () => {
      //console.log(this.state.formValues);
    })
  }//End function

  submitForm = (values) => {

    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (err) { return false }

    this.props.postLoader(true);
    this.props.reportResponseType(false);
    this.setState({ postLoader: true });
    this.setState({ fileName: false, reportResponseType: false });
    HTTP('post', '/reporting/post/', values).then(res => {
      // console.log(res);
      this.setState({ postLoader: false });
      this.props.postLoader(false);
      if (!res) { return false; }
      this.setState({ fileName: res.fileName, reportResponseType: res.resType, filePath: res.filePath });
      this.props.reportResponseType(res.resType);
      if (res.resType === 'pdf') {
        this.props.filePath(res.filePath);
      } else {
        this.props.fileName(res.fileName);
        // console.log(res.tableData.column);
        res.tableData.column.forEach((item, key) => {
          if (item.sorter === 'string') { res.tableData.column[key].sorter = (a, b) => a[item['dataIndex']].localeCompare(b[item['dataIndex']]); }
          if (item.sorter === 'number') { res.tableData.column[key].sorter = (a, b) => a[item['dataIndex']] - b[item['dataIndex']]; }
          if (item.sorter === 'date') { res.tableData.column[key].sorter = SortableDateInTableData(item['dataIndex']); }
          if (item.sorter === 'amount') {
            res.tableData.column[key].sorter = res.tableData.column[key].sorter = (a, b) => a[item['dataIndex']] - b[item['dataIndex']];
            res.tableData.column[key].render = (text, row) => <span>{row[res.tableData.column[key].dataIndex + '_mod']}</span>
          }
        });

        res.tableData.otherDetails =
          ((values.entries_from !== '100') ?
            ('Status: ' + (values.status ? GetObjectFromArr(values.status, 'value', this.state.statusListDL).label : 'All'))
            : ''
          );
        // console.log(otherDetails);
        this.props.tableData(res.tableData);
      }//End if condition
    });
    // });
  }//End function

  // setEntriesFrom = (e) => {
  //   this.props.form.setFieldsValue({ entries_from: '' });
  //   this.setState({ entriesFrom: GetObjectFromArr(e, 'value', this.state.dataOptions.report_type).data })
  // }//End function

  render() {
    const fp = this.formRef.current;
    const st = this.state;
    const fv = this.state.formValues;
    const ocf = this.onChangeField;
    const dateLabelFrom = (fv.report_type === 'DL' && (fv.entries_from === '5')) ? "Inserted From" : "From Date";
    const dateLabelTo = (fv.report_type === 'DL' && (fv.entries_from === '5')) ? "Inserted To" : "To Date";
    //  console.log(fv.entries_from);
    return (
      <div>
        <Form ref={this.formRef} layout="vertical" onFinish={this.submitForm} className="reportFormContainer form-style-1" autoComplete="off">
          <b className="rep_fr_heading"><i className="las la-chart-bar" />Report Customization</b>

          {/* <AntInput type="select" label="Type" name="report_type" onChange={(e) => {
            ocf('report_type', e);
            this.setEntriesFrom(e);
          }} options={st.dataOptions.report_type} filter={true} loading={st.getLoader}  /> */}


          <AntInput type="select" label="Type" name="entries_from" onChange={(e) => {
            ocf('entries_from', e);
            fp.setFieldsValue({ column_preset_ref_id: '', status: '' });
            this.setState({ statusListDL: GetObjectFromArr(e, 'value', st.dataOptions).possible_status })
          }} options={st.dataOptions} filter={true} />

          {/* {JSON.stringify(st.statusListDL)} */}

          {(st.statusListDL.length > 0) &&
            <AntInput type="select" label="Status" name="status" onChange={(e) => ocf('status', e)} options={st.statusListDL} emptyFirstVal="All" filter={true} noRequired={true} />}

          {(fv.entries_from) &&
            <AntInput type="select" label="Column Presets" name="column_preset_ref_id" onChange={(e) => {
              ocf('column_preset_ref_id', e);
            }} options={
              GetObjectFromArr(fv.entries_from, 'value', st.dataOptions).data
            } filter={true} />}

          <AntInput label={dateLabelFrom} type="datepicker" name="from_date" onChange={(e) => ocf('from_date', e)} placeholder="Please select date" noRequired={true} />
          <AntInput label={dateLabelTo} type="datepicker" name="to_date" onChange={(e) => ocf('to_date', e)} placeholder="Please select date" noRequired={true} />

          <Button className="w-full" htmlType="submit" type="primary" loading={st.postLoader}>Generate Report</Button>
        </Form>

        {(st.reportResponseType === 'pdf') &&
          <div className="reportFormContainer">
            <b className="rep_fr_heading"><i className="las la-file-alt" />Export Report</b>
            <Export reportResponseType={st.reportResponseType} fileName={st.fileName} filePath={st.filePath} />
          </div>
        }

      </div>
    )//End return
  }//End Render
  componentDidMount() {
    this.setState({ getLoader: true });
    HTTP('get', '/reporting/get/reportDataOptions').then(res => {
      this.setState({ getLoader: false });
      if (!res) { return false; }
      // console.log(res.data);
      this.setState({ dataOptions: res.data })
      this.formRef.current.setFieldsValue({ from_date: SetDatePicker(GetCurrentDate('DD-MM-YYYY')) });
    });
  }//End componentDidMount
}//End class
export default Fields;