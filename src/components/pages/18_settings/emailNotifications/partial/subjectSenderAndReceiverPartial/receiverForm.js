import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, message, Tooltip } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import { HTTP } from '../../../../../services';
import ScreenLoader from '../../../../../externalComponents/screen-loader';
// import HeadingSection from './headingSection';

const formRef = React.createRef();

const ReceiverForm = (pr) => {
  const [getLoader, setGetLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isCc, setIsCc] = useState(false);
  const [isBcc, setIsBcc] = useState(false);
  const [setTemplate, setSetTemplate] = useState(false);
  const [setTemplateBtnLoader, setSetTemplateBtnLoader] = useState(false);

  useEffect(() => {
    if (pr.moduleId) {
      setGetLoader(true);
      HTTP('get', '/settingsEmailNotifications/get/receiverData/module/' + pr.moduleId + '/subModule/' + pr.subModuleId + '/section/' + (pr.selectedSectionName ? pr.selectedSectionName : '')).then(res => {
        setGetLoader(false);
        if (!res) return false;
        formRef.current.setFieldsValue(res.data);
        if (res.data.is_cc) { setIsCc(true); }
        if (res.data.is_bcc) { setIsBcc(true); }
      });
    }//End if condition
  }, [pr.moduleId, pr.subModuleId, pr.selectedSectionName]);

  const submitForm = (values) => {
    setTemplate ? setSetTemplateBtnLoader(true) : setLoader(true);
    setTimeout(() => {
      values.is_cc = isCc;
      values.is_bcc = isBcc;
      HTTP('post', '/settingsEmailNotifications/post/receiver/', values).then(res => {
        setLoader(false);
        setSetTemplateBtnLoader(false);
        if (!res) return false;
        message.config({ duration: 5, maxCount: 3, });
        if (setTemplate) { pr.showTemplateList(); }//End if condition
      });
    }, 100);
  }//End function

  return (
    <React.Fragment>
      {/* <HeadingSection selectedModule={pr.selectedModule} step={2} showTemplateList={pr.showTemplateList} showSenderForm={pr.showSenderForm} /> */}
      <ScreenLoader active={getLoader}>
        <Form className="form-style-1 form-container" ref={formRef} layout="vertical" onFinish={submitForm} autoComplete="off">
          <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
          <Row gutter={window.rowGutter}>
            <Col lg={24} md={24} sm={24} xs={24}>
              <div className="form-field">
                <label>
                  <div className="main-label">Who will receive?</div>
                  <span>You can add multiple receiver name and email separated by comma</span>
                </label>
                {!(isCc || isBcc) &&
                  <span className="btn">
                    <Tooltip title="Add Cc Email(s)">
                      <button type="button" className="btnToLink link-color m-r-5" onClick={() => setIsCc(true)}>Cc</button>
                    </Tooltip>
                    <Tooltip title="Add Bcc Email(s)">
                      <button type="button" className="btnToLink link-color" onClick={() => setIsBcc(true)}>Bcc</button>
                    </Tooltip>
                  </span>
                }
                <div className="field">
                  <Row gutter={window.rowGutterSmall}>
                    <Col lg={12} md={24} sm={24} xs={24}>
                      <AntInput name="receiver_name" placeholder="Type receiver name" autoComplete='off' className="mar-bot-mob" />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                      <AntInput name="receiver_email" placeholder="Type receiver email" autoComplete='off' />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            {isCc &&
              <Col lg={24} md={24} sm={24} xs={24}>
                <div className="form-field">
                  <label>
                    <div className="main-label fs-18 fw-500">Add Cc Email(s)</div>
                    <span>You can add multiple Cc Email and Name separated by comma</span>
                  </label>
                  <span className="btn">
                    {!isBcc && <span>
                      <Tooltip title="Add Bcc Email(s)">
                        <button type="button" className="btnToLink link-color" onClick={() => setIsBcc(true)}>Bcc</button>
                      </Tooltip>
                      <span className="btn-separator">|</span></span>}
                    <Tooltip title="Remove all Cc Email(s)">
                      <button type="button" className="btnToLink link-color" onClick={() => setIsCc(false)}>
                        {/* <i className="las la-times-circle" />  */}
                        Remove</button>
                    </Tooltip>
                  </span>
                  <div className="field">
                    <Row gutter={window.rowGutterSmall}>
                      <Col lg={12} md={24} sm={24} xs={24}>
                        <AntInput name="cc_name" placeholder="Please Cc Name(s)..." className="mar-bot-mob" />
                      </Col>
                      <Col lg={12} md={24} sm={24} xs={24}>
                        <AntInput name="cc_email" placeholder="Please Cc Email(s)..." />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            }
            {isBcc &&
              <Col lg={24} md={24} sm={24} xs={24}>
                <div className="form-field">
                  <label>
                    <div className="main-label fs-18 fw-500">Add Bcc Email(s)</div>
                    <span>You can add multiple Bcc Email and Name separated by comma</span>
                  </label>
                  <span className="btn">
                    {!isCc && <span>
                      <Tooltip title="Add Cc Email(s)">
                        <button className="btnToLink link-color" onClick={() => setIsCc(true)}>Cc</button>
                      </Tooltip>
                      <span className="btn-separator">|</span></span>}
                    <Tooltip title="Remove all Bcc Email(s)">
                      <button className="btnToLink link-color" onClick={() => setIsBcc(false)}>
                        {/* <i className="las la-times-circle" />  */}
                        Remove</button>
                    </Tooltip>
                  </span>
                  <div className="field">
                    <Row gutter={window.rowGutterSmall}>
                      <Col lg={12} md={24} sm={24} xs={24}>
                        <AntInput name="bcc_name" placeholder="Please Bcc Name(s)..." className="mar-bot-mob" />
                      </Col>
                      <Col lg={12} md={24} sm={24} xs={24}>
                        <AntInput name="bcc_email" placeholder="Please Bcc Email(s)..." />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            }
          </Row>

          <div className="form-field">
            <AntInput type="checkbox" name="send_attachment" text="Allow to send attachment" noRequired={true} />
            <p className="help">Attachment could be any thing like form PDF or any other files etc.</p>
          </div>

          <hr className="hr-1 m-b-15" />

          <Row gutter={window.rowGutterSmall}>
            <Col lg={8} md={24} sm={24} xs={24}>
              <Button className="w-full mar-bot-mob" ghost size="large" type="primary" htmlType="button" onClick={() => pr.showSenderForm()}><i className="las la-angle-double-left pos-relative top-1" /> Back to Set Sender</Button>
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <Button className="w-full mar-bot-mob" ghost size="large" type="primary" htmlType="submit" loading={loader}>Save Receiver</Button>
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <Button className="w-full" size="large" type="primary" htmlType="submit" onClick={() => setSetTemplate(true)} loading={setTemplateBtnLoader}>Save & Next to Template <i className="las la-angle-double-right pos-relative top-1" /></Button>
            </Col>
          </Row>

        </Form>
      </ScreenLoader>
    </React.Fragment>
  )//End return
}//End function

export default ReceiverForm;