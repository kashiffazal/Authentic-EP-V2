import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step8 extends Component {
  render() {
    // const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Safety Information</h2>
          <hr className="form_hr_sub" />

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="anyRisk"
                onChange={e => ocf('anyRisk', e)}
                label="Any risk of self-harm identified" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.anyRisk === 'yes' &&
                <AntInput label="If yes, please specify" name="anyRiskSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('anyRiskSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="harmFromOther"
                onChange={e => ocf('harmFromOther', e)}
                label="Harm from others Identified" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.harmFromOther === 'yes' &&
                <AntInput label="If yes, please specify" name="harmFromOtherSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('harmFromOtherSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="harmToOther"
                onChange={e => ocf('harmToOther', e)}
                label="Harm to others identified" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.harmToOther === 'yes' &&
                <AntInput label="If yes, please specify" name="harmToOtherSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('harmToOtherSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="anyPet"
                onChange={e => ocf('anyPet', e)}
                label="Any pets on the property" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.anyPet === 'yes' &&
                <AntInput label="If yes, please specify" name="anyPetSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('anyPetSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="anyFireamers"
                onChange={e => ocf('anyFireamers', e)}
                label="Any firearms being stored in the property" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.anyFireamers === 'yes' &&
                <AntInput label="If yes, please specify" name="anyFireamersSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('anyFireamersSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="anyDrugHistory"
                onChange={e => ocf('anyDrugHistory', e)}
                label="Any history or current of people using alcohol or drugs at the property" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.anyDrugHistory === 'yes' &&
                <AntInput label="If yes, please specify" name="anyDrugHistorySpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('anyDrugHistorySpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="anyRishToKnow"
                onChange={e => ocf('anyRishToKnow', e)}
                label="Any risk that support staff need to know" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.anyRishToKnow === 'yes' &&
                <AntInput label="If yes, please specify" name="anyRishToKnowSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('anyRishToKnowSpecify', e)} />
              }
            </Col>
          </Row>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={6} md={6} sm={12} xs={24}>
              <AntInput label="Date of Referral" help="dd-mm-yyyy" type="datepicker" name="dateOfRef"  value={fv.dateOfRef} onChange={e => ocf('dateOfRef', e)} />
            </Col>
          </Row>

        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    formObj['anyRisk'] = fv.anyRisk;
    if (fv.anyRisk === 'yes') {
      formObj['anyRiskSpecify'] = fv.anyRiskSpecify;
    }//End if condition
    formObj['harmFromOther'] = fv.harmFromOther;
    if (fv.harmFromOther === 'yes') {
      formObj['harmFromOtherSpecify'] = fv.harmFromOtherSpecify;
    }//End if condition
    formObj['harmToOther'] = fv.harmToOther;
    if (fv.harmToOther === 'yes') {
      formObj['harmToOtherSpecify'] = fv.harmToOtherSpecify;
    }//End if condition
    formObj['anyPet'] = fv.anyPet;
    if (fv.anyPet === 'yes') {
      formObj['anyPetSpecify'] = fv.anyPetSpecify;
    }//End if condition
    formObj['anyFireamers'] = fv.anyFireamers;
    if (fv.anyFireamers === 'yes') {
      formObj['anyFireamersSpecify'] = fv.anyFireamersSpecify;
    }//End if condition
    formObj['anyDrugHistory'] = fv.anyDrugHistory;
    if (fv.anyDrugHistory === 'yes') {
      formObj['anyDrugHistorySpecify'] = fv.anyDrugHistorySpecify;
    }//End if condition
    formObj['anyRishToKnow'] = fv.anyRishToKnow;
    if (fv.anyRishToKnow === 'yes') {
      formObj['anyRishToKnowSpecify'] = fv.anyRishToKnowSpecify;
    }//End if condition
    //formObj['dateOfRef'] = fv.dateOfRef;
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step8;