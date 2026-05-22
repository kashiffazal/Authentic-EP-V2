import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Avatar } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import StoreGet from '../../../../../store/get';
import StorePost from '../../../../../store/post';

class WebViewSPHeroSection extends Component {
  render() {
    const dt = this.props.stv.ud;
    const dtc = this.props.data;
    const loader = this.props.loader;
    return (
      <div className="hero-section">
        <div className="hero-bg-color">
          <div className="profile-section">
            <Avatar className="profile-img" size={100} icon={<UserOutlined />} src={`${window.domainPath}/files/uploads/user_profiles/${dt.profileImage}`} />
            <h2>{dt.first_name ? (dt.first_name + ' ' + dt.last_name) : '-'}</h2>
            <p>{dt.role}</p>
          </div>
          <div className="info-section">
            {loader ? <span className="custom-loader"><LoadingOutlined /> &nbsp; Loading, Please wait...</span> :
              <table width="100%" className="text-center">
                <tbody>
                  <tr>
                    <td width="33.3%"><span><button className="btnToLink" type="button" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/serviceListToday')}>Today's Shift<br /><b>{dtc.today}</b></button></span></td>
                    <td width="33.3%"><span><button className="btnToLink" type="button" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/serviceListPending')}>Pending Shift <br /><b>{dtc.pending}</b></button></span></td>
                    <td width="33.3%"><span><button className="btnToLink" type="button" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/serviceList')}>Total Shift <br /><b>{dtc.total}</b></button></span></td>
                  </tr>
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    )//End return
  }//End render
}//Enc class
export default connect(StoreGet, StorePost)(withRouter(WebViewSPHeroSection));