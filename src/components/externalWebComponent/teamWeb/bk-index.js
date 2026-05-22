import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { HTTP } from '../../services';
import ScreenLoader from '../../externalComponents/screen-loader';

// import './style.less';

class TeamWeb extends Component {
  state = {
    loader: false,
    listData: [],
    dataLength: 0
  }
  render() {
    const data = this.state.listData;
    const len = this.state.dataLength;
    return (
      <div className="teamBoxContainer">
        <ScreenLoader active={this.state.loader}>
          <Row gutter={30} type="flex">
            {len <= 3 &&
              data.map((item, i) => {
                return (
                  <Col lg={8} md={8} xs={24} key={i}>
                    <div className="teamBox">
                      <img className="teamImg" src={item.profileImg} width="100%" alt="" />
                      <div className="teamPosition">{item.teamPosition}</div>
                      <div className="teamName">{item.name}</div>
                      <div className="teamCountry">{item.bornCountry}</div>
                      <div className="teamLangiages">{item.otherLanguageSpeak}</div>
                    </div>
                  </Col>
                );
              })
            }

            {len > 3 &&
              data.map((item, i) => {
                return (
                  <Col lg={6} md={6} sm={12} xs={24} key={i}>
                    <div className="teamBox">
                      <img className="teamImg" src={item.profileImg} width="100%" alt="" />
                      <div className="teamPosition">{item.teamPosition}</div>
                      <div className="teamName">{item.name}</div>
                      <div className="teamCountry">{item.bornCountry}</div>
                      <div className="teamLangiages">{item.otherLanguageSpeak}</div>
                    </div>
                  </Col>
                );
              })
            }
          </Row>
        </ScreenLoader>
      </div>
    );//End return
  }//End render
  componentWillMount() {
    this.setState({ loader: true });
    HTTP('get', '/team/get/listForWeb/se/ig').then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      //console.log(res);
      this.setState({ listData: res.data, dataLength: res.data.length });
    });
  }//End componentWillMount
}//End class

export default TeamWeb;