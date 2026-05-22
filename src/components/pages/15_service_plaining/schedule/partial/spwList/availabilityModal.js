import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { Button, Modal, Alert } from 'antd';
import ServiceAvailableEditModal from './availabilityEditModal';
import { AccessControl } from '../../../../../services';

class AvailabilityModal extends Component {
  state = {
    visibleEdit: false
  }
  render() {
    const pr = this.props;
    const data = this.props.data;
    const dt = data.days_availibility_json;
    const st = this.state;
    return (
      <React.Fragment>
        <Modal
          width={window.gjModalWidthSmall}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={data.name + ' | Day and Time Availability'}
          visible={pr.show}
          onOk={() => pr.onClose()}
          onCancel={() => pr.onClose()}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">{data.name + ' | Day and Time Availability'}</span>
              <span className="sub-title">Support Worker Availability</span>
            </div>
          </div>
          <div className="schedule-availability-container">
            {AccessControl(131) &&
              <Alert message={
                <div className="edit-section">
                  <div>Support Worker availability in a full week.</div>
                  <div><Button type="primary" size="small" onClick={() => this.setState({ visibleEdit: true }, () => { pr.onClose() })}><span className="hide-on-mobile"><i className="las la-clock pos-relative top-1" /> &nbsp;Want to&nbsp;</span>Edit?</Button></div>
                </div>
              } type="info" showIcon className="m-b-10-imp" />
            }
            <div className="availability-container">
              <div className="heading-col">
                <div>Days</div>
                <div>From</div>
                <div>To</div>
                <div>Status</div>
              </div>
              {dt && dt.from && Object.keys(dt.day).map((item, index) => {
                return (
                  <div key={index} className="content-col">
                    <div>{dt.day[index + 1]}</div>
                    <div>{dt.from[index + 1]}</div>
                    <div>{dt.to[index + 1]}</div>
                    <div>{(dt.from[index + 1] !== '-') ?
                      <span className="success-color"><span>Available</span> <span><i className="fs-18 pos-relative top-1 las la-check-circle" /></span></span>
                      :
                      <span className="pending-color"><span>Not Available</span> <span><i className="fs-18 pos-relative top-1 las la-exclamation-circle" /></span></span>
                    }</div>
                  </div>
                )
              })}
            </div>
          </div>
        </Modal>
        <ServiceAvailableEditModal data={data} show={st.visibleEdit} onClose={() => this.setState({ visibleEdit: false })} updatedData={(e) => pr.updatedData(e)} />
      </React.Fragment>
    )//End return
  }//End render
}//End class
export default AvailabilityModal;