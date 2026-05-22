import React, { Component } from 'react'
import { Button, Popconfirm, Alert, Modal, Row, Col, Tooltip, Avatar, Dropdown, Menu } from 'antd';
import moment from 'moment';
import { HTTP, GetCurrentTime, GetObjectIndexFromArr } from '../../../services';
import ScreenLoader from '../../../externalComponents/screen-loader';
import ServiceWidgetTimerEndModal from './serviceWidgetTimerEndModal';
import AddNoteModule from '../../4_clients/note/addNoteModal';
import AddAppointmentModule from '../../4_clients/appointment/appointmentFormModal';
import ProgressNoteFormModal from '../../4_clients/progressNote/progressNoteFormModal';
import CarePlanModal from '../../4_clients/carePlan/carePlanModal';
import ReplacementRequestModule from '../shiftReplacement/requestModal';
import ShowRequestReasonModal from '../shiftReplacement/showReasonModal';
import ViewDetailModal from '../plainingLog/partial/viewDetailModal';

import '../styles.less';

class ServiceWidget extends Component {
	state = {
		loader: false,
		data: { 'pending': [], 'today': [], 'todayDone': [] },
		time: { sec: 0, min: 0, hour: 0 },
		showTimer: '00:00:00',
		timerStart: false,
		serviceDetailsForTimer: {},
		timeEndLoader: false,
		timeStartLoaderOverall: false,
		timeStartLoader: {},
		visibleServiceWidgetTimerEndModal: false,
		start_time_server: null,
		currentTime: null,
		viewProgressNoteModal: false,
		selectedClientIdForProgressNote: '',
		viewNoteModal: false,
		selectedClientIdForStatusNote: '',
		viewAppointmentModal: false,
		selectedClientIdForAppointment: '',
		carePlanShowModal: false,
		selectedClientIdForCarePlan: '',
		viewReplacementRequestModal: false,
		viewRequestReasonModal: false,
		requestReasonToShow: '',
		selectedShift: '',
		viewModal: false,
		serviceRefId: '',
		editShiftId: '',
		ads: {},//! App Default Settings,
	}

	setData = (data, callBack) => {
		this.setState({ data: data }, () => {
			if (data.current_time) {
				window.localStorage.setItem("aul-app-timer", data.current_time);
				this.setState({ start_time_server: data.start_time });
			}//End if condition
			if (callBack) { callBack(data.current_time, data.timerData, data.service_plain_id); }//End if condition
		});
	}//End function

	getData = (callBack) => {
		if (this.props.data) {
			this.setData(this.props.data, callBack);
		} else {
			this.setState({ loader: true });
			HTTP('get', '/servicePlaining/get/getServiceList/').then(res => {
				this.setState({ loader: false });
				if (!res) { return false; }
				// console.log(res);
				this.setData(res.data, callBack);
				this.setState({ ads: res.appDefaultSetting })
			});
		}//End if condition
	}//End fucntion

	getDataCallBack = (time, timerData, service_plain_id) => {
		if (time && timerData) {
			this.setState({ timerStart: true, time: JSON.parse(time) });
			this.startCounting(JSON.parse(timerData), GetObjectIndexFromArr(service_plain_id, 'id', this.state.data.today));
		}//End if condition
	};

	interval = 0;
	timer = (item, index, currentTime, serviceTimeTableId = false) => {
		this.setState({ timerStart: true, serviceDetailsForTimer: item });
		window.localStorage.setItem("aul-app-timer-data", JSON.stringify(item));
		window.localStorage.setItem("aul-app-timer-start-time", currentTime);
		window.localStorage.setItem("aul-app-timer-item-index", index);
		serviceTimeTableId && window.localStorage.setItem("aul-app-timer-start-time-table-id", serviceTimeTableId);
		//Remove Service from list on start timer
		let service = this.state.data.today;
		service.splice(index, 1);
		this.setState({ data: { ...this.state.data, today: service } });

		this.interval = setInterval(() => {
			var time = this.state.time;
			time.sec = time.sec + 1;
			if (time.sec === 60) {
				time.sec = 0;
				time.min = time.min + 1;
			}//End if condition
			if (time.min === 60) {
				time.min = 0;
				time.hour = time.hour + 1;
			}//End if condition
			var h = time.hour.toString().length === 1 ? '0' + time.hour : time.hour;
			var m = time.min.toString().length === 1 ? '0' + time.min : time.min;
			var s = time.sec.toString().length === 1 ? '0' + time.sec : time.sec;
			this.setState({ time, showTimer: `${h}:${m}:${s}` })
			window.localStorage.setItem("aul-app-timer", JSON.stringify(time));
		}, 1000);
	}//End function

	startCounting = (item, index) => {
		let currentTime = GetCurrentTime();
		let timeStartLoader = this.state.timeStartLoader;
		timeStartLoader[index] = true;
		this.setState({ timeStartLoader, timeStartLoaderOverall: true });
		let postObj = { ...item, start_time: currentTime };
		HTTP('post', '/servicePlaining/post/serviceTimeStart', postObj).then(res => {
			timeStartLoader[index] = false;
			this.setState({ timeStartLoader, timeStartLoaderOverall: false, timerStart: false, currentTime: currentTime });
			if (!res) { return false; }
			this.timer(item, index, currentTime, res.id);
		});//End post
	}//End function

	stopCounting = (data) => {
		clearInterval(this.interval);
		this.setState({ time: { sec: 0, min: 0, hour: 0 } })
		const st = this.state;
		let postObj = {
			service_plaining_ref_id: st.serviceDetailsForTimer.id,
			shift_no: st.serviceDetailsForTimer.shift_no,
			service_ref_id: st.serviceDetailsForTimer.service_ref_id,
			client_ref_id: st.serviceDetailsForTimer.client_ref_id,
			spw_ref_id: st.serviceDetailsForTimer.spw_ref_id,
			spw2_ref_id: st.serviceDetailsForTimer.spw_partner_ref_id,
			last_done: st.serviceDetailsForTimer.last_done,
			start_time_actual: st.serviceDetailsForTimer.service_start_time,
			end_time_actual: st.serviceDetailsForTimer.service_end_time,
			request_id: st.serviceDetailsForTimer.request_id,
			// request_no: st.serviceDetailsForTimer.request_no,
			replaced_spw_id: st.serviceDetailsForTimer.replaced_spw_id,
			start_time: data.start_time,
			end_time: data.end_time,
			service_time_table_ref_id: window.localStorage.getItem("aul-app-timer-start-time-table-id"),
			timesheetsData: JSON.stringify(data)
		}
		this.setState({ timeEndLoader: true });
		HTTP('post', '/servicePlaining/post/serviceTime', postObj).then(res => {
			this.setState({ timeEndLoader: false, timerStart: false });
			if (!res) { return false; }
			window.localStorage.removeItem("aul-app-timer");
			window.localStorage.removeItem("aul-app-timer-data");
			window.localStorage.removeItem("aul-app-timer-item-index");
			window.localStorage.removeItem("aul-app-timer-start-time");
			window.localStorage.removeItem("aul-app-timer-start-time-table-id");
			this.setState({ visibleServiceWidgetTimerEndModal: false })
			this.getData(this.getDataCallBack);
		});
	}//End function

	checkSessionAndOpenModal = () => {
		this.setState({ timeEndLoader: true });
		HTTP('get', '/checkSession/get').then(res => {
			this.setState({ timeEndLoader: false });
			if (!res) { return false; }
			this.setState({ visibleServiceWidgetTimerEndModal: true }, () => { clearInterval(this.interval); })
		});
	}//End function

	isUnattendedShift = (startTime) => {
		// console.log(this.state.ads.unattendedMaxTimeInMinutes);
		let unattendedMaxTimeInMinutes = this.state.ads.unattendedMaxTimeInMinutes;
		// let umt = ads.unattendedMaxTimeInMinutes ? ads.unattendedMaxTimeInMinutes : null;
		// var res = false;
		// if (ads) {
		var format = 'hh:mm:ss';
		var timeOfUnattended = moment(startTime, format).add(unattendedMaxTimeInMinutes, 'minutes').format(format);
		var currentDate = moment(GetCurrentTime(), format);
		var compareDate = moment(timeOfUnattended, format);
		// console.log(startTime, currentDate.isAfter(compareDate));
		return (currentDate.isSame(compareDate) || currentDate.isAfter(compareDate)) ? true : false;
		// }//End if condition
		// return res;
	}//End if condition

	ableToStartOnTime = (startTime) => {
		let ableToStartShiftBeforeMinutes = this.state.ads.ableToStartShiftBeforeMinutes;
		var format = 'hh:mm:ss A';
		var timeOfUnattended = moment(startTime, format).add('-' + ableToStartShiftBeforeMinutes, 'minutes').format(format);
		// console.log(startTime,timeOfUnattended);
		var currentDate = moment(GetCurrentTime(), format);
		var compareDate = moment(timeOfUnattended, format);
		var res = (currentDate.isSame(compareDate) || currentDate.isAfter(compareDate)) ? false : true;

		// console.log(timeOfUnattended+', '+GetCurrentTime()+', '+res)// }//End if condition
		return res;
	}//End if condition

	serviceBox = (data, keyword) => {
		var type = '';
		if (keyword === 'pending') { type = '1'; }
		if (keyword === 'today') { type = '2'; }
		if (keyword === 'start') { type = '3'; }
		if (keyword === 'todayDone') { type = '4'; }

		return data.map((item, i) => {
			var toLateToStart = this.isUnattendedShift(item.service_start_time);
			var startBefore = this.ableToStartOnTime(item.service_start_time);
			return (
				<div key={i} className={`${keyword}-services specific-border-${type === '4' ? '2' : type}`}>
					<div className="flex-sb-m client-name">
						<span><strong className="fs-16">{item.client_name}</strong></span>
						<div>
							<Dropdown overlay={
								<Menu>
									{/* (!this.state.timerStart && type !== '3') &&  */}
									{item.replacementRequested ?
										<Menu.Item key={'request'}><button className="btnToLink w-full text-left m-r-5" onClick={() => this.setState({ viewRequestReasonModal: true, requestReasonToShow: item.replacementRequestedReason })}><i className="las la-exclamation-circle fs-18 pos-relative top-1" /> Replacement Request Reason</button></Menu.Item> :
										(type !== '3' && type !== '4') && <Menu.Item><button className="btnToLink w-full text-left m-r-5" size="small" onClick={() => this.setState({ selectedShift: item, viewReplacementRequestModal: true })}><i className="las la-sync fs-18 pos-relative top-1" /> Shift Replacement Request</button></Menu.Item>
									}
									<Menu.Item key={'progressNote'}><button className="btnToLink w-full text-left m-r-5" onClick={() => this.setState({ viewProgressNoteModal: true, selectedClientIdForProgressNote: item.client_ref_id })}><i className="las la-file-alt fs-18 pos-relative top-1" /> Add Progress Notes</button></Menu.Item>
									<Menu.Item key={'statusNote'}><button className="btnToLink w-full text-left m-r-5" onClick={() => this.setState({ viewNoteModal: true, selectedClientIdForStatusNote: item.client_ref_id })}><i className="las la-sticky-note fs-18 pos-relative top-1" /> Add Status Notes</button></Menu.Item>
									<Menu.Item key={'appointment'}><button className="btnToLink w-full text-left m-r-5" onClick={() => this.setState({ viewAppointmentModal: true, selectedClientIdForAppointment: item.client_ref_id })}><i className="las la-calendar-day fs-18 pos-relative top-1" /> Add Appointment</button></Menu.Item>
									<Menu.Divider />
									<Menu.Item key={'carePlan'}><button className="btnToLink w-full text-left m-r-5" size="small" onClick={() => this.setState({ carePlanShowModal: true, selectedClientIdForCarePlan: item.client_ref_id })}><i className="las la-file-alt fs-18 pos-relative top-1" /> Care Plan of {item.client_name}</button></Menu.Item>
									<Menu.Item key={'shiftDetails'}><button className="btnToLink w-full text-left" onClick={() => this.setState({ viewModal: true, serviceRefId: item.id, editShiftId: item.shift_edit_ref_id })}><i className="las la-table fs-18 pos-relative top-1" /> View Shift Details</button></Menu.Item>
								</Menu>
							} trigger={['click']} placement="bottomRight" arrow>
								<Button type="primary" ghost className="dropdown-list-cus m-r-5" size="small"><i className="las la-bars pos-relative top-1" /></Button>
							</Dropdown>
							{/* 
							{item.replacementRequested ?
								<Tooltip title="Replacement Request Reason" placement="top"><Button type="primary" ghost className="view-reason m-r-5" size="small" onClick={() => this.setState({ viewRequestReasonModal: true, requestReasonToShow: item.replacementRequestedReason })}><i className="las la-exclamation-circle pos-relative top-1" /></Button></Tooltip> :
								(!this.state.timerStart && type !== '2') && <Tooltip title="Shift Replacement Request" placement="top"><Button type="primary" ghost className="replacement-btn m-r-5" size="small" onClick={() => this.setState({ selectedShift: item, viewReplacementRequestModal: true })}><i className="las la-sync" /></Button></Tooltip>
							}
							<Tooltip title="Care Plan" placement="top"><Button type="primary" ghost className="view-progress-notes m-r-5" size="small" onClick={() => this.setState({ carePlanShowModal: true, selectedClientIdForCarePlan: item.client_ref_id })}><i className="las la-file-alt" /></Button></Tooltip>
							<Tooltip title="Progress Notes" placement="top"><Button type="primary" ghost className="view-progress-notes m-r-5" size="small" onClick={() => this.setState({ viewProgressNoteModal: true, selectedClientIdForProgressNote: item.client_ref_id })}><i className="las la-file-alt" /></Button></Tooltip>
							<Tooltip title="Status Notes" placement="top"><Button type="primary" ghost className="view-notes m-r-5" size="small" onClick={() => this.setState({ viewNoteModal: true, selectedClientIdForStatusNote: item.client_ref_id })}><i className="las la-sticky-note" /></Button></Tooltip>
							<Tooltip title="View Details" placement="top"><Button type="primary" ghost className="view-details" size="small" onClick={() => this.setState({ viewModal: true, serviceRefId: item.id })}><i className="las la-bars" /></Button></Tooltip> */}
						</div>
					</div>
					<span className="fw-500">{item.service_name}</span><br />
					<div className="fs-12"><em>{item.street_address}</em></div>
					<span className="fw-500 fs-12">(Shift # {item.shift_no})</span>

					{
						type === '3' &&
						<React.Fragment>
							<hr className="hr-1" />
							{/* <div className="timer">{this.state.showTimer}</div> */}
							<div className="timer">Started at {this.state.start_time_server ? this.state.start_time_server : this.state.currentTime}</div>
							<Row gutter={window.rowGutterSmall}>
								<Col lg={12} md={12} sm={12} xs={12}>
									<Button type="primary" className="startDisabledBtn" disabled><i className="las la-clock fs-16 pos-relative top-1 m-r-3" /> Start Shift</Button>
								</Col>
								<Col lg={12} md={12} sm={12} xs={12}>
									<Popconfirm
										placement="topRight"
										title={<span>Are you sure to stop timer?</span>}
										onConfirm={() => this.checkSessionAndOpenModal()}
										okText="Yes"
										cancelText="No"
									>
										<Button type="dashed" className="endShift" loading={this.state.timeEndLoader}><i className="las la-user-clock fs-16 pos-relative top-1 m-r-3" /> End Shift</Button>
									</Popconfirm>
								</Col>
							</Row>
						</React.Fragment>
					}

					<hr className="hr-1" />
					{/* <div className="flex-l-m fs-12"> */}
					<div className="fs-12 flex-sb-m w-full">
						<div><strong>{item.service_day && item.service_day + ' - '} {item.service_start_time} to {item.service_end_time}</strong></div>
						<div className="text-right"><strong>{item.hour}</strong></div>
					</div>

					<div className="fs-12 flex-sb-m w-full">
						<div>{item.frequency_name} {item.service_date && ' | ' + item.service_date}</div>
						<div className="text-right">
							<div>
								{item.meal_break_min && <span><strong>{item.meal_break_min} Min</strong> Meal Break</span>}
								{(item.meal_break_min && item.rest_break_min) && ' | '}
								{item.rest_break_min && <span><strong>{item.rest_break_min} Min</strong> Rest Break</span>}
							</div>
						</div>
					</div>

					{
						type === '4' &&
						<React.Fragment>
							<hr className="hr-1" />
							<div className="fs-12 flex-sb-m w-full">
								<div><strong>Done Today: </strong>{item.done_start_time} <strong>to</strong> {item.done_end_time}</div>
								<div className="text-right"><strong>{item.done_hour}</strong></div>
							</div>
						</React.Fragment>
					}


					{/* </div> */}
					{
						item.partner_display_name &&
						<React.Fragment>
							<hr className="hr-1" />
							<div className="fs-12 flex-l-m">
								<div>
									<Tooltip title={item.partner_display_name} placement="top">
										<Avatar className="avatar-color-1" src={item.partner_display_img}>{item.partner_display_slug}</Avatar>
									</Tooltip>
								</div>
								<div className="p-l-10">
									<strong>{item.partner_display_name}</strong>
									<div>Service assigned with Partner</div>
								</div>
							</div>
						</React.Fragment>
					}
					{
						item.remarks ?
							<div className="fs-12">
								<hr className="hr-1" />
								{/* <strong>Remarks:</strong> <span className="textbox-value">{item.remarks}</span> */}
								<strong>Remarks:</strong> {item.remarks}
							</div>
							: ''
					}
					{
						(!this.state.timerStart && type === '2') &&
						<React.Fragment>
							<hr className="hr-1" />

							{item.replacementRequested ?
								<Button type="primary" disabled={true} className="replacementReqBtnDisabled">Requested for Replacement</Button>
								:
								<Row gutter={window.rowGutterSmall}>
									{!item.request_no &&
										<Col lg={12} md={12} sm={12} xs={24} className='m-t-5'>
											<Button type="primary" className={!toLateToStart ? 'replacementReqBtn' : 'replacementReqBtnDisabled'} onClick={() => this.setState({ selectedShift: item, viewReplacementRequestModal: true })} disabled={toLateToStart}><i className="las la-sync fs-16 pos-relative top-1 m-r-3" /> Request for Replacement</Button>
										</Col>
									}
									<Col lg={item.request_no ? 24 : 12} md={item.request_no ? 24 : 12} sm={item.request_no ? 24 : 12} xs={24} className='m-t-5'>
										<Popconfirm
											placement="topRight"
											title={<span>Are you sure to start timer?</span>}
											onConfirm={() => this.startCounting(item, i)}
											okText="Yes"
											cancelText="No"
											disabled={toLateToStart || startBefore}
										>
											<Button type="primary" className="startBtn" loading={this.state.timeStartLoader[i]} disabled={toLateToStart || startBefore}>
												<i className="las la-clock fs-16 pos-relative top-1 m-r-3" />
												{toLateToStart ? this.state.ads.unattendedMaxTimeMessageOnStartTimeBtn :
													(startBefore ? this.state.ads.ableToStartShiftBeforeMessageOnStartTimeBtn : 'Start Shift')
												}
											</Button>
										</Popconfirm>
									</Col>
								</Row>
							}
						</React.Fragment>
					}
				</div>
			)
		})
	}//End function

	render() {
		const st = this.state;
		const pr = this.props;
		const pendingServices = this.serviceBox(st.data.pending, 'pending');
		const todayServices = this.serviceBox(st.data.today, 'today');
		const todayDoneServices = this.serviceBox(st.data.todayDone, 'todayDone');
		const startedServices = st.timerStart && this.serviceBox([st.serviceDetailsForTimer], 'start');
		const today =
			<ScreenLoader active={st.loader}>
				{st.loader && <div className="h-200"></div>}
				{startedServices}
				{(pr.heading && st.data.today.length > 0) && <h2 className="heading">All Today's Services</h2>}
				{(st.data.today.length === 0 && st.data.noTodayServiceMsg && st.data.noTodayServiceMsg.title) && <Alert message={st.data.noTodayServiceMsg.title} description={st.data.noTodayServiceMsg.msg} type="info" showIcon />}
				{todayServices}
			</ScreenLoader>
		const todayWithContainer = <div className="container">{today}</div>;

		const todayDone =
			<ScreenLoader active={st.loader}>
				{st.loader && <div className="h-200"></div>}
				{(pr.heading && st.data.todayDone.length > 0) && <h2 className="heading">All Today's Done Services</h2>}
				{(st.data.todayDone.length === 0 && st.data.noTodayDoneServiceMsg && st.data.noTodayDoneServiceMsg.title) && <Alert message={st.data.noTodayDoneServiceMsg.title} description={st.data.noTodayDoneServiceMsg.msg} type="info" showIcon />}
				{todayDoneServices}
			</ScreenLoader>
		const todayDoneWithContainer = <div className="container">{todayDone}</div>;

		const pending =
			<ScreenLoader active={st.loader}>
				{st.loader && <div className="h-200"></div>}
				{(pr.heading && st.data.pending.length > 0) && <h2 className="heading">All Pending Services</h2>}
				{(st.data.pending.length === 0 && st.data.noPendingServiceMsg && st.data.noPendingServiceMsg.title) && <Alert message={st.data.noPendingServiceMsg.title} description={st.data.noPendingServiceMsg.msg} type="info" showIcon />}
				{pendingServices}
			</ScreenLoader>
		const pendingWithContainer = <div className="container">{pending}</div>;

		const todayAndPending =
			<Row gutter={window.rowGutter}>
				<Col lg={12} md={24} sm={24} xs={24}>
					<div className="container">{today}</div>
				</Col>
				<Col lg={12} md={24} sm={24} xs={24} className="c-wv-m-t-m">
					{st.data.todayDone.length > 0 && <div className="container m-b-15">{todayDone}</div>}
					<div className="container">{pending}</div>
				</Col>
			</Row>
		return (
			<div className="service-available-container">
				{pr.today && today}
				{pr.todayWithContainer && todayWithContainer}
				{pr.todayDone && todayDone}
				{pr.todayDoneWithContainer && todayDoneWithContainer}
				{pr.pending && pending}
				{pr.pendingWithContainer && pendingWithContainer}
				{(!pr.today && !pr.pending && !pr.todayWithContainer && !pr.pendingWithContainer) && todayAndPending}
				{/* <div className="refresh-btn"><Button size="small" onClick={() => this.getData(this.getDataCallBack)}><i className="las la-sync" /> &nbsp; Refresh</Button></div> */}

				<Modal
					width={740}
					maskClosable={false}
					className="hide-footer"
					centered={true}
					// title={'Add Time Sheet'}
					visible={st.visibleServiceWidgetTimerEndModal}
					destroyOnClose={true}
				>
					{/* <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.onClose()}><i className="las la-times" /></button> */}
					<div className="modal-modern-title">
						<div>
							<span className="title">Submit Shift</span>
							<span className="sub-title">Shift will be send from Approval after Submission</span>
						</div>
					</div>
					<ServiceWidgetTimerEndModal data={{
						...st.serviceDetailsForTimer,
						start_time: st.start_time_server ? st.start_time_server : localStorage.getItem("aul-app-timer-start-time")
					}} onSubmit={(e) => {
						this.stopCounting(e);
						// this.setState({ visibleServiceWidgetTimerEndModal: false })
					}} loader={st.timeEndLoader} />
				</Modal>
				<ProgressNoteFormModal show={st.viewProgressNoteModal} clientId={st.selectedClientIdForProgressNote} onClose={() => this.setState({ viewProgressNoteModal: false })} />
				<AddNoteModule clientId={st.selectedClientIdForStatusNote} show={st.viewNoteModal} onClose={() => this.setState({ viewNoteModal: false })} />
				<AddAppointmentModule clientId={st.selectedClientIdForAppointment} show={st.viewAppointmentModal} onClose={() => this.setState({ viewAppointmentModal: false })} />

				<ReplacementRequestModule selectedShift={st.selectedShift} show={st.viewReplacementRequestModal} onClose={(reload) => { this.setState({ viewReplacementRequestModal: false }); reload && this.getData(this.getDataCallBack); }} />
				<ViewDetailModal dataId={st.serviceRefId} editShiftId={st.editShiftId} viewToSP={true} show={st.viewModal} onClose={() => this.setState({ viewModal: false })} />
				<ShowRequestReasonModal show={st.viewRequestReasonModal} data={st.requestReasonToShow} onClose={() => this.setState({ viewRequestReasonModal: false })} />
				<CarePlanModal show={st.carePlanShowModal} clientId={st.selectedClientIdForCarePlan} onClose={() => this.setState({ carePlanShowModal: false })} />
			</div>
		)//End return
	}//End render
	componentDidMount() { this.getData(this.getDataCallBack); }//End componentDidMount
}//End class
export default ServiceWidget;