import React, { Component } from 'react';
import PageTitle from '../../../mutual/pageTitle';
import { Tabs } from 'antd';
// import StaffTimesheetDraft from './partial/draftLog';
import StaffTimesheetUnapproved from './partial/unapprovedLog';
import StaffTimesheetApproved from './partial/approvedLog';
import { AccessControl } from '../../../../services';

const { TabPane } = Tabs;

class StaffTimesheetLog extends Component {
  state = {
    draftCount: 0,
    unApproveCount: 0,
    approvedCount: 0,
    statusList: {}
  }//End Status

  setStatusData = (status, type) => {
    return this.state.statusList[status] ? this.state.statusList[status][type] : '';
    // console.log(this.state.statusList[status]);
  }//End function

  render() {
    const st = this.state;
    return (
      <div>
        <PageTitle
          titleIcon="las la-th-list"
          titleSpan="Staff Timesheet"
          titleHeading="Log"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-th-list', label: 'Staff Timesheet Log' }
          ]}
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          <Tabs type="card" defaultActiveKey="2" >
            {/* <TabPane tab={<span><i className="las la-list-ul" /> Draft ({st.draftCount})</span>} key='1'>
              <StaffTimesheetDraft getCount={(a, b, c) => this.setState({ draftCount: a, unApproveCount: b, approvedCount: c })} />
            </TabPane> */}
            {AccessControl(70) &&
              <TabPane tab={<span><i className={this.setStatusData('unapproved', 'icon')} style={{ color: this.setStatusData('unapproved', 'color') }} /> {this.setStatusData('unapproved', 'name')} {st.unApproveCount ? `(${st.unApproveCount})` : ''}</span>} key='2'>
                <StaffTimesheetUnapproved count={(e) => this.setState({ unApproveCount: e })}
                  setStatusList={(e) => this.setState({ statusList: e })}
                />
              </TabPane>
            }
            {AccessControl(72) &&
              <TabPane tab={<span><i className={this.setStatusData('approved', 'icon')} style={{ color: this.setStatusData('approved', 'color') }} /> {this.setStatusData('approved', 'name')} {st.approvedCount ? `(${st.approvedCount})` : ''}</span>} key='3'>
                <StaffTimesheetApproved count={(e) => this.setState({ approvedCount: e })}
                  setStatusList={(e) => this.setState({ statusList: e })}
                />
              </TabPane>
            }
          </Tabs>
        </div>
      </div>
    )//End Return statement
  }//end End Render
}//End class

export default StaffTimesheetLog;
