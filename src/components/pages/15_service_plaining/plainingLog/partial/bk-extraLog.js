import React, { Component } from 'react'
import { Tabs, Tooltip, Popconfirm } from 'antd';
import { HTTP, LogDeleteRow, SaveArrLocalStorage, AccessControl, TableColumnFilter } from '../../../../services';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
import ViewDetailModal from './viewDetailModal';

const { TabPane } = Tabs;

class ExtraLog extends Component {
	state = {
		getLoader: false,
		data: [],
		updateStatusLoader: {},
		updateStatusBulkLoader: false,
		visibleViewModal: false,
		viewData: {},
		tabStatus: [
			// { 'name': 'active', 'status': 'Active', 'icon': 'las la-check-circle' },
			AccessControl(60) && { 'name': 'approve', 'status': 'Approved', 'icon': 'las la-check-circle' },
			AccessControl(56) && { 'name': 'unapproved', 'status': 'Unapproved', 'icon': 'las la-exclamation-circle' },
			AccessControl(63) && { 'name': 'on_hold', 'status': 'On Hold', 'icon': 'las la-pause-circle' },
			AccessControl(67) && { 'name': 'deleted', 'status': 'Deleted', 'icon': 'las la-times-circle' }
		],
		bulkActionTabStatus: [],
		currentTabIndex: '0',
		resetSelectedRow: false
	}//End state

	getData = (statusIndex) => {
		let status = this.state.tabStatus[statusIndex].name;
		this.setState({ currentTabIndex: statusIndex });
		this.setState({ getLoader: true });
		HTTP('get', '/servicePlaining/get/getListExtra/' + status).then(res => {
			this.setState({ getLoader: false });
			if (!res) { return false; }
			this.setState({ data: res.data })
			// console.log(res.data);
			//Set Bulk Action status list
			let bats = [];
			this.state.tabStatus.forEach(item => { (status !== item.name) && bats.push({ 'label': item.status, 'value': item.name, 'bulkActionMsg': 'Are you sure to change status as ' + item.status + '?', 'bulkActionBottomBtnLabel': 'Change Status' }) })
			this.setState({ bulkActionTabStatus: bats });
		});
	}//End function

	updateStatus = (row, status) => {
		let data = { id: row.id, status: status };
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
		const columns = [
			{
				title: 'Sr',
				dataIndex: 'key',
				width: '5%',
				sorter: (a, b) => a.key - b.key,
			}, {
				// 	title: 'Client Name',
				// 	dataIndex: 'client_name',
				// 	width: '19%',
				// 	sorter: (a, b) => a.client_name.localeCompare(b.client_name),
				// }, {
				title: 'Support Worker & Partner',
				dataIndex: 'swp_name',
				width: '15%',
				sorter: (a, b) => a.swp_name.localeCompare(b.swp_name),
				...TableColumnFilter('swp_name')
			}, {
				title: 'Client Name',
				dataIndex: 'client_name',
				width: '12%',
				sorter: (a, b) => a.client_name.localeCompare(b.client_name),
				...TableColumnFilter('client_name')
			}, {
				title: 'Service',
				dataIndex: 'service_name',
				width: '14%',
				sorter: (a, b) => a.service_name.localeCompare(b.service_name),
				...TableColumnFilter('service_name')
			}, {
				title: 'Frequency',
				dataIndex: 'frequency',
				width: '8%',
				sorter: (a, b) => a.frequency.localeCompare(b.frequency),
				...TableColumnFilter('frequency')
			}, {
				title: 'Day / Date',
				dataIndex: 'service_day',
				width: '8%',
				sorter: (a, b) => a.service_day.localeCompare(b.service_day),
				...TableColumnFilter('service_day')
			}, {
				title: 'Start Time',
				dataIndex: 'service_start_time',
				width: '8%',
				sorter: (a, b) => a.service_start_time.localeCompare(b.service_start_time),
				...TableColumnFilter('service_start_time')
			}, {
				title: 'End Time',
				dataIndex: 'service_end_time',
				width: '8%',
				sorter: (a, b) => a.service_end_time.localeCompare(b.service_end_time),
				...TableColumnFilter('service_end_time')
			}, {
				title: 'Total Time',
				dataIndex: 'hour',
				width: '8%',
				sorter: (a, b) => a.hour.localeCompare(b.hour),
				...TableColumnFilter('hour')
			}
		];
		AccessControl('57,61,63,68,58,89,65,69,59,62,66,70') &&
			columns.push({
				title: 'Action',
				align: 'center',
				width: '14%',
				render: (record, row) => {

					var statusCondition = ((row.status === 'unapproved' && AccessControl(57)) ||
						(row.status === 'approve' && AccessControl(61)) ||
						(row.status === 'on_hold' && AccessControl(63)) ||
						(row.status === 'deleted' && AccessControl(68))) ? true : false;

					var editCondition = ((row.status === 'unapproved' && AccessControl(58)) ||
						(row.status === 'approve' && AccessControl(89)) ||
						(row.status === 'on_hold' && AccessControl(65)) ||
						(row.status === 'deleted' && AccessControl(69))) ? true : false;

					var viewCondition = ((row.status === 'unapproved' && AccessControl(59)) ||
						(row.status === 'approve' && AccessControl(62)) ||
						(row.status === 'on_hold' && AccessControl(66)) ||
						(row.status === 'deleted' && AccessControl(70))) ? true : false;

					return (
						<div className="text-center">
							<ScreenLoader active={this.state.updateStatusLoader[row.id]} inline={true} tip="Please wait...">

								{viewCondition &&
									<Tooltip placement="top" title="View Details">
										<button className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, viewData: row })}><i className="fs-18 las la-table link-color"></i></button>
									</Tooltip>
								}

								{(editCondition && (row.status !== 'deleted')) &&
									<React.Fragment>
										<i className="list_view_icon_sap las la-redo"></i>
										<Tooltip placement="top" title="Edit Data">
											<button className="btnToLink" onClick={() => { SaveArrLocalStorage(row.id, "servicePlainForm") }}><i className="fs-18 las la-edit link-color"></i></button>
										</Tooltip>
									</React.Fragment>
								}

								{statusCondition &&
									<React.Fragment>
										{row.status !== 'unapproved' &&
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
							</ScreenLoader>
						</div>)
				}
			});
		const st = this.state;
		return (
			<div>
				<ScreenLoader active={st.getLoader}>
					{/* {st.getLoader && <div className="h-200"></div>} */}
					<Tabs type="card" defaultActiveKey={st.currentTabIndex.toString()} onChange={(e) => this.getData(e)}>
						{st.tabStatus.map((item, index) => {
							return (
								<TabPane tab={<span><i className={item.icon} /> {item.status}</span>} key={index}>
									{!st.resetSelectedRow && <DataTable
										columns={columns}
										styleType={2}
										dataSource={st.data}
										showSizeChanger={true}
										pagination={{ itemDetails: true, showOnSinglePage: true }}
										customFilter="true"
										customFilterLabel="Filter by"
										customFilterCol={[
											{ label: 'Support Worker & Partner', value: 'swp_name' },
											{ label: 'Client Name', value: 'client_name' },
											{ label: 'Service', value: 'service_name' },
											{ label: 'Frequency', value: 'frequency' },
											{ label: 'Day / Date', value: 'service_day_date' },
											{ label: 'Start Time', value: 'service_start_time' },
											{ label: 'End Time', value: 'service_end_time' },
											{ label: 'Total Hours', value: 'hour' }
										]}
										label="Extra Service Plaining"
										desc={`All extra and ${item.name.replace('_', ' ')} service plaining list are below.`}
										bulkAction={st.bulkActionTabStatus}
										bulkActionHandler={(rows, value) => this.bulkUpdateStatus(rows, value)}
										rowSelection={true}
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
export default ExtraLog;