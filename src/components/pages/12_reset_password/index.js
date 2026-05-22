import React, { Component } from 'react'
import { Row, Col, Form, Input, Button } from 'antd';
import PageTitle from '../mutual/pageTitle';
import { AntInput } from '../../externalComponents/antd-fields';
import { HTTP } from '../../services';

import SideImg from './resetAvt.jpg';
// import SideImg from './resetAvt.svg';
import './styles.less';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    }//End state
  }//End constructor

  formRef = React.createRef();

  handleSubmit = (values) => {
    this.setState({ loader: true });
    HTTP('post', '/resetPassword/post/', values).then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.formRef.current.resetFields();
      // console.log(res);
    })//End http service
  }//End handleSubmit


  render() {
    return (
      <div className="reset-pass-container">
        <PageTitle
          titleIcon="las la-file-medical"
          titleSpan="Reset"
          titleHeading="Password"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-key', label: 'Reset Password' },
          ]}
        />
        <div className="container">
          <Row gutter={window.rowGutter} justify="space-around" align="middle">
            <Col lg={9} md={12} sm={24} xs={24} className="hide-on-mobile-rp">
              <div className="col-img">
                {/* <img src={required()}> */}
                <img src={SideImg} alt="Logo" width="100%" />
              </div>
            </Col>
            <Col lg={15} md={24} sm={24} xs={24}>
              <div className="col-form">
                <div className="inner-headings">
                  <h2>Reset Password</h2>
                  <p>You can reset you password by providing current password.</p>
                </div>
                <Form ref={this.formRef} layout="vertical" onFinish={this.handleSubmit} autoComplete="off" className="form-style-1">
                  <AntInput label="Current Password" name="current_password" type="password" placeholder="Please type current password" />
                  <AntInput label="New Password" name="new_password" type="password" feedback placeholder="Please type new password" />
                  <Form.Item
                    name="confirm_password"
                    label="Confirm Password"
                    dependencies={['new_password']}
                    hasFeedback
                    rules={[
                      { required: true, message: 'Please confirm your password!', },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('new_password') === value) { return Promise.resolve(); }
                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Please type confirm password" />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" size="large" loading={this.state.loader}>Submit and Reset</Button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )//End return
  }//End render
}//End class
export default ResetPassword;