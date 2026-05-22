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
          <h2 className="form_heading">Guardian Details (if applicable)</h2>
          <hr className="form_hr_sub" />

          <Row gutter={window.rowGutter}>
            <Col lg={6} md={24} sm={24} xs={24}>
              <AntInput label="Name" name="guardianName" placeholder="Guardian Name"  onChange={(e) => ocf('guardianName', e)} noRequired />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Date of Birth" help="dd-mm-yyyy" type="datepicker" name="guardianDOB"  value={fv.guardianDOB} onChange={e => ocf('guardianDOB', e)} noRequired />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Home Phone" name="guardianHomePhone"  onChange={(e) => ocf('guardianHomePhone', e)} noRequired />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Mobile Phone" name="guardianMobNumber"  onChange={(e) => ocf('guardianMobNumber', e)} noRequired />
            </Col>
          </Row>

          <Row gutter={window.rowGutter}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Work Phone" name="guardianWorkPhone"  onChange={(e) => ocf('guardianWorkPhone', e)} noRequired />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput type="email" label="Email Address" name="guardianEmail"  value={fv.guardianEmail} onChange={e => ocf('guardianEmail', e)} noRequired />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <AntInput label="Street Address" name="guardianAddress"  onChange={e => ocf('guardianAddress', e)} noRequired={true} />
            </Col>
          </Row>

          <Row gutter={window.rowGutter}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="Suburb" name="guardianSubrub"  onChange={e => ocf('guardianSubrub', e)} noRequired={true} />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <AntInput label="State" filter={true} type="select" name="guardianState"  options={data.list.states} value={window.defaultStateId} onChange={e => ocf('guardianState', e)} noRequired={true} />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <AntInput label="Post Code" name="guardianPostcode"  onChange={e => ocf('guardianPostcode', e)} noRequired={true} />
            </Col>
          </Row>

        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({
      'guardianName': fv.guardianName,
      //'guardianDOB': fv.guardianDOB,
      'guardianHomePhone': fv.guardianHomePhone,
      'guardianMobNumber': fv.guardianMobNumber,
      'guardianWorkPhone': fv.guardianWorkPhone,
      'guardianEmail': fv.guardianEmail,
      'guardianAddress': fv.guardianAddress,
      'guardianSubrub': fv.guardianSubrub,
      'guardianState': fv.guardianState ? fv.guardianState : window.defaultStateId,
      'guardianPostcode': fv.guardianPostcode
    });
    if (!fv.state) { this.props.onChangeField('state', window.defaultStateId); }//Set Default Country
  }//End componentDidMount
}//End class

export default Step3;