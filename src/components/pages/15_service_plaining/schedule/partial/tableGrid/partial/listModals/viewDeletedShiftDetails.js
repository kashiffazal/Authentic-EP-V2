import React, { Component } from 'react';
import { Modal, Row, Col, Button, Popconfirm } from 'antd';

class ViewDeletedShiftDetails extends Component {
  render() {
    const pr = this.props;
    const dt = pr.selectedShift;
    // console.log(dt);
    return (
      <Modal
        width={700}
        maskClosable={false}
        className="hide-header hide-footer"
        style={{ padding: '0px' }}
        centered={true}
        title="Deleted Shift Details"
        visible={pr.show}
        onOk={() => pr.onClose(false)}
        onCancel={() => pr.onClose(false)}
        destroyOnClose={true}
        zIndex={901}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()} disabled={pr.loader}><i className="las la-times" /></button>
        <div className="modal-modern-title">
          <div className="first">
            <span className="title"><span>Deleted Shift #</span> {dt.shift_no}</span>
            <span className="sub-title">Last Edited At <em>{dt.last_delete_date}</em></span>
          </div>
          {pr.allowRecoverBtn &&
            <div className="second">
              <Popconfirm
                title="Are you sure to recover this shift?"
                onConfirm={() => pr.onClickRecoverBtn()}
                okText="Yes Recover" cancelText="No" placement="topRight"
              >
                <Button type="primary" ghost className="pdf-btn" loading={pr.loader}><i className="las la-sync pos-relative top-2 fs-17" />&nbsp;Recover Shift</Button>
              </Popconfirm>
            </div>
          }
        </div>
        <Row gutter={window.rowGutterSmall} className="row-col-as-table">
          <Col lg={12} md={12} sm={24} xs={24}><label>Service:</label><span className="value">{dt.service_name}</span></Col>
          <Col lg={12} md={12} sm={24} xs={24}><label>Service Date:</label><span className="value">{dt.service_date_formatted}</span></Col>
          <Col lg={12} md={12} sm={24} xs={24}><label>Ser. Start Time:</label><span className="value status-active-color fw-500">{dt.service_start_time}</span></Col>
          <Col lg={12} md={12} sm={24} xs={24}><label>Set. End Time:</label><span className="value status-active-color fw-500">{dt.service_end_time}</span></Col>
          <Col lg={12} md={12} sm={24} xs={24}><label>Meal Break (mins):</label><span className="value">{dt.meal_break_min ? dt.meal_break_min : '-'}</span></Col>
          <Col lg={12} md={12} sm={24} xs={24}><label>Rest Break (mins):</label><span className="value">{dt.rest_break_min ? dt.rest_break_min : '-'}</span></Col>
          <Col lg={24} md={24} sm={24} xs={24}><label>Shift Details:</label><span className="value">{dt.remarks ? <span className="textbox-value">{dt.remarks}</span> : '-'}</span></Col>
          <Col lg={24} md={24} sm={24} xs={24}><label>Reason to Delete:</label><span className="value textbox-value">{dt.delete_recover_reason ? dt.delete_recover_reason : '-'}</span></Col>
          <Col lg={12} md={12} sm={24} xs={24}><label>Edit Date Time:</label><span className="value">{dt.delete_date}</span></Col>
          <Col lg={12} md={12} sm={24} xs={24}><label>Edited By:</label><span className="value">{dt.inserted_by}</span></Col>
          <Col lg={12} md={12} sm={24} xs={24}><label>Last Edit Date Time:</label><span className="value">{dt.last_delete_date}</span></Col>
          <Col lg={12} md={12} sm={24} xs={24}><label>Last Edited By:</label><span className="value">{dt.last_delete_by}</span></Col>
        </Row>
      </Modal>
    )//End return
  }//End render
}//End Class
export default ViewDeletedShiftDetails;