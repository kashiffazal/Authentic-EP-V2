import React, { Component } from 'react';
import { Modal, Row, Col, Button } from 'antd';

class ViewEditedShiftDetails extends Component {
  render() {
    const pr = this.props;
    const dt = pr.selectedShift;
    // console.log(dt);
    return (
      <Modal
        width={1100}
        maskClosable={false}
        className="hide-header hide-footer"
        style={{ padding: '0px' }}
        centered={true}
        title="Edited Shift Details"
        visible={pr.show}
        onOk={() => pr.onClose(false)}
        onCancel={() => pr.onClose(false)}
        destroyOnClose={true}
        zIndex={901}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
        <div className="modal-modern-title">
          <div className="first">
            <span className="title"><span>Edited Shift #</span> {dt.shift_no}</span>
            <span className="sub-title">Last Edited At <em>{dt.last_edit_date}</em></span>
          </div>
          {pr.allowEditBtn &&
            <div className="second">
              <Button type="primary" ghost className="pdf-btn" onClick={() => pr.onClickEditBtn()}><i className="las la-edit pos-relative top-2 fs-17" />&nbsp;Edit Again?</Button>
            </div>
          }
        </div>
        <Row gutter={30}>
          <Col lg={12} md={24} sm={24} xs={24}>
            <h3 className="row-col-join-heading pending-bg-color sticky-element">Original Shift Details</h3>
            <Row gutter={window.rowGutterSmall} className="row-col-as-table">
              <Col lg={12} md={12} sm={24} xs={24}><label>Service:</label><span className="value">{dt.service_name}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Service Date:</label><span className="value">{dt.service_date_formatted}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Ser. Start Time:</label><span className="value status-pending-color fw-500">{dt.service_start_time}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Set. End Time:</label><span className="value status-pending-color fw-500">{dt.service_end_time}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Meal Break (mins):</label><span className="value">{dt.meal_break_min ? dt.meal_break_min : '-'}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Rest Break (mins):</label><span className="value">{dt.rest_break_min ? dt.rest_break_min : '-'}</span></Col>
              <Col lg={24} md={24} sm={24} xs={24}><label>Shift Details:</label><span className="value">{dt.remarks ? <span className="textbox-value">{dt.remarks}</span> : '-'}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Inserted Date Time:</label><span className="value">{dt.sp_inserted_date}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Inserted By:</label><span className="value">{dt.sp_inserted_by}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Last Updated Date Time:</label><span className="value">{dt.sp_last_edit_date}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Last Updated By:</label><span className="value">{dt.sp_last_edit_by}</span></Col>
            </Row>
          </Col>
          <Col lg={12} md={24} sm={24} xs={24}>
            <h3 className="row-col-join-heading success-bg-color sticky-element">Edited Shift Details</h3>
            <Row gutter={window.rowGutterSmall} className="row-col-as-table">
              <Col lg={12} md={12} sm={24} xs={24}><label>Service:</label><span className="value">{dt.edited_service_name}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Service Date:</label><span className="value">{dt.edited_service_date_formatted}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Ser. Start Time:</label><span className="value status-active-color fw-500">{dt.edited_service_start_time}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Set. End Time:</label><span className="value status-active-color fw-500">{dt.edited_service_end_time}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Meal Break (mins):</label><span className="value">{dt.edited_meal_break_min ? dt.edited_meal_break_min : '-'}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Rest Break (mins):</label><span className="value">{dt.edited_rest_break_min ? dt.edited_rest_break_min : '-'}</span></Col>
              <Col lg={24} md={24} sm={24} xs={24}><label>Shift Details:</label><span className="value">{dt.edited_remarks ? <span className="textbox-value">{dt.edited_remarks}</span> : '-'}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Edit Date Time:</label><span className="value">{dt.edit_date}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Edited By:</label><span className="value">{dt.inserted_by}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Last Edit Date Time:</label><span className="value">{dt.last_edit_date}</span></Col>
              <Col lg={12} md={12} sm={24} xs={24}><label>Last Edited By:</label><span className="value">{dt.last_edit_by}</span></Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    )//End return
  }//End render
}//End Class
export default ViewEditedShiftDetails;