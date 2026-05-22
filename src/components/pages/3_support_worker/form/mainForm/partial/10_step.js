import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step10 extends Component {
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
          <h2 className="form_heading">Diversity & Inclusion</h2>
          <hr className="form_hr" />
          <p className="help">{data.companyDetails.name} is committed to creating and sustaining an inclusive environment for everybody. The following information is requested by {data.companyDetails.name} for statistical purposes only and to facilitate our compliance with our staff D&I programs.</p>
          <AntInput
            name="gender"
            type="radio"
            label="Gender"
            vertical
            containerClassName="long_label"
            radioOptions={[
              { label: 'Female' },
              { label: 'Male' },
              { label: 'Prefer not to say' },
              { label: 'Prefer to self describe' }
            ]}
            
            onChange={e => ocf('gender', e)}
          />
          {fv.gender === 'Prefer to self describe' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <AntInput label="Please self describe your gender below" name="genderSelfDesc"  noRequired onChange={e => ocf('genderSelfDesc', e)} />
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    formObj['gender'] = fv.gender;
    if (fv.gender === 'Prefer to self describe') {
      formObj['genderSelfDesc'] = fv.genderSelfDesc;
    }//End if condition
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step10;