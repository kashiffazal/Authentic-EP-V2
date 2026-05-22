import React, { Component } from 'react';
import PageTitle from '../../mutual/pageTitle';
import ViewPDFInModal from '../../mutual/viewPDFInModal';
import { Row, Col, Spin, Button } from 'antd';
import SupportWorkerFormExternal from './mainForm';
import { HTTP } from '../../../services';

class SupportWorkerFormInternal extends Component {
	state = {
		getLoader: false,
		recentData: [],
		visibleViewModal: false,
		pdf_path: '',
		spName: ''
	}
	render() {
		const st = this.state;
		//console.log(this.props.match.params);
		return (
			<React.Fragment>
				<PageTitle
					titleIcon="las la-file-medical"
					titleSpan="Support Worker"
					titleHeading="Form"
					titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
					breadcrumb={[
						{ iconLas: 'las la-id-card-alt', label: 'Support Worker' },
						{ iconLas: 'las la-arrow-alt-circle-down', label: 'SW Form' },
						{ iconLas: 'las la-file-medical', label: 'Add New' }
					]}
					breadcrumbWithRender={
						<div className="renderContentWithBreadcrumb">
							<Button size="small" ghost type="primary" className="m-b-0" onClick={() => window.open(process.env.PUBLIC_URL + '/#/externalWebPages/supportWorkerForm', "_blank")}>External Form</Button>
						</div>
					}
				/>
				<Row gutter={window.rowGutter}>
					<Col lg={19} md={24} sm={24} xs={24}>
						<div className="container">
							<SupportWorkerFormExternal
								id={this.props.match.params.id ? this.props.match.params.id : ''}
								internalForm={true}
							/>
						</div>
					</Col>
					<Col lg={5} md={24} sm={24} xs={24}>
						{!window.webviewMobile &&
							<div className="widget_container">
								<div className="container">
									<h2 className="m-0"><span className="fw-400">Recent</span> Data</h2>
									<hr className="hr-1" />
									<Spin tip="loading" spinning={st.getLoader}>
										{st.getLoader ? <div style={{ height: '261px' }}></div> :
											st.recentData.map(item => {
												return (
													<div key={item.key} className="widget-list">
														<p>
															<strong className="dim-color">{item.name}</strong><br />
															<span>{item.status} <i className="las la-arrow-right" /> <button className="btnToLink link-color" onClick={() => this.setState({ visibleViewModal: true, pdf_path: item.pdf_path, spName: item.name })}>View Details</button></span>
														</p>
													</div>
												)
											})
										}
									</Spin>
								</div>
								<ViewPDFInModal title={'View Support Worker Detailed File - ' + st.spName} show={st.visibleViewModal} close={() => this.setState({ visibleViewModal: false })} pdfPath={st.pdf_path} />
							</div>
						}
					</Col>
				</Row>
			</React.Fragment>
		)//End Return statement
	}//End End Render
	componentDidMount() {
		if (!window.webviewMobile) {
			this.setState({ getLoader: true });
			HTTP('get', '/supportWorker/get/getRecentSP/').then(res => {
				this.setState({ getLoader: false });
				if (!res) return false;
				this.setState({ recentData: res.data });
			});
		}//End if condition
	}//End componentDidMount
}//End class

export default SupportWorkerFormInternal;