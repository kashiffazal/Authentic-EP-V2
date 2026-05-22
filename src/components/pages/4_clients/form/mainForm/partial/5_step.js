import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step5 extends Component {
  render() {
    // const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Participant Diagnosis</h2>
          <hr className="form_hr_sub" />

          <Row gutter={window.rowGutter}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <AntInput label="Primary Diagnosis" name="primaryDiagnos" type="textarea"  onChange={(e) => ocf('primaryDiagnos', e)} />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <AntInput label="Secondary Diagnosis" name="secondaryDiagnos" type="textarea"  onChange={(e) => ocf('secondaryDiagnos', e)} />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({
      'primaryDiagnos': fv.primaryDiagnos,
      'secondaryDiagnos': fv.secondaryDiagnos
    });
  }//End componentDidMount
}//End class

export default Step5;