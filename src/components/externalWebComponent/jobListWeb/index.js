import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { HTTP } from '../../services';
import SupportWorkerFormExternal from '../../pages/3_support_worker/form/mainForm';
import ScreenLoader from '../../externalComponents/screen-loader';
import './style.less';

class JobListWeb extends Component {
  state = {
    loader: false,
    listData: [],
    noJobMsg: '',
    showSuppotWorkerForm: false,
    jobData: null
  }
  applyOnJob = (jobData) => {
    this.setState({ showSuppotWorkerForm: true, jobData: jobData });
  }//End Function
  render() {
    const ld = this.state.listData;
    const st = this.state;
    return (
      <ScreenLoader active={this.state.loader}>
        {this.state.loader && <div className="h-200"></div>}
        {st.showSuppotWorkerForm ? <SupportWorkerFormExternal jobData={st.jobData} backToJob={() => this.setState({ showSuppotWorkerForm: false })} /> :
          <div className="jobListContainer">
            {ld.length === 0 ? <div dangerouslySetInnerHTML={{ __html: this.state.noJobMsg }} /> :
              ld.map(item => {
                return (
                  <Row gutter={window.rowGutterSmall} key={item.id} className="listRow">
                    <Col lg={5} md={6} sm={24} xs={24}>
                      <h2 className="title">{item.title}</h2>
                      <span className="position">{item.position}</span>
                      <span className="timing">{item.timing}</span>
                    </Col>
                    <Col lg={14} md={12} sm={24} xs={24}><div className="description textbox-value">{item.description}</div></Col>
                    <Col lg={5} md={6} sm={24} className="text-right"><Button className="button" onClick={() => this.applyOnJob(item)}>Apply now</Button></Col>
                  </Row>
                )//End return
              })//End map
            }
          </div>
        }
      </ScreenLoader>
    );//End return
  }//End render
  componentWillMount() {
    this.setState({ loader: true });
    HTTP('get', '/job/get/jobListForWeb/se/ig').then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ listData: res.data, noJobMsg: res.noJobMsg });
    });
  }//End componentWillMount
}//End class

export default JobListWeb;