import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step7 extends Component {
  render() {
    // const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">About You</h2>
          <hr className="form_hr" />
          <AntInput
            name="hadAnyDisability"
            type="radio"
            containerClassName="long_label"
            label="Do you have, or have you ever had any disability or health conditions including, allergies, illnesses, injuries or diseases lasting for more than 6 months and that may adversely impact on your abilities to carry out the duties of your role?"
            vertical
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
            
            onChange={e => ocf('hadAnyDisability', e)}
          />

          {fv.hadAnyDisability === 'yes' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <AntInput type="textarea" label="Please provide information below" name="hadAnyDisabilityDetails"  onChange={e => ocf('hadAnyDisabilityDetails', e)} />
            </React.Fragment>
          }
          
          <div className="content-divider"></div>
          <h2 className="form_heading_sub">Injury/Disease Declaration</h2>
          <hr className="form_hr_sub" />
          <AntInput
            name="injury_disease"
            type="radio"
            label="Do you have any pre-existing injury or disease which you are aware of or could reasonably be expected to foresee, that could be affected by the nature of the duties and responsibilities of the position for which you are applying?"
            vertical
            containerClassName="long_label"
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
            
            onChange={e => ocf('injury_disease', e)}
          />
          {fv.injury_disease === 'yes' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <AntInput type="textarea"
                label="Please provide brief description (or on a separate advice)"
                help="(Note: Failure to make such a disclosure or making a false or misleading disclosure forfeits you the right to compensation under Accident Compensation Act 1985.)"
                name="injury_disease_desc"
                
                noRequired
                onChange={(e) => ocf('injury_disease_desc', e)}
              />
            </React.Fragment>
          }

          <div className="content-divider"></div>
          <h2 className="form_heading_sub">Qualifications and Skills</h2>
          <AntInput type="textarea" label="List your qualifications related to this position and any relevant certificates, diplomas, or others." name="qualification_explained"  onChange={e => ocf('qualification_explained', e)} />
          <AntInput type="textarea" label="Briefly list your skills relating to this position" name="sill_explained"  onChange={e => ocf('sill_explained', e)} />


        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    formObj['hadAnyDisability'] = fv.hadAnyDisability;
    if (fv.hadAnyDisability === 'yes') {
      formObj['hadAnyDisabilityDetails'] = fv.hadAnyDisabilityDetails;
    }//End if condition
    formObj['injury_disease'] = fv.injury_disease;
    if (fv.injury_disease === 'yes') {
      formObj['injury_disease_desc'] = fv.injury_disease_desc;
    }//End if condition
    formObj['qualification_explained'] = fv.qualification_explained;
    formObj['sill_explained'] = fv.sill_explained;
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step7;