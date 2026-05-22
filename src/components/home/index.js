import React, { Component } from 'react';
import Routes from '../routes';
import { Layout, Drawer, Dropdown } from 'antd';
import Header from './header';
import Footer from './footer';
import SiderMenu from './sidebar';
import NavigationHr from './navigationHr';
import NavigationOther from './navigationOther';
import { connect } from 'react-redux';
import StoreGet from '../../store/get';
import './styles.less';

const { Content } = Layout;

class MainApp extends Component {
  state = {
    dropDownVisible: false,
    mobileDrawerVisible: false
  }
  render() {
    const st = this.state;
    const dt = this.props.stv.ud;
    const companyLogo = (dt.defaultCompany && dt.defaultCompany.company_logo) ? dt.defaultCompany.company_logo : `${process.env.PUBLIC_URL}/img/product-logopsd-h.png`;
    return (
      <Layout >
        <Header />
        <Layout>
          <span className="custom-side-nav"><SiderMenu /></span>
          <Layout id="scroll-style-1">

            <div className="mobile-drawer-container">
              {/* For Mobile Webview version */}
              <i className="siderMenuTrigger trigger-mobile las la-bars" onClick={() => { this.setState({ mobileDrawerVisible: true }); }} ></i>
              <Drawer
                title={
                  <div>
                    {/* <h3>Main Navigation</h3> */}
                    <img src={companyLogo} alt="Logo" style={{ width: '145px' }} />
                  </div>}
                width={245}
                placement='left'
                closable={false}
                onClose={() => this.setState({ mobileDrawerVisible: false })}
                visible={this.state.mobileDrawerVisible}
                key='left'
                className="mobileNavDrawerMenu"
              >
                <NavigationHr mobileMenu={true} closeDrawer={() => this.setState({ mobileDrawerVisible: false })} />
              </Drawer>
              {window.webviewMobile &&
                <Dropdown
                  visible={st.dropDownVisible}
                  onVisibleChange={(e) => this.setState({ dropDownVisible: e })}
                  overlay={<NavigationOther showHide={() => this.setState({ dropDownVisible: false })} />}
                  trigger={['click']}
                  placement="bottomRight"
                  arrow>
                  <i className="trigger-mobile-right las la-cog" ></i>
                </Dropdown>
              }
            </div>

            <Content className="app-content">
              {/* <div> */}
              <Routes />
              {/* </div> */}
              <Footer />
            </Content>
          </Layout>
        </Layout>
      </Layout >
    );//End return
  }//End render
}//End class

export default connect(StoreGet)(MainApp);