import React, { Component } from 'react';
import { Modal, Form, Button, Row, Col } from 'antd';
import { AntInput } from '../../../externalComponents/antd-fields';

class UnattendedSetTime extends Component {
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
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
          <p><strong>Note:</strong> I you want to change status for Unattended shift then you have to add Start and End time</p>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <AntInput label={`Actual Start Time : ${pr.data.start_time_actual}`} name="start_time" type="select" filter={true} options={pr.timingList} />
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <AntInput label={`Actual End Time : ${pr.data.end_time_actual}`} name="end_time" type="select" filter={true} options={pr.timingList} />
            </Col>
          </Row>
          <Button htmlType="submit" type="primary" className="w-full" loading={pr.loading}>Set Start & End Time</Button>
        </Form>
      </Modal>
    )//End return
  }//End render
}//End class
export default UnattendedSetTime;