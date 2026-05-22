import React, { Component } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';

class ClientFormDraftMsg extends Component {

	render() {
		return (
			<div className="thank_you_container">
				<CheckCircleOutlined className="icon" style={{ fontSize: '20px' }} />
				<br /><br />
				<p>Your form has been <strong>Draft</strong></p>
				<h3>Please save the draft ID anywhere, you can continue the participant referral form any time by providing this ID.</h3>
				<hr className="form_hr" />
				<div className="draft_id_container">
					<p>Draft ID</p>
					<span>{this.props.draft_code}</span>
				</div>
			</div>
		);//End return
	}//End render
}//End class

export default ClientFormDraftMsg;