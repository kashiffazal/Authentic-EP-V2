import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step2 extends Component {
  render() {
    // const st = this.state;
    // const fp = this.props.formProps;
    const data = this.props.data;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Before You Begin</h2>
          <hr className="form_hr" />

          <AntInput label={`Please let us know how you first heard about ${data.companyDetails.name}?`} type="select" name="firstHeardAboutYouFirst"  filter={true} onChange={e => ocf('firstHeardAboutYouFirst', e)}
            options={[
              { label: `${data.companyDetails.name} Client` },
              { label: "Another Client" },
              { label: `${data.companyDetails.name} Support Worker` },
              { label: "Another Support Worker" },
              { label: "Support Coordinator" },
              { label: "Plan Manager" },
              { label: "Service / Healthcare Provider" },
              { label: "Event or Expo" },
              { label: `${data.companyDetails.name} Flyer / Pamphlet` },
              { label: `${data.companyDetails.name} Team Member` },
              { label: `${data.companyDetails.name} Website` },
              { label: "Internet Search e.g., Google" },
              { label: "TV / Radio / Newspaper / Magazine" },
              { label: "Social Media (Facebook / Twitter / LinkedIn)" },
              { label: "Family / Friends" },
              { label: "Other" }
            ]}
          />
          {fv.firstHeardAboutYouFirst === 'Other' &&
            <AntInput type="textarea" label="Please provide the name of the person, venue or publication/media" name="firstHeardAboutYouFirstOthers"  onChange={e => ocf('firstHeardAboutYouFirstOthers', e)} />
          }
        </div>
      </React.Fragment>
    );//End return
  }//End render
  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};

    if(fv.firstHeardAboutYouFirst === 'Other'){
      formObj['firstHeardAboutYouFirstOthers'] = fv.firstHeardAboutYouFirstOthers;
    }//End if condition

    this.props.formProps.setFieldsValue({
      'firstHeardAboutYouFirst': fv.firstHeardAboutYouFirst ? fv.firstHeardAboutYouFirst : '',
      ...formObj
    })
  }//End componentDidMount
}//End class

export default Step2;