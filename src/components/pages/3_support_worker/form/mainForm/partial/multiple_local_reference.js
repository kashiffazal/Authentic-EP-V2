import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import MFS from '../../../../../services/multiple_field_services';

class MultipleDaysAvailability extends Component {
  state = {
    rowArr: [1,2,3],
    fieldValues: {},
  }//End state

  onChangeVal = (fieldName, fieldValue) => {
    // console.log(fieldName, fieldValue.target.value);
    this.setState({ fieldValues: MFS.onChange(fieldName, fieldValue, this.state.fieldValues) }, () => {
      // console.log(this.state.fieldValues);
      this.props.onChange(this.state.fieldValues);
    });
  }//End function

  setFieldsOnLoad = () => {
    //console.log(this.props.formValues);
    if (this.props.formValues && this.props.formValues.name_of_referee) {
      let data = this.props.formValues;
      // let data = {
      //   broker_ref_id: { 1: '11', 2: '10' },
      //   brokery_type_ref_id: { 1: '2', 2: '4' },
      //   brokery: { 1: 0.5, 2: 2500 }
      // }
      // this.setState({ fieldValues: data });
      // let set = MFS.loadDataOnMount(data);
      let set = MFS.loadDataOnMount(data);
      this.setState({ rowArr: this.state.rowArr, fieldValues: data }, () => {
        this.props.fp.setFieldsValue(set.formValObj)
      })
    }//End if condition
  }//End if condition

  render() {
    const fp = this.props.fp;
    const rowArr = this.state.rowArr;
    return (
      <React.Fragment>
        {rowArr.map((item, index) => {
          return (
            <Row gutter={window.rowGutterSmall} key={index}>
              <Col lg={5} md={8} sm={24} xs={24}>
                <AntInput label={`Name of Referee # ${index+1}`} name={`name_of_referee%${index + 1}`}  onChange={e => this.onChangeVal(`name_of_referee%${index + 1}`, e)} noRequired/>
                {/* {JSON.stringify(fp.getFieldValue(`name_of_referee%${index + 1}`))} */}
              </Col>
              <Col lg={5} md={8} sm={24} xs={24}>
                <AntInput label={`Contact No ${index+1}`} name={`contact_no%${index + 1}`}  onChange={e => this.onChangeVal(`contact_no%${index + 1}`, e)} 
                  noRequired={fp && !fp.getFieldValue(`name_of_referee%${index + 1}`)}
                />
              </Col>
              <Col lg={5} md={8} sm={24} xs={24}>
                <AntInput label={`Email Address ${index+1}`} name={`email_address%${index + 1}`}  onChange={e => this.onChangeVal(`email_address%${index + 1}`, e)} 
                  noRequired={fp && !fp.getFieldValue(`name_of_referee%${index + 1}`)}
                />
              </Col>
              <Col lg={4} md={12} sm={24} xs={24}>
                <AntInput label={`Position Held ${index+1}`} name={`position_held%${index + 1}`}  onChange={e => this.onChangeVal(`position_held%${index + 1}`, e)} 
                  noRequired={fp && !fp.getFieldValue(`name_of_referee%${index + 1}`)}
                />
              </Col>
              <Col lg={5} md={12} sm={24} xs={24}>
                <AntInput label={`Name of Organisation ${index+1}`} name={`organisation%${index + 1}`}  onChange={e => this.onChangeVal(`organisation%${index + 1}`, e)} 
                  noRequired={fp && !fp.getFieldValue(`name_of_referee%${index + 1}`)}
                />
              </Col>
            </Row>
          )
        })}
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad(); }//End componentDidMount

}//End Class
export default MultipleDaysAvailability;