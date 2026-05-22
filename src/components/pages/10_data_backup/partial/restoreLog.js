import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { HTTP, TableColumnFilter, SortableDateInTableData } from '../../../services';
import DataTable from '../../../externalComponents/andt-data-table-component';
import ScreenLoader from '../../../externalComponents/screen-loader';

class RestoreLog extends Component {
  state = {
    loader: false,
    data: [],
    statusList: {}
  }//End state

  getData = (status) => {
    this.setState({ loader: true });
    HTTP('post', '/dataBackup/get/index/status/' + status).then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      this.setState({ data: res.data, statusList: res.statusList });
      this.props.setStatusList && this.props.setStatusList(res.statusList);
    });
  }//End function

  render() {
    const st = this.state;
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '4%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Backup Title',
        dataIndex: 'backup_title',
        width: '21%',
        sorter: (a, b) => a.backup_title.localeCompare(b.backup_title),
        ...TableColumnFilter('backup_title')
      }, {
        title: 'DB Size',
        dataIndex: 'dbSize',
        width: '10%',
        align: 'center',
        sorter: (a, b) => a.dbSizeBytes - b.dbSizeBytes,
        render: (a, b) => <span><i className="las la-database pos-relative top-1 fs-17" /> {a}</span>,
        ...TableColumnFilter('dbSize')
      }, {
        title: 'Files Size',
        dataIndex: 'filesSize',
        width: '10%',
        align: 'center',
        sorter: (a, b) => a.filesSizeBytes - b.filesSizeBytes,
        render: (a, b) => <span><i className="las la-file-alt pos-relative top-1 fs-17" /> {a}</span>,
        ...TableColumnFilter('filesSize')
      }, {
        title: 'Restore Date & Time',
        dataIndex: 'inserted_date_formatted',
        width: '16%',
        align: 'center',
        sorter: SortableDateInTableData('inserted_date_formatted'),
        ...TableColumnFilter('inserted_date_formatted')
      }, {
        title: 'Restore By',
        dataIndex: 'name',
        width: '13%',
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...TableColumnFilter('name')
      }, {
        title: 'Status',
        dataIndex: 'oldStatus',
        width: '10%',
        align: 'center',
        sorter: (a, b) => a.oldStatus.localeCompare(b.oldStatus),
      }, {
        title: 'Backup Date & Time',
        dataIndex: 'backup_date_formatted',
        width: '16%',
        align: 'center',
        sorter: (a, b) => a.backup_date.localeCompare(b.backup_date),
        ...TableColumnFilter('backup_date_formatted')
      }];

    //@ Mobile View Column
    const mobileCol = [
      {
        title: 'Backup Title',
        dataIndex: 'backup_title',
        width: '100%',
        className: 'mobile-col',
        render: (record, row) =>
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="icon">
                <Tooltip placement="topRight" title={st.statusList[row.status]['name']} trigger='click'>
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
                  <span className="value">
                    <i className="las la-database pos-relative top-1 fs-17 m-l--3" /> {row.dbSize},&nbsp;
                    <i className="las la-file-alt pos-relative top-1 fs-17" /> {row.filesSize}
                  </span>
                </div>
              </div>
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
              { label: 'Backup Title', value: 'backup_title' },
              { label: 'DB Size', value: 'dbSize' },
              { label: 'Files Size', value: 'filesSize' },
              { label: 'Restore Date & Time', value: 'inserted_date_formatted' },
              { label: 'Restore By', value: 'name' },
              { label: 'Status', value: 'oldStatus' },
              { label: 'Backup Date & Time', value: 'backup_date_formatted' }
            ]}
          />
        </ScreenLoader>
      </div>
    )//End return
  }//End render
  componentDidMount() { this.getData('import'); }//End componentDidMount
}//End class
export default RestoreLog;