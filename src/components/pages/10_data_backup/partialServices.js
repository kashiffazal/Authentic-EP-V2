import { Modal } from 'antd';

export const BackupRestoreWarning = (onOK) => {
  Modal.confirm({
    title: <span className="fs-24 lh-1-0">WARNING</span>,
    content: <span>You must have the <strong>Latest Backup</strong> before restoring this one. Because once you restored this backup, all the current data will be <strong>Lost</strong> so be careful.</span>,
    onOk() { onOK() },
    onCancel() { },
    okText: 'Yes',
    cancelText: 'No',
  });
}//End function