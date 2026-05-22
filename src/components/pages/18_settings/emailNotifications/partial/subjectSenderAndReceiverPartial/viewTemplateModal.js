import React, { useState } from 'react';
import { Modal, Radio } from 'antd';

const ViewTemplateModal = (pr) => {
  const [viewType, setViewType] = useState('tag');
  return (
    <Modal
      width={800}
      maskClosable={false}
      className="hide-header hide-footer"
      centered={true}
      visible={pr.show}
      onCancel={() => pr.onClose()}
      destroyOnClose={true}
    >
      <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
      <div className="modal-modern-title">
        <div>
          <span className="title">{pr.data.title}</span>
          <span className="sub-title"><em>{pr.data.inserted_by} - {pr.data.inserted_date}</em></span>
        </div>
        <div>
          {/* <Button type="primary" ghost className="pdf-btn" onClick={() => this.setState({ viewPDF: true })}><i className="las la-file-pdf pos-relative top-2 fs-17" />&nbsp;View Care Plan PDF</Button> */}

          <Radio.Group value={viewType} onChange={(e) => {
            setViewType(e.target.value);
            // console.log(e.target.value)
          }}>
            <Radio.Button value="tag">Tags View</Radio.Button>
            <Radio.Button value="sample">Sample View</Radio.Button>
          </Radio.Group>

        </div>
      </div>
      <div style={{ border: '1px solid gainsboro', borderRadius: '5px', padding: '10px' }}>
        <div dangerouslySetInnerHTML={{ __html: (viewType === 'sample' ? pr.data.template_sample : pr.data.template) }} />
      </div>
    </Modal>
  )//End return
}//Ene function

export default ViewTemplateModal;