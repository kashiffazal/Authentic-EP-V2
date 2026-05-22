import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Spin, Empty } from 'antd';
import ServiceWidget from '../../../15_service_plaining/serviceList/serviceWidget';

class ServicesList extends Component {
  render() {
    const dt = this.props.data;
    // console.log(dt);
    return (
      <div className="box pos-relative">
        <h3 className="current_label_sub_heading">Pending Services</h3>
        <Button type="primary" ghost size="small" className="side-right-btn" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/serviceList')}>View All</Button>
        <hr className="hr-1 m-t-10 m-b-7" />
        <Spin spinning={this.props.loader} className="spin-loader" tip="Loading, Please wait...">
          <div className="service-container" id="scroll-style-4">
            {dt && !dt.pending &&
              <div className="service-not-found"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Notes are not added yat!'} /></div>
            }
            {(dt && dt.pending) && <ServiceWidget pending data={dt} />}
          </div>
        </Spin>
      </div>
    )//End return
  }//End render
}//End class
export default withRouter(ServicesList);