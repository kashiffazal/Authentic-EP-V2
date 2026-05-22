import React, { Component } from 'react';
import PageTitle from '../../../mutual/pageTitle';
import { Button, Modal, Tabs, Popconfirm, Popover, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PlainingFormModal from '../../../15_service_plaining/schedule/partial/tableGrid/partial/modals/plainingFormModal';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
// import { columnsUnAssigned, columnsAssigned, columnsDeleted } from './partial/columns';
import AppointmentFormModal from '../appointmentFormModal';
import { HTTP, LogResetRow, LogResetList, InsertRowInList, DeleteRowFromList, SortableDateInTableData, TableColumnFilter, TableColumnListForSelectFilter, SetDatePicker, AccessControl } from '../../../../services';
import ViewDetails from '../viewDetails';

const { TabPane } = Tabs;

class AppointmentLogAdmin extends Component {
  state = {
    mainLoader: false,
    logLoader: false,
    visibleFormModal: false,
    visibleViewModal: false,
    showPlainingFormModal: false,
    setDataForSP: {},
    listData: {},
    editData: {},
    dataId: null,
    changeStatusLoader: {},
    statusList: [],
    currentTabIndex: 1,
    assignConfirmShiftMsg: {},
    ads: {},//! App Default Settings,
    filterIndividualColArr: {},
  };

  getData = (statusIndex, logLoader = false) => {
    //@ Get status name for getting data 
    let statusListNameArr = Object.keys(this.state.statusList);
    let status = statusListNameArr[statusIndex - 1] ? statusListNameArr[statusIndex - 1] : 'unassigned';
    this.setState({ currentTabIndex: parseInt(statusIndex) });
    //@ Set listData variable for table
    //@ If data is available in object then do not get from server
    let listData = this.state.listData;
    if (listData[status]) { this.setState({ filterIndividualColArr: TableColumnListForSelectFilter(listData[status]) }); return false; }//End if condition

    logLoader ? this.setState({ logLoader: true }) : this.setState({ mainLoader: true });
    HTTP('get', '/clientAppointment/get/index/' + status).then(res => {
      this.setState({ mainLoader: false, logLoader: false });
      if (!res) return false;
      listData[status] = res.data;
      this.setState({ listData, statusList: res.status_list, ads: res.appDefaultSetting, assignConfirmShiftMsg: res.assignConfirmShiftMsg }, () => {
        this.setState({ filterIndividualColArr: TableColumnListForSelectFilter(res.data) })
      });
    });
  }//End function

  reloadCurrentTab = (tabIndex) => {
    //@ Get status name for getting data 
    let statusListNameArr = Object.keys(this.state.statusList);
    let status = statusListNameArr[tabIndex - 1];
    //@ Empty array of specific tab and call Get function
    let listData = this.state.listData;
    listData[status] = false;
    this.setState({ listData }, () => { this.getData(tabIndex, true); })
  }//End function

  insertUpdateAssignLog = (e, oldStatus) => {
    // console.log(e)
    let st = this.state;
    let listData = this.state.listData;
    //@Transfer data from one log to another
    listData[oldStatus] = DeleteRowFromList(listData[oldStatus], st.setDataForSP.id);
    //@If data is available then insert into array
    //@Otherwise All updated data will be get by clicking on Tab
    if (listData['assigned']) {
      e.status = 'assigned';
      listData['assigned'] = InsertRowInList({ ...st.setDataForSP, ...e }, listData['assigned']);
    }//End if condition
    this.setState({ listData, dataId: null });//@dataId reset for ViewDetails Component
  }//End function

  insertUpdateUnAssignLog = (e, keyword) => {
    // console.log(e);
    let listData = this.state.listData;
    if (keyword === 'add') {
      listData[e.status] = LogResetList(e, listData[e.status]);
    } else {
      listData[e.status] = LogResetRow(e, listData[e.status]);
    }//End if condition
    this.setState({ listData, dataId: null });//@dataId reset for ViewDetails Component
  }//End function

  changeStatus = (data, newStatus) => {
    let changeStatusLoader = this.state.changeStatusLoader;
    changeStatusLoader[data.id] = true;
    this.setState({ changeStatusLoader });
    let post = { id: data.id, service_plaining_ref_id: data.service_plaining_ref_id, oldStatus: data.oldStatus, currentStatus: data.status, newStatus: newStatus };
    HTTP('post', '/clientAppointment/post/changeStatus/', post).then(res => {
      changeStatusLoader[data.id] = false;
      this.setState({ changeStatusLoader });
      if (!res) return false;
      //@ Transfer data from old to new status log
      let st = this.state;
      let listData = st.listData;
      //@Transfer data from one log to another
      listData[data.status] = DeleteRowFromList(listData[data.status], data.id);
      // console.log(data.status,newStatus);
      //@If data is available then insert into array
      //@Otherwise All updated data will be get by clicking on Tab
      if (listData[newStatus]) {
        data.status = newStatus;
        listData[newStatus] = InsertRowInList({ ...data, status: newStatus }, listData[newStatus]);
      }//End if condition
      this.setState({ listData });
    });
  }//End function

  showConfirmOnAssign = (row) => {
    const th = this;
    Modal.confirm({
      title: <div dangerouslySetInnerHTML={{ __html: th.state.assignConfirmShiftMsg.title }} />,
      icon: <ExclamationCircleOutlined />,
      content: <div dangerouslySetInnerHTML={{ __html: th.state.assignConfirmShiftMsg.msg }} />,
      onOk() {
        th.setState({ showPlainingFormModal: true, setDataForSP: row })
      }
    });
  }//End function


  pushActionColOnPermission = () => {
    let st = this.state;
    if (st.currentTabIndex === 1 && AccessControl('36,37,38,39')) { return true; }
    if (st.currentTabIndex === 2 && AccessControl('41,42,43')) { return true; }
    if (st.currentTabIndex === 3 && AccessControl('45,46,47')) { return true; }
    if (st.currentTabIndex === 4 && AccessControl('49,50,51')) { return true; }
    return false;
  }//End if condition

  render() {
    const st = this.state;
    //@ Action for All Tabs Columns
    const columnAllTabActionCol = (record, row, className = false) => (
      <ScreenLoader active={st.changeStatusLoader[row.id]} inline={true} tip="Loading...">
        <div className={`text-center ${className}`}>

          {/* //@ View Details */}
          {(
            (row.status === 'unassigned' && AccessControl(36)) ||
            (row.status === 'assigned' && AccessControl(41)) ||
            (row.status === 'on_hold' && AccessControl(45)) ||
            (row.status === 'deleted' && AccessControl(49))
          ) &&
            <button title="View Details" className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, dataId: row.id })}><i className="fs-18 las la-table link-color" /></button>
          }

          {/* //@ Edit Form */}
          {(
            (row.status === 'unassigned' && AccessControl(37)) ||
            (row.status === 'assigned' && AccessControl(42)) ||
            (row.status === 'on_hold' && AccessControl(46)) ||
            (row.status === 'deleted' && AccessControl(50))
          ) &&
            <>
              <i className="list_view_icon_sap las la-redo"></i>
              <button title="Edit Form" className="btnToLink" onClick={() => this.setState({ editData: row, visibleFormModal: true })}><i className="fs-18 las la-edit link-color" /></button>
            </>
          }

          {/* //@ Assign Shift */}
          {(row.status === 'unassigned' && AccessControl(38)) &&
            <>
              <i className="list_view_icon_sap las la-redo"></i>
              <Popconfirm
                placement="topRight"
                title={<span>Are you sure to assign this appointment to <b>SW</b>?</span>}
                onConfirm={() => this.showConfirmOnAssign(row)}
                okText="Yes"
                cancelText="No"
              ><button title="Assign" className="btnToLink"><i className="fs-18 las la-check-circle link-color" /></button></Popconfirm>
            </>
          }

          {/* //@ Change Status */}
          {(
            (row.status === 'unassigned' && AccessControl(39)) ||
            (row.status === 'assigned' && AccessControl(43)) ||
            (row.status === 'on_hold' && AccessControl(47)) ||
            (row.status === 'deleted' && AccessControl(51))
          ) &&
            <>
              {/* <i className="list_view_icon_sap las la-redo"></i> */}
              {(row.status !== 'unassigned' && row.status !== 'assigned' && !row.service_plaining_ref_id) &&
                <>
                  <i className="list_view_icon_sap las la-redo"></i>
                  <Popconfirm
                    placement="topRight"
                    title={<span>Are you sure to change status as <b>Unassigned</b>?</span>}
                    onConfirm={() => this.changeStatus(row, 'unassigned')}
                    okText="Yes"
                    cancelText="No"
                  ><button title="Unassigned" className="btnToLink"><i className="fs-18 las la-exclamation-circle link-color" /></button></Popconfirm>
                </>
              }
              {(row.status !== 'unassigned' && row.status !== 'assigned' && row.service_plaining_ref_id) &&
                <>
                  <i className="list_view_icon_sap las la-redo"></i>
                  <Popconfirm
                    placement="topRight"
                    title={<span>Are you sure to change status as <b>Assigned</b>?</span>}
                    onConfirm={() => this.setState({ showPlainingFormModal: true, setDataForSP: row })}
                    okText="Yes"
                    cancelText="No"
                  ><button title="Assigned" className="btnToLink"><i className="fs-18 las la-check-circle link-color" /></button></Popconfirm>
                </>
              }
              {(row.status !== 'on_hold') &&
                <>
                  <i className="list_view_icon_sap las la-redo"></i>
                  <Popconfirm
                    placement="topRight"
                    title={<span>Are you sure to change status as <b>On Hold</b>?</span>}
                    onConfirm={() => this.changeStatus(row, 'on_hold')}
                    okText="Yes"
                    cancelText="No"
                  ><button title="On Hold" className="btnToLink"><i className="fs-18 las la-pause-circle link-color" /></button></Popconfirm>
                </>
              }

              {(row.status !== 'deleted') &&
                <>
                  <i className="list_view_icon_sap las la-redo"></i>
                  <Popconfirm
                    placement="topRight"
                    title={<span>Are you sure to change status as <b>Delete</b>?</span>}
                    onConfirm={() => this.changeStatus(row, 'deleted')}
                    okText="Yes"
                    cancelText="No"
                  ><button title="Delete" className="btnToLink"><i className="fs-18 las la-times-circle link-color" /></button></Popconfirm>
                </>
              }
            </>
          }
        </div>
      </ScreenLoader>
    );
    //# all Web View Column
    const columnsUnAssigned = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key.toString().localeCompare(b.key.toString())
      }, {
        title: 'Appoint #',
        dataIndex: 'appointment_no',
        width: '9%',
        sorter: (a, b) => a.appointment_no.localeCompare(b.appointment_no),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'appointment_no', st.filterIndividualColArr)
      }, {
        title: 'Date',
        dataIndex: 'date',
        width: '9%',
        sorter: SortableDateInTableData('date'),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'date', st.filterIndividualColArr)
      }, {
        title: 'Client Name',
        dataIndex: 'name',
        width: '20%',
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'name', st.filterIndividualColArr)
      }, {
        title: 'Appointment Title',
        dataIndex: 'title',
        width: '30%',
        sorter: (a, b) => a.title.localeCompare(b.title),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'title', st.filterIndividualColArr)
      }, {
        title: 'Start to End Time',
        dataIndex: 'time',
        width: '14%',
        sorter: (a, b) => a.time.localeCompare(b.time),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'time', st.filterIndividualColArr)
      }
    ];
    const columnsAssigned = [{
      title: 'Sr',
      dataIndex: 'key',
      width: '5%',
      sorter: (a, b) => a.key.toString().localeCompare(b.key.toString())
    }, {
      title: 'Appoint #',
      dataIndex: 'appointment_no',
      width: '9%',
      sorter: (a, b) => a.appointment_no.localeCompare(b.appointment_no),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'appointment_no', st.filterIndividualColArr)
    }, {
      title: 'Shift #',
      dataIndex: 'shift_no',
      width: '9%',
      sorter: (a, b) => a.shift_no.localeCompare(b.shift_no),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'shift_no', st.filterIndividualColArr)
    }, {
      title: 'Date',
      dataIndex: 'date',
      width: '9%',
      sorter: SortableDateInTableData('date'),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'date', st.filterIndividualColArr)
    }, {
      title: 'Client Name',
      dataIndex: 'name',
      width: '16%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'name', st.filterIndividualColArr)
    }, {
      title: 'Appointment Title',
      dataIndex: 'title',
      width: '25%',
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'title', st.filterIndividualColArr)
    }, {
      title: 'Start to End Time',
      dataIndex: 'time',
      width: '14%',
      sorter: (a, b) => a.time.localeCompare(b.time),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'time', st.filterIndividualColArr)
    }];
    const columnsOnHold = [{
      title: 'Sr',
      dataIndex: 'key',
      width: '5%',
      sorter: (a, b) => a.key.toString().localeCompare(b.key.toString())
    }, {
      title: 'Appoint #',
      dataIndex: 'appointment_no',
      width: '9%',
      sorter: (a, b) => a.appointment_no.localeCompare(b.appointment_no),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'appointment_no', st.filterIndividualColArr)
    }, {
      title: 'Shift #',
      dataIndex: 'shift_no',
      width: '9%',
      sorter: (a, b) => a.shift_no.localeCompare(b.shift_no),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'shift_no', st.filterIndividualColArr)
    }, {
      title: 'Date',
      dataIndex: 'date',
      width: '9%',
      sorter: SortableDateInTableData('date'),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'date', st.filterIndividualColArr)
    }, {
      title: 'Client Name',
      dataIndex: 'name',
      width: '16%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'name', st.filterIndividualColArr)
    }, {
      title: 'Appointment Title',
      dataIndex: 'title',
      width: '25%',
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'title', st.filterIndividualColArr)
    }, {
      title: 'Start to End Time',
      dataIndex: 'time',
      width: '14%',
      sorter: (a, b) => a.time.localeCompare(b.time),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'time', st.filterIndividualColArr)
    }];
    const columnsDeleted = [{
      title: 'Sr',
      dataIndex: 'key',
      width: '5%',
      sorter: (a, b) => a.key.toString().localeCompare(b.key.toString())
    }, {
      title: 'Appoint #',
      dataIndex: 'appointment_no',
      width: '9%',
      sorter: (a, b) => a.appointment_no.localeCompare(b.appointment_no),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'appointment_no', st.filterIndividualColArr)
    }, {
      title: 'Shift #',
      dataIndex: 'shift_no',
      width: '9%',
      sorter: (a, b) => a.shift_no.localeCompare(b.shift_no),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'shift_no', st.filterIndividualColArr)
    }, {
      title: 'Date',
      dataIndex: 'date',
      width: '9%',
      sorter: SortableDateInTableData('date'),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'date', st.filterIndividualColArr)
    }, {
      title: 'Client Name',
      dataIndex: 'name',
      width: '16%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'name', st.filterIndividualColArr)
    }, {
      title: 'Appointment Title',
      dataIndex: 'title',
      width: '25%',
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'title', st.filterIndividualColArr)
    }, {
      title: 'Start to End Time',
      dataIndex: 'time',
      width: '14%',
      sorter: (a, b) => a.time.localeCompare(b.time),
      ...TableColumnFilter(st.ads.tableIndividualColFilter, 'time', st.filterIndividualColArr)
    }];
    let columns = (st.currentTabIndex === 1 ? [...columnsUnAssigned] : (st.currentTabIndex === 2 ? [...columnsAssigned] : (st.currentTabIndex === 3 ? [...columnsOnHold] : (st.currentTabIndex === 4 ? [...columnsDeleted] : []))));


    this.pushActionColOnPermission() &&
      columns.push({
        title: 'Action',
        align: 'center',
        width: '13%',
        render: (record, row) => columnAllTabActionCol(record, row)
      });

    //# Mobile View Column
    const mobileCol = [{
      title: 'Client Name',
      dataIndex: 'name',
      width: '100%',
      className: 'mobile-col',
      render: (record, row) => {
        var time = row.time && row.time !== '-' && row.time;
        return (
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="icon">
                <Tooltip placement="topRight" title={st.statusList[row.status].name} trigger='click'>
                  <i className={
                    st.statusList[row.status]['mobileIcon'] ?
                      st.statusList[row.status]['mobileIcon'] :
                      st.statusList[row.status]['icon']
                  } style={{ background: st.statusList[row.status]['color'] }} />
                </Tooltip>
              </div>
              <div className="data">
                <div className="main-value">{record}</div>
                <div className="sub-value">
                  <span className="label">Ref Number</span>
                  <span className="value">{row.appointment_no} {(row.shift_no && row.shift_no !== '-') ? ' | ' + row.shift_no : ''}</span>
                </div>
                <div className="foot-value">
                  <span className="label">{time ? 'Time' : 'Date'}</span>
                  <span className="value">{time ? row.time : row.date}</span>
                </div>
              </div>
            </div>
            {this.pushActionColOnPermission() &&
              <div className="action">
                <Popover content={columnAllTabActionCol(record, row, 'mobile-icon-menu-action')} trigger="click" placement="right">
                  <Button size="small"><i className="las la-bars"></i></Button>
                </Popover>
              </div>
            }
          </div>
        )
      }
    }];

    return (
      <div>
        <PageTitle
          titleIcon="las la-calendar-day"
          titleSpan="Client"
          titleHeading="Appointment"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-id-card-alt', label: 'Clients' },
            { iconLas: 'las la-calendar-day', label: 'Client Appointment' }
          ]}
          // render={<Button size="large" type="primary" onClick={() => this.setState({ visibleFormModal: true })}>Add Appointment</Button>}
          render={
            <div className="render-page-right">
              <Button size="small" type="link" className="m-b-0 m-l-10" onClick={() => window.open(process.env.PUBLIC_URL + '/#/externalWebPages/appointmentForm', "_blank")}>External Form</Button>
              <span className="separator">&nbsp;|&nbsp;&nbsp;&nbsp;</span>
              <Button size="large" type="primary" onClick={() => this.setState({ visibleFormModal: true })}>Add Appointment</Button>
            </div>
          }
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          <ScreenLoader active={st.mainLoader}>
            {st.mainLoader && <div className="h-250" />}
            <Tabs type="card" defaultActiveKey={st.currentTabIndex.toString()} onChange={(e) => this.getData(e, true)}
              tabBarExtraContent={
                <Button type="link" onClick={() => this.reloadCurrentTab(st.currentTabIndex)}>
                  <i className="las la-sync fs-16 pos-relative top-1" /> {!window.webviewMobile && <span>&nbsp;Refresh / Reload Data</span>}
                </Button>
              }
            >
              {Object.keys(st.statusList).map((item, index) => {

                if (st.statusList[item].name === 'Unassigned' && !AccessControl(35)) { return false; }
                if (st.statusList[item].name === 'Assigned' && !AccessControl(40)) { return false; }
                if (st.statusList[item].name === 'On Hold' && !AccessControl(44)) { return false; }
                if (st.statusList[item].name === 'Deleted' && !AccessControl(48)) { return false; }

                return (
                  <TabPane tab={<span><i className={st.statusList[item].icon} style={{ color: st.statusList[item].color }} /> {st.statusList[item].name}
                    {/* ({(st.listData[item].data.length)}) */}
                  </span>} key={(index + 1)}>
                    <ScreenLoader active={st.logLoader}>
                      <DataTable
                        classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
                        columns={window.webviewMobile ? mobileCol : columns}
                        styleType={2}
                        dataSource={st.listData[item]}
                        showSizeChanger={true}
                        pagination={{ itemDetails: true, showOnSinglePage: true }}
                        customFilter="true"
                        customFilterLabel="Filter by"
                        customFilterCol={[
                          { label: 'Date', value: 'date' },
                          { label: 'Client Name', value: 'name' },
                          { label: 'Appointment Title', value: 'title' },
                          { label: 'Start Time', value: 'start_time' },
                          { label: 'End Time', value: 'end_time' },
                          { label: 'Inserted Date', value: 'inserted_by_date' }
                        ]}
                      />
                    </ScreenLoader>
                  </TabPane>
                )
              })}
            </Tabs>
          </ScreenLoader>
        </div>
        <AppointmentFormModal
          show={st.visibleFormModal}
          onClose={() => this.setState({ visibleFormModal: false }, () => {
            setTimeout(() => {
              this.setState({ editData: {} })
            }, 300);//@ To Avoid glitch on 'Support Worker Availability' Component in Form
          })}
          addData={(values) => this.insertUpdateUnAssignLog(values, 'add')}
          updateData={(values) => this.insertUpdateUnAssignLog(values, 'update')}
          data={st.editData}
        // fp={this.props.form}
        />
        <ViewDetails dataId={st.dataId} show={st.visibleViewModal} onClose={() => this.setState({ visibleViewModal: false })} />
        <PlainingFormModal
          show={st.showPlainingFormModal}
          id={st.setDataForSP.service_plaining_ref_id}
          dataForAppointment={{
            client_ref_id: st.setDataForSP.client_ref_id,
            service_ref_id: '5',//? Participate Community
            frequency: '12',//? For Appointment
            service_date: SetDatePicker(st.setDataForSP.date),
            service_start_time: st.setDataForSP.start_time,
            service_end_time: st.setDataForSP.end_time,
            appointment_ref_id: st.setDataForSP.id
            // status : 'approve'
          }}
          setAppointmentLogOnAddUpdate={(e) => this.setState({ showPlainingFormModal: false }, () => {
            this.insertUpdateAssignLog(e, st.setDataForSP.status)
          })}
          onClose={() => this.setState({ showPlainingFormModal: false })}
        />
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() { this.getData(1); }//End componentDidMount
}//End class

export default AppointmentLogAdmin;