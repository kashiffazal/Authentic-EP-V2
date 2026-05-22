import React, { Component } from 'react';
import PageTitle from '../../../mutual/pageTitle';
import { Tabs } from 'antd';
// import ClientTimesheetDraft from './partial/draftLog';
import ClientTimesheetUnapproved from './partial/unapprovedLog';
import ClientTimesheetApproved from './partial/approvedLog';

const { TabPane } = Tabs;

class ClientTimesheetLog extends Component {
  state = {
    draftCount: 0,
    unApproveCount: 0,
    approvedCount: 0
  }
  render() {
    const st = this.state;
    return (
      <div>
        <PageTitle
          titleIcon="las la-th-list"
          titleSpan="Client Timesheet"
          titleHeading="Log"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and clients."
          breadcrumb={[
            { iconLas: 'las la-book', label: 'Cheque Book' },
            { iconLas: 'las la-th-list', label: 'Cheque Book Log' }
          ]}
        />
        <div className="container">
          <Tabs type="card" defaultActiveKey="2" >
            {/* <TabPane tab={<span><i className="las la-list-ul" /> Draft ({st.draftCount})</span>} key='1'>
              <ClientTimesheetDraft getCount={(a, b, c) => this.setState({ draftCount: a, unApproveCount: b, approvedCount: c })} />
            </TabPane> */}
            <TabPane tab={<span><i className="las la-exclamation-circle" /> Unapprove ({st.unApproveCount})</span>} key='2'>
              <ClientTimesheetUnapproved />
            </TabPane>
            <TabPane tab={<span><i className="las la-check-circle" /> Approved ({st.approvedCount})</span>} key='3'>
              <ClientTimesheetApproved />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )//End Return statement
  }//end End Render
}//End class

export default ClientTimesheetLog;
