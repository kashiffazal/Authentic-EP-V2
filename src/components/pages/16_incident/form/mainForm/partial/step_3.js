import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import { Row, Col } from 'antd';
import SignCanvas from '../../../../../externalComponents/sign-canvas';
// import CircleImg from '../../../circle-img.jpg';

class Step_3 extends Component {
  render() {
    const pr = this.props;
    const fv = this.props.fv;
    const ocf = this.props.ocf;
    const defaultProps = {
      brushRadius: 1,
      imgSrc: `${process.env.PUBLIC_URL}/img/circle-img.jpg`,
      brushColor: 'red',
      lazyRadius: 0,
    }
    //Show SPW or User sign Canvas
    const sc = (pr.currentSPWId || fv.spw_user_signature_url || !pr.internalForm);
    return (
      <React.Fragment>
        <h2 className="form_heading_sub">Physical Harm</h2>
        <hr className="form_hr_sub" />
        <Row gutter={window.rowGutter}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput label="Nature of Incident (injury/illness: e.g. burn, sprain, cut etc.)" name="nature_of_injury" onChange={(e) => ocf('nature_of_injury', e)} />
            <AntInput type="textarea" label="How incident occurred (e.g. fall, grabbed by person, muscular stress)" name="how_injury_occurred" style={{ height: '325px' }} onChange={(e) => ocf('how_injury_occurred', e)} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div className="text-right of-auto">
              <SignCanvas
                label="Location on body (please circle and specify)"
                props={defaultProps}
                onChange={(e) => ocf('location_on_body_circle_img', e)}
                name="location_on_body_circle_img"
                currentValue={fv.location_on_body_circle_img}
                width={460}
                height={400}
                loadImg={fv.location_on_body_circle_img_url}
              />
            </div>
          </Col>
        </Row>

        <Row gutter={window.rowGutter}>
          <Col lg={sc ? 16 : 24} md={sc ? 12 : 24} sm={24} xs={24}>
            <Row gutter={window.rowGutter}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput name="treatment_administered" type="radio" label="Treatment administered if required" containerClassName="long_label"
                  radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                  onChange={(e) => ocf('treatment_administered', e)} />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.treatment_administered === 'yes' && <AntInput label="Treatment" name="treatment" onChange={(e) => ocf('treatment', e)} />}
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <AntInput name="referral_required" type="radio" label="Referral required" containerClassName="long_label"
                  radioOptions={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                  onChange={(e) => ocf('referral_required', e)} />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {fv.referral_required === 'yes' && <AntInput label="Who to" name="referral_who_to" onChange={(e) => ocf('referral_who_to', e)} />}
              </Col>
              <Col lg={24} md={24} sm={24} xs={24}>
                <AntInput label="First Aid Attendant Name" name="first_aid_attendant_name" onChange={(e) => ocf('first_aid_attendant_name', e)} />
              </Col>
            </Row>
          </Col>
          {(sc) &&
            <Col lg={8} md={12} sm={24} xs={24}>

              <div className="text-right">
                <SignCanvas
                  disabled
                  label="Signature"
                  onChange={(e) => ocf('spw_user_signature', e)}
                  name="spw_user_signature"
                  currentValue={fv.spw_user_signature}
                  width={302}
                  height={193}
                  loadImg={fv.spw_user_signature_url}
                />
              </div>
            </Col>
          }
        </Row>



      </React.Fragment>
    )//End return
  }//End render
}//End class
export default Step_3;