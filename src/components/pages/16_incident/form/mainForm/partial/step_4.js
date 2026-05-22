import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import { Row, Col } from 'antd';
import MultiParties from './multi_other_parties';
import SignCanvas from '../../../../../externalComponents/sign-canvas';

class Step_3 extends Component {
  render() {
    const fv = this.props.fv;
    const ocf = this.props.ocf;
    const fp = this.props.fp;
    return (
      <React.Fragment>
        <h2 className="form_heading_sub">Incident Or Accident Investigation</h2>
        <hr className="form_hr_sub" />
        <Row gutter={window.rowGutter}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput name="is_reportable_incident" type="radio" label="Is this a reportable incident?" containerClassName="long_label"
              radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'n/a', label: 'N/A' }]}
              onChange={(e) => ocf('is_reportable_incident', e)}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput name="regulator_notice" label="Which regulators have been notified?" onChange={(e) => ocf('regulator_notice', e)} noRequired={true} />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <AntInput name="referred_to_ndis" type="radio" label="Have you referred to the NDIS Incident Report Policy (for reportable incidents)" containerClassName="long_label"
              radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              onChange={(e) => ocf('referred_to_ndis', e)}
            />
          </Col>
        </Row>

        <strong className="heading-label">Other parties to advise about the incident?</strong>
        <MultiParties formValues={fv} onChange={(e) => ocf('other_parties_multi', e)} fp={fp} />

        <strong className="heading-label">Consideration for further Risk Management</strong>
        <Row gutter={window.rowGutter}>
          <Col lg={8} md={8} sm={24} xs={24}>
            <AntInput name="risk_management_plan" label="Risk Management Plan" onChange={(e) => ocf('risk_management_plan', e)} noRequired={true} />
          </Col>
          <Col lg={8} md={8} sm={24} xs={24}>
            <AntInput name="risk_management_plan_reviewed_by" label="Risk Management plan to be reviewed by" onChange={(e) => ocf('risk_management_plan_reviewed_by', e)} noRequired={true} />
          </Col>
          <Col lg={8} md={8} sm={24} xs={24}>
            <AntInput type="datepicker" name="due_date" label="Date Due" onChange={(e) => ocf('due_date', e)} noRequired={true} />
          </Col>
        </Row>
        <strong className="heading-label">Approval</strong>
        <Row gutter={window.rowGutter}>
          <Col lg={16} md={12} sm={24} xs={24}>
            <AntInput type="textarea" label="Reporting Person or Reviewer Comments" name="reporting_person_comment" style={{ height: '180px' }} onChange={(e) => ocf('reporting_person_comment', e)} />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <div className="text-right">
              <SignCanvas
                label="Signature"
                onChange={(e) => ocf('admin_signature', e)}
                name="admin_signature"
                currentValue={fv.admin_signature}
                width={302}
                height={180}
                loadImg={fv.admin_signature_url}
              />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )//End return
  }//End render
}//End class
export default Step_3;