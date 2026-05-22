import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import CarePlan from './carePlan';
import ViewPDFInModal from '../../mutual/viewPDFInModal';


class CarePlanModal extends Component {
  state = {
    viewPDF: false,
    updatedPDFLink: false,
    clientData: {},
    loader: false
  }
  render() {
    const st = this.state;
    const pr = this.props;
    const cd = st.clientData;
    return (
      <>
        <Modal
          width={990}
          maskClosable={false}
          className="hide-header hide-footer"
          centered={true}
          title={'Care Plan'}
          visible={pr.show}
          onCancel={() => pr.onClose()}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">Participant Care Plan for</span>
              <span className="sub-title">{cd.name} - Age {cd.age}, <span className="fs-14">{cd.street_address}</span></span>
            </div>
            <div>
              <Button type="primary" ghost className="pdf-btn" onClick={() => this.setState({ viewPDF: true })}><i className="las la-file-pdf pos-relative top-2 fs-17" />&nbsp;View Care Plan PDF</Button>
            </div>
          </div>
          <CarePlan
            clientId={pr.clientId}
            updatedPDFLink={(e) => this.setState({ updatedPDFLink: e })}
            loader={(e) => this.setState({ loader: e })}
            clientData={(e) => this.setState({ clientData: e })}
          />
        </Modal>
        <ViewPDFInModal title={`Care Plan for ${cd.name} - Age ${cd.age}, ${cd.street_address}`} show={st.viewPDF} close={() => this.setState({ viewPDF: false })} pdfPath={st.updatedPDFLink ? st.updatedPDFLink : cd.carePlanPDFLink} />
      </>
    );//End return
  }//End render
}//End class

export default CarePlanModal;