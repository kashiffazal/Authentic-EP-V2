/*eslint-disable no-script-url*/
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { HTTP, Encode64 } from '../../services';
import { AntInput } from '../../externalComponents/antd-fields';

class ForgetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = { loader: false }//End state
  }//End constructor
  formRef = React.createRef();

  handleSubmit = (values) => {
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    // if (err) { return false }//End if condition
    values.forgetPassData = Encode64(values.email);
    this.setState({ loader: true });
    HTTP('post', '/login/post/forget-password/se/ig', values).then(res => {
      this.setState({ loader: false });
    });
    // });//End form properties
  }//End handleSubmit


  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <div className="form-content">
          <p className="para">Please provide registered email address to receive your password.</p>
        </div>
        <Form className="form" ref={this.formRef} layout="vertical"  onFinish={this.handleSubmit} autoComplete="off">
        <p className="mobile-form-heading">Forgot Password</p>
          <AntInput name="email" placeholder="Please type email address" containerClassName="form_fields custom-field bb" reqMsg="Required" preIconAnt={<MailOutlined />} />
          <Button size="large" className="submitBtn" htmlType="submit" type="primary" loading={this.state.loader}>Send Email</Button>
        </Form>
        <div className="bar_navigation">
          <button className="btnToLinkLogin" onClick={() => props.changeForm('loginForm')} >Back to login form?</button>
        </div>
      </React.Fragment>
    );
  }
}

export default ForgetPassword;