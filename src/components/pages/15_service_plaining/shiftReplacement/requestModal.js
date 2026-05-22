import React, { Component } from 'react';
import { Modal, Form, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { HTTP } from '../../../services';
import { AntInput } from '../../../externalComponents/antd-fields';

const { confirm } = Modal;

class ReplacementRequestModal extends Component {
  state = {
    loader: false,
    formConfirmStatus: true
  }
  formRef = React.createRef();

  formConfirm = (values) => {
    let th = this;
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to make request?',
      onOk() {
        th.setState({ formConfirmStatus: false }, () => {
          th.submitForm(values);
        })
      },
      // onCancel() {console.log('Cancel');},
      okText: 'Yes',
      cancelText: 'No'
    });
  }//End function

  submitForm = (values) => {
    // console.log(this.props);return false;
    if (this.state.formConfirmStatus) { this.formConfirm(values); return false }
    values.service_plaining_ref_id = this.props.selectedShift.id;
    values.spw_ref_id = this.props.selectedShift.spw_ref_id;
    values.spw2_ref_id = this.props.selectedShift.spw_partner_ref_id;
    values.req_for_date = this.props.selectedShift.service_date;
    values.req_for_day = this.props.selectedShift.service_day;
    values.requested_by_admin = this.props.requestByAdmin ? 'true' : 'false';
    values.requested_by = this.props.requestByAdmin ? this.props.replaceRequestFor : '';
    this.setState({ loader: true });
    HTTP('post', '/shiftReplacementRequest/post/replacementRequest', values).then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      this.props.onClose(true);//Close with reload
    });
  }//End function

  render() {
    const pr = this.props;
    const st = this.state;
    // console.log(pr.selectedShift);
    return (
      <div>
        <Modal
          width={740}
          maskClosable={false}
          className="hide-footer client-note-container"
          centered={true}
          // title="Request for Replacement"
          visible={pr.show}
          destroyOnClose={true}
          onCancel={() => pr.onClose()}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">Request for Replacement</span>
              <span className="sub-title">Explain the reason</span>
            </div>
          </div>
          <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
            <AntInput type="textarea" label="Please explain the reason, why you are requesting for replacement?" name="reason" placeholder="Type you explanation here..." />
            <Button size="large" type="primary" htmlType="submit" className="w-full send-btn" loading={st.loader}>Make Request</Button>
          </Form>
        </Modal>
      </div>
    )//End return
  }//End render
  componentDidUpdate(prevProps) {
    //Set form confirmation status as true
    if ((prevProps.selectedShift !== this.props.selectedShift)) { this.setState({ formConfirmStatus: true }); }//End if condition
  }//End componentDidMount
}//End class
export default ReplacementRequestModal;