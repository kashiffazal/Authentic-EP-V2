import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step10 extends Component {
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
          <h2 className="form_heading_sub">b) Cognition</h2>
          <hr className="form_hr_sub" />

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="willingToParticipate"
                onChange={e => ocf('willingToParticipate', e)}
                label="Client willing to participate and assist in care" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.willingToParticipate === 'no' &&
                <AntInput label="Hazards identified & actions required" name="willingToParticipateSpecity" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('willingToParticipateSpecity', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="orientation"
                onChange={e => ocf('orientation', e)}
                label="Oriented in time and place" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.orientation === 'no' &&
                <AntInput label="Hazards identified & actions required" name="orientationSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('orientationSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="acceptDiraction"
                onChange={e => ocf('acceptDiraction', e)}
                label="Client able to accept direction and instruction" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.acceptDiraction === 'no' &&
                <AntInput label="Hazards identified & actions required" name="acceptDiractionSpecific" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('acceptDiractionSpecific', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="shortMemory"
                onChange={e => ocf('shortMemory', e)}
                label="Short-term memory issues" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.shortMemory === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="shortMemorySpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('shortMemorySpecify', e)} />
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
    formObj['willingToParticipate'] = fv.willingToParticipate;
    if (fv.willingToParticipate === 'no') {
      formObj['willingToParticipateSpecity'] = fv.willingToParticipateSpecity;
    }//End if condition
    formObj['orientation'] = fv.orientation;
    if (fv.orientation === 'no') {
      formObj['orientationSpecify'] = fv.orientationSpecify;
    }//End if condition
    formObj['acceptDiraction'] = fv.acceptDiraction;
    if (fv.acceptDiraction === 'no') {
      formObj['acceptDiractionSpecific'] = fv.acceptDiractionSpecific;
    }//End if condition
    formObj['shortMemory'] = fv.shortMemory;
    if (fv.shortMemory === 'yes') {
      formObj['shortMemorySpecify'] = fv.shortMemorySpecify;
    }//End if condition
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step10;