import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { AntInput } from '../../../../externalComponents/antd-fields';
import MFS from '../../../../services/multiple_field_services';
import { AccessControl } from '../../../../services';

class MultipleRiskStrategy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowArr: [1],
      fieldValues: {}
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
    // console.log(this.props.formValues);
    if (this.props.formValues && this.props.formValues.risk) {
      let data = this.props.formValues;
      // let data = {
      //   broker_ref_id: { 1: '11', 2: '10' },
      //   brokery_type_ref_id: { 1: '2', 2: '4' },
      //   brokery: { 1: 0.5, 2: 2500 }
      // }
      // this.setState({ fieldValues: data });
      // let set = MFS.loadDataOnMount(data);
      let set = MFS.loadDataOnMount(data);
      this.setState({ rowArr: set.rowArr, fieldValues: data }, () => {

        //@Modified Field Name with Service Id
        let modifiedFields = {};
        Object.keys(set.formValObj).forEach(i => {
          modifiedFields[i + '_' + this.props.serviceId] = set.formValObj[i];
        });
        set.formValObj = modifiedFields;

        this.props.fp.setFieldsValue(set.formValObj);
      })
    }//End if condition
  }//End if condition

  tableHeader = (form = true, index = false) => {
    return (
      <>
        <Col lg={2} md={2} sm={2} xs={3} className="just-col head"><label>Sr:</label></Col>
        <Col lg={6} md={6} sm={7} xs={form ? 18 : 21} className="just-col head">
          <label>Risk:</label>
          {index === 0 && AccessControl(27) && <Button size="small" ghost className="edit-btn" type="primary" onClick={() => { this.props.showHideFieldToggle(true); this.setFieldsOnLoad(); }}>Edit</Button>}
        </Col>
        <Col lg={form ? 16 : 16} md={form ? 16 : 16} sm={form ? 15 : 15} xs={24} className="just-col head hidden-xs">
          <label>Strategy:</label>
          {!form && AccessControl(27) && <Button size="small" ghost className="edit-btn" type="primary" onClick={() => { this.props.showHideFieldToggle(true); this.setFieldsOnLoad(); }}>Edit</Button>}
          {this.props.showHideField &&
            <Button size="small" className="edit-btn" onClick={() => { this.props.showHideFieldToggle(false); this.props.onClose() }}><i className="las la-times-circle" /></Button>
          }
        </Col>
        {(form && window.is_xs) &&
          <Col xs={3} className="just-col head text-center">
            <Button size="small" className="edit-btn p-0-imp w-full" onClick={() => { this.props.showHideFieldToggle(false); this.props.onClose() }}><i className="las la-times-circle" /></Button>
          </Col>
        }
      </>
    );
  }//End function


  render() {
    const pr = this.props;
    const rowArr = this.state.rowArr;
    const fv = this.state.fieldValues;
    const vl = this.props.formValues;
    // const st = this.state;
    return (
      <React.Fragment>
        {pr.showHideField ?
          <>
            <Row gutter={window.rowGutter} className="list">
              {this.tableHeader()}
              {rowArr.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Col lg={2} md={2} sm={2} xs={3} className="just-col">
                      <span className="sticky-element top-50-imp z-index-99-imp">{index + 1}</span>
                    </Col>
                    <Col lg={6} md={6} sm={7} xs={18} className="just-col">
                      <AntInput type="textarea" className="m-0-imp h-86-imp" name={`risk%${item}_${pr.serviceId}`} placeholder="Risk"
                        onChange={(e) => this.onChangeVal(`risk%${item}`, e)}
                        noRequired={true}
                      />
                      <div className="hidden-lg hidden-md hidden-sm">
                        <div className="just-col head-mid"><label>Strategy:</label></div>
                        <AntInput type="textarea" className="m-0-imp h-86-imp" name={`strategy%${item}_${pr.serviceId}`} placeholder="Strategy"
                          onChange={(e) => this.onChangeVal(`strategy%${item}`, e)}
                          noRequired={true}
                        />
                      </div>
                    </Col>
                    <Col lg={14} md={14} sm={12} xs={24} className="just-col hidden-xs">
                      <AntInput type="textarea" className="m-0-imp h-86-imp" name={`strategy%${item}_${pr.serviceId}`} placeholder="Strategy"
                        onChange={(e) => this.onChangeVal(`strategy%${item}`, e)}
                        noRequired={true}
                      />
                    </Col>
                    <Col lg={2} md={2} sm={3} xs={3} className="just-col">
                      <Button className="w-full btn_side_by_side" type="dashed"
                        onClick={() => this.setState({ rowArr: MFS.addRow(rowArr) })}
                        disabled={MFS.addDisabled(rowArr, index)} title="Add"
                      ><i className="las la-plus-circle fs-20 pos-relative top-1" /></Button>
                      <Button className="w-full m-t-10 btn_side_by_side" type="dashed"
                        disabled={MFS.lessDisabled(rowArr)}
                        onClick={() => {
                          let rr = MFS.removeRow(rowArr, index, fv, item);
                          this.setState({ rowArr: rr[0], fieldValues: rr[1] })
                        }} title="Less"
                      ><i className="las la-minus-circle fs-20 pos-relative top-1" /></Button>
                    </Col>
                  </React.Fragment>
                )
              })
              }
              <Col lg={24} md={24} sm={24} xs={24} className="just-col">
                <div className="text-right m-t-5">
                  <Button size="small" onClick={() => { pr.showHideFieldToggle(false); pr.onClose() }}>Cancel</Button>&nbsp;|&nbsp;
                  <Button size="small" type="primary" htmlType="submit" loading={pr.loading} onClick={() => pr.onSave()}>Save</Button>
                </div>
              </Col>
            </Row>
          </>
          :
          <>
            <Row gutter={window.rowGutter} className="list">
              {!window.is_xs && this.tableHeader(false)}
              {vl && vl.risk &&
                Object.keys(vl.risk).map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {window.is_xs && this.tableHeader(false, index)}
                      <Col lg={2} md={2} sm={2} xs={3} className="just-col">
                        <span className="sticky-element top-50-imp z-index-99-imp">{index + 1}</span>
                      </Col>
                      <Col lg={6} md={6} sm={7} xs={21} className="just-col">
                        {vl.risk[item]}
                        <div className="hidden-lg hidden-md hidden-sm">
                          <div className="just-col head-mid"><label>Strategy:</label></div>
                          <div className="textbox-value">{vl.strategy[item]}</div>
                        </div>
                      </Col>
                      <Col lg={16} md={16} sm={15} xs={24} className="just-col hidden-xs">
                        <div className="textbox-value">{vl.strategy[item]}</div>
                      </Col>
                    </React.Fragment>
                  )
                })
              }
            </Row>
          </>
        }
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad() }//End componentDidMount
}//End Class
export default MultipleRiskStrategy;