import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
// import CKEditorClassis from '../../../externalComponents/ckEditor';
import ModuleList from './partial/moduleList';
import SubjectSenderAndReceiver from './partial/subjectSenderAndReceiver';
import DeliveryServerSideWidget from '../emailDeliveryServers/partial/sideWidget';
import { HTTP } from '../../../services';
import '../styles.less';

const EmailNotifications = () => {
  const [getLoader, setGetLoader] = useState(false);
  const [data, setData] = useState({});
  const [selectedModule, setSelectedModule] = useState({});
  const [selectedModuleSections, setSelectedModuleSections] = useState([])

  useEffect(() => {
    //@Get Module List Data from DB
    setGetLoader(true);
    HTTP('get', '/settingsEmailNotifications/get/moduleList/').then(res => {
      setGetLoader(false);
      if (!res) return false;
      setData(res.data);
    });
  }, []);

  //@Set Sections like Admin and SW for separate email set
  const SetSections = (e) => {
    setSelectedModule(e);
    let sections = (e.sections ? e.sections : (e.selectedSubMenu.sections ? e.selectedSubMenu.sections : []));
    setSelectedModuleSections(sections);
  }//End function

  //@ Setting Tags into variable
  const tags = ((selectedModule.selectedSubMenu && selectedModule.selectedSubMenu.tags) ? selectedModule.selectedSubMenu.tags : selectedModule.tags);
  // console.log(tags);
  return (
    <div className="setting-container">
      <div className="notification-container">
        <Row gutter={window.rowGutterSmall}>
          <Col lg={5} md={8} sm={24} xs={24}>
            <ModuleList data={data} getLoader={getLoader} selectedModule={(e) => SetSections(e)} />
          </Col>
          <Col lg={14} md={16} sm={24} xs={24}>
            <SubjectSenderAndReceiver getLoader={getLoader} selectedModule={selectedModule} sections={selectedModuleSections} />
          </Col>
          <Col lg={5} md={24} sm={24} xs={24}>
            <DeliveryServerSideWidget showSectionByArr={[2, 3]} selectedModuleTags={tags} />
          </Col>
        </Row>
      </div>
    </div>
  )//End return

}//End function
export default EmailNotifications;