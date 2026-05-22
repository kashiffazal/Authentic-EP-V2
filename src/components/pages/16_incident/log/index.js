import React, { Component } from 'react';
import PageTitle from '../../mutual/pageTitle';
import { Tabs } from 'antd';
// import StaffTimesheetDraft from './partial/draftLog';
import { AccessControl, GetUserData } from '../../../services';
import UnapprovedLog from './partial/unapprovedLog';
import ApprovedLog from './partial/approvedLog';
import DeletedLog from './partial/deleteLog';
import DraftLog from './partial/draftLog';
import '../styles.less';

const { TabPane } = Tabs;

class IncidentLog extends Component {
  state = {
    unApproveCount: 0,
    approvedCount: 0,
    deletedCount: 0,
    draftCount: 0,
    deletedData: [],
    isSPW: true,
    statusList: {}
  }//End state

  setCount = (a, b, c, d) => {
    this.setState({ unApproveCount: a, approvedCount: b, deletedCount: c, draftCount: d })
  }//End function

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
          titleSpan="Incident Form"
          titleHeading="Log"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-book', label: 'Cheque Book' },
            { iconLas: 'las la-th-list', label: 'Cheque Book Log' }
          ]}
        />

        <div className={`${window.webviewMobile ? '' : 'container'} incident-log-container`}>
          <Tabs type="card" defaultActiveKey="1" >
            {AccessControl(53) &&
              <TabPane tab={<span><i className={this.setStatusData('unapprove', 'icon')} style={{ color: this.setStatusData('unapprove', 'color') }} />  {this.setStatusData('unapprove', 'name')} ({st.unApproveCount})</span>} key='1'>
                <UnapprovedLog isSPW={st.isSPW} count={(a, b, c, d) => this.setCount(a, b, c, d)} deletedData={(e) => this.setState({ deletedData: e }, () => {
                  this.setState({ unApproveCount: (parseInt(st.unApproveCount) - 1), deletedCount: (parseInt(st.deletedCount) + 1) })
                })} statusList={(e) => this.setState({ statusList: e })} />
              </TabPane>
            }
            {AccessControl(58) &&
              <TabPane tab={<span><i className={this.setStatusData('approved', 'icon')} style={{ color: this.setStatusData('approved', 'color') }} /> {this.setStatusData('approved', 'name')} ({st.approvedCount})</span>} key='2'>
                <ApprovedLog isSPW={st.isSPW} count={(a, b, c, d) => this.setCount(a, b, c, d)} deletedData={(e) => this.setState({ deletedData: e }, () => {
                  this.setState({ approvedCount: (parseInt(st.approvedCount) - 1), deletedCount: (parseInt(st.deletedCount) + 1) })
                })} statusList={(e) => this.setState({ statusList: e })} />
              </TabPane>
            }
            {AccessControl(63) &&
              <>
                {!st.isSPW &&
                  <TabPane tab={<span><i className={this.setStatusData('deleted', 'icon')} style={{ color: this.setStatusData('deleted', 'color') }} /> {this.setStatusData('deleted', 'name')} ({st.deletedCount})</span>} key='3'>
                    <DeletedLog isSPW={st.isSPW} count={(a, b, c, d) => this.setCount(a, b, c, d)} deletedData={st.deletedData}
                      statusList={(e) => this.setState({ statusList: e })}
                    />
                  </TabPane>
                }
              </>
            }
            {AccessControl(66) &&
              <TabPane tab={<span><i className={this.setStatusData('draft', 'icon')} style={{ color: this.setStatusData('draft', 'color') }} /> {this.setStatusData('draft', 'name')} ({st.draftCount})</span>} key='4'>
                <DraftLog isSPW={st.isSPW} count={(a, b, c, d) => this.setCount(a, b, c, d)} deletedData={(e) => this.setState({ deletedData: e }, () => {
                  this.setState({ draftCount: (parseInt(st.draftCount) - 1), deletedCount: (parseInt(st.deletedCount) + 1) })
                })} statusList={(e) => this.setState({ statusList: e })} />
              </TabPane>
            }
          </Tabs>
        </div>
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    let spwId = GetUserData().link_id
    this.setState({ isSPW: (spwId ? true : false) });
  }
}//End class

export default IncidentLog;
