import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import UploadFile from '../../../../../externalComponents/antd-upload-file-component';

class Step14 extends Component {
  render() {
    const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Participant Risk Assessment</h2>
          <h2 className="form_heading_sub">f) Restrictive Practices</h2>
          <hr className="form_hr_sub" />

          <div className="content-divider"></div>
          <Row gutter={window.rowGutterSmall}>
            <Col lg={12} md={12} sm={24} className="p-b-6">
              <AntInput
                name="behaviorSupportPlan"
                onChange={e => ocf('behaviorSupportPlan', e)}
                label="Is there a positive behaviour support plan in place?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'no', label: 'No' }, { value: 'unknown', label: 'Unknown' }, { value: 'yes', label: 'Yes' }]}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {/* {fv.behaviorSupportPlan === 'yes' &&
                <AntInput label="Please specify in detail" name="behaviorSupportPlanSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details" onChange={e => ocf('behaviorSupportPlanSpecify', e)} />
              } */}
            </Col>
          </Row>
          {fv.behaviorSupportPlan === 'yes' &&
            <>
              <div className="content-divider"></div>
              <Row gutter={window.rowGutterSmall}>
                <Col lg={12} md={12} sm={24} className="p-b-6">
                  <AntInput
                    name="restrictivePractice"
                    onChange={e => ocf('restrictivePractice', e)}
                    label="Does the behaviour support plan have a restrictive practice?" vertical type="radio" containerClassName="long_label" radioOptions={[{ value: 'no', label: 'No' }, { value: 'unknown', label: 'Unknown' }, { value: 'yes', label: 'Yes' }]}
                  />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  {fv.restrictivePractice === 'yes' &&
                    <>
                      <AntInput label="Please explain in detail" name="restrictivePracticeSpecify" type="textarea" className="m-0-imp" rows={2} placeholder="Please type some details" onChange={e => ocf('restrictivePracticeSpecify', e)} />
                      <UploadFile
                        formProps={fp}
                        name="uploadBehaviourPlanFile"
                        uploadedDocuments={fv.uploadBehaviourPlanFileDocument}
                        filePath={`${fv.filePath}/uploadBehaviourPlanFile/`}
                        value={fv.uploadBehaviourPlanFile}
                        onChange={e => ocf('uploadBehaviourPlanFile', e)}
                        title="Click or, drag and drop a file"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        restrictExtension="jpg,jpeg,png,pdf,doc,docx"
                        fileSize="5" />
                    </>
                  }
                </Col>
              </Row>
            </>
          }

        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    formObj['restrictivePractice'] = fv.restrictivePractice;
    if (fv.restrictivePractice === 'yes') {
      formObj['restrictivePracticeSpecify'] = fv.restrictivePracticeSpecify;
    }//End if condition
    formObj['behaviorSupportPlan'] = fv.behaviorSupportPlan;
    if (fv.behaviorSupportPlan === 'yes') {
      formObj['behaviorSupportPlanSpecify'] = fv.behaviorSupportPlanSpecify;
    }//End if condition
    this.props.formProps.setFieldsValue(formObj);
  }//End componentDidMount
}//End class

export default Step14;