import React, { Component } from 'react';
import JobListWeb from './jobListWeb';
import SupportWorkerFormExternal from '../pages/3_support_worker/form/mainForm';
import TeamWeb from './teamWeb';
import ClientFormExternal from '../pages/4_clients/form/mainForm';
import IncidentFormExternal from '../pages/16_incident/form/mainForm';
import AppointmentForm from '../pages/4_clients/appointment/appointmentForm';
import './styles.less';

class ExternalWebComponent extends Component {
  render() {
    const pn = this.props.match.params.pageName;
    return (
      <div className="external-page-container">
        {pn === 'jobList' && <JobListWeb />}
        {pn === 'supportWorkerForm' && <div className="form-container"><SupportWorkerFormExternal disabledClickOnStep={true} /></div>}
        {pn === 'team' && <TeamWeb />}
        {pn === 'clientReferralForm' && <div className="form-container"><ClientFormExternal disabledClickOnStep={true} /></div>}
        {pn === 'incidentForm' && <div className="form-container"><IncidentFormExternal disabledClickOnStep={true} /></div>}
        {pn === 'appointmentForm' && <div className="form-container"><AppointmentForm /></div>}
      </div>
    );//End return
  }//End render
}//End class

export default ExternalWebComponent;