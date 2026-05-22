import React, { Component } from 'react';
import PageTitle from '../mutual/pageTitle';
import CompanyForm from './form';
import CompanyLog from './log';
import { AccessControl } from '../../services';


class Companies extends Component {
  acceptMethods(method) {
    // Parent stores the method that the child passed
    this.loadData = method;
  }
  render() {
    return (
      <div>
        <PageTitle
          titleIcon="las la-industry"
          titleSpan="Add"
          titleHeading="Company(s)"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and employees."
          breadcrumb={[
            { iconLas: 'las la-boxes', label: 'Others' },
            { iconLas: 'las la-industry', label: 'Add Company(s)' }
          ]}
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          {AccessControl(137) &&
            <div className={window.webviewMobile ? 'container' : ''}>
              <CompanyForm loadData={() => this.loadData()} />
            </div>
          }
          {AccessControl(138) &&
            <CompanyLog shareMethods={this.acceptMethods.bind(this)} loadData={() => this.loadData()} />
          }
        </div>
      </div>
    )//End Return statement
  }//end End Render
}//End class

export default Companies;
