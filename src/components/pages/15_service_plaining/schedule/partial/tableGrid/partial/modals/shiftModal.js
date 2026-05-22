import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { Modal, Alert, Button, Tooltip, Popconfirm } from 'antd';
import moment from 'moment';
import { GetHourAndMinuteFromTowTime, FormatDate, AccessControl } from '../../../../../../../services';
import ViewDetailModal from '../../../../../plainingLog/partial/viewDetailModal';
import ReplacementRequestModule from '../../../../../shiftReplacement/requestModal';
import DetailsInTooltip from '../details-in-tooltip';

class ShiftModal extends Component {
  state = {
    hourWidth: 4.16,
    showPlainingViewModal: false,
    selectedShift: {},
    requestId: '',
    replacedId: '',
    viewReplacementRequestModal: false,
    replaceRequestFor: ''
  }//End state

  getStartAndEndPositionForShiftOnGrid = (data) => {
    let st = this.state;
    let startTime = data.service_start_time;
    let endTime = data.service_end_time;

    let startFrom = GetHourAndMinuteFromTowTime('12:00:00 AM', startTime);
    startFrom = startFrom.split(':');
    startFrom[0] = parseInt(startFrom[0]) * st.hourWidth;
    startFrom[1] = (parseInt(startFrom[1]) * st.hourWidth) / 60;
    startFrom = startFrom[0] + startFrom[1];
    // console.log(startFrom[1]+' - '+startTime);

    let width = GetHourAndMinuteFromTowTime(startTime, endTime);
    width = width.split(':');
    width[0] = parseInt(width[0]) * st.hourWidth;
    width[1] = (parseInt(width[1]) * st.hourWidth) / 60;
    width = width[0] + width[1];
    // console.log(endTo+' - '+startTime+' - '+endTime);

    //Adjustment
    let adjustment = 0.2;
    startFrom = startFrom + adjustment;
    width = width - adjustment;

    return { 'left': startFrom + '%', 'width': width + '%' };
  }//End function

  getServiceTimeDuration = (startTime, endTime) => {
    startTime = moment(startTime, "hh:mm A");
    endTime = moment(endTime, "hh:mm A");
    let diff = endTime.diff(startTime, 'minutes');
    let res = null;
    if (diff === 60) { res = '1'; }
    if (diff < 60) { res = '0'; }
    return res;
  }//End function

  getTotalTime = (dt) => {
    let totalTime = 0;
    dt.forEach(i => { totalTime = totalTime + moment(i.service_end_time, "hh:mm A").diff(moment(i.service_start_time, "hh:mm A"), 'minutes'); })
    totalTime = moment.duration(totalTime, "minutes");
    var h = totalTime._data.hours.toString();
    var m = totalTime._data.minutes.toString();
    totalTime = (h.length === 1 ? '0' + h : h) + ':' + (m.length === 1 ? '0' + m : m);
    return totalTime;
  }//End function

  // replaceSPWOnSpecificShift = (selectedShift) => {
  //   alert(selectedShift);
  // }//End function
  render() {
    const st = this.state;
    const pr = this.props;
    const dt = pr.selectDateCol ? (pr.spwData.shifts[pr.selectDateCol] ? pr.spwData.shifts[pr.selectDateCol] : []) : [];
    // console.log(dt);
    const hourList = pr.hourList ? pr.hourList : [];
    // console.log(hourList);
    const spwData = pr.spwData;
    return (
      <React.Fragment>
        <Modal
          width={'100%'}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={`${FormatDate(pr.selectDateCol, 'Do MMM')} - ${FormatDate(pr.selectDateCol, 'dddd')} | ${dt.length} Shifts  ${pr.replacementStatus ? 'Requested for Replacement' : 'for ' + spwData.name} (Total Time ${this.getTotalTime(dt)})`}
          visible={pr.show}
          onOk={() => pr.onClose()}
          onCancel={() => pr.onClose()}
          destroyOnClose={true}
          zIndex={900}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
          <div className="modal-modern-title-for-view-details">
            <div>
              <span className="title">{`${FormatDate(pr.selectDateCol, 'Do MMM')} - ${FormatDate(pr.selectDateCol, 'dddd')}`}</span>
              <span className="sub-title">{`${dt.length} Shifts  ${pr.replacementStatus ? 'Requested for Replacement' : 'for ' + spwData.name} (Total Time ${this.getTotalTime(dt)})`}</span>
            </div>
          </div>
          <div className="schedule-time-grid-container">
            {/*If Replacement shift is NOT viewing then show single row*/}
            {!pr.replacementStatus ?
              hourList &&
              <div className="time-grid">
                <div className="row">{hourList.map((i, key) => { return (<div className="column head" style={{ width: st.hourWidth + '%' }} key={key}><div>{i}</div></div>) })}</div>
                <div className="row row-bb">
                  {hourList.map((i, key) => {
                    return (
                      <div className="column" style={{ width: st.hourWidth + '%' }} key={key}>
                        <div className="shift-box">
                          {(pr.notPreviousDays && AccessControl(123)) ?
                            <button className="btnToLink add-shift-btn" onClick={() => pr.onAdd(
                              moment(i, "hh A").format("hh:mm A"),
                              moment(i, "hh A").add('60', 'minutes').format("hh:mm A")
                            )}><i className="las la-plus" /></button>
                            :
                            <span className="add-shift-btn"><i className="las la-ellipsis-h" /></span>
                          }
                        </div>
                      </div>
                    )
                  })}
                </div>
                {dt.map((i, k) => {
                  var std = this.getServiceTimeDuration(i.service_start_time, i.service_end_time);
                  return (
                    (i.delete_recover_status !== 'deleted') //@ Hide Deleted Shift, Just uncomment to show
                    &&
                    <Tooltip key={k} placement="top" title={<DetailsInTooltip data={i} />}>
                      <button
                        onClick={() => this.setState({ selectedShift: i, requestId: i.request_id, replacedId: i.replaced_spw_table_id, showPlainingViewModal: true })}
                        className={`shift-on-time-button ${i.delete_recover_status === 'deleted' ? 'shift-deleted-btn' : ''}`} style={this.getStartAndEndPositionForShiftOnGrid(i)}>
                        <div className={`texture ${std === '1' ? 'one-hour-shift' : ''}`}>
                          <div className="w-full">
                            <div className="fw-500">{i.shift_no}</div>
                            {std !== '0' && <div>{i.service_start_time}</div>}
                            {std !== '0' && <div>{i.service_end_time}</div>}
                            {std !== '0' && <div className="client_name_box">{i.client_name}</div>}
                          </div>
                        </div>
                      </button>
                    </Tooltip>
                  )
                })}
              </div>
              :
              <div className="time-grid">
                {/*If Replacement shift is viewing then show multiple row to separate time*/}
                <div className="row">{hourList.map((i, key) => { return (<div className="column head" style={{ width: st.hourWidth + '%' }} key={key}><div>{i}</div></div>) })}</div>
                {hourList &&
                  dt.map((i, k) => {
                    var std = this.getServiceTimeDuration(i.service_start_time, i.service_end_time);
                    return (
                      <div className="time-grid" key={k}>
                        <div className={`row ${dt.length === (k + 1) ? 'row-bb' : ''}`}>
                          {hourList.map((h, key) => {
                            return (
                              <div className="column" style={{ width: st.hourWidth + '%' }
                              } key={key} >
                                <div className="shift-box" >
                                  <button className="btnToLink add-shift-btn"><i className="las la-ellipsis-h" /></button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        <button
                          onClick={() => this.setState({ selectedShift: i, requestId: i.request_id, replacedId: i.replaced_spw_table_id, showPlainingViewModal: true })}
                          key={k} className="shift-on-time-button" style={this.getStartAndEndPositionForShiftOnGrid(i)}>
                          <div className={`texture ${std === '1' ? 'one-hour-shift' : ''}`}>
                            <div>
                              <div className="fw-500">{i.shift_no}</div>
                              {std !== '0' && <div>{i.service_start_time}</div>}
                              {std !== '0' && <div>{i.service_end_time}</div>}
                            </div>
                          </div>
                        </button>
                      </div>
                    )
                  })}
              </div>
            }
          </div>
        </Modal>
        <ViewDetailModal dataId={st.selectedShift.id} replacedId={st.replacedId} editShiftId={st.selectedShift.shift_edit_ref_id} show={st.showPlainingViewModal} onClose={() => this.setState({ showPlainingViewModal: false })} >
          {(pr.replacementStatus || st.replacedId) ?
            <Alert message={st.replacedId ? "Want to Edit the assign Support Worker" : "Assign Support Worker to this shift."} type="info" showIcon className="m-b-10-imp"
              action={<Button type="primary" size="small" onClick={() => { this.setState({ showPlainingViewModal: false }); pr.onClickShiftReplacement(st.requestId) }}><span className="hide-on-mobile"><i className="las la-sync pos-relative top-1" /> &nbsp;Want to&nbsp;</span>{st.replacedId ? 'Edit' : 'Assign'}?</Button>}
            />
            :
            (pr.notPreviousDays && AccessControl('124,125,126')) &&
            <Alert message="Do you want to edit this shift?" type="info" showIcon className="m-b-10-imp"
              action={
                <React.Fragment>
                  {AccessControl(124) && <Button type="primary" size="small" onClick={() => { this.setState({ showPlainingViewModal: false }); pr.shiftEdit(st.selectedShift) }} className="m-r-2"><span className="hide-on-mobile"><i className="las la-edit pos-relative top-1" />&nbsp;Shift&nbsp;</span>Edit | {st.selectedShift.delete_recover_status === 'deleted' ? 'Recover' : 'Deleted'}?</Button>}
                  {AccessControl(125) && <Button type="primary" size="small" onClick={() => { this.setState({ showPlainingViewModal: false }); pr.onClickShift(st.selectedShift.id) }} className="m-r-2"><span className="hide-on-mobile"><i className="las la-clock pos-relative top-1" />&nbsp;Service Plaining&nbsp;</span>Edit?</Button>}
                  {AccessControl(126) && <Tooltip placement="top" title={'You can replace support worker for this specific shift.'}>
                    <Popconfirm
                      placement="bottomRight"
                      title={<span>Are you sure to replace <b>Support Worker</b> for this specific shift?</span>}
                      onConfirm={() => this.setState({ viewReplacementRequestModal: true, replaceRequestFor: dt[0].mainSPWId })}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="primary" size="small" className="blue-btn"><span className="hide-on-mobile"><i className="las la-sync pos-relative top-1" />&nbsp;</span>Replace SPW?</Button>
                    </Popconfirm>
                  </Tooltip>}
                </React.Fragment>
              }
            />
          }
        </ViewDetailModal>
        <ReplacementRequestModule selectedShift={st.selectedShift} show={st.viewReplacementRequestModal}
          requestByAdmin={true}
          replaceRequestFor={st.replaceRequestFor}
          onClose={(e) => {
            this.setState({ viewReplacementRequestModal: false });
            e && pr.getDataByCallback();
          }} />
      </React.Fragment >
    )//End return
  }//End render
}//End class
export default ShiftModal;