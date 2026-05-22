import React, { Component } from 'react';
import PageTitle from '../mutual/pageTitle';
import { Button, Modal, Dropdown, Menu, Tabs, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ScreenLoader from '../../externalComponents/screen-loader';
import DataTable from '../../externalComponents/andt-data-table-component';
import { HTTP, LogResetRow, LogResetList, LogDeleteRow, AccessControl, SortableDateInTableData } from '../../services';
import ViewTeamDetails from './viewDetails';
import TeamForm from './teamForm';

const { TabPane } = Tabs;
const { confirm } = Modal;

class TeamLog extends Component {
  state = {
    loader: false,
    visibleFormModal: false,
    visibleViewModal: false,
    listData: null,
    statusLoader: {},
    editData: null,
    viewData: {},
    countryList: []
  };

  changeStatusConfirmModal = (row, status) => {
    let th = this;
    confirm({
      title: 'Are you sure to change status as ' + status + ' for this menber?',
      content: <div>When clicked the Yes button, status will be changed from <strong>{row.teamStatus}</strong> to <strong>{status}</strong></div>,
      okText: "Yes",
      cancelText: "No",
      onOk() { th.changeStatus(row, status) },
      onCancel() { },
    });
  }//End if condition

  changeStatus = (row, status) => {
    let statusLoaderObj = {};
    statusLoaderObj[row.id] = true;
    this.setState({ statusLoader: statusLoaderObj });
    row.statusData = JSON.stringify(status);
    //this.updateListOnChangeStatus(row, status, row.teamStatus);
    //return false;
    HTTP('post', '/team/post/changeStatus', row).then(res => {
      statusLoaderObj[row.id] = false;
      this.setState({ statusLoader: statusLoaderObj });
      if (!res) return false;
      //console.log(res);
      this.updateListOnChangeStatus(row, status, row.teamStatus);
    });
  }//End function

  updateListOnChangeStatus = (row, status, oldStatus) => {
    // console.log(row);
    // console.log(status);
    // console.log(oldStatus);
    let newData = { ...this.state.listData };
    // console.log(newData);
    row['teamStatus'] = status;
    newData[oldStatus]['data'] = LogDeleteRow(row, [...this.state.listData[oldStatus]['data']]);
    newData[status]['data'] = LogResetList(row, [...this.state.listData[status]['data']]);
    this.setState({ listData: { ...this.state.listData, ...newData } });
  }//End function

  updateOrAddData = (action, values) => {
    let data = { ...this.state.listData };
    var newData = [];
    if (action === 'add') {
      newData = LogResetList(values, this.state.listData['active']['data']);
      data['active']['data'] = newData;
    }//End if condtion
    if (action === 'update') {
      //@ If there is no profile image then delete this variable other wise image will be update empty
      values.profileImg === "" && delete values.profileImg;
      newData = LogResetRow(values, this.state.listData[this.state.editData.teamStatus]['data']);
      data[this.state.editData.teamStatus]['data'] = newData;
    }//End if condition
    //console.log(data);
    this.setState({ listData: data });
  }//End if condition

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
    const actionCol = (record, row) => (
      this.state.statusLoader[row.id] ?
        <ScreenLoader active={this.state.statusLoader[row.id]} inline={true} tip=" " />
        :
        <div>
          <Dropdown overlay={
            <Menu className="menu_btn">
              {((row.teamStatus === 'active' && AccessControl(14)) || (row.teamStatus === 'deleted' && AccessControl(18))) && <Menu.Item key={1} disabled><div className="label p-r-30">Change Status</div></Menu.Item>}
              {((row.teamStatus === 'active' && AccessControl(14)) || (row.teamStatus === 'deleted' && AccessControl(18))) && <Menu.Divider />}
              {((row.teamStatus === 'active' && AccessControl(14)) || (row.teamStatus === 'deleted' && AccessControl(18))) && <Menu.Item key={2} disabled={row.teamStatus === 'active'}><button disabled={row.teamStatus === 'active'} className="btnToLink flex-sb p-t-5-imp" onClick={() => this.changeStatusConfirmModal(row, 'active')}><div>Active</div><div>{row.teamStatus === 'active' && <i className="las la-check-circle status-active-color" />}</div></button></Menu.Item>}
              {((row.teamStatus === 'active' && AccessControl(14)) || (row.teamStatus === 'deleted' && AccessControl(18))) && <Menu.Item key={3} disabled={row.teamStatus === 'deleted'}><button disabled={row.teamStatus === 'deleted'} className="btnToLink flex-sb p-t-5-imp" onClick={() => this.changeStatusConfirmModal(row, 'deleted')}><div>Delete</div><div>{row.teamStatus === 'deleted' && <i className="las la-check-circle status-active-color" />}</div></button></Menu.Item>}
              {((row.teamStatus === 'active' && AccessControl(14)) || (row.teamStatus === 'deleted' && AccessControl(18))) && <Menu.Divider />}
              {((row.teamStatus === 'active' && AccessControl(15)) || (row.teamStatus === 'deleted' && AccessControl(19))) && <Menu.Item key={4}><button className="btnToLink" onClick={() => this.visibleEditForm(row)}><i className="las la-edit" />Edit Member</button></Menu.Item>}
              {((row.teamStatus === 'active' && AccessControl(16)) || (row.teamStatus === 'deleted' && AccessControl(20))) && <Menu.Item key={5}><button className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, viewData: row })}><i className="las la-table" />View Details</button></Menu.Item>}
            </Menu>
          } trigger={['click']} placement="bottomRight">
            <Button size="small"><i className="las la-bars"></i></Button>
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
        title: 'IMG',
        dataIndex: 'profileImg',
        width: '5%',
        align: 'center',
        render: (record, row) => <Avatar shape="square" size={30} icon={<UserOutlined />} src={record} style={{ border: '1px solid #aaaaaa', 'borderRadius': '3px' }} />
      }, {
        title: 'Name',
        dataIndex: 'name',
        width: '20%',
        sorter: (a, b) => a.name.localeCompare(b.name),
      }, {
        title: 'Position',
        dataIndex: 'teamPosition',
        width: '16%',
        sorter: (a, b) => a.teamPosition.localeCompare(b.teamPosition),
      }, {
        title: 'Country of Birth',
        dataIndex: 'bornCountryName',
        width: '16%',
        sorter: (a, b) => a.bornCountryName.localeCompare(b.bornCountryName),
      }, {
        title: 'Languages can speak',
        dataIndex: 'otherLanguageSpeak',
        width: '18%',
        sorter: (a, b) => a.otherLanguageSpeak.localeCompare(b.otherLanguageSpeak)
      }, {
        title: 'Inserted Date',
        dataIndex: 'inserted_date',
        width: '15%',
        sorter: SortableDateInTableData('inserted_date')
      }
    ];
    AccessControl('14,15,16,18,19,20') &&
      columns.push({
        title: 'Action',
        align: 'center',
        width: '5%',
        render: (record, row) => actionCol(record, row)
      })

    //@ Mobile View Column
    const mobileCol = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '100%',
        className: 'mobile-col',
        render: (record, row) =>
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="icon">
                <Avatar icon={<UserOutlined />} src={row.profileImg} style={{ border: '1px solid #aaaaaa' }} />
              </div>
              <div className="data">
                <div className="main-value">{record}</div>
                <div className="sub-value">
                  <span className="label">Position:</span>
                  <span className="value">{row.teamPosition}</span>
                  {/* <span className="label">Timing:</span>
                  <span className="value">{row.timing}</span> */}
                </div>
                {/* <div className="foot-value">
                <span className="label">Inserted Date:</span>
                <span className="value">{row.inserted_by_date}</span>
              </div> */}
              </div>
            </div>
            {AccessControl('14,15,16,18,19,20') && <div className="action">{actionCol(record, row)}</div>}
          </div>
      }];

    return (
      <div>
        <PageTitle
          titleIcon="las la-users"
          titleSpan="Team"
          titleHeading="Member"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[{ iconLas: 'las la-users', label: 'Team Member' }]}
          render={AccessControl(12) && !(AccessControl(12) && !AccessControl(13) && !AccessControl(17)) && <Button size="large" type="primary" onClick={() => this.visibleForm()}>Add New Member</Button>}
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          {(AccessControl(12) && !AccessControl(13) && !AccessControl(17)) &&
            <TeamForm
              // fp={this.props.form}
              countryList={st.countryList}
              data={this.state.editData}
              closeModal={() => this.setState({ visibleFormModal: false, editData: null })}
              addData={(values) => { this.updateOrAddData('add', values) }}
              updateData={(values) => { this.updateOrAddData('update', values) }}
            />
          }

          {(AccessControl(13) || AccessControl(17)) &&
            <ScreenLoader active={st.loader}>
              {st.listData &&
                <Tabs type="card" defaultActiveKey="1">
                  {Object.keys(st.listData).map((item, index) => {
                    return (
                      <TabPane tab={<span><i className={st.listData[item].icon} /> {st.listData[item].name} ({(st.listData[item].data.length)})</span>} key={(index + 1)}>
                        <DataTable
                          classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
                          columns={window.webviewMobile ? mobileCol : columns}
                          styleType={2}
                          dataSource={st.listData[item].data}
                          showSizeChanger={true}
                          pagination={{ itemDetails: true, showOnSinglePage: true }}
                          customFilter="true"
                          customFilterLabel="Filter by"
                          customFilterCol={[
                            { label: 'Name', value: 'name' },
                            { label: 'Position', value: 'teamPosition' },
                            { label: 'Country of Birth', value: 'bornCountry' },
                            { label: 'Languages can speak', value: 'otherLanguageSpeak' },
                            { label: 'Inserted Date', value: 'status' }
                          ]}
                        />
                      </TabPane>
                    )
                  })}
                </Tabs>
              }
            </ScreenLoader>
          }
        </div>
        <Modal
          width={740}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={'Team Member Details'}
          visible={st.visibleViewModal}
          onOk={() => this.setState({ visibleViewModal: false })}
          onCancel={() => this.setState({ visibleViewModal: false })}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ visibleViewModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title-for-view-details">
            <div>
              <span className="title">Team Member Details</span>
              <span className="sub-title">View member in detail</span>
            </div>
          </div>
          <ViewTeamDetails data={this.state.viewData} />
        </Modal>

        <Modal
          width={800}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={'Team Member Form'}
          visible={st.visibleFormModal}
          onOk={() => this.setState({ visibleFormModal: false })}
          onCancel={() => this.setState({ visibleFormModal: false })}
          destroyOnClose={true}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ visibleFormModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">Team Member Form</span>
              <span className="sub-title">Insert of Update Team Member</span>
            </div>
          </div>
          <TeamForm
            // fp={this.props.form}
            countryList={st.countryList}
            data={this.state.editData}
            closeModal={() => this.setState({ visibleFormModal: false, editData: null })}
            addData={(values) => { this.updateOrAddData('add', values) }}
            updateData={(values) => { this.updateOrAddData('update', values) }}
          />
        </Modal>
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    this.setState({ loader: true });
    HTTP('get', '/team/get/getList').then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ listData: res.data, countryList: res.countryList });
    });
  }//End componentDidMount
}//End class

export default TeamLog;
