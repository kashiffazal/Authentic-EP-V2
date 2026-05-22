import React, { Component } from 'react';
import { Descriptions, Modal } from 'antd';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import { HTTP } from '../../../../services';

class ViewDoneDetails extends Component {
  state = {
    data: {},
    loader: false,
    layout: 'vertical',
    descResponsiveDetailsTwoCol: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 },
    descResponsiveDetailsThreeCol: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }
  }

  getData = (id) => {
    this.setState({ loader: true });
    HTTP('get', '/shiftReplacementRequest/get/viewDoneDetails/' + id).then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      this.setState({ data: res.data })
      //console.log(res)
    });
  }//End function

  render() {
    const st = this.state;
    const pr = this.props;
    const data = this.state.data;
    return (
      <Modal
        width={660}
        maskClosable={false}
        className="hide-footer"
        centered={true}
        // title={'View Request Details'}
        visible={pr.show}
        destroyOnClose={true}
        onCancel={() => pr.onClose()}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
        <div className="modal-modern-title-for-view-details">
          <div>
            <span className="title">View Request</span>
            <span className="sub-title">Request data in detail</span>
          </div>
        </div>
        {st.loader ?
          <ScreenLoader active={true}><div className="h-200"></div></ScreenLoader>
          :
          <React.Fragment>
            <div className="description-custom">
              <h1>Request # {data.request_no}</h1>
              <Descriptions size="small" layout={st.layout} bordered column={st.descResponsiveDetailsThreeCol} className={`three-col-${st.layout}`}>
                {/* <Descriptions.Item label="Request #">{data.request_no}</Descriptions.Item> */}
                <Descriptions.Item label="Request Date">{data.inserted_date}</Descriptions.Item>
                <Descriptions.Item label="Shift #">{data.shift_no}</Descriptions.Item>
                <Descriptions.Item label="Requested By">{data.spw_req_name}</Descriptions.Item>
                <Descriptions.Item label="Replaced With" span={3}>{data.spwr1_name} {data.spwr2_name ? '& ' + data.spwr2_name + ' (Partner)' : ''}</Descriptions.Item>
                <Descriptions.Item label="Start Time">{data.service_start_time}</Descriptions.Item>
                <Descriptions.Item label="End Time">{data.service_end_time}</Descriptions.Item>
                <Descriptions.Item label="Total Hour">{data.hour}</Descriptions.Item>
                <Descriptions.Item label="Meal Break (mins)">{data.meal_break_min ? data.meal_break_min : '-'}</Descriptions.Item>
                <Descriptions.Item label="Rest Break (mins)" span={3}>{data.rest_break_min ? data.rest_break_min : '-'}</Descriptions.Item>
                <Descriptions.Item label="Request Reason">{data.reason}</Descriptions.Item>
              </Descriptions>
            </div>
          </React.Fragment>
        }
      </Modal>
    );//End return
  }//End render
  componentDidMount() { this.props.dataId && this.getData(this.props.dataId); }//End componentDidMount
  componentDidUpdate(prevProps) {
    if (prevProps.dataId !== this.props.dataId) { this.getData(this.props.dataId); }
    // if (prevProps.data !== this.props.data) { this.setState({ data: this.props.data }); }
  }//End componentDidMount
}//End class

export default ViewDoneDetails;