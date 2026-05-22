import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Button, Divider } from 'antd';
import { AntInput } from '../../../../externalComponents/antd-fields';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import { HTTP } from '../../../../services';

const formRef = React.createRef();

const AddDeliveryServerModal = (pr) => {
  const [loader, setLoader] = useState(false);
  const [getLoader, setGetLoader] = useState(false);
  const [testEmail, setTestEmail] = useState(false);
  const [testEmailLoader, setTestEmailLoader] = useState(false)

  useEffect(() => {
    if (pr.editId) {
      // alert(pr.editId);
      setGetLoader(true);
      HTTP('get', '/settingsEmailDeliveryServers/get/index/' + pr.editId).then(res => {
        setGetLoader(false);
        if (!res) return false;
        // console.log(res);
        formRef.current.setFieldsValue(res.data);
      });
    }//End if condition
  }, [pr.editId])

  const submitForm = (values) => {
    if (testEmail) {
      sendTestEmail(values)
    } else {
      setLoader(true);
      HTTP('post', '/settingsEmailDeliveryServers/post/', values).then(res => {
        setLoader(false);
        if (!res) return false;
        // console.log(formRef);
        formRef.current.resetFields();
        if (values.id) {
          pr.updateData && pr.updateData(values);
        } else {
          values.id = res.id;
          // console.log(values);
          // console.log(pr);
          pr.addData && pr.addData(values);
        }//End if condition
        onClose();
      });
    }
  }//End function

  const sendTestEmail = (values) => {
    setTestEmailLoader(true);
    HTTP('post', '/settingsEmailDeliveryServers/post/testEmail/', values).then(res => {
      setTestEmailLoader(false);
      if (!res) return false;
      // alert('Send Success');
    });
  }//End function

  const onClose = () => {
    pr.onClose();
    setTestEmail(false);
  }//End function

  const showTestEmailFields = () => {
    setTestEmail(true)
    let testEmailData = window.userData.st.dst.settings.testEmailSend;
    if(!formRef.current.getFieldValue('test_sender_email')){
      formRef.current.setFieldsValue({
        'test_sender_name' : testEmailData.senderName,
        'test_sender_email' : testEmailData.senderEmail,
        'test_send_to' : testEmailData.receiverEmail
      });
    }//End if condition
  }//End function

  return (
    <Modal
      width={540}
      maskClosable={false}
      className="hide-header hide-footer"
      centered={true}
      visible={pr.show}
      onCancel={() => onClose()}
      destroyOnClose={true}
    >
      <button type="button" className="hide-header-close-btn btnToLink" onClick={() => onClose()}><i className="las la-times" /></button>
      <div className="modal-modern-title">
        <div>
          <span className="title">{pr.editId ? 'Update SMTP Delivery Server' : 'Add SMTP Delivery Server'}</span>
          <span className="sub-title">{pr.editId ? 'Update' : 'Insert new'} server details for email delivery</span>
        </div>
      </div>
      <ScreenLoader active={getLoader}>
        <Form className="form-style-1" ref={formRef} layout="vertical" onFinish={submitForm} autoComplete="off">
          <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
          <Row gutter={window.rowGutter}>
            <Col lg={24} md={24} sm={24} xs={24}>
              <AntInput label="Server Name" name="name" placeholder="Server name e.g. G Suite,yandex etc" />
            </Col>
            <Col lg={24} md={24} sm={24} xs={24}>
              <AntInput label="Host" name="host" placeholder="Server name e.g. smtp.gmail.com" />
            </Col>
            <Col lg={12} md={12} sm={24} xs={12}>
              <AntInput label="Username" name="username" placeholder="Please type email username" autoComplete='off' />
            </Col>
            <Col lg={12} md={12} sm={24} xs={12}>
              <AntInput label="Password" name="password" type="password" placeholder="Please type email password" autoComplete='new-password' />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <AntInput label="Port Number" name="port" type="number" step={0} className="hide-arrow" placeholder="Please type port number" />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <AntInput label="SMTP Secure" type="select" name="smtp_secure" options={[
                { label: 'SSL', value: 'ssl', key: 1 },
                { label: 'TLS', value: 'tls', key: 2 }]}
                filter={true} />
            </Col>
            {/* <Col lg={24} md={24} sm={24} xs={24}>
              <AntInput label="Description" name="description" placeholder="Please type some details" noRequired={true} />
            </Col> */}
            {testEmail &&
              <>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Divider orientation="left" className="m-b-10-imp m-t-7-imp"><strong>Test Email</strong></Divider>
                </Col>
                <Col lg={12} md={12} sm={24} xs={12}>
                  <AntInput label="Sender/From Name" name="test_sender_name" placeholder="Please type sender name" autoComplete='off' />
                </Col>
                <Col lg={12} md={12} sm={24} xs={12}>
                  <AntInput label="Sender/From Email" name="test_sender_email" type="email" placeholder="Please type email address" autoComplete='off' />
                </Col>
                <Col lg={12} md={12} sm={24} xs={12}>
                  <AntInput label="Send To" name="test_send_to" type="email" placeholder="Please type email address" autoComplete='off' />
                </Col>
                <Col lg={12} md={12} sm={24} xs={12}>
                  <div className="flex-sb-m">
                    <Button size="large" type="primary" htmlType="submit" className="w-48-per field-side-btn" loading={testEmailLoader}>
                      {testEmailLoader ? 'Sending' : 'Send Email'}
                    </Button>
                    <Button ghost size="large" type="primary" htmlType="button" className="w-48-per field-side-btn" onClick={() => setTestEmail(false)}>
                      Skip Testing
                    </Button>
                  </div>
                </Col>
              </>
            }
          </Row>

          {!testEmail &&
            <>
              <hr className="hr-1 m-b-20" />
              <div className="flex-r-m">
                <Button ghost size="large" type="primary" htmlType="button" onClick={() => showTestEmailFields()}>
                  Send Test Email
                </Button>
                <Button size="large" type="primary" htmlType="submit" className="m-l-10" loading={loader} >
                  {(pr.editId && pr.editId) ? 'Update' : 'Add'} Server Details
                </Button>
              </div>
            </>
          }

        </Form>
      </ScreenLoader>
    </Modal>
  )//End return
}//End function
export default AddDeliveryServerModal;