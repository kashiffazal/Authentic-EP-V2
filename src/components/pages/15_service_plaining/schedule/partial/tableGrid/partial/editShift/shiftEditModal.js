import React, { Component } from 'react';
import { Row, Col, Modal } from 'antd';
import ShiftEdit from './shiftEdit';
import ViewDetails from '../../../../../plainingLog/partial/viewDetails';
import { FormatDate } from '../../../../../../../services';

class ShiftEditModal extends Component {
  render() {
    const pr = this.props;
    const shiftData = pr.selectedShift;
    // console.log(shiftData);
    return (
      <React.Fragment>
        <Modal
          width={'97%'}
          className="hide-footer"
          centered={true}
          // title={`Edit Shift for ${shiftData.shift_no} (${shiftData.service_day} - ${FormatDate(shiftData.service_date)} | From ${shiftData.service_start_time} To ${shiftData.service_end_time})`}
          visible={pr.show}
          onOk={() => pr.onClose()}
          onCancel={() => pr.onClose()}
          zIndex={1000}
          maskClosable={false}
          destroyOnClose={true}
        // keyboard={false}//Esc button will not work
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
          <div className="modal-modern-title-for-view-details">
            <div>
              <span className="title">{`Edit Shift for ${shiftData.shift_no}`}</span>
              <span className="sub-title">{`${shiftData.service_day} - ${FormatDate(shiftData.service_date)} | From ${shiftData.service_start_time} To ${shiftData.service_end_time}`}</span>
            </div>
          </div>
          <Row gutter={window.rowGutter}>
            <Col lg={16} md={16} sm={24} xs={24}>
              <ShiftEdit shiftData={shiftData} onClose={() => pr.onClose()} shiftArr={pr.shiftArr} updateShift={(data) => pr.updateShift(data)} updateEditShiftList={pr.updateEditShiftList} />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <ViewDetails dataId={shiftData.id} />
            </Col>
          </Row>
        </Modal>
      </React.Fragment>
    )//End return
  }//End render
}//End class
export default ShiftEditModal;