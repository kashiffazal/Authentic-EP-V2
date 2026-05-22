import React, { Component } from 'react'
import { withRouter } from "react-router";
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { HTTP, SaveArrLocalStorage, AccessControl } from '../../services';
import { connect } from 'react-redux';
import StorePost from '../../../store/post';
import './styles.less';

const { SubMenu } = Menu;

class NavigationOther extends Component {

  signOut = () => {
    this.props.history.push(process.env.PUBLIC_URL + '/login');
    localStorage.removeItem(window.appLocalStorage);
    setTimeout(() => {
      this.props.post_stv('profile_data', null);
      this.props.post_stv('ud', {});
    }, 1000);
    HTTP('get', '/login/get/signOut/se/ig').then(res => { })//End http service
  }//End function

  setSideNav = e => {
    SaveArrLocalStorage(e, false, 'sideMenu');
    this.props.post_stv('sideNavMenu', e);
  };

  render() {
    const sh = this.props.showHide ? () => this.props.showHide() : undefined;
    return (
      <div className="setting_dropdown_antd">
        <Menu onClick={sh}>
          {AccessControl(135) &&
            <Menu.Item key={1}>
              <NavLink exact to="/e/viewProfile" onClick={() => this.setSideNav('vp')}><i className="las la-user fs-18" ></i> &nbsp;View Profile</NavLink>
            </Menu.Item>
          }

          {AccessControl('137,138') &&
            <Menu.Item key={1.1}>
              <NavLink exact to="/e/companies" onClick={() => this.setSideNav('companies')}><i className="las la-industry fs-18" ></i> &nbsp;Company Registration</NavLink>
            </Menu.Item>
          }

          {(AccessControl('143,144,148')) &&
            <SubMenu key={2} className="sub_menu_icon_text" title={<span className="sub_menu_icon_container"><i className="sub_menu_icon las la-user-plus fs-18" />&nbsp; Users Management</span>} onClick={() => this.setSideNav('userManagement')}>
              {AccessControl(143) &&
                <Menu.Item key={2.1}>
                  <NavLink exact to="/e/createUser" className="p-r-16-imp"><i className="las la-plus fs-18"></i> &nbsp; Create New User</NavLink>
                </Menu.Item>
              }
              {AccessControl(144) &&
                <Menu.Item key={2.2}>
                  <NavLink exact to="/e/usersLog" className="p-r-16-imp"><i className="las la-list fs-18"></i> &nbsp; Users Log</NavLink>
                </Menu.Item>
              }
              {AccessControl(148) &&
                <Menu.Item key={2.3}>
                  <NavLink exact to="/e/usersPermission" className="p-r-16-imp"><i className="las la-unlock fs-18"></i> &nbsp; Users Permission</NavLink>
                </Menu.Item>
              }
            </SubMenu>
          }

          {AccessControl(151) &&
            <Menu.Item key={3}>
              <NavLink exact to={`/${window.urlpk}/resetPassword`} onClick={() => this.setSideNav('resetPass')}><i className="las la-key fs-18"></i> &nbsp;Reset Password</NavLink>
              {/* <Icon type="database" className="sub_menu_icon" /> */}
            </Menu.Item>
          }

          {AccessControl('152,153,154,158,162,163') &&
            <Menu.Item key={3.1}>
              <NavLink exact to="/e/dataBackup" onClick={() => this.setSideNav('backup')}><i className="las la-cloud-upload-alt fs-18"></i> &nbsp;Data Backup</NavLink>
            </Menu.Item>
          }

          {/* <SubMenu className="sub_menu_icon_text" title={`DB Backup`} onClick={() => this.setSideNav('dbBackup')}>
          <Menu.Item>
            <NavLink exact to="/e/importDB" className="p-r-16-imp"><i className="las la-cloud-download-alt fs-18"></i> &nbsp; Import Backup</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink exact to="/e/exportDB" className="p-r-16-imp"><i className="las la-cloud-upload-alt fs-18"></i> &nbsp; Export Backup</NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item>
          <NavLink exact to="/e/settings" className="p-r-16-imp"><i className="las la-cog fs-18"></i> &nbsp; Settings</NavLink>
        </Menu.Item> */}


          {AccessControl('164,165,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,186,189') &&
            <SubMenu key={4} className="sub_menu_icon_text" title={<span className="sub_menu_icon_container"><i className="sub_menu_icon las la-cog fs-18" />&nbsp; Settings</span>} onClick={() => this.setSideNav('settings')}>
              {AccessControl('164,165') && <Menu.Item key={4.1}><NavLink exact to="/e/settings/emailDeliveryServers" className="p-r-16-imp"><i className="las la-server fs-18"></i> &nbsp; Emails Delivery Servers</NavLink></Menu.Item>}
              {AccessControl('169,170,171,172,173,174,175,176,177,178,179,180,181,182') && <Menu.Item key={4.2}><NavLink exact to="/e/settings/emailNotifications" className="p-r-16-imp"><i className="las la-envelope fs-18"></i> &nbsp; Emails Notifications</NavLink></Menu.Item>}
              {AccessControl('183,186,189') && <Menu.Item key={4.3}><NavLink exact to="/e/settings/emailSentList" className="p-r-16-imp"><i className="las la-paper-plane fs-18"></i> &nbsp; Emails Sent List</NavLink></Menu.Item>}
            </SubMenu>
          }

          {window.webviewMobile &&
            <Menu.Item key={5}>
              <button className="btnToLink w-full text-left" onClick={() => window.location.reload(true)}>
                <i className="las la-sync fs-18"></i> &nbsp; Refresh
              </button>
            </Menu.Item>
          }
          {/* {!window.webviewMobile &&
            AccessControl('192,193') &&
            <SubMenu key={6} className="sub_menu_icon_text" title={<span className="sub_menu_icon_container"><i className="sub_menu_icon las la-mobile fs-18" /> Mobile App</span>} onClick={() => this.setSideNav('settings')}>
              {AccessControl('192') &&
                <Menu.Item key={6.1}>
                  <a href="https://play.google.com/work/apps/details?id=com.innotechcloud.authenticep" target="_blank" rel="noopener noreferrer">
                    <i className="lab la-google-play fs-18"></i> &nbsp; Download Google Play Store
                  </a>
                </Menu.Item>
              }
              {AccessControl('193') &&
                <Menu.Item key={6.2}>
                  <a href="https://app.authenticlifecare.com.au/mobileApp/Authentic-EP-android.apk" target="_blank" rel="noopener noreferrer">
                    <i className="lab la-android fs-18"></i> &nbsp; Download External APK Link
                  </a>
                </Menu.Item>
              }
            </SubMenu>
          } */}


          {/* {(AccessControl(79) || AccessControl('81,82,86')) && <Menu.Divider />} */}
          <Menu.Item key={8} onClick={this.signOut}><i className="las la-sign-out-alt fs-18"></i> &nbsp;Sign Out</Menu.Item>
        </Menu>
      </div>
    )//End return
  }//End render
}//End class
export default connect('', StorePost)(withRouter(NavigationOther));