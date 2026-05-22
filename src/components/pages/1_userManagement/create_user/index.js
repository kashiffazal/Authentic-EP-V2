import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert } from 'antd';
import UploadImage from '../../../externalComponents/andt-upload-and-crop-image-component'
import { AntInput } from '../../../externalComponents/antd-fields';
import RecentUsers from '../widget/recent_users';
import { HTTP, GetObjectFromArr, RandomAlphaNumber } from '../../../services';
import PageTitle from '../../mutual/pageTitle';
import '../styles.less';
class UserForm extends Component {
  state = {
    loader: false,
    spwGetLoader: false,
    spwList: [],
    linkId: '',
    btnLoader: false,
    roleListArr: [],
    statusListArr: [],
    companyListArr: [],
    branchListArr: [],
    updateStatus: false,
    refreshRecentUserWidget: false,
    profileOldImgName: '',
    profileImageCurrent: '',
    profileImageNew: '',
    getFormData: {}
  };

  formRef = React.createRef();

  submitForm = (values) => {
    this.state.profileOldImgName && (values.profileOldImgName = this.state.profileOldImgName);
    this.state.profileImageNew && (values.profileImageCurrent = this.state.profileImageNew);

    values.link_id = this.state.linkId ? this.state.linkId : this.state.getFormData.link_id;
    values.full_name = this.state.spwList.length > 0 ? GetObjectFromArr(values.full_name, 'value', this.state.spwList).label : values.full_name;

    values.username = values.username_cu;
    values.password = values.password_cu;
    delete values.username_cu;
    delete values.password_cu;

    this.setState({ btnLoader: true });
    HTTP('post', '/usersManagement/post/addUser', values).then(res => {
      //console.log(values);
      this.setState({ btnLoader: false });
      if (!res) { return false; }
      if (this.state.updateStatus) {
        this.props.history.push('/e/usersLog');
      } else {
        this.formRef.current.resetFields();
        this.setState({ refreshRecentUserWidget: true, spwList: [] });
      }//End if condition
    });
    //   }//End if condition
    // });//End form properties
  }//End function

  getRoles = (callBack = false) => {
    this.setState({ loader: true });
    HTTP('get', '/usersManagement/get/roleList').then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.setState({
        'roleListArr': res.data,
        'statusListArr': res.status_data,
        'companyListArr': res.company_data
      }, () => {
        if (callBack) {
          callBack(this.state.getFormData.role);
          this.formRef.current.setFieldsValue({ full_name: this.state.getFormData.link_id });
        }//End if condition
      });
    });
  }//End function

  getBranch = (companyIdArr) => {
    let comList = this.state.companyListArr;
    let branchListArr = [];
    this.setState({ branchListArr: [] });
    //Get Branches from all selected company
    companyIdArr.forEach(companyId => {
      for (let i = 0; i < comList.length; i++) {
        if (companyId === comList[i].value && comList[i].branches) { comList[i].branches.forEach(element => { branchListArr.push(element); }); }//End if condition
      }//End for loop
    });
    this.setState({ branchListArr: branchListArr }, () => {
      //Remove specific branches from field after unselect a company
      let branch_ref_id = this.formRef.current.getFieldValue('branch_ref_id');
      if (branch_ref_id) {
        let selectedBranch = []
        branchListArr.forEach(v => { if (branch_ref_id.includes(v.value)) { selectedBranch.push(v.value); } });//End foreach
        this.formRef.current.setFieldsValue({ branch_ref_id: selectedBranch });
      }//End if condition
    });
  }//End function

  getUserData = (id) => {
    // console.log(id, callBack);
    this.setState({ loader: true });
    HTTP('get', '/usersManagement/get/userData/id/' + id).then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.setState({ getFormData: { ...res.data } }, () => {
        res.data.link_id && this.setState({ linkId: res.data.link_id });
        delete res.data.link_id;
        this.formRef.current.setFieldsValue(res.data);
        this.state.getFormData.link_id ? this.getRoles(this.checkListRole) : this.getRoles();
        this.getBranch(res.data.company_ref_ids);
        this.setState({ profileOldImgName: res.data.profileImage, profileImageCurrent: res.data.profileImageCurrent });
      });
    });
  }//End function

  checkListRole = (id) => {
    // alert(id, this.state.roleListArr);
    if (GetObjectFromArr(id, 'value', this.state.roleListArr).linkRole === 'SPW') {
      this.formRef.current.setFieldsValue({ full_name: '' });
      this.getSPWdata();
    } else {
      if (this.state.linkId) {
        this.formRef.current.setFieldsValue({ full_name: GetObjectFromArr(this.state.linkId, 'value', this.state.spwList).label });
      }//End if condition
      this.setState({ spwList: [], linkId: '' });
    }//End if condition
  }//End if condition

  getSPWdata = () => {
    this.setState({ spwGetLoader: true });
    HTTP('get', '/usersManagement/get/spwList/').then(res => {
      this.setState({ spwGetLoader: false });
      if (!res) { return false; }
      this.setState({ spwList: res.data });
      //this.props.form.setFieldsValue(res.data);
    });
  }//End function

  onSelectSPW = (id) => {
    let data = GetObjectFromArr(id, 'value', this.state.spwList);
    this.formRef.current.setFieldsValue({
      email: data.email,
      username_cu: data.email,
      password_cu: data.email ? RandomAlphaNumber() : ''
    });
    this.setState({ linkId: data.value });
  }//End function

  render() {
    const st = this.state;
    const moreThenOneCompany = (st.companyListArr.length > 1);
    const moreThenOneBranch = (st.branchListArr.length > 1);
    return (
      <div>
        <PageTitle
          titleIcon="las la-user-plus"
          titleSpan="Create"
          titleHeading="New User"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-user-plus', label: 'Users Management' },
            { iconLas: 'las la-plus', label: 'Create New User' }
          ]}
        />
        <Row gutter={window.rowGutter}>
          <Col lg={19} md={18} sm={24} xs={24}>
            <div className="container">
              <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
                <div className="user-form-container">
                  <div className="profile-img">
                    <UploadImage defaultImageUrl={st.profileImageNew ? st.profileImageNew : st.profileImageCurrent} onChange={(e) => this.setState({ profileImageNew: e })} type="image" imageType="square" />
                  </div>
                  <div className="form-field">
                    <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
                    <input autoComplete="false" name="hidden" type="text" style={{ 'display': 'none' }} />

                    <Row gutter={window.rowGutter}>
                      <Col lg={8} md={24} sm={24} xs={24}>
                        <AntInput type="select" label="Role" name="role" options={st.roleListArr}
                          onChange={(e) => this.checkListRole(e)}
                          loading={st.spwGetLoader || st.loader}
                        />
                      </Col>
                      {!moreThenOneCompany &&
                        <Col lg={16} md={24} sm={24} xs={24}>
                          <Alert message={"Please select The Role for user you want to create."} type="info" showIcon className="alert-between-form" />
                        </Col>
                      }
                      <Col lg={8} md={24} sm={24} xs={24}>
                        {st.spwList.length > 0 ?
                          <AntInput type="select" label="Full name" name="full_name" placeholder="Please tupe full name" options={st.spwList} onChange={(e) => this.onSelectSPW(e)} />
                          :
                          <AntInput label="Full name" name="full_name" placeholder="Please type full first name" />
                        }
                      </Col>
                      <Col lg={8} md={24} sm={24} xs={24}>
                        <AntInput label="Email" type="email" name="email" placeholder="Please type your email" />
                      </Col>
                      <Col lg={8} md={24} sm={24} xs={24}>
                        <AntInput label="Contact Number" name="contact_number" placeholder="Please contact number" noRequired={true} />
                      </Col>
                      {moreThenOneCompany &&
                        <Col lg={moreThenOneBranch ? 8 : 16} md={24} sm={24} xs={24}>
                          <AntInput type="select" mode="multiple-responsive" label="Select Company" name="company_ref_ids" options={st.companyListArr} onChange={(e) => this.getBranch(e)} filter={true} />
                        </Col>
                      }
                      {moreThenOneBranch &&
                        <Col lg={moreThenOneCompany ? 8 : 16} md={24} sm={24} xs={24}>
                          <AntInput type="select" mode="multiple-responsive" label="Select Branch" name="branch_ref_ids" options={st.branchListArr} filter={true} />
                        </Col>
                      }
                      <Col lg={8} md={24} sm={24} xs={24}>
                        <AntInput containerClassName="box-wrap" type="select" label="Account Status" name="status" placeholder="Please select user role" options={st.statusListArr} loading={st.loader} />
                      </Col>
                      <Col lg={8} md={24} sm={24} xs={24}>
                        <AntInput containerClassName="box-wrap" label="Username" name="username_cu" placeholder="Please type username" autoComplete='off' />
                      </Col>
                      <Col lg={8} md={24} sm={24} xs={24}>
                        <AntInput containerClassName="box-wrap" type="password" label="Password" name="password_cu" placeholder="Please type password" autoComplete='new-password' />
                      </Col>
                    </Row>
                  </div>
                </div>
                <hr className="hr-1 m-b-20" />
                <div className="text-right">
                  <Button size="large" type="primary" htmlType="submit" loading={this.state.btnLoader}>
                    {this.state.updateStatus ? 'Update User' : 'Add New User'}
                  </Button>
                </div>

              </Form>
            </div>
          </Col>
          <Col lg={5} md={6} sm={24} xs={24}>
            <RecentUsers reset={this.state.refreshRecentUserWidget} />
          </Col>
        </Row>

      </div>
    );//End return
  }//End render
  componentDidMount() {

    if (this.props.match.params.id) {
      this.setState({ updateStatus: true }, () => {
        // this.getRoles(this.getUserData(this.props.match.params.id,this.checkListRole('6')));
        this.getUserData(this.props.match.params.id);
      });
    } else {
      this.getRoles();
    }//End if condition
  }// End componentDidMount
}//End class

export default UserForm;