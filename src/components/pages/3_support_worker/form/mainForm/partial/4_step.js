import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step4 extends Component {
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
                    <h2 className="form_heading">Support Worker Role</h2>
                    <hr className="form_hr" />
                    <p>Thinking about the role of a <strong>{data.companyDetails.name} Support Worker,</strong> please select the areas of <strong>Support Services</strong> you are <strong>interested in delivering,</strong> or that you have had <strong>experience delivering</strong></p>
                    <p>While some {data.companyDetails.name} Clients require Support Workers to have previous experience, <strong>many of our Clients, or Client's Representatives,</strong> will <strong>provide training and support</strong></p>
                    <AntInput
                        type="checkbox"
                        name="supportServices"
                        label="Support Services"
                        vertical
                        containerClassName="long_label"
                        group={[
                            { label: 'All Support Services' },
                            { label: 'Personal Care' },
                            { label: 'Help In The Community' },
                            { label: 'Help At Home' },
                            { label: 'Education / Training / Employment Support' },
                            { label: 'Therapy Support' },
                            { label: 'Transport Assistance' },
                            { label: 'Specialised Support Services' },
                        ]}
                        reqMsg="Choose your option(s)"
                        value={fv.supportServices}
                        onChange={e => ocf('supportServices', e)}
                    />
                    {fv.supportServices && (fv.supportServices.includes('All Support Services') || fv.supportServices.includes('Specialised Support Services')) &&
                        <React.Fragment>
                            <div className="content-divider"></div>
                            <h2 className="form_heading">Specialised Support Services</h2>
                            <hr className="form_hr" />
                            <AntInput
                                type="checkbox"
                                name="specialisedSupportServices"

                                label="Specialized Support Services"
                                vertical
                                containerClassName="long_label"
                                group={[
                                    { label: 'All Specialised Support Services' },
                                    { label: 'Allergies' },
                                    { label: 'Anaphylaxis' },
                                    { label: 'Behaviour Management' },
                                    { label: 'Bowel Care' },
                                    { label: 'Catheter or Condom Drainage' },
                                    { label: 'Diabetes Assistance' },
                                    { label: 'Epilepsy or Seizure' },
                                    { label: 'Manual Handling (Lifting / Hoisting / Transfers)' },
                                    { label: 'Mealtime Assistance & Feeding' },
                                    { label: 'Medication Administration' },
                                    { label: 'PEG (Percutaneous Endoscopic Gastronomy)' },
                                    { label: 'Shallow Suctioning' },
                                    { label: 'Ventilator Care' },
                                    { label: 'Wound / Pressure Care' },
                                ]}
                                reqMsg="Choose your option(s)"
                                value={fv.specialisedSupportServices}
                                noRequired
                                onChange={e => ocf('specialisedSupportServices', e)}
                            />
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
        );//End return
    }//End render
}//End class

export default Step4;