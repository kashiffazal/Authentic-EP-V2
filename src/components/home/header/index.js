import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Row, Col, Avatar, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import StoreGet from '../../../store/get';
import StorePost from '../../../store/post';
import NavigationHr from '../navigationHr';
import NavigationOther from '../navigationOther';
//FireBase
import FireStore from '../../fireStoreNotification';


// import NavigationHr from '../navigationHr';
import { GetUserData } from '../../services';
import './styles.less';


class Header extends Component {
  state = {
    dropDownVisible: false
  }
  makeTicketNotifySeen = (collectionName, data) => {
    if (Object.keys(data).length > 0) {
      Object.keys(data).map(item => { return data[item].seen = true; })
      let docName = this.props.stv.ud.general_user_ref_id ? this.props.stv.ud.id : 'admin';
      // console.log(docName);
      FireStore.collection(collectionName).doc(docName).set(data);
    }//End function
    return false;
  }

  deleteTicketNotification = (collectionName, data, key) => {
    delete data[key]
    let docName = this.props.stv.ud.general_user_ref_id ? this.props.stv.ud.id : 'admin';
    FireStore.collection(collectionName).doc(docName).set(data);
  }//End function

  render() {
    const st = this.state;
    // const stv_ad = this.props.stv.app_data;
    // const stv_cl = this.props.stv.company_data[stv_ad.appClients];
    // console.log(stv_ad);
    const dt = this.props.stv.ud;
    const companyLogo = (dt.defaultCompany && dt.defaultCompany.company_logo) ? dt.defaultCompany.company_logo : `${process.env.PUBLIC_URL}/img/product-logopsd-h.png`;
    const profileImg = `${window.domainPath}/files/uploads/user_profiles/${dt.profileImage}`;
    const refreshBtn = <div className="header_icon_box right-top-element"><i className="las la-undo-alt" onClick={() => window.location.reload(true)} /></div>;

    return (
      <header className="header">

        {/* <div className="nav_bar">
              <NavigationHr />
            </div>
            <hr/> */}
        <Row type="flex" justify="space-around" align="middle">
          <Col lg={3} md={4} sm={4} xs={12}>
            <div className="header_logo">
              <img src={companyLogo} alt="Logo" className="desktop-logo" />
              {/* <img src={`${process.env.PUBLIC_URL}/img/${stv_cl.logo}`} alt="Logo" className="desktop-logo" /> */}
            </div>
          </Col>
          <Col lg={15} md={12} sm={10} xs={0}>
            <div className="nav_bar">
              <NavigationHr />
            </div>
          </Col>
          <Col className="header_right_col" lg={6} md={8} sm={10} xs={12}>
            <span className="ticket-header-element-mobile">{refreshBtn}</span>
            <div className="header_avatar right-top-element">
              <Dropdown
                visible={st.dropDownVisible}
                onVisibleChange={(e) => this.setState({ dropDownVisible: e })}
                overlay={<NavigationOther showHide={() => this.setState({ dropDownVisible: false })} />} placement="bottomRight" >
                <span className="profile_dropdown">
                  <span className="content">
                    <span>{dt.role}</span>
                    <span>{dt.first_name} {dt.last_name}</span>
                  </span>
                  <div className="avatar-circle-cus">
                    <Avatar src={profileImg} style={{ background: dt.slug_color }}>{dt.nameSlug}</Avatar>
                  </div>
                  <span className="anticon-caret-down">&nbsp;&nbsp;</span>
                  {/* <i className="las la-angle-down"></i> */}
                  <CaretDownOutlined />
                </span>
              </Dropdown>
            </div>
            <span className="ticket-header-element-desktop">{refreshBtn}</span>
          </Col>
        </Row>
      </header>
    );//End return
  }//End render
  componentDidMount() {
    if (GetUserData()) {
      //Get Ticket Notifications
      let docName = GetUserData().general_user_ref_id ? GetUserData().id : 'admin';
      // console.log(docName);
      FireStore.collection('ticket').doc(docName).onSnapshot(res => {
        if (res.exists) {
          res = res.data();
          let count = 0;
          Object.keys(res).forEach(item => { if (!res[item].seen) { count = count + 1; } })
          this.props.post_stv('notify_ticket_list', res);
          this.props.post_stv('notify_ticket_count', count);
        }//End if condition
      }, (error) => { console.log('Error!', error); });

      //Get Gift Received Notifications
      if (GetUserData().general_user_ref_id) {
        FireStore.collection('gift').doc(GetUserData().id).onSnapshot(res => {
          if (res.exists) {
            res = res.data();
            let count = 0;
            Object.keys(res).forEach(item => { if (!res[item].seen) { count = count + 1; } })
            this.props.post_stv('notify_gift_list', res);
            this.props.post_stv('notify_gift_count', count);
          }//End if condition
        }, (error) => { console.log('Error!', error); });
      }//End if condition

    }//End if condition
  }//End componentDidMount
}//End class

export default connect(StoreGet, StorePost)(withRouter(Header));