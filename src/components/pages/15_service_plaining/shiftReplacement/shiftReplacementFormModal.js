import React, { Component } from 'react';
import { Modal } from 'antd';
import ShiftReplacementForm from './shiftReplacementForm';
import '../styles.less';

class ShiftReplacementFormModal extends Component {
  state = {
    data: {},
  }//End state

  render() {
    const pr = this.props;
    const st = this.state;
    const data = st.data.requestData ? st.data.requestData : {};
    const shift = st.data.shiftDetails ? st.data.shiftDetails : {};
    // console.log(st.data);
    return (
      <Modal
        width='97%'
        maskClosable={false}
        className="hide-footer"
        centered={true}
        // title={`Shift Replacement - 
        //   ${data.requested_by_name ?
        //     ('Requested by ' + data.requested_by_name + (data.spw2_ref_id && ' (Partner)')) :
        //     'Requested by Admin for ' + (data.spw2_ref_id ? shift.swp2_name + ' (Partner)' : shift.swp1_name)
        //   } 
        // `}
        visible={pr.show}
        destroyOnClose={true}
        // zIndex={1000}
        onCancel={() => pr.onClose()}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
        <div className="modal-modern-title-for-view-details">
          <div>
            <span className="title">{`Shift Replacement - 
          ${data.requested_by_name ?
                ('Requested by ' + data.requested_by_name + (data.spw2_ref_id && ' (Partner)')) :
                'Requested by Admin for ' + (data.spw2_ref_id ? shift.swp2_name + ' (Partner)' : shift.swp1_name)
              }`}</span>
            <span className="sub-title">Request for replacement form</span>
          </div>
        </div>
        <ShiftReplacementForm requestId={pr.requestId} onClose={pr.onClose} onReplaced={pr.onReplaced}
          onLoad={(e) => this.setState({ data: e })}
        />
      </Modal>
    );//End return
  }//End render
}//End class

export default ShiftReplacementFormModal;