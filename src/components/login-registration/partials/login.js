/*eslint-disable no-script-url*/
import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Form, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import StoreGet from '../../../store/get';
import { HTTP, SaveArrLocalStorage, SetUserData } from '../../services';
import { AntInput } from '../../externalComponents/antd-fields';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { loader: false, forgetPassword: false };
  }//End constructor
  formRef = React.createRef();

  handleSubmit = (values) => {
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    // if (!err) {
    this.setState({ loader: true });
    HTTP('post', '/login/post/index/se/ig', values).then(res => {
      this.setState({ loader: false });
      //console.log(res);
      if (res) {
        if (res.unverified) {
          SaveArrLocalStorage(res.unverifiedUserData, "unverified", false, true);
        } else {
          if (!res.approve) {
            this.props.history.push(process.env.PUBLIC_URL + '/unapproved');
          } else {
            SetUserData(res.data);
            this.props.history.push(process.env.PUBLIC_URL + '/'+window.urlpk+'/overview');
          }//End if condition
        }//End if condition
      }//End if condition
    })//End http service
    // }//End if condition
    // });//End form properties
  }//End handleSubmit


  render() {
    const stv = this.props.stv.app_data;
    const props = this.props;
    return (
      <React.Fragment>
        <div className="form-content">
          <p className="para">Please login with your personal information by email address and password.</p>
        </div>
        <Form className="form" ref={this.formRef} layout="vertical" onFinish={this.handleSubmit} autoComplete="off">
          <p className="mobile-form-heading">Login</p>
          <AntInput name="username" placeholder="Please type username" containerClassName="form_fields custom-field" reqMsg="Required" preIconAnt={<UserOutlined />} />
          <AntInput name="password" type="password" placeholder="Please type password" className="hide_eye" containerClassName="form_fields custom-field bb" reqMsg="Required" preIconAnt={<LockOutlined />} />
          <Button size="large" className="submitBtn" htmlType="submit" type="primary" loading={this.state.loader}>Sign In</Button>
        </Form>
        <div className="bar_navigation">
          <button className="btnToLinkLogin" onClick={() => props.changeForm('forgetPassword')} >Forgot Password?</button>
        </div>
        <div className="signup-bar">
          Don't have a {stv.app_name} account? <button className="btnToLinkLogin" onClick={() => props.changeForm('registrationForm')}>Sign Up <span className="right-arrow"></span></button>
        </div>
      </React.Fragment>

    );//End return
  }//End render
}//End class

export default connect(StoreGet)(withRouter(LoginForm));