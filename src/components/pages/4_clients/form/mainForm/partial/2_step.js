import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';

class Step2 extends Component {
  render() {
    // const st = this.state;
    // const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Living Arrangement</h2>
          <hr className="form_hr_sub" />

          <AntInput label="Select any one of the following" type="select" name="livingArrang"  filter={true} onChange={e => ocf('livingArrang', e)}
            options={[
              { label: 'Alone' },
              { label: 'Family / Partner' },
              { label: 'Supported accommodation' },
              { label: 'Other' }
            ]}
          />
          {fv.livingArrang === 'Other' &&
            <AntInput type="textarea" label="Please Specify" name="livingArrangOther"  onChange={e => ocf('livingArrangOther', e)} />
          }
        </div>
      </React.Fragment>
    );//End return
  }//End render
  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};

    if(fv.livingArrang === 'Other'){
      formObj['livingArrangOther'] = fv.livingArrangOther;
    }//End if condition

    this.props.formProps.setFieldsValue({
      'livingArrang': fv.livingArrang ? fv.livingArrang : '',
      ...formObj
    })
  }//End componentDidMount
}//End class

export default Step2;