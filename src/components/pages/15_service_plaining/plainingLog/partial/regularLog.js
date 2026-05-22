import React, { Component } from 'react'
import { Tabs, Tooltip, Popconfirm, Popover, Button } from 'antd';
import { HTTP, LogDeleteRow, SaveArrLocalStorage, AccessControl, TableColumnFilter, TableColumnListForSelectFilter } from '../../../../services';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
import ViewDetailModal from './viewDetailModal';

const { TabPane } = Tabs;

class RegularLog extends Component {
	state = {
		getMainLoader: false,
		getSpecificLoader: false,
		data: [],
		ads: {},//! App Default Settings,
		updateStatusLoader: {},
		updateStatusBulkLoader: false,
		visibleViewModal: false,
		viewData: {},
		statusList: {},
		// tabStatus: [
		// 	// { 'name': 'active', 'status': 'Active', 'icon': 'las la-check-circle' },
		// 	AccessControl(45) && { 'name': 'approve', 'status': 'Approved', 'icon': 'las la-check-circle' },
		// 	AccessControl(41) && { 'name': 'unapproved', 'status': 'Unapproved', 'icon': 'las la-exclamation-circle' },
		// 	AccessControl(48) && { 'name': 'on_hold', 'status': 'On Hold', 'icon': 'las la-pause-circle' },
		// 	AccessControl(52) && { 'name': 'deleted', 'status': 'Deleted', 'icon': 'las la-times-circle' }
		// ],
		bulkActionTabStatus: [],
		currentTabIndex: '0',
		resetSelectedRow: false,
		filterIndividualColArr: {}
	}//End state

	getData = (statusIndex) => {
		let statusKeys = Object.keys(this.state.statusList);
		let status = ((statusKeys.length > 0) ? statusKeys[statusIndex] : 'approve');
		this.setState({ currentTabIndex: statusIndex });

		if (statusKeys.length === 0) {
			//@ Loader at first time
			this.setState({ getMainLoader: true });
		} else {
			//@ Loader on change status or tab
			this.setState({ getSpecificLoader: true });
		}//End if condition
		HTTP('get', '/servicePlaining/get/getListRegular/' + status).then(res => {
			this.setState({ getMainLoader: false, getSpecificLoader: false });
			if (!res) { return false; }
			// console.log(res)
			this.setState({ data: res.data, statusList: res.statusList, ads: res.appDefaultSetting }, () => {
				//@ If individual filter in ON
				(this.state.ads.tableIndividualColFilter.allow && this.state.ads.tableIndividualColFilter.filterByTypeOrSelect === 'select') &&
					this.setState({ filterIndividualColArr: TableColumnListForSelectFilter(res.data) });
			})
			// console.log(res.data);
			//Set Bulk Action status list
			let bats = [];
			Object.keys(this.state.statusList).forEach(item => { (status !== this.state.statusList[item].name) && bats.push({ 'label': this.state.statusList[item].name, 'value': item, 'bulkActionMsg': 'Are you sure to change status as ' + this.state.statusList[item].name + '?', 'bulkActionBottomBtnLabel': 'Change Status' }) })
			this.setState({ bulkActionTabStatus: bats });
		});
	}//End function

	updateStatus = (row, status) => {
		let data = { id: row.id, status: status, appointment_ref_id: row.appointment_ref_id };
		let statusLoaderObj = {};
		statusLoaderObj[row.id] = true;
		this.setState({ updateStatusLoader: statusLoaderObj });
		HTTP('post', '/servicePlaining/post/changeStatus', data).then(res => {
			statusLoaderObj[row.id] = false;
			this.setState({ updateStatusLoader: statusLoaderObj, visibleViewModal: false });
			if (!res) { return false; }
			// this.updateListOnChangeStatus(row, status, row.status);
			// let newData = ;
			this.setState({ data: LogDeleteRow(row, this.state.data) });
		});
	}//End function

	bulkUpdateStatus = (rows, value) => {
		let ids = rows.selectedRowIds.join(',');
		let status = value;
		let postObj = { ids, status };
		this.setState({ updateStatusBulkLoader: true });
		HTTP('post', '/servicePlaining/post/changeStatusBulk', postObj).then(res => {
			this.setState({ updateStatusBulkLoader: false });
			if (!res) { return false; }

			let newData = this.state.data;
			rows.selectedRows.forEach(item => { newData = LogDeleteRow(item, newData); });
			this.setState({ data: newData, resetSelectedRow: true }, () => { this.setState({ resetSelectedRow: false }); });
		});
	}//End function

	render() {
		const st = this.state;
		const actionCol = (record, row, className = false) => {

			var statusCondition = (
				(row.status === 'approve' && AccessControl(78)) ||
				(row.status === 'unapproved' && AccessControl(82)) ||
				(row.status === 'on_hold' && AccessControl(86)) ||
				(row.status === 'deleted' && AccessControl(89))) ? true : false;

			var editCondition = (
				(row.status === 'approve' && AccessControl(77)) ||
				(row.status === 'unapproved' && AccessControl(81)) ||
				(row.status === 'on_hold' && AccessControl(85))) ? true : false;

			var viewCondition = (
				(row.status === 'approve' && AccessControl(76)) ||
				(row.status === 'unapproved' && AccessControl(80)) ||
				(row.status === 'on_hold' && AccessControl(84)) ||
				(row.status === 'deleted' && AccessControl(88))) ? true : false;
			return (
				<ScreenLoader active={this.state.updateStatusLoader[row.id]} inline={true} tip="Please wait...">
					<div className={`text-center ${className}`}>
						{viewCondition &&
							<Tooltip placement="top" title="View Details">
								<button className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, viewData: row })}><i className="fs-18 las la-table link-color"></i></button>
							</Tooltip>
						}

						{(editCondition && (row.status !== 'deleted' && !row.appointment_ref_id)) &&
							<React.Fragment>
								<i className="list_view_icon_sap las la-redo"></i>
								<Tooltip placement="top" title="Edit Data">
									<button className="btnToLink" onClick={() => { SaveArrLocalStorage(row.id, "servicePlainForm") }}><i className="fs-18 las la-edit link-color"></i></button>
								</Tooltip>
							</React.Fragment>
						}

						{(row.status !== 'unapproved' && !row.appointment_ref_id) && //@Appointment shift cannot be Unapproved
							<React.Fragment>
								<i className="list_view_icon_sap las la-redo"></i>
								<Tooltip placement="top" title="Unapproved">
									<Popconfirm
										placement="topRight"
										title={<span>Are you sure to change status as <b>Unapproved</b>?</span>}
										onConfirm={() => this.updateStatus(row, 'unapproved')}
										okText="Yes"
										cancelText="No"
									>
										<button className="btnToLink"><i className="fs-18 las la-exclamation-circle link-color"></i></button>
									</Popconfirm>
								</Tooltip>
							</React.Fragment>
						}
						{statusCondition &&
							<React.Fragment>
								{row.status !== 'approve' &&
									<React.Fragment>
										<i className="list_view_icon_sap las la-redo"></i>
										<Tooltip placement="top" title="Approve">
											<Popconfirm
												placement="topRight"
												title={<span>Are you sure to change status as <b>Approve</b>?</span>}
												onConfirm={() => this.updateStatus(row, 'approve')}
												okText="Yes"
												cancelText="No"
											>
												<button className="btnToLink"><i className="fs-18 las la-check-circle link-color"></i></button>
											</Popconfirm>
										</Tooltip>
									</React.Fragment>
								}

								{row.status !== 'on_hold' &&
									<React.Fragment>
										<i className="list_view_icon_sap las la-redo"></i>
										<Tooltip placement="top" title="On Hold">
											<Popconfirm
												placement="topRight"
												title={<span>Are you sure to change status as <b>On Hold</b>?</span>}
												onConfirm={() => this.updateStatus(row, 'on_hold')}
												okText="Yes"
												cancelText="No"
											>
												<button className="btnToLink"><i className="fs-18 las la-pause-circle link-color"></i></button>
											</Popconfirm>
										</Tooltip>
									</React.Fragment>
								}

								{row.status !== 'deleted' &&
									<React.Fragment>
										<i className="list_view_icon_sap las la-redo"></i>
										<Tooltip placement="top" title="Delete">
											<Popconfirm
												placement="topRight"
												title={<span>Are you sure to delete this record?</span>}
												onConfirm={() => this.updateStatus(row, 'deleted')}
												okText="Yes"
												cancelText="No"
											>
												<button className="btnToLink"><i className="fs-18 las la-times-circle link-color"></i></button>
											</Popconfirm>
										</Tooltip>
									</React.Fragment>
								}
							</React.Fragment>
						}
					</div>
				</ScreenLoader>)
		};

		const columns = [
			{
				title: 'Sr',
				dataIndex: 'key',
				width: '5%',
				fixed: 'left',
				sorter: (a, b) => a.key - b.key,
				render: (a, b) => <div title={`${b.appointment_ref_id ? a + ' - Appointment Shift' : a}`} className={`single-line-text ${b.appointment_ref_id ? 'appointment-row-col' : ''}`} >{a}</div>
			}, {
				title: 'Shift No.',
				dataIndex: 'shift_no',
				width: '7%',
				fixed: 'left',
				sorter: (a, b) => a.shift_no.localeCompare(b.shift_no),
				...TableColumnFilter(st.ads.tableIndividualColFilter, 'shift_no', st.filterIndividualColArr),
				render: (a, b) => <div title={`${b.appointment_ref_id ? a + ' - Appointment Shift' : a}`} className={`single-line-text ${b.appointment_ref_id ? 'appointment-row-col' : ''}`} >{a}</div>
			}, {
				title: 'Support Worker & Partner',
				dataIndex: 'swp_name',
				width: '13%',
				sorter: (a, b) => a.swp_name.localeCompare(b.swp_name),
				...TableColumnFilter(st.ads.tableIndividualColFilter, 'swp_name', st.filterIndividualColArr),
				render: (a, b) => <div title={`${b.appointment_ref_id ? a + ' - Appointment Shift' : a}`} className={`single-line-text ${b.appointment_ref_id ? 'appointment-row-col' : ''}`} >{a}</div>
			}, {
				title: 'Client Name',
				dataIndex: 'client_name',
				width: '10%',
				sorter: (a, b) => a.client_name.localeCompare(b.client_name),
				...TableColumnFilter(st.ads.tableIndividualColFilter, 'client_name', st.filterIndividualColArr),
				render: (a, b) => <div title={`${b.appointment_ref_id ? a + ' - Appointment Shift' : a}`} className={`single-line-text ${b.appointment_ref_id ? 'appointment-row-col' : ''}`} >{a}</div>
			}, {
				title: 'Service',
				dataIndex: 'service_name',
				width: '11%',
				sorter: (a, b) => a.service_name.localeCompare(b.service_name),
				...TableColumnFilter(st.ads.tableIndividualColFilter, 'service_name', st.filterIndividualColArr),
				render: (a, b) => <div title={`${b.appointment_ref_id ? a + ' - Appointment Shift' : a}`} className={`single-line-text ${b.appointment_ref_id ? 'appointment-row-col' : ''}`} >{a}</div>
			}, {
				title: 'Frequency',
				dataIndex: 'frequency',
				width: '8%',
				sorter: (a, b) => a.frequency.localeCompare(b.frequency),
				...TableColumnFilter(st.ads.tableIndividualColFilter, 'frequency', st.filterIndividualColArr),
				render: (a, b) => <div title={`${b.appointment_ref_id ? a + ' - Appointment Shift' : a}`} className={`single-line-text ${b.appointment_ref_id ? 'appointment-row-col' : ''}`} >{a}</div>
			}, {
				title: 'Day / Date',
				dataIndex: 'service_day_date',
				width: '8%',
				sorter: (a, b) => a.service_day_date.localeCompare(b.service_day_date),
				...TableColumnFilter(st.ads.tableIndividualColFilter, 'service_day_date', st.filterIndividualColArr),
				render: (a, b) => <div title={`${b.appointment_ref_id ? a + ' - Appointment Shift' : a}`} className={`single-line-text ${b.appointment_ref_id ? 'appointment-row-col' : ''}`} >{a}</div>
			}, {
				title: 'Start Time',
				dataIndex: 'service_start_time',
				width: '8%',
				sorter: (a, b) => a.service_start_time.localeCompare(b.service_start_time),
				...TableColumnFilter(st.ads.tableIndividualColFilter, 'service_start_time', st.filterIndividualColArr),
				render: (a, b) => <div title={`${b.appointment_ref_id ? a + ' - Appointment Shift' : a}`} className={`single-line-text ${b.appointment_ref_id ? 'appointment-row-col' : ''}`} >{a}</div>
			}, {
				title: 'End Time',
				dataIndex: 'service_end_time',
				width: '8%',
				sorter: (a, b) => a.service_end_time.localeCompare(b.service_end_time),
				...TableColumnFilter(st.ads.tableIndividualColFilter, 'service_end_time', st.filterIndividualColArr),
				render: (a, b) => <div title={`${b.appointment_ref_id ? a + ' - Appointment Shift' : a}`} className={`single-line-text ${b.appointment_ref_id ? 'appointment-row-col' : ''}`} >{a}</div>
			}, {
				title: 'Total Time',
				dataIndex: 'hour',
				width: '8%',
				sorter: (a, b) => a.hour.localeCompare(b.hour),
				...TableColumnFilter(st.ads.tableIndividualColFilter, 'hour', st.filterIndividualColArr),
				render: (a, b) => <div title={`${b.appointment_ref_id ? a + ' - Appointment Shift' : a}`} className={`single-line-text ${b.appointment_ref_id ? 'appointment-row-col' : ''}`} >{a}</div>
			}
		];
		AccessControl('76,77,78,80,81,82,84,85,86,88,89') &&
			columns.push({
				title: 'Action',
				align: 'center',
				width: '14%',
				fixed: 'right',
				render: (record, row) => actionCol(record, row)
			});


		//@ Mobile View Column
		const mobileCol = [{
			title: 'Shift No',
			dataIndex: 'shift_no',
			width: '100%',
			className: 'mobile-col',
			render: (record, row) =>
				<div className={`col-data ${row.appointment_ref_id ? 'appointment-row-col-mob' : ''}`} style={{ width: window.screenWidthMobile }}>
					<div className="details">
						<div className="icon">
							<Tooltip placement="topRight" title={st.statusList[row.status].name + (row.appointment_ref_id ? ' - Appointment Shift' : '')} trigger='click'>
								<i className={
									st.statusList[row.status]['mobileIcon'] ?
										st.statusList[row.status]['mobileIcon'] :
										st.statusList[row.status]['icon']
								} style={{ background: st.statusList[row.status]['color'] }} />
							</Tooltip>
						</div>
						<div className="data">
							<div className="main-value">{record} <span className="fs-12 fw-400">{row.service_name}</span></div>
							<div className="sub-value">
								<span className="label">SW:</span>
								<span className="value">{row.swp_name}</span>
							</div>
							<div className="foot-value">
								<span className="label">Time:</span>
								<span className="value">{row.service_start_time} to {row.service_end_time}, {row.hour}</span>
							</div>
						</div>
					</div>
					{AccessControl('76,77,78,80,81,82,84,85,86,88,89') &&
						<div className="action">
							<Popover content={actionCol(record, row, 'mobile-icon-menu-action')} trigger="click" placement="right">
								<Button size="small"><i className="las la-bars"></i></Button>
							</Popover>
						</div>}
				</div>
		}];



		return (
			<div className="regular-sp-log-container">
				<ScreenLoader active={st.getMainLoader || st.updateStatusBulkLoader || st.getSpecificLoader}>
					{st.getMainLoader && <div className="h-250"></div>}
					<Tabs type="card" defaultActiveKey={st.currentTabIndex.toString()} onChange={(e) => this.getData(e)}>
						{Object.keys(st.statusList).map((item, index) => {

							if (st.statusList[item].name === 'Approved' && !AccessControl(75)) { return false; }
							if (st.statusList[item].name === 'Unapproved' && !AccessControl(79)) { return false; }
							if (st.statusList[item].name === 'On Hold' && !AccessControl(83)) { return false; }
							if (st.statusList[item].name === 'Deleted' && !AccessControl(87)) { return false; }

							return (
								<TabPane tab={<span><i className={st.statusList[item].icon} style={{ color: st.statusList[item].color }} /> {st.statusList[item].name}</span>} key={index}>
									{!st.resetSelectedRow && <DataTable
										classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
										columns={window.webviewMobile ? mobileCol : columns}
										styleType={2}
										dataSource={st.data}
										showSizeChanger={true}
										pagination={{ itemDetails: true, showOnSinglePage: true }}
										customFilter="true"
										customFilterLabel="Filter by"
										customFilterCol={[
											{ label: 'Shift No', value: 'shift_no' },
											{ label: 'Support Worker & Partner', value: 'swp_name' },
											{ label: 'Client Name', value: 'client_name' },
											{ label: 'Service', value: 'service_name' },
											{ label: 'Frequency', value: 'frequency' },
											{ label: 'Day / Date', value: 'service_day_date' },
											{ label: 'Start Time', value: 'service_start_time' },
											{ label: 'End Time', value: 'service_end_time' },
											{ label: 'Total Hours', value: 'hour' }
										]}
										label={window.webviewMobile ? undefined : "Regular Service Plaining"}
										desc={window.webviewMobile ? undefined : `All regular and ${st.statusList[item].name.replace('_', ' ')} service plaining list are below.`}
										bulkAction={window.webviewMobile ? undefined : st.bulkActionTabStatus}
										bulkActionHandler={(rows, value) => this.bulkUpdateStatus(rows, value)}
										rowSelection={window.webviewMobile ? false : true}
										scroll={!window.webviewMobile && {
											x: 1600,
										}}
									/>}
								</TabPane>
							)
						})}
					</Tabs>
				</ScreenLoader>
				<ViewDetailModal dataId={st.viewData.id} show={st.visibleViewModal} onClose={() => this.setState({ visibleViewModal: false })} />
			</div>
		)//End return
	}//End render
	componentDidMount() { this.getData(0); }//End componentDidMount
}//End class
export default RegularLog;