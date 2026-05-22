import React, { Component } from 'react'
import MultiRangeSlider from './partial/multiRange';
import { Row, Col, Form, Button } from 'antd';
import { AntInput } from '../../../externalComponents/antd-fields';
import { HTTP, GetObjectFromArr, LoadArrLocalStorage } from '../../../services';
import DataTable from '../../../externalComponents/andt-data-table-component';
import ScreenLoader from '../../../externalComponents/screen-loader';
import PageTitle from '../../mutual/pageTitle';
import './styles.less';

class ColumnPresetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getLoader: false,
      postLoader: false,
      rangeSliderData: { widthArr: [], colorArr: [] },
      toggleRangeSlider: false,
      data: [],
      colData: [],
      selectedColumnData: [],
      rangeAdjustedArr: [],
    }//End state
  }//End constructor
  formRef = React.createRef();

  addCol = (e, callBack = false) => {
    let selectedColumnData = [];
    let selectedObj = {};
    e.forEach((i, k) => {
      selectedObj = GetObjectFromArr(i, 'value', this.state.colData);
      selectedObj.title = this.setAlignHTMLInTitle(k, selectedObj.label);
      // selectedObj.dataIndex = selectedObj.colName;
      selectedObj.align = selectedObj.align ? selectedObj.align : 'left';
      selectedColumnData.push(selectedObj);
    });
    this.setState({ selectedColumnData }, () => this.getColumnRangeSlot(this.state.selectedColumnData, callBack));
  }//End function

  getColumnRangeSlot = (selectedColumnData, callBack = false) => {
    if (selectedColumnData.length > 1) {
      this.setState({ toggleRangeSlider: false });
      let modData = { widthArr: [], colorArr: this.state.rangeSliderData.colorArr };
      let width = 0;
      selectedColumnData.forEach((item, i) => {
        width = (i === 1) ? 10 : (modData.widthArr[i - 1] + 10);
        modData.widthArr.push(width);
      });
      modData.widthArr.splice(0, 1);//Remove first from start
      this.setState({ rangeSliderData: modData }, () => {
        this.setState({ toggleRangeSlider: true }, () => {
          if (callBack) { callBack(); }
        });
      })
    }//End if condition
  }//End function

  setAlignHTMLInTitle = (index, label, defaultValue = 'left') => {
    return (
      <div className="tableColTitle">
        {label}
        <AntInput type="radio" name={'align' + index} optionType="button" size="small" value={defaultValue} onChange={(al) => this.setColAlign(index, al)} radioOptions={[
          { 'label': <i className="las la-align-left" />, 'value': 'left' },
          { 'label': <i className="las la-align-center" />, 'value': 'center' },
          { 'label': <i className="las la-align-right" />, 'value': 'right' },
        ]} />
      </div>
    );
  }//End function

  setColAlign = (index, align) => {
    let selectedColumnData = this.state.selectedColumnData;
    selectedColumnData[index].align = align;
    this.setState({ selectedColumnData });
  }//End function

  adjustTableCol = (e) => {
    e = [...e];
    let selectedColumnData = this.state.selectedColumnData;
    this.setState({ rangeAdjustedArr: e }, () => {
      let arrTotal = 0;
      e.forEach((i, k) => {
        if (k !== 0) { i = (i - arrTotal); }
        arrTotal = arrTotal + i;
        e[k] = i;
      })
      e.push(100 - arrTotal);
      selectedColumnData.forEach((i, k) => { selectedColumnData[k].width = e[k] + '%'; })
      this.setState({ selectedColumnData })
    })//End set state
  }//End function

  submitForm = (values) => {
    values.columnWidths = [];
    values.columnAlign = [];
    this.state.selectedColumnData.forEach(i => {
      values.columnWidths.push(i.width);
      values.columnAlign.push(i.align);
    })
    values.columnRefIds = values.columnRefIds.join(',');
    values.columnWidths = values.columnWidths.join(',');
    values.columnAlign = values.columnAlign.join(',');
    //console.log(values);
    // return false;
    this.setState({ postLoader: true });
    HTTP('post', '/reporting/post/addPreset', values).then(res => {
      this.setState({ postLoader: false });
      if (!res) { return false; }
      if (this.props.match.params.id) {
        this.props.history.push('/'+window.urlpk+'/reportingColumnPresetsLog');
      } else {
        //Reset all fields and states
        this.formRef.current.resetFields();
        this.setState({
          rangeSliderData: { widthArr: [], colorArr: this.state.rangeSliderData.colorArr },
          toggleRangeSlider: false,
          // data: [],
          colData: [],
          selectedColumnData: [],
          rangeAdjustedArr: []
        })
      }//End if condition
    });
  }//End function

  render() {
    const fp = this.formRef.current;
    const st = this.state;
    return (
      <div>
        <PageTitle
          titleIcon="las la-columns"
          titleSpan="Create Column"
          titleHeading="Presets"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-folder-open', label: 'Report' },
            { iconLas: 'las la-table', label: 'Column Presets' },
            { iconLas: 'las la-columns', label: 'Create Column Presets' }
          ]}
        />
        <div className="report-preset-container">
          <ScreenLoader active={st.getLoader}>
            <div className="container">
              <Form layout="vertical" className="form-style-1" ref={this.formRef} onFinish={this.submitForm}>
                <AntInput name="id" containerClassName="hidden-field" noRequired={true} />
                <Row gutter={window.rowGutter}>
                  <Col lg={4} md={5} sm={12} xs={24}>
                    <AntInput filter={true} type="select" name="report_title_ref_id" label="Report Name" options={st.data} onChange={
                      (e) => {
                        fp.setFieldsValue({ columnRefIds: undefined });
                        this.setState({ colData: GetObjectFromArr(e, 'value', this.state.data).col_data });
                      }
                    } />
                  </Col>
                  <Col lg={4} md={5} sm={12} xs={24}>
                    <AntInput name="preset_name" label="Preset Name" />
                  </Col>
                  <Col lg={13} md={11} sm={18} xs={24}>
                    <AntInput filter={true} mode="multiple" type="select" name="columnRefIds" label="Please select columns name" options={st.colData} onChange={(e) => this.addCol(e)} disabled={fp && !fp.getFieldValue('report_title_ref_id')} />
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={24}>
                    <Button size="large" type="primary" htmlType="submit" className="btn_label_space btn_side_by_side w-full" loading={st.postLoader}>{this.props.match.params.id ? 'Update' : 'Add'}</Button>
                  </Col>
                </Row>
              </Form>
            </div>


            {(st.toggleRangeSlider && st.selectedColumnData.length > 1) && <div className="container m-t-3 p-b-30-imp of-unset-imp" ><MultiRangeSlider data={st.rangeSliderData} onChange={(e) => this.adjustTableCol(e)} /></div>}
            {/* <hr /> */}
            {/* {JSON.stringify(st.rangeAdjustedArr)} */}
            {(st.toggleRangeSlider && st.selectedColumnData.length > 0) && <div className="container m-t-3">
              <DataTable
                columns={st.selectedColumnData}
                styleType={2}
                dataSource={[]}
                className="set-preset-table"
              />
            </div>
            }
          </ScreenLoader>
        </div>
      </div>
    )//end return
  }//End return
  componentDidMount() {
    let id = this.props.match.params.id ? LoadArrLocalStorage(this.props.match.params.id) : '';
    // console.log(this.props);
    this.setState({ getLoader: true });
    HTTP('get', '/reporting/get/columnPresetData/' + id).then(res => {
      this.setState({ getLoader: false });
      if (!res) { return false; }
      // console.log(res);
      this.setState({ data: res.data, rangeSliderData: res.rangeSliderData }, () => {
        if (id) {
          let arr = res.loadedData;
          arr.selectedColumnData.forEach((i, k) => {
            arr.selectedColumnData[k]['title'] = this.setAlignHTMLInTitle(k, i.title, i.align);
          })
          this.setState({ colData: arr.colData, selectedColumnData: arr.selectedColumnData, rangeSliderData: arr.rangeSliderData, toggleRangeSlider: false }, () => {
            this.setState({ toggleRangeSlider: true })
            this.formRef.current.setFieldsValue(arr);
          });
        }//End if condition
      });
    });
  }//End componentDidMount
}//End class

export default ColumnPresetForm;