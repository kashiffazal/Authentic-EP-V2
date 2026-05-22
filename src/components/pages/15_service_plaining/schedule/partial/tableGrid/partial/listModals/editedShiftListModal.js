import React, { Component } from 'react'
import { Modal, Empty } from 'antd';
import moment from 'moment';
import { HTTP, UpdateRowInList, DeleteRowFromList, FormatDate, GetCurrentDate, GetCurrentTime } from '../../../../../../../services';
import ScreenLoader from '../../../../../../../externalComponents/screen-loader';
import ViewDetailModal from '../../../../../plainingLog/partial/viewDetailModal';
import ShiftEditModal from '../editShift/shiftEditModal';
import ViewEditedShiftDetails from './viewEditedShiftDetails';

class EditShiftListModal extends Component {
  state = {
    loader: false,
    data: [],
    showPlainingViewModal: false,
    shiftId: '',
    showShiftEditFormModal: false,
    selectedShift: {},
    showShiftEditViewModal: false,
  }//End state

  getEditedShiftsList = () => {
    let pr = this.props
    this.setState({ loader: true });
    HTTP('post', '/servicePlaining/get/getEditedShiftList/from/' + pr.dateFrom + '/to/' + pr.dateTo).then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.setState({ data: res.data })
    });
  }//End function

  updateEditShiftList = (e) => {
    // console.log(e);
    // let data = [...this.state.data];
    let editedShiftId = this.state.selectedShift.shift_edit_ref_id;
    if (e.delete_recover_status === 'deleted') {
      this.setState({ data: DeleteRowFromList(this.state.data, editedShiftId, 'shift_edit_ref_id'), showShiftEditViewModal: false });
    } else {
      let updateObj = {
        shift_edit_ref_id: e.shift_edit_ref_id,
        edited_service_date_formatted: FormatDate(e.service_date),
        edited_service_start_time: e.service_start_time,
        edited_service_end_time: e.service_end_time,
        last_edit_date: GetCurrentDate() + ', ' + GetCurrentTime()
      }//End creating Obj
      this.setState({ data: UpdateRowInList(updateObj, this.state.data, 'shift_edit_ref_id'), showShiftEditViewModal: false });
    }//End if condition
  }//End function

  render() {
    const pr = this.props;
    const st = this.state;

    const cDate = GetCurrentDate('YYYY-MM-DD');
    var notPreviousDays = (moment(pr.dateTo).isSame(cDate) || moment(pr.dateTo).isAfter(cDate));
    return (
      <React.Fragment>
        <Modal
          width={'100%'}
          maskClosable={false}
          className="hide-header hide-footer"
          style={{ padding: '0px' }}
          centered={true}
          title="Edited Shift(s) List"
          visible={pr.show}
          onOk={() => pr.onClose(false)}
          onCancel={() => pr.onClose(false)}
          destroyOnClose={true}
          zIndex={900}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">Edited Shift(s) List</span>
              <span className="sub-title">From {FormatDate(pr.dateFrom, 'MMM Do YYYY')} to {FormatDate(pr.dateTo, 'MMM Do YYYY')}</span>
            </div>
            <div>
              <div className="bullet-color-pending" />&nbsp; Previous
              &nbsp;&nbsp;
              <div className="bullet-color-success" />&nbsp; Edited
            </div>
          </div>
          <ScreenLoader active={st.loader}>
            {st.loader ? <div className="h-200"></div> :
              <div className="table-responsive-container">
                <table className="table-info" border='1'>
                  <thead>
                    <tr>
                      <th width="2%" className="th-highlight" align="center">Sr.</th>
                      <th width="8%" align="center" className="th-highlight">Shift No</th>
                      <th width="18%" align="center" className="th-highlight">SPW Name & Partner</th>
                      <th width="9%" align="center" className="th-highlight">Service Date</th>
                      <th width="13%" align="center" className="th-highlight">Start & End Time </th>
                      <th width="9%" align="center" className="th-highlight">Service Date</th>
                      <th width="13%" align="center" className="th-highlight">Start & End Time</th>
                      <th width="18%" align="center" className="th-highlight">Last Edited Date & Time</th>
                      <th width="10%" align="center" className="th-highlight">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {st.data.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td align="center">{i + 1}</td>
                          <td align="center" className="td-highlight"><button className="btnToLink link-color" onClick={() => this.setState({ shiftId: item.id, showPlainingViewModal: true })}><strong>{item.shift_no}</strong></button></td>
                          <td align="center">{item.sw_name}</td>
                          <td align="center" className="cell-color-pending">{item.service_date_formatted}</td>
                          <td align="center" className="cell-color-pending">{item.service_start_time} - {item.service_end_time}</td>
                          <td align="center" className="cell-color-success">{item.edited_service_date_formatted}</td>
                          <td align="center" className="cell-color-success">{item.edited_service_start_time} - {item.edited_service_end_time}</td>
                          <td align="center">{item.last_edit_date}</td>
                          <td align="center">
                            <button className="btnToLink link-color" onClick={() => this.setState({ showShiftEditViewModal: true, selectedShift: item })}>View</button>
                            {notPreviousDays &&
                              <>
                                &nbsp;<i className="list_view_icon_sap las la-redo pos-relative top--1-imp" />&nbsp;
                                <button className="btnToLink link-color" onClick={() => this.setState({ showShiftEditFormModal: true, selectedShift: item })}>Edit</button>
                              </>
                            }
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
        <ShiftEditModal show={st.showShiftEditFormModal} onClose={() => this.setState({ showShiftEditFormModal: false })} selectedShift={st.selectedShift} shiftArr={pr.shiftArr} updateShift={(data) => pr.updateShift(data)} updateEditShiftList={(e) => this.updateEditShiftList(e)} />
        <ViewEditedShiftDetails show={st.showShiftEditViewModal} onClose={() => this.setState({ showShiftEditViewModal: false })} selectedShift={st.selectedShift}
          onClickEditBtn={() => this.setState({ showShiftEditFormModal: true, })}
          allowEditBtn={notPreviousDays} />
      </React.Fragment>
    )//End return
  }//End render
  componentDidUpdate(preProps) {
    if (this.props.show && (preProps.show !== this.props.show)) {
      this.getEditedShiftsList();
    }//End if condition
  }//End componentDidUpdate
}//End Class
export default EditShiftListModal;