import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

//Importing Components
import Login from './login-registration';
import ConfirmEmail from './login-registration/confirm-email';
import ThankYou from './login-registration/thank-you';
import UnverifiedEmail from './login-registration/unverified-email';
import Unapproved from './login-registration/unapproved';
import MainApp from './home';
import _404 from './404';
import DBErrorModal from './externalComponents/db-error-modal';
import ExternalWebComponent from './externalWebComponent';

//Firestore implementation
import { connect } from 'react-redux';
import StoreGet from '../store/get';
import StorePost from '../store/post';
import FirestoreCompany from './fireStoreCompany';
import DevelopedBy from './developedBy';


class App extends Component {
  render() {
    const block = this.props.stv.app_data.blockStatus;
    const blockHTML = this.props.stv.app_data.blockHTML;
    const maintenance = this.props.stv.app_data.maintenanceStatus;
    const maintenanceHTML = this.props.stv.app_data.maintenanceHTML;
    const developedByRouteName = this.props.stv.developedByRouteName;
    window.userData = this.props.stv.ud;
    window.defaultCountryId = '16';//Australia
    window.defaultStateId = '2';//VIC - Victoria
    //Set google doc viewer for live from default setting    
    window.googleDocViewerPDF = (process.env.NODE_ENV === 'production' && window.userData.st && window.userData.st.dst.googleDocViewerForPDF) ? window.userData.st.dst.googleDocViewerURL : '';
    //Set URL Param Keyword
    window.urlpk = 'e';
    //Set detect mobile screen
    const width = (window.screen.width - 4);// Width Difference
    window.screenWidthMobile = (window.screen.width - 7);
    window.is_xs = (width < 575) ? true : false;
    window.is_sm = (width > 575 && width < 767) ? true : false;
    window.is_md = (width > 767 && width < 991) ? true : false;
    window.is_lg = (width < 991) ? true : false;
    window.tabletScreen = width < 991 ? true : false;

    return (
      <>
        <DBErrorModal />{/*//@ If Server any DB/Query error then show this error in Modal*/}
        <HashRouter>
          {block ?
            <div dangerouslySetInnerHTML={{ __html: blockHTML }} /> :
            (maintenance ?
              <div dangerouslySetInnerHTML={{ __html: maintenanceHTML }} /> :
              <Switch>
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login}></Route>
                <Route exact path={`${process.env.PUBLIC_URL}/${developedByRouteName}`} component={DevelopedBy}></Route>
                <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login}></Route>
                <Route exact path={`${process.env.PUBLIC_URL}/register/:encryptId`} component={Login}></Route>
                <Route exact path={`${process.env.PUBLIC_URL}/resetPassword/:data`} component={Login}></Route>
                <Route exact path={`${process.env.PUBLIC_URL}/confirmEmail/:data`} component={ConfirmEmail}></Route>
                <Route exact path={`${process.env.PUBLIC_URL}/thankYou/:localStorageName`} component={ThankYou}></Route>
                <Route exact path={`${process.env.PUBLIC_URL}/unverified/:data`} component={UnverifiedEmail}></Route>
                <Route exact path={`${process.env.PUBLIC_URL}/unapproved`} component={Unapproved}></Route>
                {/* <Route exact path={`${process.env.PUBLIC_URL}/error`} component={Error}></Route> */}
                <Route exact path={`${process.env.PUBLIC_URL}/externalWebPages/:pageName`} component={ExternalWebComponent}></Route>
                <Route exact path={`${process.env.PUBLIC_URL}/externalWebPages/:pageName/:data`} component={ExternalWebComponent}></Route>
                <Route path={`${process.env.PUBLIC_URL}/${window.urlpk}/:path`} component={MainApp}></Route>
                <Route path={`${process.env.PUBLIC_URL}/*`} component={_404}></Route>
              </Switch>
            )}
        </HashRouter>
      </>
    )//End Return
  }//end render

  // componentDidMount() {
  //   const db = FirestoreCompany.firestore();
  //   //Getting Developed By HTML
  //   db.collection('company').doc('developedBy').onSnapshot(res => {
  //     let data = res.data();
  //     if (data) {
  //       this.props.post_stv('developed_by_html', data.html);
  //       this.props.post_stv('developedByRouteName', data.routeName);
  //     }//End if condition
  //   }, (error) => { console.log('Error!', error); });

  //   //Getting Application Status
  //   db.collection('applications').doc(process.env.REACT_APP_FIRESTORE_DOC_NAME).onSnapshot(res => {
  //     let data = res.data();
  //     if (data) {
  //       let app_data = this.props.stv.app_data;
  //       this.props.post_stv('app_data', { ...app_data, ...data });
  //       localStorage.setItem('app_title', data.app_title);
  //     }//End if condition
  //   }, (error) => { console.log('Error!', error); });
  // }//End componentDidMount
}//End class
export default connect(StoreGet, StorePost)(App);
