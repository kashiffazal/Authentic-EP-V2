import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { connect } from 'react-redux';
import StoreGet from '../../store/get';
import { HTTP, LoadArrLocalStorage } from '../services';

class UnverifiedEmail extends Component {
  constructor(props) {
    super(props)
  this.state = { loader: false, data: ['', '', ''] }//End state
}//End constructor

  resendEmail = () => {
    this.setState({ loader: true });
    let data = this.state.data;
    //Add session name to remove after verify email
    let values = { full_name: data.name, email: data.email, sessionName: this.props.match.params.data };
    HTTP('post', '/login/post/resendVerificationEmail', values).then(res => {
      this.setState({ loader: false });
    })//End http service
  }//end function

  render() {
    const stv_ad = this.props.stv.app_data;
    return (
      <div className="conEmail">
        <Result
          title="VERIFY YOUR EMAIL ADDRESS"
          subTitle={`To continue using ${stv_ad.app_name}, please verify your email address.`}
          extra={[
            <Button key={1} onClick={() => this.resendEmail()} size="large" type="primary" loading={this.state.loader}>Send Verification Email</Button>,
            <Button key={2} onClick={() => window.history.go(-1)} size="large">Go Back </Button>
          ]}
        />
      </div>
    );//End return
  }//Emd render
  UNSAFE_componentWillMount() {
    let data = LoadArrLocalStorage(this.props.match.params.data);
    this.setState({ data });
  }//End componentWillMount
}//End class

export default connect(StoreGet)(UnverifiedEmail);