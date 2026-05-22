import React, { Component } from 'react'
import WebViewAdminHeroSection from './partial/adminHeroSection';
import WebViewAdminFormSection from './partial/adminFormSection';
import WebViewSPHeroSection from './partial/spHeroSection';
import WebViewSPFormSection from './partial/spFormSection';
import './styles.less';

class WebViewDashboard extends Component {
  render() {
    const pr = this.props;
    const count = pr.data.count ? pr.data.count : (pr.data.services ? pr.data.services.count : {});
    return (
      <div className="mobile-webview-dashboard-container">
        {window.userData.link_id ?
          <React.Fragment>
            <WebViewSPHeroSection data={count} loader={pr.loader} />
            <WebViewSPFormSection data={pr.data} loader={pr.loader} />
          </React.Fragment>
          :
          <React.Fragment>
            <WebViewAdminHeroSection data={count} loader={pr.loader} />
            <WebViewAdminFormSection data={pr.data} loader={pr.loader} />
          </React.Fragment>
        }
      </div>
    )//End return
  }//End render
}//Enc class
export default WebViewDashboard;