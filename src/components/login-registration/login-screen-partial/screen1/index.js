import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import StoreGet from '../../../../store/get';
import LoginForm from '../../partials/login';
import RegistrationForm from '../../partials/registration';
import ForgetPassword from '../../partials/forget-password';
import ResetPassword from '../../partials/reset-password';
import Footer from '../../../home/footer';
import '../mutualStyles.less';
import "./styles.less";

import videoFile from '../../video/login-bg-video.mp4';
import videoPoster from '../../imgs/body-bg-2.jpg';


class Screen1 extends Component {
  constructor(props) {
    super(props)
    this.state = { width: window.innerWidth }//End state
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }//End constructor
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }//End function
  render() {
    const stv_ad = this.props.stv.app_data;
    const stv_br = this.props.stv.brand;
    const stv_cd = this.props.stv.company_data[stv_ad.appClients];
    const st = this.props.formObj;
    const resetPassData = this.props.resetPassData;
    const isMobile = (this.state.width < 576);
    return (
      <div className="screen1">
        <div className="fullscreen-bg">
          <video loop muted autoPlay poster={videoPoster} className="fullscreen-bg-video">
            <source src={videoFile} type="video/webm" />
            <source src={videoFile} type="video/mp4" />
            <source src={videoFile} type="video/ogg" />
          </video>
        </div>
        <div className="bg-image"></div>
        <div className="header-bar">
          <Row>
            <Col lg={12} md={12} sm={24} xs={24} className="text-center-md">
              <a href={stv_cd.webLink} rel="noopener noreferrer" className="company_logo" target="_blank"><img src={`${process.env.PUBLIC_URL}/img/${stv_cd.logo}`} width="110px" alt="Logo" /></a>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="text-right text-center-md fled-sm-between">
              <a href={stv_br.url} rel="noopener noreferrer" className="link" target="_blank"><i className="la la-globe-asia" /> Website</a>
              <a href={stv_br.url_about_us} rel="noopener noreferrer" className="link link_show" target="_blank"><i className="la la-id-card" /> About Us</a>
              <a href={stv_br.url_contact_us} rel="noopener noreferrer" className="link" target="_blank"><i className="la la-phone" /> Contact Us</a>
            </Col>
          </Row>
        </div>
        <div className="form-container">
          <div className="form-width">
            <div className="flex-container">
              <div className="logo">
                {/* --{this.state.width}-- */}
                <img src={`${process.env.PUBLIC_URL}/img/${(isMobile && window.webviewMobile) ? stv_ad.logo_h : stv_ad.logo_v_w}`} alt="Logo" />
              </div>
              {resetPassData ? <ResetPassword user_id={resetPassData} /> :
                <span>
                  {st.loginForm && <LoginForm changeForm={(formName) => this.props.changeForm(formName)} />}
                  {st.registrationForm && <RegistrationForm changeForm={(formName) => this.props.changeForm(formName)} />}
                  {st.forgetPassword && <ForgetPassword changeForm={(formName) => this.props.changeForm(formName)} />}
                </span>}
              <div className="text-center mobile-refresh-btn" style={{ marginTop: '10px', marginBottom: '-40px' }}>
                <button className="btnToLink m-t-10" style={{ color: '#fff' }} onClick={() => window.location.reload(true)}>Refresh <i className="las la-undo-alt" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="login-footer-bar">
          <Footer theme="white" mobileVersion={isMobile ? true : false} loginScreen={true} />
        </div>
      </div>
    )//End return
  }//End render
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }
}//End class
export default connect(StoreGet)(Screen1);