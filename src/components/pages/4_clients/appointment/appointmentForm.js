import React, { Component } from 'react';
import { Form, Button, Row, Col, Divider, Alert } from 'antd';
import { AntInput } from '../../../externalComponents/antd-fields';
import ScreenLoader from '../../../externalComponents/screen-loader';
import { HTTP, GetObjectFromArr, FormatDate, SetDatePicker } from '../../../services';
import AvailabilityDaysTable from '../../15_service_plaining/plainingForm/availabilityDaysTable';
import UploadFile from '../../../externalComponents/antd-upload-file-component';

import { connect } from 'react-redux';
import StoreGet from '../../../../store/get';

class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postLoader: false,
      getLoader: false,
      list: {},
      formValues: {},
      updateMod: false,
      getAvailTimeLoader: false,
      timeAvailErrorMsg: '',
      disabledSubmit: false,
      totalHour: false,
      resetFileUploader: true
    };//End state
  }//End constructor
  formRef = React.createRef();

  submitForm = (values) => {

    //@ If shift is assign then set variable for SP to update it
    if (this.state.formValues.service_plaining_ref_id) {
      values.service_plaining_ref_id = this.state.formValues.service_plaining_ref_id;
    }//End if condition

    //Check Internal or External Form
    values.internalForm = this.props.internalForm ? 'true' : 'false';
    values.status = this.state.formValues.status;

    this.setState({ postLoader: true });
    HTTP('post', '/clientAppointment/post/', values).then(res => {
      this.setState({ postLoader: false });
      if (!res) return false;
      this.formRef.current.resetFields();

      if (this.state.list) {
        values.date = FormatDate(values.date);
        values.name = GetObjectFromArr(values.client_ref_id, 'id', this.state.list.clientList).name
      }//End if condition
      if (values.id) {
        // console.log(values);
        this.props.updateData && this.props.updateData(values);
      } else {
        if (this.props.addData) {
          values.id = res.id;
          values.appointment_no = res.appointment_no;
          values.time = values.start_time ? (values.start_time + ' to ' + values.end_time) : '-';
          values.status = res.status;
          this.props.addData(values);
        }//End if condition
      }//End if condition

      this.setState({ updateMod: false }, () => {
        this.props.onClose && this.props.onClose();
      });

    });
    // });
  }//End function

  getData = (id = '') => {
    this.setState({ getLoader: true, formValues: {} });
    HTTP('get', '/clientAppointment/get/getFormData/id/' + (id ? id : '-') + '/se/ig').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      // console.log(res.formValues);
      this.setState({ list: { timeList: res.timeList, clientList: res.clientList, supportWorkerList: res.supportWorkerList } }, () => {
        this.formRef.current.setFieldsValue({ appointment_no: res.data.appointment_no });
        this.props.newAppointmentNo && this.props.newAppointmentNo(res.data.appointment_no);
        if (res.formValues) {
          this.formRef.current.setFieldsValue({ ...res.formValues, date: SetDatePicker(res.formValues.date) });
          this.setState({ formValues: res.formValues, resetFileUploader: false }, () => {
            this.setState({ updateMod: true, resetFileUploader: true })
            // this.props.loadFormData && this.props.loadFormData(res.formValues);
          });
        } else {
          this.props.clientId && this.formRef.current.setFieldsValue({ client_ref_id: this.props.clientId });
        }//End if condition
      });
    });
  }//End function

  setFormValuesForAvailabilityTable = (col, value) => {
    let formValues = this.state.formValues;
    formValues[col] = value;
    this.setState({ formValues });
  }//End function

  render() {
    const st = this.state;
    const pr = this.props;
    // const fp = this.formRef.current;
    const list = st.list;
    const fv = st.formValues;
    const spId = fv.service_plaining_ref_id;
    // console.log(spId);
    return (
      <div className="incident-form-container">
        {!pr.internalForm &&
          <div className="externalFormTitle">
            <h3 className="label">Client Appointment <span className="label-strong">Form</span></h3>
            <div className="logo">
              <img src={`${process.env.PUBLIC_URL}/img/${pr.stv.app_data.logo_h}`} alt="Logo" />
            </div>
          </div>
        }
        <ScreenLoader active={st.getLoader}>
          {/* =={st.appointmentNoForUpdate ? st.appointmentNoForUpdate : pr.appointmentNo}== */}
          <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
            <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
            <AntInput label="Appointment Number" name="appointment_no" containerClassName="dis-none-imp" disabled noRequired={true} />

            <Row gutter={window.rowGutterLarge}>
              <Col lg={spId ? 13 : 24} md={24} sm={24} xs={24}>
                <Row gutter={window.rowGutter}>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    <AntInput type="select" label="Client Name" name="client_ref_id" options={list.clientList} setValueLabel={['id', 'name']} filter={true} disabled={this.props.clientId} />
                  </Col>
                  <Col lg={6} md={12} sm={8} xs={24}>
                    <AntInput type="datepicker" disabledPreviousDate label="Date" name="date" value={pr.data && pr.data.date} onChange={(e) => this.setFormValuesForAvailabilityTable('date', e)} />
                  </Col>
                  <Col lg={6} md={12} sm={8} xs={12}>
                    <AntInput type="select" label="Start Time" name="start_time" options={list.timeList} filter={true} noRequired={true} onChange={(e) => this.setFormValuesForAvailabilityTable('start_time', e)} />
                  </Col>
                  <Col lg={6} md={12} sm={8} xs={12}>
                    <div className="field-side-label">{st.getAvailTimeLoader && <i className="las la-sync-alt la-spin fs-16" />}</div>
                    <div className="field-side-label">{st.totalHour}</div>
                    <AntInput type="select" label="End Time" name="end_time" options={list.timeList} filter={true} noRequired={true} onChange={(e) => this.setFormValuesForAvailabilityTable('end_time', e)} />
                  </Col>
                  <Col lg={24} md={24} sm={24} xs={24}>
                    <AntInput label="Appointment Title" name="title" />
                  </Col>
                  <Col lg={spId ? 12 : 24} md={spId ? 12 : 24} sm={24} xs={24}>
                    <AntInput type="textarea" className={spId ? 'h-100-imp' : ''} label="Description" name="description" placeholder="Please type some details about appointment" />
                  </Col>
                  <Col lg={spId ? 12 : 24} md={spId ? 12 : 24} sm={24} xs={24}>
                    <label>Upload document(s) if available:</label>
                    {/* <br />{fv.uploadedDocuments} */}
                    {st.resetFileUploader &&
                      <UploadFile
                        formProps={this.formRef.current}
                        name="documents"
                        uploadedDocuments={fv.uploadedDocuments}
                        filePath={fv.filePath}
                        // value={fv.uploadedDocuments}
                        // onChange={e => ocf('documents', e)}
                        multiple={true}
                        title="Appointment Documents" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" restrictExtension="jpg,jpeg,png,pdf,doc,docx" fileSize="5" noRequired={true} />
                    }
                  </Col>
                  {spId &&
                    <>
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <Divider orientation="left" className="m-b-10-imp m-t-7-imp"><strong>Shift # {fv.shift_no}</strong></Divider>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <AntInput type="select" label="Support Worker" name="spw_ref_id" options={list.supportWorkerList} setValueLabel={['id', 'name']} filter={true} onChange={(e) => this.setFormValuesForAvailabilityTable('spw_ref_id', e)} loading={st.getAvailTimeLoader} />
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <AntInput type="select" label="Partner" name="spw_partner_ref_id" options={list.supportWorkerList} setValueLabel={['id', 'name']} filter={true} onChange={(e) => this.setFormValuesForAvailabilityTable('spw_partner_ref_id', e)} disabled={!fv.spw_ref_id} noRequired={true} loading={st.getAvailTimeLoader} />
                      </Col>
                    </>
                  }
                </Row>
              </Col>
              {spId &&
                <Col lg={11} md={24} sm={24} xs={24}>
                  {/* Selected Day: {JSON.stringify(fv.selectedDay)}<br />
                      Selected Date: {JSON.stringify(fv.date)}<br />
                      Service Day: {JSON.stringify(fv.service_day)}<br /> */}
                  {/* Start Time: {JSON.stringify(fv.start_time)}<br />
                  End Time: {JSON.stringify(fv.end_time)}<br /> */}
                  <AvailabilityDaysTable
                    updateMod={st.updateMod}
                    spw1={fv.spw_ref_id}
                    spw2={fv.spw_partner_ref_id}
                    setDayList={(e) => this.setState({ data: { ...this.state.data, dayList: e } })}
                    selectedDay={fv.selectedDay}
                    selectedDate={fv.date}
                    serviceDay={fv.service_day}
                    startTime={fv.start_time}
                    endTime={fv.end_time}
                    timeInfo={(a, b, c) => this.setState({ timeAvailErrorMsg: a, disabledSubmit: b, totalHour: c })}
                    getAvailTimeLoader={(e) => this.setState({ getAvailTimeLoader: e })}
                  // getAvailabilityData={(e) => this.setState({ getAvailabilityData: true })}
                  />
                  {st.getAvailabilityData}
                </Col>
              }
            </Row>

            <hr className="hr-1" /><br />
            <div className="flex-r-m">
              <div>{st.timeAvailErrorMsg ? <Alert message={st.timeAvailErrorMsg} type="error" showIcon /> : ''}</div>&nbsp;&nbsp;
              <Button size="large" type="primary" htmlType="submit" loading={this.state.postLoader} disabled={st.disabledSubmit}>
                {(pr.dataId && pr.dataId) ? 'Update' : 'Add'} Appointment
              </Button>
            </div>
          </Form>
        </ScreenLoader>
      </div>
    );//End return
  }//End render
  componentDidMount() {
    this.getData(this.props.dataId);
  }//End componentDidMount
  // componentDidUpdate(prevProps) {
  // console.log(prevProps.dataId, this.props.dataId);
  // if (this.props.dataId && (this.props.dataId !== prevProps.dataId)) {
  //   this.getData(this.props.dataId);
  // } else {
  // if (this.props.clientId && (this.props.clientId !== prevProps.clientId)) {
  // this.getData();
  // }//End if condition
  // }//End if condition
  // }//End componentDidUpdate
}//End class

export default connect(StoreGet)(AppointmentForm);