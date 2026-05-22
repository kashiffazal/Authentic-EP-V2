import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { AntInput } from '../../../externalComponents/antd-fields';
import MFS from '../../../services/multiple_field_services';

class MultipleBranches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowArr: [1],
      fieldValues: {},
    }//End state
  }//End constructor

  onChangeVal = (fieldName, fieldValue) => {
    this.setState({ fieldValues: MFS.onChange(fieldName, fieldValue, this.state.fieldValues) }, () => {
      this.props.onChange(this.state.fieldValues);
    });
  }//End function

  setFieldsOnLoad = () => {
    if (this.props.data) {
      let data = JSON.parse(this.props.data);
      // let data = {
      //   broker_ref_id: { 1: '11', 2: '10' },
      //   brokery_type_ref_id: { 1: '2', 2: '4' },
      //   brokery: { 1: 0.5, 2: 2500 }
      // }
      // this.setState({ fieldValues: data });
      // let set = MFS.loadDataOnMount(data);
      let set = MFS.loadDataOnMount(data);
      this.setState({ rowArr: set.rowArr, fieldValues: data }, () => {
        this.props.fp.setFieldsValue(set.formValObj)
      })
    } else {
      this.props.fp.setFieldsValue({ 'branch%1': '', 'phone_mobile_number%1': '', 'mobile_number%1': '', 'email%1': '', 'address%1': '' });
    }//End if condition
  }//End if condition

  render() {
    const rowArr = this.state.rowArr;
    const fv = this.state.fieldValues;
    return (
      <React.Fragment>
        {rowArr.map((item, index) => {
          return (
            <React.Fragment key={index}>
            <div className="branch-container">
              <Row gutter={window.rowGutter}>
                <Col lg={8} md={24} sm={24} xs={24}>
                  <AntInput label="Branch Name" name={`branch%${item}`} onChange={(e) => this.onChangeVal(`branch%${item}`, e)} />
                </Col>
                <Col lg={8} md={12} sm={12} xs={24}>
                  <AntInput label="Branch Phone" name={`phone_mobile_number%${item}`} onChange={(e) => this.onChangeVal(`phone_mobile_number%${item}`, e)} />
                </Col>
                {/* <Col lg={8} md={12} sm={12} xs={24}>
                  <AntInput label="Branch Mobile" name={`mobile_number%${item}`} onChange={(e) => this.onChangeVal(`mobile_number%${item}`, e)} />
                </Col> */}
                <Col lg={8} md={12} sm={12} xs={24}>
                  <AntInput label="Branch Email" name={`email%${item}`} onChange={(e) => this.onChangeVal(`email%${item}`, e)} />
                </Col>
                <Col lg={16} md={12} sm={12} xs={24}>
                  <AntInput label="Branch Address" name={`address%${item}`} onChange={(e) => this.onChangeVal(`address%${item}`, e)} />
                </Col>
                <Col lg={8} md={12} sm={12} xs={24}>
                  <Row gutter={window.rowGutterSmall} className="m-b-15">
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Button className="w-full btn_label_space btn_side_by_side" type="dashed"
                        onClick={() => this.setState({ rowArr: MFS.addRow(rowArr) })}
                        disabled={MFS.addDisabled(rowArr, index)}
                      >Add <i className="las la-plus-circle m-l-3" /></Button>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Button className="w-full btn_label_space btn_side_by_side" type="dashed"
                        disabled={MFS.lessDisabled(rowArr)}
                        onClick={() => {
                          let rr = MFS.removeRow(rowArr, index, fv, item);
                          this.setState({ rowArr: rr[0], fieldValues: rr[1] })
                        }}>Less <i className="las la-minus-circle m-l-3" /></Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              </div>
            </React.Fragment>
          )
        })}
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad() }//End componentDidMount
  componentDidUpdate(prevProps) {
    if ((prevProps.data !== this.props.data)) { this.setFieldsOnLoad() }//End if condition
  }//End componentDidMount


}//End Class
export default MultipleBranches;