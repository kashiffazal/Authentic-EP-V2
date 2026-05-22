import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { HTTP, SetUserData, Encode64 } from '../../services'
import { AntInput } from '../antd-fields';

import './styles.less';

// const FormItem = Form.Item;

class SessionExpiredLoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { loader: false, forgotPassToggle: false, forgetEmailSent: false };
	}//End constructor

	submitForm = (values) => {
		// console.log(values);
		this.setState({ loader: true, forgetEmailSent: false });

		if (this.state.forgotPassToggle) {
			values.forgetPassData = Encode64(values.email);
			HTTP('post', '/login/post/forget-password/se/ig', values).then(res => {
				this.setState({ loader: false });
				if (!res) { return false; }
				this.setState({ forgetEmailSent: true });
			});
		} else {
			HTTP('post', '/login/post/index/se/ig', values).then(res => {
				this.setState({ loader: false });
				if (res) {
					SetUserData(res.data);
					window.sessionExpire = false;
					window.location.reload();
				}//End if condition
			});
		}//End if condition
	}//End function

	render() {
		// const { getFieldDecorator } = this.formRef.current;
		const data = this.props;
		const st = this.state;
		return (
			<div className="l_c">
				{data.show &&
					<div className="container">

						<Form className="form form-style-1" layout="vertical" onFinish={this.submitForm}>
							<div className="content">
								<h1 className="m-0">Session expire</h1>
								<p className="m-0">Your session has expired. Please login again to continue working.</p>
							</div>
							{st.forgotPassToggle ?
								<React.Fragment>
									{st.forgetEmailSent ?
										<div className="forget-success-msg">
											<i className="las la-check-circle" />
											Please check your inbox to reset your password
										</div>
										:
										<AntInput label="Email Address" name="email" placeholder="Please type email address" />
									}
									<div className={st.forgetEmailSent ? 'text-center' : 'text-right'}><button className="btnToLink fs-12" type="button" onClick={() => this.setState({ forgotPassToggle: !this.state.forgotPassToggle, forgetEmailSent: false })}>Back to login form?</button></div>
								</React.Fragment>
								:
								<React.Fragment>
									<AntInput label="Username" feedback name="username" placeholder="Please type username" reqMsg="Required" preIcon="user" />
									<AntInput label="Password" feedback name="password" type="password" placeholder="Please type password" className="hide_eye" reqMsg="Required" preIcon="lock" />
									<div className="text-right"><button className="btnToLink fs-12" type="button" onClick={() => this.setState({ forgotPassToggle: !this.state.forgotPassToggle })}>Forget Password?</button></div>
								</React.Fragment>
							}
							{!st.forgetEmailSent &&
								<React.Fragment>
									<hr className="hr" /><br />
									<div className="text-right">
										<Button className="abtn-primary w-full" type="primary" size="large" htmlType="submit" loading={this.state.loader}>
											{st.forgotPassToggle ? 'Send' : 'Login'}
										</Button>
									</div>
								</React.Fragment>
							}
						</Form>

					</div>
				}
			</div>
		);//End return
	}//End render
}//End class

export default SessionExpiredLoginScreen;