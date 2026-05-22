import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import { GetCurrentDate } from '../../../../../services';
import SignCanvas from '../../../../../externalComponents/sign-canvas';


class Step15 extends Component {
  render() {
    // const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Declaration by the Person Filling up the Referral Form</h2>
          <hr className="form_hr_sub" />

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={20} md={20} sm={24} className="p-b-6">
              <span className="lh-2-2">I am a support coordinator or authorized representative of the participant and I confirm that I am filling out this referral form on behalf of the
                <AntInput
                  name="onBehalfOfName"
                  onChange={e => ocf('onBehalfOfName', e)}
                  // label="Name"
                  placeholder="Name"
                  size="small"
                  containerClassName="inline-form-field"
                />
                .</span>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}></Col>
          </Row>


          <Row gutter={window.rowGutterSmall} justify="space-between" align="bottom">
            <Col lg={8} md={9} sm={24} xs={24} className="p-b-6">
              <div className="text-center">
                {fv.inserted_date ? fv.inserted_date : GetCurrentDate('DD-MM-Y')}
                <hr />
                Date of Submitting Referral
              </div>
            </Col>
            <Col lg={8} md={6} sm={24} xs={24}></Col>
            <Col lg={8} md={9} sm={24} xs={24}>

              {/* {fv.referralSignUrl} */}

              <div className="text-center">
                {/* {fv.referralSign ? */}
                {/* <div className="sign-image-boxd"> */}
                {/* <> */}
                {/* <button title="Reset Signature" type="button" className="reset-btn btnToLink" onClick={e => ocf('referralSign', '')}><i className="las la-sync" /></button> */}
                {/* <img src={fv.referralSign} alt="" /> */}
                {/* <SignCanvas

                        onChange={e => ocf('referralSign', e)}
                        width={306}
                        loadImg={fv.referralSign}
                      /> */}


                {/* </> */}
                {/* </div> : */}
                <SignCanvas
                  onChange={e => ocf('referralSign', e)}
                  name="referralSign"
                  currentValue={fv.referralSign}
                  width={306}
                  height={172}
                  loadImg={fv.referralSignUrl}
                />
                {/* } */}
                <hr />
                Signature
              </div>
            </Col>
          </Row>

        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({ 'onBehalfOfName': fv.onBehalfOfName });
  }//End componentDidMount
}//End class

export default Step15;