import React, { Component } from 'react';
import { Descriptions, Radio, Popconfirm } from 'antd';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import { HTTP } from '../../../../services';

class ViewDetails extends Component {
  state = {
    data: {},
    loader: false,
    layout: 'vertical',
    descResponsiveDetailsTwoCol: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 },
    descResponsiveDetailsThreeCol: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }
  }

  getData = (id, replacedId, editShiftId) => {
    this.setState({ loader: true });
    HTTP('get', '/servicePlaining/get/getServiceViewDetails/?id=' + id + '&replacedId=' + (replacedId ? replacedId : '') + '&editShiftId=' + (editShiftId ? editShiftId : '')).then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      this.setState({ data: res.data })
      //console.log(res)
    });
  }//End function

  render() {
    const pr = this.props;
    const st = this.state;
    // const data = this.props.data;
    const data = this.state.data;
    return (
      st.loader ?
        <ScreenLoader active={true}><div className="h-200"></div></ScreenLoader>
        :
        <React.Fragment>
          {!pr.viewToRR &&
            <div className="circle-round-btn-container-view-modal">
              <div className="circle-round-btn">
                <button type="button" title="View Vertical" className={st.layout === 'vertical' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'vertical' })}><i className="las la-th-large" /></button>&nbsp;
                <button type="button" title="View Horizontal" className={st.layout === 'horizontal' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'horizontal' })}><i className="las la-th-list" /></button>
              </div>
            </div>
          }
          <div className="description-custom">
            {/* <h1>Main Details - ({data.plaining_type})</h1> */}
            <h1>Shift # {data.shift_no}</h1>
            <Descriptions size="small" layout={st.layout} bordered column={st.descResponsiveDetailsThreeCol} className={`three-col-${st.layout}`}>
              {/* <Descriptions.Item label="Plaining Type">{data.plaining_type}</Descriptions.Item> */}
              <Descriptions.Item label="Client Name"><strong>{data.client_name}</strong></Descriptions.Item>
              <Descriptions.Item label="Service" span={2}><strong>{data.service_name}</strong></Descriptions.Item>
              <Descriptions.Item label="Support Worker & Partner" span={3}><strong className="status-hold-color">{data.swp1_name} {data.swp2_name ? '& ' + data.swp2_name : ''}</strong></Descriptions.Item>
              {/* <Descriptions.Item label="Partner">{data.swp2_name ? data.swp2_name : '-'}</Descriptions.Item> */}
              <Descriptions.Item label="Frequency">{data.frequency_name}</Descriptions.Item>
              {data.service_date && <Descriptions.Item label="Service Date" span={data.service_day ? 1 : 2}>{data.service_date}</Descriptions.Item>}
              {data.service_day && <Descriptions.Item label="Service Day" span={data.service_date ? 1 : 2}>{data.service_day}</Descriptions.Item>}
              <Descriptions.Item label="Service Start Time"><span className="status-active-color"><strong>{data.service_start_time}</strong></span></Descriptions.Item>
              <Descriptions.Item label="Service End Time"><span className="status-active-color"><strong>{data.service_end_time}</strong></span></Descriptions.Item>
              <Descriptions.Item label="Total Hour"><span className="status-inactive-color"><strong>{data.hour}</strong></span></Descriptions.Item>
              <Descriptions.Item label="Shift(s) Start From" span={data.service_to_date ? 1 : 2}><span className="status-inactive-color"><strong>{data.service_from_date}</strong></span></Descriptions.Item>
              {data.service_to_date && <Descriptions.Item label="Shift(s) End at"><span className="status-inactive-color"><strong>{data.service_to_date}</strong></span></Descriptions.Item>}
              <Descriptions.Item label="Meal Break (mins)">{data.meal_break_min ? data.meal_break_min : '-'}</Descriptions.Item>
              <Descriptions.Item label="Rest Break (mins)">{data.rest_break_min ? data.rest_break_min : '-'}</Descriptions.Item>
              <Descriptions.Item label="Status" className="f-u-f-c">{data.status ? data.status.replace('_', ' ') : ''}</Descriptions.Item>
              <Descriptions.Item label="Remarks"><span className="textbox-value">{data.remarks ? data.remarks : '-'}</span></Descriptions.Item>
            </Descriptions>
            {(!pr.viewToSP && !pr.viewToRR) &&
              <React.Fragment>
                <h1>Inserted Details</h1>
                <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetailsTwoCol} className={`two-col-${st.layout}`}>
                  <Descriptions.Item label="Inserted Date">{data.inserted_by_date}</Descriptions.Item>
                  <Descriptions.Item label="Inserted By">{data.inserted_by}</Descriptions.Item>
                  {data.updated_by_date &&
                    <React.Fragment>
                      <Descriptions.Item label="Updated Date">{data.updated_by_date}</Descriptions.Item>
                      <Descriptions.Item label="Updated By">{data.updated_by}</Descriptions.Item>
                    </React.Fragment>
                  }
                </Descriptions>
              </React.Fragment>
            }
          </div>
          {this.props.statusData &&
            <React.Fragment>
              <hr className="hr-1 m-t-15 m-b-15" />
              <div className="text-right">
                <Radio.Group size="large">
                  <ScreenLoader active={this.props.usLoader} inline={true} tip="Please wait...">
                    {this.props.statusData.map(item => {
                      return (
                        (data.status !== item.name) &&
                        <Popconfirm
                          placement="topRight"
                          title={<span>Are you sure to change status as <b>{item.status}</b>?</span>}
                          onConfirm={() => this.props.updateStatus(item.name)}
                          okText="Yes"
                          cancelText="No"
                          key={item.name}
                        >
                          <Radio.Button loader={true} value={item.name}><i className={item.icon} /> <span className="fs-14 pos-relative top--1">{item.status}</span></Radio.Button>
                        </Popconfirm>
                      )
                    })}
                  </ScreenLoader>
                </Radio.Group>
              </div>
            </React.Fragment>
          }
        </React.Fragment>
    );//End return
  }//End render
  componentDidMount() { this.props.dataId && this.getData(this.props.dataId, this.props.replacedId, this.props.editShiftId); }//End componentDidMount
  componentDidUpdate(prevProps) {
    if (prevProps.dataId !== this.props.dataId) { this.getData(this.props.dataId, this.props.replacedId, this.props.editShiftId); }
    if (prevProps.data !== this.props.data) { this.setState({ data: this.props.data }); }
  }//End componentDidMount
}//End class

export default ViewDetails;