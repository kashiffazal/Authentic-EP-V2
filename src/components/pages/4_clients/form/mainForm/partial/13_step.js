import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step13 extends Component {
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
          <h2 className="form_heading_sub">e) Violence Risk</h2>
          <hr className="form_hr_sub" />

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="phyAggToSp"
                onChange={e => ocf('phyAggToSp', e)}
                label="Physical aggression to support worker" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.phyAggToSp === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="phyAggToSpSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('phyAggToSpSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="verAggToSp"
                onChange={e => ocf('verAggToSp', e)}
                label="Verbal aggression to support worker" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.verAggToSp === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="verAggToSpSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('verAggToSpSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="aggToClients"
                onChange={e => ocf('aggToClients', e)}
                label="Aggression to other clients" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.aggToClients === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="aggToClientsSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('aggToClientsSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="aggWithObjects"
                onChange={e => ocf('aggWithObjects', e)}
                label="Aggression with/against objects" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.aggWithObjects === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="aggWithObjectsSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('aggWithObjectsSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="selfHarm"
                onChange={e => ocf('selfHarm', e)}
                label="Self-harm" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.selfHarm === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="selfHarmSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('selfHarmSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="subAbuse"
                onChange={e => ocf('subAbuse', e)}
                label="Substance abuse" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.subAbuse === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="subAbuseSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('subAbuseSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="sexualAbuse"
                onChange={e => ocf('sexualAbuse', e)}
                label="Sexual abuse" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.sexualAbuse === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="sexualAbuseSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('sexualAbuseSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="threatsToStaff"
                onChange={e => ocf('threatsToStaff', e)}
                label="Threats to staff in any way" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.threatsToStaff === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="threatsToStaffSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('threatsToStaffSpecify', e)} />
              }
            </Col>
          </Row>

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="useEmotionToAcGols"
                onChange={e => ocf('useEmotionToAcGols', e)}
                label="Use of emotions to achieve goals" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} 
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {fv.useEmotionToAcGols === 'yes' &&
                <AntInput label="Hazards identified & actions required" name="useEmotionToAcGolsSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details"  onChange={e => ocf('useEmotionToAcGolsSpecify', e)} />
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
    formObj['phyAggToSp'] = fv.phyAggToSp;
    if (fv.phyAggToSp === 'yes') {
      formObj['phyAggToSpSpecify'] = fv.phyAggToSpSpecify;
    }//End if condition
    formObj['verAggToSp'] = fv.verAggToSp;
    if (fv.verAggToSp === 'yes') {
      formObj['verAggToSpSpecify'] = fv.verAggToSpSpecify;
    }//End if condition
    formObj['aggToClients'] = fv.aggToClients;
    if (fv.aggToClients === 'yes') {
      formObj['aggToClientsSpecify'] = fv.aggToClientsSpecify;
    }//End if condition
    formObj['aggWithObjects'] = fv.aggWithObjects;
    if (fv.aggWithObjects === 'yes') {
      formObj['aggWithObjectsSpecify'] = fv.aggWithObjectsSpecify;
    }//End if condition
    formObj['selfHarm'] = fv.selfHarm;
    if (fv.selfHarm === 'yes') {
      formObj['selfHarmSpecify'] = fv.selfHarmSpecify;
    }//End if condition
    formObj['subAbuse'] = fv.subAbuse;
    if (fv.subAbuse === 'yes') {
      formObj['subAbuseSpecify'] = fv.subAbuseSpecify;
    }//End if condition
    formObj['sexualAbuse'] = fv.sexualAbuse;
    if (fv.sexualAbuse === 'yes') {
      formObj['sexualAbuseSpecify'] = fv.sexualAbuseSpecify;
    }//End if condition
    formObj['threatsToStaff'] = fv.threatsToStaff;
    if (fv.threatsToStaff === 'yes') {
      formObj['threatsToStaffSpecify'] = fv.threatsToStaffSpecify;
    }//End if condition
    formObj['useEmotionToAcGols'] = fv.useEmotionToAcGols;
    if (fv.useEmotionToAcGols === 'yes') {
      formObj['useEmotionToAcGolsSpecify'] = fv.useEmotionToAcGolsSpecify;
    }//End if condition
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step13;