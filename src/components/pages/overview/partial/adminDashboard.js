import React, { Component } from 'react'
import { Row, Col } from 'antd';
import LineChart from './adminPartials/adminLineChart';
import RecentRegisteredUsers from './adminPartials/adminRecentRegisteredUsers';
import RecentNotes from './adminPartials/adminRecentNotes';
import RecentServices from './adminPartials/adminRecentService';
import BoxWidgetMutual from './mutualBoxWidgets';

class AdminDashboard extends Component {
  render() {
    const pr = this.props;
    return (
      <Row gutter={window.rowGutter}>
        <Col lg={8} md={10} sm={24} xs={24}>
          <RecentNotes data={pr.data.recent_notes} loader={pr.loader} />
          <RecentRegisteredUsers data={pr.data.recent_user} loader={pr.loader} />
          <Row gutter={window.rowGutter} className="m-t-15">
            <Col lg={12} md={24} sm={12} xs={24} className="view-padding-bottom-991">
              <BoxWidgetMutual loading={pr.loader} className="specific-border-1 last-boxes" label={<div><div>Services</div><div className="fs-11">(Approved)</div></div>} subLabel={<span className="fs-12">All approved services</span>} amount={<span><i className="la la-check-double status-active-color" /> {pr.data.count ? pr.data.count.srCount : '-'}</span>} />
            </Col>
            <Col lg={12} md={24} sm={12} xs={24} className="view-padding-bottom-576">
              <BoxWidgetMutual loading={pr.loader} className="specific-border-2 last-boxes" label={<div><div>Services</div><div className="fs-11">(Unapproved)</div></div>} subLabel={<span className="fs-12">All unapproved services</span>} amount={<span><i className="la la-exclamation status-inactive-color" /> {pr.data.count ? pr.data.count.sruCount : '-'}</span>} />
            </Col>
          </Row>
        </Col>
        <Col lg={16} md={14} sm={24} xs={24}>
          <Row gutter={window.rowGutter}>
            <Col lg={6} md={12} sm={12} xs={24} className="view-padding-bottom-991">
              <BoxWidgetMutual loading={pr.loader} label={<div><div>Support Worker</div><div className="fs-11">(Active)</div></div>} subLabel="All haired SP" amount={<span><i className="la la-check-circle status-active-color" /> {pr.data.count ? pr.data.count.spCount : '-'}</span>} />
            </Col>
            <Col lg={6} md={12} sm={12} xs={24} className="view-padding-bottom-991">
              <BoxWidgetMutual loading={pr.loader} label={<div><div>Support Worker</div><div className="fs-11">(Shortlisted)</div></div>} subLabel="All shortlisted SP" amount={<span><i className="la la-exclamation-circle status-inactive-color" /> {pr.data.count ? pr.data.count.spsCount : '-'}</span>} />
            </Col>
            <Col lg={6} md={12} sm={12} xs={24} className="c-wite view-padding-bottom-576">
              <BoxWidgetMutual loading={pr.loader} gradientClass="success-gred-box" glassClass="glass-bg" label={<div><div className="fs-20 lh-2-1">Client <span className="fs-11">(Active)</span></div></div>} subLabel="All active client" amount={<span><i className="la la-user-check" /> {pr.data.count ? pr.data.count.clCount : '-'}</span>} />
            </Col>
            <Col lg={6} md={12} sm={12} xs={24} className="c-wite">
              <BoxWidgetMutual loading={pr.loader} gradientClass="active-gred-box" glassClass="glass-bg" label={<div><div className="fs-20 lh-2-1">Client <span className="fs-11">(Inactive)</span></div></div>} subLabel="All inactive client" amount={<span><i className="la la-user-times" /> {pr.data.count ? pr.data.count.cliCount : '-'}</span>} />
            </Col>
          </Row>
          <RecentServices data={pr.data.recent_services} loader={pr.loader} />
          <LineChart data={pr.data.line_chart} loader={pr.loader} />
        </Col>
      </Row>
    )//End return
  }//End render
}//End class

export default AdminDashboard;