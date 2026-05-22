import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step12 extends Component {
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
          <h2 className="form_heading_sub">d) Personal Care Assistance Required</h2>
          <hr className="form_hr_sub" />

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="bedMobility"
                onChange={e => ocf('bedMobility', e)}
                label="Bed mobility" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.bedMobility === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="bedMobilitySpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('bedMobilitySpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="showering"
                onChange={e => ocf('showering', e)}
                label="Showering" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.showering === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="showeringSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('showeringSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="toileting"
                onChange={e => ocf('toileting', e)}
                label="Toileting" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.toileting === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="toiletingSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('toiletingSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="grooming"
                onChange={e => ocf('grooming', e)}
                label="Grooming" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.grooming === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="groomingSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('groomingSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="repoInBed"
                onChange={e => ocf('repoInBed', e)}
                label="Repositioning in bed" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.repoInBed === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="repoInBedSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('repoInBedSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="repoInChair"
                onChange={e => ocf('repoInChair', e)}
                label="Repositioning in chair" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.repoInChair === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="repoInChairSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('repoInChairSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="mouthCare"
                onChange={e => ocf('mouthCare', e)}
                label="Mouth care" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.mouthCare === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="mouthCareSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('mouthCareSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="eating"
                onChange={e => ocf('eating', e)}
                label="Eating" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.eating === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="eatingSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('eatingSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="skinCare"
                onChange={e => ocf('skinCare', e)}
                label="Skin care" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.skinCare === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="skinCareSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('skinCareSpecify', e)} />
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
    formObj['bedMobility'] = fv.bedMobility;
    if (fv.bedMobility === 'yes') {
      formObj['bedMobilitySpecify'] = fv.bedMobilitySpecify;
    }//End if condition
    formObj['showering'] = fv.showering;
    if (fv.showering === 'yes') {
      formObj['showeringSpecify'] = fv.showeringSpecify;
    }//End if condition
    formObj['toileting'] = fv.toileting;
    if (fv.toileting === 'yes') {
      formObj['toiletingSpecify'] = fv.toiletingSpecify;
    }//End if condition
    formObj['grooming'] = fv.grooming;
    if (fv.grooming === 'yes') {
      formObj['groomingSpecify'] = fv.groomingSpecify;
    }//End if condition
    formObj['repoInBed'] = fv.repoInBed;
    if (fv.repoInBed === 'yes') {
      formObj['repoInBedSpecify'] = fv.repoInBedSpecify;
    }//End if condition
    formObj['repoInChair'] = fv.repoInChair;
    if (fv.repoInChair === 'yes') {
      formObj['repoInChairSpecify'] = fv.repoInChairSpecify;
    }//End if condition
    formObj['mouthCare'] = fv.mouthCare;
    if (fv.mouthCare === 'yes') {
      formObj['mouthCareSpecify'] = fv.mouthCareSpecify;
    }//End if condition
    formObj['eating'] = fv.eating;
    if (fv.eating === 'yes') {
      formObj['eatingSpecify'] = fv.eatingSpecify;
    }//End if condition
    formObj['skinCare'] = fv.skinCare;
    if (fv.skinCare === 'yes') {
      formObj['skinCareSpecify'] = fv.skinCareSpecify;
    }//End if condition
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step12;