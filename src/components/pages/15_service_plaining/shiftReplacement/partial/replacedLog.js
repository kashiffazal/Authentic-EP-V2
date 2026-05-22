import React, { Component } from 'react';
import { Tooltip, Popconfirm, Popover, Button } from 'antd';
import { HTTP, LogDeleteRow, GetObjectFromArr, LogResetList, UpdateRowInList, SortableDateInTableData, AccessControl } from '../../../../services';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
import ViewDetailModal from '../../plainingLog/partial/viewDetailModal';
import ShiftReplacementFormModal from '../shiftReplacementFormModal';
import ShowRequestReasonModal from '../showReasonModal';

class ReplacedLog extends Component {
  state = {
    loader: false,
    updateStatusLoader: {},
    data: [],
    visibleViewModal: false,
    viewDataId: '',
    visibleEditModal: false,
    requestId: '',
    viewRequestReasonModal: false,
    requestReasonToShow: ''
  }

  getData = () => {
    this.setState({ loader: true });
    HTTP('get', '/shiftReplacementRequest/get/getList/replaced').then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.setState({ data: res.data, statusList: res.statusList });
      this.props.setStatusList && this.props.setStatusList(res.statusList);
    });
  }//End function


  changeStatus = (newStatus, row) => {
    let statusLoaderObj = {};
    statusLoaderObj[row.id] = true;
    this.setState({ updateStatusLoader: statusLoaderObj });
    let postData = { status: newStatus, id: row.id };
    HTTP('post', '/shiftReplacementRequest/post/changeStatus/', postData).then(res => {
      statusLoaderObj[row.id] = false;
      this.setState({ updateStatusLoader: statusLoaderObj });
      if (!res) { return false; }
      this.setState({ data: LogDeleteRow(row, this.state.data) });

      this.props.onHold({});
      this.props.onDeleted({});
      if (newStatus === 'hold') { this.props.onHold(row); }
      if (newStatus === 'deleted') { this.props.onDeleted(row); }
    });
  }//End if condition


  render() {
    const st = this.state;
    const actionCol = (record, row, className = false) => (
      <ScreenLoader active={this.state.updateStatusLoader[row.id]} inline={true} tip="Please wait...">
        <div className={`text-center ${className}`}>
          {window.webviewMobile && AccessControl(108) &&
            <>
              <Tooltip placement="top" title="Reason">
                <button className="btnToLink" onClick={() => this.setState({ viewRequestReasonModal: true, requestReasonToShow: row.reason })}><i className="fs-18 las la-comment link-color" /></button>
              </Tooltip>
              <span className="list_view_icon_sap">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            </>
          }
          {AccessControl(109) &&
            <>
              <Tooltip placement="top" title="Shift Details">
                <button className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, viewDataId: row.service_plaining_ref_id })}><i className="fs-18 las la-table link-color"></i></button>
              </Tooltip>
              <i className="list_view_icon_sap las la-redo"></i>
            </>
          }
          {AccessControl(110) &&
            <>
              <Tooltip placement="top" title="Edit">
                <button className="btnToLink" onClick={() => this.setState({ visibleEditModal: true, requestId: row.id })}><i className="fs-18 las la-edit link-color"></i></button>
              </Tooltip>
              <span className="list_view_icon_sap">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            </>
          }
          {AccessControl(111) &&
            <>
              <Tooltip placement="top" title="On Hold">
                <Popconfirm title="Are you sure to Hold this request？" onConfirm={() => this.changeStatus('hold', row)} okText="Yes" cancelText="No">
                  <button className="btnToLink"><i className="fs-18 las la-pause-circle link-color" /></button>
                </Popconfirm>
              </Tooltip>
              <i className="list_view_icon_sap las la-redo"></i>
              <Tooltip placement="top" title="Delete">
                <Popconfirm title="Are you sure to Delete this request？" onConfirm={() => this.changeStatus('deleted', row)} okText="Yes" cancelText="No">
                  <button className="btnToLink"><i className="fs-18 las la-times-circle link-color" /></button>
                </Popconfirm>
              </Tooltip>
            </>
          }
        </div>
      </ScreenLoader>
    );

    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '4.5%',
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
        width: '8%',
        sorter: (a, b) => a.request_no.localeCompare(b.request_no),
      }, {
        title: 'Shift #',
        dataIndex: 'shift_no',
        width: '8%',
        sorter: (a, b) => a.shift_no.localeCompare(b.shift_no),
      }, {
        title: 'Support Worker',
        dataIndex: 'sp_name',
        width: '18%',
        sorter: (a, b) => a.sp_name.localeCompare(b.sp_name),
      }, {
        title: 'Replaced With',
        dataIndex: 'swpr1_name',
        width: '18%',
        sorter: (a, b) => a.swpr1_name.localeCompare(b.swpr1_name),
        render: (record, row) => <span>
          {record && record}
          {(record && row.swpr2_name) && ' with '}
          {row.swpr2_name && row.swpr2_name + ' (Partner)'}</span>
      }, {
        title: 'For Date',
        dataIndex: 'req_for_date',
        width: '8.5%',
        sorter: (a, b) => a.req_for_date.localeCompare(b.req_for_date),
        render: (text, record) => record.req_for_date_formatted
      }, {
        title: 'For Day',
        dataIndex: 'req_for_day',
        width: '8.5%',
        sorter: (a, b) => a.req_for_day.localeCompare(b.req_for_day),
      }];

    AccessControl(108) &&
      columns.push({
        title: 'Reason',
        dataIndex: 'reason',
        align: 'center',
        width: '6%',
        // sorter: (a, b) => a.reason.localeCompare(b.reason),
        render: (record, row) => <button className="btnToLink" onClick={() => this.setState({ viewRequestReasonModal: true, requestReasonToShow: record })}><i className="fs-18 las la-comment link-color" /></button>
      });

    AccessControl('109,110,111') &&
      columns.push({
        title: 'Action',
        align: 'center',
        width: '35%',
        render: (record, row) => actionCol(record, row)
      });

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
                <Tooltip placement="topRight" title={st.statusList[row.status].name} trigger='click'>
                  <i className={
                    st.statusList[row.status]['mobileIcon'] ?
                      st.statusList[row.status]['mobileIcon'] :
                      st.statusList[row.status]['icon']
                  } style={{ background: st.statusList[row.status]['color'] }} />
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
            {AccessControl('109,110,111') &&
              <div className="action">
                <Popover content={actionCol(record, row, 'mobile-icon-menu-action')} trigger="click" placement="right">
                  <Button size="small"><i className="las la-bars"></i></Button>
                </Popover>
              </div>
            }
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
              { label: 'Req Number', value: 'request_no' },
              { label: 'Shift Number', value: 'shift_no' },
              { label: 'Support Worker', value: 'sp_name' },
              { label: 'Req For Date', value: 'req_for_date_formatted' },
              { label: 'Req For Day', value: 'req_for_day' },
            ]}
          />
        </ScreenLoader>
        <ShowRequestReasonModal show={st.viewRequestReasonModal} data={st.requestReasonToShow} onClose={() => this.setState({ viewRequestReasonModal: false })} />
        <ViewDetailModal dataId={st.viewDataId} show={st.visibleViewModal} onClose={() => this.setState({ visibleViewModal: false })} />
        <ShiftReplacementFormModal requestId={st.requestId} show={st.visibleEditModal} onClose={() => this.setState({ visibleEditModal: false })} onReplaced={(requestId, replacedSPName) => {
          let row = { ...GetObjectFromArr(requestId, 'id', this.state.data), ...replacedSPName };
          this.setState({ data: UpdateRowInList(row, this.state.data) });
          // this.props.onReplaced && this.props.onReplaced(row);
        }} />
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
export default ReplacedLog;