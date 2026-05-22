import React, { Component } from 'react';
import { Spin, Modal, Tooltip, Popconfirm, Button, Popover } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import StoreGet from '../../../store/get';
import StorePost from '../../../store/post';
import DataTable from '../../externalComponents/andt-data-table-component';
import { HTTP, GetUserData, SetUserData, DeleteRowFromList, AccessControl } from '../../services';
import CompanyForm from './form';
import ViewDetails from './partial/viewDetails';

class CompaniesLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      viewModal: false,
      editModal: false,
      viewDetailModal: false,
      viewData: {},
      dataUpdate: {},
      showImgModal: false,
      imageUrl: '',
      defaultLoader: {},
      viewSelectDefaultBranchModal: false,
      selectedCompanyRow: '',
      selectedCompanyBranches: '',
      deleteLoader: false
    }//End state
  }//End constructor

  getData = () => {
    this.setState({ loader: true });
    HTTP('get', '/companies/get/getData').then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.setState({ listData: res.data });
    });
  }//End function

  makeDefaultCompany = (row, branchId) => {
    //If there are more then one branch then select it
    if (!branchId && row.branches_ref_ids && row.branches_ref_ids.split(',').length > 1) {
      this.setState({ viewSelectDefaultBranchModal: true, selectedCompanyRow: row, selectedCompanyBranches: JSON.parse(row.branches_data) });
      return false;
    }//End if condition
    this.setState({ viewSelectDefaultBranchModal: false });
    let com_ref_id = row.id;
    let brc_ref_id = (branchId ? branchId : '1');
    let defaultLoader = this.state.defaultLoader;
    defaultLoader[row.id] = true;
    this.setState({ defaultLoader });
    HTTP('post', '/companies/post/makeDefault/com_ref_id/' + com_ref_id + '/brc_ref_id/' + brc_ref_id).then(res => {
      defaultLoader[row.id] = false;
      this.setState({ defaultLoader });
      if (!res) { return false; }
      this.getData();
      //Update default company============//
      row = { ...row };
      row.company_logo = row.company_logo ? (res.logo_path + row.company_logo) : '';
      let userUpdatedData = GetUserData();
      userUpdatedData.defaultCompany = row;
      this.props.post_stv('ud', userUpdatedData);
      SetUserData(userUpdatedData);
      //===================================//
    });
  }//End function

  deleteCompany = (row) => {
    this.setState({ deleteLoader: true });
    HTTP('get', '/companies/post/deleteCompany/' + row.id).then(res => {
      this.setState({ deleteLoader: false });
      if (!res) { return false; }

      if (res.failedDeleteStatus) {
        Modal.info({
          title: res.msgTitle,
          width: 590,
          content: (
            <table width="100%">
              <tbody>
                {
                  Object.keys(res.data).map(key => {
                    return (
                      <tr key={key}>
                        <td width="20%" valign="top"><strong>{key}:</strong></td>
                        <td width="80%" valign="top">{res.data[key].join(', ')}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          ),
          onOk() { },
        });
      } else {
        this.setState({ listData: DeleteRowFromList(this.state.listData, row.id) });
      }//End if condition

    });
  }//End function
  render() {
    const makeDefaultCompany = (record, row, isMobile = false) => (
      <div>
        {row.is_default ?
          <i className={`default-btn ${isMobile ? 'success-bg-color fs-32-imp' : 'success-color'} las la-check-circle`} />
          :
          (st.defaultLoader[row.id] ? <SyncOutlined spin /> :
            AccessControl(142) &&
            <Popconfirm
              title={<span>Are you sure to make {row.company_name} as default company?</span>}
              onConfirm={() => this.makeDefaultCompany(row)}
              okText="Yes"
              cancelText="No"
              placement="right"
            >
              <Tooltip placement="bottom" title="Click to make it default">
                <button className="btnToLink">
                  <i className={`default-btn ${isMobile ? 'lite-bg-color fs-32-imp' : 'lite-color'} las la-check-circle`} />
                </button>
              </Tooltip>
            </Popconfirm>
          )
        }
      </div>
    );
    const actionCol = (record, row, className = false) => (
      <div className={`text-center ${className}`}>
        {(window.webviewMobile && row.company_logo) &&
          <>
            <Button type="primary" ghost size="small" className="btn-approve" onClick={() => this.setState({ showImgModal: true, imageUrl: `${window.domainPath}/files/uploads/companies_logo/${row.company_logo}` })}>View Logo</Button>
            <i className="list_view_icon_sap las la-redo" />
          </>
        }
        {AccessControl(139) &&
          <>
            <button title="View Details" className="btnToLink btaColor" onClick={() => this.setState({ viewData: row, viewDetailModal: true })}><i className="fs-18 las la-table link-color" /></button>
            <i className="list_view_icon_sap las la-redo" />
          </>
        }
        {AccessControl(140) &&
          <>
            <button title="Edit" className="btnToLink btaColor" onClick={() => this.setState({ dataUpdate: row, editModal: true })}><i className="fs-18 las la-edit link-color" /></button>
            <i className="list_view_icon_sap las la-redo" />
          </>
        }
        {AccessControl(141) && (row.is_default ?
          <button title="Can not delete Default company" className="btnToLink btaColor" disabled><i className="fs-18 las la-ban link-color" /></button>
          :
          <Popconfirm
            title={<span>Are you sure to delete {row.company_name}?</span>}
            onConfirm={() => this.deleteCompany(row)}
            okText="Yes"
            cancelText="No"
            placement="right"
          >
            <button title="Delete" className="btnToLink btaColor"><i className="fs-18 las la-times-circle link-color" /></button>
          </Popconfirm>
        )}
      </div>
    );
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Default',
        dataIndex: 'is_default',
        align: 'center',
        width: '5%',
        render: (record, row) => makeDefaultCompany(record, row)
      }, {
        title: 'Company Name',
        dataIndex: 'company_name',
        width: '16%',
        sorter: (a, b) => a.company_name.length - b.company_name.length,
      }, {
        title: 'Phone/Mobile',
        dataIndex: 'company_phone_mobile',
        width: '9%',
        sorter: (a, b) => a.company_phone_mobile.length - b.company_phone_mobile.length,
        render: (record, row) => <div>{record ? record : '-'}</div>
      }, {
        title: 'Web Domain Name',
        dataIndex: 'company_domain_name',
        width: '15%',
        sorter: (a, b) => a.company_domain_name.length - b.company_domain_name.length,
        render: (record, row) => <div>{record ? record : '-'}</div>
      }, {
        title: 'Email Address',
        dataIndex: 'company_email',
        width: '17%',
        sorter: (a, b) => a.company_email.length - b.company_email.length,
        render: (record, row) => <div>{record ? record : '-'}</div>
      }, {
        title: 'Office Address',
        dataIndex: 'company_address',
        width: '19%',
        sorter: (a, b) => a.company_address.length - b.company_address.length,
        render: (record, row) => <div>{record ? record : '-'}</div>
      }, {
        title: 'Logo',
        dataIndex: 'company_logo',
        align: 'center',
        width: '5',
        render: (record, row) =>
          <div>
            {record ?
              <span>
                <button className="btnToLink link-color w-full" onClick={() => this.setState({ showImgModal: true, imageUrl: `${window.domainPath}/files/uploads/companies_logo/${record}` })}>View</button>
              </span>
              :
              <div className="text-center"><i className="la la-exclamation-circle pending-color fs-18" /></div>
            }
          </div>
      }, {
        title: 'Action',
        dataIndex: 'status',
        align: 'center',
        width: '9%',
        render: (record, row) => actionCol(record, row)
      }];

    //@ Mobile View Column
    const mobileCol = [
      {
        title: 'Company Name',
        dataIndex: 'company_name',
        width: '100%',
        className: 'mobile-col',
        render: (record, row) =>
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="icon">
                {makeDefaultCompany(record, row, true)}
              </div>
              <div className="data">
                <div className="main-value">{record}</div>
                <div className="sub-value">
                  <span className="label">Domain:</span>
                  <span className="value">{row.company_domain_name}</span>
                </div>
              </div>
            </div>
            <div className="action">
              <Popover content={actionCol(record, row, 'mobile-icon-menu-action')} trigger="click" placement="right">
                <Button size="small"><i className="las la-bars"></i></Button>
              </Popover>
            </div>
          </div>
      }];


    const st = this.state;
    return (
      <div className="company-container">

        {AccessControl(137) && <hr className="hr-1 m-b-16" />}

        <Spin tip="Loading..." spinning={st.loader}>
          <DataTable
            classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
            columns={window.webviewMobile ? mobileCol : columns}
            styleType={2}
            dataSource={st.listData}
            showSizeChanger={true}
            filter="true"
            pagination={{ itemDetails: true }}
          />
        </Spin>


        <Modal
          width={window.gjModalWidthLarge}
          className="hide-footer edit-company-modal"
          maskClosable={false}
          // title="Edit Company"
          visible={st.editModal}
          onOk={() => this.setState({ editModal: false })}
          onCancel={() => this.setState({ editModal: false })}
          footer={[]}
          destroyOnClose={true}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ editModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">Edit Company</span>
              <span className="sub-title">{this.state.dataUpdate.company_name}</span>
            </div>
          </div>
          {st.editModal &&
            <CompanyForm
              responsive={true}
              updateData={this.state.dataUpdate}
              closeModal={(e) => this.setState({ editModal: e })}
              loadData={() => this.props.loadData()}
            />
          }
        </Modal>

        <Modal
          width={window.gjModalWidth}
          className="hide-footer"
          maskClosable={false}
          // title="View Company Info"
          visible={st.viewDetailModal}
          onOk={() => this.setState({ viewDetailModal: false })}
          onCancel={() => this.setState({ viewDetailModal: false })}
          footer={[]}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ viewDetailModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title-for-view-details">
            <div>
              <span className="title">View Company Info</span>
              <span className="sub-title">Company view in detail</span>
            </div>
          </div>
          <ViewDetails data={st.viewData} />
        </Modal>

        <Modal
          width={window.gjModalWidthSmall}
          className="hide-footer"
          maskClosable={false}
          // title={`Select Default Branch for ${st.selectedCompanyRow.company_name}`}
          visible={st.viewSelectDefaultBranchModal}
          onOk={() => this.setState({ viewSelectDefaultBranchModal: false })}
          onCancel={() => this.setState({ viewSelectDefaultBranchModal: false })}
          footer={[]}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ viewSelectDefaultBranchModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">{`Select Default Branch for ${st.selectedCompanyRow.company_name}`}</span>
              <span className="sub-title">Set default branch with company</span>
            </div>
          </div>
          <table width="100%" border="0" className="strip-table">
            <thead>
              <tr>
                <th width="10%">Default</th>
                <th width="65%" align="left">Branch(s) Name</th>
                <th width="25%">Phone/Mobile Number</th>
                {/* <th width="20%">Mobile Number</th> */}
              </tr>
            </thead>
            <tbody>
              {st.selectedCompanyBranches && Object.keys(st.selectedCompanyBranches.branch).map((item, i) => {
                return (
                  <tr key={i}>
                    <td align="center">

                      <Popconfirm
                        title={<span>Are you sure to make this branch as default?</span>}
                        onConfirm={() => this.makeDefaultCompany(st.selectedCompanyRow, st.selectedCompanyBranches.id[i + 1])}
                        okText="Yes"
                        cancelText="No"
                        placement="right"
                      >
                        <Tooltip placement="left" title="Click to make it default">
                          <Button size='small'>Default</Button>
                        </Tooltip>
                      </Popconfirm>

                    </td>
                    <td style={{ textAlign: 'left' }}>&nbsp;{st.selectedCompanyBranches.branch[i + 1]}</td>
                    <td style={{ textAlign: 'center' }}>{st.selectedCompanyBranches.phone_mobile_number[i + 1]}</td>
                    {/* <td style={{ textAlign: 'center' }}>{st.selectedCompanyBranches.mobile_number[i + 1]}</td> */}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Modal>

        <Modal
          width={window.gjModalWidth}
          className="hide-footer show-image-modal"
          maskClosable={false}
          // title="Edit Company"
          visible={st.showImgModal}
          onOk={() => this.setState({ showImgModal: false })}
          onCancel={() => this.setState({ showImgModal: false })}
          footer={[]}
        >
          <img style={{ maxWidth: '300px' }} src={st.imageUrl} alt="" />
        </Modal>


      </div>
    )//End Return statement
  }//end End Render
  componentDidMount() {
    this.props.shareMethods(this.getData.bind(this));//Share method to parent
    this.getData();
  }//End componentDidMount
}//End class

export default connect(StoreGet, StorePost)(CompaniesLog);