import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { AntInput } from '../../../../externalComponents/antd-fields';
import MFS from '../../../../services/multiple_field_services';
import { AccessControl } from '../../../../services';

class MultipleIdentifiedRisk extends Component {
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
    // console.log(this.props.formValues.other_parties_multi);
    if (this.props.formValues && this.props.formValues.identified_risk) {
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
        this.props.fp.setFieldsValue(set.formValObj);
      })
    }//End if condition
  }//End if condition

  tableHeader = (form = true, index = false) => {
    return (
      <>
        <Col lg={2} md={2} sm={2} xs={3} className="just-col head"><label>Sr:</label></Col>
        <Col lg={6} md={6} sm={7} xs={21} className="just-col head">
          <label>Identified Risk:</label>
          {(!form && window.is_xs) && AccessControl(27) &&
            <div className="field-side-label"><Button size="small" ghost className="edit-btn" type="primary" onClick={() => { this.props.showHideFieldToggle(true); this.setFieldsOnLoad(); }}>Edit</Button></div>
          }
          {(form && window.is_xs) &&
            <Button size="small" className="edit-btn" onClick={() => { this.props.showHideFieldToggle(false); this.props.onClose() }}><i className="las la-times-circle" /></Button>
          }
        </Col>
        <Col lg={form ? 7 : 8} md={form ? 7 : 8} sm={15} xs={24} className="just-col head hidden-xs">
          <label>Which of the goals will this impact?:</label>
          {!form && window.is_sm && AccessControl(27) &&
            <div className="field-side-label"><Button size="small" ghost className="edit-btn" type="primary" onClick={() => { this.props.showHideFieldToggle(true); this.setFieldsOnLoad(); }}>Edit</Button></div>
          }
          {form && window.is_sm &&
            <Button size="small" className="edit-btn" onClick={() => { this.props.showHideFieldToggle(false); this.props.onClose() }}><i className="las la-times-circle" /></Button>
          }
        </Col>
        <Col lg={form ? 9 : 8} md={form ? 9 : 8} sm={0} xs={24} className="just-col head hidden-sm hidden-xs">
          <label>Risk treatment strategy?:</label>
          {!form && AccessControl(27) && <div className="field-side-label"><Button size="small" ghost className="edit-btn" type="primary" onClick={() => { this.props.showHideFieldToggle(true); this.setFieldsOnLoad(); }}>Edit</Button></div>}
          {this.props.showHideField &&
            <Button size="small" className="edit-btn" onClick={() => { this.props.showHideFieldToggle(false); this.props.onClose() }}><i className="las la-times-circle" /></Button>
          }
        </Col>
      </>
    );
  }//End function


  field_WhichOfTheGoalsWillThisImpact = (item, index) => {
    return (
      <AntInput placeholder="Which of the goals will this impact?" name={`goals_will_impact%${item}`} type="textarea"
        onChange={(e) => this.onChangeVal(`goals_will_impact%${item}`, e)}
        style={{ height: (index === 0 ? (window.is_sm ? '77px' : (window.is_xs ? '100px' : '288px')) : (window.is_sm ? '77px' : (window.is_xs ? '100px' : '327px'))) }} className="m-0-imp"
      // noRequired={true}
      />
    );
  }//End function

  field_RiskTreatmentStrategy = (item, index) => {
    return (
      <AntInput placeholder="Risk treatment strategy?" name={`risk_treatment_strategy%${item}`} type="textarea"
        onChange={(e) => this.onChangeVal(`risk_treatment_strategy%${item}`, e)}
        style={{ height: (index === 0 ? (window.is_sm ? '155px' : (window.is_xs ? '100px' : '288px')) : (window.is_sm ? '155px' : (window.is_xs ? '100px' : '327px'))) }} className="m-0-imp"
      // noRequired={true}
      />
    );
  }//End function

  render() {
    const pr = this.props;
    const fp = this.props.fp;
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
                      {index !== 0 && <div className="just-col head-mid m-t--9-imp"><label>Identified Risk:</label></div>}

                      <AntInput placeholder="Identified Risk" name={`identified_risk%${item}`}
                        onChange={(e) => this.onChangeVal(`identified_risk%${item}`, e)}
                      // containerClassName="m-b-10-imp"
                      // noRequired={true}
                      />
                      <div className="just-col head-mid"><label>Triggered by:</label></div>
                      <AntInput placeholder="Triggered by" name={`triggered_by%${item}`}
                        onChange={(e) => this.onChangeVal(`triggered_by%${item}`, e)}
                      // containerClassName="m-b-10-imp"
                      // noRequired={true}
                      />
                      <div className="just-col head-mid"><label>Risk Rating:</label></div>
                      <AntInput name={`risk_rating%${item}`} type="radio"
                        vertical
                        radioOptions={[
                          { value: 'Low', label: <span className={`risk-rate-uns ${(fp && fp.getFieldValue(`risk_rating%${item}`)) === 'Low' ? 'risk-rate risk-type-1' : ''}`}>Low</span> },
                          { value: 'Medium', label: <span className={`risk-rate-uns ${(fp && fp.getFieldValue(`risk_rating%${item}`)) === 'Medium' ? 'risk-rate risk-type-2' : ''}`}>Medium</span> },
                          { value: 'High', label: <span className={`risk-rate-uns ${(fp && fp.getFieldValue(`risk_rating%${item}`)) === 'High' ? 'risk-rate risk-type-3' : ''}`}>High</span> },
                          { value: 'Extreme', label: <span className={`risk-rate-uns ${(fp && fp.getFieldValue(`risk_rating%${item}`)) === 'Extreme' ? 'risk-rate risk-type-4' : ''}`}>Extreme</span> }
                        ]}
                        onChange={(e) => this.onChangeVal(`risk_rating%${item}`, e)}
                      // noRequired={true}
                      />

                      <div className="hidden-lg hidden-md hidden-sm">
                        <div className="just-col head-mid"><label>Which of the goals will this impact?:</label></div>
                        {this.field_WhichOfTheGoalsWillThisImpact(item, index)}
                        <div className="just-col head-mid m-t--9"><label>Risk treatment strategy?:</label></div>
                        {this.field_RiskTreatmentStrategy(item, index)}
                      </div>

                    </Col>
                    <Col lg={7} md={7} sm={12} xs={24} className="just-col hidden-xs">
                      {index !== 0 && <div className="just-col head-mid m-t--9-imp hidden-lg hidden-md hidden-xs"><label>Which of the goals will this impact?:</label></div>}
                      {this.field_WhichOfTheGoalsWillThisImpact(item, index)}
                      <div className="hidden-lg hidden-md">
                        <div className="just-col head-mid m-t--9"><label>Risk treatment strategy?:</label></div>
                        {this.field_RiskTreatmentStrategy(item, index)}
                      </div>
                    </Col>
                    <Col lg={7} md={7} sm={15} xs={24} className="just-col hidden-sm hidden-xs">
                      {this.field_RiskTreatmentStrategy(item, index)}
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
              })}
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
              {vl && vl.identified_risk &&
                Object.keys(vl.identified_risk).map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {window.is_xs && this.tableHeader(false, index)}
                      <Col lg={2} md={2} sm={2} xs={3} className="just-col">
                        <span className="sticky-element top-50-imp z-index-99-imp">{index + 1}</span>
                      </Col>
                      <Col lg={6} md={6} sm={7} xs={21} className="just-col">
                        {index !== 0 && <div className="just-col head-mid m-t--9-imp hidden-xs"><label>Identified Risk:</label></div>}
                        {vl.identified_risk[item]}
                        <div className="just-col head-mid"><label>Triggered by:</label></div>
                        {vl.triggered_by[item]}
                        <div className="just-col head-mid"><label>Risk Rating:</label></div>
                        {vl.risk_rating[item]}
                        <div className="hidden-lg hidden-md hidden-sm">
                          <div className="just-col head-mid"><label>Which of the goals will this impact?:</label></div>
                          <div className="textbox-value">{vl.goals_will_impact[item]}</div>
                          <div className="just-col head-mid"><label>Risk treatment strategy?:</label></div>
                          <div className="textbox-value">{vl.risk_treatment_strategy[item]}</div>
                        </div>
                      </Col>
                      <Col lg={8} md={8} sm={15} xs={24} className="just-col hidden-xs">
                        {index !== 0 && <div className="just-col head-mid m-t--9-imp hidden-lg hidden-md hidden-xs"><label>Which of the goals will this impact?:</label></div>}
                        <div className="textbox-value">{vl.goals_will_impact[item]}</div>
                        <div className="hidden-lg hidden-md">
                          <div className="just-col head-mid"><label>Risk treatment strategy?:</label></div>
                          <div className="textbox-value">{vl.risk_treatment_strategy[item]}</div>
                        </div>
                      </Col>
                      <Col lg={8} md={8} sm={0} xs={24} className="just-col hidden-sm hidden-xs">
                        <div className="textbox-value">{vl.risk_treatment_strategy[item]}</div>
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
export default MultipleIdentifiedRisk;