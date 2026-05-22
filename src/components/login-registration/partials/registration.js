/*eslint-disable no-script-url*/
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { HTTP, SaveArrLocalStorage } from '../../services';
import { AntInput } from '../../externalComponents/antd-fields';

class RegistrationForm extends Component {
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
    HTTP('post', '/login/post/registration/se/ig', values).then(res => {
      this.setState({ loader: false });
      if (res) {
        //console.log(res);
        SaveArrLocalStorage([values.full_name, values.email], "confirmEmail", false, true);
      }//End if condition
    })//End http service
    // }//End if condition
    // });//End form properties
  }//End handleSubmit


  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <div className="form-content">
          <p className="para">Start sending beautifully designed emails today.</p>
        </div>
        <Form className="form" ref={this.formRef} layout="vertical" onFinish={this.handleSubmit} autoComplete="off">
        <p className="mobile-form-heading">Registration</p>
          <AntInput name="full_name" placeholder="Full name" containerClassName="form_fields custom-field" reqMsg="Required" preIconAnt={<UserOutlined />} />
          <AntInput name="email" type="email" placeholder="Email address" containerClassName="form_fields custom-field" reqMsg="Required" preIconAnt={<MailOutlined />} />
          <span className="reg_field_pass">
            <AntInput name="password" type="password" placeholder="Password" containerClassName="form_fields custom-field bb" reqMsg="Required" preIconAnt={<LockOutlined />} />
          </span>
          <Button size="large" className="submitBtn" htmlType="submit" type="primary" loading={this.state.loader}>Create Account</Button>
        </Form>
        <div className="signup-bar">
          Already have an account?  <button className="btnToLinkLogin" onClick={() => props.changeForm('loginForm')} >Sign In <span className="right-arrow"></span></button>
        </div>


      </React.Fragment>
    );
  }
}

export default withRouter(RegistrationForm);