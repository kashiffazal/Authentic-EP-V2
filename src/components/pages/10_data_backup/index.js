import React, { Component } from 'react';
import { Button, Tabs, Modal, Form, Progress } from 'antd';
import Fade from 'react-reveal/Fade';
import PageTitle from '../mutual/pageTitle';
import { AccessControl, HTTP } from '../../services';
import UploadFile from '../../externalComponents/antd-upload-file-component';
import { AntInput } from '../../externalComponents/antd-fields';

import BackupLog from './partial/backupLog';
import UploadLog from './partial/uploadLog';
import RestoreLog from './partial/restoreLog';
import DeleteLog from './partial/deleteLog';
import './styles.less';

const { TabPane } = Tabs;

class ImportBackup extends Component {
  state = {
    loader: false,
    showExportBackupModal: false,
    newData: [],
    newUpload: [],
    newDataForDelete: {},
    showUploadModal: false,
    uploadProgress: 0,
    uploadLoader: false,
    statusList: {}
  }//End state

  formRef = React.createRef();
  formRefExport = React.createRef();

  exportBackup = (values) => {
    this.setState({ loader: true });
    HTTP('post', '/dataBackup/post/export/se/ig', values).then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      this.setState({ newData: res.data, showExportBackupModal: false });
    });
  }//End function

  uploadBackupFile = (values) => {
    this.setState({ uploadLoader: true });
    HTTP('post', '/dataBackup/post/upload/', values, false, false, this.setUploadProgress).then(res => {
      this.setState({ uploadLoader: false });
      if (!res) return false;
      this.setState({ newUpload: res.data, showUploadModal: false, uploadProgress: 0 })
    });
  }//End function

  setUploadProgress = (e, a) => {
    this.setState({ uploadProgress: e });
    // console.log(e, a);
  }//End function

  setStatusData = (status, type) => {
    return this.state.statusList[status] ? this.state.statusList[status][type] : '';
    // console.log(this.state.statusList[status]);
  }//End function

  render() {
    const st = this.state;
    return (
      <div className="backup-container">
        <PageTitle
          titleIcon="las la-cloud-upload-alt"
          titleSpan="Data"
          titleHeading="Backup"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { icon: 'database', label: 'DB Backup' },
            { iconLas: 'las la-cloud-upload-alt', label: 'Data Backup' }
          ]}
          render={
            AccessControl(152) && <Button type="primary" className="backup-btn" onClick={() => this.setState({ showExportBackupModal: true })} loading={st.loader}><i className="lab la-cloudversify pos-relative top-2 fs-24" /> &nbsp; Backup Now</Button>
          }
        />
        <div className={window.webviewMobile ? '' : 'container'}>
          <Tabs type="card" defaultActiveKey="1" tabBarExtraContent={
            AccessControl(153) &&
            <Button type="link" onClick={() => this.setState({ showUploadModal: true })}>
              <i className="las la-upload fs-16 pos-relative top-1" /> &nbsp;Upload Backup
            </Button>
          }>
            {AccessControl(154) &&
              <TabPane tab={<span><i className={this.setStatusData('export', 'icon')} style={{ color: this.setStatusData('export', 'color') }} /> {this.setStatusData('export', 'name')}</span>} key="1">
                <BackupLog newData={st.newData} newDataForDelete={(e) => this.setState({ newDataForDelete: e })} setStatusList={(e) => this.setState({ statusList: e })} />
              </TabPane>
            }
            {AccessControl(158) &&
              <TabPane tab={<span><i className={this.setStatusData('upload', 'icon')} style={{ color: this.setStatusData('upload', 'color') }} /> {this.setStatusData('upload', 'name')}</span>} key="2">
                <UploadLog newData={st.newUpload} newDataForDelete={(e) => this.setState({ newDataForDelete: e })} setStatusList={(e) => this.setState({ statusList: e })} />
              </TabPane>
            }
            {AccessControl(162) &&
              <TabPane tab={<span><i className={this.setStatusData('import', 'icon')} style={{ color: this.setStatusData('import', 'color') }} /> {this.setStatusData('import', 'name')}</span>} key="3">
                <RestoreLog setStatusList={(e) => this.setState({ statusList: e })} />
              </TabPane>
            }
            {AccessControl(163) &&
              <TabPane tab={<span><i className={this.setStatusData('deleted', 'icon')} style={{ color: this.setStatusData('deleted', 'color') }} /> {this.setStatusData('deleted', 'name')}</span>} key="4">
                <DeleteLog newData={st.newDataForDelete} setStatusList={(e) => this.setState({ statusList: e })} />
              </TabPane>
            }
          </Tabs>
          <Modal
            className="hide-header"
            footer={null}
            visible={st.showUploadModal}
            onCancel={() => this.setState({ showUploadModal: false })}
            width={520}
            maskClosable={false}
            keyboard={false}//Esc button will not work
            destroyOnClose={true}>
            <Form className="form form-style-1" autofill="false" ref={this.formRef} layout="vertical" onFinish={this.uploadBackupFile}>
              <button type="button" className="hide-header-close-btn btnToLink" disabled={st.uploadLoader} onClick={() => this.setState({ showUploadModal: false, holdRestoreParams: {} })}><i className="las la-times" /></button>
              <UploadFile
                formProps={this.formRef.current}
                name="upload-backup"
                title={'Click to Upload or, drag and drop the Backup File'}
                accept={'.zip'}
                restrictExtension={'zip'}
                fileSize={'2048'}
                disabled={st.uploadLoader}
              />
              <p><strong>Note:</strong> This dialog is just to upload a backup file, <strong>NOT</strong> for restoring, After uploading you have to restore it by clicking <strong>Restore Link</strong> from <strong>Uploads Log</strong>.</p>
              <Fade collapse when={st.uploadLoader}>
                <div className="backup-upload-modal-container">
                  <div>Uploading Backup File {st.uploadProgress}%</div>
                  <Progress strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={st.uploadProgress} status="active" />
                </div>
              </Fade>
              <Button htmlType="submit" type="primary" className="w-full" loading={st.uploadLoader}>Upload Backup File</Button>
            </Form>
          </Modal>

          <Modal
            className="hide-header"
            footer={null}
            visible={st.showExportBackupModal}
            onCancel={() => this.setState({ showExportBackupModal: false })}
            width={320}
            maskClosable={false}
            keyboard={false}//Esc button will not work
            destroyOnClose={true}>
            <Form className="form form-style-1" autofill="false" ref={this.formRefExport} layout="vertical" onFinish={this.exportBackup}>
              <button type="button" className="hide-header-close-btn btnToLink" disabled={st.loader} onClick={() => this.setState({ showExportBackupModal: false })}><i className="las la-times" /></button>
              <AntInput label="Backup Title" placeholder="Please type backup title" name="backup_title" />
              <Button htmlType="submit" size="large" type="primary" className="w-full" loading={st.loader}>Backup Now</Button>
            </Form>
          </Modal>

        </div>
      </div>
    )//End Return statement
  }//end End Render
}//End class

export default ImportBackup;