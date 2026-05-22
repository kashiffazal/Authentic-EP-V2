import React, { Component } from 'react'
import { Avatar } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import StoreGet from '../../../../../store/get';
import StorePost from '../../../../../store/post';

class WebViewAdminHeroSection extends Component {
  render() {
    const dt = this.props.stv.ud;
    const dtc = this.props.data;
    const loader = this.props.loader;
    return (
      <div className="hero-section">
        <div className="hero-bg-color">
          <div className="round-shape">
            {/* <i className="icon-left las la-bars" /> */}
            {/* <i className="icon-right las la-times" /> */}
          </div>
          <div className="w-full">
            <div className="profile-section">
              <h2>{dt.first_name ? (dt.first_name + ' ' + dt.last_name) : '-'}</h2>
              {/* <p>{dt.role}</p> */}
              <p className="fs-13">Start Managing with Admin Account</p>
              <Avatar className="profile-img" size={100} icon={<UserOutlined />} src={`${window.domainPath}/files/uploads/user_profiles/${dt.profileImage}`} />
            </div>
            <div className="info-section">
              {loader ? <span className="custom-loader"><LoadingOutlined /> &nbsp; Loading, Please wait...</span> :
                <table width="100%" className="text-center">
                  <tbody>
                    <tr>
                      <td width="33.3%"><span className="total-label">Total Worker </span><span className="total-number"><b>{dtc.spCount}</b></span></td>
                      <td width="33.3%"><span className="total-label">Total Client </span><span className="total-number"><b>{dtc.clCount}</b></span></td>
                      <td width="33.3%"><span className="total-label">Total Services </span><span className="total-number"><b>{dtc.srCount}</b></span></td>
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </div>
    )//End return
  }//End render
}//Enc class
export default connect(StoreGet, StorePost)(WebViewAdminHeroSection);