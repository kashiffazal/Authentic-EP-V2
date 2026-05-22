import React, { Component } from 'react'
import PageTitle from '../../mutual/pageTitle';
import ServiceWidget from './serviceWidget';

class ServiceList extends Component {
  render() {
    return (
      <div>
        <PageTitle
          titleIcon="las la-user-md"
          titleSpan="Service"
          titleHeading="List"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-user-astronaut', label: 'Service Availability' },
          ]}
        />
        <ServiceWidget heading/>
      </div>
    )//End return
  }//End render
}//End class
export default ServiceList;