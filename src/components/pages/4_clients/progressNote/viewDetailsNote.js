import React, { Component } from 'react';
import { Descriptions } from 'antd';
import { HTTP } from '../../../services';
import ScreenLoader from '../../../externalComponents/screen-loader';

class ViewDetailsJob extends Component {
   state = {
      data: {},
      loader: false,
      layout: 'vertical',
      descResponsiveDetailsTwoCol: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 },
      descResponsiveDetailsThreeCol: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }
   }

   render() {
      const st = this.state;;
      const data = st.data;
      return (
         <ScreenLoader active={st.loader}>

            <div className="circle-round-btn-container-view-modal">
               <div className="circle-round-btn">
                  <button type="button" title="View Vertical" className={st.layout === 'vertical' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'vertical' })}><i className="las la-th-large" /></button>&nbsp;
                  <button type="button" title="View Horizontal" className={st.layout === 'horizontal' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => this.setState({ layout: 'horizontal' })}><i className="las la-th-list" /></button>
               </div>
            </div>

            <div className="description-custom">
               <h1>Main Details</h1>
               <Descriptions size="small" layout={this.state.layout} bordered column={st.descResponsiveDetailsThreeCol} className={`three-col-${st.layout}`}>
                  <Descriptions.Item label="Date">{data.date}</Descriptions.Item>
                  <Descriptions.Item label="Client Name">{data.name}</Descriptions.Item>
                  <Descriptions.Item label="Time">{data.time}</Descriptions.Item>
                  <Descriptions.Item label="Note" span={3}><div className="textbox-value">{data.note}</div></Descriptions.Item>
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

         </ScreenLoader>
      );//End return
   }//End render
   componentDidMount() {
      this.setState({ loader: true });
      HTTP('get', '/clientProgressNote/get/getDetails/'+this.props.dataId).then(res => {
         this.setState({ loader: false });
         if (!res) return false;
         //console.log(res)
         this.setState({ data: res.data });
      });
   }//End componentDidMount
}//End class

export default ViewDetailsJob;