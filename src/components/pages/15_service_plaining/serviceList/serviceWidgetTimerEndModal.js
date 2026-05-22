import React, { Component } from 'react'
import { Form, Row, Col, Button, message, Descriptions } from 'antd';
import { AntInput } from '../../../externalComponents/antd-fields';
import SignCanvas from '../../../externalComponents/sign-canvas';
import { GetCurrentTime, GetHourAndMinuteFromTowTime } from '../../../services';
import AddNodeModule from '../../4_clients/note/addNoteModal';
import ProgressNoteFormModal from '../../4_clients/progressNote/progressNoteFormModal';

class ServiceWidgetTimerEndModal extends Component {
  state = {
    staffSign: '',
    clientSign: '',
    currentTime: '',
    viewNoteModal: false,
    selectedClientIdForStatusNote: '',
    viewProgressNoteModal: false,
    selectedClientIdForProgressNote: ''
  }//End Status

  formRef = React.createRef();

  submitForm = (values) => {
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    if (!this.state.staffSign) { message.error('Please make staff signature'); return false; }//End if condition
    if (!this.state.clientSign) { message.error('Please make client signature'); return false; }//End if condition
    values.staffSign = this.state.staffSign;
    values.clientSign = this.state.clientSign;
    values.start_time = this.props.data.start_time;
    values.end_time = this.state.currentTime;
    this.props.onSubmit(values);
    // });
  }//End function

  render() {
    const pr = this.props;
    const dt = pr.data;
    const st = this.state;
    // console.log(dt);
    return (
      <React.Fragment>
        <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
          <div className="table-50">
            <Descriptions className="small-description" bordered size='small' layout="vertical" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }} >
              <Descriptions.Item label="Client Name">{dt.client_name}</Descriptions.Item>
              <Descriptions.Item label="Service Type / Activity">{dt.service_name}</Descriptions.Item>
              <Descriptions.Item label="Actual Service Time">{dt.service_date ? dt.service_date : dt.service_day} - {dt.service_start_time} to {dt.service_end_time}</Descriptions.Item>
              <Descriptions.Item label="Actual Service Hour(s)">{GetHourAndMinuteFromTowTime(dt.service_start_time, dt.service_end_time)}</Descriptions.Item>
              <Descriptions.Item label="Given Service Time">{dt.start_time} to {this.state.currentTime}</Descriptions.Item>
              <Descriptions.Item label="Given Service Hour(s)">{GetHourAndMinuteFromTowTime(dt.start_time, this.state.currentTime)}</Descriptions.Item>
              <Descriptions.Item label="Meal Break Time">{dt.meal_break_min ? dt.meal_break_min + ' (min)' : '-'}</Descriptions.Item>
              <Descriptions.Item label="Rest Break Time">{dt.rest_break_min ? dt.rest_break_min + ' (min)' : '-'}</Descriptions.Item>
            </Descriptions>
          </div>

          {/* {JSON.stringify(dt)} */}
          <hr className="hr-1 m-t-25 m-b-25" />
          <Row gutter={window.rowGutterSmall}>
            <Col lg={8} md={12} sm={12} xs={24}>
              <AntInput type="number" label="Kilometers Traveled (KMT)" placeholder="Kilometers Traveled" noRequired={true} name="kt" step={0} className="hide-arrow" containerClassName="m-b-5-imp" />
              <Button className="m-r-5 w-full m-b-5" type="primary" ghost onClick={() => this.setState({ viewProgressNoteModal: true, selectedClientIdForProgressNote: dt.client_ref_id })}><i className="las la-file-alt fs-18 pos-relative top-1" /> Add Progress Notes</Button>
              <Button className="m-r-5 w-full m-b-15" type="primary" ghost onClick={() => this.setState({ viewNoteModal: true, selectedClientIdForStatusNote: dt.client_ref_id })}><i className="las la-sticky-note fs-18 pos-relative top-1" /> Add Status Notes</Button>
            </Col>
            <Col lg={16} md={12} sm={12} xs={24}>
              <AntInput className="h-112-imp" type="textarea" label="Description / Comment" placeholder="Some description" name="description" />
            </Col>
          </Row>

          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <SignCanvas
                label={<strong>Staff Signature:</strong>}
                onChange={(e) => this.setState({ staffSign: e })}
                width={337}
                height={193}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <SignCanvas
                label={<strong>Client Signature:</strong>}
                onChange={(e) => this.setState({ clientSign: e })}
                width={337}
                height={193}
              />
            </Col>
          </Row>
          <hr className="hr-1 m-t-15 m-b-15" />
          <div className="text-right">
            <Button size="large" type="primary" htmlType="submit" loading={pr.loader}>Send for approval</Button>
          </div>
        </Form>
        <AddNodeModule clientId={st.selectedClientIdForStatusNote} show={st.viewNoteModal} onClose={() => this.setState({ viewNoteModal: false })} />
        <ProgressNoteFormModal show={st.viewProgressNoteModal} clientId={st.selectedClientIdForProgressNote} onClose={() => this.setState({ viewProgressNoteModal: false })} />
      </React.Fragment>
    )//End return
  }//End render
  componentDidMount() { this.setState({ currentTime: GetCurrentTime() }) }
  componentDidUpdate(prevProps) {
    if (prevProps.data.id !== this.props.data.id) {
      this.setState({ currentTime: GetCurrentTime() })
    }//end if condition
  }//End componentDidUpdate
}//End class
export default ServiceWidgetTimerEndModal;