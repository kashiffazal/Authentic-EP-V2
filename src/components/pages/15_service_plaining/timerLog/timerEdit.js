import React, { Component } from 'react';
import { HTTP, AccessControl, GetHourAndMinuteFromTowTime } from '../../../services';
import { Descriptions, Popconfirm } from 'antd';
import ScreenLoader from '../../../externalComponents/screen-loader';
import '../styles.less';

class TimerEdit extends Component {
  state = {
    loader: false,
    dataId: 0,
    dataKey: 0,
    data: {},
    showStartTimeField: false,
    showEndTimeField: false,
    startTimerEdit: '',
    endTimerEdit: '',
    updateStLoader: false,
    updateEtLoader: false,
    layout: 'vertical',
    descResponsiveDetailsTwoCol: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 },
    descResponsiveDetailsThreeCol: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }
  }

  getData = () => {
    this.setState({ loader: true });
    HTTP('get', '/servicePlaining/get/getServiceTimerData/' + this.state.dataId).then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.setState({ data: res.data })
    });
  }//End function

  updateTime = (value, col) => {
    let postObj = {};
    postObj['id'] = this.state.dataId;
    postObj[col] = value;
    if (col === 'start_time_mod') {
      this.setState({ updateStLoader: true });
    } else {
      this.setState({ updateEtLoader: true });
    }//End if condition
    HTTP('post', '/servicePlaining/post/updateTimerTime/', postObj).then(res => {
      this.setState({ updateStLoader: false, updateEtLoader: false });
      if (!res) { return false; }
      if (col === 'start_time_mod') {
        let totalHour = GetHourAndMinuteFromTowTime(value, this.state.data.end_time);
        this.setState({ showStartTimeField: false, data: { ...this.state.data, start_time: value, hour: totalHour, key: this.state.dataKey } }, () => {
          //console.log(this.state.data);
          this.props.updateTimerTime(this.state.data);
        });
      } else {
        let totalHour = GetHourAndMinuteFromTowTime(this.state.data.start_time, value);
        this.setState({ showEndTimeField: false, data: { ...this.state.data, end_time: value, hour: totalHour, key: this.state.dataKey } }, () => {
          this.props.updateTimerTime(this.state.data);
        });
      }//End if condition
    });
  }//End function

  render() {
    const data = this.state.data;
    const st = this.state;
    const editCondition = (
      (data.status === 'unreviewed' && AccessControl(73)) ||
      (data.status === 'reviewed' && AccessControl(77)) ||
      (data.status === 'deleted' && AccessControl(95))
      // || (data.status === 'delay' && AccessControl(108))
    ) ? true : false;
    return (
      <React.Fragment>
        <div className="circle-round-btn-container-view-modal">
          <div className="circle-round-btn">
            <button type="button" title="View Vertical" className={st.layout === 'vertical' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'vertical' })}><i className="las la-th-large" /></button>&nbsp;
            <button type="button" title="View Horizontal" className={st.layout === 'horizontal' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'horizontal' })}><i className="las la-th-list" /></button>
          </div>
        </div>
        <ScreenLoader active={st.loader} tip="Please wait...">
          <div className='description-custom timer-data-description'>

            <h1 className={`${st.layout === 'vertical' && 'table-50'}`}>Main Details</h1>
            <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetailsThreeCol} className={`three-col-${st.layout}`}>
              <Descriptions.Item label="Shift #">{data.shift_no}</Descriptions.Item>
              <Descriptions.Item label="Request #">{data.request_no}</Descriptions.Item>
              <Descriptions.Item label="Client Name" span={2}>{data.client_name}</Descriptions.Item>
              <Descriptions.Item label="Service Name">{data.service_name}</Descriptions.Item>
              <Descriptions.Item label="Support Worker & Partner" span={2}>{data.swp1_name} {(data.swp2_name && data.swp2_name !== '-') ? data.swp2_name : ''}</Descriptions.Item>
              {/* <Descriptions.Item label="Support Worker's Partner">{data.swp2_name}</Descriptions.Item> */}
              {data.service_date && <Descriptions.Item label="service Date">{data.service_date}</Descriptions.Item>}
              {data.service_day && <Descriptions.Item label="Service Day">{data.service_day}</Descriptions.Item>}
              <Descriptions.Item label="Late Time">{GetHourAndMinuteFromTowTime(data.start_time_actual, data.start_time)} {data.late}</Descriptions.Item>
              <Descriptions.Item label="Description">{data.description ? data.description : '-'}</Descriptions.Item>
            </Descriptions>


            <h1 className={`${st.layout === 'vertical' && 'table-33'}`}>Actual Time</h1>
            <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetailsThreeCol} className={`three-col-${st.layout}`}>
              <Descriptions.Item label="Start Time">{data.start_time_actual}</Descriptions.Item>
              <Descriptions.Item label="End Time">{data.end_time_actual}</Descriptions.Item>
              <Descriptions.Item label="Total Time">{GetHourAndMinuteFromTowTime(data.start_time_actual, data.end_time_actual)}</Descriptions.Item>
            </Descriptions>

            {data.start_time &&
              <>
                <h1 className={`${st.layout === 'vertical' && 'table-33'}`}>Support Worker Time</h1>
                <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetailsThreeCol} className={`three-col-${st.layout}`}>
                  <Descriptions.Item label="Start Time">
                    {st.showStartTimeField ?
                      <div className="timerEditFieldContainer">
                        <input type="text" className="timerEditField" defaultValue={data.start_time} onChange={(e) => this.setState({ startTimerEdit: e.target.value })} />
                        {st.updateStLoader ? <span className="loadingIcon">Loading <i className="las la-atom la-spin link-color"></i></span> : <button className="btnToLink link-color" onClick={() => this.updateTime(st.startTimerEdit || data.start_time, 'start_time_mod')}>Save</button>}
                      </div> :
                      <span className="flex-sb">
                        <span className="fs-16">{data.start_time}</span>
                        {editCondition &&
                          <div className="flex-m">
                            {st.updateStLoader ? <span className="loadingIcon">Loading <i className="las la-atom la-spin link-color"></i></span> :
                              <Popconfirm
                                title={'Are you sure to set Actual Start Time?'}
                                onConfirm={() => this.updateTime(data.start_time_actual, 'start_time_mod')}
                                okText="Yes"
                                cancelText="No"
                              ><button className="btnToLink link-color">Round</button></Popconfirm>
                            } &nbsp; | &nbsp;
                            <button className="btnToLink link-color" onClick={() => this.setState({ showStartTimeField: true })}>Edit</button>
                          </div>
                        }
                      </span>}
                  </Descriptions.Item>
                  <Descriptions.Item label="End Time">
                    {st.showEndTimeField ?
                      <div className="timerEditFieldContainer">
                        <input type="text" className="timerEditField" defaultValue={data.end_time} onChange={(e) => this.setState({ endTimerEdit: e.target.value })} />
                        {st.updateEtLoader ? <span className="loadingIcon">Loading <i className="las la-atom la-spin link-color"></i></span> : <button className="btnToLink link-color" onClick={() => this.updateTime(st.endTimerEdit || data.end_time, 'end_time_mod')}>Save</button>}
                      </div> :
                      <span className="flex-sb">
                        <span className="fs-16">{data.end_time}</span>
                        {editCondition &&
                          <div className="flex-m">
                            {st.updateEtLoader ? <span className="loadingIcon">Loading <i className="las la-atom la-spin link-color"></i></span> :
                              <Popconfirm
                                title={'Are you sure to set Actual End Time?'}
                                onConfirm={() => this.updateTime(data.end_time_actual, 'end_time_mod')}
                                okText="Yes"
                                cancelText="No"
                              ><button className="btnToLink link-color">Round</button></Popconfirm>
                            } &nbsp; | &nbsp;
                            <button className="btnToLink link-color" onClick={() => this.setState({ showEndTimeField: true })}>Edit</button>
                          </div>
                        }
                      </span>}
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Time">{GetHourAndMinuteFromTowTime(data.start_time, data.end_time)}</Descriptions.Item>
                </Descriptions>
              </>
            }
          </div>
        </ScreenLoader>
      </React.Fragment>
    );//End return
  }//End render
  componentDidMount() {
    this.setState({ dataId: this.props.idKey.split('=>')[0], dataKey: this.props.idKey.split('=>')[1] }, () => {
      this.getData();
    });
  }//End componentDidMount
  componentDidUpdate(prevProps) {
    if (prevProps.idKey !== this.props.idKey) {
      this.setState({ dataId: this.props.idKey.split('=>')[0], dataKey: this.props.idKey.split('=>')[1] }, () => {
        this.getData();
      });
    }//End if condition
  }//End componentDidUpdate

}//End class

export default TimerEdit;