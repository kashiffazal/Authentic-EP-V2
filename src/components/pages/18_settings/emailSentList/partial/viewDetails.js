import React, { useEffect, useState } from 'react';
import { Row, Col, Descriptions, Modal } from 'antd';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import { HTTP, UCFirst } from '../../../../services';
import '../../styles.less'

const ViewDetails = (props) => {
  const [layout, setLayout] = useState('vertical');
  const [descResponsiveDetails] = useState({ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 });
  const [descResponsiveDetailsTwoCol] = useState({ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 });
  const [descResponsiveDetailsThreeCol] = useState({ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 });
  const [data, setData] = useState({});
  const [getLoader, setGetLoader] = useState(false);


  useEffect(() => {
    if (props.id) {
      setGetLoader(true);
      HTTP('get', '/settingsEmailSentList/get/viewDetails/' + props.id).then(res => {
        setGetLoader(false);
        if (!res) return false;
        setData(res.data);
        // console.log(res.data);
      });
    }//End if condition
  }, [props.id])


  return (
    <Modal
      width='95%'
      maskClosable={false}
      className="hide-header hide-footer"
      centered={true}
      title={'View Appointment'}
      visible={props.show}
      onOk={() => props.onClose()}
      onCancel={() => props.onClose()}
    // destroyOnClose={true}
    >
      <button type="button" className="hide-header-close-btn btnToLink" onClick={() => props.onClose()}><i className="las la-times" /></button>
      <div className="modal-modern-title-for-view-details">
        <div>
          <span className="title">Email View Details</span>
          <span className="sub-title">{data.module} &gt; {data.sub_module}</span>
        </div>
      </div>

      <div className="circle-round-btn-container-view-modal">
        <div className="circle-round-btn">
          <button type="button" title="View Vertical" className={layout === 'vertical' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => setLayout('vertical')}><i className="las la-th-large" /></button>&nbsp;
          <button type="button" title="View Horizontal" className={layout === 'horizontal' ? 'btnToLink btnRound activeBtnRound' : 'btnToLink btnRound'} onClick={() => setLayout('horizontal')}><i className="las la-th-list" /></button>
        </div>
      </div>

      <ScreenLoader active={getLoader}>
        <Row gutter={window.rowGutter} className="view-details-email-container">
          <Col lg={12} md={12} sm={24} xs={24}>
            <div className="description-custom">
              <h1>Main Details</h1>
              <Descriptions size="small" layout={layout} bordered column={descResponsiveDetailsTwoCol} className={`two-col-${layout}`}>
                <Descriptions.Item label="From">{data.from_name}<br /> &lt;{data.from_email}&gt;</Descriptions.Item>
                <Descriptions.Item label="To">{data.receiver_name}<br /> &lt;{data.receiver_email}&gt;</Descriptions.Item>
                {data.reply_to_name && <Descriptions.Item label="Reply To">{data.reply_to_name}<br /> &lt;{data.reply_to_email}&gt;</Descriptions.Item>}
                {data.cc_name &&
                  <Descriptions.Item label="Cc">
                    {data.cc_name.split(',').map((item, i) => {
                      var email = data.cc_email.split(',');
                      return (<div key={i}>{item}<br /> &lt;{email[i]}&gt;</div>)
                    })}
                  </Descriptions.Item>}
                {data.bcc_name &&
                  <Descriptions.Item label="Bcc">
                    {data.bcc_name.split(',').map((item, i) => {
                      var email = data.bcc_email.split(',');
                      return (<div key={i}>{item}<br /> &lt;{email[i]}&gt;</div>)
                    })}
                  </Descriptions.Item>}
              </Descriptions>
              <h1>Other Details</h1>
              <Descriptions size="small" layout={layout} bordered column={descResponsiveDetailsThreeCol} className={`three-col-${layout}`}>
                <Descriptions.Item label="Module">{data.module}</Descriptions.Item>
                <Descriptions.Item label="Sub Module">{data.sub_module}</Descriptions.Item>
                <Descriptions.Item label="Type">{UCFirst(data.section_ref_name)}</Descriptions.Item>
                <Descriptions.Item label="Delivery Server">{data.ds_name}</Descriptions.Item>
                {data.failed_reason && <Descriptions.Item label="Failed Reason"><span className="status-close-color">{data.failed_reason}</span></Descriptions.Item>}
              </Descriptions>
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>

            <div className="description-custom">
              <h1>Template</h1>
              <Descriptions size="small" layout={'vertical'} column={descResponsiveDetails} bordered>
                <Descriptions.Item label="Subject">{data.subject}</Descriptions.Item>
                <Descriptions.Item label="Email Content">{<div dangerouslySetInnerHTML={{ __html: data.content }} />}</Descriptions.Item>
                {data.send_attachment &&
                  <Descriptions.Item label="Attachment">
                    {data.send_attachment.map((item, i) => {
                      return(<div key={i}><a href={item.path} target='blank' className="attachment">{item.icon && <><i className={item.icon}/>&nbsp;</>}{item.name}</a></div>)
                    })}
                  </Descriptions.Item>
                }
              </Descriptions>
            </div>
          </Col>
        </Row>
      </ScreenLoader>
    </Modal>
  );//End return

}//End function

export default ViewDetails;