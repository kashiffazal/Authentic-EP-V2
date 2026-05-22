import React, { Component } from 'react'
import { withRouter } from 'react-router';

class MobileSPFooter extends Component {
  render() {
    return (
      <div className="mobile-webview-footer">
        <table width="100%" className="text-center">
          <tbody>
            <tr>
              <td width="20%" valign="top">
                <button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/serviceListToday')}>
                  <i className="las la-calendar-day" />
                  <p>Today's</p>
                </button>
              </td>
              <td width="20%" valign="top">
                <button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/serviceListPending')}>
                  <i className="las la-user-tag" />
                  <p>Pending</p>
                </button>
              </td>
              <td width="20%">
                <button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/overview')}>
                  <div className="border">
                    <div className="main">
                      <i className="las la-home" />
                    </div>
                  </div>
                </button>
              </td>
              <td width="20%" valign="top">
                <button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/serviceList')}>
                  <i className="las la-user-md" />
                  <p>All</p>
                </button>
              </td>
              <td width="20%" valign="top">
                <button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/availabilityForm')}>
                  <i className="las la-business-time" />
                  <p>Availability</p>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    )//End return
  }//End render
}//End class
export default withRouter(MobileSPFooter);