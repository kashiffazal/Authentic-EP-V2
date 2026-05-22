import React, { Component } from 'react'
import { Row, Col, Divider } from 'antd';
import { withRouter } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';

class WebViewAdminFormSection extends Component {
  render() {
    const dtc = this.props.data;
    // console.log(dtc);
    const loader = this.props.loader;
    return (
      <div className="form-section">
        <Divider className="heading">FORMS</Divider>
        <Row gutter={window.rowGutterSmall}>
          <Col lg={8} xs={8}>
            <button className="btnToLink form-btn" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/supportWorkerForm')}>
              <i className="las la-id-card-alt" /><br />
              Add SP
            </button>
          </Col>
          <Col lg={8} xs={8}>
            <button className="btnToLink form-btn" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/clientForm')}>
              <i className="las la-id-card" /><br />
              Add Client
            </button>
          </Col>
          <Col lg={8} xs={8}>
            <button className="btnToLink form-btn" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/servicePlainForm')}>
              <i className="las la-chalkboard-teacher" /><br />
              Add Services
            </button>
          </Col>
        </Row>

        <div className="detail-box m-t-12">
          <table width="100%">
            <tbody>
              <tr>
                <td width="25%" align="center" valign="top">
                  <i className="las la-id-card-alt" />
                </td>
                <td width="75%">
                  <b>Support Workers</b>
                  <p>Count of hired and shortlisted candidates</p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <div className="count">
            {loader ? <span className="custom-loader"><LoadingOutlined /> <span className="tip">Loading, Please wait...</span></span> :
              <React.Fragment>
                <div>
                  <p>Total Hired</p><b>{dtc.count && dtc.count.spCount}</b>
                </div>
                <div>
                  <p>Total Shortlisted</p><b>{dtc.count && dtc.count.spsCount}</b>
                </div>
              </React.Fragment>
            }
          </div>
        </div>

        <div className="detail-box m-t-12">
          <table width="100%">
            <tbody>
              <tr>
                <td width="25%" align="center" valign="top">
                  <i className="las la-id-card" />
                </td>
                <td width="75%">
                  <b>Clients</b>
                  <p>Count of total active and in active clients.</p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <div className="count">
            {loader ? <span className="custom-loader"><LoadingOutlined /> <span className="tip">Loading, Please wait...</span></span> :
              <React.Fragment>
                <div>
                  <p>Total Active</p><b>{dtc.count && dtc.count.clCount}</b>
                </div>
                <div>
                  <p>Total In Active</p><b>{dtc.count && dtc.count.cliCount}</b>
                </div>
              </React.Fragment>
            }
          </div>
        </div>

        <div className="detail-box m-t-12">
          <table width="100%">
            <tbody>
              <tr>
                <td width="25%" align="center" valign="top">
                <i className="las la-chalkboard-teacher" />
                </td>
                <td width="75%">
                  <b>Services</b>
                  <p>Count of approved / unapproved services.</p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <div className="count">
            {loader ? <span className="custom-loader"><LoadingOutlined /> <span className="tip">Loading, Please wait...</span></span> :
              <React.Fragment>
                <div>
                  <p>Total Approved</p><b>{dtc.count && dtc.count.srCount}</b>
                </div>
                <div>
                  <p>Total Unapproved</p><b>{dtc.count && dtc.count.sruCount}</b>
                </div>
              </React.Fragment>
            }
          </div>
        </div>
      </div >
    )//End return
  }//End render
}//Enc class
export default withRouter(WebViewAdminFormSection);