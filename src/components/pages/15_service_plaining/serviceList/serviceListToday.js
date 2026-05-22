import React, { Component } from 'react'
import PageTitle from '../../mutual/pageTitle';
import ServiceWidget from './serviceWidget';

class ServiceListToday extends Component {
  render() {
    return (
      <div>
        <PageTitle
          titleIcon="las la-calendar-day"
          titleSpan="Today's"
          titleHeading="Services List"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-calendar-day', label: 'Today\'s Services List' },
          ]}
        />
        <ServiceWidget today />
      </div>
    )//End return
  }//End render
}//End class
export default ServiceListToday;