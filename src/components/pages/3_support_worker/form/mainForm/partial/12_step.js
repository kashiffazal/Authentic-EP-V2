import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step12 extends Component {
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
            name="culturally"
            type="radio"
            label="Are you of a Culturally and / or Linguistically Diverse (CALD) background?"
            vertical
            containerClassName="long_label"
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { label: 'Prefer not to say' }
            ]}
            
            onChange={e => ocf('culturally', e)}
          />
          <div className="content-divider"></div>
          <p className="help">You may be considered CALD if you were born in a country other than Australia or your first language or the main language you speak at home is not English or your family still has a strong affiliation with another country or culture</p>
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({ 'culturally': fv.culturally })
  }//End componentDidMount
}//End class

export default Step12;