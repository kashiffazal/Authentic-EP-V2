import React, { Component } from 'react'
import PageTitle from '../../mutual/pageTitle';
import ServiceWidget from './serviceWidget';

class ServiceListPending extends Component {
  render() {
    return (
      <div>
        <PageTitle
          titleIcon="las la-user-tag"
          titleSpan="Pending"
          titleHeading="Services List"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-user-tag', label: 'Pending Services List' },
          ]}
        />
        <ServiceWidget pending />
      </div>
    )//End return
  }//End render
}//End class
export default ServiceListPending;