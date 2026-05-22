import React, { Component } from 'react';
import { Modal } from 'antd';
import AppointmentForm from './appointmentForm';


class AppointmentFormModal extends Component {
  state = {
    appointment_no: ''
  }//End state
  render() {
    const pr = this.props;
    const prd = pr.data ? pr.data : {};
    // console.log(prd);
    return (
      <Modal
        width={prd.service_plaining_ref_id ? 1336 : 740}
        maskClosable={false}
        className="hide-header hide-footer"
        centered={true}
        title={pr.dataId ? 'Update Appointment' : 'Add Appointment'}
        visible={pr.show}
        onCancel={() => pr.onClose()}
        destroyOnClose={true}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
        <div className="modal-modern-title">
          <div>
            <span className="title">Add New Appointment</span>
            <span className="sub-title">Appointment # {prd.appointment_no ? prd.appointment_no : this.state.appointment_no}</span>
          </div>
          {/* <div>
            <Button type="primary" ghost className="pdf-btn" onClick={() => this.setState({ viewPDF: true })}><i className="las la-file-pdf pos-relative top-2 fs-17" />&nbsp;View Care Plan PDF</Button>
          </div> */}
        </div>
        <AppointmentForm
          dataId={prd.id}
          newAppointmentNo={(e) => this.setState({ appointment_no: e })}
          addData={pr.addData}
          updateData={pr.updateData}
          onClose={pr.onClose}
          internalForm={true}
          clientId={pr.clientId}
        />
      </Modal>
    );//End return
  }//End render
}//End class

export default AppointmentFormModal;