import React, { Component } from 'react';
import { Row, Col, Alert } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';


class Step1 extends Component {
  setForm = () => {
    let fv = this.props.formValues;
    // console.log(fv);
    // console.log(this.props.formProps);
    this.props.formProps && this.props.formProps.setFieldsValue({
      'ndis_workers_screening_id': fv.ndis_workers_screening_id,
      'job_ref_id': fv.job_ref_id ? fv.job_ref_id : '',
      'first_name': fv.first_name,
      'last_name': fv.last_name,
      'mobile': fv.mobile,
      'email': fv.email,
      // 'skypeId': fv.skypeId,
      'street_address': fv.street_address,
      'suburb': fv.suburb,
      'state': fv.state ? fv.state : window.defaultStateId,
      'postCode': fv.postCode,
      'country': fv.country ? fv.country : window.defaultCountryId,
      'emergency_first_name': fv.emergency_first_name,
      'emergency_last_name': fv.emergency_last_name,
      'emergency_mobile': fv.emergency_mobile,
      'emergency_email': fv.emergency_email,
      'emergency_relationship': fv.emergency_relationship,
      'emergency_address': fv.emergency_address,
      'emergency_suburb': fv.emergency_suburb,
      'emergency_state': fv.emergency_state ? fv.emergency_state : window.defaultStateId,
      'emergency_postCode': fv.emergency_postCode,
      'emergency_country': fv.emergency_country ? fv.emergency_country : window.defaultCountryId,
    });
    if (!fv.country) { this.props.onChangeField('country', window.defaultCountryId); }//Set Default Country
    if (!fv.state) { this.props.onChangeField('state', window.defaultStateId); }//Set Default Country
    if (!fv.emergency_country) { this.props.onChangeField('emergency_country', window.defaultCountryId); }//Set Default Country
    if (!fv.emergency_state) { this.props.onChangeField('emergency_state', window.defaultStateId); }//Set Default Country
  }//End function
  render() {
    // const st = this.state;
    // const fp = this.props.formProps;
    const data = this.props.data;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    const jobPosition = (this.props.jobData && this.props.jobData.id) ? this.props.jobData.id : false;
    //console.log(data);
    return (
      <React.Fragment>
        {/* -{JSON.stringify(jobPosition)}- */}
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Contact Information</h2>
          <h2 className="form_heading_sub">About You</h2>
          <hr className="form_hr_sub" />

          <Row gutter={window.rowGutter}>
            <Col lg={6} md={24} sm={24} xs={24}>
              <AntInput
                name="ndis_workers_screening_id"
                onChange={e => ocf('ndis_workers_screening_id', e)}
                label="NDIS Workers Screening ID"
              />
            </Col>
            <Col lg={18} md={24} sm={24} xs={24}>
              <Alert className="alert-between-form" message={<span>Don't have NDIS Workers Screening ID? Please contact at <a href={`mailto:${data.companyDetails.emailSupport}`}>{data.companyDetails.emailSupport}</a></span>} type="info" showIcon />
            </Col>
          </Row>

          <Row gutter={window.rowGutter}>
            {!jobPosition &&
              <Col lg={6} md={12} sm={24} xs={24}>
                <AntInput
                  label="Position Applying For"
                  name="job_ref_id"
                  filter={true}
                  options={data.list.jobList}
                  type="select"
                  onChange={e => ocf('job_ref_id', e)}
                />
              </Col>
            }
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="First Name" name="first_name" onChange={e => ocf('first_name', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Last Name" name="last_name" onChange={e => ocf('last_name', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Mobile" name="mobile" onChange={e => ocf('mobile', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Email" name="email" onChange={e => ocf('email', e)} />
            </Col>
            {/* <Col lg={6} md={jobPosition ? 7 : 12} sm={24} xs={24}>
              <AntInput label="Skype ID" name="skypeId" onChange={e => ocf('skypeId', e)} />
            </Col> */}
            <Col lg={jobPosition ? 12 : 12} md={jobPosition ? 10 : 12} sm={24} xs={24}>
              <AntInput label="Street Address" name="street_address" onChange={e => ocf('street_address', e)} />
            </Col>
            <Col lg={6} md={jobPosition ? 7 : 12} sm={24} xs={24}>
              <AntInput label="Suburb" name="suburb" onChange={e => ocf('suburb', e)} />
            </Col>
            {/* </Row>
          <Row gutter={window.rowGutter}> */}
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="State" filter={true} type="select" name="state" options={data.list.states} value={window.defaultStateId} onChange={e => ocf('state', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Post Code" name="postCode" onChange={e => ocf('postCode', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Country" filter={true} type="select" name="country" value={window.defaultCountryId} options={data.list.countries} onChange={e => ocf('country', e)} />
            </Col>
            <Col lg={6} md={24} sm={24} xs={24}>
              <AntInput label="Date of Birth" help="dd-mm-yyyy" type="datepicker" name="dateOfBirth" value={fv.dateOfBirth} onChange={e => ocf('dateOfBirth', e)} />
            </Col>
          </Row>


          <h2 className="form_heading_sub">Emergency Contact</h2>
          <hr className="form_hr_sub" />
          <Row gutter={window.rowGutter}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="First Name" name="emergency_first_name" onChange={e => ocf('emergency_first_name', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Last Name" name="emergency_last_name" onChange={e => ocf('emergency_last_name', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Mobile" name="emergency_mobile" onChange={e => ocf('emergency_mobile', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Email" name="emergency_email" onChange={e => ocf('emergency_email', e)} noRequired={true} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Relationship" name="emergency_relationship" onChange={e => ocf('emergency_relationship', e)} />
            </Col>
            <Col lg={18} md={12} sm={24} xs={24}>
              <AntInput label="Home Address" name="emergency_address" onChange={e => ocf('emergency_address', e)} />
            </Col>
          </Row>
          <Row gutter={window.rowGutter}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Suburb" name="emergency_suburb" onChange={e => ocf('emergency_suburb', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="State" filter={true} type="select" name="emergency_state" options={data.list.states} value={window.defaultStateId} onChange={e => ocf('emergency_state', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Post Code" name="emergency_postCode" onChange={e => ocf('emergency_postCode', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Country" filter={true} type="select" name="emergency_country" value={window.defaultCountryId} options={data.list.countries} onChange={e => ocf('emergency_country', e)} />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    this.setForm();
  }//End componentDidMount


  componentDidUpdate(prevProps) {
    if ((prevProps.formProps !== this.props.formProps)) {
      this.setForm();
    }//End if condition
  }//End if condition


}//End class

export default Step1;