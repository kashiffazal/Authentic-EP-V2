import React, { Component } from 'react'
import { Row, Col } from 'antd';
import BoxWidgetMutual from './mutualBoxWidgets';
import ServicesList from './spPartials/servicesList';
import Availability from './spPartials/availabilityList';

class SPDashboard extends Component {
  render() {
    const pr = this.props;
    return (
      <React.Fragment>
        <Row gutter={window.rowGutter}>
          <Col lg={16} md={12} sm={24} xs={24}>
            <Row gutter={window.rowGutter}>
              <Col lg={6} md={12} sm={12} xs={24} className="c-wite view-padding-bottom-991">
                <BoxWidgetMutual loading={pr.loader} gradientClass="success-gred-box" glassClass="glass-bg" label={<div className="fs-20">Today</div>} subLabel={<span className="fs-12">All today services</span>} amount={<span><i className="la la-user-check" /> {pr.data.services ? pr.data.services.count.today : '-'}</span>} />
              </Col>
              <Col lg={6} md={12} sm={12} xs={24} className="c-wite view-padding-bottom-991">
                <BoxWidgetMutual loading={pr.loader} gradientClass="active-gred-box" glassClass="glass-bg" label={<div className="fs-20">Pending</div>} subLabel={<span className="fs-12">All pending services</span>} amount={<span><i className="la la-exclamation-circle" /> {pr.data.services ? pr.data.services.count.pending : '-'}</span>} />
              </Col>
              <Col lg={6} md={12} sm={12} xs={24} className="view-padding-bottom-576">
                <BoxWidgetMutual className="specific-border-2" loading={pr.loader} label={<div className="fs-20">Daily</div>} subLabel={<span className="fs-12">All daily services</span>} amount={<span><i className="la la-calendar-day status-active-color" /> {pr.data.services ? pr.data.services.count.daily : '-'}</span>} />
              </Col>
              <Col lg={6} md={12} sm={12} xs={24}>
                <BoxWidgetMutual className="specific-border-3" loading={pr.loader} label={<div className="fs-20">Weekly</div>} subLabel={<span className="fs-12">All weekly services</span>} amount={<span><i className="la la-calendar-week status-inactive-color" /> {pr.data.services ? pr.data.services.count.weekly : '-'}</span>} />
              </Col>
            </Row>
            <Row gutter={window.rowGutter} className="m-t-15">
              <Col lg={6} md={12} sm={12} xs={24} className="view-padding-bottom-991">
                <BoxWidgetMutual loading={pr.loader} label={<div className="fs-20">Monthly</div>} subLabel={<span className="fs-12">All monthly services</span>} amount={<span><i className="la la-calendar-check status-active-color" /> {pr.data.services ? pr.data.services.count.monthly : '-'}</span>} />
              </Col>
              <Col lg={6} md={12} sm={12} xs={24} className="view-padding-bottom-991">
                <BoxWidgetMutual loading={pr.loader} label={<div className="fs-20">Fortnightly</div>} subLabel={<span className="fs-12">All fortnightly services</span>} amount={<span><i className="la la-calendar-alt status-inactive-color" /> {pr.data.services ? pr.data.services.count.fortnightly : '-'}</span>} />
              </Col>
              <Col lg={12} md={24} sm={24} xs={24} className="view-padding-bottom-991">
                <BoxWidgetMutual className="specific-border-1" loading={pr.loader} label={<div className="fs-20">On Client(s) Requested</div>} subLabel={<span className="fs-12">All client's requested services</span>} amount={<span><i className="la la-user-tag status-hold-color" /> {pr.data.services ? pr.data.services.count.onClient : '-'}</span>} />
              </Col>
            </Row>
            {!window.tabletScreen && <Availability loader={pr.loader} data={pr.data.availability} />}
          </Col>
          <Col lg={8} md={12} sm={24} xs={24} className="view-padding-bottom-767">
            <ServicesList loader={pr.loader} data={pr.data.services} />
          </Col>
        </Row>
        {window.tabletScreen && <Availability loader={pr.loader} data={pr.data.availability} />}
      </React.Fragment>
    )//End return
  }//End render
}//End class
export default SPDashboard;