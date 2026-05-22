import React, { Component } from 'react';
import { Fade } from "react-awesome-reveal";
import WebViewDashboard from './mobile_web_view_v2';
import AdminDashboard from './partial/adminDashboard';
import SPDashboard from './partial/spDashboard';
import { HTTP } from '../../services';

import './style.less';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      data: {},
    }//End state
  }//End constructor
  render() {
    const st = this.state;
    // const dt = this.state.data;
    // const amounts = GetUserData().amounts;
    return (
      <React.Fragment>
        {window.webviewMobile ? <WebViewDashboard data={st.data} loader={st.loader} /> :

          <Fade bottom>
            <div className="overview-container">
              {window.userData.link_id ?
                <SPDashboard loader={st.loader} data={st.data} />
                :
                <AdminDashboard loader={st.loader} data={st.data} />
              }
            </div>
          </Fade>
        }
      </React.Fragment>
    )//End Return statement
  }//end End Render
  componentDidMount() {
    this.setState({ loader: true });
    setTimeout(() => {
      // console.log(`/overview/get/${window.userData.link_id ? 'sp' : 'admin'}`);
      HTTP('get', `/overview/get/${window.userData.link_id ? 'sp' : 'admin'}/${window.webviewMobile ? window.webviewMobile : ''}`).then(res => {
        this.setState({ loader: false });
        if (!res) { return false; }
        this.setState({ data: res.data });
      });
    }, 500);
  }//End componentDidMount
}//End class
export default Overview;