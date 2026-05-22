import React, { Component } from 'react';
import { Modal, Form, Row, Col, Button, Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import { UpCircleOutlined } from '@ant-design/icons';
import { HTTP, GetObjectFromArr } from '../../../services';
import { AntInput } from '../../../externalComponents/antd-fields';
import { GetCurrentDate, GetCurrentTime, AccessControl } from '../../../services';
import ScreenLoader from '../../../externalComponents/screen-loader';
import $ from 'jquery';


import './styles.less';

class AddNoteModal extends Component {
  state = {
    getLoader: false,
    postLoader: false,
    chatBoxLoader: false,
    selectedClientId: '',
    disableClientField: false,
    data: [],
    chatData: [],
  }

  formRef = React.createRef();

  getChat = (clientId) => {
    if (!clientId) { this.setState({ chatData: [] }); return false; }
    this.setState({ chatBoxLoader: true });
    HTTP('get', '/clientNote/get/chatBoxData/' + clientId).then(res => {
      this.setState({ chatBoxLoader: false });
      if (!res) return false;
      this.setState({ chatData: res.data }, () => this.scrollBottom());
    });
  }//End if condition

  submitForm = (values) => {
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    // if (err) { return false }//End if condition
    this.setState({ postLoader: true });
    HTTP('post', '/clientNote/post/', values).then(res => {
      this.setState({ postLoader: false });
      if (!res) return false;
      res.userData.inserted_by_date = GetCurrentDate() + ', ' + GetCurrentTime();
      let chatData = this.state.chatData;
      chatData.push(res.userData);
      this.setState({ chatData });
      this.formRef.current.setFieldsValue({ note: '' });
      this.scrollBottom();
      //Add count or insert new record in log
      values.client_name = GetObjectFromArr(values.client_ref_id, 'id', this.state.data).name;
      values.id = values.client_ref_id;
      this.props.addCount && this.props.addCount(values);
    });
    // });
  }//End function

  scrollBottom = () => {
    $("#div1").animate({ scrollTop: $('#div1').prop("scrollHeight") }, 1000);
  }//End function

  typeForTextAreaHeight = () => {
    const textarea = document.getElementById("note");

    textarea.addEventListener("input", function (e) {
      let height = this.scrollHeight;
      if (height === 56 || height === 36) { height = 38; }
      this.style.height = "auto";
      this.style.height = height + "px";
    });
  }//End funcion

  render() {
    const pr = this.props;
    // const fp = this.props.form;
    const st = this.state;
    const selectedClientName = st.selectedClientId ? ' | ' + GetObjectFromArr(st.selectedClientId, 'id', this.state.data).name : '';
    return (
      <div>
        {pr.children}
        <Modal
          width={740}
          maskClosable={false}
          className="hide-footer client-note-container"
          centered={true}
          // title={'Client Status Note' + selectedClientName}
          visible={pr.show}
          onCancel={() => pr.onClose()}
        >
          <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
          <div className="modal-modern-title">
            <div>
              <span className="title">{'Client Status Note' + selectedClientName}</span>
              <span className="sub-title">Add New Status Note</span>
            </div>
          </div>

          <div className="chat-box" id="div1">
            <ScreenLoader inline={true} active={st.chatBoxLoader}>
              {(!(st.chatData.length > 0) && (st.selectedClientId)) && 'No note available yet!'}
              {!st.selectedClientId && 'Please select any client from list to view or add Note.'}
              {st.chatData.map((item, i) => {
                return (
                  <div key={i} className="chat-msg">
                    <div>
                      <div className="profile-img">
                        <Avatar size="large" src={item.img} style={{ background: item.slug_color }}>{item.nameSlug}</Avatar>
                      </div>
                    </div>
                    <div className="msg arrow_box">
                      <span className="fs-12px fw-500 hidden-lg hidden-md" style={{ color: item.slug_color }}>{item.name}</span>
                      <span className="textbox-value">{item.note}</span>
                      <span className="hidden-sm hidden-xs"><span className="messenger-name">{item.name},</span> <span className="message-time">{item.inserted_date}, {item.inserted_time}</span></span>
                      <div className="message-time hidden-lg hidden-md">{item.inserted_date}, {item.inserted_time}</div>
                    </div>
                  </div>
                )
              })}
            </ScreenLoader>
          </div>

          <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
            {AccessControl(28) &&
              <Row gutter={window.rowGutterSmall}>
                <Col lg={7} md={7} sm={24} xs={24}>
                  <AntInput type="select" name="client_ref_id" options={st.data} setValueLabel={['id', 'name']} filter={true} loading={st.getLoader} onChange={(e) => {
                    this.getChat(e);
                    this.setState({ selectedClientId: e });
                  }}
                    disabled={st.disableClientField}
                  />
                </Col>
                <Col lg={15} md={15} sm={24} xs={24}>
                  <AntInput type="textarea" name="note" className="text-message" placeholder="Type come note here" onChange={() => this.typeForTextAreaHeight()} />
                </Col>
                <Col lg={2} md={2} sm={24} xs={24}>
                  <Button size="large" type="primary" htmlType="submit" className="w-full send-btn" loading={st.postLoader}><UpCircleOutlined /></Button>
                </Col>
              </Row>}
          </Form>
        </Modal>
      </div>
    )//End return
  }//End render

  componentDidUpdate(prevProps) {
    if ((prevProps.show !== this.props.show) && this.state.data.length === 0) {
      this.setState({ getLoader: true });
      HTTP('get', '/clientNote/get/getModalData/').then(res => {
        this.setState({ getLoader: false });
        if (!res) return false;
        //console.log(res)
        this.setState({ data: res.data });
      });
    }//end if condition

    if (prevProps.clientId !== this.props.clientId) {
      // console.log(this.props.clientId)
      if (this.props.clientId) {
        setTimeout(() => { this.formRef.current.setFieldsValue({ client_ref_id: this.props.clientId }); }, 100)
        this.getChat(this.props.clientId);
        this.setState({ disableClientField: true, selectedClientId: this.props.clientId });
      } else {
        this.setState({ disableClientField: false, selectedClientId: '', chatData: [] });
        this.formRef.current.setFieldsValue({ client_ref_id: '' });
      }//End if condition
    }//End if condition
  }//End componentDidUpdate


}//End class
export default AddNoteModal;