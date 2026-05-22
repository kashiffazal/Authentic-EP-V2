import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
// import { HTTP, GetObjectFromArr, InsertRowInList, contractItemFieldValueSet } from '../../../../../services';

class Step3 extends Component {
  render() {
    // const st = this.state;
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
          <AntInput
            name="previouslyWorked"
            type="radio"
            label="Are you currently working as, or have you previously worked as a Support Worker?"
            containerClassName="long_label"
            vertical
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}

            onChange={(e) => ocf('previouslyWorked', e)}
          />
          {fv.previouslyWorked === 'yes' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <AntInput type="textarea" label="Please tell us a little more about your experience as a Support Worker" name="aboutExperience" noRequired onChange={(e) => ocf('aboutExperience', e)} />
              <AntInput
                name="currentlyWorking"
                type="radio"
                label={`Are you currently working for, or connected to a ${data.companyDetails.name} Client?`}
                containerClassName="long_label"
                vertical
                radioOptions={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}

                onChange={(e) => ocf('currentlyWorking', e)}
                noRequired
              />
              {fv.currentlyWorking === 'yes' &&
                <React.Fragment>
                  <div className="content-divider"></div>
                  <Row gutter={window.rowGutter}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <AntInput label="Client's Name (First Name)" name="currentClientFirstName" onChange={(e) => ocf('currentClientFirstName', e)} noRequired />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <AntInput label="Last Name" name="currentClientLastName" onChange={(e) => ocf('currentClientLastName', e)} noRequired />
                    </Col>
                  </Row>
                </React.Fragment>
              }
            </React.Fragment>
          }
          {fv.previouslyWorked === 'no' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <AntInput type="textarea" label="Tell us a little bit about why you are interested in being a Support Worker" name="whyInterested" onChange={(e) => ocf('whyInterested', e)} noRequired />
            </React.Fragment>
          }

          {fv.currentClientFirstName &&
            <AntInput
              name="haveYouReceiveEmail"
              type="radio"
              label={`Have you received an email from ${data.companyDetails.name} with instructions on how to register as a Casual Support Worker?`}
              containerClassName="long_label"
              vertical
              radioOptions={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]}

              noRequired
              onChange={(e) => ocf('haveYouReceiveEmail', e)}
            />
          }
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    formObj['previouslyWorked'] = fv.previouslyWorked;
    if (fv.previouslyWorked === 'yes') {
      formObj['aboutExperience'] = fv.aboutExperience;
      formObj['currentlyWorking'] = fv.currentlyWorking;
      if (fv.currentlyWorking === 'yes') {
        formObj['currentlyWorking'] = fv.currentlyWorking;
        formObj['currentClientFirstName'] = fv.currentClientFirstName;
        formObj['currentClientLastName'] = fv.currentClientLastName;
        if (fv.currentClientFirstName) {
          formObj['haveYouReceiveEmail'] = fv.haveYouReceiveEmail;
        }//End if condition
      }//End if condition
    }//End if condition
    if (fv.previouslyWorked === 'no') {
      formObj['whyInterested'] = fv.whyInterested;
    }//End if condition
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step3;