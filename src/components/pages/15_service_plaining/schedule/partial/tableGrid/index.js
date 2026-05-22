import React, { Component } from 'react';
import { Tooltip } from 'antd';
import ShiftModal from './partial/modals/shiftModal';
import ShiftEditModal from './partial/editShift/shiftEditModal';
import PlainingFormModal from './partial/modals/plainingFormModal';
import ShiftReplacementFormModal from '../../../shiftReplacement/shiftReplacementFormModal';
import ScreenLoader from '../../../../../externalComponents/screen-loader';
import DetailsInTooltip from './partial/details-in-tooltip';
import moment from 'moment';
import { FormatDate, SetDatePicker, GetCurrentDate, AccessControl } from '../../../../../services';

class ScheduleTable extends Component {
  state = {
    hasCollision: false,
    offset: [0, 0],
    // rowCountArr: [1, 2, 3, 4, 5, 6, 7],//7 Rows
    // colCountArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],//14 Cols for fortnight dates
    showShiftModal: false,
    showShiftEditModal: false,
    selectedShift: {},
    showPlainingFormModal: false,
    plainingFormData: {},
    gridDetailsForPlainingForm: {},
    selectedSPW: {},
    selectDateCol: '',
    replacementStatus: false,
    requestId: '',
    showReplaceRequestModal: false,
    notPreviousDays: true
  }//End state

  //Drag and Drop Functions
  // allowDrop = (ev) => { ev.preventDefault(); }
  // drag = (ev) => { ev.dataTransfer.setData("text", ev.target.id); }
  // drop = (ev) => { ev.preventDefault(); var data = ev.dataTransfer.getData("text"); if (!this.state.hasCollision) { try { ev.target.appendChild(document.getElementById(data)); } catch (err) { } } }//End function
  // dragMove = (e) => { this.setState({ elements: document.querySelectorAll('.element') }, () => { this.setState({ hasCollision: Array.prototype.some.call(this.state.elements, d => { if (d.id !== e.target.id) { return this.isCollide(e, d); } return false }) }) }) }//End function
  // isCollide = (a, b) => { const bRect = b.getBoundingClientRect(); return !(((a.clientY + this.state.offset[1]) < (bRect.top)) || (a.clientY + this.state.offset[1] > (bRect.top + bRect.height)) || ((a.clientX + this.state.offset[0]) < bRect.left) || (a.clientX + this.state.offset[0] > (bRect.left + bRect.width))) }

  closeFormModal = (callBackStatus) => {
    if (callBackStatus) { this.props.getDataByCallback(); }
    this.setState({ showPlainingFormModal: false });
  }//End function

  showShiftOnGrid = (shift, gridType, notAvailDay, notPreviousDays, spw, i) => {
    //@ Hide Deleted Shift, Just uncomment to show
    let data = shift;
    shift = [];
    data.forEach(element => { if (element.delete_recover_status !== 'deleted') { shift.push(element) } });
    //@===========================================
    return (
      shift.length > 0 ?
        <div className="shift-box">
          <button title={!notPreviousDays ? 'Past Shift' : ''} className={`btnToLink 
          ${(shift.length === 1 && shift[0]['replaced']) ? 'shift-request-btn' : (!notPreviousDays ? 'shift-previous-btn' : 'shift-exists-btn')} 
          ${(shift.length === 1 && shift[0]['delete_status'] === 'deleted' ? 'shift-deleted-btn' : '')}`}
            onClick={() => this.setState({ showShiftModal: true, notPreviousDays: notPreviousDays, selectedSPW: spw, selectDateCol: i[0], replacementStatus: false, gridDetailsForPlainingForm: { id: '', spwId: spw.id, day: i[1], date: SetDatePicker(i[0], 'YYYY-MM-DD') } })}>
            <div className="texture">
              {shift.length === 1
                ?
                this.singleShiftToShow(shift[0], gridType)
                :
                this.moreThenOneShiftToShow(shift, gridType)
              }
            </div>
          </button>
        </div>
        :
        this.emptyBoxToAddNEwShift(notAvailDay, notPreviousDays, spw, i)
    );
  }//End function

  singleShiftToShow = (shift, gridType) => {
    return (<Tooltip placement="top" title={<DetailsInTooltip data={shift} />}>
      <div>
        <span className="fw-500">
          {shift['shift_no']}
        </span>
        {!gridType &&
          <React.Fragment>
            <br />
            {shift['service_start_time']}<br />
            {shift['service_end_time']}<br />
            <span className="client_name_box">{shift['client_name']}</span>
          </React.Fragment>
        }
      </div>
    </Tooltip>)
  }//End function

  moreThenOneShiftToShow = (shift, gridType) => {
    return (((shift.length === 2 || shift.length === 3) && !gridType) ?
      <span>
        {/* {shift[0]['frequency_name']}<br /> */}
        <span className="fw-500">{shift.length} Shifts</span><br />
        {shift.map((sh, ik) => {
          return (sh.delete_recover_status !== 'deleted' && <span key={ik}><span className="fw-500">{sh.shift_no}</span><br /></span>)
        })}
      </span>
      :
      <span className="fw-500">
        {/* {shift[0]['frequency_name']}<br /> */}
        {shift.length} Shifts</span>
    );
  }//End if condition

  emptyBoxToAddNEwShift = (notAvailDay, notPreviousDays, spw, i) => {
    return (
      <div className={`shift-box ${notAvailDay ? 'not-avail-day' : ''}`}>
        {notAvailDay ? <span title="Not Available"><i className="las la-exclamation-circle" /></span> :
          (notPreviousDays && AccessControl(123)) ?
            <button className="btnToLink add-shift-btn" onClick={() => this.setState({ showPlainingFormModal: true, plainingFormData: { id: '', spwId: spw.id, day: i[1], date: SetDatePicker(i[0], 'YYYY-MM-DD') } })}><i className="las la-plus" /></button>
            :
            <span className="add-shift-btn"><i className="las la-ellipsis-h" /></span>
        }
      </div>
    )
  }//End function


  render() {
    const st = this.state;
    const pr = this.props;
    const cDate = GetCurrentDate('YYYY-MM-DD');
    // const spData = pr.data.spwList ? pr.data.filteredSPW.length === 0 ? pr.data.spwList : pr.data.filteredSPW : [];
    const spData = pr.filteredSPW;
    const gridCols = pr.gridColumn ? pr.gridColumn.gridCol : (pr.data.cols ? pr.data.cols : []);
    const gridType = pr.gridColumn ? ((pr.gridColumn.type === '4Weeks' || pr.gridColumn.type === 'month') ? true : false) : false;
    const requestedData = pr.requestedData ? pr.requestedData : [];
    // console.log(requestedData);
    // console.log(st.plainingFormData);
    // console.log(spData);
    // console.log(pr.shiftArr);
    return (
      <div className="schedule-table">
        <ScreenLoader active={pr.refreshLoader}>
          <React.Fragment>
            {/*Date and Day Header Row*/}
            <div className="row sticky-col">
              {gridCols.map((date, i) => {
                return (
                  <div className={`column head ${cDate === date[0] ? 'current-date-col' : ''} ${gridType ? 'smallCols' : ''}`} key={i}>
                    <div>
                      <span>{date[1]}</span>
                      <span>{FormatDate(date[0], 'Do MMM')}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            {/*Replacement Request Row*/}
            <div className="row">
              {gridCols.map((date, i) => {
                return (
                  <div className={`column ${gridType ? 'smallColsData' : ''}`} key={i}>
                    {requestedData[date[0]] ?
                      <div className="shift-box">
                        <button className="btnToLink shift-request-btn" onClick={() => this.setState({ showShiftModal: true, selectedSPW: { shifts: requestedData }, selectDateCol: date[0], replacementStatus: true })}>
                          <div className="texture">
                            {(requestedData[date[0]].length === 1 ? (
                              <Tooltip placement="top" title={<DetailsInTooltip data={requestedData[date[0]][0]} />}>
                                <div>
                                  <span className="fw-500">
                                    {/* {requestedData[date[0]][0]['frequency_name']}<br /> */}
                                    {requestedData[date[0]][0]['shift_no']}
                                  </span>
                                  {!gridType &&
                                    <React.Fragment>
                                      <br />
                                      {requestedData[date[0]][0]['service_start_time']}<br />
                                      {requestedData[date[0]][0]['service_end_time']}<br />
                                      <span className="client_name_box">{requestedData[date[0]][0]['client_name']}</span>
                                    </React.Fragment>
                                  }
                                </div>
                              </Tooltip>
                            ) :
                              ((requestedData[date[0]].length === 2 && !gridType) ?
                                <span>
                                  {/* {requestedData[date[0]][0]['frequency_name']}<br /> */}
                                  <span className="fw-500">{requestedData[date[0]].length} Shifts</span><br />
                                  {requestedData[date[0]].map((sh, ik) => {
                                    return (<span key={ik}><span className="fw-500">{sh.shift_no}</span><br /></span>)
                                  })}
                                </span>
                                :
                                <span className="fw-500">
                                  {/* {requestedData[date[0]][0]['frequency_name']}<br /> */}
                                  {requestedData[date[0]].length} Shifts
                                </span>
                              )
                            )}
                          </div>
                        </button>
                      </div>
                      :
                      <div className="shift-box">
                        <span className="add-shift-btn"><i className="las la-ellipsis-h" /></span>
                      </div>
                    }
                  </div>
                )
              })}
            </div>
            {/*Shift data*/}
            {spData.map(spw => {
              return (
                <div className="row" key={spw.id}>
                  {gridCols.map((i, key) => {
                    var shift = spw.shifts[i[0]];
                    var notAvailDay = spw.days_availibility_json.not_available && spw.days_availibility_json.not_available[((key > 6 && key < 14) ? (key - 6) : ((key > 13 && key < 21) ? (key - 13) : (key > 20 && key < 28 ? (key - 20) : (key > 27 && key < 35 ? (key - 27) : (key + 1)))))];
                    var notPreviousDays = (moment(i[0]).isSame(cDate) || moment(i[0]).isAfter(cDate));
                    return (
                      <div className={`column ${cDate === i[0] ? 'current-date-col' : ''} ${gridType ? 'smallColsData' : ''}`} id={`div-${spw.id}-${i}`} key={i}
                      // onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}
                      >
                        {(spw.shifts[i[0]] &&
                          (!(shift.length === 1 && shift[0]['delete_recover_status'] === 'deleted')) //@ Hide Deleted Shift, Just uncomment to show
                        ) ?
                          this.showShiftOnGrid(shift, gridType, notAvailDay, notPreviousDays, spw, i)
                          :
                          this.emptyBoxToAddNEwShift(notAvailDay, notPreviousDays, spw, i)
                        }
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </React.Fragment>
        </ScreenLoader>
        <ShiftModal show={st.showShiftModal} notPreviousDays={st.notPreviousDays} onClose={() => this.setState({ showShiftModal: false, selectDateCol: '' })} selectDateCol={st.selectDateCol} spwData={st.selectedSPW} replacementStatus={st.replacementStatus} hourList={pr.data.hourList} onClickShift={(id) => this.setState({ showPlainingFormModal: true, plainingFormData: { id: id } })}
          shiftEdit={(shiftData) => this.setState({ showShiftEditModal: true, selectedShift: shiftData })}
          onAdd={(startTime, endTime) => this.setState({ showPlainingFormModal: true, plainingFormData: { ...st.gridDetailsForPlainingForm, start_time: startTime, end_time: endTime, } })} onClickShiftReplacement={(e) => this.setState({ showReplaceRequestModal: true, requestId: e })} getDataByCallback={() => pr.getDataByCallback()} />
        <ShiftEditModal show={st.showShiftEditModal} onClose={() => this.setState({ showShiftEditModal: false })} selectedShift={st.selectedShift} shiftArr={pr.shiftArr} updateShift={(data) => pr.updateShift(data)} />
        <PlainingFormModal show={st.showPlainingFormModal} data={st.plainingFormData} onClose={(e) => this.closeFormModal(e)} />
        <ShiftReplacementFormModal requestId={st.requestId} show={st.showReplaceRequestModal} onClose={() => this.setState({ showReplaceRequestModal: false })} onReplaced={(a, b) => { pr.getDataByCallback() }} />
      </div>
    )//End return
  }//End render
  // componentDidMount() { this.setState({ elements: document.querySelectorAll('.element') }) }
}//End class
export default ScheduleTable;