import React, { Component } from 'react';
import { Progress, Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import { GetCurrentDate } from '../../../../../services';
import SignCanvas from '../../../../../externalComponents/sign-canvas';

class Step20 extends Component {
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

          <h2 className="form_heading">Certification</h2>
          <hr className="form_hr m-b-10" />
          <p>
            I, hereby, certify that all the information provided on this application is correct and complete to the best of my knowledge and belief. I understand that providing false or misleading information will be a basis for rejection of my application, and if I am employed, I will be liable for immediate termination.</p>
          <p>I authorize {data.companyDetails.name} PTY LTD to contact former employers and educational organizations regarding my employment and education. I authorize my former employers and educational organizations to fully and freely communicate information regarding my previous employment, attendance, and grades. I authorize those persons designated as references to fully and freely communicate information regarding my previous employment and education.</p>

          <AntInput
            type="checkbox"
            name="confirmation"

            text="Do you agree with this certification?"
            // containerClassName="long_checkbox_label"
            reqMsg="Please tick the box"
            onChange={e => ocf('confirmation', e)}
          />


          <h2 className="form_heading">Declaration</h2>
          <hr className="form_hr m-b-10" />
          <p>To the best of my knowledge, I believe that the above statements are true and correct. I understand that any deliberately false, misleading or incomplete statements may lead to my dismissal, if employed.</p>
          <p>I, <strong>{fv.first_name} {fv.last_name}</strong> give this company permission to conduct the relevant reference checks and obtain the required information from past employers and or other relevant parties. I understand that this will be done in an ethical and legal manner and will not compromise my current employment situation.</p>


          <Row gutter={window.rowGutterSmall} justify="space-between" align="bottom">
            <Col lg={8} md={9} sm={24} xs={24} className="p-b-6">
              <div className="text-center">
                {fv.inserted_date ? fv.inserted_date : GetCurrentDate('DD-MM-Y')}
                <hr />
                Date of Submitting
              </div>
            </Col>
            <Col lg={8} md={6} sm={24} xs={24}></Col>
            <Col lg={8} md={9} sm={24} xs={24}>

              {/* {fv.swSignUrl} */}
              {/* <hr/><hr/> */}
              {/* {JSON.stringify(fv.swSign)} */}

              <div className="text-center">
                <SignCanvas
                  onChange={e => ocf('swSign', e)}
                  name="swSign"
                  currentValue={fv.swSign}
                  width={306}
                  height={172}
                  loadImg={fv.swSignUrl}
                />
                {/* } */}
                <hr />
                Signature
              </div>
            </Col>
          </Row>


        </div>

        <Fade collapse when={this.props.uploadProgress > 0}>
          <div className="uploader-progress-container">
            <div>Uploading Document(s) {this.props.uploadProgress}%</div>
            <Progress strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={this.props.uploadProgress} status="active" />
          </div>
        </Fade>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({ 'confirmation': fv.confirmation })
  }//End componentDidMount
}//End class

export default Step20;