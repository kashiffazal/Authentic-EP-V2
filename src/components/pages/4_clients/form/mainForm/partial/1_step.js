import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import UploadFile from '../../../../../externalComponents/antd-upload-file-component';


class Step1 extends Component {
  render() {
    // const st = this.state;
    const fp = this.props.formProps;
    const data = this.props.data;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    //console.log(data);
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Details of Participant</h2>
          <hr className="form_hr_sub" />
          <Row gutter={window.rowGutter}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="First Name" name="first_name" onChange={e => ocf('first_name', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Last Name" name="last_name" onChange={e => ocf('last_name', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Date of Birth" help="dd-mm-yyyy" type="datepicker" name="dateOfBirth" value={fv.dateOfBirth} onChange={e => ocf('dateOfBirth', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Place of Birth" filter={true} type="select" name="bornCountry" value={window.defaultCountryId} options={data.list.countries} onChange={e => ocf('bornCountry', e)} noRequired={true} />
            </Col>
          </Row>


          <Row gutter={window.rowGutter}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Gender" filter={true} type="select" name="gender" options={data.list.gender} onChange={e => ocf('gender', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Preferred Language" name="prefered_lang" onChange={e => ocf('prefered_lang', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Interpreter Required?" filter={true} type="select" name="interpreterReq" options={[
                { 'label': 'Yes', 'value': 'Yes' },
                { 'label': 'No', 'value': 'No' }
              ]} onChange={e => ocf('interpreterReq', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="NDIS Number" name="ndisNumber" onChange={e => ocf('ndisNumber', e)} />
            </Col>
          </Row>

          <Row gutter={window.rowGutter}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Street Address" name="street_address" onChange={e => ocf('street_address', e)} noRequired={true} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Suburb" name="suburb" onChange={e => ocf('suburb', e)} noRequired={true} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="State" filter={true} type="select" name="state" options={data.list.states} value={window.defaultStateId} onChange={e => ocf('state', e)} noRequired={true} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Post Code" name="postCode" onChange={e => ocf('postCode', e)} noRequired={true} />
            </Col>
          </Row>

          <Row gutter={window.rowGutter}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput type="email" label="Email" name="email" onChange={e => ocf('email', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Contact Number" name="contactNumber" onChange={e => ocf('contactNumber', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="NDIS Plan Date" help="dd-mm-yyyy" type="datepicker" name="ndisPlanDate" value={fv.ndisPlanDate} onChange={e => ocf('ndisPlanDate', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="NDIS End Date" help="dd-mm-yyyy" type="datepicker" name="ndisEndDate" value={fv.ndisEndDate} onChange={e => ocf('ndisEndDate', e)} />
            </Col>
          </Row>

          <h2 className="form_heading_sub">Plan Manager & Contact Person</h2>
          <hr className="form_hr_sub" />

          <Row gutter={window.rowGutter}>

            <Col lg={8} md={8} sm={24} xs={24}>
              <AntInput label="Plan Manager Name" name="planMangName" onChange={e => ocf('planMangName', e)} />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <AntInput label="Plan Manager Contact Number" name="planMangNumber" onChange={e => ocf('planMangNumber', e)} />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <AntInput type="email" label="Plan Manager Email" name="planMangEmail" onChange={e => ocf('planMangEmail', e)} />
            </Col>
          </Row>

          <Row gutter={window.rowGutter}>
            <Col lg={8} md={8} sm={24} xs={24}>
              <AntInput label="Emergency Contact Person Name" name="emConPersonName" onChange={e => ocf('emConPersonName', e)} />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <AntInput label="Relationship to NDIS participant" name="relationToParti" onChange={e => ocf('relationToParti', e)} />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <AntInput label="Contact Person Number" name="emContPersonNumber" onChange={e => ocf('emContPersonNumber', e)} />
            </Col>
          </Row>

          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <label>Please upload a pdf copy of your approved NDIS plan:</label>
              <UploadFile
                formProps={fp}
                name="ndisPlanDoc"
                uploadedDocuments={fv.ndisPlanDocument}
                filePath={`${fv.filePath}/NDISPlanDoc/`}
                value={fv.ndisPlanDoc}
                onChange={e => ocf('ndisPlanDoc', e)}
                title="Approved NDIS Plan" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" restrictExtension="jpg,jpeg,png,pdf,doc,docx" fileSize="5" noRequired={true} />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <AntInput type="textarea" name="ndisGoals" onChange={e => ocf('ndisGoals', e)} label="Please write your NDIS Goals below" style={{ 'height': '101px' }} noRequired={true} />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({
      'first_name': fv.first_name,
      'last_name': fv.last_name,
      'bornCountry': fv.bornCountry ? fv.bornCountry : window.defaultCountryId,
      'gender': fv.gender ? fv.gender : '',
      'prefered_lang': fv.prefered_lang,
      'interpreterReq': fv.interpreterReq ? fv.interpreterReq : '',
      'ndisNumber': fv.ndisNumber,
      'street_address': fv.street_address,
      'suburb': fv.suburb,
      'state': fv.state ? fv.state : window.defaultStateId,
      'postCode': fv.postCode,
      'email': fv.email,
      'contactNumber': fv.contactNumber,
      //'ndisPlanDate': fv.ndisPlanDate,
      //'ndisEndDate': fv.ndisEndDate,
      'planMangName': fv.planMangName,
      'planMangNumber': fv.planMangNumber,
      'planMangEmail': fv.planMangEmail,
      'emConPersonName': fv.emConPersonName,
      'relationToParti': fv.relationToParti,
      'emContPersonNumber': fv.emContPersonNumber,
      'ndisGoals': fv.ndisGoals
    });
    if (!fv.bornCountry) { this.props.onChangeField('bornCountry', window.defaultCountryId); }//Set Default Country
    if (!fv.state) { this.props.onChangeField('state', window.defaultStateId); }//Set Default Country
  }//End componentDidMount


  // componentDidUpdate(prevProps) {
  //   console.log(prevProps.data,this.props.data)
  //   if ((prevProps.data !== this.props.data)) {
  //     let fv = this.props.formValues;
  //     alert('dd');
  //     this.props.formProps.setFieldsValue({'country': fv.country ? fv.country : data.list.defaultCountryId})
  //   }//End if condityion
  // }//End if condition


}//End class

export default Step1;