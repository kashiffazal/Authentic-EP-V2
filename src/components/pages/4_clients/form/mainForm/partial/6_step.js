import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step6 extends Component {
  render() {
    // const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Participant Likes & Dislikes</h2>
          <hr className="form_hr_sub" />

          <Row gutter={window.rowGutter}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <AntInput label="Likes" name="likes" type="textarea"  onChange={(e) => ocf('likes', e)} />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <AntInput label="Dislikes" name="dislikes" type="textarea"  onChange={(e) => ocf('dislikes', e)} />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({
      'likes': fv.likes,
      'dislikes': fv.dislikes
    });
  }//End componentDidMount
}//End class

export default Step6;