import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert, message } from 'antd';
import { AntInput } from '../../../externalComponents/antd-fields';
import { HTTP, setFormStateValues, GetObjectFromArr } from '../../../services';
import ScreenLoader from '../../../externalComponents/screen-loader';
import AvailabilityDaysTable from '../plainingForm/availabilityDaysTable';
import ViewDetails from '../plainingLog/partial/viewDetails';
import moment from 'moment';
import '../styles.less';

class ShiftReplacementForm extends Component {
  state = {
    data: {},
    postLoader: false,
    getLoader: false,
    formValues: {},
    getAvailTimeLoader: false,
    timeAvailErrorMsg: '',
    disabledSubmit: false,
    totalHour: '',
    sp1EditLinkShow: false,
    sp1EditToggle: false,
    sp2EditLinkShow: false,
    sp2EditToggle: false
  }//End state
  formRef = React.createRef();

  onChangeField = (fieldName, fieldValue) => {
    this.setState({ formValues: setFormStateValues(this.state.formValues, fieldName, fieldValue) }, () => {
      //console.log(this.state.formValues);
    });
  }//End function

  getData = (requestId) => {
    this.setState({ getLoader: true });
    HTTP('get', '/shiftReplacementRequest/get/index/' + requestId).then(res => {
      this.setState({ getLoader: false });
      if (!res) { return false; }
      let data = res.data;
      // console.log(data.shiftDetails);
      this.setState({ data: data, totalHour: data.totalHour }, () => {
        this.props.onLoad && this.props.onLoad(this.state.data);//For Parent Modal if available
        //Set Form Data from Shift details or from Replaced SP table to update Form (not to insert)
        let formSetData = data.shiftDetails;
        if (data.formUpdateData) {
          formSetData = data.formUpdateData;
          this.formRef.current.setFieldsValue({ 'id': formSetData.id, });//If it's in update mode then set if
        }//End if condition
        this.formRef.current.setFieldsValue({
          'spw_ref_id': formSetData.spw_ref_id,
          'spw_partner_ref_id': formSetData.spw_partner_ref_id,
          'service_start_time': formSetData.service_start_time,
          'service_end_time': formSetData.service_end_time,
          'meal_break_min': formSetData.meal_break_min,
          'rest_break_min': formSetData.rest_break_min,
          'remarks': formSetData.remarks,
        })
        this.onChangeField('service_start_time', formSetData.service_start_time);
        this.onChangeField('service_end_time', formSetData.service_end_time);
        //Set toggle button for SP or Partner 
        if (data.requestData.spw_ref_id) { this.setState({ sp1EditLinkShow: false, sp1EditToggle: false, sp2EditLinkShow: true, sp2EditToggle: true }) }
        if (data.requestData.spw2_ref_id) { this.setState({ sp1EditLinkShow: true, sp1EditToggle: true, sp2EditLinkShow: false, sp2EditToggle: false }) }
      });
    });
  }//End function

  submitForm = (values) => {
    //If Support Worker or Partner is not changed then shw info message
    let rd = this.state.data.requestData;
    if (rd.spw_ref_id && rd.spw_ref_id === values.spw_ref_id) {
      message.info("Please change the Support Worker"); return false;
    }//End if condition
    if (rd.spw2_ref_id && rd.spw2_ref_id === values.spw_partner_ref_id) {
      message.info("Please change the Partner Support Worker"); return false;
    }//End if condition

    //If Main SP is requestor and Partner is not changed then set partner as empty
    let sd = this.state.data.shiftDetails;
    if (rd.spw_ref_id && values.spw_partner_ref_id === sd.spw_partner_ref_id) {
      values.spw_partner_ref_id = '';
    }//End if condition
    //If Partner is requestor and Main SP is not changed then set Main SP as empty
    if (rd.spw2_ref_id && values.spw_ref_id === sd.spw_ref_id) {
      values.spw_ref_id = '';
    }//End if condition

    values.service_plaining_ref_id = rd.service_plaining_ref_id;
    values.request_table_ref_id = rd.id;
    // console.log(this.state.data.requestData);return false;
    values.service_date = this.state.data.requestData.req_for_date;
    values.service_day = this.state.data.requestData.req_for_day;
    this.setState({ postLoader: true });
    HTTP('post', '/shiftReplacementRequest/post/index', values).then(res => {
      this.setState({ postLoader: false });
      if (!res) { return false; }
      //
      let replacedSPName = {};
      if (rd.spw_ref_id !== values.spw_ref_id) {
        replacedSPName['swpr1_name'] = GetObjectFromArr(values.spw_ref_id, 'id', this.state.data.supportWorkerList).name;
      }//End if condition
      if (rd.spw2_ref_id !== values.spw_partner_ref_id) {
        replacedSPName['swpr2_name'] = GetObjectFromArr(values.spw_partner_ref_id, 'id', this.state.data.supportWorkerList).name;
      }//End if condition
      // console.log(rd.id, replacedSPName,values.id);
      this.props.onReplaced(rd.id, replacedSPName, values.id);
      this.props.onClose();
    });
  }//End function

  checkAvailabilityOfNewSPWOnChange = (e) => {
    // console.log(e);return false;
    let st = this.state;
    this.setState({ disabledSubmit: false, timeAvailErrorMsg: false }, () => {
      if (!e.dayMearge[st.data.requestData.req_for_day]) {
        this.formRef.current.setFieldsValue({ service_start_time: '', service_end_time: '' });
        this.setState({ disabledSubmit: true, timeAvailErrorMsg: 'Support Worker is not available' });
        return false;
      }//End if condition
      let spwAvailTime = e.dayMearge[st.data.requestData.req_for_day] && e.dayMearge[st.data.requestData.req_for_day].split('to');
      // console.log(spwAvailTime);return false;
      let spwStTime = spwAvailTime[0] ? moment(spwAvailTime[0].trim(), 'hh:mm A') : '';
      let spwEtTime = spwAvailTime[1] ? moment(spwAvailTime[1].trim(), 'hh:mm A') : '';
      let shiftStTime = moment(st.data.shiftDetails.service_start_time, 'hh:mm A');
      let shiftEtTime = moment(st.data.shiftDetails.service_end_time, 'hh:mm A');
      // console.log(spwStTime.isBefore(shiftStTime), spwEtTime.isAfter(shiftEtTime));
      if ((spwStTime.isSame(shiftStTime) || spwStTime.isBefore(shiftStTime)) && (spwEtTime.isSame(shiftEtTime) || spwEtTime.isAfter(shiftEtTime))) {
        this.formRef.current.setFieldsValue({
          service_start_time: st.data.shiftDetails.service_start_time,
          service_end_time: st.data.shiftDetails.service_end_time
        });
      } else {
        this.formRef.current.setFieldsValue({ service_start_time: '', service_end_time: '' });
      }//End if condition
    });//End state
  }//End function

  render() {
    // const pr = this.props;
    const st = this.state;
    const fp = this.formRef.current;
    const fv = this.state.formValues;
    const ocf = this.onChangeField;
    return (
      <ScreenLoader active={st.getLoader}>
        <Row gutter={5} className="replacement-shift-modal-container">
          <Col lg={8} md={12} sm={24} xs={24}>
            <div className="form-container">
              <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm}>
                <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
                <Row gutter={window.rowGutter}>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    {st.sp1EditLinkShow && <div className="field-side-label"><button className="btnToLink link-color" type="button" onClick={() => this.setState({ sp1EditToggle: !st.sp1EditToggle })}><i className="las la-edit" />Edit</button></div>}
                    <AntInput type="select" filter={true} label="Support Worker" name="spw_ref_id" options={st.data.supportWorkerList} setValueLabel={['id', 'name']} onChange={(e) => {
                      // fp.setFieldsValue({ service_start_time: '', service_end_time: '' });
                      this.setState({ data: { ...st.data, dayAvailability: null } }, () => {
                        ocf('spw_ref_id', e);
                      });
                    }} disabled={st.sp1EditToggle} />
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    {st.sp2EditLinkShow && <div className="field-side-label"><button className="btnToLink link-color" type="button" onClick={() => this.setState({ sp2EditToggle: !st.sp2EditToggle })}><i className="las la-edit" />Edit</button></div>}
                    <AntInput type="select" filter={true} label="Partner" name="spw_partner_ref_id" options={st.data.supportWorkerList} setValueLabel={['id', 'name']} onChange={(e) => {
                      // fp.setFieldsValue({ service_start_time: '', service_end_time: '' });
                      ocf('service_start_time', fv.service_start_time);
                      ocf('service_end_time', fv.service_end_time);

                      this.setState({ data: { ...st.data, dayAvailability: null } }, () => {
                        ocf('spw_partner_ref_id', e);
                      });
                    }}
                      noRequired={st.data.requestData && !st.data.requestData.spw2_ref_id}
                      disabled={(fp && !fp.getFieldValue('spw_ref_id')) || st.sp2EditToggle} />
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <AntInput type="select" label="Ser. Start Time" name="service_start_time"
                      onChange={(e) => ocf('service_start_time', e)}
                      options={st.data.timeListArr} filter={true} loading={st.getAvailTimeLoader}
                    // disabled={st.disabledSubmit}
                    />
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <div className="field-side-label">{st.totalHour}</div>
                    <AntInput type="select" filter={true} label="Ser. End Time" name="service_end_time"
                      onChange={(e) => ocf('service_end_time', e)}
                      options={st.data.timeListArr} loading={st.getAvailTimeLoader}
                    // disabled={st.disabledSubmit}
                    />
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <AntInput type="number" step={0} label="Meal Break (mins)" name="meal_break_min" className="hide-arrow" noRequired={true} />
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <AntInput type="number" step={0} label="Rest Break (mins)" name="rest_break_min" className="hide-arrow" noRequired={true} />
                  </Col>
                  <Col lg={24} md={24} sm={24} xs={24}>
                    <AntInput type="textarea" label="Shift Details" name="remarks" noRequired={true} style={{ height: '101px' }} />                    </Col>
                </Row>
                <hr className="hr-1 m-t-0 m-b-14" />
                <div className="flex-sb">
                  <div>{st.timeAvailErrorMsg ? <Alert message={st.timeAvailErrorMsg} type="error" showIcon /> : ''}</div>
                  <Button size="large" type="primary" htmlType="submit" loading={st.postLoader} disabled={st.disabledSubmit || st.getAvailTimeLoader}>
                    {fp && fp.getFieldValue('id') ? 'Update' : 'Replace'}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            {st.data.shiftDetails &&
              <AvailabilityDaysTable
                data={st.data.dayAvailability}
                spw1={fv.spw_ref_id || st.data.shiftDetails.spw_ref_id}
                spw2={fv.spw_partner_ref_id || st.data.shiftDetails.spw_partner_ref_id}
                selectedDay={st.data.requestData.req_for_day}
                // selectedDate={st.data.requestData.req_for_date}
                dateToShowJust={st.data.requestData.req_for_date}
                startTime={fv.service_start_time}
                endTime={fv.service_end_time}
                timeInfo={(a, b, c) => this.setState({ timeAvailErrorMsg: a, disabledSubmit: b, totalHour: c })}
                getAvailTimeLoader={(e) => this.setState({ getAvailTimeLoader: e })}
                onContainer={true}
                getAvailabilityData={(e) => this.checkAvailabilityOfNewSPWOnChange(e)}
              />
            }
          </Col>
          <Col lg={8} md={24} sm={24} xs={24}>
            <ViewDetails data={st.data.shiftDetails} viewToRR={true} />
          </Col>
        </Row>
      </ScreenLoader>
    );//End return
  }//End render
  componentDidMount() { this.getData(this.props.requestId) }//End componentDidMount
  // componentDidUpdate(prevProps) { if ((prevProps.requestId !== this.props.requestId)) { this.getData(this.props.requestId) } }//End componentDidUpdate
}//End class

export default ShiftReplacementForm;