import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class SupportWorkerFormDraftMsg extends Component {

	backToJob = () => {
		let th = this;
		confirm({
			title: 'Have you copy Draft ID and want to go to the Job List page?',
			// content: <div>All data will be lost after going back by clicking <strong>Yes</strong> button, on the other hand you can click <strong>No</strong> and <strong>Draft</strong> the application by clicking Draft button below and then go back. In this case you will receive a draft <strong>ID</strong>, save it anywhere. You can continue the application by providing the draft id any time on Support Worker Form.</div>,
			okText: "Yes",
			cancelText: "No",
			onOk() { th.props.backToJobList(); },
			onCancel() { },
		});
	}//End function

	render() {
		return (
			<div className="thank_you_container">
				<CheckCircleOutlined className="icon" style={{ fontSize: '20px' }} />
				<br /><br />
				<p>Your application has been <strong>Draft</strong></p>
				<h3>Please save the draft ID anywhere, you can continue the application form any time by providing this ID.</h3>
				<hr className="form_hr" />
				<div className="draft_id_container">
					<p>Draft ID</p>
					<span>{this.props.draft_code}</span>
				</div>
				{this.props.jobData &&
					<div className="m-t-7">
						<Button size="large" type="primary" onClick={() => this.backToJob()}>Back to Job List</Button>
					</div>
				}
			</div>
		);//End return
	}//End render
}//End class

export default SupportWorkerFormDraftMsg;