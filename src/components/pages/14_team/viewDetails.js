import React, { Component } from 'react';
import { Descriptions, Row, Col } from 'antd';

class ViewTeamDetails extends Component {
  state = {
    layout: 'vertical',
    descResponsiveDetailsTwoCol: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 },
    descResponsiveDetailsThreeCol: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }
  }

  render() {
    const st = this.state;;
    const data = this.props.data;
    return (
      <React.Fragment>

        {/* <div className="circle-round-btn-container-view-modal">
          <div className="circle-round-btn">
            <button type="button" title="View Vertical" className={st.layout === 'vertical' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'vertical' })}><i className="las la-th-large" /></button>&nbsp;
                  <button type="button" title="View Horizontal" className={st.layout === 'horizontal' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'horizontal' })}><i className="las la-th-list" /></button>
          </div>
        </div> */}

        <Row gutter={window.rowGutter}>
          <Col lg={7} md={7} xs={24}>
            <img src={data.profileImg} width="100%" alt="" style={{
              border: '3px solid white',
              borderRadius: '3px',
              boxShadow: '0px 0px 4px #b5b5b5',
              marginBottom: '20px'
            }} />
          </Col>
          <Col lg={17} md={17} xs={24}>

            <div className="description-custom">
              <h1>Main Details</h1>
              <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetailsTwoCol} className={`two-col-${st.layout}`}>
                <Descriptions.Item label="Full Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Position">{data.teamPosition}</Descriptions.Item>
                <Descriptions.Item label="Languages can speak">{data.otherLanguageSpeak}</Descriptions.Item>
                <Descriptions.Item label="Country of Birth">{data.bornCountryName}</Descriptions.Item>
                <Descriptions.Item label="Experience" span={2}><div className="textbox-value">{data.aboutExperience ? data.aboutExperience : '-'}</div></Descriptions.Item>
                <Descriptions.Item label="Description" span={2}><div className="textbox-value">{data.description ? data.description : '-'}</div></Descriptions.Item>
              </Descriptions>

              <h1>Inserted Details</h1>
              <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetailsTwoCol} className={`two-col-${st.layout}`}>
                <Descriptions.Item label="Inserted Date">{data.inserted_date}</Descriptions.Item>
                <Descriptions.Item label="Inserted By">{data.inserted_by}</Descriptions.Item>
                {data.updated_date &&
                  <React.Fragment>
                    <Descriptions.Item label="Updated Date">{data.updated_date}</Descriptions.Item>
                    <Descriptions.Item label="Updated By">{data.updated_by}</Descriptions.Item>
                  </React.Fragment>
                }
              </Descriptions>
            </div>

          </Col>
        </Row>



      </React.Fragment>
    );//End return
  }//End render
}//End class

export default ViewTeamDetails;