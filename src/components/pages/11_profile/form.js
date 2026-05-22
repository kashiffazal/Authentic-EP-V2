import React, { Component } from 'react';
import UploadImage from '../../externalComponents/andt-upload-and-crop-image-component'
import ScreenLoader from '../../externalComponents/screen-loader';
import { AntInput } from '../../externalComponents/antd-fields';
import { connect } from 'react-redux';
import StoreGet from '../../../store/get';
import StorePost from '../../../store/post';
import { HTTP, SetUserData, GetUserData, AccessControl } from '../../services';
import { Form, Row, Col, Button } from 'antd';

import './styles.less';

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getLoader: false,
      updateLoader: false,
      data: {},
      profileImgUrl: ''
    }//End state
  }//End constructor
  formRef = React.createRef();
  updateProfile = (values) => {
    this.state.profileImgUrl && (values.profileImage = this.state.profileImgUrl);
    values.id = this.props.stv.ud.id;
    this.setState({ updateLoader: true });
    HTTP('post', '/profile/post', values).then(res => {
      this.setState({ updateLoader: false });
      if (!res) { return false; }
      //console.log(res);
      let userUpdatedData = { ...GetUserData(), ...res.data };
      this.props.post_stv('ud', userUpdatedData);
      SetUserData(userUpdatedData);
    });
  }//End function

  getUserData = () => {
    this.setState({ getLoader: true });
    HTTP('get', '/profile/get').then(res => {
      this.setState({ getLoader: false });
      if (!res) { return false; }
      //console.log(res.data);
      this.setState({ data: res.data }, () => {
        let dt = this.props.stv.ud;
        this.formRef.current.setFieldsValue({
          full_name: dt.first_name + ' ' + dt.last_name,
          gender: dt.gender,
          contact_number: dt.contact_number,
          email: dt.email
        });
      });
    });
  }//End function


  render() {
    // const fp = this.formRef.current;
    const dt = this.props.stv.ud;
    const pd = this.state.data;
    const st = this.state;
    // const profileImg = dt.profileImage ? `${window.domainPath}/files/uploads/user_profiles/${dt.profileImage}` : '';
    const profileImg = this.state.profileImgUrl ? this.state.profileImgUrl : `${window.domainPath}/files/uploads/user_profiles/${dt.profileImage}`;

    //console.log(dt);
    return (
      <React.Fragment>
        <div className="profile-container">
          <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.updateProfile}>
            <Row gutter={window.rowGutter}>
              <Col lg={6} md={9} sm={24} xs={24} className="text-center">
                <div className="container c-wv-m-b-m">
                  <ScreenLoader active={st.getLoader}>
                    <UploadImage defaultImageUrl={profileImg} onChange={(e) => this.setState({ profileImgUrl: e })} type="image" imageType="circle" />
                    <h2>{dt.first_name ? (dt.first_name + ' ' + dt.last_name) : '-'}</h2>
                    <p>{dt.role}</p>
                  </ScreenLoader>
                </div>
              </Col>
              <Col lg={18} md={15} sm={24} xs={24}>
                <div className="container c-wv-m-b-m m-b-15">
                  <ScreenLoader active={st.getLoader}>
                    <Row gutter={window.rowGutter}>
                      <Col lg={8} md={8} sm={12} xs={24}>
                        {AccessControl(136) ?
                          <>
                            <AntInput name="full_name" label="Full Name" />
                            <AntInput name="contact_number" label="Contact Number" />
                            <AntInput name="email" type="email" label="Email " />
                            <Button className="c-wv-m-b-m btn_side_by_side w-full" htmlType="submit" type="primary" loading={st.updateLoader}>Update</Button>
                          </> :
                          <div className="info">
                            <h3>User Details:</h3>
                            <div>
                              <b>Full Name:</b>
                              <span>{dt.first_name ? (dt.first_name + ' ' + dt.last_name) : '-'}</span>
                            </div>
                            <div>
                              <b>Contact Number:</b>
                              <span>{dt.contact_number ? dt.contact_number : '-'}</span>
                            </div>
                            <div>
                              <b>Email Address:</b>
                              <span>{pd.email ? pd.email : '-'}</span>
                            </div>
                          </div>
                        }
                      </Col>
                      <Col lg={8} md={8} sm={12} xs={24}>
                        <div className="info">
                          <h3>Login Details:</h3>
                          <div>
                            <b>Current Login:</b>
                            <span>{pd.current_login ? pd.current_login : '-'}</span>
                          </div>
                          <div>
                            <b>Last Login:</b>
                            <span>{pd.last_login ? pd.last_login : '-'}</span>
                          </div>
                          <div>
                            <b>Second Last Login:</b>
                            <span>{pd.second_last_login ? pd.second_last_login : '-'}</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={8} md={8} sm={24} xs={24}>
                        <div className="total_trans">
                          <b>{pd.totalTransactions ? pd.totalTransactions : '0'}</b>
                          <span>Total Transactions / Entries</span>
                        </div>
                      </Col>
                    </Row>
                  </ScreenLoader>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </React.Fragment>
    )//End Return statement
  }//end End Render
  componentDidMount() {
    this.getUserData();
  }//End componentDidMount
}//End class

export default connect(StoreGet, StorePost)(ViewProfile);