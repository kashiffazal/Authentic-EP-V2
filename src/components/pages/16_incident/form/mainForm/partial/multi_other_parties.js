import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import MFS from '../../../../../services/multiple_field_services';
import moment from 'moment';

class MultipleParties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowArr: [1],
      fieldValues: {},
      // showLedgerModal: {}
    }//End state
  }//End constructor

  onChangeVal = (fieldName, fieldValue) => {
    this.setState({ fieldValues: MFS.onChange(fieldName, fieldValue, this.state.fieldValues) }, () => {
      this.props.onChange(this.state.fieldValues);
      // console.log(this.state.fieldValues);
      // this.state.fieldValues.amount_re && this.props.totalAmount(singleObjSum(this.state.fieldValues.amount_re));
    });
  }//End function

  setFieldsOnLoad = () => {
    // console.log(this.props.formValues.other_parties_multi);
    if (this.props.formValues.other_parties_multi) {
      let data = this.props.formValues.other_parties_multi;
      data['date_advised'] && Object.keys(data['date_advised']).forEach(item => {
        data['date_advised'][item] = (data['date_advised'][item] && data['date_advised'][item] !== '-') ? moment(data['date_advised'][item]) : '';
      });
      // let data = {
      //   broker_ref_id: { 1: '11', 2: '10' },
      //   brokery_type_ref_id: { 1: '2', 2: '4' },
      //   brokery: { 1: 0.5, 2: 2500 }
      // }
      // this.setState({ fieldValues: data });
      // let set = MFS.loadDataOnMount(data);
      let set = MFS.loadDataOnMount(data);
      this.setState({ rowArr: set.rowArr, fieldValues: data }, () => {
        this.props.fp.setFieldsValue(set.formValObj);
      })
    }//End if condition
  }//End if condition

  render() {
    // const fp = this.props.fp;
    const rowArr = this.state.rowArr;
    const fv = this.state.fieldValues;
    // const st = this.state;
    return (
      <React.Fragment>
        {rowArr.map((item, index) => {
          return (
            <Row gutter={window.rowGutter} key={index}>
              <Col lg={6} md={6} sm={12} xs={24}>
                <AntInput label="Work Unit/Individual" name={`work_unit%${item}`}
                  onChange={(e) => this.onChangeVal(`work_unit%${item}`, e)}
                  noRequired={true}
                />
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <AntInput type="datepicker" label="Date Advised" name={`date_advised%${item}`}
                  onChange={(e) => this.onChangeVal(`date_advised%${item}`, e)}
                  noRequired={true}
                />
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <AntInput label="Method of Contact" name={`method_of_contact%${item}`}
                  onChange={(e) => this.onChangeVal(`method_of_contact%${item}`, e)}
                  noRequired={true}
                />
              </Col>
              <Col lg={6} md={6} sm={24} xs={24}>
                <Row gutter={10} className="m-b-15">
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

          )
        })
        }
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad() }//End componentDidMount
  componentDidUpdate(prevProps) {
    if (prevProps.formValues.other_parties_multi !== this.props.formValues.other_parties_multi) {
      this.setFieldsOnLoad()
    }//End if condition
  }//End componentDidMount


}//End Class
export default MultipleParties;