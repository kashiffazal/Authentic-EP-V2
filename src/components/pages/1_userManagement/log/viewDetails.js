import React, { Component } from 'react';
import { Row, Col, Avatar, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class ViewDetails extends Component {
  state = {
    data: {},
    loader: false,
    layout: 'vertical',
    descResponsiveDetailsTwoCol: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 },
    descResponsiveDetailsThreeCol: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 },
    togglePassword: false
  }

  render() {
    const st = this.state;
    const data = this.props.data;
    return (
      <React.Fragment>
        <div className="circle-round-btn-container-view-modal">
          <div className="circle-round-btn">
            <button type="button" title="View Vertical" className={st.layout === 'vertical' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'vertical' })}><i className="las la-th-large" /></button>&nbsp;
            <button type="button" title="View Horizontal" className={st.layout === 'horizontal' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'horizontal' })}><i className="las la-th-list" /></button>
          </div>
        </div>
        <div className="description-custom">
          <Row gutter={window.rowGutter}>
            <Col lg={6} md={8} sm={24} xs={24} className="m-b-10">
              <div className="profile_avatar text-center">
                <Avatar shape="square" size={210} icon={<UserOutlined />} src={data.profileImage} />
                {/* {data.profileImage ?
                  <img src={window.domainPath + "/files/uploads/user_profiles/" + data.profileImage} width="100%" alt="" />
                  :
                  <img src={require("../avatar.png")} width="100%" alt="" />
                } */}
              </div>
            </Col>
            <Col lg={18} md={16} sm={24} xs={24}>
              <div className="description-custom">
                <h1>Main Details</h1>
                <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetailsThreeCol} className={`three-col-${this.state.layout}`}>
                  <Descriptions.Item label="Role">{data.role_name ? data.role_name : '-'}</Descriptions.Item>
                  <Descriptions.Item label="Full Name">{data.first_name} {data.last_name}</Descriptions.Item>
                  <Descriptions.Item label="Email Address">{data.email}</Descriptions.Item>
                  <Descriptions.Item label="Contact Number">{data.contact_number ? data.contact_number : '-'}</Descriptions.Item>
                  <Descriptions.Item label="Gender">{data.gender ? data.gender : '-'}</Descriptions.Item>
                  <Descriptions.Item label="Address">{data.address ? data.address : '-'}</Descriptions.Item>
                  <Descriptions.Item label="Company(s)" span={data.branch_ref_ids ? 2 : 3}>{data.company_ref_ids && data.company_ref_ids.map((item, i) => { return (<span key={i} className="tags">{item}</span>) })}</Descriptions.Item>
                  {data.branch_ref_ids && <Descriptions.Item label="Branch(s)">{data.branch_ref_ids.map((item, i) => { return (<span key={i} className="tags">{item}</span>) })}</Descriptions.Item>}
                  <Descriptions.Item label="Account Status">{data.status_name}</Descriptions.Item>
                  <Descriptions.Item label="Username">{data.username}</Descriptions.Item>
                  <Descriptions.Item label="Password">
                    <div className="flex-sb-m">
                      <div>{st.togglePassword ? data.password : '*****'}</div>
                      <button className="btnToLink link-color" onClick={() => this.setState({ togglePassword: !st.togglePassword })}>
                      {st.togglePassword ? <i className="las la-eye"/> : <i className="las la-eye-slash"/>}
                      </button>
                    </div>

                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );//End return
  }//End render
}//End class

export default ViewDetails;