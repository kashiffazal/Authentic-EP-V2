import React, { Component } from 'react'
import WebViewAdminHeroSection from './partial/adminHeroSection';
import WebViewAdminFormSection from './partial/adminFormSection';
import WebViewSPHeroSection from './partial/spHeroSection';
import WebViewSPFormSection from './partial/spFormSection';
import PageTitle from '../../mutual/pageTitle';
import './styles.less';

class WebViewDashboard extends Component {
  render() {

    const scrollElement = document.querySelector("#scroll-style-1");
    const pageTitleElement = document.getElementById("pageTitleId");
    scrollElement && scrollElement.addEventListener("scroll", () => {
      var scroll = Math.ceil(scrollElement.scrollTop);
      // console.log(scroll);
      if (scroll >= 50) {
        if (pageTitleElement) { pageTitleElement.style.opacity = "1" }
      } else {
        if (pageTitleElement) { pageTitleElement.style.opacity = "0" }
      }//End if condition
    });

    const pr = this.props;
    const count = pr.data.count ? pr.data.count : (pr.data.services ? pr.data.services.count : {});
    return (
      <div className="mobile-webview-dashboard-container">
        {window.userData.link_id ?
          <div className="sw-container">
            <PageTitle
              titleIcon="las la-home"
              titleHeading="Overview"
              idForMobile="pageTitleId"
            />
            <WebViewSPHeroSection data={count} loader={pr.loader} />
            <WebViewSPFormSection data={pr.data} loader={pr.loader} />
          </div>
          :
          <div className="admin-container">
            <PageTitle
              titleIcon="las la-home"
              titleHeading="Overview"
              idForMobile="pageTitleId"
            />
            <WebViewAdminHeroSection data={count} loader={pr.loader} />
            <WebViewAdminFormSection data={pr.data} loader={pr.loader} />
          </div>
        }
      </div>
    )//End return
  }//End render
}//Enc class
export default WebViewDashboard;