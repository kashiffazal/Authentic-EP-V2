import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import { Row, Col, Alert, } from 'antd';
import { FlagOutlined } from '@ant-design/icons';


class Step_1 extends Component {
  render() {
    const spwList = this.props.spwList;
    const clientList = this.props.clientList;
    const allegationOnList = this.props.allegationOnList;
    const loader = this.props.loader;
    const fv = this.props.fv;
    const ocf = this.props.ocf;
    const pr = this.props;
    return (
      <React.Fragment>
        <h2 className="form_heading_sub">Details of the affected person or participant</h2>
        <hr className="form_hr_sub" />

        {!this.props.currentSPWId &&
          <Row gutter={window.rowGutter}>
            <Col lg={8} md={8} sm={24} xs={24}>
              {/* =={pr.internalForm ? 'yes Internal' : 'No Internal'}== */}
              <AntInput label={pr.internalForm ? "Filling up the form on behalf of" : "Your Name"} name="spw_user_ref_id" filter={true} options={spwList} type="select" loading={loader} onChange={(e) => { ocf('spw_user_ref_id', e); this.props.getSPWInfo(e, fv.client_ref_id) }} />
            </Col>
            <Col lg={16} md={16} sm={24} xs={24}>
              <Alert className="alert-between-form" message={pr.internalForm ? "If you are filling this form on behalf of Support Worker, just select his/her name" : "Please select your name from this dropdown list"} type="info" showIcon />
            </Col>
          </Row>
        }
        <Row gutter={window.rowGutter}>
          <Col lg={8} md={8} sm={24} xs={24}>
            <AntInput label="Participant Name" name="client_ref_id" filter={true} options={clientList} type="select" loading={loader} onChange={(e) => { ocf('client_ref_id', e); this.props.getSPWInfo(fv.spw_user_ref_id, e) }} />
          </Col>
          <Col lg={8} md={8} sm={24} xs={24}>
            <AntInput label="Affected Person Name (If it's not a client)" name="affected_person_name" noRequired={true} onChange={(e) => ocf('affected_person_name', e)} />
          </Col>
          <Col lg={8} md={8} sm={24} xs={24}>
            <AntInput label="Next of Kin" name="next_of_kin" onChange={(e) => ocf('next_of_kin', e)} noRequired={true}/>
          </Col>
          <Col lg={8} md={8} sm={24} xs={24}>
            <AntInput
              name="report_non_report"
              type="radio"
              label="Is this a reportable incident?"
              containerClassName="long_label"
              vertical
              radioOptions={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]} onChange={(e) => ocf('report_non_report', e)} />
          </Col>
          <Col lg={16} md={16} sm={24} xs={24}>
            {fv.report_non_report === 'yes' &&
              <Alert
                // message="Reportable Incident?"
                description={<div className="fs-12 m-t--5 m-l--6">If this is a Reportable Incident, please refer to the Incident Management Policy for how to report this incident on the NDIS Commission Portal and continue to complete this incident form for internal purpose.</div>}
                type="error"
                showIcon
                icon={<FlagOutlined />}
                style={{ padding: '14px 12px' }}
              />
            }
            {fv.report_non_report === 'no' &&
              <Alert
                // message="Not a reportable incident"
                description={<div className="fs-12 m-t--5 m-l--6">If this is not a reportable incident, continue to complete this incident form and submit to your manager or supervisor for review.</div>}
                type="info"
                showIcon
                style={{ padding: '14px 12px' }}
              />}
          </Col>
        </Row>

        {
          fv.report_non_report === 'yes' &&
          <React.Fragment>
            <AntInput
              name="reportable_list"
              type="radio"
              label="Refer reportable incident list"
              containerClassName="long_label"
              vertical
              radioOptions={[
                { value: 'death', label: 'The death of a person with disability;' },
                { value: 'injury', label: 'Serious injury of a person with disability' },
                { value: 'abuse', label: 'Abuse or neglect of a person with disability' },
                { value: 'sexual_physical', label: 'Unlawful sexual or physical contact with, or assault of, a person with disability' },
                { value: 'sexual_misconduct', label: 'Sexual misconduct committed against, or in the presence of, a person with disability, including grooming of the person for sexual activity' },
                { value: 'restrictive_in_relation', label: 'The use of a restrictive practice in relation to a person with disability, other than where the use is in accordance with an authorisation (however described) of a State or Territory in relation to the person' },
                { value: 'others', label: 'Others' },
              ]} onChange={(e) => ocf('reportable_list', e)} />
            {fv.reportable_list === 'others' && <AntInput label="Others" name="reportable_list_other" onChange={(e) => ocf('reportable_list_other', e)} />}
          </React.Fragment>
        }

        <Row gutter={window.rowGutter} >
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput
              name="rate_risk"
              type="radio"
              label={<span>What is the <strong>Risk Rating</strong> of the is Incident?</span>}
              containerClassName="long_label"
              vertical
              radioOptions={[
                { value: 'catastrophic', label: <span className={fv.rate_risk === 'catastrophic' ? 'risk-rate type-1' : ''}>Catastrophic</span> },
                { value: 'major', label: <span className={fv.rate_risk === 'major' ? 'risk-rate type-2' : ''}>Major</span> },
                { value: 'moderate', label: <span className={fv.rate_risk === 'moderate' ? 'risk-rate type-3' : ''}>Moderate</span> },
                { value: 'minor', label: <span className={fv.rate_risk === 'minor' ? 'risk-rate type-4' : ''}>Minor</span> },
                { value: 'insignificant', label: <span className={fv.rate_risk === 'insignificant' ? 'risk-rate type-5' : ''}>Insignificant</span> }
              ]} onChange={(e) => ocf('rate_risk', e)} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput type="textarea" label="Briefly explain why you’ve rated at this level" name="rate_explain" style={{ height: '141px' }} onChange={(e) => ocf('rate_explain', e)} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput label="Name of Witness (If present, otherwise wright N/A)" name="witness_name" onChange={(e) => ocf('witness_name', e)} onRequired={true} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput label="Phone" name="witness_phone" onChange={(e) => ocf('witness_phone', e)} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput name="was_first_aid" type="radio" label="Was First Aid Required?" containerClassName="long_label"
              radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              onChange={(e) => ocf('was_first_aid', e)} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {fv.was_first_aid === 'yes' && <AntInput label="Who was the First Aid provider?" name="first_aid_provider" onChange={(e) => ocf('first_aid_provider', e)} />}
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput name="was_medical_treatment" type="radio" label="Was medical treatment required?" containerClassName="long_label"
              radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              onChange={(e) => ocf('was_medical_treatment', e)} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {fv.was_medical_treatment === 'yes' && <AntInput label="Who was the treating doctor?" name="medical_treating_doctor" onChange={(e) => ocf('medical_treating_doctor', e)} />}
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput name="was_hospital_treatment" type="radio" label="Was hospital treatment required?" containerClassName="long_label"
              radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              onChange={(e) => ocf('was_hospital_treatment', e)} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {fv.was_hospital_treatment === 'yes' && <AntInput label="Who was the treating doctor?" name="hospital_treating_doctor" onChange={(e) => ocf('hospital_treating_doctor', e)} />}
          </Col>
        </Row>

        <strong className="heading-label">Subject of Allegation</strong>
        <Row gutter={window.rowGutter}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput name="is_allegation_person" type="radio" label="Is any one applicable for Allegation?" containerClassName="long_label"
              radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              onChange={(e) => ocf('is_allegation_person', e)} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {fv.is_allegation_person === 'no' && <AntInput label="If not then why?" name="why_not_allegation" onChange={(e) => ocf('why_not_allegation', e)} />}
          </Col>
          {fv.is_allegation_person === 'yes' &&
            <React.Fragment>
              <Col lg={24} md={24} sm={24} xs={24}>
                <AntInput label="Allegation On" name="spw_ref_id_allegation" filter={true} options={allegationOnList} type="select" loading={loader} onChange={(e) => ocf('spw_ref_id_allegation', e)} />
              </Col>
              {fv.spw_ref_id_allegation === '-' &&
                <React.Fragment>
                  <Col lg={6} md={6} sm={24} xs={24}>
                    <AntInput label="Surname" name="allegation_surname" onChange={(e) => ocf('allegation_surname', e)} />
                  </Col>
                  <Col lg={6} md={6} sm={24} xs={24}>
                    <AntInput label="Other Name/s" name="allegation_other_name" onChange={(e) => ocf('allegation_other_name', e)} />
                  </Col>
                  <Col lg={6} md={6} sm={24} xs={24}>
                    <AntInput name="allegation_gender" type="radio" label="Gender" containerClassName="long_label"
                      radioOptions={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
                      onChange={(e) => ocf('allegation_gender', e)} noRequired={true} />
                  </Col>
                  <Col lg={6} md={6} sm={24} xs={24}>
                    <AntInput label="Telephone" name="allegation_phone" onChange={(e) => ocf('allegation_phone', e)} noRequired={true} />
                  </Col>
                </React.Fragment>
              }
            </React.Fragment>
          }
        </Row>

      </React.Fragment>
    )//End return
  }//End render
  // componentDidMount() {
  //   setTimeout(() => {
  //     let fv = this.props.fv;
  //     this.props.fp.setFieldsValue({
  //       'spw_ref_id': fv.spw_ref_id,
  //       'client_ref_id': fv.client_ref_id,
  //       'affected_person_name': fv.affected_person_name,
  //       'next_of_kin': fv.next_of_kin,
  //       'report_non_report': fv.report_non_report,
  //       'reportable_list': fv.reportable_list,
  //       'rate_risk': fv.rate_risk,
  //       'rate_explain': fv.rate_explain,
  //       'witness_name': fv.witness_name,
  //       'witness_phone': fv.witness_phone,
  //       'was_first_aid': fv.was_first_aid,
  //       'first_aid_provider': fv.first_aid_provider,
  //       'was_medical_treatment': fv.was_medical_treatment,
  //       'medical_treating_doctor': fv.medical_treating_doctor,
  //       'was_hospital_treatment': fv.was_hospital_treatment,
  //       'hospital_treating_doctor': fv.hospital_treating_doctor
  //     });
  //     if (!this.props.currentSPWId) { /*Get SPW Data*/ }//End if condition
  //   }, 500);
  // }//End componentDidMount
}//End class
export default Step_1;