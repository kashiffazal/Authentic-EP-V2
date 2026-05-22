import React, { Component } from 'react';
import { Row, Col } from 'antd';
class SupportWorkerFormjobDetails extends Component {
  render() {
    const jd = this.props.jobData;
    return (
      <div className="job_details">
        <Row>
          <Col lg={6} md={6} sm={24} xs={24}>
            <button className="btnToLink button" type="button" onClick={() => this.props.backToJobList()}>
              <i className="las la-angle-double-left pos-relative top-1" /> Back
						</button>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="text-center title">{jd.title}</Col>
          <Col lg={6} md={6} sm={24} xs={24} className="text-right"></Col>
        </Row>
      </div>
    );//End return
  }//End render
}//End class

export default SupportWorkerFormjobDetails;