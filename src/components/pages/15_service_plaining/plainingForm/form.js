import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Row, Col, Form, Button, Spin, Alert } from 'antd';
import { AntInput } from '../../../externalComponents/antd-fields';
import { HTTP, setFormStateValues, SetDatePicker } from '../../../services';
// import ScreenLoader from '../../externalComponents/screen-loader';
import AvailabilityDaysTable from './availabilityDaysTable';
// import PlainLog from './partial/plainLog';
import CrossTimeModal from './crossTimeModal';
import moment from "moment";

class ServicePlainForm extends Component {
	state = {
		postLoader: false,
		getLoader: false,
		getAvailDayLoader: false,
		getAvailTimeLoader: false,
		addData: {},
		updateData: {},
		data: {},
		disabledSubmit: false,
		frequency: null,
		selectedDay: null,
		selectedDate: null,
		timeAvailErrorMsg: '',
		totalHour: '',
		formValues: {},
		updateMod: false,
		crossTimeModalShow: false,
		crossTimeData: {},
		currentAvailability: [],
		dayOfMonthDisable: false,
		showAvailabilityTable: true
	}//End state

	formRef = React.createRef();

	onChangeField = (fieldName, fieldValue) => {
		this.setState({ formValues: setFormStateValues(this.state.formValues, fieldName, fieldValue) }, () => {
			//console.log(this.state.formValues);
		});
	}//End function

	submitForm = (values) => {
		this.setState({ postLoader: true });
		HTTP('post', '/servicePlaining/post/', values).then(res => {
			this.setState({ postLoader: false });
			if (!res) { return false; }

			//If there is cross time Error then show Modal for all cross time visibility
			if (res.timeCrossError) {
				this.setState({ crossTimeModalShow: true, crossTimeData: res });
				return false;
			}//End if condition

			this.formRef.current.resetFields();
			this.formRef.current.setFieldsValue({ shift_no: res.shift_no });
			this.props.setShiftNumber && this.props.setShiftNumber(res.shift_no);

			//@Set Appointment Log if this form is submitted from Appointment Module
			this.props.setAppointmentLogOnAddUpdate && this.props.setAppointmentLogOnAddUpdate({ service_plaining_ref_id: res.id, shift_no: res.shift_no_old })

			this.setState({ formValues: {}, data: { ...this.state.data, dayMearge: null, dayList: [], selectedDay: null, crossTimeModalShow: true } });
			//@If Forms is submitted from Schedule/Appointment Module then close the modal
			if (this.props.scheduleData || this.props.dataForAppointment) {
				this.props.onClose();
			} else {
				if (values.id) { this.props.history.push('/e/servicePlainLog'); }//End if condition
			}//End if condition
		});
	}//End function

	getData = (id) => {
		this.setState({ getLoader: true });
		HTTP('get', '/servicePlaining/get/index/?id=' + id + '&dataForAppointment=' + (this.props.dataForAppointment ? 'true' : '')).then(res => {
			this.setState({ getLoader: false });
			if (!res) { return false; }
			this.setState({ data: res.data, totalHour: res.totalHour }, () => {
				//Edit data if available
				if (res.data.formValues) {
					let dt = res.data.formValues;
					// this.getAvailabilityDay(dt.spw_ref_id, dt.spw_partner_ref_id);
					if (dt.service_day) { this.setState({ selectedDay: dt.service_day }); }
					// console.log(dt);
					this.setState({ updateMod: true, formValues: dt, frequency: dt.frequency, selectedDate: dt.service_date });
					// if (dt.service_date) { this.setState({  }); }
					delete dt.service_date;
					dt.service_from_date = SetDatePicker(dt.service_from_date);
					dt.service_to_date = SetDatePicker(dt.service_to_date);
					this.formRef.current.setFieldsValue(dt);
					this.props.setShiftNumber && this.props.setShiftNumber(dt.shift_no);
					// console.log(dt);
				} else if (this.props.dataForAppointment) {//@ Set Form for Appointment if data is available
					this.setState({ formValues: this.props.dataForAppointment, frequency: this.props.dataForAppointment.frequency, selectedDate: this.props.dataForAppointment.service_date }, () => {
						this.formRef.current.setFieldsValue({ ...this.props.dataForAppointment, shift_no: res.shift_no });
						// this.setState({ formValues: this.props.dataForAppointment })
						// this.resetAvailabilityTableOnChange(this.props.dataForAppointment.frequency);

						// this.props.dataForAppointment.frequency
					});
				} else {
					this.formRef.current.setFieldsValue({ shift_no: res.shift_no });
					this.props.setShiftNumber && this.props.setShiftNumber(res.shift_no);
				}//End if condition

			});
		});
	}//End function

	disabledDate = (current) => {
		current = moment(current).subtract(parseInt(-1, 0), 'days');
		// Can not select days before today
		return current && current < moment().endOf('day');
	}//End function

	availabilityForMonthly = (e) => {
		if (e === '7') {
			let ca = this.state.currentAvailability;
			// console.log(ca);
			if (ca.dayList && ca.dayList.length < 7) {
				this.setState({ dayOfMonthDisable: true, timeAvailErrorMsg: 'Support Worker is not available daily.' });
				return false;
			}//End if condition
		} else {
			this.setState({ dayOfMonthDisable: false, timeAvailErrorMsg: '' });
		}//End if condition
	}//End function

	setWithSchedule = (data) => {
		// console.log(data)
		//Select SPW
		this.onChangeField('spw_ref_id', data.spwId);
		this.formRef.current.setFieldsValue({ spw_ref_id: data.spwId, service_day: '', service_start_time: '', service_end_time: '' });
		//Select Frequency - Weekly
		this.setState({ frequency: '6', selectedDate: null, totalHour: '' });
		this.formRef.current.setFieldsValue({ frequency: '6', service_start_time: '', service_end_time: '' });
		//Select Day
		this.setState({ selectedDay: data.day });
		this.formRef.current.setFieldsValue({ service_day: data.day, service_start_time: '', service_end_time: '' })
		//Select Date
		this.formRef.current.setFieldsValue({ service_date: data.date, service_start_time: '', service_end_time: '' })
		//Start and End Time
		if (data.start_time) {
			this.onChangeField('service_start_time', data.start_time);
			this.formRef.current.setFieldsValue({ service_start_time: data.start_time })
			setTimeout(() => {
				this.onChangeField('service_end_time', data.end_time);
				this.formRef.current.setFieldsValue({ service_end_time: data.end_time })
			}, 500);
		}//End if condition
	}//End function

	resetAvailabilityTableOnChange = (frequency = false) => {
		// console.log(this.state.selectedDay, this.state.selectedDate, frequency)
		// alert(frequency);
		if ((frequency === '7' || frequency === '9' || frequency === '12') && this.state.selectedDay) {
			alert(frequency);

			this.formRef.current.setFieldsValue({ service_day: '' });
			this.setState({ selectedDay: null }, () => {
				this.resetAvailabilityTableOnChangeCall(frequency);
			});
		} else if ((frequency === '5.1' || frequency === '5.2' || frequency === '6') && this.state.selectedDate) {
			// alert(frequency);
			this.formRef.current.setFieldsValue({ service_date: '' });
			this.setState({ selectedDate: null }, () => {
				this.resetAvailabilityTableOnChangeCall(frequency);
			});
		} else if (frequency === '8') {
			this.formRef.current.setFieldsValue({ service_day: '', service_date: '' });
			this.setState({ selectedDay: null, selectedDate: null }, () => {
				this.resetAvailabilityTableOnChangeCall(frequency);
			});
		} else {
			this.resetAvailabilityTableOnChangeCall(frequency);
		}//End if condition
	}//End function

	resetAvailabilityTableOnChangeCall = (frequency) => {
		if (!this.state.selectedDay && !this.state.selectedDate && frequency !== '8') {
			return false;
		}//End if condition
		//@If both frequency is not given then reset/call Availability Table
		//@Because both frequency has Date to select and we already call function on Change at date select
		//@Within 'AvailabilityDaysTable' component in 'componentDidUpdate'
		if (frequency !== '9' || frequency !== '12') {//On Client Request/Appointment Module
			let service_start_time = this.state.formValues.service_start_time;
			let service_end_time = this.state.formValues.service_end_time;
			this.setState({ showAvailabilityTable: false, }, () => {
				this.onChangeField('service_start_time', '');
				this.onChangeField('service_end_time', '');
				this.setState({ showAvailabilityTable: true }, () => {
					this.onChangeField('service_start_time', service_start_time);
					this.onChangeField('service_end_time', service_end_time);
					// console.log('dadf');
				})
			})
		}//End if condition
	}//End function

	render() {
		const fp = this.formRef.current;
		const st = this.state;
		const dataForAp = this.props.dataForAppointment;
		const fv = st.formValues;
		const scheduleData = this.props.scheduleData ? this.props.scheduleData : {};
		const ocf = this.onChangeField;
		return (
			<React.Fragment>
				<Row gutter={window.rowGutter}>
					<Col lg={13} md={24} sm={24} xs={24}>
						<div className="container">
							<Spin spinning={st.getLoader} tip="Loading, Please wait...">
								<Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm}>
									<AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
									<AntInput label="Shift Number" name="shift_no" containerClassName="dis-none-imp" disabled />
									<AntInput name="appointment_ref_id" containerClassName="dis-none-imp" noRequired={true} />
									<Row gutter={window.rowGutterSmall}>
										{/* <Col lg={8} md={6} sm={12} xs={12}>
											<AntInput type="select" filter={true} label="Plaining Type" name="plaining_type" options={st.data.plaining_type} />
										</Col> */}
										<Col lg={8} md={6} sm={12} xs={12}>
											<AntInput type="select" filter={true} label="Client Name" name="client_ref_id" options={st.data.clientList} setValueLabel={['id', 'name']} disabled={dataForAp} />
										</Col>
										<Col lg={16} md={12} sm={12} xs={12}>
											<AntInput type="select" filter={true} label="Service" name="service_ref_id" options={st.data.serviceList} setValueLabel={['id', 'name']} disabled={dataForAp} />
										</Col>
										<Col lg={8} md={6} sm={12} xs={12}>
											<AntInput type="select" filter={true} label="Support Worker" name="spw_ref_id" className="specific-field-border-2" options={st.data.supportWorkerList} setValueLabel={['id', 'name']} onChange={(e) => {
												ocf('spw_ref_id', e);
												// fp.setFieldsValue({ frequency: '', service_month_day: '', service_day: '', service_start_time: '', service_end_time: '', dayOfMonthDisable: false });
												this.availabilityForMonthly(false);
												this.resetAvailabilityTableOnChange(st.frequency);
											}} disabled={scheduleData.spwId} />
										</Col>
										<Col lg={8} md={6} sm={12} xs={12}>
											<AntInput type="select" filter={true} label="Partner" name="spw_partner_ref_id" className="specific-field-border-2" options={st.data.supportWorkerList} setValueLabel={['id', 'name']} onChange={(e) => {
												ocf('spw_partner_ref_id', e);
												// fp.setFieldsValue({ frequency: '', service_month_day: '', service_day: '', service_start_time: '', service_end_time: '', dayOfMonthDisable: false });
												this.availabilityForMonthly(false);
												this.resetAvailabilityTableOnChange(st.frequency);
											}} noRequired={true} disabled={fp && !fp.getFieldValue('spw_ref_id')} />
										</Col>
										<Col lg={8} md={6} sm={12} xs={12}>
											<AntInput type="select" filter={true} label="Frequency" name="frequency" options={st.data.frequency} onChange={(e) => {
												this.setState({ frequency: e, selectedDate: null, totalHour: '' });
												// fp.setFieldsValue({ service_month_day: '', service_start_time: '', service_end_time: '' });
												this.availabilityForMonthly(e);
												this.resetAvailabilityTableOnChange(e);
											}} disabled={dataForAp}
											/>
										</Col>
										{(st.frequency === '' || st.frequency === null || st.frequency === '5.1' || st.frequency === '5.2' || st.frequency === '6') &&
											<Col lg={8} md={6} sm={12} xs={12}>
												<AntInput type="select" filter={true} label="Service Day" name="service_day" options={st.data.dayList} loading={st.getAvailDayLoader} disabled={fp && !fp.getFieldValue('spw_ref_id')} onChange={(e) => {
													this.setState({ selectedDay: e }, () => {
														this.resetAvailabilityTableOnChange(st.frequency);
													});
													// fp.setFieldsValue({ service_start_time: '', service_end_time: '' });
												}} />
											</Col>
										}
										{(st.frequency === '9' || st.frequency === '12') &&
											<Col lg={8} md={6} sm={12} xs={12}>
												<AntInput type="datepicker" disabledDate={this.disabledDate} disabledPreviousDate={true} label="Service Date" name="service_date" loading={st.getAvailDayLoader} disabled={(fp && !fp.getFieldValue('spw_ref_id')) || dataForAp} onChange={(e) => {
													var date = moment(e, "DD-MM-YYYY HH:mm:ss");
													this.setState({ selectedDate: e, selectedDay: date.format('dddd') }, () => {
														this.resetAvailabilityTableOnChange(st.frequency);
													});
													// fp.setFieldsValue({ service_start_time: '', service_end_time: '' })
												}} value={st.selectedDate} />
											</Col>
										}
										{st.frequency === '7' &&
											<Col lg={8} md={6} sm={12} xs={12}>
												<AntInput type="select" filter={true} label="Service Day of Month" name="service_month_day" options={st.data.monthDayList} loading={st.getAvailDayLoader} disabled={(fp && !fp.getFieldValue('spw_ref_id')) || st.dayOfMonthDisable}
													onChange={(e) => {
														// fp.setFieldsValue({ service_start_time: '', service_end_time: '' })
														this.resetAvailabilityTableOnChange(st.frequency)
													}}
												/>
											</Col>
										}
										<Col lg={st.frequency === '8' ? 16 : 8} md={6} sm={12} xs={12}>
											<div className="field-side-label">{st.getAvailTimeLoader && <i className="las la-sync-alt la-spin fs-16" />}</div>
											<AntInput type="select" label="Ser. Start Time" name="service_start_time" onChange={(e) => ocf('service_start_time', e)} options={st.data.timeListArr} filter={true}
												className="specific-field-border-1"
												loading={st.getAvailTimeLoader} disabled={
													(st.getAvailTimeLoader) ||
													((st.frequency === null) ||
														((st.frequency === '5.1' || st.frequency === '5.2' || st.frequency === '6') && !fp.getFieldValue('service_day')) ||
														((st.frequency === '9' || st.frequency === '12') && !fp.getFieldValue('service_date')))
												}
											/>
										</Col>
										<Col lg={8} md={6} sm={12} xs={12}>
											<div className="field-side-label">{st.getAvailTimeLoader && <i className="las la-sync-alt la-spin fs-16" />}</div>
											<div className="field-side-label">{st.totalHour}</div>
											<AntInput type="select" filter={true} label="Ser. End Time" name="service_end_time" onChange={(e) => ocf('service_end_time', e)} options={st.data.timeListArr} className="specific-field-border-1" disabled={
												(st.getAvailTimeLoader) ||
												((st.frequency === null) ||
													(!fp.getFieldValue('service_start_time')) ||
													((st.frequency === '5.1' || st.frequency === '5.2' || st.frequency === '6') && !fp.getFieldValue('service_day')) ||
													((st.frequency === '9' || st.frequency === '12') && !fp.getFieldValue('service_date')))
											} />
										</Col>
										{(st.frequency !== '' && st.frequency !== '9' && st.frequency !== '12') &&
											<>
												<Col lg={8} md={6} sm={12} xs={12}>
													<AntInput type="select" filter={true} label="Service Recurring Type" name="service_recurring_type"
														onChange={(e) => ocf('service_recurring_type', e)}
														options={st.data.recurring_type}
													/>
												</Col>
												{!fv.service_recurring_type &&
													<Col lg={16} md={12} sm={24} xs={24}>
														<Alert message={"Please select recurring type"} type="info" showIcon className="alert-between-form" />
													</Col>
												}
												{fv.service_recurring_type === '10' &&
													<Col lg={16} md={12} sm={24} xs={24}>
														<AntInput type="datepicker" disabledPreviousDate={true} containerClassName="specific-field-border-3" label="Shift(s) Start From Date" name="service_from_date" />
													</Col>
												}
												{fv.service_recurring_type === '11' &&
													<>
														<Col lg={8} md={6} sm={12} xs={12}>
															<AntInput type="datepicker" disabledPreviousDate={true} containerClassName="specific-field-border-3" label="From Date" name="service_from_date" />
														</Col>
														<Col lg={8} md={6} sm={12} xs={12}>
															<AntInput type="datepicker" disabledPreviousDate={true} containerClassName="specific-field-border-3" label="To Date" name="service_to_date" />
														</Col>
													</>
												}
											</>
										}
										<Col lg={8} md={6} sm={12} xs={12}>
											<AntInput type="select" filter={true} label="Meal Break (mins)" name="meal_break_min" options={st.data.meal_break_list} noRequired={true} />
										</Col>
										<Col lg={8} md={6} sm={12} xs={12}>
											<AntInput type="select" filter={true} label="Rest Break (mins)" name="rest_break_min" options={st.data.meal_break_list} noRequired={true} />
										</Col>
										<Col lg={8} md={6} sm={12} xs={12}>
											<AntInput type="select" filter={true} label="Status" name="status" options={st.data.status}
											// disabled={dataForAp}
											/>
										</Col>
									</Row>
									<AntInput type="textarea" label="Shift Details" name="remarks" noRequired={true} />

									<hr className="hr-1 m-b-23" />
									<div className="flex-sb">
										<div>{st.timeAvailErrorMsg ? <Alert message={st.timeAvailErrorMsg} type="error" showIcon /> : ''}</div>
										<Button size="large" type="primary" htmlType="submit" loading={st.postLoader} disabled={st.disabledSubmit || st.getAvailTimeLoader || st.dayOfMonthDisable}>
											{fp && fp.getFieldValue('id') ? 'Update' : 'Submit'}
										</Button>
									</div>
								</Form>
							</Spin>
						</div>
					</Col>
					<Col lg={11} md={24} sm={24} xs={24}>
						{/* SPW 1: {JSON.stringify(fv.spw_ref_id)}<br />
						SPW 2: {JSON.stringify(fv.spw_partner_ref_id)}<br />
						Selected Day: {JSON.stringify(st.selectedDay)}<br />
						Selected Date: {JSON.stringify(st.selectedDate)}<br />
						Service Day: {JSON.stringify(st.service_day)}<br />
						Start Time: {JSON.stringify(st.service_start_time)}<br />
						End Time: {JSON.stringify(st.service_end_time)}<br /> */}
						{st.showAvailabilityTable &&
							<AvailabilityDaysTable
								updateMod={st.updateMod}
								spw1={fv.spw_ref_id}
								spw2={fv.spw_partner_ref_id}
								setDayList={(e) => this.setState({ data: { ...this.state.data, dayList: e } })}
								selectedDay={st.selectedDay}
								selectedDate={st.selectedDate}
								serviceDay={fv.service_day}
								startTime={fv.service_start_time}
								endTime={fv.service_end_time}
								timeInfo={(a, b, c) => this.setState({ timeAvailErrorMsg: a, disabledSubmit: b, totalHour: c })}
								getAvailTimeLoader={(e) => this.setState({ getAvailTimeLoader: e })}
								getAvailabilityData={(e) => this.setState({ currentAvailability: e })}
								isAppointmentModule={(this.props.dataForAppointment ? true : false)}
							/>
						}
					</Col>
				</Row>
				<CrossTimeModal show={st.crossTimeModalShow} close={() => this.setState({ crossTimeModalShow: false })} data={st.crossTimeData} />
			</React.Fragment>
		);//End return+
	}//End render

	componentDidMount() {
		this.getData(this.props.id);
		// console.log(this.props.scheduleData);
		this.props.scheduleData && this.setWithSchedule(this.props.scheduleData);
		// alert(this.props.spwId)
	}//End componentDidMount
	componentDidUpdate(prevProps) {
		if ((prevProps.id !== this.props.id)) { this.getData(this.props.id); }//End if condition
	}//End componentDidMount
}//End Class
export default withRouter(ServicePlainForm);