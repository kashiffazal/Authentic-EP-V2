import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step16 extends Component {
  render() {
    // const fp = this.props.formProps;
    const data = this.props.data;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Participant Consent Section</h2>
          <hr className="form_hr_sub" />

          <p>{data.companyDetails.name} will work closely with other agencies to coordinate the best support for you. This means your informed consent for the sharing of information will be sought and respected in all situations unless:</p>
          <AntInput
            type="checkbox"
            name="sharingInformation"
            
            vertical
            containerClassName="long_label"
            group={[
              { value:'we-are-oliged', label: 'We are obliged by law to disclose your information regardless of consent or otherwise' },
              { value:'it-is-unreasonable', label: 'It is unreasonable or impracticable to gain consent or consent has been refused' },
              { value:'the-disclosure', label: 'The disclosure is reasonably necessary to prevent or lessen a serious threat to the life, health or safety of a person or group of people' }
            ]}
            reqMsg="Choose your option(s)"
            value={fv.sharingInformation}
            onChange={e => ocf('sharingInformation', e)}
          />
         
          <p>I hereby acknowledge that {data.companyDetails.name} has advised me of the following:</p>
          <AntInput
            type="checkbox"
            name="acknowledge"
            
            vertical
            containerClassName="long_label"
            group={[
              { value:'company-privacy', label: `${data.companyDetails.name} Privacy and Confidentiality Policy and Procedure` },
              { value:'right-to-access', label: 'My right to access my personal information' },
              { value:'right-to-withdraw', label: 'My right to withdraw my consent at any time' }
            ]}
            reqMsg="Choose your option(s)"
            value={fv.acknowledge}
            onChange={e => ocf('acknowledge', e)}
          />

          <p>I understand that the follow service(s) are recommended and relevant information about me may be forwarded to the agency(s) that provide these services, in order that I receive the best possible service:</p>
          <AntInput
            type="checkbox"
            name="understandServices"
            
            text="Do you agree?"
            // containerClassName="long_checkbox_label"
            reqMsg="Please tick the box"
            value={fv.understandServices}
            onChange={e => ocf('understandServices', e)}
          />
          
          <p>Check the following</p>
          <AntInput
            type="checkbox"
            name="relevantPrivacyLaws"
            
            vertical
            containerClassName="long_label"
            group={[
              { value:'i-understand', label: `I understand that ${data.companyDetails.name} must comply with relevant privacy laws and I will contact the organisation immediately if I feel that these laws have been breached` },
              { value:'my-worker', label: 'My worker has discussed with me how and why certain information about me may need to be provided to other service providers' },
              { value:'recommendation', label: 'I understand the recommendations and I give my permission for the information to be shared with the people or agencies as detailed above' }
            ]}
            reqMsg="Choose your option(s)"
            value={fv.relevantPrivacyLaws}
            onChange={e => ocf('relevantPrivacyLaws', e)}
          />

        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
  }//End componentDidMount
}//End class

export default Step16;