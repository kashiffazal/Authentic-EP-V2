import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, message } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import { HTTP } from '../../../../../services';
import ScreenLoader from '../../../../../externalComponents/screen-loader';
// import HeadingSection from './headingSection';

const formRef = React.createRef();

const SubjectAndSenderForm = (pr) => {
  const [getLoader, setGetLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showReplayTo, setShowReplayTo] = useState(false);
  const [hideDSList, setHideDSList] = useState(false);
  const [dsList, setDsList] = useState([]);
  const [setSender, setSetSender] = useState(false);
  const [setSenderBtnLoader, setSetSenderBtnLoader] = useState(false);
  const [defaultDsName, setDefaultDsName] = useState('');

  useEffect(() => {
    if (pr.moduleId) {
      setGetLoader(true);
      setDefaultDsName('');
      HTTP('get', '/settingsEmailNotifications/get/senderData/module/' + pr.moduleId + '/subModule/' + pr.subModuleId + '/section/' + (pr.selectedSectionName ? pr.selectedSectionName : '')).then(res => {
        setGetLoader(false);
        if (!res) return false;
        // console.log(res);
        setDsList(res.dsList);
        //@ If there is a data
        if (res.data) {
          //@ If there is a reply-to data then show fields
          if (res.data.reply_to_name) { setShowReplayTo(true); }//End if condition
          formRef.current.setFieldsValue(res.data);
          setHideDSList(res.data.default_ds);//Set default server list show/hide
        } else {
          //@ If there is no data
          formRef.current.setFieldsValue({ default_ds: true });//Default check default server checkbox
          setHideDSList(true);//Hide server list
          setShowReplayTo(false);//Hide reply-to
        }//End if condition
        setDefaultDsName(res.defaultDsName);
      });
    }//End if condition
  }, [pr.moduleId, pr.subModuleId, pr.selectedSectionName]);

  const submitForm = (values) => {
    setSender ? setSetSenderBtnLoader(true) : setLoader(true);
    setTimeout(() => {
      values.module_ref_id = pr.moduleId;
      values.sub_module_ref_id = pr.subModuleId;
      values.section_ref_name = pr.selectedSectionName;
      HTTP('post', '/settingsEmailNotifications/post/', values).then(res => {
        setLoader(false);
        setSetSenderBtnLoader(false);
        if (!res) return false;
        // console.log(res);
        formRef.current.setFieldsValue({ id: res.id });
        message.config({ duration: 5, maxCount: 3, });
        if (setSender) {
          pr.showSenderForm();
        }//End if condition
      });
    }, 100);
  }//End function

  return (
    <React.Fragment>
      {/* <HeadingSection selectedModule={pr.selectedModule} step={1} showSenderForm={pr.showSenderForm} /> */}
      <ScreenLoader active={getLoader}>
        <Form className="form-style-1 form-container" ref={formRef} layout="vertical" onFinish={submitForm} autoComplete="off">
          <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
          <Row gutter={window.rowGutter}>
            <Col lg={24} md={24} sm={24} xs={24}>
              <div className="form-field">
                <label>
                  <div className="main-label fs-18 fw-500">Write A Subject Line</div>
                  <span>The subject line to send with email</span>
                </label>
                <div className="field">
                  <AntInput name="subject" placeholder="Please type Email Subject here..." />
                </div>
              </div>
            </Col>
            <Col lg={24} md={24} sm={24} xs={24}>
              <div className="form-field">
                <label>
                  <div className="main-label">Who is it from?</div>
                  <span>This will display in the From field.
                    You can use
                    {!showReplayTo && <span>&nbsp;<button type="button" className="btnToLink link-color" onClick={() => setShowReplayTo(true)}>a different reply-to address</button>&nbsp;and</span>}
                    &nbsp;personalized From details
                  </span>
                </label>
                <div className="field">
                  <Row gutter={window.rowGutterSmall}>
                    <Col lg={12} md={24} sm={24} xs={24}>
                      <AntInput name="from_name" placeholder="Type from name" autoComplete='off' className="mar-bot-mob" />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                      <AntInput name="from_email" placeholder="Type from email" autoComplete='off' />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            {showReplayTo &&
              <Col lg={24} md={24} sm={24} xs={24}>
                <div className="form-field">
                  <label>
                    <div className="main-label">Replies should be sent to</div>
                    <span>Enter a valid email address that replies will be sent to. </span>
                    <button type="button" className="btnToLink link-color" onClick={() => setShowReplayTo(false)}>Reply-to is same as from details</button>
                  </label>
                  <div className="field">
                    <Row gutter={window.rowGutterSmall}>
                      <Col lg={12} md={24} sm={24} xs={24}>
                        <AntInput name="reply_to_name" placeholder="Type reply-to name" autoComplete='off' className="mar-bot-mob" />
                      </Col>
                      <Col lg={12} md={24} sm={24} xs={24}>
                        <AntInput type="email" name="reply_to_email" placeholder="Type reply-to email" autoComplete='off' />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            }
          </Row>
          <div className="form-field">
            <AntInput type="checkbox" name="default_ds" text={`Use Default SMTP Delivery Server for sending emails${hideDSList ? '  - Default DS ' + defaultDsName : ':'}`}
              onChange={() => setHideDSList(!hideDSList)} noRequired={true} />
            <p className="help">If checked, the Default SMTP Delivery Server will be used to send emails, ignoring other servers set for other users.</p>
          </div>
          {!hideDSList &&
            <div className="form-field separate-field">
              <label>
                <div className="main-label fs-18 fw-500">Write A Subject Line</div>
                <span>The subject line to send with email</span>
              </label>
              <div className="field">
                <AntInput type="select" name="ds_ref_id" filter={true} options={dsList} />
              </div>
            </div>
          }
          <div className="form-field">
            <AntInput type="checkbox" name="force_from_sender" text="Force From Name and Email" noRequired={true} />
            <p className="help">If checked, the From Name and Email setting above will be used for all emails, ignoring values set for other users.</p>
          </div>

          <hr className="hr-1 m-b-15" />

          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Button ghost className="w-full mar-bot-mob" size="large" type="primary" htmlType="submit" onClick={() => setSetSender(false)} loading={loader}>Save Subject and Sender Settings</Button>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Button className="w-full" size="large" type="primary" htmlType="submit" onClick={() => setSetSender(true)} loading={setSenderBtnLoader}>Save and Next to Set Sender <i className="las la-angle-double-right pos-relative top-1 m-l-2" /></Button>
            </Col>
          </Row>

        </Form>
      </ScreenLoader>
    </React.Fragment>
  )//End return
}//End function

export default SubjectAndSenderForm;