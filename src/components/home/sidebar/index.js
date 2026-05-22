import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Tooltip } from 'antd';
import { connect } from 'react-redux';
import StoreGet from '../../../store/get';
import { LoadArrLocalStorage, AccessControl } from '../../services';
// import NavigationHr from '../navigationHr';
// import ScreenLoader from '../../externalComponents/screen-loader';
import $ from 'jquery';
import './styles.less';

const { Sider } = Layout;
// const { SubMenu } = Menu;

class SiderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      hideSideBar: false,
      collapseIcon: 'angle-double-left',
      menuArr: [
        {
          key: 1,
          link: 'job',
          icon: 'briefcase',
          label: 'Make Job',
          toolTip: 'Job Form',
          allow: AccessControl('1,2')
        },
        {
          key: 2,
          link: 'supportWorkerForm',
          icon: 'id-card-alt',
          label: 'SW Form',
          toolTip: 'Support Worker Form',
          allow: AccessControl(6)
        },
        {
          key: 3,
          link: 'supportWorkerLog',
          icon: 'th-list',
          label: 'SW Log',
          toolTip: 'Support Worker Log',
          allow: AccessControl(7)
        },
        {
          key: 4,
          link: 'team',
          icon: 'users',
          label: 'Team',
          toolTip: 'Team Module',
          allow: AccessControl('12,13,17')
        },
        {
          key: 5,
          link: 'clientForm',
          icon: 'id-card',
          label: 'CL Form',
          toolTip: 'Client Form',
          allow: AccessControl(21)
        },
        {
          key: 6,
          link: 'clientLog',
          icon: 'th-list',
          label: 'CL Log',
          toolTip: 'Client Log',
          allow: AccessControl(22)
        }, {
          key: 7,
          link: 'clientProgressNote',
          icon: 'file-alt',
          label: 'CLP Note',
          toolTip: 'Client Progress Note',
          allow: AccessControl('30,31')
        },
        {
          key: 7.1,
          link: 'clientNote',
          icon: 'sticky-note',
          label: 'CLS Note',
          toolTip: 'Client Status Note',
          allow: AccessControl('28,29')
        },
        {
          key: 7.2,
          link: 'clientAppointment',
          icon: 'calendar-day',
          label: 'CL Appo',
          toolTip: 'Client Appointment',
          allow: AccessControl('34,35,40,44,48')
        },
        {
          key: 8,
          link: 'clientTimesheet',
          icon: 'file-signature',
          label: 'CTS Form',
          toolTip: 'Client Timesheet',
          allow: AccessControl(28)
        },
        {
          key: 9,
          link: 'clientTimesheetLog',
          icon: 'th-list',
          label: 'CTS Log',
          toolTip: 'Client Timesheet Log',
          allow: AccessControl('29,31')
        },
        {
          key: 10,
          link: 'staffTimesheet',
          icon: 'file-signature',
          label: 'ETS Form',
          toolTip: 'Staff Timesheet',
          allow: AccessControl(71)
        },
        {
          key: 11,
          link: 'staffTimesheetLog',
          icon: 'th-list',
          label: 'ETS Log',
          toolTip: 'Staff Timesheet Log',
          allow: AccessControl('70,72')
        },
        {
          key: 12,
          link: 'documentsTracking',
          icon: 'calendar-check',
          label: 'Doc Tr',
          toolTip: 'Document Tracking',
          allow: AccessControl('100,101')
        },
        // {
        //   key: 13,
        //   link: 'otherForms',
        //   icon: 'la-table',
        //   label: 'Ot. Forms',
        //   toolTip: 'Other Forms'
        // },
        {
          key: 14,
          link: 'documentsGeneration',
          icon: 'file-signature',
          label: 'Doc. Gr',
          toolTip: 'Doc Generation',
          allow: AccessControl(97)
        }, {
          key: 15,
          link: 'reporting',
          icon: 'file-pdf',
          label: 'Reports',
          toolTip: 'Reporting',
          allow: AccessControl(132)
        }, {
          key: 15.1,
          link: 'reportingColumnPresets',
          icon: 'columns',
          label: 'RPCP',
          toolTip: 'Create Column Presets',
          allow: AccessControl(133)
        }, {
          key: 15.2,
          link: 'reportingColumnPresetsLog',
          icon: 'th-list',
          label: 'RPCPL',
          toolTip: 'Column Presets Log',
          allow: AccessControl(134),
        }, {
          key: 16,
          link: 'createUser',
          icon: 'user-plus',
          label: 'Add',
          toolTip: 'Add new user',
          allow: AccessControl(143)
        },
        {
          key: 17,
          link: 'usersLog',
          icon: 'list',
          label: 'Log',
          toolTip: 'User List',
          allow: AccessControl(144)
        },
        {
          key: 18,
          link: 'usersPermission',
          icon: 'lock',
          label: 'Role',
          toolTip: 'User Permission',
          allow: AccessControl(148)
        },
        // {
        //   key: 19,
        //   link: 'importDB',
        //   icon: 'cloud-download-alt',
        //   label: 'Import',
        //   toolTip: 'Import DB Backup'
        // },
        // {
        //   key: 20,
        //   link: 'exportDB',
        //   icon: 'cloud-upload-alt',
        //   label: 'Export',
        //   toolTip: 'Export DB Backup'
        // },
        {
          key: 21,
          link: 'servicePlainForm',
          icon: 'chalkboard-teacher',
          label: 'SP Form',
          toolTip: 'Service Plaining Form',
          allow: AccessControl(74)
        },
        {
          key: 22,
          link: 'servicePlainLog',
          icon: 'las la-th-list',
          label: 'SP Log',
          toolTip: 'Service Plaining Log',
          allow: AccessControl('75,79,83,87')
        },
        {
          key: 23,
          link: 'serviceTimerLog',
          icon: 'las la-th-list',
          label: 'ST Log',
          toolTip: 'Service Timer Log',
          allow: AccessControl('90,93,96,99')
        },
        {
          key: 24,
          link: 'serviceSPWReplaceRequest',
          icon: 'las la-user-cog',
          label: 'SRR',
          toolTip: 'Replace Request',
          allow: AccessControl('102,107,112,117')
        }, {
          key: 25,
          link: 'serviceSchedule',
          icon: 'las la-table',
          label: 'SCH',
          toolTip: 'Shift Schedule',
          allow: AccessControl(122)
        }, {
          key: 26,
          link: 'incidentForm',
          icon: 'las la-file-medical',
          label: 'IMF',
          toolTip: 'Incident Management Form',
          allow: AccessControl(52)
        }, {
          key: 27,
          link: 'incidentLog',
          icon: 'las la-th-list',
          label: 'IFL',
          toolTip: 'Incident Form Log',
          allow: AccessControl('53,58,63,66')
        }, {
          key: 28,
          link: 'viewProfile',
          icon: 'las la-user',
          label: 'VP',
          toolTip: 'View Profile',
          allow: AccessControl(135)
        }, {
          key: 29,
          link: 'companies',
          icon: 'las la-industry',
          label: 'CR',
          toolTip: 'Company Registration',
          allow: AccessControl('137,138')
        }, {
          key: 30,
          link: 'resetPassword',
          icon: 'las la-key',
          label: 'RP',
          toolTip: 'Reset Password',
          allow: AccessControl(151)
        }, {
          key: 31,
          link: 'dataBackup',
          icon: 'las la-cloud-upload-alt',
          label: 'DB',
          toolTip: 'Data Backup',
          allow: AccessControl('152,153,154,158,162,163')
        }, {
          key: 32,
          link: 'settings/emailDeliveryServers',
          icon: 'las la-server',
          label: 'EDS',
          toolTip: 'Emails Delivery Server',
          allow: AccessControl('164,165')
        }, {
          key: 33,
          link: 'settings/emailNotifications',
          icon: 'las la-envelope',
          label: 'EN',
          toolTip: 'Emails Notifications',
          allow: AccessControl('170,171,173,174,176,177,179,180,181,182')
        }, {
          key: 34,
          link: 'settings/emailSentList',
          icon: 'las la-paper-plane',
          label: 'ESL',
          toolTip: 'Emails Sent List',
          allow: AccessControl('183,186,189')
        }
      ]
    }//End state
  }//End constructor
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed, }, () => {
      $('.toggleIconContainer').toggleClass('sideToggleActive');
    });
  };
  // toggleMobile = () => {
  //   if ($(window).width() < 476) {
  //     alert('asdf');
  //     this.setState({ collapsed: !this.state.collapsed, });
  //     $('.toggleIconContainer').toggleClass('sideToggleActive');
  //   }
  // }//End function
  toggleToHide = () => {

    // if (!this.state.collapsed) {
    //   this.toggle();
    // } else {
    this.setState({ hideSideBar: !this.state.hideSideBar }, () => {
      $('.sider').toggleClass('siderToCollapse');
      $('.toggleIconContainer').toggleClass('sideToggleHideActive');

      if (this.state.collapseIcon === 'angle-double-left') {
        this.setState({ collapseIcon: 'angle-double-right' });
      } else {
        this.setState({ collapseIcon: 'angle-double-left' });
      }//End if condition
    })
    // }//End if condition

  };
  // showDrawer = () => { this.setState({ visible: true, }); };
  // onClose = () => { this.setState({ visible: false, }); };

  showMenu = (drawer) => {
    let menu = null;
    if (this.props.stv.sideNavMenu) {
      menu = this.props.stv.sideNavMenu;
    } else {
      menu = LoadArrLocalStorage('sideMenu', false);//On refresh get from local storage
      menu = menu ? menu : 'overview';//On app first load set default
    }//End if condition

    // console.log(menu);
    var menuKeys = [];
    if (menu === 'overview') {
      menuKeys = [1, 2, 4, 5, 11, 14, 12, 21];
    }//End if condition
    if (menu === 'saf') {
      menuKeys = [1, 2, 4, 5, 11, 14, 12, 21];
    }//End if condition
    if (menu === 'job') {
      menuKeys = [1, 2, 4, 5, 11, 14, 12, 21];
    }//End if condition
    if (menu === 'sp') {
      menuKeys = [2, 3, 4];
    }//End if condition
    // if (menu === 'team') {
    //   menuKeys = [1, 2, 4, 5, 11, 14, 12, 21];
    // }//End if condition
    if (menu === 'cl') {
      menuKeys = [5, 6, 6.1, 6.2, 7, 7.1, 7.2];
    }//End if condition
    if (menu === 'cts') {
      menuKeys = [8, 9, 10, 11];
    }//End if condition
    if (menu === 'ets') {
      menuKeys = [1, 2, 4, 5, 11, 14, 12, 21];
    }//End if condition
    if (menu === 'docg') {
      menuKeys = [1, 2, 4, 5, 11, 14, 12, 21];
    }//End if condition
    if (menu === 'tracking') {
      menuKeys = [1, 2, 4, 5, 11, 14, 12, 21];
    }//End if condition
    if (menu === 'spf') {
      menuKeys = [21, 22, 23, 24, 25];
    }//End if condition
    if (menu === 'spl') {
      menuKeys = [21, 22, 23, 24, 25];
    }//End if condition
    if (menu === 'sptl') {
      menuKeys = [21, 22, 23, 24, 25];
    }//End if condition
    if (menu === 'sprr') {
      menuKeys = [21, 22, 23, 24, 25];
    }//End if condition
    if (menu === 'spsch') {
      menuKeys = [21, 22, 23, 24, 25];
    }//End if condition
    if (menu === 'userManagement') {
      menuKeys = [16, 17, 18];
    }//End if condition
    if (menu === 'rep') {
      menuKeys = [15, 15.1, 15.2];
    }//End if condition
    if (menu === 'others') {
      menuKeys = [20, 21, 22, 23];
    }//End if condition
    if (menu === 'inc') {
      menuKeys = [26, 27];
    }//End if condition
    if (menu === 'vp') {
      menuKeys = [28, 29, 30, 31, 32, 33, 34];
    }//End if condition
    if (menu === 'companies') {
      menuKeys = [28, 29, 30, 31, 32, 33, 34];
    }//End if condition
    if (menu === 'resetPass') {
      menuKeys = [28, 29, 30, 31, 32, 33, 34];
    }//End if condition
    if (menu === 'backup') {
      menuKeys = [28, 29, 30, 31, 32, 33, 34];
    }//End if condition
    if (menu === 'settings') {
      menuKeys = [28, 29, 30, 31, 32, 33, 34];
    }//End if condition

    // if (drawer) {
    //   menuKeys = [1, 3, 6, 9, 11, 13, 15, 19];
    // }//End if condition

    return this.state.menuArr.map(item => {
      if (menuKeys.find(i => i === item.key)) {
        return (
          <Menu.Item key={item.link}>
            <Tooltip placement="right" title={this.state.collapsed ? item.toolTip : ''} >
              <NavLink exact to={`/${window.urlpk}/${item.link}`}>
                <i className={`las la-${item.icon}`} /> <span>{this.state.collapsed ? item.label : item.toolTip}</span>
              </NavLink>
            </Tooltip>
          </Menu.Item>
        )//End return
      } else {
        return false
      }//End if condition
    })//End map

  }//End function

  render() {
    const st = this.state;
    const stv_d = this.props.stv.brand;
    // const stv_ad = this.props.stv.app_data;
    return (
      <React.Fragment>
        {/* <div className="mobile-drawer-mask">asdf</div> */}
        <span className="toggleIconContainer">
          {/* <span className="iconContainer"> */}
          {st.collapsed && <i className={`toggleIconHide las la-${this.state.collapseIcon}`} onClick={this.toggleToHide} />}
          {/* <i className={`siderMenuTrigger las ${this.state.collapsed ? 'la-angle-double-right' : 'la-angle-double-left'}`} onClick={this.toggle} /> */}
          {!st.hideSideBar && <i className={`siderMenuTrigger trigger-desktop las ${this.state.collapsed ? 'la-angle-double-right' : 'la-angle-double-left'}`} onClick={this.toggle} />}
          {/* <i className="siderMenuTrigger trigger-mobile las la-bars" onClick={this.toggle} /> */}
          {/* <i className="siderMenuTrigger trigger-mobile las la-bars" onClick={() => this.setState({ mobileDrawerVisible: true })} /> */}
          {/* </span> */}
        </span>

        <Sider theme="light" className="sider" id="scroll-style-3" trigger={null} collapsible collapsed={this.state.collapsed}>
          {/* {($(window).width() <= 576) ? */}
          {/* <span className="mobileNavMenu"><NavigationHr mobileMenu={true} /></span> */}
          {/* : */}
          <div className="flexTopBottom">
            {/* <button onClick={() => this.setState({ mobileDrawerVisible: true })}>asdf</button> */}
            <div className="text-center">
              {/* <i className={`siderMenuTrigger las ${this.state.collapsed ? 'la-angle-double-right' : 'la-angle-double-left'}`} onClick={this.toggle} /> */}
              {/* <div className={(ud.current_level === '1' && ud.rec_btn_toggle_at_bar !== 'true') ? 'disabled-on-start' : ''}> */}
              {/* <div className="disabled-on-start"> */}
              <Menu theme="light" key={0} mode="inline">{this.showMenu()}</Menu>
              {/* </div> */}
            </div>
            {/* <i className={`siderMenuTrigger las ${this.state.collapsed ? 'la-angle-double-right' : 'la-angle-double-left'}`} onClick={this.toggle} /> */}
            <div>
              {/* <i className="siderMenuTrigger las la-search" onClick={this.showDrawer} /> */}
              <a href={stv_d.url} target="_blank" rel="noopener noreferrer">
                <img className="brand-icon" src={`${process.env.PUBLIC_URL}/img/${stv_d.icon}`} alt="Logo" />
              </a>
            </div>
          </div>
          {/* } */}
        </Sider>
      </React.Fragment>
    );
  }//End render
}//End class

export default connect(StoreGet)(SiderMenu);