import React, { Component } from 'react';
import { Descriptions } from 'antd';

class ViewDetailsJob extends Component {
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

            <div className="circle-round-btn-container-view-modal">
               <div className="circle-round-btn">
                  <button type="button" title="View Vertical" className={st.layout === 'vertical' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'vertical' })}><i className="las la-th-large" /></button>&nbsp;
                  <button type="button" title="View Horizontal" className={st.layout === 'horizontal' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'horizontal' })}><i className="las la-th-list" /></button>
               </div>
            </div>


            <div className="description-custom">
               <h1>Main Details</h1>
               <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetailsThreeCol} className={`three-col-${st.layout}`}>
                  <Descriptions.Item label="Title" span={3}>{data.title}</Descriptions.Item>
                  <Descriptions.Item label="Position" span={2}>{data.position}</Descriptions.Item>
                  <Descriptions.Item label="Timing">{data.timing}</Descriptions.Item>
                  <Descriptions.Item label="Description" span={3}><div className="textbox-value">{data.description}</div></Descriptions.Item>
               </Descriptions>
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

            </div>

         </React.Fragment>
      );//End return
   }//End render
}//End class

export default ViewDetailsJob;