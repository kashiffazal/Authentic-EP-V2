import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Tooltip, Popconfirm, Alert, Modal, Form } from 'antd';
// import HeadingSection from './headingSection';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import ScreenLoader from '../../../../../externalComponents/screen-loader';
import { HTTP, DeleteRowFromList } from '../../../../../services';
import DataTable from '../../../../../externalComponents/andt-data-table-component';
import ViewTemplateModal from './viewTemplateModal';

const formRef = React.createRef();

const TemplateList = (pr) => {
  const [getLoader, setGetLoader] = useState(false);
  const [data, setData] = useState([]);
  const [defaultLoader, setDefaultLoader] = useState({});
  const [sendTestLoader, setSendTestLoader] = useState(false);
  const [sendTestConfirmModal, setSendTestConfirmModal] = useState(false);
  const [sendTestConfirmData, setSendTestConfirmData] = useState({});
  const [viewTemplate, setViewTemplate] = useState(false);
  const [viewTemplateData, setViewTemplateData] = useState({});
  const [deleteLoader, setDeleteLoader] = useState({});

  useEffect(() => {
    setGetLoader(true);
    HTTP('get', '/settingsEmailNotifications/get/getTemplateList/module/' + pr.moduleId + '/subModule/' + pr.subModuleId + '/section/' + (pr.selectedSectionName ? pr.selectedSectionName : '')).then(res => {
      setGetLoader(false);
      if (!res) return false;
      setData(res.data);
    });
  }, [pr.moduleId, pr.subModuleId, pr.selectedSectionName]);

  const showTestEmailPopup = (row) => {
    setSendTestConfirmData(row);
    setSendTestConfirmModal(true);
    setTimeout(() => { formRef.current.setFieldsValue({ 'test_send_to': window.userData.st.dst.settings.testEmailSend.receiverEmail }); }, 100);
  }//End function

  const sendTestEmail = (value) => {
    setSendTestLoader(true);
    HTTP('post', '/settingsEmailNotifications/post/sendTestEmail', { templateId: sendTestConfirmData.id, moduleId: pr.moduleId, subModule: pr.subModuleId, section: pr.selectedSectionName, receiverEmail: value.test_send_to }).then(res => {
      setSendTestLoader(false);
      if (!res) return false;
      setSendTestConfirmModal(false);
    });
  }//End function

  const makeDefaultTemplate = (row) => {
    defaultLoader[row.id] = true;
    setDefaultLoader({ ...defaultLoader });
    HTTP('post', '/settingsEmailNotifications/post/makeDefaultTemplate', { id: row.id, moduleId: pr.moduleId, subModule: pr.subModuleId, section: pr.selectedSectionName }).then(res => {
      defaultLoader[row.id] = false;
      setDefaultLoader({ ...defaultLoader });
      if (!res) return false;
      //@ Updating Status on Front-End
      let dt = [...data];
      let newData = [];
      dt.forEach(el => {
        el['default_status'] = '';
        if (el.id === row.id) { el['default_status'] = 'true'; }
        newData.push(el);
      });
      setData(newData);
    });
  }//End function

  const deleteTemplate = (row) => {
    // let loader = {};
    deleteLoader[row.id] = true;
    setDeleteLoader({ ...deleteLoader });
    HTTP('post', '/settingsEmailNotifications/post/deleteTemplate/', { id: row.id }).then(res => {
      deleteLoader[row.id] = false;
      setDeleteLoader({ ...deleteLoader });
      if (!res) return false;
      setData(DeleteRowFromList(data, row.id));
    });
  }//End function

  return (
    <div className="template-list-container">
      {/* <HeadingSection selectedModule={pr.selectedModule} step={3} showTemplateEditor={pr.showTemplateEditor} /> */}
      <Alert
      className="template-info-label"
        message={
          <Row gutter={window.rowGutter}>
            <Col lg={17} md={24} sm={17} xs={24}>
              <div className="label">Please select template from given list or create new Template</div>
            </Col>
            <Col lg={7} md={24} sm={7} xs={24}>
              <Button className="full-w-btn" type="primary" ghost style={{ background: '#fff' }} onClick={() => pr.showTemplateEditor()}>Create New Template</Button>
            </Col>
          </Row>
        }
        type="info" showIcon
      />

      <ScreenLoader active={getLoader}>
        <DataTable
          columns={[{
            title: 'Template Title',
            dataIndex: 'title',
            width: '77%',
            sorter: (a, b) => a.form_no.localeCompare(b.form_no),
            render: (a, row) =>
              <div className="flex-m">
                <div className="m-r-10">
                  {row.default_status === 'true' ?
                    <Tooltip title="Default Template" color={'#48a64f'} placement="left">
                      <i className="las la-check-circle fs-26 success-color" />
                    </Tooltip>
                    :
                    <ScreenLoader active={defaultLoader[row.id]} emptyLabel={true} inline={true}>
                      <Tooltip title="Click to make it default template" color={'#1286e5'} placement="left">
                        <Popconfirm
                          title={'Are you sure to make it default'}
                          onConfirm={() => makeDefaultTemplate(row)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <button className="btnToLink"><i className="las la-check-circle fs-26 lite-color" /></button>
                        </Popconfirm>
                      </Tooltip>
                    </ScreenLoader>
                  }
                </div>
                <div>
                  <div className="title">{a}</div>
                  <em className="dim-color">{row.inserted_by} - {row.inserted_date}</em>
                </div>
              </div>
          }, {
            title: 'Action',
            align: 'center',
            width: '23%',
            render: (record, row) =>
              <ScreenLoader inline={true} active={deleteLoader[row.id] || sendTestLoader[row.id]} tip='Loading'>
                <div className="text-center">
                  <Tooltip title="Send Test Email" placement="left">
                    <button className="btnToLink" onClick={() => showTestEmailPopup(row)}><i className="fs-18 las la-paper-plane link-color" /></button>
                  </Tooltip>
                  <i className="list_view_icon_sap las la-redo" />
                  <Tooltip title="View" placement="top">
                    <button className="btnToLink" onClick={() => { setViewTemplate(true); setViewTemplateData(row) }}><i className="fs-18 las la-table link-color" /></button>
                  </Tooltip>
                  <i className="list_view_icon_sap las la-redo" />
                  <Tooltip title="Edit" placement="top">
                    <button className="btnToLink" onClick={() => pr.showTemplateEditor(row.id)}><i className="fs-18 las la-edit link-color"></i></button>
                  </Tooltip>
                  <i className="list_view_icon_sap las la-redo" />
                  {row.default_status === 'true' ?
                    <Tooltip title="Can't delete default template" placement="right">
                      <button className="btnToLink"><i className="fs-18 las la-ban link-color" /></button>
                    </Tooltip>
                    :
                    <Tooltip title="Delete" placement="right">
                      <Popconfirm
                        title="Are you sure to delete this server?"
                        onConfirm={() => deleteTemplate(row)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                      >
                        <button className="btnToLink"><i className="fs-18 las la-times-circle link-color" /></button>
                      </Popconfirm>
                    </Tooltip>
                  }
                </div>
              </ScreenLoader>
          }]}
          styleType={2}
          dataSource={data}
          showSizeChanger={false}
          pagination={{ itemDetails: true, showOnSinglePage: true }}
        />
      </ScreenLoader>
      <ViewTemplateModal show={viewTemplate} onClose={() => setViewTemplate(false)} data={viewTemplateData} />

      {/*//@ Test Receiver Email modal */}
      <Modal
        className="hide-header"
        footer={null}
        visible={sendTestConfirmModal}
        onCancel={() => setSendTestConfirmModal(false)}
        width={450}
        maskClosable={false}
        keyboard={false}//Esc button will not work
        destroyOnClose={true}>
        <Form className="form-style-1" autofill="false" ref={formRef} layout="vertical" onFinish={sendTestEmail}>
          <button type="button" className="hide-header-close-btn btnToLink" disabled={sendTestLoader} onClick={() => setSendTestConfirmModal(false)}><i className="las la-times" /></button>
          <div className="m-b-5">Email will be sent with template named as <strong>{sendTestConfirmData.title}</strong>.</div>
          <AntInput size="small" placeholder="Please type receiver email" name="test_send_to" />
          <Button htmlType="submit" className="w-full" type="primary" loading={sendTestLoader}>Send Test</Button>
        </Form>
      </Modal>

      <Button className="pos-absolute-imp bottom-16" ghost type="primary" onClick={() => pr.showReceiverForm()} ><i className="las la-angle-double-left pos-relative top-1 m-r-2" /> Back</Button>
    </div>
  )//End return
}//End function

export default TemplateList;