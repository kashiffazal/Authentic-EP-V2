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
          <h2 className="form_heading">Right to Work in Australia</h2>
          <hr className="form_hr" />
          <AntInput
            name="australianCitizen"
            type="radio"
            label="Are you an Australian Citizen or Permanent Resident?"
            containerClassName="long_label"
            vertical
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
            onChange={e => ocf('australianCitizen', e)}
          />

          {fv.australianCitizen === 'no' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <AntInput
                name="haveVisa"
                type="radio"
                label="Do you have a visa that provides you with the Right to Work in Australia?"
                vertical
                containerClassName="long_label"
                radioOptions={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}

                onChange={e => ocf('haveVisa', e)}
                noRequired
              />
              {fv.haveVisa === 'no' &&
                <React.Fragment>
                  <div className="content-divider"></div>
                  <AntInput type="textarea" label="Please provide information below" name="dontHaveVisaDesc" noRequired onChange={e => ocf('dontHaveVisaDesc', e)} />
                </React.Fragment>
              }
              {fv.haveVisa === 'yes' &&
                <React.Fragment>
                  <div className="content-divider"></div>
                  <Row gutter={window.rowGutter} >
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <AntInput label="Class and subclass of your current visa?" name="visaClassSubClass" noRequired onChange={e => ocf('visaClassSubClass', e)} />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                      <AntInput label="Visa grant number" name="visaGrantNumber" noRequired onChange={e => ocf('visaGrantNumber', e)} />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                      <AntInput label="Visa expiry date" type="datepicker" help="dd-mm-yyy" name="visaExpDate" noRequired value={fv.visaExpDate} onChange={e => ocf('visaExpDate', e)} />
                    </Col>
                  </Row>
                  <Row gutter={window.rowGutter} >
                    <Col lg={6} md={12} sm={24} xs={24}>
                      <AntInput label="Passport number" name="passportNumber" noRequired onChange={e => ocf('passportNumber', e)} />
                    </Col>
                    <Col lg={18} md={12} sm={24} xs={24}>
                      <AntInput label="Passport country of issue" name="countryOfIssue" noRequired onChange={e => ocf('countryOfIssue', e)} />
                    </Col>
                  </Row>
                  <Row gutter={window.rowGutter} >
                    <Col lg={24}>
                      <AntInput label="Are there any restrictions on your visa, or any other information about your visa that you think we should know?" type="textarea" name="restrictionsOnVisa" noRequired onChange={e => ocf('restrictionsOnVisa', e)} />
                    </Col>
                  </Row>
                  <Row gutter={window.rowGutter} >
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <AntInput label="Passport date of issue" type="datepicker" help="dd-mm-yyy" name="passportIssueDate" noRequired value={fv.passportIssueDate} onChange={e => ocf('passportIssueDate', e)} />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <AntInput label="Passport date of expiry" type="datepicker" help="dd-mm-yyy" name="passportExpDate" noRequired value={fv.passportExpDate} onChange={e => ocf('passportExpDate', e)} />
                    </Col>
                  </Row>

                </React.Fragment>
              }
            </React.Fragment>
          }



        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    if (fv.australianCitizen) {
      formObj['australianCitizen'] = fv.australianCitizen;
      if (fv.australianCitizen === 'no') {
        formObj['haveVisa'] = fv.haveVisa;
        if (fv.haveVisa === 'yes') {
          formObj['visaClassSubClass'] = fv.visaClassSubClass;
          formObj['visaGrantNumber'] = fv.visaGrantNumber;
          formObj['passportNumber'] = fv.passportNumber;
          formObj['countryOfIssue'] = fv.countryOfIssue;
          formObj['restrictionsOnVisa'] = fv.restrictionsOnVisa;
          // if (fv.uploadCopyOfPassport && fv.uploadCopyOfPassport.length > 0) {
          //   formObj['uploadCopyOfPassport'] = fv.uploadCopyOfPassport;
          // }//End if condition
        } else if (fv.haveVisa === 'no') {
          formObj['dontHaveVisaDesc'] = fv.dontHaveVisaDesc;
        }//End if condition
      }//End if condition
    }//End if condition
    this.props.formProps.setFieldsValue(formObj)
  }//End componentDidMount
}//End class

export default Step9;