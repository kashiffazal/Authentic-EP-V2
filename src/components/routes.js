import React, { Component } from "react";
import { withRouter } from "react-router";
import Loadable from 'react-loadable';
import { HashRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top'

import { connect } from 'react-redux';
import StoreGet from '../store/get';
import StorePost from '../store/post';

//Services Import
import { GetUserData, GetUserSetting, AccessControl } from './services';

//Importing Custom Components
import ScreenLoader from './externalComponents/screen-loader';
import SessionExpiredLoginScreen from './externalComponents/antd-session-expired-login-screen';

//Importing with loader
function Loading({ error }) { if (error) { console.log(error); return 'Oh nooess!'; } else { return <ScreenLoader loaderType="jellyBox" bgc="black" active={true} color="#fff" tip="Preparing Application" />; } }//End function

//Importing Pages
const Overview = Loadable({ loader: () => import(/*webpackChunkName: 'overview'*/'./pages/overview'), loading: Loading });
const _404 = Loadable({ loader: () => import('./pages/404/404'), loading: Loading });

//User Management page imports
const CreateUser = Loadable({ loader: () => import('./pages/1_userManagement/create_user'), loading: Loading });
const UsersLog = Loadable({ loader: () => import('./pages/1_userManagement/log'), loading: Loading });
const UsersPermission = Loadable({ loader: () => import('./pages/1_userManagement/permission'), loading: Loading });
const Job = Loadable({ loader: () => import('./pages/2_job'), loading: Loading });
const SupportWorkerForm = Loadable({ loader: () => import('./pages/3_support_worker/form'), loading: Loading });
const SupportWorkerLog = Loadable({ loader: () => import('./pages/3_support_worker/log'), loading: Loading });
const IncidentForm = Loadable({ loader: () => import('./pages/16_incident/form'), loading: Loading });
const IncidentLog = Loadable({ loader: () => import('./pages/16_incident/log'), loading: Loading });
const ClientForm = Loadable({ loader: () => import('./pages/4_clients/form'), loading: Loading });
const ClientLog = Loadable({ loader: () => import('./pages/4_clients/log'), loading: Loading });
// const CarePlanForm = Loadable({ loader: () => import('./pages/4_clients/carePlan/form'), loading: Loading });
// const CarePlanLog = Loadable({ loader: () => import('./pages/4_clients/carePlan/log'), loading: Loading });
const ClientNote = Loadable({ loader: () => import('./pages/4_clients/note'), loading: Loading });
const ClientProgressNote = Loadable({ loader: () => import('./pages/4_clients/progressNote'), loading: Loading });
const ClientAppointment = Loadable({ loader: () => import('./pages/4_clients/appointment'), loading: Loading });
// const ClientTimesheetForm = Loadable({ loader: () => import('./pages/5_time_sheet/client_timesheet/form'), loading: Loading });
// const ClientTimesheetLog = Loadable({ loader: () => import('./pages/5_time_sheet/client_timesheet/log'), loading: Loading });
const StaffTimesheetForm = Loadable({ loader: () => import('./pages/5_time_sheet/staff_timesheet/form'), loading: Loading });
const StaffTimesheetLog = Loadable({ loader: () => import('./pages/5_time_sheet/staff_timesheet/log'), loading: Loading });
// const DocumentsGeneration = Loadable({ loader: () => import('./pages/6_documents_generation'), loading: Loading });
// const DocumentsTracking = Loadable({ loader: () => import('./pages/7_document_traking'), loading: Loading });
// const OtherForms = Loadable({ loader: () => import('./pages/8_other_forms'), loading: Loading });
const Reporting = Loadable({ loader: () => import('./pages/9_reporting'), loading: Loading });
const ReportingColumnPresetsForm = Loadable({ loader: () => import('./pages/9_reporting/column_presets'), loading: Loading });
const ReportingColumnPresetsLog = Loadable({ loader: () => import('./pages/9_reporting/column_presets/log'), loading: Loading });
const DataBackup = Loadable({ loader: () => import('./pages/10_data_backup/'), loading: Loading });
// const ExportDB = Loadable({ loader: () => import('./pages/10_import_export_db/2_export'), loading: Loading });
const ViewProfile = Loadable({ loader: () => import('./pages/11_profile/'), loading: Loading });
const ResetPassword = Loadable({ loader: () => import('./pages/12_reset_password'), loading: Loading });
// const Settings = Loadable({ loader: () => import('./pages/13_settings'), loading: Loading });
const Team = Loadable({ loader: () => import('./pages/14_team'), loading: Loading });
const ServicePlainForm = Loadable({ loader: () => import('./pages/15_service_plaining/plainingForm/'), loading: Loading });
const ServicePlainLog = Loadable({ loader: () => import('./pages/15_service_plaining/plainingLog/'), loading: Loading });
const AvailabilityFormPage = Loadable({ loader: () => import('./pages/15_service_plaining/availabilityForm/'), loading: Loading });
const ServiceList = Loadable({ loader: () => import('./pages/15_service_plaining/serviceList/'), loading: Loading });
const ServiceListToday = Loadable({ loader: () => import('./pages/15_service_plaining/serviceList/serviceListToday'), loading: Loading });
const ServiceListPending = Loadable({ loader: () => import('./pages/15_service_plaining/serviceList/serviceListPending'), loading: Loading });
const ServiceTimerLog = Loadable({ loader: () => import('./pages/15_service_plaining/timerLog/'), loading: Loading });
const ServiceSPWReplaceRequest = Loadable({ loader: () => import('./pages/15_service_plaining/shiftReplacement/log'), loading: Loading });
const ServiceSchedule = Loadable({ loader: () => import('./pages/15_service_plaining/schedule/'), loading: Loading });

const SettingsEmailDeliveryServers = Loadable({ loader: () => import('./pages/18_settings/emailDeliveryServers/'), loading: Loading });
const SettingsEmailNotifications = Loadable({ loader: () => import('./pages/18_settings/emailNotifications/'), loading: Loading });
const SettingsEmailSentList = Loadable({ loader: () => import('./pages/18_settings/emailSentList/'), loading: Loading });

const Companies = Loadable({ loader: () => import('./pages/17_companies'), loading: Loading });

// const Test = Loadable({ loader: () => import('./pages/test'), loading: Loading });
// const Test2 = Loadable({ loader: () => import('./pages/test2'), loading: Loading });
// const Test3 = Loadable({ loader: () => import('./pages/test3'), loading: Loading });

class Routes extends Component {

  componentDidMount() {
    if (!localStorage.getItem(window.appLocalStorage)) {
      this.props.history.push(process.env.PUBLIC_URL + '/login');
    } else {
      let getUserData = GetUserData();
      if (!getUserData) {
        this.props.history.push(process.env.PUBLIC_URL + '/login');
        return false;
      }//End if condition
      this.props.post_stv('ud', GetUserData());
      this.props.post_stv('st', GetUserSetting());
      //console.log(GetUserData());
    }//End if condition
    this.interval = setInterval(() => {
      if (!localStorage.getItem(window.appLocalStorage)) {
        clearInterval(this.interval);
        this.props.history.push(process.env.PUBLIC_URL + '/login');
      }//End if condition
      if (window.sessionExpire === true) {
        this.props.post_stv('showLoginScreen', true);
      } else {
        this.props.post_stv('showLoginScreen', false);
      }//End if condition
    }, 1000);
  }//End componentDidMount

  render() {
    return (
      <div>
        <SessionExpiredLoginScreen show={this.props.stv.showLoginScreen} />
        <HashRouter>
          <div>
            {/* <header>Header</header> */}
            <div className="app-container">
              <ScrollToTop>
                <Switch>
                  <Route exact path={`${process.env.PUBLIC_URL}/`} component={Overview} />
                  <Route exact path={`${process.env.PUBLIC_URL}/e/overview`} component={Overview} />

                  {/** Job Module */}
                  {AccessControl('1,2') && <Route exact path={`${process.env.PUBLIC_URL}/e/job`} component={Job}></Route>}
                  {/** Support Worker Module */}
                  {AccessControl(6) && <Route exact path={`${process.env.PUBLIC_URL}/e/supportWorkerForm`} component={SupportWorkerForm}></Route>}
                  {AccessControl(6) && <Route exact path={`${process.env.PUBLIC_URL}/e/supportWorkerForm/:id`} component={SupportWorkerForm}></Route>}
                  {AccessControl(7) && <Route path={`${process.env.PUBLIC_URL}/e/supportWorkerLog`} component={SupportWorkerLog}></Route>}
                  {/** Team Module */}
                  {AccessControl('12,13,17') && <Route exact path={`${process.env.PUBLIC_URL}/e/team`} component={Team}></Route>}
                  {/** Client Module */}
                  {AccessControl(21) && <Route exact path={`${process.env.PUBLIC_URL}/e/clientForm`} component={ClientForm}></Route>}
                  {AccessControl(21) && <Route exact path={`${process.env.PUBLIC_URL}/e/clientForm/:id`} component={ClientForm}></Route>}
                  {AccessControl(22) && <Route path={`${process.env.PUBLIC_URL}/e/clientLog`} component={ClientLog}></Route>}
                  {/** Status Note Module */}
                  {AccessControl('28,29') && <Route path={`${process.env.PUBLIC_URL}/e/clientNote`} component={ClientNote}></Route>}
                  {/** Progress Note Module */}
                  {AccessControl('30,31') && <Route path={`${process.env.PUBLIC_URL}/e/clientProgressNote`} component={ClientProgressNote}></Route>}
                  {/** Appointment Note Module */}
                  {AccessControl('34,35,40,44,48') && <Route path={`${process.env.PUBLIC_URL}/e/clientAppointment`} component={ClientAppointment}></Route>}
                  {/** Incident Module */}
                  {AccessControl(52) && <Route exact path={`${process.env.PUBLIC_URL}/e/incidentForm`} component={IncidentForm}></Route>}
                  {AccessControl(52) && <Route exact path={`${process.env.PUBLIC_URL}/e/incidentForm/:id`} component={IncidentForm}></Route>}
                  {AccessControl('53,58,63,66') && <Route path={`${process.env.PUBLIC_URL}/e/incidentLog`} component={IncidentLog}></Route>}
                  {/** Staff Time Sheet Module */}
                  {AccessControl(71) && <Route exact path={`${process.env.PUBLIC_URL}/e/staffTimesheet/:id`} component={StaffTimesheetForm}></Route>}
                  {AccessControl('70,72') && <Route path={`${process.env.PUBLIC_URL}/e/staffTimesheetLog`} component={StaffTimesheetLog}></Route>}
                  {/** Service Plaining */}
                  {AccessControl(74) && <Route exact path={`${process.env.PUBLIC_URL}/e/servicePlainForm`} component={ServicePlainForm}></Route>}
                  {AccessControl(74) && <Route exact path={`${process.env.PUBLIC_URL}/e/servicePlainForm/:id`} component={ServicePlainForm}></Route>}
                  {AccessControl('75,79,83,87') && <Route exact path={`${process.env.PUBLIC_URL}/e/servicePlainLog`} component={ServicePlainLog}></Route>}
                  {window.userData.link_id && <Route exact path={`${process.env.PUBLIC_URL}/e/availabilityForm`} component={AvailabilityFormPage}></Route>}
                  {window.userData.link_id && <Route exact path={`${process.env.PUBLIC_URL}/e/serviceList`} component={ServiceList}></Route>}
                  {window.userData.link_id && <Route exact path={`${process.env.PUBLIC_URL}/e/serviceListToday`} component={ServiceListToday}></Route>}
                  {window.userData.link_id && <Route exact path={`${process.env.PUBLIC_URL}/e/serviceListPending`} component={ServiceListPending}></Route>}
                  {AccessControl('90,93,96,99') && <Route exact path={`${process.env.PUBLIC_URL}/e/serviceTimerLog`} component={ServiceTimerLog}></Route>}
                  {AccessControl('102,107,112,117') && <Route exact path={`${process.env.PUBLIC_URL}/e/serviceSPWReplaceRequest`} component={ServiceSPWReplaceRequest}></Route>}
                  {AccessControl(122) && <Route exact path={`${process.env.PUBLIC_URL}/e/serviceSchedule`} component={ServiceSchedule}></Route>}
                  {/** Reporting Module */}
                  {AccessControl(132) && <Route key="i43" path={`${process.env.PUBLIC_URL}/e/reporting`} component={Reporting}></Route>}
                  {AccessControl(133) && <Route key="i43.1" exact path={`${process.env.PUBLIC_URL}/e/reportingColumnPresets`} component={ReportingColumnPresetsForm}></Route>}
                  {AccessControl(133) && <Route key="i43.2" exact path={`${process.env.PUBLIC_URL}/e/reportingColumnPresets/:id`} component={ReportingColumnPresetsForm}></Route>}
                  {AccessControl(134) && <Route key="i43.3" path={`${process.env.PUBLIC_URL}/e/reportingColumnPresetsLog`} component={ReportingColumnPresetsLog}></Route>}
                  {/** User Profile Module */}
                  {AccessControl(135) && <Route path={`${process.env.PUBLIC_URL}/e/viewProfile`} component={ViewProfile}></Route>}
                  {/** Company Module */}
                  {AccessControl('137,138') && <Route exact path={`${process.env.PUBLIC_URL}/e/companies`} component={Companies}></Route>}
                  {/** User Management */}
                  {AccessControl(143) && <Route exact path={`${process.env.PUBLIC_URL}/e/createUser`} component={CreateUser}></Route>}
                  {AccessControl(143) && <Route exact path={`${process.env.PUBLIC_URL}/e/createUser/:id`} component={CreateUser}></Route>}
                  {AccessControl(144) && <Route path={`${process.env.PUBLIC_URL}/e/usersLog`} component={UsersLog}></Route>}
                  {AccessControl(148) && <Route path={`${process.env.PUBLIC_URL}/e/usersPermission`} component={UsersPermission}></Route>}
                  {/** Reset Password Module */}
                  {AccessControl(151) && <Route path={`${process.env.PUBLIC_URL}/e/resetPassword`} component={ResetPassword}></Route>}
                  {/** Data Backup Module */}
                  {AccessControl('152,153,154,158,162,163') && <Route path={`${process.env.PUBLIC_URL}/e/dataBackup`} component={DataBackup}></Route>}
                  {/** Settings Email Delivery Module(s) */}
                  {AccessControl('164,165') && <Route exact path={`${process.env.PUBLIC_URL}/e/settings/emailDeliveryServers`} component={SettingsEmailDeliveryServers}></Route>}
                  {AccessControl('170,171,173,174,176,177,179,180,181,182') && <Route exact path={`${process.env.PUBLIC_URL}/e/settings/emailNotifications`} component={SettingsEmailNotifications}></Route>}
                  {AccessControl('183,186,189') && <Route exact path={`${process.env.PUBLIC_URL}/e/settings/emailSentList`} component={SettingsEmailSentList}></Route>}
                  <Route path={`${process.env.PUBLIC_URL}/e/*`} component={_404}></Route>

                  {/* <Route exact path={`${process.env.PUBLIC_URL}/e/test`} component={Test}></Route> */}
                  {/* <Route exact path={`${process.env.PUBLIC_URL}/e/test2`} component={Test2}></Route> */}
                  {/* <Route exact path={`${process.env.PUBLIC_URL}/e/test3`} component={Test3}></Route> */}                  

                  {/** Client Time Sheet Module */}
                  {/* {AccessControl(28) && <Route exact path={`${process.env.PUBLIC_URL}/e/clientTimesheet`} component={ClientTimesheetForm}></Route>} */}
                  {/* {AccessControl(28) && <Route exact path={`${process.env.PUBLIC_URL}/e/clientTimesheet/:id`} component={ClientTimesheetForm}></Route>} */}
                  {/* {AccessControl('29,31') && <Route path={`${process.env.PUBLIC_URL}/e/clientTimesheetLog`} component={ClientTimesheetLog}></Route>} */}
                  {/* {AccessControl(34) && <Route exact path={`${process.env.PUBLIC_URL}/e/staffTimesheet`} component={StaffTimesheetForm}></Route>} */}

                  {/** Document Tracking Module */}
                  {/* {AccessControl('100,101') && <Route path={`${process.env.PUBLIC_URL}/e/documentsTracking`} component={DocumentsTracking}></Route>} */}
                  {/** Other Forms Module */}
                  {/* <Route path={`${process.env.PUBLIC_URL}/e/otherForms`} component={OtherForms}></Route> */}
                  {/** Document Generation Module */}
                  {/* {AccessControl(97) && <Route path={`${process.env.PUBLIC_URL}/e/documentsGeneration`} component={DocumentsGeneration}></Route>} */}

                  {/* <Route path={`${process.env.PUBLIC_URL}/e/exportDB`} component={ExportDB}></Route> */}
                  {/* <Route path={`${process.env.PUBLIC_URL}/e/settings`} component={Settings}></Route> */}

                </Switch>
              </ScrollToTop>
            </div>
            {/* Footer */}
          </div>
        </HashRouter>
      </div>
    )//End render
  }//End Render
}//End class

export default connect(StoreGet, StorePost)(withRouter(Routes));
