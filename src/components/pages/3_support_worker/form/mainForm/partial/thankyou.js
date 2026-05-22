import React, { Component } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
class SupportWorkerFormCompleteMsg extends Component {
    render() {
        const data = this.props.data;
        const name = this.props.name;
        return (
            <div className="thank_you_container">
                <CheckCircleOutlined className="icon" style={{ fontSize: '20px' }} />
                <br /><br />
                <p><strong>Thank you {name}</strong> for applying as a Support Worker with {data.companyDetails.name}.</p>
                <hr className="form_hr" />
                <h3 className="msg">If you are shortlisted, we will call you and conduct a brief interview over a call. Please make sure that you have uploaded all the relevant documents at the time of form filling. If you have not uploaded any document yet please email us at <a href={`mailto:${data.companyDetails.emailSupport}`}>{data.companyDetails.emailSupport}</a> as the applications with relevant documents can be assessed quickly by our HR Team.</h3>
            </div>
        );//End return
    }//End render
}//End class

export default SupportWorkerFormCompleteMsg;