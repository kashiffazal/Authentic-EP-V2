import React, { Component } from 'react';
import PageTitle from '../mutual/pageTitle';
import ViewPDFInModal from '../mutual/viewPDFInModal';
import { Button, Modal, Dropdown, Menu, Badge, Tooltip } from 'antd';
import ScreenLoader from '../../externalComponents/screen-loader';
import DataTable from '../../externalComponents/andt-data-table-component';
import JobForm from './jobForm';
import { HTTP, LogResetRow, LogResetList, AccessControl, SortableDateInTableData } from '../../services';
import ViewDetailsJob from './viewDetailsJob';

class JobFormAndLog extends Component {
  state = {
    loader: false,
    visibleFormModal: false,
    visibleViewModal: false,
    viewJobAppliedModal: false,
    jobNameForModal: '',
    listData: [],
    timeList: [],
    statusList: {},
    statusLoader: {},
    editData: null,
    viewData: {},
    appliedListLoader: false,
    appliedListData: [],
    visibleViewModalFile: false,
    pdf_path: ''
  };

  changeStatus = (row, status) => {
    let statusLoaderObj = {};
    statusLoaderObj[row.id] = true;
    this.setState({ statusLoader: statusLoaderObj });
    let postData = { 'id': row.id, 'status': status };
    HTTP('post', '/job/post/changeStatus', postData).then(res => {
      statusLoaderObj[row.id] = false;
      this.setState({ statusLoader: statusLoaderObj });
      if (!res) return false;
      //console.log(res);
      row.status = status;
      this.setState({ listData: LogResetRow(row, this.state.listData) });
    });
  }//End function

  visibleEditForm = (data) => {
    this.setState({ visibleFormModal: true }, () => {
      setTimeout(() => this.setState({ editData: data }), 10);
    })
  }//End function

  visibleForm = () => {
    // this.props.form.resetFields();
    this.setState({ visibleFormModal: true }, () => {
      // this.props.form.resetFields();
    })
  }//End function

  getAppliedList = (row) => {
    this.setState({ appliedListLoader: true, viewJobAppliedModal: true, jobNameForModal: row.title, appliedListData: [] });
    HTTP('get', '/job/get/appliedList/' + row.id).then(res => {
      this.setState({ appliedListLoader: false });
      if (!res) return false;
      //console.log(res);
      this.setState({ appliedListData: res.data });
    });
  }//End function

  render() {
    const st = this.state;
    const actionCol = (record, row) => (<div>
      <Dropdown overlay={
        <Menu className="menu_btn">
          {AccessControl(3) && <Menu.Item key={1} disabled><div className="label p-r-30">Change Status</div></Menu.Item>}
          {AccessControl(3) && <Menu.Divider />}
          {AccessControl(3) && <Menu.Item key={2} disabled={row.status === 'active'}><button disabled={row.status === 'active'} className="btnToLink flex-sb p-t-5-imp" onClick={() => this.changeStatus(row, 'active')}><div>Active</div><div>{row.status === 'active' && <i className="las la-check-circle status-active-color" />}</div></button></Menu.Item>}
          {/* <Menu.Item  key={3} disabled={row.status === 'inactive'}><button disabled={row.status === 'inactive'} className="btnToLink flex-sb p-t-5-imp" onClick={() => this.changeStatus(row, 'inactive')}><div>Inactive</div><div>{row.status === 'inactive' && <i className="las la-check-circle status-active-color" />}</div></button></Menu.Item> */}
          {AccessControl(3) && <Menu.Item key={4} disabled={row.status === 'close'}><button disabled={row.status === 'close'} className="btnToLink flex-sb p-t-5-imp" onClick={() => this.changeStatus(row, 'close')}><div>Close</div><div>{row.status === 'close' && <i className="las la-check-circle status-active-color" />}</div></button></Menu.Item>}
          {AccessControl(3) && <Menu.Divider />}
          {AccessControl(4) && <Menu.Item key={5}><button className="btnToLink" onClick={() => this.visibleEditForm(row)}><i className="las la-edit" />Edit Job</button></Menu.Item>}
          {AccessControl(5) && <Menu.Item key={6}><button className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, viewData: row })}><i className="las la-table" />View Details</button></Menu.Item>}
        </Menu>
      } trigger={['click']} placement="bottomRight">
        <Button size="small"><i className="las la-bars"></i></Button>
      </Dropdown>
    </div>);
    //@ Web View Column
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key.toString().localeCompare(b.key.toString()),
      }, {
        title: 'Title',
        dataIndex: 'title',
        width: '17%',
        sorter: (a, b) => a.title.localeCompare(b.title),
      }, {
        title: 'Position',
        dataIndex: 'position',
        width: '17%',
        sorter: (a, b) => a.position.localeCompare(b.position),
      }, {
        title: 'Timing',
        dataIndex: 'timing',
        width: '10%',
        sorter: (a, b) => a.timing.localeCompare(b.timing)
      }, {
        title: 'Inserted By',
        dataIndex: 'inserted_by',
        width: '14%',
        sorter: (a, b) => a.inserted_by.localeCompare(b.inserted_by)
      }, {
        title: 'Inserted Date',
        dataIndex: 'inserted_by_date',
        width: '16%',
        sorter: SortableDateInTableData('inserted_by_date'),
      }, {
        title: 'Applied',
        dataIndex: 'job_count',
        align: 'center',
        width: '8%',
        sorter: (a, b) => a.job_count.localeCompare(b.job_count),
        render: (record, row) => (record !== '0' && record !== '') ? <span><button className="btnToLink text-orange" onClick={() => this.getAppliedList(row)}><Badge className="active-badge" count={record} /></button></span> : '-'
      }, {
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
        width: '7%',
        sorter: (a, b) => a.status.localeCompare(b.status),
        render: (record, row) => <ScreenLoader active={this.state.statusLoader[row.id]} inline={true} tip="Loading"><div className={`f-l-c status-${record}-color fw-500 text-uc`}>{record}</div></ScreenLoader>
      },
    ];
    AccessControl('3,4,5') &&
      columns.push({
        title: 'Action',
        align: 'center',
        width: '6%',
        render: (record, row) => actionCol(record, row)
      });

    //@ Mobile View Column
    const mobileCol = [
      {
        title: 'Title',
        dataIndex: 'title',
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
                  <span className="label">Position:</span>
                  <span className="value">{row.position}</span>
                  <span className="label">Timing:</span>
                  <span className="value">{row.timing}</span>
                </div>
                {/* <div className="foot-value">
                <span className="label">Inserted Date:</span>
                <span className="value">{row.inserted_by_date}</span>
              </div> */}
              </div>
            </div>
            {AccessControl('3,4,5') && <div className="action">{actionCol(record, row)}</div>}
          </div>
      }];

    const columnsApplied = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '7%',
        sorter: (a, b) => a.key - b.key,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        width: '25%',
        sorter: (a, b) => a.name.localeCompare(b.name),
      }, {
        title: 'Mobile',
        dataIndex: 'mobile',
        width: '15%',
        sorter: (a, b) => a.mobile.localeCompare(b.mobile),
      }, {
        title: 'Email',
        dataIndex: 'email',
        width: '25%',
        sorter: (a, b) => a.email.localeCompare(b.email),
      }, {
        title: 'Skype ID',
        dataIndex: 'skypeId',
        width: '20%',
        sorter: (a, b) => a.skypeId.localeCompare(b.skypeId),
      }, {
        title: 'Details',
        width: '8%',
        align: 'center',
        render: (record, row) => <button className="btnToLink link-color" onClick={() => this.setState({ visibleViewModalFile: true, pdf_path: row.pdf_path })}>View</button>
      }
    ];
    return (
      <div>
        <PageTitle
          titleIcon="las la-briefcase"
          titleSpan="Create"
          titleHeading="Jobs"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-briefcase', label: 'Create Jobs' }
          ]}
          render={(AccessControl(1) && !(AccessControl(1) && !AccessControl(2))) && <Button size="large" type="primary" onClick={() => this.visibleForm()}>Add New Job</Button>}
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          {(AccessControl(1) && !AccessControl(2)) &&
            <ScreenLoader active={st.loader}>
              <JobForm
                timeList={st.timeList}
                data={this.state.editData}
                closeModal={() => this.setState({ visibleFormModal: false, editData: null })}
                addData={(values) => { this.setState({ listData: LogResetList(values, this.state.listData) }) }}
                updateData={(values) => { this.setState({ listData: LogResetRow(values, this.state.listData) }) }}
              // fp={this.props.form}
              />
            </ScreenLoader>
          }

          {AccessControl(2) &&
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
                  { label: 'Title', value: 'title' },
                  { label: 'Position', value: 'position' },
                  { label: 'Timing', value: 'timing' },
                  { label: 'Description', value: 'description' },
                  { label: 'Status', value: 'status' }
                ]}
              />
            </ScreenLoader>
          }
        </div>
        <Modal
          width={740}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={this.state.editData ? 'Update Existing Job' : 'Create New Job'}
          visible={st.visibleFormModal}
          onOk={() => this.setState({ visibleFormModal: false })}
          onCancel={() => this.setState({ visibleFormModal: false, editData: null })}
          destroyOnClose={true}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ visibleFormModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">{this.state.editData ? 'Update Existing Job' : 'Create New Job'}</span>
              <span className="sub-title">Insert or Update Job</span>
            </div>
          </div>
          <JobForm
            timeList={st.timeList}
            data={this.state.editData}
            closeModal={() => this.setState({ visibleFormModal: false, editData: null })}
            addData={(values) => { this.setState({ listData: LogResetList(values, this.state.listData) }) }}
            updateData={(values) => { this.setState({ listData: LogResetRow(values, this.state.listData) }) }}
          // fp={this.props.form}
          />
        </Modal>
        <Modal
          width={740}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={'View Job Detail'}
          visible={st.visibleViewModal}
          onOk={() => this.setState({ visibleViewModal: false })}
          onCancel={() => this.setState({ visibleViewModal: false })}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ visibleViewModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title-for-view-details">
            <div>
              <span className="title">View Job Detail</span>
              <span className="sub-title">Detailed view of Job</span>
            </div>
          </div>
          <ViewDetailsJob data={this.state.viewData} />
        </Modal>

        <Modal
          width={960}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={st.jobNameForModal + ' | Application List'}
          visible={st.viewJobAppliedModal}
          onOk={() => this.setState({ viewJobAppliedModal: false })}
          onCancel={() => this.setState({ viewJobAppliedModal: false })}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ viewJobAppliedModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">{st.jobNameForModal + ' | Application List'}</span>
              <span className="sub-title">List of all Support Workers who applied at this job</span>
            </div>
          </div>
          <ScreenLoader active={st.appliedListLoader}>
            <DataTable
              columns={columnsApplied}
              styleType={2}
              dataSource={st.appliedListData}
              showSizeChanger={true}
              pagination={{ itemDetails: true, showOnSinglePage: true }}
              customFilter="true"
              customFilterLabel="Filter by"
              customFilterCol={[
                { label: 'Name', value: 'name' },
                { label: 'Mobile', value: 'mobile' },
                { label: 'Email', value: 'email' },
                { label: 'Skype ID', value: 'skypeId' }
              ]}
            />
          </ScreenLoader>
        </Modal>
        <ViewPDFInModal title={'View Support Worker Detailed File'} show={st.visibleViewModalFile} close={() => this.setState({ visibleViewModalFile: false })} pdfPath={st.pdf_path} />
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    // if (AccessControl(2)) {
    this.setState({ loader: true });
    HTTP('get', '/job/get/').then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ listData: res.data, timeList: res.timeList, statusList: res.statusList });
    });
    // }//End if condition
  }//End componentDidMount
}//End class

export default JobFormAndLog;
