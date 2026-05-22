import React, { Component } from 'react';
import { Row, Col, Button, Modal, Dropdown, Menu, Form, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
import { HTTP, SaveArrLocalStorage, AccessControl, TableColumnFilter } from '../../../../services';
import { AntInput } from '../../../../externalComponents/antd-fields';
import ViewPDFInModal from '../../../mutual/viewPDFInModal';

const { SubMenu } = Menu;
const { confirm } = Modal;

class SupportWorkerMainLog extends Component {
  state = {
    loader: false,
    visibleViewModal: false,
    statusLoader: {},
    pdf_path: '',
    spName: '',
    rejectReason: '',
    rejectModalView: false,
    currentStatusForReject: '',
    newStatusForReject: {},
    selectedRowForReject: '',
    rejectViewReson: '',
    rejectReasonViewModal: false,
    hiredModalView: false,
    selectedRowForHired: '',
    newStatusForHired: {},
    getManagerListLoader: false,
    managerList: []
  };

  formRef = React.createRef();
  formRefHired = React.createRef();

  changeStatusConfirmModal = (row, status) => {
    this.setState({
      rejectReason: '', currentStatusForReject: '', newStatusForReject: {}, selectedRowForReject: '',
      selectedRowForHired: '', newStatusForHired: {}
    });
    //@If new status is 'Hired'
    if (status.id === '5') {
      this.setState({ hiredModalView: true, newStatusForHired: status, selectedRowForHired: row });
    } else if (status.id === '6') {//@ If new status is 'Rejected'
      this.setState({ rejectModalView: true, currentStatusForReject: row.status, newStatusForReject: status, selectedRowForReject: row })
    } else {
      let th = this;
      confirm({
        title: 'Are you sure to change status for this applicant?',
        content:
          <div>
            When clicked the Yes button, applicant status will be changed from <strong>{row.status}</strong> to <strong>{status.name}</strong>
          </div>,
        okText: "Yes",
        cancelText: "No",
        onOk() { th.changeStatus(row, status) },
        onCancel() { },
      });
    }//End if condition
  }//End if condition

  changeStatus = (row, status, values = false) => {
    let statusLoaderObj = {};
    statusLoaderObj[row.id] = true;
    if (this.state.rejectReason) { row.rejectReason = this.state.rejectReason; }
    this.setState({ statusLoader: statusLoaderObj, rejectModalView: false, rejectReason: '', hiredModalView: false });
    row.statusData = JSON.stringify(status);
    row = values ? { ...row, ...values } : row;
    // console.log(values);
    // return false;
    HTTP('post', '/supportWorker/post/changeStatus', row).then(res => {
      statusLoaderObj[row.id] = false;
      this.setState({ statusLoader: statusLoaderObj });
      if (!res) return false;
      //console.log(res);
      this.props.changeStatus(row, status, row.status);
    });
  }//End function

  getManagerList = (companyAndBranchId) => {
    // console.log(companyAndBranchId)
    this.setState({ getManagerListLoader: true });
    HTTP('get', '/supportWorker/get/getManagerList/' + companyAndBranchId).then(res => {
      this.setState({ getManagerListLoader: false });
      if (!res) return false;
      this.setState({ managerList: res.data });
    });
  }//End function


  render() {
    const st = this.state;
    const pr = this.props;

    //@ Setting All Tabs Columns
    const columnAllTabActionCol = (record, row) => (
      this.state.statusLoader[row.id] ?
        <ScreenLoader active={this.state.statusLoader[row.id]} inline={true} tip=" " />
        :
        (this.props.statusName !== 'Draft' && row.status !== 'Draft') ?
          <div>
            <Dropdown overlay={
              <Menu className="menu_btn p-r-30">
                {AccessControl(8) &&
                  <SubMenu key={0.1} title="Change Status as">
                    {this.props.statusList.map((item, i) => {
                      return ((item.name !== this.props.statusName && item.name !== row.status) && <Menu.Item key={i}><button className="p-r-20-imp btnToLink flex-sb" onClick={() => this.changeStatusConfirmModal(row, item)}>{item.name}</button></Menu.Item>)
                    })}
                  </SubMenu>
                }
                {AccessControl(8) && <Menu.Divider />}
                {AccessControl(9) && <Menu.Item key={0.2}><button className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, "supportWorkerForm")}><i className="las la-edit" />Edit Data</button></Menu.Item>}
                {AccessControl(11) && (row.status_ref_id === '6' && <Menu.Item key={0.3}><button className="btnToLink" onClick={() => this.setState({ rejectReasonViewModal: true, rejectViewReson: row.rejectReason })}><i className="las la-eye" />View Reson</button></Menu.Item>)}
                {AccessControl(10) && <Menu.Item key={0.4}><button className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, pdf_path: row.pdf_path, spName: row.name })}><i className="las la-table" />View Details</button></Menu.Item>}
              </Menu>
            } trigger={['click']} placement="bottomRight">
              <Button size="small"><i className="las la-bars"></i></Button>
            </Dropdown>
          </div>
          :
          AccessControl(9) && <button className="btnToLink draftEdit" onClick={() => SaveArrLocalStorage(row.id, "supportWorkerForm")}><i className="las la-edit" /></button>
    );
    //# Web View Column
    const columnsAllTab = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '4%',
        sorter: (a, b) => a.key - b.key,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        width: '16%',
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'name', pr.filterIndividualColArr)
      }, {
        title: 'Mobile',
        dataIndex: 'mobile',
        width: '9%',
        sorter: (a, b) => a.mobile.localeCompare(b.mobile),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'mobile', pr.filterIndividualColArr)
      }, {
        title: 'Email',
        dataIndex: 'email',
        width: '18%',
        sorter: (a, b) => a.email.localeCompare(b.email),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'email', pr.filterIndividualColArr)
      }, {
        //   title: 'Skype ID',
        //   dataIndex: 'skypeId',
        //   width: '14%',
        //   sorter: (a, b) => a.skypeId.localeCompare(b.skypeId)
        // }, {
        title: 'Suburb',
        dataIndex: 'suburb',
        width: '10%',
        sorter: (a, b) => a.suburb.localeCompare(b.suburb),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'suburb', pr.filterIndividualColArr)
      }, {
        title: 'Applied For',
        dataIndex: 'job_title',
        width: '30%',
        sorter: (a, b) => a.job_title.localeCompare(b.job_title),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'job_title', pr.filterIndividualColArr)
      }, {
        title: 'Status',
        dataIndex: 'status',
        width: '10%',
        sorter: (a, b) => a.status.localeCompare(b.status),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'status', pr.filterIndividualColArr)
      }
    ];
    //# Push Action Data
    AccessControl('8,9,10,11') &&
      columnsAllTab.push({
        title: 'Action',
        align: 'center',
        width: '5%',
        render: (record, row) => columnAllTabActionCol(record, row)
      })
    //# Mobile View Column
    const columnsAllMobileCol = [{
      title: 'Name',
      dataIndex: 'name',
      width: '100%',
      className: 'mobile-col',
      render: (record, row) => {
        var mobile = (row.mobile && row.mobile !== '-') && row.mobile;
        var email = (row.email && row.email !== '-') && row.email;
        return (
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="icon">
                <Tooltip placement="topRight" title={row.status} trigger='click'>
                  <i className={
                    this.props.statusListMobileTable[row.status]['mobileIcon'] ?
                      this.props.statusListMobileTable[row.status]['mobileIcon'] :
                      this.props.statusListMobileTable[row.status]['icon']
                  } style={{ background: this.props.statusListMobileTable[row.status]['color'] }} />
                </Tooltip>
              </div>
              <div className="data">
                <div className="main-value">{record}</div>
                <div className="sub-value">
                  {(mobile || email) &&
                    <span className="value">
                      {mobile}
                      {(mobile && email) && ' | '}
                      {email}
                    </span>
                  }
                </div>
              </div>
            </div>
            {AccessControl('8,9,10,11') && <div className="action">{columnAllTabActionCol(record, row)}</div>}
          </div>
        )
      }
    }];
    //# Filter for All Column
    const columnsAllFilter = [
      { label: 'Name', value: 'name' },
      { label: 'Mobile', value: 'mobile' },
      { label: 'Email', value: 'email' },
      { label: 'Suburb', value: 'suburb' },
      { label: 'Applied For', value: 'job_title' },
      { label: 'Status', value: 'status' },
    ];

    //@ Setting Individual Columns
    //# Web View Column
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key - b.key,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        width: '18%',
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'name', pr.filterIndividualColArr)
      }, {
        title: 'Mobile',
        dataIndex: 'mobile',
        width: '11%',
        sorter: (a, b) => a.mobile.localeCompare(b.mobile),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'mobile', pr.filterIndividualColArr)
      }, {
        title: 'Email',
        dataIndex: 'email',
        width: '18%',
        sorter: (a, b) => a.email.localeCompare(b.email),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'email', pr.filterIndividualColArr)
      }, {
        title: 'Skype ID',
        dataIndex: 'skypeId',
        width: '15%',
        sorter: (a, b) => a.skypeId.localeCompare(b.skypeId),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'skypeId', pr.filterIndividualColArr)
      }, {
        title: 'Suburb',
        dataIndex: 'suburb',
        width: '10%',
        sorter: (a, b) => a.suburb.localeCompare(b.suburb),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'suburb', pr.filterIndividualColArr)
      }, {
        title: 'Applied For',
        dataIndex: 'job_title',
        width: '18%',
        sorter: (a, b) => a.job_title.localeCompare(b.job_title),
        ...TableColumnFilter(pr.ads.tableIndividualColFilter, 'job_title', pr.filterIndividualColArr)
      },
    ];
    //# Push Action Data
    AccessControl('8,9,10,11') &&
      columns.push({
        title: 'Action',
        align: 'center',
        width: '5%',
        render: (record, row) => columnAllTabActionCol(record, row)
      })
    // columns.push({
    //   title: 'Action',
    //   align: 'center',
    //   width: '5%',
    //   render: (record, row) =>
    //     this.state.statusLoader[row.id] ?
    //       <ScreenLoader active={this.state.statusLoader[row.id]} inline={true} tip=" " />
    //       :
    //       this.props.statusName !== 'Draft' ?
    //         <div>
    //           <Dropdown overlay={
    //             <Menu className="menu_btn p-r-30">
    //               {AccessControl(8) &&
    //                 <SubMenu key={0.1} title="Change Status as">
    //                   {this.props.statusList.map((item, i) => {
    //                     return (item.name !== this.props.statusName && <Menu.Item key={i}><button className="p-r-20-imp btnToLink flex-sb" onClick={() => this.changeStatusConfirmModal(row, item)}><i className={'pos-relative top-3 p-r-4 ' + item.icon} /> {item.name}</button></Menu.Item>)
    //                   })}
    //                 </SubMenu>
    //               }
    //               {AccessControl(8) && <Menu.Divider />}
    //               {AccessControl(9) && <Menu.Item key={0.2}><button className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, "supportWorkerForm")}><i className="las la-edit" />Edit Data</button></Menu.Item>}
    //               {AccessControl(11) && (row.status_ref_id === '6' && <Menu.Item key={0.3}><button className="btnToLink" onClick={() => this.setState({ rejectReasonViewModal: true, rejectViewReson: row.rejectReason })}><i className="las la-eye" />View Reson</button></Menu.Item>)}
    //               {AccessControl(10) && <Menu.Item key={0.4}><button className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, pdf_path: row.pdf_path, spName: row.name })}><i className="las la-table" />View Details</button></Menu.Item>}
    //             </Menu>
    //           } trigger={['click']} placement="bottomRight">
    //             <Button size="small"><i className="las la-bars"></i></Button>
    //           </Dropdown>
    //         </div>
    //         :
    //         AccessControl(9) && <button className="btnToLink draftEdit" onClick={() => SaveArrLocalStorage(row.id, "supportWorkerForm")}><i className="las la-edit" /></button>
    // });
    //# Mobile View Column
    const columnsMobileCol = columnsAllMobileCol;
    //# Filter Column
    const columnsFilter = [
      { label: 'Name', value: 'name' },
      { label: 'Mobile', value: 'mobile' },
      { label: 'Email', value: 'email' },
      { label: 'Skype ID', value: 'skype_id' },
      { label: 'Suburb', value: 'suburb' },
      { label: 'Applied For', value: 'job_title' }
    ];

    const assignManager = pr.ads.general.assignManagerToSW;
    const multiCompany = (pr.userCompanyList.length > 1);
    const managerList = pr.managerList ? pr.managerList : st.managerList;
    // console.log(multiCompany);
    return (
      <div>
        <ScreenLoader active={st.loader}>
          <DataTable
            classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
            columns={pr.statusName === 'All' ? (window.webviewMobile ? columnsAllMobileCol : columnsAllTab) : (window.webviewMobile ? columnsMobileCol : columns)}
            styleType={2}
            dataSource={pr.data}
            showSizeChanger={true}
            pagination={{ itemDetails: true, showOnSinglePage: true }}
            customFilter="true"
            customFilterLabel="Filter by"
            customFilterCol={pr.statusName === 'All' ? columnsAllFilter : columnsFilter}
          />
        </ScreenLoader>
        {/*//# Support Worker View Details Modal*/}
        <ViewPDFInModal title={'View Support Worker Detailed File - ' + st.spName} show={st.visibleViewModal} close={() => this.setState({ visibleViewModal: false })} pdfPath={st.pdf_path} />
        {/*//# Reason to Reject Modal*/}
        <Modal
          width={416}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={'Reason to Reject'}
          visible={st.rejectReasonViewModal}
          onOk={() => this.setState({ rejectReasonViewModal: false })}
          onCancel={() => this.setState({ rejectReasonViewModal: false })}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ rejectReasonViewModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">Reason to Reject</span>
              <span className="sub-title">Reason to reject support worker</span>
            </div>
          </div>
          <AntInput name="reason2" type="textarea" style={{ height: '100px', color: '#2d2d2d' }} value={st.rejectViewReson} disabled={true} />
        </Modal>
        {/*//# Reject Status Modal*/}
        <Modal
          width={416}
          visible={st.rejectModalView}
          className="hide-footer"
          maskClosable={false}
          //title="Title"
          destroyOnClose={true}
          onCancel={() => this.setState({ rejectModalView: false })}
        >
          <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={(e) => this.changeStatus(st.selectedRowForReject, st.newStatusForReject, e)} autoComplete="off">
            <div className="dis-flex">
              <div className="m-r-20">
                <QuestionCircleOutlined className="fs-22 link-color" />
              </div>
              <div>
                <div className="fs-16 fw-500 p-b-8">Are you sure to change status for this applicant?</div>
                <div className="p-b-8">When clicked the Yes button, applicant status will be changed from <strong>{st.currentStatusForReject}</strong> to <strong>{st.newStatusForReject.name}</strong></div>
                <AntInput label="Reason" name="reason" placeholder="Please type some reason to reject" type="textarea" style={{ height: '100px' }} onChange={e => this.setState({ rejectReason: e })} />
                <div className="text-right">
                  <Button onClick={() => this.setState({ rejectModalView: false, rejectReason: '' })} >No</Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button type="primary" htmlType="submit">Yes</Button>
                </div>
              </div>
            </div>
          </Form>
        </Modal>
        {/*//# Hired status Modal*/}
        <Modal
          width={570}
          visible={st.hiredModalView}
          className="hide-footer"
          maskClosable={false}
          //title="Title"
          destroyOnClose={true}
          onCancel={() => this.setState({ hiredModalView: false })}
        >
          <Form className="form-style-1" ref={this.formRefHired} layout="vertical" onFinish={(e) => this.changeStatus(st.selectedRowForHired, st.newStatusForHired, e)} autoComplete="off">
            <div className="dis-flex">
              <div className="m-r-20">
                <QuestionCircleOutlined className="fs-22 link-color" />
              </div>
              <div>
                <div className="fs-16 fw-500 p-b-8">Are you sure to change status for this applicant?</div>
                <div className="p-b-8">When clicked the Yes button, applicant status will be changed from <strong>{st.currentStatusForHired}</strong> to <strong>{st.newStatusForHired.name}</strong></div>

                {(assignManager || multiCompany) ?
                  <>
                    <hr className="hr-1 m-b-15" />
                    <Row gutter={window.rowGutter}>
                      {multiCompany &&
                        <Col lg={assignManager ? 12 : 24} md={assignManager ? 12 : 24} sm={24} xs={24}>
                          <AntInput type="select" label="Company List" name="company_ref_id" options={pr.userCompanyList} setValueLabel={['id', 'company_name']} onChange={(e) => this.getManagerList(e)} loading={st.managerLoader} />
                        </Col>
                      }
                      {assignManager &&
                        <Col lg={multiCompany ? 12 : 24} md={multiCompany ? 12 : 24} sm={24} xs={24}>
                          <AntInput type="select" label="Select Manager" name="manager_ref_id" options={managerList} loading={st.getManagerListLoader} disabled={managerList.length === 0} />
                        </Col>
                      }
                    </Row>
                    <div className="text-right">
                      <Button onClick={() => this.setState({ hiredModalView: false })} >No</Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button type="primary" htmlType="submit">Yes</Button>
                    </div>
                  </>
                  :
                  <div className="text-right">
                    <Button onClick={() => this.setState({ hiredModalView: false })} >No</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary" htmlType="button" onClick={() => this.changeStatus(st.selectedRowForHired, st.newStatusForHired)}>Yes</Button>
                  </div>
                }
              </div>
            </div>
          </Form>
        </Modal>
      </div>
    )//End Return statement
  }//End End Render
}//End class

export default SupportWorkerMainLog;
