import React, { Component } from 'react'
import AppointmentLogAdmin from './partial/adminLog';
import AppointmentLogSW from './partial/swLog';
class AppointmentLog extends Component {
  render() {
    const is_spw = (window.userData.link_id !== '' && window.userData.link_id !== null);
    return (
      <div>
        {is_spw ? <AppointmentLogSW /> : <AppointmentLogAdmin />}
      </div>
    )//End return
  }//End render
}//End class
export default AppointmentLog;