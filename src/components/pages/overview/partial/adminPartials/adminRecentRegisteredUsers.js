import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tooltip, Avatar, Button, Modal, Spin, Empty } from 'antd';
import ViewDetails from '../../../1_userManagement/log/viewDetails';

class RecentGiftSenderUsers extends Component {
  state = {
    viewDetailModal: false,
    viewData: {},
  }
  render() {
    const pr = this.props;
    return (
      <div className="box m-t-15 pos-relative">
        <h3 className="current_label_sub_heading">RECENT USERS</h3>
        <Button type="primary" ghost size="small" className="side-right-btn" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/usersLog')}>View All</Button>
        <hr className="hr-1" />
        <Spin spinning={pr.loader} className="spin-loader" tip="Loading, Please wait...">
          <div className="recent-user-container">
            {pr.loader && <div className="h-102"></div>}
            {pr.data && !(pr.data.length > 0) && <div className="h-106"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Users are not created yat!'} /></div>}
            {pr.data && pr.data.map((item, i) => {
              return (
                <div key={item.id} className="recent-user-data">
                  <div><Avatar src={item.profileImage} style={{ background: item.slug_color }} size="large">{item.name_slug}</Avatar></div>
                  <div className="p-l-10 w-full">
                    <div>
                      <div className="fs-14 fw-500 lh-1-4">{item.first_name + ' ' + item.last_name}</div>
                      <div className="fs-12 lh-1-2">{item.role_name}</div>
                      <div className="fs-11">{item.dateTime}</div>
                    </div>
                  </div>
                  <div>
                    <Tooltip title="View User Details" placement="right">
                      <Button type="primary" ghost size="small" onClick={() => this.setState({ viewDetailModal: true, viewData: item })}><i className="las la-bars" /></Button>
                    </Tooltip>
                  </div>
                </div>
              )
            })}
          </div>
        </Spin>
        <Modal
          width={940}
          maskClosable={false}
          className="hide-footer"
          // title={this.state.viewData.first_name + " " + this.state.viewData.last_name}
          visible={this.state.viewDetailModal}
          onOk={() => this.setState({ viewDetailModal: false })}
          onCancel={() => this.setState({ viewDetailModal: false })}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ viewDetailModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title-for-view-details">
            <div>
              <span className="title">{this.state.viewData.first_name + " " + this.state.viewData.last_name}</span>
              <span className="sub-title">User Detailed View</span>
            </div>
          </div>
          <ViewDetails data={this.state.viewData} />
        </Modal>
      </div>
    )//End return
  }//End render
  componentDidMount() {
    // this.setState({ loader: true });
    // HTTP('get', '/adminDashboard/get/recentRegisteredUsers').then(res => {
    //   // console.log(res);
    //   this.setState({ loader: false });
    //   if (!res) { return false; }
    //   this.setState({ data: res.data });
    // });
  }//End componentDidMount
}//End class
export default withRouter(RecentGiftSenderUsers);