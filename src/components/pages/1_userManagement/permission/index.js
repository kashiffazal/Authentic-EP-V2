/*eslint-disable no-script-url*/
import React, { Component } from 'react';
import { Row, Col, Form, Button, Spin, Popconfirm, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import RecentUsers from '../widget/recent_users';
import PageTitle from '../../mutual/pageTitle';
// import AccessControl from '../../../externalComponents/user-base-access-control';
import { AntInput } from '../../../externalComponents/antd-fields';
import { HTTP, AccessControl } from '../../../services';
import SelectPermission from './partial/selectPermission';
import "../styles.less";

class UserPermission extends Component {
  state = {
    loader: false,
    btnLoader: false,
    permissionListArr: [],
    roleListArr: [],
    update_role_status: false,
    // checkbox_checked: false,
    per_check_all_values: [],
    show_hide_check_all: true,
    permission_ref_ids: '',
    permission_ref_ids_edit: null,
    reset_permission_box: false
  };

  formRef = React.createRef();

  submitForm = (values) => {
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //console.log(values)
    if (!this.state.permission_ref_ids) { message.error('Please select at least one permission'); return false; }
    values.permission_ref_ids = this.state.permission_ref_ids.join(',');
    // console.log(values);return false;
    this.setState({ btnLoader: true });
    HTTP('post', '/usersManagement/post/addRole', values).then(res => {
      this.setState({ btnLoader: false });
      if (!res) { return false; }
      if (this.state.update_role_status) { this.setState({ 'update_role_status': false }); }//End if condition
      // this.setState({ checkbox_checked: false });
      this.formRef.current.resetFields();
      this.getRoles();
      this.setState({ permission_ref_ids: '', permission_ref_ids_edit: null, reset_permission_box: true }, () => {
        this.setState({ reset_permission_box: false })
      })
    });
    //   }//End if condition
    // });//End form properties
  }//End function

  getRoles = () => {
    this.setState({ getLoader: true });
    HTTP('get', '/usersManagement/get/roleList/permission/true').then(res => {
      this.setState({ getLoader: false });
      if (!res) { return false; }
      this.setState({ 'roleListArr': res.data });
      // console.log(res.data);
    });
  }//End function

  delete_role = (role_id) => {
    this.setState({ loader: true });
    HTTP('post', '/usersManagement/post/deleteRole', { id: role_id }).then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.getRoles();
      this.formRef.current.resetFields();
      this.setState({ permission_ref_ids_edit: null })
    });
  }//End function

  edit_role = (role_data) => {
    this.setState({ 'update_role_status': true });
    var resArr = {
      id: role_data.id,
      role: role_data.role,
      // permission_ref_ids: role_data.permission_ref_ids.split(','),
      description: role_data.description,
      hideForOthers: role_data.hideForOthers ? true : false
    };
    resArr.linkWithSP = role_data.linkRole === 'SPW' ? true : false;

    // this.setState({ checkbox_checked: (role_data.hideForOthers ? true : false) });
    this.formRef.current.setFieldsValue(resArr);
    this.setState({ permission_ref_ids_edit: role_data.permission_ref_ids.split(',') });
  }//End function

  // permission_check_all = (check) => {
  //   this.setState({ show_hide_check_all: false }, () => {
  //     this.setState({ show_hide_check_all: true }, () => {
  //       let values = [];
  //       if (check) { values = this.state.permissionListArr.map(val => val.value); }//End if condition
  //       this.setState({ per_check_all_values: values });
  //     });
  //   });
  // }//End function


  render() {
    const st = this.state;
    return (
      <div>
        <PageTitle
          titleIcon="las la-unlock"
          titleSpan="Users"
          titleHeading="Permission"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-user-plus', label: 'Users Management' },
            { iconLas: 'las la-unlock', label: 'Users Permission' }
          ]}
        />
        <Row gutter={window.rowGutter}>
          <Col lg={19} md={24} sm={24} xs={24}>
            <div className="container">

              <Row gutter={window.rowGutter}>
                <Col lg={8} md={12} sm={24} xs={24}>
                  <Spin spinning={this.state.loader}>
                    <Form ref={this.formRef} layout="vertical" onFinish={this.submitForm} className="form-style-1">
                      <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
                      <AntInput name="role" label="Role" placeholder="Please type role name" />


                      <AntInput
                        name="linkWithSP"
                        type="checkbox"
                        text="Link with Support Worker"

                        //onChange={() => this.setState({ checkbox_checked: !this.state.checkbox_checked })}
                        containerClassName="checkbox_lines"
                        noRequired={true}
                      />


                      {!st.reset_permission_box && <SelectPermission data={st.permissionListArr} value={st.permission_ref_ids_edit} onChange={(e) => this.setState({ permission_ref_ids: e })} />}


                      {/* <AntInput name="permission_ref_ids" label="Select permissions" type="select" 
                          mode='multiple'
                          options={st.permissionListArr}
                        /> */}
                      {/* <AntInput name="check_all" label="Select permissions" type="checkbox" text="Check All" 
                        onChange={(e) => this.permission_check_all(e)} noRequired={true}
                        containerClassName="checkbox_select_all"
                      />
                      {st.show_hide_check_all &&
                        <div className="check_list_container" id="scroll-style-1">
                          <AntInput
                            name="permission_ref_ids"
                            type="checkbox"
                            group={st.permissionListArr}
                            value={st.per_check_all_values}
                            
                            className="checkbox_list"
                            containerStyle={{ width: '100%' }}
                          />
                        </div> 
                      }{/*End checkbox List*/}
                      {/* {fp.getFieldValue('permission_ref_ids')} */}
                      <AntInput name="description" type="textarea" label="Description" placeholder="Please type description" />
                      <AntInput
                        name="hideForOthers"
                        type="checkbox"
                        text="Hide role for others e.g. role like developer, super admin etc."

                        // onChange={() => this.setState({ checkbox_checked: !this.state.checkbox_checked })}
                        containerClassName="checkbox_lines"
                        noRequired={true}
                      />

                      <div className="float-r">
                        {this.state.update_role_status && <Button onClick={() => { this.setState({ 'update_role_status': false }, () => { this.formRef.current.resetFields(); this.setState({ permission_ref_ids_edit: null }) }) }}>Reset</Button>}
                        &nbsp;
                        <Button type="primary" htmlType="submit" loading={this.state.btnLoader}> {this.state.update_role_status ? 'Update' : 'Create'} </Button>
                      </div>
                    </Form>
                  </Spin>
                </Col>
                <Col lg={16} md={12} sm={24} xs={24}>

                  <p className="m-b-4"><em>List of users role</em></p>
                  <Spin spinning={this.state.getLoader}>
                    <div className="role_container h-525" id="scroll-style-1">
                      {
                        this.state.roleListArr.map((item, i) => {
                          var title = item.headTitle.split('|');
                          return (
                            <div className="role_list" key={i}>
                              <Row gutter={window.rowGutter}>
                                <Col lg={20} md={24} sm={24} xs={24}>
                                  <b>{item.hideForOthers === 'true' ? <LockOutlined /> : <UserOutlined />} {item.role}&nbsp;</b>
                                  <span className="m-0 fs-12">{item.description} {item.linkRole && <span className='status-inactive-color'>(Link with {item.linkRole})</span>}</span><br />
                                  {
                                    item.permissions.split('|').map((item_inner, i_inner) => {
                                      return (<span className="role_blocks" key={i_inner} title={title[i_inner]} >{item_inner}</span>)
                                    })
                                  }
                                </Col>
                                <Col lg={4} md={24} sm={24} xs={24}>
                                  {item.permissions !== 'all' &&
                                    <div div className="fs-12 p-t-15 text-right">
                                      {AccessControl(149) &&
                                        <Popconfirm ubac_id={10} title="Do you want to edit role?" onConfirm={() => this.edit_role(item)} okText="Yes" cancelText="No">
                                          <button className="btnToLink">Edit</button>
                                        </Popconfirm>
                                      }
                                      {(AccessControl(149) && AccessControl(150)) && <span ubac_id={11}>&nbsp;|&nbsp;</span>}
                                      {AccessControl(150) &&
                                        <Popconfirm ubac_id={11} title="Are you sure delete this role?" onConfirm={() => this.delete_role(item.id)} okText="Yes" cancelText="No">
                                          <button className="btnToLink">Delete</button>
                                        </Popconfirm>
                                      }
                                    </div>
                                  }
                                </Col>
                              </Row>
                            </div>
                          )//End return
                        })
                      }
                    </div>
                  </Spin>
                </Col>
              </Row>

            </div>
          </Col>
          <Col lg={5} md={24} sm={24} xs={24}>
            <RecentUsers />
          </Col>
        </Row>

      </div >
    );//End return
  }//End render
  componentDidMount() {

    this.setState({ 'loader': true });
    HTTP('get', '/usersManagement/get/permissionList').then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      res = res.data;
      this.setState({ 'permissionListArr': res })
    });

    this.getRoles();

  }//End componentDidMount
}//End class

export default UserPermission;