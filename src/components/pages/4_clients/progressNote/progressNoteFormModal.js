import React, { Component } from 'react';
import { Form, Button, Row, Col, Modal } from 'antd';
import { AntInput } from '../../../externalComponents/antd-fields';
import { HTTP, GetObjectFromArr, GetCurrentDate, GetCurrentTime, FormatDate, SetDatePicker } from '../../../services';
// import { data } from 'jquery';

class jobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postLoader: false,
      getLoader: false,
      list: {},
    };//End state
  }//End constructor
  formRef = React.createRef();

  submitForm = (values) => {
    // e.preventDefault();
    // this.props.fp.validateFields((err, values) => {
    // if (err) { return false }//End if condition
    this.setState({ postLoader: true });
    HTTP('post', '/clientProgressNote/post/', values).then(res => {
      this.setState({ postLoader: false });
      if (!res) return false;
      this.formRef.current.resetFields();

      if (this.props.list) {
        values.date = FormatDate(values.date);
        values.name = GetObjectFromArr(values.client_ref_id, 'id', this.props.list.clientList).name
      }//End if condition
      if (values.id) {
        this.props.updateData && this.props.updateData(values);
      } else {
        if (this.props.addData) {
          values.id = res.id;
          values.inserted_by_date = GetCurrentDate() + ', ' + GetCurrentTime();
          this.props.addData(values);
        }//End if condition
      }//End if condition
      this.props.onClose();
    });
    // });
  }//End function

  getTimeList = () => {
    this.setState({ getLoader: true });
    HTTP('get', '/clientProgressNote/get/getTimeAndClientList').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      this.setState({ list: res.data }, () => {
        this.formRef.current.setFieldsValue({
          date: SetDatePicker(GetCurrentDate('DD-MM-YYYY')),
          client_ref_id: this.props.clientId
        })
      });
    });
  }//End function

  onClose = () => {
    this.props.onClose()
    setTimeout(() => {
      this.formRef.current.resetFields();
    }, 300);//@ Make Smooth reset form Close Modal
  }//End function

  render() {
    const st = this.state;
    const pr = this.props;
    // const fp = this.formRef.current;
    const list = pr.list ? pr.list : st.list;
    return (
      <Modal
        width={740}
        maskClosable={false}
        className="hide-footer"
        centered={true}
        // title={pr.data ? 'Update Progress Note' : 'Add Progress Note'}
        visible={pr.show}
        onCancel={() => this.onClose()}
      // destroyOnClose={true}
      >
        <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button>
        <div className="modal-modern-title">
          <div>
            <span className="title">{pr.data ? 'Update Progress Note' : 'Add Progress Note'}</span>
            <span className="sub-title">Progress Note Form</span>
          </div>
        </div>
        <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
          <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
          <Row gutter={window.rowGutter}>
            <Col lg={8} md={8} sm={12} xs={24}>
              <AntInput type="datepicker" disabledNextDate label="Date" name="date"
              // value={pr.data && pr.data.date}
              />
            </Col>
            <Col lg={8} md={8} sm={12} xs={24}>
              <AntInput type="select" label="Timing" name="time" options={list.timeList} filter={true} loading={st.getLoader} />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
              <AntInput type="select" label="Client Name" name="client_ref_id" options={list.clientList} setValueLabel={['id', 'name']} filter={true} loading={st.getLoader} disabled={this.props.clientId} />
            </Col>
          </Row>
          <AntInput type="textarea" label="Note" name="note" placeholder="Please type some progress note about client" />
          <hr className="hr-1" /><br />
          <div className="flex-r-m">
            <Button size="large" type="primary" htmlType="submit" loading={this.state.postLoader}>
              {(pr.data && pr.data.id) ? 'Update' : 'Add New'} Note
            </Button>
          </div>
        </Form>
      </Modal>
    );//End return
  }//End render
  componentDidUpdate(prevProps) {
    // console.log(this.props.data);
    if ((this.props.data !== prevProps.data) && this.props.data && this.props.data.id) {
      let data = this.props.data;
      //console.log(data);
      this.formRef.current.setFieldsValue({
        'id': data.id,
        'date': SetDatePicker(data.date),
        'client_ref_id': data.client_ref_id,
        'time': data.time,
        'note': data.note
      })
    }//End if condition

    if ((this.props.clientId !== prevProps.clientId) && this.props.clientId) {
      this.getTimeList();
    }//End if condition

  }//End componentDidUpdate
}//End class

export default jobForm;