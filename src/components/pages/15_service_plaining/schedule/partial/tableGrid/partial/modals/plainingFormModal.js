import React, { Component } from 'react';
import { Modal } from 'antd';
import PlainingForm from '../../../../../plainingForm/form';

class PlainingFormModal extends Component {
  render() {
    const pr = this.props;
    const id = pr.data ? pr.data.id : (pr.id ? pr.id : '');
    // console.log(pr.data);
    return (
      <Modal
        width={'97%'}
        maskClosable={false}
        className="hide-footer"
        style={{ padding: '0px' }}
        centered={true}
        // title="Service Plaining Form"
        visible={pr.show}
        onOk={() => pr.onClose(false)}
        onCancel={() => pr.onClose(false)}
        destroyOnClose={true}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
        <div className="modal-modern-title-for-view-details">
          <div>
            <span className="title">Service Plaining Form {id && '(Edit)'}</span>
            <span className="sub-title">Support Worker Availability also available on right section</span>
          </div>
        </div>
        <PlainingForm id={id} scheduleData={pr.data} onClose={() => pr.onClose(true)} dataForAppointment={pr.dataForAppointment} setAppointmentLogOnAddUpdate={pr.setAppointmentLogOnAddUpdate} />
      </Modal>
    )//End return
  }//End render
}//End class
export default PlainingFormModal;