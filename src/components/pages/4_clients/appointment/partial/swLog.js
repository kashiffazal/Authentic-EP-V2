import React, { Component } from 'react';
import PageTitle from '../../../mutual/pageTitle';
import { Button, Popover } from 'antd';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
import AppointmentFormModal from '../appointmentFormModal';
import { HTTP, LogResetRow, LogResetList, SortableDateInTableData, TableColumnFilter, TableColumnListForSelectFilter } from '../../../../services';
import ViewDetails from '../viewDetails';

class AppointmentLogSW extends Component {
  state = {
    loader: false,
    visibleFormModal: false,
    visibleViewModal: false,
    listData: [],
    statusList: {},
    editData: {},
    dataId: null,
    ads: {},//! App Default Settings,
    filterIndividualColArr: {},
  };

  getData = () => {
    this.setState({ loader: true });
    HTTP('get', '/clientAppointment/get/index/').then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      this.setState({ listData: res.data, statusList: res.status_list, ads: res.appDefaultSetting }, () => {
        this.setState({ filterIndividualColArr: TableColumnListForSelectFilter(res.data) })
      });
    });
  }//End function

  insertUpdateUnAssignLog = (e, keyword) => {
    // console.log(e);
    let listData = this.state.listData;
    if (keyword === 'add') {
      listData = LogResetList(e, listData);
    } else {
      listData = LogResetRow(e, listData);
    }//End if condition
    this.setState({ listData, dataId: null });//@dataId reset for ViewDetails Component
  }//End function

  render() {
    const st = this.state;
    const actionCol = (record, row, className = false) => (
      <div className={`text-center ${className}`}>
        <button title="View Details" className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, dataId: row.id })}><i className="fs-18 las la-table link-color" /></button>
        <i className="list_view_icon_sap las la-redo"></i>
        <button title="Edit Note" className="btnToLink" onClick={() => this.setState({ editData: row, visibleFormModal: true })}><i className="fs-18 las la-edit link-color" /></button>
      </div>
    );
    //@ Web View Column
    const columns = [
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
      }, {
        title: 'Action',
        align: 'center',
        width: '13%',
        render: (record, row) => actionCol(record, row)
      }];
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
                <i className={
                  st.statusList[row.status]['mobileIcon'] ?
                    st.statusList[row.status]['mobileIcon'] :
                    st.statusList[row.status]['icon']
                } style={{ background: st.statusList[row.status]['color'] }} />
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
            <div className="action">
              <Popover content={actionCol(record, row, 'mobile-icon-menu-action')} trigger="click" placement="right">
                <Button size="small"><i className="las la-bars"></i></Button>
              </Popover>
            </div>
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
          render={<Button size="large" type="primary" onClick={() => this.setState({ visibleFormModal: true })}>Add Appointment</Button>}
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          <ScreenLoader active={st.loader}>
            <DataTable
              classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
              columns={window.webviewMobile ? mobileCol : columns}
              styleType={2}
              dataSource={st.listData}
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
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() { this.getData(); }//End componentDidMount
}//End class

export default AppointmentLogSW;