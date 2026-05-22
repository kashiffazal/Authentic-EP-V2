import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step14 extends Component {
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
            name="isEnglishMain"
            type="radio"
            label="Is English the main language you speak at home?"
            vertical
            containerClassName="long_label"
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { label: 'Prefer not to say' }
            ]}
            
            onChange={e => ocf('isEnglishMain', e)}
          />
          {fv.isEnglishMain === 'no' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <AntInput label="Please let us know the main language you speak at home" type="select" name="mainLanguage" 
                filter
                options={data.list.languages}
                onChange={e => ocf('mainLanguage', e)}
                noRequired
              />
              {fv.mainLanguage === '25' && //Other
                <AntInput label="If you have selected Other, please let us know the main language spoken at home" name="otherMainLanguage"  noRequired onChange={e => ocf('otherMainLanguage', e)} />
              }
            </React.Fragment>
          }
          <AntInput label="What other languages you can speak?" name="otherLanguageSpeak"  noRequired onChange={e => ocf('otherLanguageSpeak', e)} />
        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    formObj['isEnglishMain'] = fv.isEnglishMain;
    formObj['otherLanguageSpeak'] = fv.otherLanguageSpeak;
    if (fv.isEnglishMain === 'no') {
      formObj['mainLanguage'] = fv.mainLanguage;
      if (fv.mainLanguage === 'Other') {
        formObj['otherMainLanguage'] = fv.otherMainLanguage;
      }//End if condition
    }//End if condition
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step14;