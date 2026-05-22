import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { FormatNumber } from '../../services';

class ViewDetails extends Component {
  state = {
    layout: 'vertical',
    descResponsiveDetails: { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 },
    descResponsiveDetailsTwoCol: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 },
    descResponsiveDetailsThreeCol: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }
  }

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
    const height = this.props.height ? this.props.height : 'auto';
    const containerClassName = this.props.containerClassName;
    //console.log(data);
    return (
      <React.Fragment>

        <div className="circle-round-btn-container-view-modal">
          <div className="circle-round-btn">
            <button type="button" title="View Vertical" className={st.layout === 'vertical' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'vertical' })}><i className="las la-th-large" /></button>&nbsp;
            <button type="button" title="View Horizontal" className={st.layout === 'horizontal' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'horizontal' })}><i className="las la-th-list" /></button>
          </div>
        </div>

        <div style={{ height: height }} id="scroll-style-1" className={containerClassName}>

          <div className="description-custom">
            <h1>Main Details</h1>
            <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetails}>
              <Descriptions.Item label="PO Number">{data.po_number}</Descriptions.Item>
              <Descriptions.Item label="Date">{data.po_date}</Descriptions.Item>
              <Descriptions.Item label="Account Title">{data.ac_name}</Descriptions.Item>
              <Descriptions.Item label="Item">{data.item}</Descriptions.Item>
              <Descriptions.Item label="Variety">{data.variety ? data.variety : '-'}</Descriptions.Item>
              <Descriptions.Item label="Origin">{data.origin ? data.origin : '-'}</Descriptions.Item>
              <Descriptions.Item label="Seller">{data.seller}</Descriptions.Item>
              <Descriptions.Item label="Buyer">{data.company_name ? data.company_name : '-'}</Descriptions.Item>
              <Descriptions.Item label="Soda Quantity">{data.quantity}</Descriptions.Item>
            </Descriptions>

            {data.broker_ref_id &&
              <React.Fragment>
                <h1>Broker Details</h1>
                <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetails}>
                  {data.broker_ref_id.split(',').map((item, i) => {
                    return (
                      <React.Fragment key={i}>
                        <Descriptions.Item label={`Broker ${data.broker_ref_id.split(',').length > 1 ? (i + 1) : ''}`}>{data.brokery_details_json.broker_name[i + 1]}</Descriptions.Item>
                        <Descriptions.Item label={`Brokery Type ${data.broker_ref_id.split(',').length > 1 ? (i + 1) : ''}`}>{data.brokery_details_json.brokery_type[i + 1]}</Descriptions.Item>
                        <Descriptions.Item label={`Brokery Rate ${data.broker_ref_id.split(',').length > 1 ? (i + 1) : ''}`}>
                          {data.brokery_details_json.brokery_type_ref_id[i + 1] === '4' ?
                            FormatNumber(data.brokery_details_json.brokery[i + 1])
                            :
                            data.brokery_details_json.brokery[i + 1]
                          }
                        </Descriptions.Item>
                      </React.Fragment>
                    )
                  })}
                </Descriptions>
              </React.Fragment>
            }

            {data.on_account_ref_id &&
              <React.Fragment>
                <h1>On Account Details</h1>
                <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetails}>
                  {(data.is_multi_on_account === 'true' && data.on_account_ref_id.split(',').length > 1) ?
                    data.on_account_ref_id.split(',').map((item, i) => {
                      return (
                        <React.Fragment key={i}>
                          {/* <Descriptions.Item label=><h2>On Account Details</h2></Descriptions.Item> */}
                          <Descriptions.Item label={`On Account of ${data.on_account_ref_id.split(',').length > 1 ? (i + 1) : ''}`}>{data.on_account_details_json.on_account_name[i + 1]}</Descriptions.Item>
                          <Descriptions.Item label={`On Account Type ${data.on_account_ref_id.split(',').length > 1 && i + 1}`}>{data.on_account_details_json.on_account_amount[i + 1]}</Descriptions.Item>
                          <Descriptions.Item label={`Quantity ${data.on_account_ref_id.split(',').length > 1 && i + 1}`}>{data.on_account_details_json.on_account_percent_or_amount[i + 1]}</Descriptions.Item>
                        </React.Fragment>
                      )
                    })
                    :
                    <Descriptions.Item label="On Account of">{data.on_account_details_json.on_account_name[1]}</Descriptions.Item>
                  }
                </Descriptions>
              </React.Fragment>
            }

            <h1>Other Details</h1>
            <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetails}>
              <Descriptions.Item label="Purchase Price">{data.purchase_price}</Descriptions.Item>
              <Descriptions.Item label="Market Price">{data.market_price}</Descriptions.Item>
              <Descriptions.Item label="Term">{data.term_type}</Descriptions.Item>
              <Descriptions.Item label="Term Days">{(data.term_ref_id === '6' || data.term_ref_id === '7') ? data.term_days : '-'}</Descriptions.Item>
              <Descriptions.Item label="Term Date">{data.term_date}</Descriptions.Item>
              <Descriptions.Item label="Packing">{data.packing}</Descriptions.Item>
              <Descriptions.Item label="Term">{data.term_type}</Descriptions.Item>
              {data.allowSukri === 'true' && <Descriptions.Item label="Sukri Ratio">{data.sukriRatio}%</Descriptions.Item>}
              <Descriptions.Item label="Remarks">{data.remarks}</Descriptions.Item>
            </Descriptions>

            {((data.delivery_details_json && data.delivery_details_json.length !== 0) && (Object.keys(data.delivery_details_json.delivery_from).length > 0) &&
              <React.Fragment>
                <h1>Delivery Details</h1>
                <Descriptions className="nested-container" size="small" layout={'vertical'} bordered column={st.descResponsiveDetailsThreeCol}>
                  {Object.keys(data.delivery_details_json.delivery_from).map((i, k) => {
                    return (
                      <React.Fragment key={k}>
                        <Descriptions.Item label="Delivery Date">{data.delivery_details_json.delivery_date[i]}</Descriptions.Item>
                        <Descriptions.Item label="Delivery From">{data.delivery_details_json.delivery_from_name[i]}</Descriptions.Item>
                        <Descriptions.Item label="Delivery Qty">{data.delivery_details_json.delivery_quantity[i]}</Descriptions.Item>
                        {this.nestedDeliveryData(i)}
                      </React.Fragment>
                    )
                  })}
                </Descriptions>
              </React.Fragment>
            )}

            <h1>Inserted Details</h1>
            <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetailsTwoCol}>
              <Descriptions.Item label="Inserted Date">{data.inserted_date}, {data.inserted_time}</Descriptions.Item>
              <Descriptions.Item label="Inserted By">{data.inserted_by_first_name} {data.inserted_by_last_name}</Descriptions.Item>
              {data.updated_date &&
                <React.Fragment>
                  <Descriptions.Item label="Updated Date">{data.updated_date}, {data.updated_time}</Descriptions.Item>
                  <Descriptions.Item label="Updated By">{data.updated_by_first_name} {data.updated_by_last_name}</Descriptions.Item>
                </React.Fragment>
              }
            </Descriptions>

          </div>
        </div>
      </React.Fragment >
    );//End return
  }//End render
}//End class

export default ViewDetails;