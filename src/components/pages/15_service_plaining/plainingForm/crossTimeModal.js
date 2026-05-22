import React, { Component } from 'react';
import { Modal, Button, Alert } from 'antd';
import ViewDetailModal from '../plainingLog/partial/viewDetailModal';

class CrossTimeModal extends Component {
  state = {
    showPlainingViewModal: false,
    shiftId: '',
  }//End state
  render() {
    const st = this.state;
    const pr = this.props;
    const dt = pr.data;
    // console.log(dt);
    return (
      <React.Fragment>
        <Modal
          width={960}
          maskClosable={false}
          className="hide-header"
          centered={true}
          // title={'View Service Details'}
          visible={pr.show}
          destroyOnClose={true}
          onCancel={() => pr.close()}
          footer={[
            <div className="modal-side-by-side-button-msg">Please change the selected time that should be available.</div>,
            <Button key="cancel" type="primary" className="m-r-10" onClick={() => pr.close()}>
              Cancel
            </Button>
          ]}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.close()}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">View Service Details</span>
              <span className="sub-title">List if all cross services</span>
            </div>
          </div>
          <Alert message={dt.errorMsg} type="info" showIcon className="m-b-10-imp" />
          <div className="table-responsive-container">
            <table className="table-info" border='1'>
              <thead>
                <tr>
                  <th className="th-highlight">Sr.</th>
                  <th align="center" className="th-highlight">Shift No</th>
                  <th align="center" className="th-highlight">Frequency</th>
                  <th align="center" className="th-highlight">Service Date</th>
                  <th align="center" className="th-highlight">Service Day</th>
                  <th align="center" className="th-highlight">Start Time</th>
                  <th align="center" className="th-highlight">End Time</th>
                  <th align="center" className="th-highlight">From Date</th>
                  <th align="center" className="th-highlight">To Date</th>
                </tr>
              </thead>
              <tbody>
                {dt.data && dt.data.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td align="center">{i + 1}</td>
                      <td align="center" className="td-highlight"><button className="btnToLink link-color" onClick={() => this.setState({ shiftId: item.id, showPlainingViewModal: true })}><strong>{item.shift_no}</strong></button></td>
                      <td align="center">{item.frequency_name}</td>
                      <td align="center">{item.service_date ? item.service_date : '-'}</td>
                      <td align="center">{item.service_day ? item.service_day : '-'}</td>
                      <td align="center">{item.service_start_time}</td>
                      <td align="center">{item.service_end_time}</td>
                      <td align="center">{item.service_from_date}</td>
                      <td align="center">{item.service_to_date ? item.service_to_date : <i className="las la-infinity fs-17 lh-0 pos-relative top-1" />}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Modal>
        <ViewDetailModal dataId={st.shiftId} show={st.showPlainingViewModal} onClose={() => this.setState({ showPlainingViewModal: false })} />
      </React.Fragment>
    )//end return
  }//End render
}//End class
export default CrossTimeModal;