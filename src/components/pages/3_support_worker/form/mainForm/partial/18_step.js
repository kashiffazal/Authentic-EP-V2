import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step18 extends Component {
  render() {
    // const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Criminal Declaration</h2>
          <hr className="form_hr" />
          <AntInput
            name="criminal_declaration"
            type="radio"
            label="Do you have any convictions, finding of guilt and/or pending police charges against you that are less than 10 years old?"
            vertical
            containerClassName="long_label"
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}

            onChange={e => ocf('criminal_declaration', e)}
          />
          {fv.criminal_declaration === 'yes' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <AntInput type="textarea"
                label="Please provide brief description"
                help="(Note: A satisfactory police record check is a prerequisite of the position)"
                name="criminal_declaration_desc"

                noRequired
                onChange={(e) => ocf('criminal_declaration_desc', e)}
              />
            </React.Fragment>
          }
          <Row gutter={window.rowGutter}>
            <Col lg={10} md={12} sm={24} xs={24}>
              <AntInput label="From what date will you be able to start work?" help="dd-mm-yyyy" type="datepicker" name="joiningDate" value={fv.joiningDate} onChange={e => ocf('joiningDate', e)} />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    if (fv.criminal_declaration === 'yes') {
      formObj['criminal_declaration_desc'] = fv.criminal_declaration_desc;
    }//End if condition
    this.props.formProps.setFieldsValue({ criminal_declaration: fv.criminal_declaration, ...formObj });
  }//End componentDidMount
}//End class

export default Step18;