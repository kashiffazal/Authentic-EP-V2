import React, { Component } from 'react';
import { Modal } from 'antd';
import ViewDetails from './viewDetails';

class ViewDetailsModal extends Component {
  render() {
    const pr = this.props;
    return (
      <Modal
        width={760}
        maskClosable={false}
        className="hide-footer"
        centered={true}
        // title={''}
        visible={pr.show}
        destroyOnClose={true}
        onCancel={() => pr.onClose()}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
        <div className="modal-modern-title-for-view-details">
          <div>
            <span className="title">View Service Details</span>
            <span className="sub-title">Service Plaining Detailed View</span>
          </div>
        </div>
        {this.props.children}
        <ViewDetails dataId={pr.dataId} replacedId={pr.replacedId} editShiftId={pr.editShiftId} />
      </Modal>
    );//End return
  }//End render
}//End class

export default ViewDetailsModal;