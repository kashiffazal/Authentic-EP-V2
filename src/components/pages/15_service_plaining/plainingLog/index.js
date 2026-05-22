import React, { Component } from 'react'
// import { Radio } from 'antd';
import PageTitle from '../../mutual/pageTitle';
import RegularLog from './partial/regularLog';
// import ExtraLog from './partial/extraLog';
import { AccessControl } from '../../../services';
// const { TabPane } = Tabs;
import '../styles.less';

class ServicePlainLog extends Component {
  state = {
    tabIndex: 1
  }//End state

  render() {
    // const st = this.state;
    const regularAc = AccessControl('41,45,48,52');
    // const extraAc = AccessControl('56,60,63,67')
    // const logType = (regularAc && extraAc) ? '' : (regularAc && !extraAc ? 'Regular' : (!regularAc && extraAc) ? 'Extra' : '')
    return (
      <React.Fragment>
        <PageTitle
          titleIcon="las la-th-list"
          titleSpan={`Service Plaining`}
          titleHeading="Log"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-chalkboard-teacher', label: 'Service Plaining' },
            { iconLas: 'las la-th-list', label: `Service Plaining Log` }
          ]}
        // render={
        //   (regularAc && extraAc) &&
        //   <Radio.Group size="large" onChange={(e) => this.setState({ tabIndex: e.target.value })}>
        //     {regularAc && <Radio.Button value={1}><i className="las la-registered" /> Regular</Radio.Button>}
        //     {extraAc && <Radio.Button value={2}><i className="las la-external-link-alt" /> Extra</Radio.Button>}
        //   </Radio.Group>
        // }
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          {regularAc && <RegularLog />}
          {/* {(regularAc && extraAc) && st.tabIndex === 1 ? <RegularLog /> : st.tabIndex === 2 ? <ExtraLog /> : ''} */}
          {/* {(regularAc && !extraAc) && <RegularLog />} */}
          {/* {(!regularAc && extraAc) && <ExtraLog />} */}
        </div>
      </React.Fragment>
    )//End return
  }//End render
}//End class
export default ServicePlainLog;