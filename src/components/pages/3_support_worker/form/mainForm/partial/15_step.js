import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step15 extends Component {
  render() {
    // const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Diversity & Inclusion</h2>
          <hr className="form_hr" />
          <AntInput
            name="identifyAs"
            type="radio"
            label="Do you identify as Lesbian, Gay, Bi-Sexual, Transgender, Intersex and / or Queer?"
            vertical
            containerClassName="long_label"
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { label: 'Prefer not to say' }
            ]}
            
            onChange={e => ocf('identifyAs', e)}
          />
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({'identifyAs': fv.identifyAs})
  }//End componentDidMount
}//End class

export default Step15;