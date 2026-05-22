import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step16 extends Component {
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
          <h2 className="form_heading">Experience & Skills</h2>
          <hr className="form_hr" />

          <AntInput label="Please let us know about your current, or previous, work experience" type="select" name="workExp" 
            options={[
              { label: 'I am currently working' },
              { label: 'I have worked before but am not currently working' },
              { label: 'I have not worked before' }
            ]}
            onChange={e => ocf('workExp', e)}
          />

          {fv.workExp === 'I am currently working' &&
            <React.Fragment>
              <Row gutter={window.rowGutter}>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="What is the name of your current employer?" name="nameOfEmployer"  noRequired onChange={e => ocf('nameOfEmployer', e)} />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="What is the address of your current employer?" placeholder="Street Address" name="exp_street_address"  noRequired onChange={e => ocf('exp_street_address', e)} />
                </Col>
              </Row>
              <Row gutter={window.rowGutter}>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Suburb"  name="exp_suburb"  noRequired onChange={e => ocf('exp_suburb', e)} />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="State" type="select" name="exp_state" 
                    filter noRequired
                    options={data.list.states} value={window.defaultStateId}
                    onChange={e => ocf('exp_state', e)}
                  />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Post Code"  name="exp_postCode"  noRequired onChange={e => ocf('exp_postCode', e)} />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Country" type="select" name="exp_country" 
                    filter
                    options={data.list.countries}
                    noRequired
                    onChange={e => ocf('exp_country', e)}
                    value={window.defaultCountryId}
                  />
                </Col>
              </Row>
              <Row gutter={window.rowGutter}>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="What is your current role?" name="currentWorkRole"  noRequired onChange={e => ocf('currentWorkRole', e)} />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="What are the main skills you have gained in your current role?" name="currentWorkSkills"  noRequired onChange={e => ocf('currentWorkSkills', e)} />
                </Col>
              </Row>
            </React.Fragment>
          }

          {fv.workExp === 'I have worked before but am not currently working' &&
            <React.Fragment>
              <Row gutter={window.rowGutter} >
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="What was the name of your last employer?" name="nameOfLastEmp"  noRequired onChange={e => ocf('nameOfLastEmp', e)} />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="What is the address of your last employer?" placeholder="Street Address" name="exp_last_street_address"  noRequired onChange={e => ocf('exp_last_street_address', e)} />
                </Col>
              </Row>
              <Row gutter={window.rowGutter}>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Suburb"  name="exp_last_suburb"  noRequired onChange={e => ocf('exp_last_suburb', e)} />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="State" type="select" name="exp_last_state" 
                    filter noRequired
                    options={data.list.states} value={window.defaultStateId}
                    onChange={e => ocf('exp_last_state', e)}
                  />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Post Code"  name="exp_last_postCode"  noRequired onChange={e => ocf('exp_last_postCode', e)} />
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <AntInput label="Country" type="select" name="exp_last_country" 
                    filter
                    options={data.list.countries}
                    noRequired
                    onChange={e => ocf('exp_last_country', e)}
                    value={window.defaultCountryId}
                  />
                </Col>
              </Row>
              <Row gutter={window.rowGutter}>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="What year did you stop working for your last employer?" name="yearOfStopWorking"  type="select"
                    options={data.list.years_current}
                    noRequired
                    onChange={e => ocf('yearOfStopWorking', e)}
                  />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AntInput label="What was your previous role?" name="previousRole"  noRequired onChange={e => ocf('previousRole', e)} />
                </Col>
              </Row>
              <AntInput label="What are the main skills you gained in your previous role?" name="previousSkills" type="textarea"  noRequired onChange={e => ocf('previousSkills', e)} />
            </React.Fragment>
          }

          {fv.workExp === 'I have not worked before' &&
            <React.Fragment>
              <AntInput
                name="undertakenVolunteer"
                type="radio"
                label="Have you undertaken any relevant volunteer work?"
                vertical
                containerClassName="long_label"
                radioOptions={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                
                onChange={e => ocf('undertakenVolunteer', e)}
                noRequired
              />
              {fv.undertakenVolunteer === 'yes' &&
                <React.Fragment>
                  <div className="content-divider"></div>
                  <AntInput
                    label="Please let us know what type of volunteering you have undertaken"
                    name="typeOfVolunteering" type="select" 
                    options={[
                      { label: 'Providing informal support to family / friend / neighbour' },
                      { label: 'Work placement through study' },
                      { label: 'Volunteering for a school / organisation / charity / not for profit' },
                      { label: 'Other' }
                    ]}
                    onChange={e => ocf('typeOfVolunteering', e)}
                    noRequired
                  />
                  {fv.typeOfVolunteering === 'Other' &&
                    <Row >
                      <Col lg={24}>
                        <AntInput label="If you have selected Other, please let us know a little more about the type of volunteering you have undertaken" name="otherVolunteering" type="textarea"  noRequired onChange={e => ocf('otherVolunteering', e)} />
                      </Col>
                    </Row>
                  }
                  <Row >
                    <Col lg={24}>
                      <AntInput label="What are the main skills you have developed while volunteering?" name="skillsOnVolunteering" type="textarea"  noRequired onChange={e => ocf('skillsOnVolunteering', e)} />
                    </Col>
                  </Row>
                </React.Fragment>
              }
            </React.Fragment>
          }

          {/* {fv.workExp !== '' &&
            <Row >
              <Col lg={24}>
                <AntFileUpload label="If you have a CV, please upload below"  name="uploadCV"
                  //value={this.state.uploadCV} 
                  noRequired onChange={e => ocf('uploadCV', e)} />
              </Col>
            </Row>
          } */}

        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    formObj['workExp'] = fv.workExp ? fv.workExp : '';
    if (fv.workExp) {
      // if (fv.uploadCV && fv.uploadCV.length > 0) {
      //   formObj['uploadCV'] = fv.uploadCV;
      // }//End if condition
      if (fv.workExp === 'I am currently working') {
        formObj['nameOfEmployer'] = fv.nameOfEmployer;
        formObj['exp_street_address'] = fv.exp_street_address;
        formObj['exp_suburb'] = fv.exp_suburb;
        formObj['exp_state'] = fv.exp_state ? fv.exp_state : window.defaultStateId;
        formObj['exp_postCode'] = fv.exp_postCode;
        formObj['exp_country'] = fv.exp_country ? fv.exp_country : window.defaultCountryId;
        formObj['currentWorkRole'] = fv.currentWorkRole;
        formObj['currentWorkSkills'] = fv.currentWorkSkills;
      }//End if condition  
      if (fv.workExp === 'I have worked before but am not currently working') {
        formObj['nameOfLastEmp'] = fv.nameOfLastEmp;
        formObj['exp_last_street_address'] = fv.exp_last_street_address;
        formObj['exp_last_suburb'] = fv.exp_last_suburb;
        formObj['exp_last_state'] = fv.exp_last_state ? fv.exp_last_state : window.defaultStateId;
        formObj['exp_last_postCode'] = fv.exp_last_postCode;
        formObj['exp_last_country'] = fv.exp_last_country ? fv.exp_last_country : window.defaultCountryId;
        formObj['yearOfStopWorking'] = fv.yearOfStopWorking;
        formObj['previousRole'] = fv.previousRole;
        formObj['previousSkills'] = fv.previousSkills;
      }//End if condition
      if (fv.workExp === 'I have not worked before') {
        formObj['undertakenVolunteer'] = fv.undertakenVolunteer;
        if (fv.undertakenVolunteer === 'yes') {
          formObj['typeOfVolunteering'] = fv.typeOfVolunteering;
          formObj['skillsOnVolunteering'] = fv.skillsOnVolunteering;
          if (fv.typeOfVolunteering === 'Other') {
            formObj['otherVolunteering'] = fv.otherVolunteering;
          }//End if condition
        }//End if condition
      }//End if condition
    }//End if condition
    if (!fv.exp_country) { this.props.onChangeField('exp_country', window.defaultCountryId); }//Set Default Country
    if (!fv.exp_last_country) { this.props.onChangeField('exp_last_country', window.defaultCountryId); }//Set Default Country

    if (!fv.exp_state) { this.props.onChangeField('exp_state', window.defaultStateId); }//Set Default Country
    if (!fv.exp_last_state) { this.props.onChangeField('exp_last_state', window.defaultStateId); }//Set Default Country

    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step16;