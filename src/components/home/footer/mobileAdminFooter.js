import React, { Component } from 'react'
import { withRouter } from 'react-router';

class MobileAdminFooter extends Component {
  render() {
    return (
      <div className="mobile-webview-footer">
        <table width="100%" className="text-center">
          <tbody>
            <tr>
              <td width="20%" valign="top">
                <button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/job')}>
                  <i className="las la-briefcase" />
                  <p>Job</p>
                </button>
              </td>
              <td width="20%" valign="top">
                <button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/team')}>
                  <i className="las la-users" />
                  <p>Team</p>
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
                <button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/staffTimesheetLog')}>
                  <i className="las la-business-time" />
                  <p>Timesheet</p>
                </button>
              </td>
              <td width="20%" valign="top">
                <button className="btnToLink" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/reporting')}><i className="las la-file-pdf" />
                  <p>Reports</p>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    )//End return
  }//End render
}//End class
export default withRouter(MobileAdminFooter);