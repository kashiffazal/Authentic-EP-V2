import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import MFS from '../../../../../services/multiple_field_services';
// import moment from "moment";

class MultipleDaysAvailability extends Component {
  state = {
    rowArr: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    fieldValues: {},
  }//End state

  onChangeVal = (fieldName, fieldValue) => {
    this.setState({ fieldValues: MFS.onChange(fieldName, fieldValue, this.state.fieldValues) }, () => {
      this.props.onChange(this.state.fieldValues);
      //console.log(this.state.fieldValues);
    });
  }//End function

  setDays = () => {
    this.state.rowArr.forEach((item, index) => { this.onChangeVal(`day%${index + 1}`, item); })
    return false;
  }//end if condition

  setFieldsOnLoad = () => {
    //console.log({...this.props.formValues});
    if (this.props.formValues && this.props.formValues.day) {
      //console.log(this.props.formValues);
      let data = { ...this.props.formValues };

      // console.log(data);
      // if (!data.not_available) {
      //   data.not_available = {};
      //   Object.keys(data.day).forEach(key => {data.not_available[key] = false;});
      // }//End if condition


      // Object.keys(data['from']).forEach(item => {
      //   data['from'][item] = (data['from'][item] && data['from'][item] !== '-') ? moment(data['from'][item]) : '';
      //   data['to'][item] = (data['to'][item] && data['to'][item] !== '-') ? moment(data['to'][item]) : '';
      // });
      //console.log(data);
      // let data = {
      //   broker_ref_id: { 1: '11', 2: '10' },
      //   brokery_type_ref_id: { 1: '2', 2: '4' },
      //   brokery: { 1: 0.5, 2: 2500 }
      // }
      // this.setState({ fieldValues: data });
      // let set = MFS.loadDataOnMount(data);
      let set = MFS.loadDataOnMount(data);
      this.setState({ rowArr: set.rowArr, fieldValues: data }, () => {
        Object.keys(set.formValObj).forEach((a, i) => { if (set.formValObj[a] === '-') { set.formValObj[a] = ''; } })
        this.props.fp.setFieldsValue(set.formValObj)
        // console.log(set.formValObj);
      })
    } else {
      this.setDays();
    }//End if condition
  }//End if condition

  notAvailable = (i, checkBoxValue) => {

    this.state.rowArr.forEach((item, k) => {
      var index = (k + 1);
      var vl = this.props.fp.getFieldValue(`not_available%${index}`);
      this.onChangeVal(`not_available%${index}`, (vl ? true : false));
    });


    this.onChangeVal(`not_available%${i}`, checkBoxValue);
    this.onChangeVal(`from%${i}`, '-');
    this.onChangeVal(`to%${i}`, '-');
  }//End if condition


  render() {
    const fp = this.props.fp;
    const rowArr = this.state.rowArr;
    const data = this.props.data.list;
    return (
      <React.Fragment>
        {/* <Row gutter={window.rowGutterSmall}>
          <Col lg={20} md={20} sm={24} xs={24}>
            <Row gutter={window.rowGutterSmall}>
              <Col lg={8} md={8} sm={24} xs={24}><label>What is your availability in a full week?</label></Col>
              <Col lg={8} md={8} sm={24} xs={24}><label>e.g. 8:20 AM</label></Col>
              <Col lg={8} md={8} sm={24} xs={24}><label>e.g. 5:20 PM</label></Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={24} xs={24}></Col>
        </Row> */}
        {rowArr.map((item, index) => {
          return (
            <Row gutter={window.rowGutterSmall} key={index}>
              <Col lg={20} md={20} sm={24} xs={24}>
                <Row gutter={window.rowGutterSmall} className="day_availibility_fields">
                  <Col lg={8} md={8} sm={24} xs={24}>
                    <AntInput name={`day%${index + 1}`} value={item} disabled />
                  </Col>
                  <Col lg={8} md={8} sm={12} xs={24}>
                    <AntInput type="select" options={data.timeList} filter={true} name={`from%${index + 1}`}
                      disabled={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      noRequired={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      onChange={e => this.onChangeVal(`from%${index + 1}`, e)}
                    />
                    {/* <AntInput placeholder="From" name={`from%${index + 1}`}
                      disabled={fp.getFieldValue(`not_available%${index + 1}`)}
                      noRequired={fp.getFieldValue(`not_available%${index + 1}`)}
                       onChange={e => this.onChangeVal(`from%${index + 1}`, e)}
                      placeholder="From: e.g. 8:00 AM"
                    /> */}
                  </Col>
                  <Col lg={8} md={8} sm={12} xs={24}>
                    <AntInput type="select" options={data.timeList} filter={true} name={`to%${index + 1}`}
                      disabled={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      noRequired={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      onChange={e => this.onChangeVal(`to%${index + 1}`, e)}
                    />
                    {/* <AntInput placeholder="To" name={`to%${index + 1}`}
                      disabled={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      noRequired={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                       onChange={e => this.onChangeVal(`to%${index + 1}`, e)}
                      placeholder="To: e.g. 5:00 PM"
                    /> */}
                  </Col>
                </Row>
              </Col>
              <Col lg={4} md={4} sm={24} xs={24}>
                <div className="m-t-12">
                  <AntInput type="checkbox" text="Not Available"
                    noRequired={fp && fp.getFieldValue(`from%${index + 1}`) && fp.getFieldValue(`to%${index + 1}`)}
                    reqMsg="*" name={`not_available%${index + 1}`} onChange={e => this.notAvailable(index + 1, e)}
                  />
                </div>
              </Col>
            </Row>
          )
        })}
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad(); }//End componentDidMount
  // componentDidUpdate(prevProps) {
  //   if ((prevProps.data !== this.props.data)) { this.setFieldsOnLoad() }//End if condition
  // }//End componentDidMount


}//End Class
export default MultipleDaysAvailability;