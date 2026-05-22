import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { GetCurrentYear } from '../../services';
import MobileSPFooter from './mobileSPFooter';
import MobileAdminFooter from './mobileAdminFooter';
import StoreGet from '../../../store/get';

import './styles.less';

class Footer extends Component {
  render() {
    const stv_ad = this.props.stv.app_data;
    // const stv_br = this.props.stv.brand;
    const theme = this.props.theme;
    const mv = this.props.mobileVersion;
    const lg = this.props.loginScreen;
    return (
      (!lg && window.webviewMobile) ?
        (window.userData.link_id ? <MobileSPFooter /> : <MobileAdminFooter />)
        :
        <footer className="footer-bar">
          <span className={theme === 'white' ? 'white' : ''}>
            <Row type="flex" justify="space-around" align="middle">
              <Col lg={12} md={12} sm={24} xs={24} className={`text-center-md bottom-md-space ${mv && 'fs-11 m-t-5'}`} order={mv ? 2 : undefined}>
                {/* Version {stv_ad.version} | &copy; {GetCurrentYear()} {stv_ad.app_name}, All Rights Reserved. */}
                &copy; {GetCurrentYear()} {stv_ad.app_name}, All Rights Reserved.
              </Col>
              <Col lg={12} md={12} sm={24} xs={24} className="text-right text-center-md" order={mv ? 1 : undefined}>
                {/* Developed by &nbsp; <a href={stv_br.url} rel="noopener noreferrer" target="_blank"><img src={`${process.env.PUBLIC_URL}/img/${theme === 'white' ? stv_br.logo_w : stv_br.logo}`} width="100px" alt="Logo" /></a> */}
                Version {stv_ad.version}
              </Col>
            </Row>
          </span>
        </footer>
    );
  }
}

export default connect(StoreGet)(withRouter(Footer));