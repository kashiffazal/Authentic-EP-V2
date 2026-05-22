import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class SupportWorkerFormFirstMsg extends Component {

	state = {
		viewModal: false
	}

	formRefFirst = React.createRef();

	submitForm = (values) => {
		// e.preventDefault();
		// this.props.form.validateFields((err, values) => {
		// if (err) { return false }//End if condition
		this.props.getData(values.draftId);
		// });
	}//End condition

	render() {
		const st = this.state;
		const data = this.props.data.companyDetails;
		// console.log(data);
		return (
			<div className="thank_you_container">
				<ExclamationCircleOutlined className="icon_start" style={{ fontSize: '20px' }} />
				<br /><br />
				<p><strong>Before you go further</strong></p>
				<hr className="form_hr" />
				<p>The applicant is required to fill in all the information in this application form. The information you provide along with the personal interview will be used to make a decision on your suitability for the position.</p>
				<h3 className="p-t-10">Important note:</h3>
				<p>This company is an EEO (Equal Employment Opportunity) employer and does not discriminate against any current or future staff. If you feel that at any stage this company or a representative of this company has discriminated against you, we encourage you to seek the appropriate legal advice.</p>
				<p>Prepare or make ready the following documents before proceeding on to the next step so that you can upload them at the end of this form easily.</p>
				<p>All the documents, training, or courses including 100 points of id are basic requirements for working as a disability support worker.</p>
				<p>The HR Team will give preference to the applicant who will provide all the documents in one hit.</p>
				<p>If you face any difficulties in uploading the documents in the application form, you can email us at <a href={`mailto:${data.emailSupport}`}>{data.emailSupport}</a>.</p>

				<p className="highlight_box">You role in the company will be a <strong>"Risk Assessed Role"</strong> please read more about how to Identify a risk-assessed role by <a target="blank" href={`${process.env.PUBLIC_URL}/doc/Identifying-a-risk-assessed-role.pdf`}>Clicking here</a>.</p>

				<hr className="form_hr" />
				<ul className="thank_you_list">
					<li>NDIS Workers Screening Check, if you don't have please apply <a target="blank" href="https://www.service.vic.gov.au/services/national-disability-insurance-scheme">here</a> online and then apply to the application as NDIS Workers Screening Check is a compulsory requirement from NDIS Commission for disability support workers.</li>
					<li>COVID - 19 Vaccinations Proof</li>
					<li>Resume</li>
					<li>Driving License</li>
					<li>Car Insurance details</li>
					<li>Car Registration details</li>
					<li>Passport copy (if you are a foreigner)</li>
					<li>Current Police Check (if you are a foreigner and here in Australia for less than 10 years, please provide an international police check)</li>
					<li>Working with Children's Card</li>
					<li>First Aid Certificate</li>
					<li>Manual Handling Certificate - if you have</li>
					<li>Food Handling Certificate - if you have</li>
					<li>If you're a foreigner, please provide evidence of working or visa</li>
					<li>NDIS Worker Orientation Completion Certificate, if you don’t have please apply <a target="blank" href="https://training.ndiscommission.gov.au/login/index.php">here</a>.</li>
					<li>Supporting Effective Communication, if you don’t have please apply <a target="blank" href="https://training.ndiscommission.gov.au/login/index.php">here</a>.</li>
					<li>COVID-19 Infection Control Training Certificate, if you don’t have please apply <a target="blank" href="https://covid-19training.gov.au/register">here</a>.</li>
					<li>Diploma of Nursing - if you have</li>
					<li>Certificate 4 in Aged Care - if you have</li>
					<li>Certificate 3 in Disability or Individual Support - if you have</li>
					<li>Certificate 4 in Disability or Individual Support - if you have</li>
					<li>Certificate 4 or Diploma in Mental Health - if you have</li>
					<li>Any other relevant qualifications</li>
				</ul>
				<div className="processBtn">
					<Button type="primary" onClick={() => this.props.startForm()}>Process</Button>
				</div>
				<button className="btnToLink draftIdLink" type="button" onClick={() => this.setState({ viewModal: true })}>Do you have draft ID?</button>


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
							<span className="sub-title">Draft ID to continue your form submission</span>
						</div>
					</div>
					{/* <button type="button" onClick={() => this.submitForm('UE1ZVzRFNkxWckt5VUR5c09aNENFQT09')}>Draft</button> */}
					<Form className="form-style-1" ref={this.formRefFirst} layout="vertical" onFinish={this.submitForm} autoComplete="off">
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

export default SupportWorkerFormFirstMsg;