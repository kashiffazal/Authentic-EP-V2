import React, { useState, useEffect } from 'react';
import { Empty } from 'antd';
import SubjectAndSenderForm from './subjectSenderAndReceiverPartial/subjectAndSenderForm';
import ReceiverForm from './subjectSenderAndReceiverPartial/receiverForm';
import TemplateList from './subjectSenderAndReceiverPartial/templateList';
import TemplateEditor from './subjectSenderAndReceiverPartial/templateEditor';
import HeadingSection from './subjectSenderAndReceiverPartial/headingSection';

const SubjectSenderAndReceiver = (pr) => {
  const [sectionType, setSectionType] = useState('senderForm');
  const [templateId, setTemplateId] = useState('');
  const [selectedSection, setSelectedSection] = useState({});

  useEffect(() => {
    ResetForm();
    //@If there are a section then select first by default
    if (pr.sections.length > 0) { setSelectedSection(pr.sections[0]); }
  }, [pr.selectedModule, pr.sections])

  const ResetForm = () => {
    setSectionType('senderForm');
    setTemplateId('');
    setSelectedSection({});
  }//End function

  const SetSectionName = (item) => {
    ResetForm();
    setSelectedSection(item);
  }//End function


  // console.log(pr.sections)
  // //?Selected Sub Menu
  const ssm = pr.selectedModule.selectedSubMenu ? pr.selectedModule.selectedSubMenu : {};
  return (
    <React.Fragment>
      <div className="container">
        {/*//@ Heading with steps point*/}
        {pr.selectedModule.id && <HeadingSection selectedModule={pr.selectedModule} templateId={templateId} selectedSectionLabel={selectedSection.label} step={
          ((sectionType === 'senderForm') ? 1 :
            (sectionType === 'receiverForm') ? 2 :
              (sectionType === 'templateList') ? 3 :
                (sectionType === 'templateEditor') ? 4 : '')
        } />}

        {/*//@ Sections separation here*/}
        {pr.sections.length > 0 && <div className="section-container">
          {pr.sections.map(item => {
            return (<button className="btnToLink link-color" key={item.key} onClick={() => SetSectionName(item)}>{item.label}</button>)//End return
          })}
        </div>}

        {/*//@ Main Forms start from here*/}
        {pr.selectedModule.id ?
          (sectionType === 'senderForm' ?
            <SubjectAndSenderForm showSenderForm={() => setSectionType('receiverForm')} selectedModule={pr.selectedModule} moduleId={pr.selectedModule.id} subModuleId={ssm.id ? ssm.id : ''} selectedSectionName={selectedSection.name} />
            : ((sectionType === 'receiverForm' ?
              <ReceiverForm showTemplateList={() => setSectionType('templateList')} showSenderForm={() => setSectionType('senderForm')} selectedModule={pr.selectedModule} moduleId={pr.selectedModule.id} subModuleId={ssm.id ? ssm.id : ''} selectedSectionName={selectedSection.name} />
              : sectionType === 'templateList' ?
                <TemplateList showReceiverForm={() => setSectionType('receiverForm')} showTemplateEditor={(e) => { setSectionType('templateEditor'); setTemplateId(e ? e : '') }} selectedModule={pr.selectedModule} moduleId={pr.selectedModule.id} subModuleId={ssm.id ? ssm.id : ''} selectedSectionName={selectedSection.name} /> :
                (sectionType === 'templateEditor' ?
                  <TemplateEditor showTemplateList={() => setSectionType('templateList')} templateId={templateId} selectedModule={pr.selectedModule} moduleId={pr.selectedModule.id} subModuleId={ssm.id ? ssm.id : ''} selectedSectionName={selectedSection.name} /> : ''))))
          :
          <div className="flex-c-m h-371">
            <Empty description={
              <div>
                <p className="m-0 dim-color">Select Module from Left module list to</p>
                <p className="fs-18 dim-color">Define the subject and sender details</p>
              </div>
            } />
          </div>
        }
      </div>
    </React.Fragment>
  )//End return
}//End function

export default SubjectSenderAndReceiver;