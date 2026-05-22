import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import AddDeliveryServerModal from './addDeliveryServerModal';
import TagWidget from '../../emailNotifications/partial/subjectSenderAndReceiverPartial/tagsWidget';
import { AccessControl } from '../../../../services';

const DeliveryServerSideWidget = (pr) => {
  const [viewAddNewModal, setViewAddNewModal] = useState(false);
  // const showSectionArr = [1, 2, 3];
  return (
    <div className="delivery-server-widget-container">
      {AccessControl(164) &&
        <Button size="large" className="w-full" type="primary" onClick={() => setViewAddNewModal(true)}>Add SMTP Delivery Servers</Button>
      }
      <AddDeliveryServerModal show={viewAddNewModal} onClose={() => setViewAddNewModal(false)} addData={pr.addData} />
      {pr.selectedModuleTags ?
        <TagWidget tagArr={pr.selectedModuleTags} />
        :
        <>
          <div className="side_nav">
            <div className='m-b-10'><strong>You might also want to...</strong></div>
            {pr.showSectionByArr.includes(1) &&
              <div>
                <div><button className="btnToLink link-color" onClick={() => pr.history.push('/e/settings/emailNotifications')}>Set Email Notifications</button></div>
                <div className="fs-12 m-b-15">Set Templates for individual module, Enable/Disable Notifications on Behalf of User/Module, etc.</div>
              </div>
            }
            {pr.showSectionByArr.includes(2) &&
              <div>
                <div><button className="btnToLink link-color" onClick={() => pr.history.push('/e/settings/emailDeliveryServers')}>View SMTP Delivery Server List</button></div>
                <div className="fs-12 m-b-15">Add new Delivery Server, View List, Edit, Delete, Send Test Emails, etc.</div>
              </div>
            }
            {pr.showSectionByArr.includes(3) &&
              <div>
                <div><button className="btnToLink link-color" onClick={() => pr.history.push('/e/settings')}>Configure General Settings</button></div>
                <div className="fs-12">Set or Change Default Settings like Forms, Logs, Date and Time Format, etc</div>
              </div>
            }
          </div>
        </>
      }
    </div>
  )//End return
}//End function

export default withRouter(DeliveryServerSideWidget);