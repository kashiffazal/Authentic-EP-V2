import React, { Component } from 'react';
import { Row, Col, Descriptions } from 'antd';

class ViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: 'vertical',
      descResponsiveDetails: { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 },
      descResponsiveDetailsTwoCol: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 },
      descResponsiveDetailsThreeCol: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 },
      descResponsiveDetailsFourCol: { xxl: 4, xl: 4, lg: 4, md: 4, sm: 4, xs: 2 }
    }//End state
  }//End constructor

  nestedDeliveryData = (index) => {
    let nestData = this.props.data.delivery_details_json.nested;
    if (nestData && nestData[index]) {
      let data = Object.keys(nestData[index]['delivery_date_nes' + index]).map((i, k) => {
        return (
          <React.Fragment key={k}>
            <Descriptions.Item label="Delivery Date"> <i className="las la-level-up-alt"></i> {nestData[index]['delivery_date_nes' + index][i]}</Descriptions.Item>
            <Descriptions.Item label="Delivery From"> <i className="las la-level-up-alt"></i> {nestData[index]['delivery_from_name_nes' + index][i]}</Descriptions.Item>
            <Descriptions.Item label="Delivery Qty"> <i className="las la-level-up-alt"></i> {nestData[index]['delivery_quantity_nes' + index][i]}</Descriptions.Item>
          </React.Fragment>
        )
      })
      return data;
    }
    return '';
  }//End function

  render() {
    const st = this.state;;
    const data = this.props.data;
    const branches = data.branches_data ? JSON.parse(data.branches_data) : null;
    // console.log(branches);
    return (
      <React.Fragment>

        <div className="circle-round-btn-container-view-modal">
          <div className="circle-round-btn">
            <button type="button" title="View Vertical" className={st.layout === 'vertical' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'vertical' })}><i className="las la-th-large" /></button>&nbsp;
            <button type="button" title="View Horizontal" className={st.layout === 'horizontal' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'horizontal' })}><i className="las la-th-list" /></button>
          </div>
        </div>

        <Row gutter={window.rowGutter}>
          <Col lg={6} md={8} sm={24} xs={24}>
            <div style={{
              border: '1px solid #e8e8e8',
              textAlign: 'center',
              padding: '10px',
              borderRadius: '3px',
              background: '#fafafa'
            }}>
              <img style={{ width: '200px' }} src={
                data.company_logo ? 
                `${window.domainPath}/files/uploads/companies_logo/${data.company_logo}`
                :
                `${process.env.PUBLIC_URL}/img/logo-placeholder.png`
                } alt="" />
            </div>
          </Col>
          <Col lg={18} md={16} sm={24} xs={24}>

            <div className="description-custom">
              <h1>Company Info</h1>
              <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetails} className={`three-col-${this.state.layout}`}>
                <Descriptions.Item label="Company Name">{data.company_name}</Descriptions.Item>
                <Descriptions.Item label="Company Phone/Mobile">{data.company_phone_mobile}</Descriptions.Item>
                {/* <Descriptions.Item label="Company Mobile">{data.company_mobile}</Descriptions.Item> */}
                <Descriptions.Item label="Company Email">{data.company_email}</Descriptions.Item>
                <Descriptions.Item label="Web Domain Name">{data.company_domain_name}</Descriptions.Item>
                <Descriptions.Item label="Office Address">{data.company_address}</Descriptions.Item>
              </Descriptions>
              {data.branches_ref_ids &&
                <React.Fragment>
                  <h1>Branches Details</h1>
                  {data.branches_ref_ids.split(',').map((item, i) => {
                    return (
                      <React.Fragment key={i}>
                        <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetails} className={`three-col-${this.state.layout}`}>
                          <Descriptions.Item label="Branch Name">{branches.branch[i + 1]}</Descriptions.Item>
                          <Descriptions.Item label="Branch Phone/Mobile">{branches.phone_mobile_number[i + 1]}</Descriptions.Item>
                          {/* <Descriptions.Item label="Branch Mobile">{branches.mobile_number[i + 1]}</Descriptions.Item> */}
                          <Descriptions.Item label="Branch Email">{branches.email[i + 1]}</Descriptions.Item>
                          <Descriptions.Item label="Branch Address" span={3}>{branches.address[i + 1]}</Descriptions.Item>
                        </Descriptions>
                        <hr />
                      </React.Fragment>
                    )
                  })}
                </React.Fragment>
              }
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );//End return
  }//End render
}//End class

export default ViewDetails;