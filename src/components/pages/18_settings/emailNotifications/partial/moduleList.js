import React from 'react';
import { Menu } from 'antd';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import { AccessControl } from '../../../../services';

const ModuleList = (pr) => {
  return (
    <div>
      <div className='container module-list-container'>
        <div className="heading">Modules</div>
        <ScreenLoader active={pr.getLoader}>
          {pr.getLoader && <div className="h-365" />}
          <Menu>
            {pr.data.moduleList && pr.data.moduleList.map(item => {

              if (item.id === '1' && !AccessControl(169)) { return false; }// Support Worker
              if (item.id === '2' && !AccessControl(172)) { return false; }// Participant Referral
              if (item.id === '3' && !AccessControl(175)) { return false; }// Client Appointment
              if (item.id === '4' && !AccessControl(178)) { return false; }// Internal Incident
              if (item.id === '5' && !AccessControl(181)) { return false; }// Service Plaining
              if (item.id === '6' && !AccessControl(182)) { return false; }// User Management

              return (
                item.subList ?
                  <Menu.SubMenu key={item.key} title={
                    <div className="menu-label">
                      <i className={`${item.icon} icon`} />
                      <div>
                        <span className="main">{item.module}</span>
                        {item.label && <span className="label">{item.label}</span>}
                      </div>
                    </div>
                  }>
                    {item.subList.map(it => {

                      if (it.module_ref_id === '1' && it.id === '1' && !AccessControl(170)) { return false } // Support Worker | On Form Submit
                      if (it.module_ref_id === '1' && it.id === '2' && !AccessControl(171)) { return false } // Support Worker | On Change Status
                      if (it.module_ref_id === '2' && it.id === '3' && !AccessControl(173)) { return false } // Participant Referral | On Form Submit
                      if (it.module_ref_id === '2' && it.id === '4' && !AccessControl(174)) { return false } // Participant Referral | On Change Status
                      if (it.module_ref_id === '3' && it.id === '5' && !AccessControl(176)) { return false } // Client Appointment | On Form Submit
                      if (it.module_ref_id === '3' && it.id === '6' && !AccessControl(177)) { return false } // Client Appointment | On Change Status
                      if (it.module_ref_id === '4' && it.id === '7' && !AccessControl(179)) { return false } // Internal Incident | On Form Submit
                      if (it.module_ref_id === '4' && it.id === '8' && !AccessControl(180)) { return false } // Internal Incident | On Change Status

                      return (
                        <Menu.Item key={item.key + '-' + it.key} onClick={() => pr.selectedModule({ ...item, selectedSubMenu: it })}>
                          <i className={`${it.icon} sub-icon`} /> {it.sub_module}
                        </Menu.Item>
                      )
                    })}
                  </Menu.SubMenu>
                  :
                  <Menu.Item key={item.key} onClick={() => pr.selectedModule({ ...item })}>
                    <div className="menu-label">
                      <i className={`${item.icon} icon`} />
                      <div>
                        <span className="main">{item.module}</span>
                        {item.label && <span className="label">{item.label}</span>}
                      </div>
                    </div>
                  </Menu.Item>
              )
            })}
          </Menu>
        </ScreenLoader>
      </div>
    </div>
  )//End return
}//End function

export default ModuleList