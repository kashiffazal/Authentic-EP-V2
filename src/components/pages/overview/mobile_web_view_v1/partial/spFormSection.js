import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';

class WebViewSPFormSection extends Component {
  render() {
    const dtc = this.props.data;
    // console.log(dtc);
    const loader = this.props.loader;
    return (
      <div className="form-section">
        <div className="detail-box m-t-12">
          <div className="top-bar">
            <div><i className="las la-business-time" /> &nbsp; Your Availability For Shift</div>
            <div><button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/availabilityForm')}>Edit</button></div>
          </div>
          <hr className="m-t--5" />
          {loader ? <span className="custom-loader"><LoadingOutlined /> <span className="tip">Loading, Please wait...</span></span> :
            <table width="100%">
              <thead>
                <tr>
                  <th width="10%"></th>
                  <th width="30%" align="left">Days</th>
                  <th width="30%">From</th>
                  <th width="30%">To</th>
                </tr>
              </thead>
              <tbody>
                {dtc.availability && Object.keys(dtc.availability.day).map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{(dtc.availability.not_available && dtc.availability.not_available[i + 1]) ? <i className="p-l-5 fs-12-imp las la-times-circle status-close-color-imp" /> : <i className="p-l-5 fs-12-imp las la-check-circle success-color-imp" />}</td>
                      <td>{dtc.availability.day[i + 1]}</td>
                      <td align="center">{dtc.availability.from[i + 1]}</td>
                      <td align="center">{dtc.availability.to[i + 1]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          }
        </div>

        <div className="detail-box m-t-12">
          <div className="top-bar">
            <div><i className="las las la-user-md" /> &nbsp; Shift By Frequency</div>
            <div><button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/serviceList')}>See All</button></div>
          </div>
          <hr className="m-t--5" />
          {loader ? <span className="custom-loader"><LoadingOutlined /> <span className="tip">Loading, Please wait...</span></span> :
            dtc.services &&
            <table width="100%">
              <thead>
                <tr>
                  <th className="p-l-8" width="70%" align="left">Frequency</th>
                  <th width="30%">Service Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-l-8">Daily</td>
                  <td align="center">{dtc.services.count.daily}</td>
                </tr>
                <tr>
                  <td className="p-l-8">Monthly</td>
                  <td align="center">{dtc.services.count.monthly}</td>
                </tr>
                <tr>
                  <td className="p-l-8">Weekly</td>
                  <td align="center">{dtc.services.count.weekly}</td>
                </tr>
                <tr>
                  <td className="p-l-8">Fortnightly</td>
                  <td align="center">{dtc.services.count.fortnightly}</td>
                </tr>
                <tr>
                  <td className="p-l-8">On Client Request</td>
                  <td align="center">{dtc.services.count.onClient}</td>
                </tr>
              </tbody>
            </table>
          }
        </div>
      </div>
    )//End return
  }//End render
}//Enc class
export default withRouter(WebViewSPFormSection);