// import React, { Component, Suspense, lazy } from 'react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreGet from '../../store/get';
import { Decode64 } from '../services';
import Screen1 from './login-screen-partial/screen1';
import Screen2 from './login-screen-partial/screen2';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resetPassEmail: '',
      formObj: {
        loginForm: true,
        forgetPassword: false,
        registrationForm: false,
        resetPassEmail: false
      }
    }//End state
  }//End constructor

  changeForm = (formName) => {
    var formArr = this.state.formObj;
    formArr.loginForm = false;
    formArr.forgetPassword = false;
    formArr.registrationForm = false;
    formArr[formName] = true;
    this.setState({ formObj: formArr });
  }//End function


  // render() {
  //   const stv_cd = this.props.stv.company_data[this.props.stv.app_data.appClients];
  //   const formObj = this.state.formObj;
  //   if (stv_cd.loginScreenType === 1) {
  //     const Screen1 = lazy(() => import("./login-screen-partial/screen1"));
  //     return (
  //       <Suspense fallback={'Loading...'}>
  //         <Screen1 formObj={formObj} resetPassData={this.state.resetPassEmail} changeForm={(e) => this.changeForm(e)} />
  //       </Suspense>
  //     )//End return
  //   }//End if condition
  //   if (stv_cd.loginScreenType === 2) {
  //     const Screen2 = lazy(() => import("./login-screen-partial/screen2"));
  //     return (
  //       <Suspense fallback={'Loading...'}>
  //         <Screen2 formObj={formObj} resetPassData={this.state.resetPassEmail} changeForm={(e) => this.changeForm(e)} />
  //       </Suspense>
  //     )//End return
  //   }//End if condition
  // }//End render

  render() {
  const stv_cd = this.props.stv.company_data[this.props.stv.app_data.appClients];
  const formObj = this.state.formObj;
  return (
    <React.Fragment>
      {stv_cd.loginScreenType === 1 && <Screen1 formObj={formObj} resetPassData={this.state.resetPassEmail} changeForm={(e) => this.changeForm(e)}/>}
      {stv_cd.loginScreenType === 2 && <Screen2 formObj={formObj} resetPassData={this.state.resetPassEmail} changeForm={(e) => this.changeForm(e)}/>}
    </React.Fragment>
  );//End return
  }//End render
  componentDidMount() {
    if (this.props.match.params.data) {
      let data = Decode64(this.props.match.params.data);
      this.setState({ resetPassEmail: data });
    }//End if condition
    //console.log(this.props.match.params.data);
  }//End componentDidMount

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.data !== this.props.match.params.data) {
      let data = Decode64(this.props.match.params.data);
      //console.log(data);
      this.setState({ resetPassEmail: data });
    }//end if condition
  }//End componentDidUpdate

}//End class

export default connect(StoreGet)(Login);