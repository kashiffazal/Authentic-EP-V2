import React, { Component } from 'react';
import { Modal } from 'antd';

class ShowRequestReasonModal extends Component {
  render() {
    const pr = this.props;
    return (
      <Modal
        // width={960}
        maskClosable={false}
        className="hide-footer"
        centered={true}
        // title={'Request Reason'}
        visible={pr.show}
        onCancel={() => pr.onClose()}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
        <div className="modal-modern-title">
          <div>
            <span className="title">Request Reason</span>
            <span className="sub-title">Reason of request by Support Worker</span>
          </div>
        </div>
        {pr.data}
      </Modal>
    );//End return
  }//End render
}//End class

export default ShowRequestReasonModal;