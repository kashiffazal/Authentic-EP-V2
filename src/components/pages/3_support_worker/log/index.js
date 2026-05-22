import React, { Component } from 'react';
import PageTitle from '../../mutual/pageTitle';
import { Tabs } from 'antd';
import ScreenLoader from '../../../externalComponents/screen-loader';
import { HTTP, LogDeleteRow, LogResetList, SortArrayById, multidimensionalArraySeparateInstance, TableColumnListForSelectFilter } from '../../../services';
import SupportWorkerMainLog from './partial/mainLog';

const { TabPane } = Tabs;

class SupportWorkerLog extends Component {
  state = {
    getLoader: false,
    status_list: [],
    status_list_tab: [],
    status_list_mobile_table: [],
    list_data: [],
    user_company_list: [],
    manager_list: [],
    ads: {},//! App Default Settings,
    filterIndividualColArr: {},
  };

  updateListOnChangeStatus = (row, status, oldStatus) => {
    // console.log(row);
    // console.log(status);
    // console.log(row);
    let newData = { ...this.state.list_data };
    row.status = status.name;
    row.status_ref_id = status.id;
    newData[oldStatus] = LogDeleteRow(row, [...this.state.list_data[oldStatus]]);
    newData[status.name] = LogResetList(row, [...this.state.list_data[status.name]]);
    //Set All Tab
    let allLabel = this.state.status_list_tab[0]['name'];
    newData[allLabel] = this.makeAllList(newData, allLabel);

    this.setState({ list_data: { ...this.state.list_data, ...newData } });
  }//End function

  makeAllList = (data, allLabel) => {
    let listData = [];
    delete data[allLabel];
    Object.keys(data).forEach(i => { listData = listData.concat(multidimensionalArraySeparateInstance(data[i])); });
    listData = SortArrayById(listData);
    listData.forEach((i, k) => { listData[k]['key'] = (k + 1); });
    //It's mean first key which is 'All'
    return listData.reverse();
  }//End function

  render() {
    const st = this.state;
    return (
      <div>
        <PageTitle
          titleIcon="las la-th-list"
          titleSpan="Support Worker"
          titleHeading="Log"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-id-card-alt', label: 'Support Worker' },
            { iconLas: 'las la-arrow-alt-circle-down', label: 'SW Form' },
            { iconLas: 'las la-th-list', label: 'Log' }
          ]} />
        <div className={`${window.webviewMobile ? '' : 'container'} support-worker-form-container`}>
          <ScreenLoader active={st.loader}>
            {st.loader && <div className="h-200"></div>}
            <Tabs type="card" tabPosition={window.is_xs ? 'top' : 'left'} defaultActiveKey="1" className="ffddss">
              {st.status_list_tab.map((item, index) => {
                return (
                  <TabPane tab={<span><i className={item.icon} style={{ color: item.color }} /> {item.name} ({(st.list_data[item.name] ? st.list_data[item.name].length : 0)})</span>} key={(index + 1)}>
                    <SupportWorkerMainLog data={st.list_data[item.name]} statusList={st.status_list} statusName={item.name} statusListMobileTable={st.status_list_mobile_table} changeStatus={(a, b, c) => this.updateListOnChangeStatus(a, b, c)} ads={st.ads} filterIndividualColArr={st.filterIndividualColArr[item.name]} userCompanyList={st.user_company_list} managerList={st.manager_list} />
                  </TabPane>
                )//End return
              })}
            </Tabs>
          </ScreenLoader>
        </div>
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    this.setState({ loader: true });
    HTTP('get', '/supportWorker/get/getList/').then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      let allLabel = res.status_list_tab[0]['name'];
      res.data[allLabel] = this.makeAllList(res.data, allLabel);
      //console.log(res)
      this.setState({ list_data: res.data, status_list: res.status_list, status_list_tab: res.status_list_tab, status_list_mobile_table: res.status_list_mobile_table, ads: res.appDefaultSetting, user_company_list: res.userCompanyList, manager_list: res.managerList }, () => {
        //@ If individual filter in ON
        if (this.state.ads.tableIndividualColFilter.allow && this.state.ads.tableIndividualColFilter.filterByTypeOrSelect === 'select') {
          let filterIndividualColArr = {};
          Object.keys(res.data).forEach(element => {
            filterIndividualColArr[element] = TableColumnListForSelectFilter(res.data[element]);
          });
          this.setState({ filterIndividualColArr });
        }//End if condition
      });
    });
  }//End componentDidMount
}//End class

export default SupportWorkerLog;
