import React, { Component } from 'react'
import { message, Empty, Alert } from 'antd';
import { HTTP } from '../../../services';
import ScreenLoader from '../../../externalComponents/screen-loader';
import moment from "moment";

class AvailabilityDaysTable extends Component {
  state = {
    data: {},
    getAvailDayLoader: false,
    selectedDay: null,
    loadedDataOnUpdateMod: false,
    noData: '',
    noDataTitle: '',
    noDataMsg: '',
  }//End state

  getAvailabilityDay = (spw1id, spw2id, isAppointmentModule = false) => {
    spw1id = spw1id ? spw1id : '';
    spw2id = spw2id ? spw2id : '';
    if (!spw1id && !spw2id) {
      this.setState({ data: { ...this.state.data, dayMearge: null, dayList: [] } });
      return false;
    }//End if condition
    //If Service Days is available in Props then don't replace it
    if (!this.props.selectedDay) { this.setState({ selectedDay: null }); }
    this.setState({ getAvailDayLoader: true });
    HTTP('get', '/servicePlaining/get/getAvailableDay/spw1/' + spw1id + '/spw2/' + spw2id).then(res => {
      this.setState({ getAvailDayLoader: false });
      if (!res) { return false; }
      // console.log(res.data);
      this.setState({ data: { ...this.state.data, ...res.data }, noData: res.noData, noDataTitle: res.noDataTitle, noDataMsg: res.noDataMsg }, () => {
        this.props.setDayList && this.props.setDayList(res.data.dayList);
        this.props.getAvailabilityData && this.props.getAvailabilityData(this.state.data);
        // console.log(this.state.data);
        this.checkAvailableDayOnDate(this.props.selectedDate, isAppointmentModule);
      });
    });
  }//End function

  checkAvailableTime = (st, et, spw1, spw2) => {
    if (!spw1) { return false; }
    //@Selected Date and Selected Day will not be at same time
    //@If date is available then get day from it otherwise get day directly
    let day = '';
    if (this.props.selectedDate) {
      day = moment(this.props.selectedDate, "DD-MM-YYYY HH:mm:ss").format('dddd');
    } else {
      day = this.props.serviceDay || this.state.selectedDay;
    }//End if condition

    // console.log(st, et);
    if (!st || !et) { return false; }
    let time = st + ' to ' + et;
    if (!time) { message.error('Please select Service Time'); return false; }
    //let s = this.state.data.dayMearge[day];
    // console.log(this.state.data.dayMearge);
    let data = {
      day: day, time: time, spw1, spw2,
      // timeList: JSON.stringify(this.state.data.dayMearge)
    };
    this.props.timeInfo('', true, '')
    this.props.getAvailTimeLoader(true);
    // console.log(data);
    HTTP('post', '/servicePlaining/get/getAvailableTime', data).then(res => {
      this.props.getAvailTimeLoader(false);
      this.props.timeInfo(res.ms, false, '')
      if (!res) { return false; }
      if (res.msg) {
        message.info(res.msg);
        this.props.timeInfo(res.msg, true, '');
      } else {
        this.props.timeInfo('', false, res.totalHour)
      }//End if condition
      //console.log(res.data);
    });
  }//End function

  checkAvailableDayOnDate = (e, isAppointmentModule = false) => {
    // alert('asdf');
    if (!e) { return false };
    e = moment(e, "DD-MM-YYYY HH:mm:ss");
    let day = e.format('dddd');
    let dayCheck = '';
    // alert(day);
    this.setState({ selectedDay: null });
    this.state.data.dayList && this.state.data.dayList.forEach((i, index) => {
      if (i.value === day && this.state.data.timeList[index] !== '-') {
        dayCheck = true;
      }//End if condition
    });
    // console.log(this.state.data);
    // console.log(dayCheck);
    if (dayCheck !== true) {
      setTimeout(() => {
        // this.formRef.current.setFieldsValue({ service_date: null });
        message.info('Please select date in available day(s)');
      }, 250);
    } else {
      this.setState({ selectedDay: day }, () => {
        !isAppointmentModule && this.checkAvailableTime(this.props.startTime, this.props.endTime, this.props.spw1, this.props.spw2);
      });
    }//End if condition
  }//End function

  render() {
    const st = this.state;
    const pr = this.props;
    return (
      <div className="container availability-days-table-container">
        <ScreenLoader active={st.getAvailDayLoader} tip="Please wait...">
          {/* =={st.noData}== */}
          {st.noData === 'true' &&
            <div className="text-center m-b-10">
              <Alert
                message={<h1 className="m-0 fs-16">{st.noDataTitle}</h1>}
                description={<p className="m-0">{st.noDataMsg}</p>}
                type="info"
              />
            </div>
          }
          {(st.noData === 'false' && st.data.dayMearge) ?
            <React.Fragment>
              <h3>
                {/* <i className="las la-business-time fs-20 p-r-5 pos-relative top-1" />  */}
                Support Worker Availability {pr.dateToShowJust ? ' For (' + pr.dateToShowJust + ')' : ''}</h3>
              <table border="1" width="100%" className="table table-striped">
                <thead>
                  <tr>
                    <th width="20%" align="center">Day</th>
                    <th width="40%" align="center">
                      {st.data.names[0]}
                    </th>
                    {st.data.names[1] && <th width="40%" align="center">{st.data.names[1]}</th>}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(st.data.dayMearge).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td align="center" style={st.selectedDay === item ? { fontWeight: 'bold' } : {}}>{item}</td>
                        <td align="center" style={st.selectedDay === item ? { fontWeight: 'bold' } : {}}>{st.data.dayMearge[item].split('(%)')[0] ? st.data.dayMearge[item].split('(%)')[0] : '-'}</td>
                        {this.props.spw2 && <td align="center" style={st.selectedDay === item ? { fontWeight: 'bold' } : {}}>{st.data.dayMearge[item].split('(%)')[1] ? st.data.dayMearge[item].split('(%)')[1] : '-'}</td>}
                      </tr>
                    )//End return
                  })}
                </tbody>
              </table>
            </React.Fragment>
            : <Empty />
          }
        </ScreenLoader>
      </div>
    )//End return
  }//End render
  componentDidMount() {
    // alert('asdf');
    if (this.props.data) {
      this.setState({ data: this.props.data });
    } else {
      this.getAvailabilityDay(this.props.spw1, this.props.spw2, this.props.isAppointmentModule);
    }//End if condition
    this.props.selectedDay && this.setState({ selectedDay: this.props.selectedDay });
  }//End componentDidMount
  componentDidUpdate(prevProps) {
    const pr = this.props;
    //Set state on load data for update
    //Set state to check that form in Update mode or not
    if (prevProps.updateMod !== pr.updateMod) { this.setState({ loadedDataOnUpdateMod: true }); }

    let allowChange = !pr.updateMod || this.state.loadedDataOnUpdateMod;
    // console.log(allowChange);

    if (!pr.data && ((prevProps.spw1 !== pr.spw1) || (prevProps.spw2 !== pr.spw2))) {
      this.getAvailabilityDay(pr.spw1, pr.spw2);
    }//End if condition
    if (allowChange && (prevProps.selectedDay !== pr.selectedDay)) {
      this.setState({ selectedDay: pr.selectedDay });
    }//End if condition
    if (allowChange && ((prevProps.startTime !== pr.startTime) || (prevProps.endTime !== pr.endTime))) {
      // console.log(pr.startTime, pr.endTime);
      // (pr.selectedDate || pr.selectedDay) &&
      this.checkAvailableTime(pr.startTime, pr.endTime, pr.spw1, pr.spw2);
    }//End if condition
    if (allowChange && prevProps.spw1 && (prevProps.selectedDate !== pr.selectedDate)) {
      this.checkAvailableDayOnDate(pr.selectedDate, pr.isAppointmentModule);
    }//End if condition

    //Set data from props without DB
    if (pr.data && (prevProps.data !== pr.data)) { this.setState({ data: pr.data }); }
    // console.log(pr.data);

  }//End componentDidUpdate
}//End class
export default AvailabilityDaysTable;
