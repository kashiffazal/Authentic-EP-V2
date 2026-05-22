import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step6 extends Component {
  render() {
    // const fp = this.props.formProps;
    const data = this.props.data;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">About You</h2>
          <hr className="form_hr" />
          <AntInput label="Your Address" placeholder="Street Address" name="your_addr"  onChange={e => ocf('your_addr', e)} />

          <Row gutter={window.rowGutter} >
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Suburb" name="your_suburb"  onChange={e => ocf('your_suburb', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="State" type="select" filter={true} name="your_state" 
                options={data.list.states} value={window.defaultStateId}
                onChange={e => ocf('your_state', e)}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Post Code" name="your_post_code"  onChange={e => ocf('your_post_code', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Country" name="your_country" type="select" filter={true} options={data.list.countries} value={window.defaultCountryId}  onChange={e => ocf('your_country', e)} />
            </Col>
          </Row>
          <Row gutter={window.rowGutter} >
            <Col lg={12} md={12} sm={24} xs={24}>
              <AntInput
                label="Your Email"
                name="your_email"
                onChange={e => ocf('your_email', e)}
              />
              <p className="help">By providing {data.companyDetails.name} with your email address, you authorise {data.companyDetails.name} to use this email address to send you electronic communication from time to time including timesheets, payslip notifications, newsletters, marketing and invitations</p>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <AntInput
                label="Your Mobile"
                name="your_mobile"
                
                onChange={e => ocf('your_mobile', e)}
              />
              <p className="help">By providing {data.companyDetails.name} with your mobile number you authorise {data.companyDetails.name} to use this mobile to send you elecronic communication and SMS Texts from time to time including alerts, marketing and invitations</p>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({
      'your_addr': fv.your_addr,
      'your_suburb': fv.your_suburb,
      'your_state': fv.your_state ? fv.your_state : window.defaultStateId,
      'your_post_code': fv.your_post_code,
      'your_country': fv.your_country ? fv.your_country : window.defaultCountryId,
      'your_email': fv.your_email,
      'your_mobile': fv.your_mobile
    })
    if (!fv.your_country) { this.props.onChangeField('your_country', window.defaultCountryId); }//Set Default Country
    if (!fv.your_state) { this.props.onChangeField('your_state', window.defaultStateId); }//Set Default Country
  }//End componentDidMount
}//End class

export default Step6;