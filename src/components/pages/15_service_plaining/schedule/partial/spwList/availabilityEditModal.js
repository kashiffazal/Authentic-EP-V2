import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import AvailableForm from '../../../availabilityForm/form';

class ServiceAvailableEditModal extends Component {
  render() {
    const pr = this.props;
    // const dt = this.props.data;
    return (
      <Modal
        width={860}
        maskClosable={false}
        className="hide-footer"
        centered={true}
        // title={pr.data.name + ' | Day and Time Availability (Edit)'}
        visible={pr.show}
        onOk={() => pr.onClose()}
        onCancel={() => pr.onClose()}
        destroyOnClose={true}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
        <div className="modal-modern-title">
          <div>
            <span className="title">{pr.data.name + ' | Day and Time Availability (Edit)'}</span>
            <span className="sub-title">Edit Support Worker Availability</span>
          </div>
        </div>
        <AvailableForm id={pr.data.id} updatedData={(e) => { pr.updatedData(e); pr.onClose() }} showLabel={true} />
      </Modal>
    )//End return
  }//End render
}//End class
export default ServiceAvailableEditModal;