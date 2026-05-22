import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import StoreGet from '../../../../store/get';
import LoginForm from '../../partials/login';
import RegistrationForm from '../../partials/registration';
import ForgetPassword from '../../partials/forget-password';
import ResetPassword from '../../partials/reset-password';
// import Footer from '../../../home/footer';
import '../mutualStyles.less';
import "./styles.less";

import videoFile from '../../video/login-bg-video.mp4';
import videoPoster from '../../imgs/body-bg-2.jpg';


class Screen1 extends Component {
  render() {
    // let videoFile = {};
    // if(window.webviewMobile){
    //   videoFile = require(`../../video/login-bg-video-mobile.mp4`);
    // }else{
    //   videoFile = require(`../../video/login-bg-video.mp4`);
    // }
    // videoFile = videoFile.default+'?k='+Math.random();
    // console.log(videoFile);
    const stv_ad = this.props.stv.app_data;
    const st = this.props.formObj;
    const resetPassData = this.props.resetPassData;
    return (
      <React.Fragment>
        <div className="screen2">
          <div className="fullscreen-bg">
            <video loop muted autoPlay poster={videoPoster} className="fullscreen-bg-video">
              <source src={videoFile} type="video/webm" />
              <source src={videoFile} type="video/mp4" />
              <source src={videoFile} type="video/ogg" />
            </video>
          </div>
          <div className="bg-image"></div>
          <div className="container-scr-2">
            <Row gutter={0}>
              <Col lg={9} md={24} sm={24} xs={24} className="bg-section trans">

                <div className="bg-section-color">
                  <div className="text-center">
                    {resetPassData ?
                      <React.Fragment>
                        <h1>Reset <strong>Password</strong></h1>
                        <p>Reset your password with new one</p>
                      </React.Fragment>
                      :
                      <React.Fragment>
                        <h1>Welcome to <strong>{stv_ad.app_name}</strong></h1>
                        <p>Login to access your account</p>
                      </React.Fragment>
                    }
                  </div>
                </div>
              </Col>
              <Col lg={15} md={24} sm={24} xs={24} className="trans">
                <div className="form-section">
                  <div className="w-container">
                    <img src={`${process.env.PUBLIC_URL}/img/${stv_ad.logo_v}`} alt="Logo" className="company_logo" width="114px" />
                    {resetPassData ? <ResetPassword user_id={resetPassData} /> :
                      <span>
                        {st.loginForm &&
                          <React.Fragment>
                            <h1 className="heading">Login</h1>
                            <LoginForm changeForm={(formName) => this.props.changeForm(formName)} />
                          </React.Fragment>
                        }
                        {st.registrationForm &&
                          <React.Fragment>
                            <h1 className="heading">Registration</h1>
                            <RegistrationForm changeForm={(formName) => this.props.changeForm(formName)} />
                          </React.Fragment>
                        }
                        {st.forgetPassword &&
                          <React.Fragment>
                            <h1 className="heading">Forget Password</h1>
                            <ForgetPassword changeForm={(formName) => this.props.changeForm(formName)} />
                          </React.Fragment>
                        }
                      </span>}
                    <div className="text-center mobile-refresh-btn">
                      <button className="btnToLink link-color m-t-10" onClick={() => window.location.reload(true)}><i className="las la-undo-alt" /> Refresh</button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

          </div>
        </div>
        {/* <div className="screen2-footer">
          <div className="login-footer-bar">
            <Footer />
          </div>
        </div> */}
      </React.Fragment>
    )//End return
  }//End render
}//End class
export default connect(StoreGet)(Screen1);