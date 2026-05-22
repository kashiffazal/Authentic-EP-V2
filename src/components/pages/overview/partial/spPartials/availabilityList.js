import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Spin } from 'antd';

class AvailabilityList extends Component {
  render() {
    const pr = this.props;
    const dt = this.props.data;
    return (
      <div className="box pos-relative m-t-desktop-15">
        <h3 className="current_label_sub_heading">Day and Time Availability</h3>
        <Button type="primary" ghost size="small" className="side-right-btn" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/availabilityForm')}>Update</Button>
        <hr className="hr-1 m-t-10 m-b-7" />
        <Spin spinning={this.props.loader} className="spin-loader" tip="Loading, Please wait...">
          {pr.loader && <div className="h-271"></div>}
          {dt && dt.from && Object.keys(dt.day).map((item, index) => {
            return (
              <div key={index} className="availability-container">
                <div>{dt.day[index + 1]}</div>
                <div>{dt.from[index + 1]}</div>
                <div>{dt.to[index + 1]}</div>
                <div>{(dt.from[index + 1] !== '-') ? <span className="success-color">Available <i className="fs-18 pos-relative top-1 las la-check-circle" /></span> : <span className="pending-color">Not Available <i className="fs-18 pos-relative top-1 las la-exclamation-circle" /></span>}</div>
              </div>
            )
          })}
        </Spin>
      </div>
    )//End return
  }//End render
}//End class
export default withRouter(AvailabilityList);