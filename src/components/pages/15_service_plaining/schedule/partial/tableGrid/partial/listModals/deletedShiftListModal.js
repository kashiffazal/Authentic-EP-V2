import React, { Component } from 'react'
import { Modal, Empty, Popconfirm } from 'antd';
import moment from 'moment';
import { HTTP, DeleteRowFromList, FormatDate, GetCurrentDate, GetObjectFromArr, UpdateRowInList } from '../../../../../../../services';
import ScreenLoader from '../../../../../../../externalComponents/screen-loader';
import ViewDetailModal from '../../../../../plainingLog/partial/viewDetailModal';
import ViewDeletedShiftDetails from './viewDeletedShiftDetails';
import CrossTimeModal from '../../../../../plainingForm/crossTimeModal';

class DeleteShiftListModal extends Component {
  state = {
    loader: false,
    postLoader: {},
    data: [],
    showPlainingViewModal: false,
    shiftId: '',
    showShiftEditFormModal: false,
    selectedShift: {},
    showShiftEditViewModal: false,
    crossTimeModalShow : false,
    crossTimeData: {}
  }//End state

  getDeletedShiftsList = () => {
    let pr = this.props;
    this.setState({ loader: true });
    HTTP('post', '/servicePlaining/get/getDeletedShiftList/from/' + pr.dateFrom + '/to/' + pr.dateTo).then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      // console.log(res.data);
      this.setState({ data: res.data })
    });
  }//End function

  recoverShift = (shift) => {
    let editedShiftId = shift.shift_edit_ref_id;
    let postLoader = this.state.postLoader;
    postLoader[editedShiftId] = true;
    this.setState({ postLoader });
    HTTP('post', '/servicePlaining/post/recoverDeletedShift/', shift).then(res => {
      postLoader[editedShiftId] = false;
      this.setState({ postLoader });
      if (!res) { return false; }

      //?If there is cross time Error then show Modal for all cross time visibility
      if (res.timeCrossError) {
        this.setState({ crossTimeModalShow: true, crossTimeData: res });
        return false;
      }//End if condition

      this.setState({ data: DeleteRowFromList(this.state.data, editedShiftId, 'shift_edit_ref_id'), showShiftEditViewModal: false });
      //@ Update recovery on Schedule Grid
      let uniqueId = shift.unique_recurring_id + '-' + shift.spw_ref_id;
      let dt = GetObjectFromArr(uniqueId, 'unique_recurring_id', this.props.shiftArrToRecover);
      dt.delete_recover_status = 'recover';
      this.props.onRecoverShift && this.props.onRecoverShift(UpdateRowInList(dt, this.props.shiftArrToRecover, 'unique_recurring_id'));

      //?If there is a Partner then Update Both one by one by change 'unique_recurring_id';
      if (shift.spw_partner_ref_id) {
        let uniqueId = shift.unique_recurring_id + '-' + shift.spw_partner_ref_id;
        let dt = GetObjectFromArr(uniqueId, 'unique_recurring_id', this.props.shiftArrToRecover);
        dt.delete_recover_status = 'recover';
        this.props.onRecoverShift && this.props.onRecoverShift(UpdateRowInList(dt, this.props.shiftArrToRecover, 'unique_recurring_id'));
      }//End if condition

    });
  }//End if condition

  render() {
    const pr = this.props;
    const st = this.state;
    const cDate = GetCurrentDate('YYYY-MM-DD');
    var notPreviousDays = (moment(pr.dateTo).isSame(cDate) || moment(pr.dateTo).isAfter(cDate))
    return (
      <React.Fragment>
        <Modal
          width={1100}
          maskClosable={false}
          className="hide-header hide-footer"
          style={{ padding: '0px' }}
          centered={true}
          title="Deleted Shift(s) List"
          visible={pr.show}
          onOk={() => pr.onClose(false)}
          onCancel={() => pr.onClose(false)}
          destroyOnClose={true}
          zIndex={900}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">Deleted Shift(s) List</span>
              <span className="sub-title">From {FormatDate(pr.dateFrom, 'MMM Do YYYY')} to {FormatDate(pr.dateTo, 'MMM Do YYYY')}</span>
            </div>
            {/* <div>
              <div className="bullet-color-pending" />&nbsp; Previous
              &nbsp;&nbsp;
              <div className="bullet-color-success" />&nbsp; Deleted
            </div> */}
          </div>
          <ScreenLoader active={st.loader}>
            {st.loader ? <div className="h-200"></div> :
              <div className="table-responsive-container">
                <table className="table-info" border='1'>
                  <thead>
                    <tr>
                      <th width="2%" className="th-highlight" align="center">Sr.</th>
                      <th width="10%" align="center" className="th-highlight">Shift No</th>
                      <th width="25%" align="center" className="th-highlight">SPW Name & Partner</th>
                      <th width="11%" align="center" className="th-highlight">Service Date</th>
                      <th width="17%" align="center" className="th-highlight">Start & End Time</th>
                      <th width="22%" align="center" className="th-highlight">Deleted Date & Time</th>
                      <th width="13%" align="center" className="th-highlight">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {st.data.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td align="center">{i + 1}</td>
                          <td align="center" className="td-highlight"><button className="btnToLink link-color" onClick={() => this.setState({ shiftId: item.id, showPlainingViewModal: true })}><strong>{item.shift_no}</strong></button></td>
                          <td align="center">{item.sw_name}</td>
                          <td align="center" className="cell-color-success">{item.service_date_formatted}</td>
                          <td align="center" className="cell-color-success">{item.service_start_time} - {item.service_end_time}</td>
                          <td align="center">{item.last_delete_date}</td>
                          <td align="center">
                            <ScreenLoader active={st.postLoader[item.shift_edit_ref_id]} inline={true} tip="Loading">
                              <button className="btnToLink link-color" onClick={() => this.setState({ showShiftEditViewModal: true, selectedShift: item })}>View</button>
                              {notPreviousDays &&
                                <>
                                  &nbsp;<i className="list_view_icon_sap las la-redo pos-relative top--1-imp" />&nbsp;
                                  <Popconfirm
                                    title="Are you sure to recover this shift?"
                                    onConfirm={() => this.recoverShift(item)}
                                    okText="Yes Recover" cancelText="No" placement="topRight"
                                  ><button className="btnToLink link-color">Recover</button>
                                  </Popconfirm>
                                </>
                              }
                            </ScreenLoader>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {st.data.length < 1 && <div className="empty-table"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
              </div>
            }
          </ScreenLoader>
        </Modal>
        <ViewDetailModal dataId={st.shiftId} show={st.showPlainingViewModal} onClose={() => this.setState({ showPlainingViewModal: false })} />
        <ViewDeletedShiftDetails show={st.showShiftEditViewModal} onClose={() => this.setState({ showShiftEditViewModal: false })} selectedShift={st.selectedShift}
          onClickRecoverBtn={() => this.recoverShift(st.selectedShift)}
          loader={st.postLoader[st.selectedShift.shift_edit_ref_id]}
          allowRecoverBtn={notPreviousDays}
        />
        <CrossTimeModal show={st.crossTimeModalShow} close={() => this.setState({ crossTimeModalShow: false })} data={st.crossTimeData} />
      </React.Fragment>
    )//End return
  }//End render
  componentDidUpdate(preProps) {
    if (this.props.show && (preProps.show !== this.props.show)) {
      this.getDeletedShiftsList();
    }//End if condition
  }//End componentDidUpdate
}//End Class
export default DeleteShiftListModal;