import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import MultipleLocalReference from './multiple_local_reference'

class Step17 extends Component {
  render() {
    const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Local References</h2>
          <hr className="form_hr" />
          <AntInput
            name="isLocalReferences"
            type="radio"
            label="Please provide at least 2 local references from Australia. One of them must be a professional reference."
            vertical
            containerClassName="long_label"
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}

            onChange={e => ocf('isLocalReferences', e)}
          />
          <p className="help">Make sure you provide the email id of the referee as this is compulsory.</p>

          {fv.isLocalReferences === 'yes' &&
            <React.Fragment>
              <div className="content-divider"></div>
              <MultipleLocalReference fp={fp} onChange={(e) => ocf('localReferences', e)} formValues={fv.localReferences} />
            </React.Fragment>
          }

        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    this.props.formProps.setFieldsValue({ isLocalReferences: fv.isLocalReferences });
  }//End componentDidMount
}//End class

export default Step17;