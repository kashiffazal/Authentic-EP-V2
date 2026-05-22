import React, { Component } from 'react'
import { Row, Col, Skeleton } from 'antd';
import SPWList from './partial/spwList';
import ScheduleTable from './partial/tableGrid';
import ScheduleSettings from './partial/tableGrid/scheduleSettings';
import ScreenLoader from '../../../externalComponents/screen-loader';
import { HTTP } from '../../../services';
import './styles.less';

class ShiftSchedule extends Component {

  state = {
    getLoader: false,
    data: {
      filteredSPW: [],
      // filteredShifts: []
    },
    selectedSPW: '',
    gridColumn: null,
    refreshLoader: false
  }//End state

  getData = () => {
    this.setState({ getLoader: true });
    HTTP('post', '/serviceSchedule/get/').then(res => {
      // return false;
      this.setState({ getLoader: false });
      if (!res) { return false; }
      let data = res.data;
      let modData = this.setShiftsWithSPW(data.spwList, data.shiftArray);
      data.spwList = modData['spwList'];
      data.requestedArr = modData['requestedArr'];
      data.filteredSPW = data.spwList;
      // data.filteredShifts = data.shiftArray;
      this.setState({ data });
    });
  }//End function

  setShiftsWithSPW = (spwList, shiftArray) => {
    let requestedArr = {};
    shiftArray.forEach((shift) => {
      if (shift.requested) {
        if (!requestedArr[shift.service_date]) { requestedArr[shift.service_date] = []; }
        requestedArr[shift.service_date].push(shift);
      }//End if condition
    });
    spwList.forEach((item, i) => {
      shiftArray.forEach((shift) => {
        // if(shift['unique_id'] === 15){
        //   console.log(shift);
        // }
        if ((shift.mainSPWId === item.id) && !shift.requested) { spwList[i]['shifts'].push(shift); }
      });
      var dtArray = [];
      spwList[i]['shifts'].forEach(i => {
        if (!dtArray[i.service_date]) { dtArray[i.service_date] = []; }
        dtArray[i.service_date].push(i);
      });
      spwList[i]['shifts'] = dtArray;
    })
    return { spwList, requestedArr };
  }//End function

  updateShift = (e) => {
    let st = this.state;
    let modData = this.setShiftsWithSPW(st.data.spwList, e)
    var spwList = modData['spwList'];
    var filteredSPW = spwList;
    this.setState({ data: { ...st.data, spwList, filteredSPW, shiftArray: e } })
  }//End function


  render() {
    const st = this.state;
    // console.log(st.data.filteredSPW)
    return (
      <div className="schedule-container">
        {st.getLoader ?
          <ScreenLoader active={st.getLoader}>
            <div className="p-20">
              <div style={{ width: '100%' }}><Skeleton active /><Skeleton active /><Skeleton active /></div>
            </div>
          </ScreenLoader>
          :
          <React.Fragment>
            <ScheduleSettings
              data={st.data}
              updateShiftsByRange={(shiftArray, shiftByFrequency, cols, filterCallBack, filteredValue, filteredColumn, filterMultipleColumns) => {
                let modData = this.setShiftsWithSPW(st.data.spwList, shiftArray)
                var spwList = modData['spwList'];
                var requestedArr = modData['requestedArr'];
                var filteredSPW = spwList;
                this.setState({ data: { ...st.data, shiftByFrequency, spwList, filteredSPW, requestedArr, shiftArray, gridData: { ...st.data.gridData, cols } }, gridColumn: cols }, () => {
                  filterCallBack(filteredValue, filteredColumn, filterMultipleColumns);
                })
              }}
              // settingData={(e) => this.setState({ settingData: e })}
              gridColumn={(e) => this.setState({ gridColumn: e })}
              onFilter={(e) => {
                var modData = this.setShiftsWithSPW(st.data.spwList, e);
                var spwList = modData['spwList'];
                var requestedArr = modData['requestedArr'];
                this.setState({ data: { ...st.data, spwList, requestedArr } })
              }}
              refreshLoader={(e) => this.setState({ refreshLoader: e })}
              shiftArr={st.data.shiftArray}
              updateShift={(e) => this.updateShift(e)}
              onRecoverShift={(e) => this.setState({ data: { ...st.data, shiftArray: e } })}
            />
            <Row gutter={0}>
              <Col lg={4} md={8} sm={8} xs={8}>
                <SPWList spwList={st.data.spwList}
                  // onSelect={(e) => this.setState({ selectedSPW: e }, () => { alert(e) })}
                  updateSPWList={(e) => this.setState({ data: { ...st.data, spwList: e } })}
                  onFilter={(e) => this.setState({ data: { ...st.data, filteredSPW: e } })}
                  gridColumn={st.gridColumn}
                />
              </Col>
              <Col lg={20} md={16} sm={16} xs={16}>
                {/* =={st.data.shiftArray && st.data.shiftArray[10].service_end_time + ' = ' + st.data.shiftArray[10].unique_id}== */}
                {st.data.gridData && <ScheduleTable filteredSPW={st.data.filteredSPW} selectedSPW={st.selectedSPW} data={st.data.gridData} requestedData={st.data.requestedArr} gridColumn={st.gridColumn} getDataByCallback={() => this.getData()} refreshLoader={st.refreshLoader} shiftArr={st.data.shiftArray}
                  updateShift={(e) => this.updateShift(e)}
                />}
              </Col>
            </Row>
          </React.Fragment>
        }
      </div>
    )//End return
  }//End render
  componentDidMount() { this.getData(); }//End componentDidMount
}//End class
export default ShiftSchedule;