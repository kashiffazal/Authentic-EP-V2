import React, { Component } from 'react';
import { Modal, Spin } from 'antd';
import { HTTP } from '../../../services';
import ViewDetails from '../log/viewDetails';

class RecentUsers extends Component {

  state = {
    loader: false,
    viewDetailModal: false,
    viewData: {},
    list: []
  }

  getData = () => {
    this.setState({ 'loader': true });
    HTTP('get', '/usersManagement/get/recentUsers').then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      res = res.data;
      this.setState({ 'list': res })
    });
  }//End function

  render() {
    return (
      <div className="widget_container">
        <div className="container">
          <h2 className="m-0"><span className="fw-400">Recent</span> Users</h2>
          <hr className="hr-1" />
          <Spin tip="loading" spinning={this.state.loader}>
            {this.state.loader ? <div style={{ height: '261px' }}></div> :
              this.state.list.map(item => {
                return (
                  <div key={item.key} className="widget-list">
                    <p>
                      <button className="btnToLink dis-block link-color fw-500" onClick={() => this.setState({ viewDetailModal: true, viewData: item })}>{item.first_name} {item.last_name}</button>
                      <span>{item.role_name} <i className="las la-arrow-right" /> {item.status_name}</span>
                    </p>
                  </div>
                )
              })
            }
          </Spin>
        </div>
        <Modal
          width={940}
          maskClosable={false}
          className="hide-footer"
          // title={this.state.viewData.first_name + " " + this.state.viewData.last_name}
          visible={this.state.viewDetailModal}
          onOk={() => this.setState({ viewDetailModal: false })}
          onCancel={() => this.setState({ viewDetailModal: false })}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ viewDetailModal: false })}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">{this.state.viewData.first_name + " " + this.state.viewData.last_name}</span>
              <span className="sub-title">View User in Detail</span>
            </div>
          </div>
          <ViewDetails data={this.state.viewData} />
        </Modal>
      </div>
    );//End return
  }//End render
  componentDidMount() { this.getData(); }//End componentDidMount
  componentDidUpdate(prevProps) { if (prevProps.reset !== this.props.reset) { this.getData(); } }//End componentDidUpdate
}//End class

export default RecentUsers;