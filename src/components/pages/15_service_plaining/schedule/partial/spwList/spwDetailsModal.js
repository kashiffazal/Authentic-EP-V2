import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Modal, Avatar, Button } from 'antd';


class ViewProfileModal extends Component {
  state = {
    togglePassword: false
  }
  render() {
    const pr = this.props;
    const dt = this.props.data;
    const st = this.state
    return (
      <Modal
        width={1200}
        maskClosable={false}
        className="hide-footer"
        centered={true}
        // title={dt.name + ' | View Support Worker Profile'}
        visible={pr.show}
        onOk={() => pr.onClose()}
        onCancel={() => pr.onClose()}
        destroyOnClose={true}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
        <div className="modal-modern-title">
          <div>
            <span className="title">{dt.name + ' | View Support Worker Profile'}</span>
            <span className="sub-title">Support Worker Data in Detail</span>
          </div>
        </div>
        <Row gutter={window.rowGutter} className="schedule-view-details-container">
          <Col lg={7} md={8} sm={10} xs={24} className="text-center">
            <Avatar src={dt.profileImage} size={200}
              className={dt.key ? `avatar-color-${parseInt(dt.key < 10 ? dt.key.toString().charAt(0) : dt.key.toString().charAt(1))}` : ''}
            >{dt.nameSlug}</Avatar><br />
            {dt.username ? <React.Fragment>
              <div className="name">{dt.profileName}</div>
              <div className="role">{dt.role}</div>
              <div className="info-row"><div>Contact Number</div><div>{dt.contact_number ? dt.contact_number : '-'}</div></div>
              <div className="info-row"><div>Email</div><div>{dt.email ? dt.email : '-'}</div></div>
              <div className="info-row"><div>Username</div><div>{dt.username}</div></div>
              <div className="info-row"><div>Password</div>
                <div style={{ 'width': '50%' }} className="flex-sb-m">
                  <span><button type="button" className="btnToLink link-color fs-14" onClick={() => this.setState({ togglePassword: !st.togglePassword })}><i className={`las la-eye${st.togglePassword ? '' : '-slash'}`} /></button></span>
                  <span>{st.togglePassword ? dt.password : '**********'}</span>
                </div>
              </div>
              <div className="info-row"><div>Last Login</div><div>{dt.current_login ? dt.current_login : '-'}</div></div>
              <div className="info-row"><div>Second Last Login</div><div>{dt.last_login ? dt.last_login : '-'}</div></div>
              <div className="info-row"><div>Third Last Login</div><div>{dt.second_last_login ? dt.second_last_login : '-'}</div></div>
            </React.Fragment>
              :
              <React.Fragment>
                <div className="no-user">User is not created yet!</div>
                <Button type="primary" ghost className="w-full" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/createUser')}><i className="las la-user-plus pos-relative top-1" /> &nbsp; Want to create User?</Button>
              </React.Fragment>
            }
          </Col>
          <Col lg={17} md={16} sm={14} xs={24}>
            <iframe title="Report" src={dt.detailedPDF} className="pdfIframe" allow="autoplay; encrypted-media" allowtransparency="true" allowFullScreen />
          </Col>
        </Row>

      </Modal>
    )//End return
  }//End render
}//End class
export default withRouter(ViewProfileModal);