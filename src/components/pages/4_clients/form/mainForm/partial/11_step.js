import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step11 extends Component {
  render() {
    // const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Participant Risk Assessment</h2>
          <h2 className="form_heading_sub">c) Mobility</h2>
          <hr className="form_hr_sub" />

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="walkUnaided"
                onChange={e => ocf('walkUnaided', e)}
                label="Walk unaided" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.walkUnaided === 'no' &&
                <AntInput label="Hazards identified & actions required" name="walkUnaidedSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('walkUnaidedSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="managesStairs"
                onChange={e => ocf('managesStairs', e)}
                label="Manages stairs unaided" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.managesStairs === 'no' &&
                <AntInput label="Hazards identified & actions required" name="managesStairsSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('managesStairsSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="usesWalkingAid"
                onChange={e => ocf('usesWalkingAid', e)}
                label="Uses walking aid to walk" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.usesWalkingAid === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="usesWalkingAidSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('usesWalkingAidSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="wheelshair"
                onChange={e => ocf('wheelshair', e)}
                label="Uses self-propelled wheelchair" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.wheelshair === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="wheelshairSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('wheelshairSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="usesElecWheelChair"
                onChange={e => ocf('usesElecWheelChair', e)}
                label="Uses electric wheelchair/ scooter" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.usesElecWheelChair === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="usesElecWheelChairSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('usesElecWheelChairSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="transferIndep"
                onChange={e => ocf('transferIndep', e)}
                label="Transfers independently" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.transferIndep === 'no' &&
                <AntInput label="Hazards identified & actions required" name="transferIndepSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('transferIndepSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="transferWithSuper"
                onChange={e => ocf('transferWithSuper', e)}
                label="Transfers with supervision" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.transferWithSuper === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="transferWithSuperSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('transferWithSuperSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="transferWithHoist"
                onChange={e => ocf('transferWithHoist', e)}
                label="Transfers with hoist" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.transferWithHoist === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="transferWithHoistSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('transferWithHoistSpecify', e)} />
              }
            </Col>
          </Row>


        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    formObj['walkUnaided'] = fv.walkUnaided;
    if (fv.walkUnaided === 'no') {
      formObj['walkUnaidedSpecify'] = fv.walkUnaidedSpecify;
    }//End if condition
    formObj['managesStairs'] = fv.managesStairs;
    if (fv.managesStairs === 'no') {
      formObj['managesStairsSpecify'] = fv.managesStairsSpecify;
    }//End if condition
    formObj['usesWalkingAid'] = fv.usesWalkingAid;
    if (fv.usesWalkingAid === 'yes') {
      formObj['usesWalkingAidSpecify'] = fv.usesWalkingAidSpecify;
    }//End if condition
    formObj['wheelshair'] = fv.wheelshair;
    if (fv.wheelshair === 'yes') {
      formObj['wheelshairSpecify'] = fv.wheelshairSpecify;
    }//End if condition
    formObj['usesElecWheelChair'] = fv.usesElecWheelChair;
    if (fv.usesElecWheelChair === 'yes') {
      formObj['usesElecWheelChairSpecify'] = fv.usesElecWheelChairSpecify;
    }//End if condition
    formObj['transferIndep'] = fv.transferIndep;
    if (fv.transferIndep === 'no') {
      formObj['transferIndepSpecify'] = fv.transferIndepSpecify;
    }//End if condition
    formObj['transferWithSuper'] = fv.transferWithSuper;
    if (fv.transferWithSuper === 'yes') {
      formObj['transferWithSuperSpecify'] = fv.transferWithSuperSpecify;
    }//End if condition
    formObj['transferWithHoist'] = fv.transferWithHoist;
    if (fv.transferWithHoist === 'yes') {
      formObj['transferWithHoistSpecify'] = fv.transferWithHoistSpecify;
    }//End if condition
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step11;