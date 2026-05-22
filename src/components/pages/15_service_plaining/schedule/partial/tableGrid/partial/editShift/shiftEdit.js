import React, { Component } from 'react';
import { Row, Col, Form, Button, Descriptions, Alert, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { HTTP, SetDatePicker, FormatDate, UpdateRowInList } from '../../../../../../../services';
import { AntInput } from '../../../../../../../externalComponents/antd-fields';
import ScreenLoader from '../../../../../../../externalComponents/screen-loader';
import CrossTimeModal from '../../../../../plainingForm/crossTimeModal';
import AvailabilityDaysTable from '../../../../../plainingForm/availabilityDaysTable';

const { confirm } = Modal;

class ShiftEdit extends Component {
  state = {
    getLoader: false,
    postLoader: false,
    data: {},
    shiftData: {},
    crossTimeModalShow: false,
    crossTimeData: {},
    selectedDate: SetDatePicker(this.props.shiftData.service_date, 'YYYY-MM-DD'),
    startTime: this.props.shiftData.service_start_time,
    endTime: this.props.shiftData.service_start_time,

    timeAvailErrorMsg: '',
    getAvailTimeLoader: false,
    disabledSubmit: false,
    totalHour: '',
    deleteStatus: false,
    showDeleteConfirmModal: false,
    deleteRecoverReason: '',
  }//End State
  formRef = React.createRef();
  formRefExport = React.createRef();

  getData = (data) => {
    this.setState({ getLoader: true });
    HTTP('post', '/serviceSchedule/get/shiftEditData/spid/' + data.id + '/shiftEditId/' + (data.shift_edit_ref_id ? data.shift_edit_ref_id : '')).then(res => {
      this.setState({ getLoader: false });
      if (!res) { return false; }
      this.setState({ data: res.data, shiftData: { ...this.props.shiftData, ...res.data.formData } }, () => {
        // console.log(this.state.shiftData);
        this.setForm();
      });
    });
  }//End function

  setForm = () => {
    const sd = this.state.shiftData;
    // console.log(sd);
    this.formRef.current.setFieldsValue({
      service_ref_id: sd.service_ref_id,
      service_date: SetDatePicker(sd.service_date, 'YYYY-MM-DD'),
      service_start_time: sd.service_start_time,
      service_end_time: sd.service_end_time,
      meal_break_min: sd.meal_break_min,
      rest_break_min: sd.rest_break_min,
      remarks: sd.remarks
    });
  }//End function

  confirmDeleteOrRecover = (e) => {
    let th = this;
    const destroyAll = () => { Modal.destroyAll(); };
    confirm({
      className: 'hide-footer',
      visible: th.state.reasonModal,
      title: <span>Do you Want to <strong>{(e.delete_recover_status === 'deleted' ? 'Deleted' : 'Recover')}</strong> this shift?</span>,
      icon: <ExclamationCircleOutlined />,
      content:
        <Form className="form form-style-1" autofill="false" ref={this.formRefExport} layout="vertical" onFinish={() => th.setState({ showDeleteConfirmModal: false }, () => { th.submitForm(e); destroyAll() })} >
          SW will {e.delete_recover_status === 'deleted' ? 'NOT' : ''} see this shift on their shift list.
          <AntInput type="textarea" placeholder={`Reason to ${e.delete_recover_status}`} name="delete_recover_reason" className="m-t-10" onChange={(e) => this.setState({ deleteRecoverReason: e })} noRequired={true} />
          <div className="text-right" >
            <Button type="primary" ghost onClick={() => destroyAll()}>No</Button> &nbsp;
            <Button htmlType="submit" type="primary">Yes {(e.delete_recover_status === 'deleted' ? 'Deleted' : 'Recover')}</Button>
          </div>
        </Form>
    });
  }//End functions

  resetFormValues = () => {
    const sd = this.state.shiftData;
    let values = {
      service_ref_id: sd.service_ref_id,
      service_date: SetDatePicker(sd.service_date, 'YYYY-MM-DD'),
      service_start_time: sd.service_start_time,
      service_end_time: sd.service_end_time,
      meal_break_min: sd.meal_break_min,
      rest_break_min: sd.rest_break_min,
      remarks: sd.remarks,
      delete_recover_status: this.state.deleteStatus
    };
    return values;
  }//End function

  submitForm = (values) => {
    setTimeout(() => {
      let st = this.state;
      if ((st.deleteStatus === 'deleted' || st.deleteStatus === 'recover') && st.showDeleteConfirmModal) {
        values = this.resetFormValues();
        this.confirmDeleteOrRecover(values);
        return false;
      }//End if condition
      values.delete_recover_reason = this.state.deleteRecoverReason;
      // alert('post');return false;
      /*Set missing variables ==================================*/
      const sd = this.state.shiftData;
      values.spw_ref_id = sd.spw_ref_id;
      values.spw_partner_ref_id = sd.spw_partner_ref_id;
      values.service_day = FormatDate(values.service_date, 'dddd');
      values.service_plaining_ref_id = sd.id;
      if (!sd.shift_edit_ref_id) {
        values.current_start_time = sd.service_start_time;
        values.current_end_time = sd.service_end_time;
        values.current_service_date = sd.service_date;
      } else {
        values.id = sd.shift_edit_ref_id;
      }//if condition    
      /*=========================================================*/
      this.setState({ postLoader: true });
      HTTP('post', '/serviceSchedule/post/shiftEdit/', values).then(res => {
        this.setState({ postLoader: false });
        if (!res) { return false; }

        //?If there is cross time Error then show Modal for all cross time visibility
        if (res.timeCrossError) {
          this.setState({ crossTimeModalShow: true, crossTimeData: res });
          return false;
        }//End if condition

        values.id = sd.id;
        values.shift_edit_ref_id = res.id;
        values.delete_recover_status = this.state.deleteStatus;
        values.unique_recurring_id = this.state.shiftData.unique_recurring_id;
        values.service_date = FormatDate(values.service_date, 'YYYY-MM-DD');
        this.setState({ deleteStatus: false, deleteRecoverReason: '' });

        this.props.updateEditShiftList && this.props.updateEditShiftList(values);//@ Edited Shift List is in Setting Header, Where Delete and Edited list is appears
        //@Update Shift Array for Schedule Grid
        //?If there is a Partner then Update Both one by one by change 'unique_recurring_id';
        if(values.spw_partner_ref_id){
          let uniqueId = values.unique_recurring_id.split('-');
          uniqueId.pop();//Remove Last Element
          uniqueId = uniqueId.join('-');//Convert into String or Joint
          // uniqueId = uniqueId+'-'+values.spw_partner_ref_id;
          values.unique_recurring_id = uniqueId+'-'+values.spw_ref_id;
          this.props.updateShift && this.props.updateShift(UpdateRowInList(values, this.props.shiftArr, 'unique_recurring_id'));
          values.unique_recurring_id = uniqueId+'-'+values.spw_partner_ref_id;
          this.props.updateShift && this.props.updateShift(UpdateRowInList(values, this.props.shiftArr, 'unique_recurring_id'));
        }else{
          //? If there is No Partner the update the Main SW
          this.props.updateShift && this.props.updateShift(UpdateRowInList(values, this.props.shiftArr, 'unique_recurring_id'));
        }//End if condition

        this.props.onClose && this.props.onClose();
      });
    }, 100);
  }//End function

  render() {
    const st = this.state;
    const shiftData = this.props.shiftData;
    const fp = this.formRef.current;
    // console.log(this.props.shiftArr);
    return (
      <React.Fragment>
        <Row gutter={window.rowGutter}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div className="container">
              <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
                <div className="description-custom">
                  <h1 className="flex-sb">
                    Current Shift Detail
                    <Button size="small" type="primary" htmlType="submit" className={st.shiftData.delete_recover_status === 'deleted' ? 'blue-btn' : 'red-btn'} onClick={() => this.setState({ deleteStatus: (st.shiftData.delete_recover_status === 'deleted' ? 'recover' : 'deleted'), showDeleteConfirmModal: true })} loading={st.postLoader}>
                      {st.shiftData.delete_recover_status === 'deleted' ?
                        <span><i className="las la-sync pos-relative top-1" />&nbsp;Recover Shift</span> :
                        <span><i className="las la-times-circle pos-relative top-1" />&nbsp;Delete Shift</span>
                      }
                    </Button>
                  </h1>
                  <Descriptions size="small" layout={'vertical'} bordered column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }} className={`three-col-vertical`}>
                    <Descriptions.Item label="Shift Day">{FormatDate(shiftData.service_date, 'dddd')}</Descriptions.Item>
                    <Descriptions.Item label="Shift Start Time">{shiftData.service_start_time}</Descriptions.Item>
                    <Descriptions.Item label="Shift End Time">{shiftData.service_end_time}</Descriptions.Item>
                  </Descriptions>
                </div>
                <hr className="hr-1 m-t-20 m-b-20" />
                <ScreenLoader active={st.getLoader}>

                  <Row gutter={window.rowGutter}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <AntInput type="select" filter={true} label="Service" name="service_ref_id" options={st.data.serviceList} setValueLabel={['id', 'name']} />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <AntInput type="datepicker" disabledDate={this.disabledDate} label="Service Date" name="service_date" onChange={(e) => this.setState({ selectedDate: e, startTime: '', endTime: '' }, () => {
                        fp.setFieldsValue({ service_start_time: '', service_end_time: '' });
                      })} />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <AntInput type="select" label="Ser. Start Time" name="service_start_time" options={st.data.timeListArr} filter={true} onChange={(e) => this.setState({ startTime: e })} />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <div className="field-side-label">{st.getAvailTimeLoader && <i className="las la-sync-alt la-spin fs-16" />}</div>
                      <div className="field-side-label">{st.totalHour}</div>
                      <AntInput type="select" filter={true} label="Ser. End Time" name="service_end_time" options={st.data.timeListArr} onChange={(e) => this.setState({ endTime: e })} />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <AntInput type="number" step={0} label="Meal Break (mins)" name="meal_break_min" className="hide-arrow" noRequired={true} />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <AntInput type="number" step={0} label="Rest Break (mins)" name="rest_break_min" className="hide-arrow" noRequired={true} />
                    </Col>
                    <Col lg={24} md={24} sm={24} xs={24}>
                      <AntInput type="textarea" label="Shift Details" name="remarks" noRequired={true} />
                    </Col>
                  </Row>

                  <div className="flex-sb">
                    <div>{st.timeAvailErrorMsg ? <Alert message={st.timeAvailErrorMsg} type="error" showIcon /> : ''}</div>
                    <Button size="large" type="primary" htmlType="submit" loading={st.postLoader} disabled={st.disabledSubmit || st.getAvailTimeLoader || (st.shiftData.delete_recover_status === 'deleted')}>
                      Update Shift
                    </Button>
                  </div>



                </ScreenLoader>
              </Form>
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AvailabilityDaysTable
              spw1={shiftData.spw_ref_id}
              spw2={shiftData.spw_partner_ref_id}
              selectedDay={st.selectedDate && FormatDate(st.selectedDate, 'dddd')}
              selectedDate={st.selectedDate}
              // serviceDay={FormatDate(st.selectedDate, 'dddd')}
              startTime={st.startTime}
              endTime={st.endTime}
              timeInfo={(a, b, c) => this.setState({ timeAvailErrorMsg: a, disabledSubmit: b, totalHour: c })}
              getAvailTimeLoader={(e) => this.setState({ getAvailTimeLoader: e })}
            // getAvailabilityData={(e) => this.setState({ currentAvailability: e })}
            />
          </Col>
        </Row>
        <CrossTimeModal show={st.crossTimeModalShow} close={() => this.setState({ crossTimeModalShow: false })} data={st.crossTimeData} />
      </React.Fragment>
    )//End return
  }//End render
  componentDidMount() { this.getData(this.props.shiftData); }//End componentDidMount
  componentDidUpdate(preProps) { if (preProps.shiftData.id !== this.props.shiftData.id) { this.getData(this.props.shiftData); } }//End componentDidUpdate
}//End class
export default ShiftEdit;