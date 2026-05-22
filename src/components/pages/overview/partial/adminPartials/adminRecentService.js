import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Tooltip, Button, Empty, Spin } from 'antd';
import ViewDetailModal from '../../../15_service_plaining/plainingLog/partial/viewDetailModal';

class RecentServices extends Component {
  state = {
    viewModal: false,
    serviceRefId: ''
  }

  render() {
    const dt = this.props.data;
    const st = this.state;
    return (
      <div className="service-box-container">
        <h3 className="current_label_sub_heading">RECENT SERVICES</h3>
        <div className="heading-bar"></div>
        <Button type="primary" ghost size="small" className="side-right-btn" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/servicePlainLog')}>View All</Button>
        {dt && !(dt.length > 0) &&
          <div className="service-box specific-border-2 h-156"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Services are not added yat!'} /></div>
        }
        {this.props.loader &&
          <Spin spinning={this.props.loader} className="spin-loader" tip="Loading, Please wait...">
            <div className="service-box specific-border-2 h-156"></div>
          </Spin>
        }

        <div className="service-box-flex">
          {dt && dt.map((item, i) => {
            return (
              <div key={item.id} className={`service-box specific-border-${i + 1}`} >
                <div className="flex-sb-m">
                  <strong className="fs-14">{item.client_name}</strong>
                  <Tooltip title="View Details" placement="top"><Button type="primary" ghost size="small" onClick={() => this.setState({ viewModal: true, serviceRefId: item.id })}><i className="las la-bars" /></Button></Tooltip>
                </div>
                {item.service_name}<br />
                <div className="fs-12"><em>{item.dateTime}</em></div>
                <hr className="hr-1" />
                <div className="flex-l-m fs-12">
                  <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    <Tooltip title={item.swp1_name} placement="top"><Avatar style={{ background: item.slugColor1 }} src={item.swp1_img}>{item.swp1_name_slug}</Avatar></Tooltip>
                    {item.swp2_name && <Tooltip title={item.swp2_name} placement="top"><Avatar style={{ background: item.slugColor2 }} src={item.swp2_img}>{item.swp2_name_slug}</Avatar></Tooltip>}
                  </Avatar.Group>
                  <div className="fs-12 flex-sb-m w-full p-l-10">
                    <div><strong>{item.service_day} {item.service_date} - {item.service_start_time} to {item.service_end_time}</strong><br />{item.frequency}</div>
                    <div>{item.hour} Hours</div>
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
        <ViewDetailModal dataId={st.serviceRefId} show={st.viewModal} onClose={() => this.setState({ viewModal: false })} />
      </div>
    )//End return
  }//End render
}//End class
export default withRouter(RecentServices);