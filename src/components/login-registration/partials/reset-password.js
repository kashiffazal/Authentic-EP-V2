/*eslint-disable no-script-url*/
import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Form, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { HTTP } from '../../services';
import { AntInput } from '../../externalComponents/antd-fields';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { loader: false, successMsg: false };
  }//End constructor
  formRef = React.createRef();

  handleSubmit = (values) => {
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
      // if (!err) {
        values.email = this.props.user_id;
        this.setState({ loader: true });
        HTTP('post', '/login/post/resetPassword/se/ig', values).then(res => {
          this.setState({ loader: false });
          if (!res) { return false }
          // console.log(res);
          //window.location.href = "#/login";
          this.setState({ successMsg: true });
          //this.props.history.push(process.env.PUBLIC_URL + '/login');
        })//End http service
      // }//End if condition
    // });//End form properties
  }//End handleSubmit


  render() {
    return (
      <React.Fragment>

        {this.state.successMsg ?
          <span>
            <div className="form-content" style={{ border: '2px solid #fff', borderRadius: '5px', marginTop: '20px' }}>
              <p><i className="las la-check-circle dis-block fs-68" /></p>
              <p className="fs-18 fw-500-imp m-0-imp">Password Reset Successful</p>
              <p className="m-t-0-imp">Awesome, you've successfully updated your password.</p>
            </div>
            <div className="form-content">
              <p><button type="button" className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/login')}>Click here to Log In using your new password.</button></p>
            </div>
          </span>
          :
          <span>
            <div className="form-content">
              <p className="fs-18 fw-500-imp resetPassHeading">Reset your password</p>
            </div>
            <Form className="form" ref={this.formRef} layout="vertical" onFinish={this.handleSubmit} autoComplete="off">
              <p className="mobile-form-heading">Reset Password</p>
              <AntInput name="new_password" type="password" placeholder="New Password" className="hide_eye" containerClassName="form_fields custom-field" reqMsg="Required" preIconAnt={<LockOutlined />} />
              <AntInput name="confirm_password" type="password" placeholder="Confirm Password" className="hide_eye" containerClassName="form_fields custom-field" reqMsg="Required" preIconAnt={<LockOutlined />} />
              <Button size="large" className="submitBtn" htmlType="submit" type="primary" loading={this.state.loader}>Reset</Button>
            </Form>
          </span>
        }


      </React.Fragment>
    );//End return
  }//End render
}//End class

export default withRouter(LoginForm);