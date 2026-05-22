import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.less';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

//import Redux methods
import { Provider } from 'react-redux';
import Store from './store';

//Set domain path into browser variable
if (process.env.NODE_ENV !== 'production') {
  window.domainPath = process.env.REACT_APP_DOMAIN_DEV;
} else {
  window.domainPath = process.env.REACT_APP_DOMAIN_PRO;
}//End if condition
window.appLocalStorage = process.env.REACT_APP_LOCALSTORAGE;
window.gjModalWidthLarge = 1366;
window.gjModalWidth = 1000;
window.gjModalWidthSmall = 740;
window.rowGutter = 15;
window.rowGutterSmall = 10;
window.rowGutterLarge = 30;
//Hide react UNSAFE_ warning =========//
const warn = console.warn;
function logWarning(...warnings) {
  let showWarning = true;
  warnings.forEach(warning => {
    if (warning.includes) {
      if (warning.includes("UNSAFE_")) showWarning = false;
      // else if (warning.includes("SourceMap")) showWarning = false;
      // else if (warning.includes("DevTools")) showWarning = false;
    }//End if condition
  });
  if (showWarning) warn(...warnings);
}
console.warn = logWarning;
//======================================//


const getDevice = () => {
  var standalone = window.navigator.standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test(userAgent),
    ios = /iphone|ipod|ipad/.test(userAgent);
    // console.log(window.navigator);
  if (ios) {
    if (!standalone && safari) {
      // Safari
      window.webviewMobile = false;
      // alert('IOS Browser');
    } else if (!standalone && !safari) {
      // iOS webview
      window.webviewMobile = true;
      window.webviewMobileIOS = true;
      // alert('IOS Webview');
    };
  } else {
    if (userAgent.includes('wv')) {
      // Android webview
      window.webviewMobile = true;
      window.webviewMobileAndroid = true;
      // alert('Android Webview');
    } else {
      // Chrome
      window.webviewMobile = false;
      // alert('Android Browser');
    }
  };
  // window.webviewMobile = !window.webviewMobile;
  // window.webviewMobileIOS = !window.webviewMobileIOS;
}//End function
getDevice();

ReactDOM.render(
  <Provider store={Store}>
    <span className={window.webviewMobile ? 'mobile-web-view-container' : ''}>
      {/* <div className={window.webviewMobileIOS ? 'mobile-top-placeholder-ios' : 'mobile-top-placeholder-android'}></div> */}
      <div style={{ 'height': '100%' }} className={window.webviewMobileIOS ? 'mobile-ios' : 'mobile-android'}>
        <App />
      </div>
    </span>
  </Provider>
  , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();