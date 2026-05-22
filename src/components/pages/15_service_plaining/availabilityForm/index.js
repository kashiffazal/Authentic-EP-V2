import React, { Component } from 'react';
import PageTitle from '../../mutual/pageTitle';
import AvailabilityForm from './form';

class AvailabilityFormPage extends Component {

  render() {
    return (
      <React.Fragment>
        <PageTitle
          titleIcon="las la-business-time"
          titleSpan="Service"
          titleHeading="Availability"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-user-astronaut', label: 'Service Availability' },
          ]}
        />
        <div className="container">
          <AvailabilityForm showLabel={true}/>
        </div>
      </React.Fragment>
    );//End return
  }//End render
}//End Class
export default AvailabilityFormPage;