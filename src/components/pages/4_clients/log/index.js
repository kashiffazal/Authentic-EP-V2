import React, { Component } from 'react';
import PageTitle from '../../mutual/pageTitle';
import ViewPDFInModal from '../../mutual/viewPDFInModal';
import { Row, Col, Tabs, Button, Menu, Dropdown, Modal, Form, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ScreenLoader from '../../../externalComponents/screen-loader';
import DataTable from '../../../externalComponents/andt-data-table-component';
import { HTTP, LogResetList, LogDeleteRow, SaveArrLocalStorage, AccessControl, UCAFirst, SortArrayById, multidimensionalArraySeparateInstance, TableColumnFilter, TableColumnListForSelectFilter } from '../../../services';
import CarePlanModal from '../carePlan/carePlanModal';
import { AntInput } from '../../../externalComponents/antd-fields';


const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { confirm } = Modal;

class SupportWorkerLog extends Component {
  state = {
    getLoader: false,
    listData: [],
    statusLoader: {},
    statusList: [],
    visibleViewModal: false,
    pdf_path: '',
    clientName: '',
    carePlanShowModal: false,
    clientId: '',
    ads: {},//! App Default Settings,
    filterIndividualColArr: {},
    //Company Selection
    userCompanyList: [],
    activeWithCompanyModalView: false,
    activeStatus: '',
    selectedRowForCompanyAssign: '',
    assignCompanyLoader: false
  }//End state

  changeStatusConfirmModal = (row, status) => {
    let th = this;
    //@ If user change status as Active and there is no company assign, then active with assign company
    if (!row.company_ref_id && status.status === 'active') {
      this.setState({ activeWithCompanyModalView: true, activeStatus: status, selectedRowForCompanyAssign: row });
    } else {
      confirm({
        width: 430,
        title: 'Are you sure to change status for this client?',
        content: <div>When clicked the Yes button, client status will be changed from <strong>{UCAFirst(row.status.replace('_', ' '))}</strong> to <strong>{status.name}</strong></div>,
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
    this.setState({ statusLoader: statusLoaderObj, assignCompanyLoader: true });
    row.statusData = JSON.stringify(status);
    row = values ? { ...row, ...values } : row;
    HTTP('post', '/client/post/changeStatus', row).then(res => {
      statusLoaderObj[row.id] = false;
      this.setState({ statusLoader: statusLoaderObj, activeWithCompanyModalView: false, assignCompanyLoader: false });
      if (!res) return false;
      this.updateListOnChangeStatus(row, status, row.status);
    });
  }//End function

  updateListOnChangeStatus = (row, status, oldStatus) => {
    let newData = { ...this.state.listData };
    row.status = status.status;
    newData[oldStatus]['data'] = LogDeleteRow(row, [...this.state.listData[oldStatus]['data']]);
    newData[status.status]['data'] = LogResetList(row, [...this.state.listData[status.status]['data']]);
    //Set All Tab
    let allLabel = this.state.statusList[0]['status'];
    newData[allLabel]['data'] = this.makeAllList({ ...newData }, allLabel);
    this.setState({ listData: { ...this.state.listData, ...newData } });
  }//End function

  makeAllList = (data, allLabel) => {
    let listData = [];
    delete data[allLabel];
    Object.keys(data).forEach(i => { listData = listData.concat(multidimensionalArraySeparateInstance(data[i]['data'])); });
    listData = SortArrayById(listData);
    listData.forEach((i, k) => { listData[k]['key'] = (k + 1); });
    //It's mean first key which is 'All'
    return listData.reverse();
  }//End function

  setCol = (colSet = 0, status) => {
    const st = this.state;
    //@ Setting All Tabs Columns
    const columnAllTabActionCol = (record, row) => (
      this.state.statusLoader[row.id] ?
        <ScreenLoader active={this.state.statusLoader[row.id]} inline={true} tip=" " />
        :
        (row.status !== 'draft') ?
          <div>
            <Dropdown overlay={
              <Menu className="menu_btn p-r-30">
                {AccessControl(23) &&
                  <SubMenu key={0.1} title="Change Status as">
                    {st.statusList.map((item, i) => {
                      return (((item.status !== row.status) && item.status !== 'all' && item.status !== 'draft' && item.status !== 'mutual') && <Menu.Item key={i}><button className="p-r-20-imp btnToLink flex-sb" onClick={() => this.changeStatusConfirmModal(row, item)}><i className={'pos-relative top-3 p-r-4 ' + item.icon} /> {item.name}</button></Menu.Item>)
                    })}
                  </SubMenu>
                }
                {AccessControl('24,25') && <Menu.Divider />}
                {AccessControl(24) && <Menu.Item key={0.2}><button className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, "clientForm")}><i className="las la-edit" />Edit Data</button></Menu.Item>}
                {AccessControl(25) && <Menu.Item key={0.3}><button title="View Details" className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, pdf_path: row.pdf_path, clientName: row.name })}><i className="fs-18 las la-table" /> View Details</button></Menu.Item>}
              </Menu>
            } trigger={['click']} placement="bottomRight">
              <Button size="small"><i className="las la-bars"></i></Button>
            </Dropdown>
          </div>
          :
          AccessControl(24) && <button className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, "clientForm")}><i className="fs-18 las la-edit link-color" /></button>
    );
    //# Web View Column
    const columnsAllTab = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Name',
        dataIndex: 'name',
        width: '15%',
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'name', st.filterIndividualColArr[status])
      }, {
        title: 'Date of birth',
        dataIndex: 'dateOfBirth',
        width: '11%',
        sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'dateOfBirth', st.filterIndividualColArr[status])
      }, {
        title: 'Contact No',
        dataIndex: 'contactNumber',
        width: '11%',
        sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'contactNumber', st.filterIndividualColArr[status])
      }, {
        title: 'Email',
        dataIndex: 'email',
        width: '20%',
        sorter: (a, b) => a.email.localeCompare(b.email),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'email', st.filterIndividualColArr[status])
      }, {
        title: 'NDIS Number',
        dataIndex: 'ndisNumber',
        width: '11%',
        sorter: (a, b) => a.ndisNumber.localeCompare(b.ndisNumber),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'ndisNumber', st.filterIndividualColArr[status])
      }, {
        title: 'Suburb',
        dataIndex: 'suburb',
        width: '13%',
        sorter: (a, b) => a.suburb.localeCompare(b.suburb),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'suburb', st.filterIndividualColArr[status])
      }, {
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
        width: '7%',
        sorter: (a, b) => a.status.localeCompare(b.status),
        render: (record) => UCAFirst(record.replace('_', ' ')),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'status', st.filterIndividualColArr[status])
      }
    ];
    //# Push Action Data
    AccessControl('23,24,25') &&
      columnsAllTab.push({
        title: 'Action',
        align: 'center',
        width: '7%',
        render: (record, row) => columnAllTabActionCol(record, row)
      });
    //# Mobile View Column
    const columnsAllMobileCol = [{
      title: 'Name',
      dataIndex: 'name',
      width: '100%',
      className: 'mobile-col',
      render: (record, row) => {
        var contactNumber = (row.contactNumber && row.contactNumber !== '-') && row.contactNumber;
        var email = (row.email && row.email !== '-') && row.email;
        return (
          <div div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="icon">
                <Tooltip placement="topRight" title={st.listData[row.status].name} trigger='click'>
                  <i className={st.listData[row.status].mobileIcon ? st.listData[row.status].mobileIcon : st.listData[row.status].icon} style={{ background: st.listData[row.status].color }} />
                </Tooltip>
              </div>
              <div className="data">
                <div className="main-value">{record}</div>
                <div className="sub-value">
                  {(contactNumber || email) &&
                    <span className="value">
                      {contactNumber}
                      {(contactNumber && email) && ' | '}
                      {email}
                    </span>
                  }
                </div>
              </div>
            </div>
            {AccessControl('23,24,25') && <div className="action">{columnAllTabActionCol(record, row)}</div>}
          </div>
        )
      }
    }];

    //@ Setting Individual Columns
    //# Web View Column
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Name',
        dataIndex: 'name',
        width: '18%',
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'name', st.filterIndividualColArr[status])
      }, {
        title: 'Date of birth',
        dataIndex: 'dateOfBirth',
        width: '10%',
        sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'dateOfBirth', st.filterIndividualColArr[status])
      }, {
        title: 'Contact No',
        dataIndex: 'contactNumber',
        width: '10%',
        sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'contactNumber', st.filterIndividualColArr[status])
      }, {
        title: 'Email',
        dataIndex: 'email',
        width: '20%',
        sorter: (a, b) => a.email.localeCompare(b.email),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'email', st.filterIndividualColArr[status])
      }, {
        title: 'NDIS Number',
        dataIndex: 'ndisNumber',
        width: '10%',
        sorter: (a, b) => a.ndisNumber.localeCompare(b.ndisNumber),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'ndisNumber', st.filterIndividualColArr[status])
      }, {
        title: 'Suburb',
        dataIndex: 'suburb',
        width: '13%',
        sorter: (a, b) => a.suburb.localeCompare(b.suburb),
        ...TableColumnFilter(st.ads.tableIndividualColFilter, 'suburb', st.filterIndividualColArr[status])
      }
    ];
    //#Care Plan Column
    AccessControl('26,27') &&
      columns.push({
        title: 'Care Plan',
        align: 'center',
        width: '8%',
        render: (record, row) =>
          <button className="btnToLink" onClick={() => this.setState({ carePlanShowModal: true, clientId: row.id })}><i className="fs-18 las la-file-alt link-color" /></button>
      });
    //# Push Action Data
    AccessControl('23,24,25') &&
      columns.push({
        title: 'Action',
        align: 'center',
        width: '7%',
        render: (record, row) => columnAllTabActionCol(record, row)
      });
    const columnsMobileCol = columnsAllMobileCol;

    var res = window.webviewMobile ? [columnsAllMobileCol, columnsMobileCol] : [columnsAllTab, columns];
    // console.log(res);
    return res[colSet];
  }//End function


  render() {
    const st = this.state;
    return (
      <div>
        <PageTitle
          titleIcon="las la-th-list"
          titleSpan="Client"
          titleHeading="Log"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-id-card', label: 'Clients' },
            { iconLas: 'las la-arrow-alt-circle-down', label: 'CL Form' },
            { iconLas: 'las la-th-list', label: 'Log' }
          ]} />
        <div className={window.webviewMobile ? '' : 'container'}>
          <ScreenLoader active={st.getLoader}>
            {st.getLoader && <div className="h-200" />}
            {st.listData &&
              <Tabs type="card" defaultActiveKey="1">
                {Object.keys(st.listData).map((item, index) => {
                  //@ Avoid Mutual tab if it's empty
                  return (
                    !(item === 'mutual' && st.listData[item].data.length === 0) &&
                    <TabPane tab={<span><i className={st.listData[item].icon} style={{ color: st.listData[item].color }} /> {st.listData[item].name} ({(st.listData[item].data.length)})</span>} key={(index + 1)}>
                      {/* {JSON.stringify(item)} */}
                      <DataTable
                        classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
                        columns={index === 0 ? this.setCol(0, item) : this.setCol(1, item)}
                        styleType={2}
                        dataSource={st.listData[item].data}
                        showSizeChanger={true}
                        pagination={{ itemDetails: true, showOnSinglePage: true }}
                        customFilter="true"
                        customFilterLabel="Filter by"
                        customFilterCol={[
                          { label: 'Name', value: 'name' },
                          { label: 'Date of Birth', value: 'dateOfBirth' },
                          { label: 'Contact No', value: 'contactNumber' },
                          { label: 'Email', value: 'email' },
                          { label: 'NDIS Number', value: 'ndisNumber' },
                          { label: 'Suburb', value: 'suburb' }
                        ]}
                      />
                    </TabPane>
                  )
                })}
              </Tabs>
            }
          </ScreenLoader>
          <ViewPDFInModal title={'View Client Detailed File - ' + st.clientName} show={st.visibleViewModal} close={() => this.setState({ visibleViewModal: false })} pdfPath={st.pdf_path} />
          <CarePlanModal show={st.carePlanShowModal} clientId={st.clientId} onClose={() => this.setState({ carePlanShowModal: false })} />


          {/*//# Change status as Active with Assigning Company*/}
          <Modal
            width={430}
            visible={st.activeWithCompanyModalView}
            className="hide-footer"
            maskClosable={false}
            //title="Title"
            destroyOnClose={true}
            onCancel={() => this.setState({ activeWithCompanyModalView: false })}
          >
            <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ activeWithCompanyModalView: false })}><i className="las la-times" /></button>
            <div className="modal-modern-title">
              <div>
                <span className="title">Assign Company</span>
                <span className="sub-title">Link the company with client</span>
              </div>
            </div>
            <Form className="form-style-1" ref={this.formRefHired} layout="vertical" onFinish={(e) => this.changeStatus(st.selectedRowForCompanyAssign, st.activeStatus, e)} autoComplete="off">
              <div className="dis-flex">
                <div className="m-r-20">
                  <QuestionCircleOutlined className="fs-22 link-color" />
                </div>
                <div>
                  <div className="fs-16 fw-500 p-b-8">Are you sure to change status for this client?</div>
                  {st.selectedRowForCompanyAssign && <div className="p-b-8">When clicked the Yes button, client status will be changed from <strong>{UCAFirst(st.selectedRowForCompanyAssign.status)}</strong> to <strong>{st.activeStatus.name}</strong></div>}
                  <hr className="hr-1 m-b-15" />
                  <Row gutter={window.rowGutter}>
                    <Col lg={24} md={24} sm={24} xs={24}>
                      <AntInput type="select" label="Company List" name="company_ref_id" options={st.userCompanyList} setValueLabel={['id', 'company_name']} />
                    </Col>
                  </Row>
                  <div className="text-right">
                    <Button onClick={() => this.setState({ activeWithCompanyModalView: false })} >No</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary" htmlType="submit" loading={st.assignCompanyLoader}>Yes</Button>
                  </div>
                </div>
              </div>
            </Form>
          </Modal>

        </div>
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    this.setState({ getLoader: true });
    HTTP('get', '/client/get/getList/').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      let allLabel = res.status_list[0]['status'];
      res.data['all']['data'] = this.makeAllList({ ...res.data }, allLabel);
      this.setState({ listData: res.data, statusList: res.status_list, ads: res.appDefaultSetting, userCompanyList: res.userCompanyList }, () => {
        //@ If individual filter in ON
        if (this.state.ads.tableIndividualColFilter.allow && this.state.ads.tableIndividualColFilter.filterByTypeOrSelect === 'select') {
          // console.log(res.data);
          let filterIndividualColArr = {};
          Object.keys(res.data).forEach(element => {
            filterIndividualColArr[element] = TableColumnListForSelectFilter(res.data[element]['data']);
          });
          this.setState({ filterIndividualColArr });
        }//End if condition
      });
    });
  }//End componentDidMount
}//End class

export default SupportWorkerLog;
