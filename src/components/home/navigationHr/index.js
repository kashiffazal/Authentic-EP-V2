import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import StoreGet from '../../../store/get';
import StorePost from '../../../store/post';
import { SaveArrLocalStorage, AccessControl } from '../../services';
import './styles.css';

const { SubMenu } = Menu;

class NavigationHr extends Component {
  constructor(props) {
    super(props)
    this.state = { current: 'overview', };
  }//End constructor
  handleClick = e => {
    //console.log(e);
    let key = e.key.split('_')[0];
    SaveArrLocalStorage(key, false, 'sideMenu');
    this.props.post_stv('sideNavMenu', key);
    this.setState({ current: e.key });
  };

  render() {
    const mobileMenu = this.props.mobileMenu;
    const cd = this.props.closeDrawer ? () => this.props.closeDrawer() : undefined;
    // console.log(window.userData.link_id);
    const is_spw = (window.userData.link_id !== '' && window.userData.link_id !== null);
    return (
      <div>
        <Menu key="main" className={mobileMenu ? "" : "box-nav"} onClick={this.handleClick} mode={mobileMenu ? "inline" : "horizontal"}>
          <Menu.Item key="overview">
            <NavLink onClick={cd} exact to="/e/overview"><i className="las la-home" /> <span>Overview</span></NavLink>
          </Menu.Item>
          {is_spw &&
            <Menu.Item key="saf">
              <NavLink onClick={cd} exact to="/e/availabilityForm"><i className="las la-business-time" /> <span>Availability</span></NavLink>
            </Menu.Item>
          }
          {is_spw &&
            <Menu.Item key="sl">
              <NavLink onClick={cd} exact to="/e/serviceList"><i className="las la-user-md" /> <span>Service</span></NavLink>
            </Menu.Item>
          }
          {AccessControl('1,2') &&
            <Menu.Item key="job">
              <NavLink onClick={cd} exact to="/e/job"><i className="las la-briefcase" /> <span>Create Jobs</span></NavLink>
            </Menu.Item>
          }
          {AccessControl('6,7,12') &&
            <SubMenu key="sp" title={<span><i className="las la-id-card-alt" /><span>Support Worker</span></span>}>
              {AccessControl('6,7') &&
                <SubMenu key="sp_sub" title={<span><i className="las la-id-card-alt" /><span>SW Form</span></span>}>
                  {AccessControl(6) && <Menu.Item key="sp_1"><NavLink onClick={cd} exact to="/e/supportWorkerForm"><i className="las la-file-medical" /> <span>Add New</span></NavLink></Menu.Item>}
                  {AccessControl(7) && <Menu.Item key="sp_3"><NavLink onClick={cd} exact to="/e/supportWorkerLog"><i className="las la-th-list" /> <span>Log</span></NavLink></Menu.Item>}
                </SubMenu>
              }
              {AccessControl(12) && <Menu.Item key="sp_4"><NavLink onClick={cd} exact to="/e/team"><i className="las la-users" /> <span>Team Member</span></NavLink></Menu.Item>}
            </SubMenu>
          }


          {AccessControl('21,22,28,29,30,31,34,35,40,44,48') &&
            <SubMenu key="cl" title={<span><i className="las la-id-card" /><span>Clients</span></span>}>
              {AccessControl('20,21') &&
                <SubMenu key="cl_sub" title={<span><i className="las la-id-card" /><span>CL Form</span></span>}>
                  {AccessControl(21) && <Menu.Item key="cl_1"><NavLink onClick={cd} exact to="/e/clientForm"><i className="las la-file-medical" /> <span>Add New</span></NavLink></Menu.Item>}
                  {AccessControl(22) && <Menu.Item key="cl_3"><NavLink onClick={cd} exact to="/e/clientLog"><i className="las la-th-list" /> <span>Log</span></NavLink></Menu.Item>}
                </SubMenu>
              }
              {/* <SubMenu key="cl_cp_sub" title={<span><i className="las la-folder" /><span>Care Plan</span></span>}>
                <Menu.Item key="cl_cp_1"><NavLink onClick={cd} exact to="/e/carePlanForm"><i className="las la-file-medical" /> <span>Add New</span></NavLink></Menu.Item>
                <Menu.Item key="cl_cp_3"><NavLink onClick={cd} exact to="/e/carePlanLog"><i className="las la-th-list" /> <span>Log</span></NavLink></Menu.Item>
              </SubMenu> */}
              {AccessControl('28,29') && <Menu.Item key="cl_5"><NavLink onClick={cd} exact to="/e/clientNote"><i className="las la-sticky-note" /> <span>Status Note</span></NavLink></Menu.Item>}
              {AccessControl('30,31') && <Menu.Item key="cl_4"><NavLink onClick={cd} exact to="/e/clientProgressNote"><i className="las la-file-alt" /> <span>Progress Note</span></NavLink></Menu.Item>}
              {AccessControl('34,35,40,44,48') && <Menu.Item key="cl_6"><NavLink onClick={cd} exact to="/e/clientAppointment"><i className="las la-calendar-day" /> <span>Appointment</span></NavLink></Menu.Item>}
            </SubMenu>
          }
          {/* {AccessControl('28,29,31,34,35,37') &&
            <SubMenu key="cts" title={<span><i className="las la-business-time" /><span>Time Sheets</span></span>}>
              {AccessControl('28,29,31') &&
                <Menu.ItemGroup key="cts" title={<span><i className="las la-business-time" />&nbsp; <span>Client Timesheet</span></span>}>
                  {AccessControl(28) && <Menu.Item key="cts_1"><NavLink onClick={cd} exact to="/e/clientTimesheet"><i className="las la-file-signature" /> <span>Form</span></NavLink></Menu.Item>}
                  {AccessControl('29,31') && <Menu.Item key="cts_2"><NavLink onClick={cd} exact to="/e/clientTimesheetLog"><i className="las la-th-list" /> <span>Log</span></NavLink></Menu.Item>}
                </Menu.ItemGroup>
              }
              {AccessControl('34,35,37') &&
                <Menu.ItemGroup key="ets" title={<span><i className="las la-business-time" />&nbsp; <span>Staff Timesheet</span></span>}>
                  {AccessControl(34) && <Menu.Item key="ets_1"><NavLink onClick={cd} exact to="/e/staffTimesheet"><i className="las la-file-signature" /> <span>Form</span></NavLink></Menu.Item>}
                  {AccessControl('35,37') && <Menu.Item key="ets_2"><NavLink onClick={cd} exact to="/e/staffTimesheetLog"><i className="las la-th-list" /> <span>Log</span></NavLink></Menu.Item>}
                </Menu.ItemGroup>
              }
            </SubMenu>
          } */}
          {AccessControl('52,53,58,63,66') &&
            <SubMenu key="inc" title={<span><i className="las la-id-card-alt" /><span>Incidents</span></span>}>
              {AccessControl('52') && <Menu.Item key="inc_1"><NavLink onClick={cd} exact to="/e/incidentForm"><i className="las la-file-medical" /> <span>Add New</span></NavLink></Menu.Item>}
              {AccessControl('53,58,63,66') && <Menu.Item key="inc_2"><NavLink onClick={cd} exact to="/e/incidentLog"><i className="las la-th-list" /> <span>Log</span></NavLink></Menu.Item>}
            </SubMenu>
          }

          {AccessControl('70,72') &&
            <Menu.Item key="ets_2">
              <NavLink onClick={cd} exact to="/e/staffTimesheetLog"><i className="las la-business-time" /> <span>Timesheet</span></NavLink>
            </Menu.Item>
          }


          {AccessControl('74,75,79,83,87,90,93,96,99,102,107,112,117,122') &&
            <SubMenu key="spp" title={<span><i className="las la-chalkboard-teacher" /><span>Service Plaining</span></span>}>
              {AccessControl('74,75,79,83,87') &&
                <SubMenu key="spp_sub" title={<span><i className="las la-chalkboard-teacher" /><span>SP Form</span></span>}>
                  {AccessControl(74) && <Menu.Item key="spf"><NavLink onClick={cd} exact to="/e/servicePlainForm"><i className="las la-file-medical" /> <span>Add New</span></NavLink></Menu.Item>}
                  {AccessControl('75,79,83,87') && <Menu.Item key="spl"><NavLink onClick={cd} exact to="/e/servicePlainLog"><i className="las la-th-list" /> <span>Plaining Log</span></NavLink></Menu.Item>}
                </SubMenu>
              }
              {AccessControl('90,93,96,99') && <Menu.Item key="sptl"><NavLink onClick={cd} exact to="/e/serviceTimerLog"><i className="las la-clock" /> <span>Timer Log</span></NavLink></Menu.Item>}
              {AccessControl('102,107,112,117') && <Menu.Item key="sprr"><NavLink onClick={cd} exact to="/e/serviceSPWReplaceRequest"><i className="las la-user-cog" /> <span>Replace Request</span></NavLink></Menu.Item>}
              {AccessControl('122') && <Menu.Item key="spsch"><NavLink onClick={cd} exact to="/e/serviceSchedule"><i className="las la-table" /> <span>Shift Schedule</span></NavLink></Menu.Item>}
            </SubMenu>
          }

          {/* <Menu.Item key="doc"> */}
          {/* {AccessControl('h-25,193,194') &&
            <SubMenu key="doc" title={<span><i className="las la-file-alt" /><span>Documents</span></span>}>
              {AccessControl('h-25') && <Menu.Item key="docg"><NavLink onClick={cd} exact to="/e/documentsGeneration"><i className="las la-file-pdf" /> <span>Doc Generation</span></NavLink></Menu.Item>}
              {AccessControl('193,194') && <Menu.Item key="tracking"><NavLink onClick={cd} exact to="/e/documentsTracking"><i className="las la-calendar-check" /> <span>Doc Tracking</span></NavLink></Menu.Item>}
            </SubMenu>
          } */}
          {/* </Menu.Item> */}

          {/*<Menu.Item key="other-forms">
            <NavLink onClick={cd} exact to="/e/otherForms"><i className="las la-table" /> <span>Other Forms</span></NavLink>
          </Menu.Item> */}


          {/* <Menu.Item key="reporting">
            <NavLink onClick={cd} exact to="/e/reporting"><i className="las la-file-invoice" /> <span>Reporting</span></NavLink>
          </Menu.Item> */}

          {AccessControl('132,133,134') &&
            <SubMenu key="rep" title={<span><i className="las la-folder-open" /><span>Report</span></span>}>
              {AccessControl(132) && <Menu.Item key="rep_1"><NavLink onClick={cd} exact to={`/e/reporting`}><i className="las la-file-pdf" /> <span>Reporting</span></NavLink></Menu.Item>}
              {AccessControl('133,134') &&
                <SubMenu key="rep_p2" title={<span><i className="las la-table" /> <span>Column Presets</span></span>}>
                  {AccessControl(133) && <Menu.Item key="rep_4"><NavLink onClick={cd} exact to={`/e/reportingColumnPresets`}><i className="las la-columns" /> <span>Create Column Presets</span></NavLink></Menu.Item>}
                  {AccessControl(134) && <Menu.Item key="rep_5"><NavLink onClick={cd} exact to={`/e/reportingColumnPresetsLog`}><i className="las la-th-list" /> <span>Column Presets Log</span></NavLink></Menu.Item>}
                </SubMenu>
              }
            </SubMenu>
          }
        </Menu>
      </div>
    );//End return
  }//End render
}//End class

export default connect(StoreGet, StorePost)(NavigationHr);