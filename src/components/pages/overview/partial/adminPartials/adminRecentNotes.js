import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Tooltip, Row, Col, Carousel, Button, Empty, Spin } from 'antd';
import AddNodeModule from '../../../4_clients/note/addNoteModal';
// import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
// import { HTTP } from '../../../services';
// import ScreenLoader from '../../../externalComponents/screen-loader';

class RecentStatusNotes extends Component {
  state = {
    viewModal: false,
    clientRefId: ''
  }

  render() {
    const dt = this.props.data;
    const st = this.state;
    return (
      <div className="box recent-notes-container">
        <h3 className="current_label_sub_heading">CLIENT STATUS NOTES</h3>
        <Button type="primary" ghost size="small" className="side-right-btn" onClick={() => this.props.history.push(process.env.PUBLIC_URL + '/e/clientNote')}>View All</Button>
        <hr className="hr-1 m-t-10 m-b-7" />
        <Spin spinning={this.props.loader} className="spin-loader" tip="Loading, Please wait...">
          <div className="note-container" id="scroll-style-4">
            {dt && !(dt.length > 0) &&
              <div className="notes-not-found"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Notes are not added yat!'} /></div>
            }
            {dt && dt.map(item => {
              return (
                <div key={item.id} className="note">
                  <Row gutter={5} justify="space-around" align="middle">
                    <Col lg={16} md={16} sm={16} xs={16}>
                      <div className="client-name">{item.client_name}</div>
                      <Carousel autoplay dots={false} effect="fade">
                        {item.note.map((nv, ni) => {
                          return (
                            <div key={ni}>
                              <div className="client-note">{nv.note}</div>
                              <div className="date">{nv.date} - <button className="btnToLink link-color" onClick={() => this.setState({ viewModal: true, clientRefId: item.client_ref_id })}>(View All Notes)</button></div>
                            </div>
                          )
                        })}
                      </Carousel>
                    </Col>
                    <Col lg={8} md={8} sm={8} xs={8} className="text-right p-t-5">
                      <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{item.sp_name.map((im, k) => { return (<Tooltip key={k} title={im.name} placement="top"><Avatar style={{ background: im.slug_color }} src={im.img}>{im.nameSlug}</Avatar></Tooltip>) })}</Avatar.Group>
                    </Col>
                  </Row>
                </div>
              )
            })
            }
          </div>
        </Spin>
        <AddNodeModule clientId={st.clientRefId} show={st.viewModal} onClose={() => this.setState({ viewModal: false })} />
      </div>
    )//End return
  }//End render
}//End class
export default withRouter(RecentStatusNotes);