import React, { Component } from 'react';
import { Row, Col, Form, Button, Modal, Tooltip } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import StoreGet from '../../../store/get';
import StorePost from '../../../store/post';
import { AntInput, AntFileUpload } from '../../externalComponents/antd-fields';
// import UploadFile from '../../externalComponents/antd-upload-file-component';
import MultipleBranches from './partial/branches';
import { HTTP, isJSON, setFormStateValues, GetUserData, SetUserData } from '../../services';

import './style.less';

class CompaniesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      data: null,
      showImgModal: false,
      formValues: {},
      branches: false,
      branchesData: null
    }//End state
  }//End constructor
  formRef = React.createRef();
  submitForm = (values) => {
    values = this.state.formValues;
    // e.preventDefault();
    // this.formRef.current.validateFields((err, values) => {
    //   if (!err) {
    if (values.company_logo && this.props.updateData && this.props.updateData.company_logo) {
      values.oldLogo = this.props.updateData.company_logo;
    }//End if condition
    !values.company_logo && delete values.company_logo;
    // console.log(this.state.branchesData);
    if (values.branches_data && !isJSON(values.branches_data)) { values.branches_data = JSON.stringify(values.branches_data) }
    this.setState({ loader: true });
    HTTP('post', '/companies/post/postData', values).then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.formRef.current.resetFields();
      if (this.state.data) {
        this.props.closeModal(false);//Update Item
        //Update default company============//
        if (this.props.updateData.is_default && res.new_logo) {
          values.company_logo = res.new_logo;
          let userUpdatedData = GetUserData();
          userUpdatedData.defaultCompany = values;
          this.props.post_stv('ud', userUpdatedData);
          SetUserData(userUpdatedData);
        }//End If condition
        //===================================//
      }//End if condition
      this.props.loadData && this.props.loadData();
      //This props is set by PO or SO form as Modal
      if (this.props.addCompanyData) {
        this.props.addCompanyData({ id: res.id, company_name: values.company_name })
        this.props.closeModal();
      }//End if condition
    });
    //   }//End if condition
    // });//End form properties
  }//End function

  onChangeField = (fieldName, fieldValue) => {
    this.setState({ formValues: setFormStateValues(this.state.formValues, fieldName, fieldValue) }, () => {
      //console.log(this.state.formValues);
    })
  }//End function

  setOnLoad = () => {
    var row = this.props.updateData;
    if (row) {
      var updateData = {
        id: row.id,
        company_name: row.company_name,
        company_phone_mobile: row.company_phone_mobile,
        // company_mobile: row.company_mobile,
        company_email: row.company_email,
        company_address: row.company_address,
        company_domain_name: row.company_domain_name,
      }//End if condition
      // console.log(row.branches_data);
      this.setState({
        data: updateData,
        formValues: updateData,
        branchesData: row.branches_data,
        branches: row.branches_data
      }, () => { this.formRef.current.setFieldsValue(this.state.data); });
    }//End if condition
  }//End function

  render() {
    // const fp = this.formRef.current;
    const prr = this.props.responsive;
    const st = this.state;
    const logo = (this.props.updateData && this.props.updateData.company_logo);
    const br = st.branches;
    const fp = this.formRef.current;
    return (
      <div className="company-container">
        <Form layout="vertical" className="form-style-1" ref={this.formRef} onFinish={this.submitForm}>
          <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />

          <Row gutter={window.rowGutter}>
            <Col lg={prr ? 5 : 4} md={6} sm={24} xs={24}>
              <AntFileUpload
                name="company_logo"
                containerClassName="uploadLogoInput"
                icon={<CloudUploadOutlined />}
                noRequired={true}
                onChange={(e) => this.onChangeField('company_logo', e)}
                heading={<span className="fs-12">Click or drag file to upload<br /><span className="fs-11">Size 145px 45px</span></span>}
              />
              {logo &&
                <div className="view-logo">
                  <button type="button" className="btnToLink link-color" onClick={() => this.setState({ showImgModal: true })}>View Logo</button>
                </div>
              }
            </Col>
            <Col lg={prr ? 19 : 20} md={18} sm={24} xs={24}>

              <Row gutter={window.rowGutter}>
                <Col lg={8} md={8} sm={12} xs={24}>
                  <AntInput name="company_name" label="Company Name" placeholder="Please type company name" onChange={(e) => this.onChangeField('company_name', e)} />
                </Col>
                <Col lg={8} md={8} sm={12} xs={24}>
                  <AntInput name="company_phone_mobile" label="Company Phone/Mobile" placeholder="Please type contact number" onChange={(e) => this.onChangeField('company_phone_mobile', e)} />
                </Col>
                {/* <Col lg={8} md={8} sm={12} xs={24}>
                  <AntInput name="company_mobile" label="Company Mobile" placeholder="Please type contact number" onChange={(e) => this.onChangeField('company_mobile', e)} />
                </Col> */}
                <Col lg={8} md={8} sm={12} xs={24}>
                  <AntInput name="company_email" label="Company Email" type="email" placeholder="Please type email" onChange={(e) => this.onChangeField('company_email', e)} />
                </Col>
                <Col lg={8} md={8} sm={12} xs={24}>
                  <AntInput name="company_address" label="Office Address" placeholder="Please type address" onChange={(e) => this.onChangeField('company_address', e)} />
                </Col>
                <Col lg={8} md={8} sm={12} xs={24}>
                  <AntInput name="company_domain_name" label="Web Domain Name" placeholder="Please type web domain name" onChange={(e) => this.onChangeField('company_domain_name', e)} />
                </Col>
                <Col lg={br ? 8 : 4} md={br ? 8 : 4} sm={br ? 12 : 6} xs={24}>
                  <Tooltip placement="top" title={"Add branches"}>
                    <Button className="btn_label_space btn_side_by_side w-full" type="primary" ghost onClick={() => {
                      this.setState({ branches: !st.branches, branchesData: '' }); this.onChangeField('branches_data', '')
                    }}>
                      <i className="las la-plus-circle fs-16 pos-relative top-1" />
                      {!window.justTabletScreen && <span>{!br ? ' Add Branches' : ' Remove All Branches'}</span>}
                    </Button>
                  </Tooltip>
                </Col>
                {!br &&
                  <Col lg={4} md={4} sm={6} xs={24}>
                    <Button className="btn_label_space btn_side_by_side w-full" htmlType="submit" type="primary" loading={this.state.loader}>
                      {this.state.data ? 'Update' : 'Add'}
                      {!window.justTabletScreen && ' Company'}
                    </Button>
                  </Col>
                }
              </Row>
              {br &&
                <div>
                  <MultipleBranches fp={fp} data={st.branchesData} onChange={(e) => this.onChangeField('branches_data', e)} />
                  <Button className="m-t-5 m-b-5 btn_side_by_side w-full" htmlType="submit" type="primary" loading={this.state.loader}>Add Company with Branches</Button>
                </div>
              }
            </Col>
          </Row>
        </Form>
        <Modal
          width={991}
          className="hide-footer show-image-modal"
          maskClosable={false}
          title="Edit Company"
          visible={st.showImgModal}
          onOk={() => this.setState({ showImgModal: false })}
          onCancel={() => this.setState({ showImgModal: false })}
          footer={[]}
        >
          {logo &&
            <img style={{ maxWidth: '300px' }} src={`${window.domainPath}/files/uploads/companies_logo/${this.props.updateData.company_logo}`} alt="" />
          }
        </Modal>
      </div>
    );//End return
  }//End render

  componentDidMount() {
    this.setOnLoad();
  }//End componentDidMount
  componentDidUpdate(prevProps) {
    if (prevProps.updateData !== this.props.updateData) {
      this.setOnLoad();
    }//end if condition
  }//End componentDidUpdate
}//End class

export default connect(StoreGet, StorePost)(CompaniesForm);