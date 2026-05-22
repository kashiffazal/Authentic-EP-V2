import React, { useState, useEffect } from 'react';
// import HeadingSection from './headingSection';
import { Form, Button, message } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import ScreenLoader from '../../../../../externalComponents/screen-loader';
import { HTTP } from '../../../../../services';
import RichTextEditor from '../../../../../externalComponents/rich-text-editor';

const formRef = React.createRef();

const TemplateEditor = (pr) => {
  const [postLoader, setPostLoader] = useState(false);
  const [getLoader, setGetLoader] = useState(false);
  const [templateValue, setTemplateValue] = useState('')
  const [initialTemVal, setInitialTemVal] = useState('');

  useEffect(() => {
    if (pr.templateId) {
      setGetLoader(true);
      HTTP('get', '/settingsEmailNotifications/get/getTemplate/' + pr.templateId).then(res => {
        setGetLoader(false);
        if (!res) return false;
        formRef.current.setFieldsValue(res.data);
        setInitialTemVal(res.data.template);
        setTemplateValue(res.data.template);
      });
    }//End if condition
  }, [pr.templateId]);

  const submitForm = (values) => {
    if (!templateValue) { message.error('Please create template'); return false; }//End if condition
    values.module_ref_id = pr.moduleId;
    values.sub_module_ref_id = pr.subModuleId;
    values.section_ref_name = pr.selectedSectionName;
    values.template = templateValue;
    setPostLoader(true);
    HTTP('post', '/settingsEmailNotifications/post/crateTemplate/', values).then(res => {
      setPostLoader(false);
      if (!res) return false;
      // formRef.current.setFieldsValue({ id: res.id });
      pr.showTemplateList();
    });
  }//End function

  return (
    <React.Fragment>
      {/* <HeadingSection selectedModule={pr.selectedModule} step={4} showTemplateList={pr.showTemplateList} /> */}
      <ScreenLoader active={getLoader}>
        {getLoader ? <div className="h-530" /> :
          <Form className="form-style-1 form-container" ref={formRef} layout="vertical" onFinish={submitForm} autoComplete="off">
            <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
            <AntInput label="Template Title" name="title" placeholder="Please type template title" />
            <RichTextEditor
              height="400"
              className="m-b-10"
              // toolType={3}
              onChange={(e) => setTemplateValue(e)}
              statusbar={false}
              value={initialTemVal}
            />
            {/* <AntInput type="textarea" label="Editor" name="template" placeholder="Please create template here..." /> */}
            <div className="flex-sb-m">
              <Button className="w-49-per" ghost size="large" type="primary" htmlType="submit" onClick={() => pr.showTemplateList()}><i className="las la-angle-double-left pos-relative top-1" /> Back to Template List</Button>
              <Button className="w-49-per" size="large" type="primary" htmlType="submit" loading={postLoader}><i className="las la-check-circle fs-18 pos-relative top-1 m-r-2" />
                {pr.templateId ? 'Update' : 'Save'} Template
              </Button>
            </div>
          </Form>
        }
      </ScreenLoader>
    </React.Fragment>
  )//End return
}//End function

export default TemplateEditor