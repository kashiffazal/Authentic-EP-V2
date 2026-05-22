import React, { Component } from 'react';
import { Button } from 'antd';
import { HTTP, LoadArrLocalStorage } from '../services';

class ConfirmEmail extends Component {
  constructor(props) {
    super(props)
    this.state = { loader: false, data: ['', '', ''] }//End state
  }//End constructor

  resendEmail = () => {
    this.setState({ loader: true });
    let data = this.state.data;
    //Add session name to remove after verify email
    let values = { full_name: data[0], email: data[1], sessionName: this.props.match.params.data };
    HTTP('post', '/login/post/resendVerificationEmail', values).then(res => {
      this.setState({ loader: false });
    })//End http service
  }//end function

  render() {
    return (
      <div className="conEmail">
        <div className="text-center">
          <img src={`${process.env.PUBLIC_URL}/img/product-logopsd-v.png`} style={{ 'width': '150px' }} alt="" />
          <br /><br />
          <h2>Thank you for registration. Please verify your email address.</h2>
          <p>An email has been sent to {this.state.data[1]} with a link to verify your email address,<br /> if you have not received the email after a few minutes, please check your spam folder or re-send the verification email.</p>
          <Button onClick={() => this.resendEmail()} size="large" type="primary" loading={this.state.loader}>Resend Email</Button> &nbsp;
          <Button key={2} onClick={() => window.history.go(-1)} size="large">Go Back </Button>
        </div>

      </div>
    );//End return
  }//Emd render
  UNSAFE_componentWillMount() {
    let data = LoadArrLocalStorage(this.props.match.params.data, true, "/login");
    this.setState({ data });
  }//End componentWillMount
}//End class

export default ConfirmEmail;