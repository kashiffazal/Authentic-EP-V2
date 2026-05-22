import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class ClientFormFirstMsg extends Component {

	state = {
		viewModal: false
	}

	formRef = React.createRef();

	submitForm = (values) => {
		// e.preventDefault();
		// this.props.form.validateFields((err, values) => {
		// if (err) { return false }//End if condition
		this.props.getData(values.draftId);
		// });
	}//End conditoin

	render() {
		const st = this.state;
		return (
			<div className="thank_you_container">
				<ExclamationCircleOutlined className="icon_start" style={{ fontSize: '20px' }} />
				<br /><br />
				<p><strong>Before you go further</strong></p>
				<hr className="form_hr" />
				<h3>Please prepare the following documents before proceeding on the next step so that you can upload in the end of this form easily. We give priority to those applications who are summitted with complete documents: (you can still continue the application if you don't have any document and can send us later)</h3>
				<hr className="form_hr" />
				<ul className="thank_you_list">
					<li>Resume</li>
					<li>Driving License</li>
					<li>Car Insurance details</li>
					<li>Passport copy (if you are a foreigner)</li>
					<li>Current Police Check (if you are foreigner and here in Australia in less than 10 years, please provide international police check)</li>
					<li>Working with Children Card</li>
					<li>First Aid Certificate</li>
					<li>Manual Handling Certificate </li>
					<li>Food Handling Certificate</li>
					<li>If you're a foreigner, please provide evidence of working or visa</li>
					<li>NDIS Worker Orientation Completion Certificate</li>
					<li>Diploma of Nursing  Certificate 4 in Aged Care</li>
					<li>Certificate 3 in Disability or Individual Support</li>
					<li>Certificate 4 in Disability or Individual Support</li>
					<li>Certificate 4 or Diploma in Mental Health</li>
					<li>Any other relevant qualifications</li>
				</ul>
				<div className="processBtn">
					<Button type="primary" onClick={() => this.props.startForm()}>Process</Button>
				</div>
				<button className="btnToLink draftIdLink" onClick={() => this.setState({ viewModal: true })}>Do you have draft ID?</button>


				<Modal
					width={560}
					maskClosable={false}
					className="hide-footer"
					centered={true}
					title={'Insert draft ID'}
					visible={st.viewModal}
					onOk={() => this.setState({ viewModal: false })}
					onCancel={() => this.setState({ viewModal: false })}
				>
					<button type="button" className="hide-header-close-btn btnToLink" onClick={() => this.setState({ viewModal: false })}><i className="las la-times" /></button>
					<div className="modal-modern-title">
						<div>
							<span className="title">Insert Draft ID</span>
							<span className="sub-title">Draft ID to continue your form Submission</span>
						</div>
					</div>
					<Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
						<Row gutter={window.rowGutterSmall}>
							<Col lg={18} md={18} sm={24} xs={24}>
								<AntInput placeholder="Please insert draft ID here" name="draftId" />
							</Col>
							<Col lg={6} md={6} sm={24} xs={24}>
								<Button size="large" className="w-full btn-field-size" type="primary" htmlType="submit" loading={this.props.loader}>Submit</Button>
							</Col>
						</Row>
					</Form>
				</Modal>

			</div>
		);//End return
	}//End render
}//End class

export default ClientFormFirstMsg;