import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'antd';
import { AntInput } from '../../../externalComponents/antd-fields';
import MFS from '../../../services/multiple_field_services';
import { HTTP } from '../../../services';
import ScreenLoader from '../../../externalComponents/screen-loader';

class AvailabilityForm extends Component {
  state = {
    rowArr: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    fieldValues: {},
    timeList: [],
    loader: false,
    postLoader: false
  }//End state

  formRef = React.createRef();

  onChangeVal = (fieldName, fieldValue) => {
    this.setState({ fieldValues: MFS.onChange(fieldName, fieldValue, this.state.fieldValues) });
  }//End function

  setFieldsOnLoad = (data) => {
    if (data.day) {
      // console.log(data);
      let set = MFS.loadDataOnMount(data);
      this.setState({ rowArr: set.rowArr, fieldValues: data }, () => {
        Object.keys(set.formValObj).forEach((a, i) => { if (set.formValObj[a] === '-') { set.formValObj[a] = ''; } })
        this.formRef.current.setFieldsValue(set.formValObj)
      })
    } else {
      this.setDays();
    }//End if condition//End if condition
  }//End if condition

  setDays = () => {
    this.state.rowArr.forEach((item, index) => { this.onChangeVal(`day%${index + 1}`, item); })
    return false;
  }//end if condition

  notAvailable = (i, checkBoxValue) => {

    this.state.rowArr.forEach((item, k) => {
      var index = (k + 1);
      var vl = this.formRef.current.getFieldValue(`not_available%${index}`);
      this.onChangeVal(`not_available%${index}`, (vl ? true : false));
    });

    this.onChangeVal(`not_available%${i}`, checkBoxValue);
    this.onChangeVal(`from%${i}`, '-');
    this.onChangeVal(`to%${i}`, '-');
  }//End if condition

  submitForm = (values) => {
    let data = JSON.stringify(this.state.fieldValues);
    this.setState({ postLoader: true });
    HTTP('post', '/servicePlaining/post/updateAvailability', { data: data, id: (this.props.id ? this.props.id : '') }).then(res => {
      this.setState({ postLoader: false });
      if (!res) { return false; }
      this.props.updatedData && this.props.updatedData(res.updatedData);
    });
    // });
  }//End function

  getData = () => {
    this.setState({ loader: true });
    HTTP('get', '/servicePlaining/get/getAvailability/id/' + (this.props.id ? this.props.id : '')).then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.setState({ timeList: res.timeList })
      this.setFieldsOnLoad(res.data);
    });
  }//End function

  render() {
    const fp = this.formRef.current;
    const rowArr = this.state.rowArr;
    const st = this.state;
    // console.log(this.state.fieldValues);
    return (
      <div className="schedule-availability-edit-form">
        <ScreenLoader active={st.loader}>
          <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm}>
            {this.props.showLabel &&
              <Row gutter={window.rowGutterSmall} className="label">
                <Col lg={8} md={6} sm={24} xs={0}>Days</Col>
                <Col lg={6} md={6} sm={8} xs={0}>From</Col>
                <Col lg={6} md={6} sm={8} xs={0}>To</Col>
                <Col lg={4} md={6} sm={8} xs={0} className='text-center'>Availability</Col>
              </Row>
            }
            {rowArr.map((item, index) => {
              return (
                <Row gutter={window.rowGutterSmall} key={index}>
                  <Col lg={8} md={6} sm={24} xs={12}>
                    <AntInput name={`day%${index + 1}`} value={item} disabled />
                  </Col>
                  <Col lg={0} md={0} sm={0} xs={12}>
                    <div className="m-t-0 text-center">
                      <AntInput type="checkbox" text="Not Available"
                        noRequired={fp && fp.getFieldValue(`from%${index + 1}`) && fp.getFieldValue(`to%${index + 1}`)}
                        reqMsg="*" name={`not_available%${index + 1}`} onChange={e => this.notAvailable(index + 1, e)}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={8} xs={12}>
                    {/* {JSON.stringify(this.state.timeList)} */}
                    <AntInput type="select" options={st.timeList} filter={true} name={`from%${index + 1}`}
                      disabled={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      noRequired={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      onChange={e => this.onChangeVal(`from%${index + 1}`, e)}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={8} xs={12}>
                    <AntInput type="select" options={st.timeList} filter={true} name={`to%${index + 1}`}
                      disabled={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      noRequired={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      onChange={e => this.onChangeVal(`to%${index + 1}`, e)}
                    />
                  </Col>
                  <Col lg={4} md={6} sm={8} xs={0}>
                    <div className="m-t-4 text-center">
                      <AntInput type="checkbox" text="Not Available"  
                        noRequired={fp && fp.getFieldValue(`from%${index + 1}`) && fp.getFieldValue(`to%${index + 1}`)}
                        reqMsg="*" name={`not_available%${index + 1}`} onChange={e => this.notAvailable(index + 1, e)}
                      />
                    </div>
                  </Col>
                </Row>
              )
            })}
            <hr className="hr-1" /><br />
            <div className="text-right">
              <Button size="large" type="primary" htmlType="submit" loading={st.postLoader}>Update </Button>
            </div>
          </Form>
        </ScreenLoader>
      </div>
    );//End return
  }//End render
  componentDidMount() { this.getData(); }//End componentDidMount
}//End Class
export default AvailabilityForm;