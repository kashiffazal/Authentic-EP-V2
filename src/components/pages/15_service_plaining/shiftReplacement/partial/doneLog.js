import React, { Component } from 'react'
import { Tooltip, Popover, Button } from 'antd';
import { HTTP, LogResetList, SortableDateInTableData } from '../../../../services';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
import ViewDetailModal from '../../plainingLog/partial/viewDetailModal';
// import ShiftReplacementFormModal from '../shiftReplacementFormModal';
import ShowRequestReasonModal from '../showReasonModal';
import ViewDoneDetailModal from './viewDoneDetails';

class DoneLog extends Component {
  state = {
    loader: false,
    data: [],
    visibleViewModal: false,
    viewDataId: '',
    visibleDetailsModal: false,
    requestId: '',
    viewRequestReasonModal: false,
    requestReasonToShow: ''
  }

  getData = () => {
    this.setState({ loader: true });
    HTTP('get', '/shiftReplacementRequest/get/getList/replaced').then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.setState({ data: res.data });
    });
  }//End function

  render() {
    const st = this.state;
    const actionCol = (record, row, className = false) => (
      <div className={`text-center ${className}`}>
        <button className="btnToLink link-color flex-c-m" onClick={() => this.setState({ viewRequestReasonModal: true, requestReasonToShow: row.reason })}>
          <span className="fs-11 dis-inline-block m-r-2">Reason </span><i className="fs-14 las la-comment link-color" />
        </button>
        <i className="list_view_icon_sap las la-redo"></i>
        <button className="btnToLink link-color flex-c-m" onClick={() => this.setState({ visibleViewModal: true, viewDataId: row.service_plaining_ref_id })}>
          <span className="fs-11 dis-inline-block m-r-2">Shift Details</span> <i className="fs-14 las la-table link-color"></i>
        </button>
        <i className="list_view_icon_sap las la-redo"></i>
        <button className="btnToLink link-color flex-c-m" onClick={() => this.setState({ visibleDetailsModal: true, requestId: row.id })}>
          <span className="fs-11 dis-inline-block m-r-2">Req Details </span> <i className="fs-14 las la-table link-color"></i>
        </button>
      </div>
    );
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '4%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Date',
        dataIndex: 'inserted_date',
        width: '8%',
        sorter: SortableDateInTableData('inserted_date'),
        render: (text, record) => record.inserted_date_formatted
      }, {
        title: 'Request #',
        dataIndex: 'request_no',
        width: '7%',
        sorter: (a, b) => a.request_no.localeCompare(b.request_no),
      }, {
        title: 'Shift #',
        dataIndex: 'shift_no',
        width: '7%',
        sorter: (a, b) => a.shift_no.localeCompare(b.shift_no),
      }, {
        title: 'Support Worker',
        dataIndex: 'sp_name',
        width: '20%',
        sorter: (a, b) => a.sp_name.localeCompare(b.sp_name),
      }, {
        title: 'Replaced With',
        dataIndex: 'swpr1_name',
        width: '20%',
        sorter: (a, b) => a.swpr1_name.localeCompare(b.swpr1_name),
        render: (record, row) => <span>
          {record && record}
          {(record && row.swpr2_name) && ' with '}
          {row.swpr2_name && row.swpr2_name + ' (Partner)'}</span>
      }, {
        title: 'For Date',
        dataIndex: 'req_for_date',
        width: '8%',
        sorter: (a, b) => a.req_for_date.localeCompare(b.req_for_date),
        render: (text, record) => record.req_for_date_formatted
      }, {
        title: 'For Day',
        dataIndex: 'req_for_day',
        width: '8%',
        sorter: (a, b) => a.req_for_day.localeCompare(b.req_for_day),
      }, {
        title: 'Reason',
        dataIndex: 'reason',
        align: 'center',
        width: '6%',
        // sorter: (a, b) => a.reason.localeCompare(b.reason),
        render: (record, row) => <button className="btnToLink" onClick={() => this.setState({ viewRequestReasonModal: true, requestReasonToShow: record })}><i className="fs-18 las la-comment link-color" /></button>
      }, {
        title: 'Shift',
        dataIndex: 'reason',
        align: 'center',
        width: '6%',
        // sorter: (a, b) => a.reason.localeCompare(b.reason),
        render: (record, row) => <button className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, viewDataId: row.service_plaining_ref_id })}><i className="fs-18 las la-table link-color"></i></button>
      }, {
        title: 'Details',
        align: 'center',
        width: '6%',
        render: (record, row) => {
          return (
            <button className="btnToLink" onClick={() => this.setState({ visibleDetailsModal: true, requestId: row.id })}><i className="fs-18 las la-table link-color"></i></button>
          )
        }
      }];


    //@ Mobile View Column
    const mobileCol = [
      {
        title: 'Request No',
        dataIndex: 'request_no',
        width: '100%',
        className: 'mobile-col',
        render: (record, row) =>
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="icon">
                <Tooltip placement="topRight" title="Shift Done" trigger='click'>
                  <i className='las la-check-double success-bg-color' />
                </Tooltip>
              </div>
              <div className="data">
                <div className="main-value">{record} - {row.shift_no}</div>
                <div className="sub-value">
                  <span className="label">Req By:</span>
                  <span className="value">{row.sp_name}</span>
                </div>
                <div className="sub-value">
                  <span className="label">Replace With:</span>
                  <span className="value">
                    {row.swpr1_name && row.swpr1_name}
                    {(row.swpr1_name && row.swpr2_name) && ' with '}
                    {row.swpr2_name && row.swpr2_name + ' (Partner)'}
                  </span>
                </div>
                <div className="foot-value">
                  <span className="label">Req For:</span>
                  <span className="value">{row.req_for_date}, {row.req_for_day}</span>
                </div>
              </div>
            </div>
            <div className="action">
              <Popover content={actionCol(record, row, 'mobile-icon-menu-action')} trigger="click" placement="bottomRight">
                <Button size="small"><i className="las la-bars"></i></Button>
              </Popover>
            </div>
          </div>
      }];
    return (
      <div>
        <ScreenLoader active={st.loader}>
          <DataTable
            classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
            columns={window.webviewMobile ? mobileCol : columns}
            styleType={2}
            dataSource={st.data}
            showSizeChanger={true}
            pagination={{ itemDetails: true, showOnSinglePage: true }}
            customFilter="true"
            customFilterLabel="Filter by"
            customFilterCol={[
              { label: 'Date', value: 'inserted_date_formatted' },
              { label: 'Request #', value: 'request_no' },
              { label: 'Shift #', value: 'shift_no' },
              { label: 'Support Worker', value: 'sp_name' },
              { label: 'Replaced With', value: 'swpr1_name' },
              { label: 'For Date', value: 'req_for_date_formatted' },
              { label: 'For Day', value: 'req_for_day' },
            ]}
          />
        </ScreenLoader>
        <ShowRequestReasonModal show={st.viewRequestReasonModal} data={st.requestReasonToShow} onClose={() => this.setState({ viewRequestReasonModal: false })} />
        <ViewDetailModal dataId={st.viewDataId} show={st.visibleViewModal} onClose={() => this.setState({ visibleViewModal: false })} />
        <ViewDoneDetailModal dataId={st.requestId} show={st.visibleDetailsModal} onClose={() => this.setState({ visibleDetailsModal: false })} />
      </div>
    )//End return
  }//End render
  componentDidMount() { this.getData() }//End componentDidMount
  componentDidUpdate(prevProps) {
    if ((prevProps.updateList !== this.props.updateList) && Object.keys(this.props.updateList).length > 0) {
      this.setState({
        data: LogResetList(this.props.updateList, this.state.data)
      });
    }//end if condition
  }//End componentDidUpdate
}//End class
export default DoneLog;