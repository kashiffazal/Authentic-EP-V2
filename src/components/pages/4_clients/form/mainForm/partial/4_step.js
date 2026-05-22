import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step4 extends Component {
  render() {
    // const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const data = this.props.data;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Details of Individual Making Referral</h2>
          <hr className="form_hr_sub" />

          <Row gutter={window.rowGutter}>
            <Col lg={6} md={24} sm={24} xs={24}>
              <AntInput label="Name" name="makeRefName" placeholder="Individual Name"  onChange={(e) => ocf('makeRefName', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Organization" name="makeRefOrg"  onChange={(e) => ocf('makeRefOrg', e)} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Position" name="makeRefPosition"  onChange={(e) => ocf('makeRefPosition', e)} noRequired={true} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput type="email" label="Email" name="makeRefEmail"  onChange={(e) => ocf('makeRefEmail', e)} />
            </Col>
          </Row>

          <AntInput label="Street Address" name="makeRefAddress"  onChange={(e) => ocf('makeRefAddress', e)} noRequired={true} />

          <Row gutter={window.rowGutter}>
            <Col lg={6} md={24} sm={24} xs={24}>
              <AntInput label="Subrub" name="makeRefSubrub"  onChange={(e) => ocf('makeRefSubrub', e)} noRequired={true} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="State" filter={true} type="select" name="makeRefState"  options={data.list.states} value={window.defaultStateId} onChange={e => ocf('makeRefState', e)} noRequired={true} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Postcode" name="makeRefPostCode"  onChange={(e) => ocf('makeRefPostCode', e)} noRequired={true} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Phone" name="makeRefPhone"  onChange={(e) => ocf('makeRefPhone', e)} />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );//End return
  }//End render
  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({
      'makeRefName': fv.makeRefName,
      'makeRefOrg': fv.makeRefOrg,
      'makeRefPosition': fv.makeRefPosition,
      'makeRefEmail': fv.makeRefEmail,
      'makeRefAddress': fv.makeRefAddress,
      'makeRefSubrub': fv.makeRefSubrub,
      'makeRefState': fv.makeRefState ? fv.makeRefState : window.defaultStateId,
      'makeRefPostCode': fv.makeRefPostCode,
      'makeRefPhone': fv.makeRefPhone
    });
    if (!fv.state) { this.props.onChangeField('state', window.defaultStateId); }//Set Default Country
  }//End componentDidMount
}//End class

export default Step4;