import React, { Component } from 'react'
import { Modal } from 'antd';

class ViewPDFInModal extends Component {
  render() {
    const pr = this.props;
    const title = pr.title ? pr.title : 'View Detailed File';
    const subTitle = pr.subTitle ? pr.subTitle : 'Detailed PDF view'
    return (
      <Modal
        width={pr.width ? pr.width : 960}
        maskClosable={false}
        className="hide-footer"
        centered={true}
        // title={pr.title ? pr.title : 'View Detailed File'}
        visible={pr.show}
        onOk={() => pr.close()}
        onCancel={() => pr.close()}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.close()}><i className="las la-times" /></button>
        <div className="modal-modern-title">
          <div>
            <span className="title">{title}</span>
            <span className="sub-title">{subTitle}</span>
          </div>
        </div>
        {/* https://docs.google.com/viewerng/viewer?url=https://blockims.horizonstradingcorporation.com/server/report_files/1/general_journal_report_1.pdf?k=ac0f */}
        {pr.pdfPath ? <iframe title={title} src={window.googleDocViewerPDF + pr.pdfPath} className="pdfIframe" allow="autoplay; encrypted-media" allowTransparency="true" allowFullScreen /> : 'No PDF Found'}
      </Modal>
    )//End return
  }//End render
}//End class
export default ViewPDFInModal;