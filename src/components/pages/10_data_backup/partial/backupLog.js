import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { HTTP, TableColumnFilter, InsertRowInList, DeleteRowFromList, FileDownload, SortableDateInTableData, AccessControl } from '../../../services';
import { Popconfirm, Tooltip, Popover, Button } from 'antd';
import { BackupRestoreWarning } from '../partialServices';
import PasswordForRestoreModal from '../passwordForRestoreModal';
import DataTable from '../../../externalComponents/andt-data-table-component';
import ScreenLoader from '../../../externalComponents/screen-loader';
import { connect } from 'react-redux';
import StorePost from '../../../../store/post';

class BackupLog extends Component {
  state = {
    loader: false,
    downloadLoader: {},
    deleteLoader: {},
    restoreLoader: {},
    passwordModal: false,
    holdRestoreParams: {},
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

  downloadBackup = (id, folderName) => {
    let downloadLoader = this.state.downloadLoader;
    downloadLoader[id] = true;
    this.setState({ downloadLoader });
    HTTP('post', '/dataBackup/post/download/folderName/' + folderName).then(res => {
      downloadLoader[id] = false;
      this.setState({ downloadLoader });
      if (!res) return false;
      FileDownload(res.data.path, res.data.fileName);
    });
  }//End function

  deleteBackup = (id, folderName, status) => {
    let deleteLoader = this.state.deleteLoader;
    deleteLoader[id] = true;
    this.setState({ deleteLoader });
    HTTP('post', '/dataBackup/post/delete/folderName/' + folderName + '/id/' + id + '/oldStatus/' + status).then(res => {
      deleteLoader[id] = false;
      this.setState({ deleteLoader });
      if (!res) return false;
      this.setState({ data: DeleteRowFromList(this.state.data, id) });
      this.props.newDataForDelete(res.data);
    });
  }//End function

  backupRestoreWarning = (id, folderName) => {
    BackupRestoreWarning(() => this.setState({ passwordModal: true, holdRestoreParams: { id, folderName } }));
  }//End function

  restoreBackup = (values) => {
    values.id = this.state.holdRestoreParams.id
    values.folderName = this.state.holdRestoreParams.folderName;
    let restoreLoader = this.state.restoreLoader;
    restoreLoader[values.id] = true;
    this.setState({ restoreLoader });
    HTTP('post', '/dataBackup/post/import/', values).then(res => {
      restoreLoader[values.id] = false;
      this.setState({ restoreLoader });
      if (!res) return false;
      this.signOut();
    });
  }//End function

  signOut = () => {
    this.props.history.push(process.env.PUBLIC_URL + '/login');
    localStorage.removeItem(window.appLocalStorage);
    setTimeout(() => {
      this.props.post_stv('profile_data', null);
      this.props.post_stv('ud', {});
    }, 1000);
    HTTP('get', '/login/get/signOut/se/ig').then(res => { })//End http service
  }//End function

  render() {
    const st = this.state;
    const actionCol = (a, b, className = false) => (
      <ScreenLoader inline={true} tip="Please Wait..." active={st.deleteLoader[b.id] || st.downloadLoader[b.id]}>
        <div className={`text-center ${className}`}>
          {AccessControl(155) &&
            <>
              <Tooltip title="Download">
                <button className="btnToLink link-color action-btn" onClick={() => this.downloadBackup(b.id, b.folderName)}><i className="fs-18 las la-download" /></button>
              </Tooltip>
              <i className="list_view_icon_sap las la-redo"></i>
            </>
          }
          {AccessControl(156) &&
            <>
              <Popconfirm title="Are you sure to restore this backup？" placement="topRight" onConfirm={() => this.backupRestoreWarning(b.id, b.folderName)} okText="Yes" cancelText="No">
                <Tooltip title="Restore">
                  <button className="btnToLink link-color action-btn"><i className="fs-18 las la-sync" /></button>
                </Tooltip>
              </Popconfirm>
              <i className="list_view_icon_sap las la-redo"></i>
            </>
          }
          {AccessControl(157) &&
            <Popconfirm title="Are you sure to delete this backup？" placement="topRight" onConfirm={() => this.deleteBackup(b.id, b.folderName, b.status)} okText="Yes" cancelText="No">
              <Tooltip title="Delete">
                <button className="btnToLink link-color action-btn"><i className="fs-18 las la-trash-alt" /></button>
              </Tooltip>
            </Popconfirm>
          }
        </div>
      </ScreenLoader>
    );
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '4%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Backup Title',
        dataIndex: 'backup_title',
        width: '30%',
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
        title: 'Backup By',
        dataIndex: 'name',
        width: '20%',
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...TableColumnFilter('name')
      }, {
        title: 'Backup Date & time',
        dataIndex: 'inserted_date_formatted',
        width: '16%',
        align: 'center',
        sorter: SortableDateInTableData('inserted_date_formatted'),
        ...TableColumnFilter('inserted_date_formatted')
      }];

    AccessControl('155,156,157') &&
      columns.push({
        title: 'Action',
        width: '10%',
        align: 'center',
        render: (a, b) => actionCol(a, b)
      })

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
            {AccessControl('155,156,157') &&
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
              { label: 'Backup Title', value: 'backup_title' },
              { label: 'DB Size', value: 'dbSize' },
              { label: 'Files Size', value: 'filesSize' },
              { label: 'Backup By', value: 'name' },
              { label: 'Backup Date & Time', value: 'inserted_date_formatted' }
            ]}
          />
        </ScreenLoader>
        <PasswordForRestoreModal
          show={st.passwordModal}
          onClose={() => this.setState({ passwordModal: false })}
          onFinish={this.restoreBackup}
          closeBtn={() => this.setState({ passwordModal: false, holdRestoreParams: {} })}
          loading={st.restoreLoader[st.holdRestoreParams.id]}
        />
      </div>
    )//End return
  }//End render
  componentDidMount() { this.getData('export'); }//End componentDidMount
  componentDidUpdate(prevProps) {
    if ((prevProps.newData !== this.props.newData)) {
      this.setState({ data: InsertRowInList(this.props.newData, this.state.data) });
    }//End if condition
  }//End componentDidMount
}//End class
export default connect('', StorePost)(withRouter(BackupLog));