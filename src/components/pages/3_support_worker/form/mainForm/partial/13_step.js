import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step13 extends Component {
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
          <AntInput
            name="wherYouBorn"
            type="radio"
            label="Were you born in Australia?"
            vertical
            containerClassName="long_label"
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { label: 'Prefer not to say' }
            ]}
            
            onChange={e => ocf('wherYouBorn', e)}
          />
          {fv.wherYouBorn === 'no' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <AntInput label="Please select your country of birth" type="select" name="bornCountry" 
                filter
                options={data.list.countries}
                onChange={e => ocf('bornCountry', e)}
                noRequired
                value={window.defaultCountryId}
              />
              {fv.bornCountry === '267' && //Other
                <AntInput label="If you have selected Other, please let us know your country of birth" name="otherBornCountry"  noRequired onChange={e => ocf('otherBornCountry', e)} />
              }
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    formObj['wherYouBorn'] = fv.wherYouBorn;
    if (fv.wherYouBorn === 'no') {
      formObj['bornCountry'] = fv.bornCountry;
      if (fv.bornCountry === 'Other') {
        formObj['otherBornCountry'] = fv.otherBornCountry;
      }//End if condition
    }//End if condition
    this.props.formProps.setFieldsValue(formObj);
    if (!fv.bornCountry) { this.props.onChangeField('bornCountry', window.defaultCountryId); }//Set Default Country
  }//End componentDidMount
}//End class

export default Step13;