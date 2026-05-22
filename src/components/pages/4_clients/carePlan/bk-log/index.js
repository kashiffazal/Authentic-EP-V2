import React, { Component } from 'react';
import PageTitle from '../../../mutual/pageTitle';
import { Button } from 'antd';

class CarePlanLog extends Component {
  render() {
    return (
      <React.Fragment>
        <PageTitle
          titleIcon="las la-th-list"
          titleSpan="Care Plan"
          titleHeading="Log"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-id-card', label: 'Clients' },
            { iconLas: 'las la-folder', label: 'Care Plan' },
            { iconLas: 'las la-th-list', label: 'Log' }
          ]}
          breadcrumbWithRender={
            <div className="renderContentWithBreadcrumb">
              <Button size="small" ghost type="primary" className="m-b-0" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/carePlanForm')}>Add New</Button>
            </div>
          }
        />
      </React.Fragment>
    )//End return
  }//End render
}//End class
export default CarePlanLog;