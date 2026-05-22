import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import { Row, Col, Input, Button, Form, Modal, Empty, Dropdown, Menu } from 'antd';
import { GetObjectIndexFromArr, GetObjectFromArr, HTTP, AccessControl } from '../../../../../services';
import moment from 'moment';
import MFS from '../../../../../services/multiple_field_services';
import { currentDay, currentWeekOr2WeeksOr4Week, currentMonth } from '../fortnightServices';
import ViewDetailModal from '../../../plainingLog/partial/viewDetailModal';
import EditedShiftListModal from './partial/listModals/editedShiftListModal';
import DeletedShiftListModal from './partial/listModals/deletedShiftListModal';

class ScheduleSettings extends Component {
  state = {
    getLoader: false,
    fortnightSelectIndex: null,
    // filteredShifts: [],
    selectedFilterCol: '',
    filteredValue: '',
    advanceFilterModal: false,
    rowArr: [1],
    filterFieldValues: {},
    selectedLogOpeObj: {},
    selectedMode: {},
    shiftTotalListModal: false,
    shiftTotalListData: [],
    shiftTotalSelectedFrequencyData: '',
    showPlainingViewModal: false,
    shiftId: '',
    showEditedShiftListModal: false,
    showDeletedShiftListModal: false,
    fortnightStart: '',
    fortnightEnd: ''
  }
  formRef = React.createRef();
  formRefFilter = React.createRef();

  nextAndPreviousFortnight = (keyword) => {
    let selectedValue = this.formRef.current.getFieldValue('fortnight');
    if (!selectedValue) { alert('Please select fortnight'); return false }
    let index = GetObjectIndexFromArr(selectedValue, 'value', this.props.data.settingData.fortnightList.list);
    index = (keyword === 'next') ? (index + 1) : (index - 1);
    this.setState({ fortnightSelectIndex: index });
    let newValue = this.props.data.settingData.fortnightList.list[index];
    newValue = newValue ? newValue.value : '';
    if (!newValue) { return false; }
    let formObj = {};
    formObj['fortnight'] = newValue;
    this.formRef.current.setFieldsValue(formObj);
    newValue = newValue.split('%');
    this.getScheduleDataByRange(newValue[0], newValue[1]);
  }//End function

  getScheduleDataByRange = (from, to, onGridType = false) => {
    this.setState({ getLoader: true });
    this.props.refreshLoader(true);
    HTTP('post', '/serviceSchedule/get/shiftsByRange/from/' + from + '/to/' + to + '/spwIds/' + this.props.data.spwIds).then(res => {
      this.setState({ getLoader: false });
      this.props.refreshLoader(false);
      if (!res) { return false; }
      // console.log(res);
      //Update shift array and also check if filter is available the Filter array after updating in Parent Component
      this.props.updateShiftsByRange(
        res.data,
        res.shiftByFrequency,
        { gridCol: res.cols, type: '' },
        this.filterShifts,
        this.state.filteredValue,
        this.state.selectedFilterCol,
        this.state.filterFieldValues
      );
      if (onGridType) {
        this.selectGridType(onGridType);
      } else {
        this.formRef.current.setFieldsValue({ gridColumn: '' });
      }

    });
  }//End function

  setCurrentFortnight = (onGridType = false) => {
    let newValue = this.props.data.settingData.fortnightList.defaultCurrent;
    let formObj = {};
    formObj['fortnight'] = newValue;
    this.formRef.current.setFieldsValue(formObj);
    newValue = newValue.split('%');
    this.getScheduleDataByRange(newValue[0], newValue[1], onGridType);
    this.setState({ fortnightSelectIndex: null });
  }//End function

  //All Filter functions
  filterShifts = (e, colName, multiple = false) => {
    // alert('asdf');
    if (multiple && !(Object.keys(multiple).length > 0)) { multiple = false; }
    // console.log(multiple);
    if ((!colName && !multiple) || (multiple && (!multiple.column || !multiple.logicalOperator || !multiple.value))) { return false }
    var filteredData = this.props.data.shiftArray.filter((a) => {
      if (multiple) {
        //In Multiple filter Save conditions in string format and at last execute code using eval()
        var condition = [];
        var conditionOperator = "if (multiple.conditionOperator) {if (multiple.conditionOperator[item] === 'AND') { condition.push('&&'); }if (multiple.conditionOperator[item] === 'OR') { condition.push('||'); }}";
        Object.keys(multiple.column).forEach((item) => {
          //Date column compare
          if (multiple.column[item] === 'service_date' || multiple.column[item] === 'inserted_date') {
            condition.push("(" + moment(multiple.value[item], 'DD-MM-YYYY').valueOf() + " " + multiple.logicalOperator[item] + " " + moment(a['service_date'], 'DD-MM-YYYY').valueOf() + ")");
            eval(conditionOperator);
            //Time column compare
          } else if (multiple.column[item] === 'service_start_time' || multiple.column[item] === 'service_end_time') {
            condition.push("(" + moment(multiple.value[item], 'hh:mm A').valueOf() + " " + multiple.logicalOperator[item] + " " + moment(a['service_date'], 'hh:mm A').valueOf() + ")");
            eval(conditionOperator);
            //Other then Date and Time column compare
          } else {
            if (multiple.logicalOperator[item] === '=') {
              condition.push("a['" + multiple.column[item] + "'].toLowerCase().includes('" + multiple.value[item].toLowerCase() + "')");
              eval(conditionOperator);
            }//End if condition
            if (multiple.logicalOperator[item] === '!=') {
              condition.push("!a['" + multiple.column[item] + "'].toLowerCase().includes('" + multiple.value[item].toLowerCase() + "')");
              eval(conditionOperator);
            }//End if condition
          }//End if condition
        });
        //Remove last condition operator
        if (condition[condition.length - 1] === '&&' || condition[condition.length - 1] === '||') { condition.pop() }
        condition = condition.join(' ');
        // console.log(condition);
        // console.log(eval(condition));
        return eval(condition);
      } else {
        // console.log("a[" + colName + "].toLowerCase().includes(e.toLowerCase())");
        return a[colName].toLowerCase().includes(e.toLowerCase());
      }//End if condition
    });
    filteredData = this.state.sort ? filteredData.reverse() : filteredData;
    this.setState({ filteredValue: e, advanceFilterModal: false }, () => { this.props.onFilter(filteredData); })
  }//End function

  onChangeFilterVal = (fieldName, fieldValue) => {
    this.setState({ filterFieldValues: MFS.onChange(fieldName, fieldValue, this.state.filterFieldValues) }, () => {
      // this.props.onChange(this.state.fieldValues);
    });
  }//End function

  setLogicalOperatorForFilter = (index, e) => {
    let selectedLogOpeObj = this.state.selectedLogOpeObj;
    let selectedMode = this.state.selectedMode;
    let fo = this.props.data.settingData;
    let selectedObj = GetObjectFromArr(e, 'value', this.props.data.settingData.shiftFilters);
    selectedLogOpeObj[index] = fo.filterOptions.logicalOperator[selectedObj.operatorIndex];
    selectedMode[index] = { mode: selectedObj.mode, options: selectedObj.options ? selectedObj.options : {} };
    // console.log(selectedMode);
    this.setState({ selectedLogOpeObj, selectedMode });
  }//End function

  submitAdvanceFilterForm = (vl) => {
    this.formRef.current.setFieldsValue({ filterColumn: '', filterSearch: '' });//Reset single filter field
    this.setState({ selectedFilterCol: '', filteredValue: '' })
    this.filterShifts('', '', this.state.filterFieldValues);
  }//End function

  resetAdvanceFilter = () => {
    this.setState({ rowArr: [1], filterFieldValues: {}, filteredValue: '' }, () => {
      this.props.onFilter(this.props.data.shiftArray);
      this.formRefFilter.current && this.formRefFilter.current.resetFields()
    })
  }//End function

  //Grid Type Functions 
  selectGridType = (e, skipOnLoad = false) => {
    if (!e) { e = '2Weeks'; }
    //If current fortnight and selected fortnight is different then set current fortnight first
    //and then call the selectGridType function by passing value to set selected grid type
    // console.log(this.props.data);
    // if (skipOnLoad) {
    let currentFortnight = this.props.data.settingData.fortnightList.defaultCurrent;
    let selectedFortnight = this.formRef.current.getFieldValue('fortnight');
    if (currentFortnight !== selectedFortnight) { this.setCurrentFortnight(e); }//End if condition
    // }//End if condition

    var gridCol = [];
    if (e === 'day') {
      gridCol = currentDay();
    }//End if condition
    if (e === 'week') {
      gridCol = currentWeekOr2WeeksOr4Week('currentWeek');
    }//End if condition
    if (e === '2Weeks') {
      gridCol = currentWeekOr2WeeksOr4Week('twoWeeks');
    }//End if condition
    if (e === '4Weeks') {
      gridCol = currentWeekOr2WeeksOr4Week('fourWeeks');
    }//End if condition
    if (e === 'month') {
      gridCol = currentMonth();
    }//End if condition
    this.props.gridColumn({ 'gridCol': gridCol, 'type': e });

    //Save grid permanent until logout - Save in User Object 
    // let userData = GetUserData();
    // userData.schedule_grid_type = e;
    // // console.log(userData);
    // SetUserData(userData);
  }//End function

  editAndDeleteShiftListModal = (keyword) => {
    let newValue = '';
    if (this.state.fortnightSelectIndex) {
      newValue = this.props.data.settingData.fortnightList.list[this.state.fortnightSelectIndex].value;
    } else {
      newValue = this.props.data.settingData.fortnightList.defaultCurrent;
    }//End if condition
    // console.log(newValue)
    newValue = newValue.split('%');
    this.setState({ fortnightStart: newValue[0], fortnightEnd: newValue[1] }, () => {
      let set = {};
      set[keyword] = true;
      this.setState(set)
    })
  }//End function

  render() {
    // console.log(currentWeek());
    const st = this.state;
    const pr = this.props;
    const data = pr.data.settingData;
    const shiftByFrequencyData = pr.data.shiftByFrequency ? pr.data.shiftByFrequency.data : {};
    const shiftByFrequencyInfo = pr.data.shiftByFrequency ? pr.data.shiftByFrequency.info : [];
    // console.log(shiftByFrequencyInfo);
    const isFilterVl = (!Object.keys(st.filterFieldValues).length > 0);
    return (
      <div className="setting-container">
        {data &&
          <Form ref={this.formRef}>
            <Row gutter={10} justify="space-around" align="middle">
              <Col lg={4} md={16} sm={24} xs={24}>
                <div className="shift-by-frequency">
                  <strong>Total Current Shifts by Frequency:</strong>
                  <div className="data">
                    {shiftByFrequencyInfo.map((item, i) => {
                      return (
                        <div key={i}>
                          {/* {item} */}
                          {/* <Tooltip title={shiftByFrequencyData[item][0]['frequency_name'] + ' : ' + (shiftByFrequencyData[item].length < 10 ? '0' + shiftByFrequencyData[item].length : shiftByFrequencyData[item].length)} placement="top"> */}
                          <button className="btnToLink" type="button" onClick={() => this.setState({ shiftTotalListModal: true, shiftTotalListData: shiftByFrequencyData[item.label], shiftTotalSelectedFrequencyData: item })}>
                            {(shiftByFrequencyData[item.label].length > 0) ? (item.label + ':' + (shiftByFrequencyData[item.label].length < 10 ? '0' + shiftByFrequencyData[item.label].length : shiftByFrequencyData[item.label].length)) : item.label + ':00'}
                          </button>
                          {/* </Tooltip> */}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Col>
              <Col lg={4} md={8} sm={24} xs={24}>
                <AntInput name="gridColumn" filter={true} emptyFirstVal={'Select Column'} options={[
                  { 'label': 'Day', 'value': 'day' },
                  { 'label': 'Week', 'value': 'week' },
                  { 'label': '2 Week', 'value': '2Weeks' },
                  { 'label': '4 Week', 'value': '4Weeks' },
                  { 'label': 'Month', 'value': 'month' }
                ]} onChange={(e) => this.selectGridType(e)} type="select" containerStyle={{ margin: '0px' }} noRequired={true} />
              </Col>
              <Col lg={8} md={7} sm={24} xs={24}>

                <Input.Group compact className="filter-group" disabled={st.getLoader}>
                  <AntInput name="filterColumn" filter={true} options={data.shiftFilters} onChange={(e) => {
                    this.setState({ selectedFilterCol: e });
                    this.formRef.current.setFieldsValue({ filterSearch: '' });//Reset Search Field
                    this.filterShifts('', st.selectedFilterCol)//Reset Filter Data
                  }} type="select" disabled={!isFilterVl} noRequired={true} />
                  <AntInput name="filterSearch" onChange={(e) => this.filterShifts(e, st.selectedFilterCol)} placeholder="Search" disabled={!isFilterVl} noRequired={true} />
                  <Button onClick={() => this.setState({ advanceFilterModal: true })}
                    style={!isFilterVl ? { borderRadius: '0px', width: '10%' } : { borderRadius: '0px 4px 4px 0px', width: '22%' }}>
                    {isFilterVl ?
                      <span className="fs-12">Advance <i className="las la-filter" /></span>
                      :
                      <i className="las la-filter" />
                    }
                  </Button>
                  <Button
                    onClick={() => this.resetAdvanceFilter()}
                    style={isFilterVl ? { width: '0%', padding: 'unset', visibility: 'hidden' } : { visibility: 'visible', background: '#f56666', border: '1px solid #f56666', color: '#fff', width: '10%' }}
                  ><i className="las la-times" /></Button>
                </Input.Group>

              </Col>
              <Col lg={7} md={16} sm={24} xs={24}>
                <Input.Group compact className="next-previous-group" >
                  <Button onClick={() => this.setCurrentFortnight()} disabled={st.getLoader} title="Current Fortnight"><i className="las la-sync" /></Button>
                  <Button onClick={() => this.nextAndPreviousFortnight('prev')} disabled={st.getLoader || (st.fortnightSelectIndex === 0)}><i className="las la-angle-double-left" /></Button>
                  <AntInput name="fortnight" filter={true} value={data.fortnightList.defaultCurrent} options={data.fortnightList.list} type="select" noRequired={true} disabled={st.getLoader} />
                  <Button onClick={() => this.nextAndPreviousFortnight('next')} disabled={st.getLoader || st.fortnightSelectIndex === data.fortnightList.list.length}><i className="las la-angle-double-right" /></Button>
                </Input.Group>
              </Col>
              {AccessControl('127,128') &&
                <Col lg={1} md={1} sm={24} xs={24}>
                  <Dropdown overlay={
                    <Menu>
                      {AccessControl(127) &&
                        <Menu.Item key={1}>
                          <button className="btnToLink" onClick={() => this.editAndDeleteShiftListModal('showEditedShiftListModal')}><i className="las la-edit fs-18 pos-relative top-1" /> Edited Shift(s) List</button>
                        </Menu.Item>
                      }
                      {AccessControl(128) &&
                        <Menu.Item key={2}>
                          <button className="btnToLink" onClick={() => this.editAndDeleteShiftListModal('showDeletedShiftListModal')}><i className="las la-times-circle fs-18 pos-relative top-1" /> Deleted Shift(s) List</button>
                        </Menu.Item>
                      }
                    </Menu>
                  } placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={['click']}>
                    <Button type="primary" ghost className="drop-down-btn"><i className="las la-bars" /></Button>
                  </Dropdown>
                </Col>
              }
            </Row>
          </Form>
        }
        {/*Advance Filter Modal*/}
        <Modal
          width={740}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={'Advance Filter'}
          visible={st.advanceFilterModal}
          onOk={() => this.setState({ advanceFilterModal: false })}
          onCancel={() => this.setState({ advanceFilterModal: false })}
        // destroyOnClose={true}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ advanceFilterModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">Advance Filter</span>
              <span className="sub-title">Apply advance filter for custom filtering</span>
            </div>
          </div>
          {data &&
            <Form layout="vertical" ref={this.formRefFilter} onFinish={this.submitAdvanceFilterForm} className="form-style-1" autoComplete="off">
              <Row gutter={window.rowGutter} type="flex">
                {st.rowArr.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Col lg={5} md={8} sm={12} xs={24}>
                        <AntInput type="select" label="Column" name={`column%${item}`} options={data.shiftFilters} filter={true}
                          onChange={(e) => {
                            this.onChangeFilterVal(`column%${item}`, e);
                            this.setLogicalOperatorForFilter(item, e);
                          }}
                        />
                      </Col>
                      <Col lg={5} md={8} sm={12} xs={24}>
                        <AntInput type="select" label="Operator" name={`logicalOperator%${item}`} options={st.selectedLogOpeObj[item]} filter={true}
                          onChange={(e) => this.onChangeFilterVal(`logicalOperator%${item}`, e)}
                        />
                      </Col>
                      <Col lg={5} md={8} sm={12} xs={24}>
                        {st.selectedMode[item] ?
                          <React.Fragment>
                            {st.selectedMode[item].mode === 'select' && <AntInput type="select" label="Value" name={`value%${item}`} options={st.selectedMode[item].options} setValueLabel={['label', 'label']} filter={true} onChange={(e) => this.onChangeFilterVal(`value%${item}`, e)} />}
                            {st.selectedMode[item].mode === 'date' && <AntInput type="datepicker" label="Value" name={`value%${item}`} onChange={(e) => this.onChangeFilterVal(`value%${item}`, e)} placeholder="Please select date" />}
                            {st.selectedMode[item].mode === 'time' && <AntInput type="timepicker" label="Value" name={`value%${item}`} onChange={(e) => this.onChangeFilterVal(`value%${item}`, e)} placeholder="Please select time" />}
                          </React.Fragment>
                          :
                          <AntInput type="select" label="Value" name={`value%${item}`} options={[]} disabled={true} />
                        }
                      </Col>
                      <Col lg={5} md={16} sm={7} xs={24}>
                        <AntInput type="select" label="Condition" name={`conditionOperator%${item}`} options={data.filterOptions.conditionOperator} filter={true}
                          onChange={(e) => this.onChangeFilterVal(`conditionOperator%${item}`, e)}
                          noRequired={!(st.rowArr.length > item)}
                        />
                      </Col>
                      <Col lg={4} md={8} sm={5} xs={24}>
                        <Row gutter={10} className="m-b-15">
                          <Col lg={12} md={12} sm={12} xs={12}>
                            <Button className="w-full btn_label_space btn_side_by_side p-0-imp" type="dashed"
                              onClick={() => this.setState({ rowArr: MFS.addRow(st.rowArr) })}
                              disabled={MFS.addDisabled(st.rowArr, index)}
                            ><i className="las la-plus-circle fs-20 m-t-2" /></Button>
                          </Col>
                          <Col lg={12} md={12} sm={12} xs={12}>
                            <Button className="w-full btn_label_space btn_side_by_side p-0-imp" type="dashed"
                              disabled={MFS.lessDisabled(st.rowArr)}
                              onClick={() => {
                                let rr = MFS.removeRow(st.rowArr, index, st.filterFieldValues, item);
                                this.setState({ rowArr: rr[0], filterFieldValues: rr[1] })
                              }}><i className="las la-minus-circle fs-20 m-t-2" /></Button>
                          </Col>
                        </Row>
                      </Col>
                    </React.Fragment>
                  )
                })}
              </Row>
              <hr className="hr-1" />
              <div className="text-right">
                <Button className="m-t-10" htmlType="submit" size="large" type="primary" disabled={st.getLoader}>Set Filters</Button>
              </div>
            </Form>
          }
        </Modal>

        {/*List of Shift by Frequency*/}
        <Modal
          width={1024}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          // title={`List of All ${st.shiftTotalSelectedFrequencyData.name} Shift(s)`}
          visible={st.shiftTotalListModal}
          onOk={() => this.setState({ shiftTotalListModal: false })}
          onCancel={() => this.setState({ shiftTotalListModal: false })}
        // destroyOnClose={true}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ shiftTotalListModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">{`List of All ${st.shiftTotalSelectedFrequencyData.name} Shift(s)`}</span>
              <span className="sub-title">More details can be viewed by clicking on Shift No</span>
            </div>
          </div>
          <div className="table-responsive-container">
            <table className="table-info" border='1'>
              <thead>
                <tr>
                  <th className="th-highlight" align="center">Sr.</th>
                  <th align="center" className="th-highlight">Shift No</th>
                  <th align="center" className="th-highlight">SPW Name</th>
                  <th align="center" className="th-highlight">SPW Partner</th>
                  {
                    (st.shiftTotalSelectedFrequencyData.id !== '5' && st.shiftTotalSelectedFrequencyData.id !== '6' && st.shiftTotalSelectedFrequencyData.id !== '8')
                    && <th align="center" className="th-highlight">Service Date</th>
                  }
                  {
                    (st.shiftTotalSelectedFrequencyData.id !== '7' && st.shiftTotalSelectedFrequencyData.id !== '8' && st.shiftTotalSelectedFrequencyData.id !== '9')
                    && <th align="center" className="th-highlight">Service Day</th>
                  }
                  <th align="center" className="th-highlight">Start Time</th>
                  <th align="center" className="th-highlight">End Time</th>
                </tr>
              </thead>
              <tbody>
                {st.shiftTotalListData.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td align="center">{i + 1}</td>
                      <td align="center" className="td-highlight"><button className="btnToLink link-color" onClick={() => this.setState({ shiftId: item.id, showPlainingViewModal: true })}><strong>{item.shift_no}</strong></button></td>
                      <td align="center">{item.spw_name}</td>
                      <td align="center">{item.spw2_name ? item.spw2_name : '-'}</td>
                      {
                        (st.shiftTotalSelectedFrequencyData.id !== '5' && st.shiftTotalSelectedFrequencyData.id !== '6' && st.shiftTotalSelectedFrequencyData.id !== '8')
                        && <td align="center">{item.service_date ? item.service_date : '-'}</td>
                      }
                      {
                        (st.shiftTotalSelectedFrequencyData.id !== '7' && st.shiftTotalSelectedFrequencyData.id !== '8' && st.shiftTotalSelectedFrequencyData.id !== '9')
                        && <td align="center">{item.service_day ? item.service_day : '-'}</td>
                      }
                      <td align="center">{item.service_start_time}</td>
                      <td align="center">{item.service_end_time}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {st.shiftTotalListData.length < 1 && <div className="empty-table"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
          </div>
        </Modal>
        <ViewDetailModal dataId={st.shiftId} show={st.showPlainingViewModal} onClose={() => this.setState({ showPlainingViewModal: false })} />
        <EditedShiftListModal show={st.showEditedShiftListModal} onClose={() => this.setState({ showEditedShiftListModal: false })} shiftArr={pr.shiftArr} updateShift={(data) => pr.updateShift(data)} dateFrom={st.fortnightStart} dateTo={st.fortnightEnd} />
        <DeletedShiftListModal show={st.showDeletedShiftListModal} onClose={() => this.setState({ showDeletedShiftListModal: false })} dateFrom={st.fortnightStart} dateTo={st.fortnightEnd} onRecoverShift={pr.onRecoverShift} shiftArrToRecover={pr.shiftArr} />
      </div>
    )//End return
  }//End render
  // componentDidMount() {
  //   //Set grid on Load if it's save in User Object
  //   let schedule_grid_type = GetUserData().schedule_grid_type;
  //   if (schedule_grid_type) {
  //     setTimeout(() => { this.formRef.current && this.formRef.current.setFieldsValue({ gridColumn: schedule_grid_type }); }, 10);
  //     this.selectGridType(schedule_grid_type, false);
  //   }//End if condition
  // }//End componentDidMount
}//End class
export default ScheduleSettings;