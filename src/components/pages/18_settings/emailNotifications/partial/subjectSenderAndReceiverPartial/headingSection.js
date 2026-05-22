import React from 'react';
import { Button, Steps, Row, Col } from 'antd';

const { Step } = Steps;

const HeadingSection = (pr) => {
  //?Selected Sub Menu
  const ssm = pr.selectedModule.selectedSubMenu ? pr.selectedModule.selectedSubMenu : {};
  return (
    <div className="main-side-by-side-heading">
      <Row gutter={window.rowGutter}>
        <Col lg={19} md={19} sm={19} xs={24}>

          <div className="flex-m">
            <i className={`${pr.selectedModule.icon} icon`} />
            <div>
              <h3 className="heading">
                {pr.step === 1 && 'Define the subject and sender details for'}
                {pr.step === 2 && 'Define the receiver details'}
                {pr.step === 3 && 'Email Template List'}
                {pr.step === 4 && (pr.templateId ? 'Update' : 'Create New') + ' Email Template'}
              </h3>
              <span className="sub-heading">{pr.selectedModule.module}
                {ssm.sub_module && <span><i className="las la-angle-double-right" /> {ssm.sub_module}</span>}
                {pr.selectedSectionLabel && <span> ({pr.selectedSectionLabel})</span>}
              </span>
            </div>
          </div>
        </Col>
        <Col lg={5} md={5} sm={5} xs={24}>

          <Steps size="small" current={(pr.step - 1)} className="extra-small-steps">
            <Step />
            <Step />
            <Step />
          </Steps>
          <div className="step-label">
            {pr.step === 1 && 'Sender'}
            {pr.step === 2 && 'Receiver'}
            {pr.step === 3 && 'Template'}
            {pr.step === 4 && (pr.templateId ? 'Update' : 'Create') + ' Template'}
          </div>
          {/* {pr.step === 1 && <Button size="large" onClick={() => pr.showSenderForm()}><i className="las la-inbox fs-18 pos-relative top-1 m-r-2" /> Set Receiver</Button>}
          {pr.step === 2 &&
            <>
              <Button size="large" className="m-r-5" onClick={() => pr.showSenderForm()}><i className="las la-angle-double-left fs-18 pos-relative top-1 m-r-2" /> Set Sender</Button>
              <Button size="large" onClick={() => pr.showTemplateList()}>Set Template <i className="las la-angle-double-right fs-18 pos-relative top-1 m-l-2" /></Button>
            </>
          }
          {pr.step === 3 && <Button size="large" onClick={() => pr.showTemplateEditor()}><i className="las la-plus fs-18 pos-relative top-1 m-r-2" /> Create New</Button>}
          {pr.step === 4 && <Button size="large" onClick={() => pr.showTemplateList()}><i className="las la-angle-double-left fs-18 pos-relative top-1 m-r-2" /> Back</Button>} */}
        </Col>
      </Row>
    </div>
  )//End return
}//End function

export default HeadingSection;