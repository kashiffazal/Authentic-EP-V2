import React, { Component } from 'react'
import { Tabs } from 'antd';
import PageTitle from '../../mutual/pageTitle';
import RequestedLog from './partial/requestedLog';
import ReplacedLog from './partial/replacedLog';
import OnHoldLog from './partial/onHoldLog';
import DeletedLog from './partial/deletedLog';
import DoneLog from './partial/doneLog';
import { AccessControl } from '../../../services';

const { TabPane } = Tabs;

class ServiceSPWReplaceRequest extends Component {
  state = {
    addRequestedShiftOnLog: {},
    addReplacedShiftOnLog: {},
    addHoldShiftOnLog: {},
    addDeletedShiftOnLog: {},
    statusList: {},
  }

  setStatusData = (status, type) => {
    return this.state.statusList[status] ? this.state.statusList[status][type] : '';
    // console.log(this.state.statusList[status]);
  }//End function

  render() {
    const st = this.state;
    return (
      <div>
        <PageTitle
          titleIcon="las la-user-cog"
          titleSpan="SPW Shift"
          titleHeading="Replacement Request"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-user-astronaut', label: 'SPW Shift Replacement Request' },
          ]}
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          <Tabs type="card" tabPosition={'top'} defaultActiveKey="1" >
            <TabPane tab={<span><i className="las la-exclamation" /> Replacement Request</span>} key={1}>

              <Tabs type="card" tabPosition={window.is_xs ? 'top' : 'left'} defaultActiveKey="1" >
                {AccessControl(102) &&
                  <TabPane tab={<span><i className={this.setStatusData('requested', 'icon')} style={{ color: this.setStatusData('requested', 'color') }} /> {this.setStatusData('requested', 'name')}</span>} key={1}>
                    <RequestedLog
                      onReplaced={(e) => this.setState({ addReplacedShiftOnLog: e })}
                      onHold={(e) => this.setState({ addHoldShiftOnLog: e })}
                      onDeleted={(e) => this.setState({ addDeletedShiftOnLog: e })}
                      updateList={st.addRequestedShiftOnLog}
                      setStatusList={(e) => this.setState({ statusList: e })}
                    />
                  </TabPane>
                }
                {AccessControl(107) &&
                  <TabPane tab={<span><i className={this.setStatusData('replaced', 'icon')} style={{ color: this.setStatusData('replaced', 'color') }} /> {this.setStatusData('replaced', 'name')}</span>} key={2}>
                    <ReplacedLog
                      onHold={(e) => this.setState({ addHoldShiftOnLog: e })}
                      onDeleted={(e) => this.setState({ addDeletedShiftOnLog: e })}
                      updateList={st.addReplacedShiftOnLog}
                      setStatusList={(e) => this.setState({ statusList: e })}
                    />
                  </TabPane>
                }
                {AccessControl(112) &&
                  <TabPane tab={<span><i className={this.setStatusData('hold', 'icon')} style={{ color: this.setStatusData('hold', 'color') }} /> {this.setStatusData('hold', 'name')}</span>} key={3}>
                    <OnHoldLog
                      onReplaced={(e) => this.setState({ addReplacedShiftOnLog: e })}
                      onRequested={(e) => this.setState({ addRequestedShiftOnLog: e })}
                      onDeleted={(e) => this.setState({ addDeletedShiftOnLog: e })}
                      updateList={st.addHoldShiftOnLog}
                      setStatusList={(e) => this.setState({ statusList: e })}
                    />
                  </TabPane>
                }
                {AccessControl(117) &&
                  <TabPane tab={<span><i className={this.setStatusData('deleted', 'icon')} style={{ color: this.setStatusData('deleted', 'color') }} /> {this.setStatusData('deleted', 'name')}</span>} key={4}>
                    <DeletedLog
                      onReplaced={(e) => this.setState({ addReplacedShiftOnLog: e })}
                      onRequested={(e) => this.setState({ addRequestedShiftOnLog: e })}
                      onHold={(e) => this.setState({ addHoldShiftOnLog: e })}
                      updateList={st.addDeletedShiftOnLog}
                      setStatusList={(e) => this.setState({ statusList: e })}
                    />
                  </TabPane>
                }
              </Tabs>

            </TabPane>
            <TabPane tab={<span><i className="las la-check-double" /> Requested Shift Done by SPW</span>} key={2}><DoneLog /></TabPane>
          </Tabs>

        </div>
      </div>
    )//End return
  }//End render
}//End class
export default ServiceSPWReplaceRequest;