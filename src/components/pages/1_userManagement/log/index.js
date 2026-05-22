import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Menu, Dropdown, Spin, Modal, Avatar } from 'antd';
import { TableOutlined, UserOutlined } from '@ant-design/icons';
import DataTable from '../../../externalComponents/andt-data-table-component';
import { HTTP, AccessControl } from '../../../services';
import PageTitle from '../../mutual/pageTitle';
import ScreenLoader from '../../../externalComponents/screen-loader';
import ViewDetails from './viewDetails';
import "../styles.less";

class UserLog extends Component {
  constructor(props) {
    super(props)
    this.state = { approvedLoader: {}, getDataLoader: false, listData: [], modalVisible: false, userViewData: [] };
  }//End constructor

  getData = () => {
    this.setState({ getDataLoader: true });
    HTTP('get', '/usersManagement/get/usersList').then(res => {
      //console.log(res);
      this.setState({ getDataLoader: false });
      if (!res) { return false; }
      this.setState({ listData: res.data });
    });
  }//End function


  approvedUnapproved = () => {
    let id = this.state.userViewData.id;
    let uvd = this.state.userViewData;
    // console.log(this.state.userViewData);
    this.setState({ approvedLoader: { 'id': id } });
    HTTP('get', '/usersManagement/post/approveAccount/id/' + id + '/status/' + (uvd.approve_status || 'false') + '/fullName/' + uvd.first_name + ' ' + uvd.last_name + '/email/' + uvd.email).then(res => {
      this.setState({ approvedLoader: { 'id': false } });
      if (!res) { return false; }
      this.getData();
    });
  }//End function


  showConfirm = () => {
    let th = this;
    let approve_status = this.state.userViewData.approve_status;
    Modal.confirm({
      title: `Do you want to ${approve_status ? 'unapproved' : 'approve'} this user?`,
      content: `When clicked the OK button, this user ${approve_status ? 'could not login' : 'will able to login'}.`,
      onOk() {
        th.approvedUnapproved();
      },
      onCancel() { },
    });
  }//End function

  componentDidMount() {
    this.getData();
  }//End componentDidMount

  render() {
    const menu = (
      <Menu className="list-dropdown">
        {AccessControl(147) && <Menu.Item key="0"><button className="btnToLink btaColor w-full" onClick={() => this.setState({ modalVisible: true })}><i className="las la-eye" /> View Details</button></Menu.Item>}
        {AccessControl(146) && <Menu.Item key="1" ><NavLink exact to={`/e/createUser/${this.state.userViewData.id}`}><i className="las la-user-edit" /> Edit User</NavLink></Menu.Item>}
        {AccessControl(145) &&
          <Menu.Item key="2" onClick={() => this.showConfirm()}>
            {this.state.userViewData.approve_status ?
              <span><i className="las la-exclamation-triangle" /> Unapproved</span> :
              <span><i className="las la-clipboard-check" /> Approve</span>
            }
          </Menu.Item>
        }
      </Menu>
    );
    const actionCol = (record, row) => (
      <div>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Button size="small" onClick={() => this.setState({ userViewData: row })}><TableOutlined /><i className="las la-caret-down p-l-5"></i></Button>
        </Dropdown>
      </div>
    );
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Img',
        dataIndex: 'profileImage',
        width: '5%',
        align: 'center',
        render: (text, row) =>
          <Avatar src={text} size="small" icon={<UserOutlined />} />
      }, {
        title: 'Full Name',
        dataIndex: 'first_name',
        width: '18%',
        sorter: (a, b) => a.first_name.length - b.first_name.length,
        render: (text, row) =>
          <button className="btnToLink w-full text-left" onClick={() => this.setState({ userViewData: row, modalVisible: true })}>{row.first_name} {row.last_name}</button>
      }, {
        title: 'Email Address',
        dataIndex: 'email',
        width: '23%',
        sorter: (a, b) => a.email.length - b.email.length,
      }, {
        title: 'Role',
        dataIndex: 'role_name',
        width: '11%',
        sorter: (a, b) => a.role_name.length - b.role_name.length,
      }, {
        title: 'Contact Number',
        dataIndex: 'contact_number',
        width: '14%',
        sorter: (a, b) => a.contact_number - b.contact_number,
        render: (text) =>
          <div>
            {text ? text : '-'}
          </div>
      }, {
        title: 'Account Status',
        dataIndex: 'status_name',
        width: '10%',
        sorter: (a, b) => a.status_name.length - b.status_name.length,
      }, {
        title: 'Approve',
        dataIndex: 'approve_status',
        width: '8%',
        align: 'center',
        sorter: (a, b) => a.approve_status.length - b.approve_status.length,
        render: (record, row) =>
          <div className="m-t-2">
            {this.state.approvedLoader.id === row.id ?
              <ScreenLoader active={true} inline={true} tip={" "} />
              :
              <i className={`fs-20 las la-${record ? 'check-circle success-color' : 'exclamation-circle pending-color'}`} />
            }
          </div>
      }];
    AccessControl('147,146,145') &&
      columns.push({
        title: 'Action',
        dataIndex: 'status',
        width: '6%',
        align: 'center',
        render: (record, row) => actionCol(record, row)
      });

    //@ Mobile View Column
    const mobileCol = [
      {
        title: 'Full Name',
        dataIndex: 'first_name',
        width: '100%',
        className: 'mobile-col',
        render: (record, row) =>
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="icon">
                <Avatar src={row.profileImage} size="small" icon={<UserOutlined />} />
              </div>
              <div className="data">
                <div className="main-value">{row.first_name} {row.last_name}</div>
                <div className="sub-value">
                  <span className="label">Role:</span>
                  <span className="value">{row.role_name}</span>
                  <span className="label">Status:</span>
                  <span className="value">{row.status_name}</span>
                </div>
              </div>
            </div>
            {AccessControl('147,146,145') && <div className="action">{actionCol(record, row)}</div>}
          </div>
      }];


    return (
      <div>
        <PageTitle
          titleIcon="las la-list"
          titleSpan="Users"
          titleHeading="Log"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-user-plus', label: 'Users Management' },
            { iconLas: 'las la-list', label: 'Users Log' }
          ]}
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          <Row gutter={40}>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Spin tip="Loading..." spinning={this.state.getDataLoader}>
                <DataTable
                  classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
                  columns={window.webviewMobile ? mobileCol : columns}
                  styleType={2}
                  dataSource={this.state.listData}
                  showSizeChanger={true}
                  filter="true"
                  filterCol={["key", "first_name", "username", "contact_number", "role_name"]}
                  pagination={{ itemDetails: true }}
                />
              </Spin>
            </Col>
          </Row>


          <Modal
            width={940}
            maskClosable={false}
            className="hide-footer"
            // title={this.state.userViewData.first_name + " " + this.state.userViewData.last_name}
            visible={this.state.modalVisible}
            onOk={() => this.setState({ modalVisible: false })}
            onCancel={() => this.setState({ modalVisible: false })}
            destroyOnClose={true}
          // footer={[
          //   <Button key={1} onClick={() => this.setState({ modalVisible: false })}>Close</Button>,
          // ]}
          >
            <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ modalVisible: false })}><i className="las la-times" /></button>
            <div className="modal-modern-title-for-view-details">
              <div>
                <span className="title">{this.state.userViewData.first_name + " " + this.state.userViewData.last_name}</span>
                <span className="sub-title">View User in Detail</span>
              </div>
            </div>
            <ViewDetails data={this.state.userViewData} />
          </Modal>
        </div>
      </div>
    );
  }
}

export default UserLog;