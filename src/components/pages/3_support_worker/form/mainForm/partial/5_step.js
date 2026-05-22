import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step5 extends Component {
  render() {
    // const fp = this.props.formProps;
    const data = this.props.data;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Support Worker Role</h2>
          <hr className="form_hr" />
          <p>{data.companyDetails.name} does not require you work only for us. However, later on in the registration process you will be asked to sign a <strong>DWES Consent & Acknowledgement form.</strong> One of the conditions on this form is that you tell us the <strong>name and address</strong> of any other disability service providers that you work for, or you intend to work for.</p>
          <b>Please select the appropriate statement from the list below.</b>
          <AntInput
            containerStyle={{ marginBottom: '5px' }}
            name="secondaryEmploymentDeclaration"
            type="radio"
            label="Secondary employment declaration"
            containerClassName="long_label"
            vertical
            radioOptions={[
              { label: 'Yes I currently work for one or more other disability services providers' },
              // { label: 'Yes I intend to work for one or more other disability service providers' },
              { label: 'No I do not currently work for any disability service provider.' }
            ]}

            onChange={(e) => ocf('secondaryEmploymentDeclaration', e)}
            noRequired
          />
          <div className="content-divider"></div>
          <p className="help">If you know the name and address of the organisation, or organisations you will be working for, please provide the information below or, once known, email the name and address of the organisation or organisations to <strong><a href={`mailto:${data.companyDetails.emailSupport}`}>{data.companyDetails.emailSupport}</a></strong></p>
          {
            (fv.secondaryEmploymentDeclaration === 'Yes I currently work for one or more other disability services providers' ||
              fv.secondaryEmploymentDeclaration === 'Yes I intend to work for one or more other disability service providers') &&
            <React.Fragment>
              {/* First Organization */}
              <Row gutter={window.rowGutter}>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="First Organization Name" name="first_org_name" onChange={e => ocf('first_org_name', e)} />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="First Organization Address" placeholder="Street Address" name="first_org_addr" onChange={e => ocf('first_org_addr', e)} />
                </Col>
              </Row>
              <Row gutter={window.rowGutter} >
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Suburb" name="first_org_suburb" onChange={e => ocf('first_org_suburb', e)} />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="State" type="select" name="first_org_state"
                    filter
                    options={data.list.states} value={window.defaultStateId}
                    onChange={e => ocf('first_org_state', e)}
                  />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Post Code" name="first_org_post_code" onChange={e => ocf('first_org_post_code', e)} />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Country" name="first_org_country" type="select" filter options={data.list.countries} value={window.defaultCountryId} onChange={e => ocf('first_org_country', e)} />
                </Col>
              </Row>
              <Row gutter={window.rowGutter} >
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Name Of Manager" name="first_org_manager_name" onChange={e => ocf('first_org_manager_name', e)} />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Manager Contact Number" name="first_org_manager_contact_no" onChange={e => ocf('first_org_manager_contact_no', e)} />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <AntInput label="Your Role in the Organization" name="first_org_role" onChange={e => ocf('first_org_role', e)} />
                </Col>
              </Row>
              {/* Second Organization */}
              <hr className="form_hr" />
              <div className="m-t-15"></div>
              <Row gutter={window.rowGutter}>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="Second Organization Name" name="second_org_name" noRequired onChange={e => ocf('second_org_name', e)} />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="Second Organization Address" placeholder="Street Address" name="second_org_addr" noRequired onChange={e => ocf('second_org_addr', e)} />
                </Col>
              </Row>
              <Row gutter={window.rowGutter}>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Suburb" name="second_org_suburb" noRequired onChange={e => ocf('second_org_suburb', e)} />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="State" type="select" name="second_org_state"
                    filter noRequired
                    options={data.list.states} value={window.defaultStateId}
                    onChange={e => ocf('second_org_state', e)}
                  />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Post Code" name="second_org_post_code" noRequired onChange={e => ocf('second_org_post_code', e)} />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Country" name="second_org_country" type="select" filter options={data.list.countries} value={window.defaultCountryId} noRequired onChange={e => ocf('second_org_country', e)} />
                </Col>
              </Row>
              <Row gutter={window.rowGutter} >
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Name Of Manager" name="second_org_manager_name" noRequired onChange={e => ocf('second_org_manager_name', e)} />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Manager Contact Number" name="second_org_manager_contact_no" noRequired onChange={e => ocf('second_org_manager_contact_no', e)} />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <AntInput label="Your Role in the Organization" name="second_org_role" noRequired onChange={e => ocf('second_org_role', e)} />
                </Col>
              </Row>

            </React.Fragment>
          }

        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};

    if (fv.secondaryEmploymentDeclaration) { this.props.formProps.setFieldsValue({ secondaryEmploymentDeclaration: fv.secondaryEmploymentDeclaration }); }//End if condition

    if (
      fv.secondaryEmploymentDeclaration === 'Yes I currently work for one or more other disability services providers' ||
      fv.secondaryEmploymentDeclaration === 'Yes I intend to work for one or more other disability service providers'
    ) {
      formObj = {
        secondaryEmploymentDeclaration: fv.secondaryEmploymentDeclaration,
        first_org_name: fv.first_org_name,
        first_org_addr: fv.first_org_addr,
        first_org_suburb: fv.first_org_suburb,
        first_org_state: fv.first_org_state ? fv.first_org_state : window.defaultStateId,
        first_org_post_code: fv.first_org_post_code,
        first_org_country: fv.first_org_country ? fv.first_org_country : window.defaultCountryId,
        first_org_manager_name: fv.first_org_manager_name,
        first_org_manager_contact_no: fv.first_org_manager_contact_no,
        first_org_role: fv.first_org_role,
        second_org_name: fv.second_org_name,
        second_org_addr: fv.second_org_addr,
        second_org_suburb: fv.second_org_suburb,
        second_org_state: fv.second_org_state ? fv.second_org_state : window.defaultStateId,
        second_org_post_code: fv.second_org_post_code,
        second_org_country: fv.second_org_country ? fv.second_org_country : window.defaultCountryId,
        second_org_manager_name: fv.second_org_manager_name,
        second_org_manager_contact_no: fv.second_org_manager_contact_no,
        second_org_role: fv.second_org_role,
      };
      this.props.formProps.setFieldsValue(formObj);
    }//End if condition
    if (!fv.first_org_country) { this.props.onChangeField('first_org_country', window.defaultCountryId); }//Set Default Country
    if (!fv.second_org_country) { this.props.onChangeField('second_org_country', window.defaultCountryId); }//Set Default Country
    if (!fv.first_org_state) { this.props.onChangeField('first_org_state', window.defaultStateId); }//Set Default Country
    if (!fv.second_org_state) { this.props.onChangeField('second_org_state', window.defaultStateId); }//Set Default Country
  }//End componentDidMount
}//End class

export default Step5;