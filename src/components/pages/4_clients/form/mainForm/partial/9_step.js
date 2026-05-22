import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step9 extends Component {
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
          <h2 className="form_heading_sub">a) Communication</h2>
          <hr className="form_hr_sub" />

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="hearing"
                onChange={e => ocf('hearing', e)}
                label="Hearing OK" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.hearing === 'no' &&
                <AntInput label="Hazards identified & actions required" name="hearingSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('hearingSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="speech"
                onChange={e => ocf('speech', e)}
                label="Speech OK" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.speech === 'no' &&
                <AntInput label="Hazards identified & actions required" name="speechSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('speechSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="ableToWrite"
                onChange={e => ocf('ableToWrite', e)}
                label="Able to write" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.ableToWrite === 'no' &&
                <AntInput label="Hazards identified & actions required" name="ableToWriteSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('ableToWriteSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="englishSkill"
                onChange={e => ocf('englishSkill', e)}
                label="English language skills" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.englishSkill === 'no' &&
                <AntInput label="Hazards identified & actions required" name="englishSkillSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('englishSkillSpecify', e)} />
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
    formObj['hearing'] = fv.hearing;
    if (fv.hearing === 'no') {
      formObj['hearingSpecify'] = fv.hearingSpecify;
    }//End if condition
    formObj['speech'] = fv.speech;
    if (fv.speech === 'no') {
      formObj['speechSpecify'] = fv.speechSpecify;
    }//End if condition
    formObj['ableToWrite'] = fv.ableToWrite;
    if (fv.ableToWrite === 'no') {
      formObj['ableToWriteSpecify'] = fv.ableToWriteSpecify;
    }//End if condition
    formObj['englishSkill'] = fv.englishSkill;
    if (fv.englishSkill === 'no') {
      formObj['englishSkillSpecify'] = fv.englishSkillSpecify;
    }//End if condition
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step9;