import React, { Component } from 'react';
import { Modal, Form, Button } from 'antd';
import { AntInput } from '../../externalComponents/antd-fields';

class PasswordForRestoreModal extends Component {
  formRef = React.createRef();
  render() {
    const pr = this.props;
    return (
      <Modal
        className="hide-header"
        footer={null}
        visible={pr.show}
        onCancel={() => pr.onClose()}
        width={450}
        destroyOnClose={true}>
        <Form className="form form-style-1" autofill="false" ref={this.formRef} layout="vertical" onFinish={(e) => pr.onFinish(e)}>
          <button className="hide-header-close-btn btnToLink" onClick={() => pr.closeBtn()}><i className="las la-times" /></button>
          <p><strong>Note:</strong> If you reset your password recently please make sure you remember your old password which this backup has. Otherwise, you could face a login issue.</p>
          <p>Please insert your current password to restore backup:</p>
          <AntInput type="password" name="password" placeholder="Type you current password" />
          <Button htmlType="submit" type="primary" className="w-full" loading={pr.loading}>Restore</Button>
        </Form>
      </Modal>
    )//End return
  }//End render
}//End class
export default PasswordForRestoreModal;