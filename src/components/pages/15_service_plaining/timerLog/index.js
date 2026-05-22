import React, { Component } from 'react'
import { Tabs, Tooltip, Popconfirm, Modal, Popover, Button } from 'antd';
import { HTTP, LogDeleteRow, LogResetRow, AccessControl, SortableDateInTableData, TableColumnFilter, TableColumnListForSelectFilter } from '../../../services';
import ScreenLoader from '../../../externalComponents/screen-loader';
import DataTable from '../../../externalComponents/andt-data-table-component';
import TimerEdit from './timerEdit';
import UnattendedSetTime from './unattendedSetTime';
import PageTitle from '../../mutual/pageTitle';

const { TabPane } = Tabs;

class ServiceTimerLog extends Component {
  state = {
    getMainLoader: false,
    getSpecificLoader: false,
    data: [],
    timingList: [],
    updateStatusLoader: {},
    visibleEditTimerModal: false,
    editDataId: {},
    statusList: {},
    // tabStatus: [],
    bulkActionTabStatus: [],
    currentTabIndex: '0',
    resetSelectedRow: false,
    //! This is to update unattended shift to attended
    unattendedSetTimeModal: false,
    holdDataRow: '',
    holdDataStatus: '',
    timeIsNotSetToUpdate: true,
    ads: {},//! App Default Settings,
    filterIndividualColArr: {}
  }//End state

  getData = (statusIndex) => {
    let statusKeys = Object.keys(this.state.statusList);
    let status = ((statusKeys.length > 0) ? statusKeys[statusIndex] : 'unreviewed');
    this.setState({ currentTabIndex: statusIndex });

    if (statusKeys.length === 0) {
      //@ Loader at first time
      this.setState({ getMainLoader: true });
    } else {
      //@ Loader on change status or tab
      this.setState({ getSpecificLoader: true });
    }//End if condition
    HTTP('get', '/servicePlaining/get/getServiceTimerList/' + status).then(res => {
      this.setState({ getMainLoader: false, getSpecificLoader: false, data: [] });
      if (!res) { return false; }
      this.setState({ data: res.data, statusList: res.statusList, ads: res.appDefaultSetting, timingList: res.timingList }, () => {
        if (this.state.ads.tableIndividualColFilter.allow && this.state.ads.tableIndividualColFilter.filterByTypeOrSelect === 'select') {
          this.setState({ filterIndividualColArr: TableColumnListForSelectFilter(res.data) })
        }//End if condition
      })
      // console.log(res.data);
      //Set Bulk Action status list
      let bats = [];
      Object.keys(this.state.statusList).forEach(item => { (status !== this.state.statusList[item].name) && bats.push({ 'label': this.state.statusList[item].name, 'value': item, 'bulkActionMsg': 'Are you sure to change status as ' + this.state.statusList[item].name + '?', 'bulkActionBottomBtnLabel': 'Change Status' }) })
      this.setState({ bulkActionTabStatus: bats });
    });
  }//End function

  updateStatus = (row, status) => {
    let data = { id: row.id, oldStatus: row.status, newStatus: status, start_time: row.start_time, end_time: row.end_time };
    if (data.oldStatus === 'unattended' && this.state.timeIsNotSetToUpdate) {
      this.setState({ unattendedSetTimeModal: true, holdDataRow: row, holdDataStatus: status });
      return false;
    }//End if condition

    let statusLoaderObj = {};
    statusLoaderObj[row.id] = true;
    this.setState({ updateStatusLoader: statusLoaderObj });
    HTTP('post', '/servicePlaining/post/changeTimerStatus', data).then(res => {
      statusLoaderObj[row.id] = false;
      this.setState({ updateStatusLoader: statusLoaderObj, visibleEditTimerModal: false, unattendedSetTimeModal: false });
      if (!res) { return false; }
      // this.updateListOnChangeStatus(row, status, row.status);
      // let newData = ;
      this.setState({ data: LogDeleteRow(row, this.state.data) });
    });
  }//End function

  bulkUpdateStatus = (rows, value) => {
    let ids = rows.selectedRowIds.join(',');
    let status = value;
    let postObj = { ids, status };
    this.setState({ updateStatusBulkLoader: true });
    HTTP('post', '/servicePlaining/post/changeTimerStatusBulk', postObj).then(res => {
      this.setState({ updateStatusBulkLoader: false });
      if (!res) { return false; }

      let newData = this.state.data;
      rows.selectedRows.forEach(item => { newData = LogDeleteRow(item, newData); });
      this.setState({ data: newData, resetSelectedRow: true }, () => { this.setState({ resetSelectedRow: false }); });
    });
  }//End function

  pushActionColOnPermission = () => {
    let st = this.state;
    if (st.currentTabIndex === 0 && AccessControl('91,92')) { return true; }
    if (st.currentTabIndex === 1 && AccessControl('94,95')) { return true; }
    if (st.currentTabIndex === 2 && AccessControl('97,98')) { return true; }
    if (st.currentTabIndex === 3 && AccessControl('100,101')) { return true; }
    return false;
  }//End if condition

  render() {
    const st = this.state;
    const actionCol = (record, row, className = false) => {

      var statusCondition = (
        (row.status === 'unreviewed' && AccessControl(92)) ||
        (row.status === 'reviewed' && AccessControl(95)) ||
        (row.status === 'unattended' && AccessControl(98)) ||
        (row.status === 'deleted' && AccessControl(101))
      ) ? true : false;

      var viewCondition = (
        (row.status === 'unreviewed' && AccessControl(91)) ||
        (row.status === 'reviewed' && AccessControl(94)) ||
        (row.status === 'unattended' && AccessControl(97)) ||
        (row.status === 'deleted' && AccessControl(100))
      ) ? true : false;

      return (
        <ScreenLoader active={this.state.updateStatusLoader[row.id]} inline={true} tip="Please wait...">
          <div className={`text-center ${className}`}>
            {viewCondition &&
              <Tooltip placement="top" title="Edit Timer">
                <button className="btnToLink" onClick={() => this.setState({ visibleEditTimerModal: true, editDataId: (row.id + '=>' + row.key) })}><i className="fs-18 las la-edit link-color"></i></button>
              </Tooltip>
            }

            {statusCondition &&
              <>
                {row.status !== 'unreviewed' &&
                  <>
                    <i className="list_view_icon_sap las la-redo"></i>
                    <Tooltip placement="top" title="Unreviewed">
                      <Popconfirm
                        placement="topRight"
                        title={<span>Are you sure to change status as <b>Unreviewed</b>?</span>}
                        onConfirm={() => this.updateStatus(row, 'unreviewed')}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className="btnToLink"><i className="fs-18 las la-exclamation-circle status-inactive-color"></i></button>
                      </Popconfirm>
                    </Tooltip>
                  </>
                }
                {row.status !== 'reviewed' &&
                  <>
                    <i className="list_view_icon_sap las la-redo"></i>
                    <Tooltip placement="top" title="Reviewed">
                      <Popconfirm
                        placement="topRight"
                        title={<span>Are you sure to change status as <b>Reviewed</b>?</span>}
                        onConfirm={() => this.updateStatus(row, 'reviewed')}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className="btnToLink"><i className="fs-18 las la-check-circle status-active-color"></i></button>
                      </Popconfirm>
                    </Tooltip>
                  </>
                }
                {(row.status !== 'unreviewed' && row.status !== 'reviewed' && row.status !== 'deleted' && row.status !== 'unattended') &&
                  <>
                    <i className="list_view_icon_sap las la-redo"></i>
                    <Tooltip placement="top" title="Unattended">
                      <Popconfirm
                        placement="topRight"
                        title={<span>Are you sure to change status as <b>Unattended</b>?</span>}
                        onConfirm={() => this.updateStatus(row, 'unattended')}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className="btnToLink"><i className="fs-18 las la-exclamation-triangle status-hold-color"></i></button>
                      </Popconfirm>
                    </Tooltip>
                  </>
                }
                {(row.status !== 'deleted' && row.status !== 'unattended') &&
                  <>
                    <i className="list_view_icon_sap las la-redo"></i>
                    <Tooltip placement="top" title="Delete">
                      <Popconfirm
                        placement="topRight"
                        title={<span>Are you sure to change status as <b>Delete</b>?</span>}
                        onConfirm={() => this.updateStatus(row, 'deleted')}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className="btnToLink"><i className="fs-18 las la-times-circle status-close-color"></i></button>
                      </Popconfirm>
                    </Tooltip>
                  </>
                }
              </>
            }
          </div>
        </ScreenLoader>)
    };

    const ColumnUnReviewedAndReviewed = [{
      title: 'Sr',
      dataIndex: 'key',
      width: '5%',
      fixed: 'left',
      sorter: (a, b) => a.key - b.key,
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'Date',
      dataIndex: 'inserted_date',
      width: '7%',
      fixed: 'left',
      sorter: SortableDateInTableData('inserted_date'),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'inserted_date', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'Shift No.',
      dataIndex: 'shift_no',
      width: '7%',
      fixed: 'left',
      sorter: (a, b) => a.shift_no.localeCompare(b.shift_no),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'shift_no', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'Request #',
      dataIndex: 'request_no',
      width: '7%',
      sorter: (a, b) => a.request_no.localeCompare(b.request_no),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'request_no', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'Support Worker & Partner',
      dataIndex: 'swp_name',
      width: '17%',
      sorter: (a, b) => a.swp_name.localeCompare(b.swp_name),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'swp_name', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'Client Name',
      dataIndex: 'client_name',
      width: '11%',
      sorter: (a, b) => a.client_name.localeCompare(b.client_name),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'client_name', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'Ac S-Time',
      dataIndex: 'start_time_actual',
      width: '8%',
      sorter: (a, b) => a.start_time_actual.localeCompare(b.start_time_actual),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'start_time_actual', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'Ac E-Time',
      dataIndex: 'end_time_actual',
      width: '8%',
      sorter: (a, b) => a.end_time_actual.localeCompare(b.end_time_actual),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'end_time_actual', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'Ac T-Time',
      dataIndex: 'hour_actual',
      width: '8%',
      sorter: (a, b) => a.hour_actual.localeCompare(b.hour_actual),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'hour_actual', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'S-Time',
      dataIndex: 'start_time',
      width: '9%',
      sorter: (a, b) => a.start_time.localeCompare(b.start_time),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'start_time', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'E-Time',
      dataIndex: 'end_time',
      width: '9%',
      sorter: (a, b) => a.end_time.localeCompare(b.end_time),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'end_time', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }, {
      title: 'T-Time',
      dataIndex: 'hour',
      width: '7%',
      sorter: (a, b) => a.hour.localeCompare(b.hour),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'hour', st.filterIndividualColArr),
      render: (a, b) => <div title={`${b.delayStatus ? a + ' - Delayed Shift' : a}`} className={`single-line-text ${b.delayStatus ? 'delay-row-col' : ''}`} >{a}</div>
    }];

    const ColumnUnattended = [{
      title: 'Sr',
      dataIndex: 'key',
      width: '5%',
      fixed: 'left',
      sorter: (a, b) => a.key - b.key,
      render: (a, b) => <div title={a} className='single-line-text'>{a}</div>
    }, {
      title: 'Date',
      dataIndex: 'inserted_date_formatted',
      width: '8%',
      fixed: 'left',
      sorter: SortableDateInTableData('inserted_date'),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'inserted_date_formatted', st.filterIndividualColArr),
      render: (a, b) => <div title={a} className='single-line-text'>{a}</div>
    }, {
      title: 'Shift No.',
      dataIndex: 'shift_no',
      width: '8%',
      fixed: 'left',
      sorter: (a, b) => a.shift_no.localeCompare(b.shift_no),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'shift_no', st.filterIndividualColArr),
      render: (a, b) => <div title={a} className='single-line-text'>{a}</div>
    }, {
      title: 'Request #',
      dataIndex: 'request_no',
      width: '8%',
      sorter: (a, b) => a.request_no.localeCompare(b.request_no),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'request_no', st.filterIndividualColArr),
      render: (a, b) => <div title={a} className='single-line-text'>{a}</div>
    }, {
      title: 'Support Worker & Partner',
      dataIndex: 'swp_name',
      width: '20%',
      sorter: (a, b) => a.swp_name.localeCompare(b.swp_name),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'swp_name', st.filterIndividualColArr),
      render: (a, b) => <div title={a} className='single-line-text'>{a}</div>
    }, {
      title: 'Client Name',
      dataIndex: 'client_name',
      width: '13%',
      sorter: (a, b) => a.client_name.localeCompare(b.client_name),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'client_name', st.filterIndividualColArr),
      render: (a, b) => <div title={a} className='single-line-text'>{a}</div>
    }, {
      title: 'Ac S-Time',
      dataIndex: 'start_time_actual',
      width: '9%',
      sorter: (a, b) => a.start_time_actual.localeCompare(b.start_time_actual),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'start_time_actual', st.filterIndividualColArr),
      render: (a, b) => <div title={a} className='single-line-text'>{a}</div>
    }, {
      title: 'Ac E-Time',
      dataIndex: 'end_time_actual',
      width: '9%',
      sorter: (a, b) => a.end_time_actual.localeCompare(b.end_time_actual),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'end_time_actual', st.filterIndividualColArr),
      render: (a, b) => <div title={a} className='single-line-text'>{a}</div>
    }, {
      title: 'Ac T-Time',
      dataIndex: 'hour_actual',
      width: '9%',
      sorter: (a, b) => a.hour_actual.localeCompare(b.hour_actual),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'hour_actual', st.filterIndividualColArr),
      render: (a, b) => <div title={a} className='single-line-text'>{a}</div>
    }];

    //Just Create Action Column
    const ColumnAction = [{
      title: 'Action',
      align: 'center',
      width: '11%',
      fixed: 'right',
      render: (record, row) => actionCol(record, row)
    }];
    //Add Action Column into both column Array
    const ColumnUnReviewedAndReviewedMain = this.pushActionColOnPermission() ? [...ColumnUnReviewedAndReviewed, ...ColumnAction] : ColumnUnReviewedAndReviewed;
    const ColumnUnattendedMain = this.pushActionColOnPermission() ? [...ColumnUnattended, ...ColumnAction] : ColumnUnattended;

    //@ Mobile View Column
    const mobileCol = [{
      title: 'Shift No',
      dataIndex: 'shift_no',
      width: '100%',
      className: 'mobile-col',
      render: (record, row) =>
        <div className={`col-data ${row.delayStatus ? 'delay-row-col-mob' : ''}`} style={{ width: window.screenWidthMobile }}>
          <div className="details">
            <div className="icon">
              <Tooltip placement="topRight" title={st.statusList[row.status].name + (row.delayStatus ? ' - Delayed Shift' : '')} trigger='click'>
                <i className={
                  st.statusList[row.status]['mobileIcon'] ?
                    st.statusList[row.status]['mobileIcon'] :
                    st.statusList[row.status]['icon']
                } style={{ background: st.statusList[row.status]['color'] }} />
              </Tooltip>
            </div>
            <div className="data">
              <div className="main-value">{record} <span className="fs-12 fw-400"> SW: {row.swp_name}</span></div>
              <div className="sub-value">
                <span className="label">Shift Date:</span>
                <span className="value">{row.inserted_date_formatted ? row.inserted_date_formatted : row.inserted_date}</span>
              </div>
              <div className="foot-value">
                <span className="label">{row.status === 'unattended' ? 'Shift Time' : 'Done At'}:</span>
                <span className="value">
                  {row.status === 'unattended' ?
                    row.start_time_actual + ' to ' + row.end_time_actual + ', ' + row.hour_actual
                    :
                    row.start_time + ' to ' + row.end_time + ', ' + row.hour
                  }
                </span>
              </div>
            </div>
          </div>
          {this.pushActionColOnPermission() &&
            <div className="action">
              <Popover content={actionCol(record, row, 'mobile-icon-menu-action')} trigger="click" placement="right">
                <Button size="small"><i className="las la-bars"></i></Button>
              </Popover>
            </div>
          }
        </div>
    }];

    return (
      <React.Fragment>
        <PageTitle
          titleIcon="las la-clock"
          titleSpan="Service Timer"
          titleHeading="Log"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-th-list', label: 'Service Timer Log' }
          ]}
        />
        <div className={`timer-log-container ${window.webviewMobile ? '' : 'container'}`}>
          <ScreenLoader active={st.getMainLoader || st.getSpecificLoader}>
            {st.getMainLoader && <div className="h-250"></div>}
            <Tabs type="card" defaultActiveKey={st.currentTabIndex.toString()} onChange={(e) => this.getData(e)}>
              {Object.keys(st.statusList).map((item, index) => {
                
                if (st.statusList[item].name === 'Unreviewed' && !AccessControl(90)) { return false; }
                if (st.statusList[item].name === 'Reviewed' && !AccessControl(93)) { return false; }
                if (st.statusList[item].name === 'Unattended' && !AccessControl(96)) { return false; }
                if (st.statusList[item].name === 'Deleted' && !AccessControl(99)) { return false; }

                return (
                  <TabPane tab={<span><i className={st.statusList[item].icon} style={{ color: st.statusList[item].color }} /> {st.statusList[item].name}</span>} key={index}>
                    {!st.resetSelectedRow &&
                      <DataTable
                        classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
                        columns={window.webviewMobile ? mobileCol : (item !== 'unattended' ? ColumnUnReviewedAndReviewedMain : ColumnUnattendedMain)}
                        styleType={2}
                        dataSource={st.data}
                        showSizeChanger={true}
                        pagination={{ itemDetails: true, showOnSinglePage: true }}
                        customFilter="true"
                        customFilterLabel="Filter by"
                        customFilterCol={[
                          // { label: 'Service Name', value: 'service_name' },
                          { label: 'Shift No', value: 'shift_no' },
                          { label: 'Request No', value: 'request_no' },
                          { label: 'Support Worker & Partner', value: 'swp_name' },
                          { label: 'Client Name', value: 'client_name' },
                          { label: 'Ac S-Time', value: 'start_time_actual' },
                          { label: 'Ac E-Time', value: 'end_time_actual' },
                          { label: 'Av T-Time', value: 'hour_actual' },
                          { label: 'S-Time', value: 'start_time' },
                          { label: 'E-Time', value: 'end_time' },
                          { label: 'T-Time', value: 'hour' },
                          // { label: 'L-Time', value: 'late' }
                        ]}
                        label={window.webviewMobile ? undefined : `${st.statusList[item].name}: Shifts`}
                        desc={window.webviewMobile ? undefined : `All ${st.statusList[item].name && st.statusList[item].name.replace('_', ' ')} shift(s) are listed below.`}
                        bulkAction={window.webviewMobile ? undefined : st.bulkActionTabStatus}
                        bulkActionHandler={(rows, value) => this.bulkUpdateStatus(rows, value)}
                        rowSelection={window.webviewMobile ? false : true}
                        scroll={!window.webviewMobile && {
                          x: (item === 'unattended' ? 1195 : 1600),
                        }}
                      />}
                  </TabPane>
                )
              })}
            </Tabs>
          </ScreenLoader>
          <Modal
            width={740}
            maskClosable={false}
            className="hide-footer"
            centered={true}
            // title={'Edit Time'}
            visible={st.visibleEditTimerModal}
            onOk={() => this.setState({ visibleEditTimerModal: false })}
            onCancel={() => this.setState({ visibleEditTimerModal: false })}
          >
            <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ visibleEditTimerModal: false })}><i className="las la-times" /></button>
            <div className="modal-modern-title-for-view-details">
              <div>
                <span className="title">Edit Time</span>
                <span className="sub-title">View and edit time value</span>
              </div>
            </div>
            <TimerEdit idKey={st.editDataId} updateTimerTime={(e) => this.setState({ data: LogResetRow(e, st.data) })} />
          </Modal>
          <UnattendedSetTime
            show={st.unattendedSetTimeModal}
            timingList={st.timingList}
            onClose={() => this.setState({ unattendedSetTimeModal: false })}
            onFinish={(e) => {
              this.setState({ timeIsNotSetToUpdate: false }, () => {
                this.updateStatus({ ...st.holdDataRow, ...e }, st.holdDataStatus);
                this.setState({ holdDataRow: '', holdDataStatus: '' })
              });
            }}
            data={st.holdDataRow}
          />
        </div>
      </React.Fragment >
    )//End return
  }//End render
  componentDidMount() {
    //Set Tabs by give permission
    // var tabStatus = [];
    // AccessControl(71) && tabStatus.push({ 'name': 'unreviewed', 'status': 'Unreviewed', 'icon': 'las la-exclamation-circle status-inactive-color' });
    // AccessControl(106) && tabStatus.push({ 'name': 'delay', 'status': 'Delay', 'icon': 'las la-clock status-hold-color' });
    // AccessControl(75) && tabStatus.push({ 'name': 'reviewed', 'status': 'Reviewed', 'icon': 'las la-check-circle status-active-color' });
    // AccessControl(106) && tabStatus.push({ 'name': 'unattended', 'status': 'Unattended', 'icon': 'las la-exclamation-triangle status-hold-color' });
    // AccessControl(93) && tabStatus.push({ 'name': 'deleted', 'status': 'Deleted', 'icon': 'las la-times-circle status-close-color' });
    // this.setState({ tabStatus }, () => {
    this.getData(0);
    //  });
  }//End componentDidMount
}//End class
export default ServiceTimerLog;