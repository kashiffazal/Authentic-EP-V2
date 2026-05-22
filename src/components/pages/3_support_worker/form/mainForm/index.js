import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Form, Steps, Button, Skeleton, Modal, message, notification } from 'antd';
import { HTTP, setFormStateValues, LoadArrLocalStorage, isJSON, GetObjectFromArr } from '../../../../services';
import { AntInput } from '../../../../externalComponents/antd-fields';
import Step1 from './partial/1_step';
import Step2 from './partial/2_step';
import Step3 from './partial/3_step';
import Step4 from './partial/4_step';
import Step5 from './partial/5_step';
import Step6 from './partial/6_step';
import Step7 from './partial/7_step';
import Step8 from './partial/8_step';
import Step9 from './partial/9_step';
import Step10 from './partial/10_step';
import Step11 from './partial/11_step';
import Step12 from './partial/12_step';
import Step13 from './partial/13_step';
import Step14 from './partial/14_step';
import Step15 from './partial/15_step';
import Step16 from './partial/16_step';
import Step17 from './partial/17_step';
import Step18 from './partial/18_step';
import Step19 from './partial/19_step';
import Step20 from './partial/20_step';
import SupportWorkerFormFirstMsg from "./partial/firstMsg";
import SupportWorkerFormCompleteMsg from "./partial/thankyou";
import SupportWorkerFormDraftMsg from "./partial/draft";
import SupportWorkerFormjobDetails from "./partial/jobDetails";
import ScreenLoader from '../../../../externalComponents/screen-loader';
import '../../style.less';

import { connect } from 'react-redux';
import StoreGet from '../../../../../store/get';

const { Step } = Steps;
const { confirm } = Modal;

class SupportWorkerFormExternal extends Component {
  state = {
    getLoader: false,
    postLoader: false,
    currentStep: 0,
    formSubmit: false,
    data: { list: {}, companyDetails: {} },
    formValues: {},
    ads: {},//! App Default Settings
    animationDuration: 320,
    firstStargingMsgForApplier: true,
    showThankYouMsg: false,
    showDraftMsg: false,
    uploadProgress: 0,
    jobData: null
  }//End state

  formRefMainForm = React.createRef();

  submitForm = (values) => {
    // e.preventDefault();
    if ((values.mobile && values.emergency_mobile) && values.mobile.replace(/\s/g, '').replaceAll('-', '') === values.emergency_mobile.replace(/\s/g, '').replaceAll('-', '')) {
      message.error('Please insert a different mobile number for emergency contact');
      return false;
    }//End if condition

    //? Check Client Signature
    if (this.state.currentStep === 19 && (!this.state.formValues.swSign && !this.state.formValues.swSignUrl)) {
      message.error('Please make signature'); return false;
    }//End if condition

    //? Check List condition
    if (this.state.currentStep === 18) {
      if (!(this.state.formValues.totalCheckListNumber >= 100)) {
        let errorMsg = 'Please select and upload documents to complete your 100 points of ID. You are not allowed to fill up the application without completing 100 points of ID.';
        // message.error(errorMsg);
        notification['info']({ message: 'Error: Please gain at least 100 points', description: errorMsg, duration: 15 });
        return false;
      }//End if condition
      if (this.state.formValues.primaryDocAvailable !== 'true') {
        message.error('Please provide at least one primary document');
        return false;
      }//End if condition
    }//End if condition

    // console.log(values);
    //Wait 0.5 sec to set state on submit btn
    setTimeout(() => {
      // this.props.form.validateFields((err, values) => {
      // if (err) { return false }//End if condition
      if (this.state.formSubmit) {
        this.setState({ formSubmit: false });
        let data = { ...this.state.formValues };
        data.keyword = 'complete';
        this.postData(data);
      } else {
        this.nextStep();
      }//End if condition
      // });
    }, 20);//End setTimeout to set form state on submit btn
  }//End function

  saveDraft = () => {
    let data = { ...this.state.formValues };
    if (!(data.first_name && data.last_name)) {
      message.info('Please insert at least First and Last name');
      return false;
    }//End if condition
    data.keyword = 'draft';
    this.postData(data);
  }//End function

  postData = (values) => {
    //return false;
    //console.log(values);
    this.setState({ postLoader: true });
    if (values.days_availibility && !isJSON(values.days_availibility)) { values.days_availibility = JSON.stringify(values.days_availibility) }
    if (values.localReferences && !isJSON(values.localReferences)) { values.localReferences = JSON.stringify(values.localReferences) }
    //Check Internal or External Form
    values.internalForm = this.props.internalForm ? 'true' : 'false';
    values.job_ref_id = (this.state.jobData) ? this.state.jobData.id : (this.state.formValues.job_ref_id ? this.state.formValues.job_ref_id : '');

    // values.job_position = this.state.jobData ? this.state.jobData.job_title : (this.state.formValues.job_title ? this.state.formValues.job_title : '');

    if (this.state.jobData) {
      // console.log(this.state.jobData);
      values.job_title = this.state.jobData.title;
    } else {
      values.job_title = GetObjectFromArr(values.job_ref_id, 'value', this.state.data.list.jobList).label;
    }//End if condition

    values.status = this.state.formValues.status ? this.state.formValues.status : '';
    //Getting Country, State Name and Uploaded File name List
    values.listData = JSON.stringify({ countries: { ...this.state.data.list.countries }, states: { ...this.state.data.list.states }, uploadedDocuments: { ...this.state.data.list.uploadedDocuments } });

    //  console.log(values);



    HTTP('post', '/supportWorker/post/index/se/ig', values, false, false, this.setUploadProgress).then(res => {
      this.setState({ postLoader: false });
      if (!res) return false;
      //console.log(res);
      //return false
      if (this.props.internalForm) {
        this.props.history.push('/e/supportWorkerLog');
      } else {
        if (values.keyword === 'draft') {
          this.setState({ data: { ...this.state.data, draft_code: res.draft_code }, showDraftMsg: true });
        } else {
          this.setState({ showThankYouMsg: true });
        }//End if condition
      }//End if condition
    });
  }//End function

  setUploadProgress = (e, a) => {
    this.setState({ uploadProgress: e });
    //console.log(e, a);
  }//End function


  onChangeField = (fieldName, fieldValue) => {
    this.setState({ formValues: setFormStateValues(this.state.formValues, fieldName, fieldValue) }, () => {
      //console.log(this.state.formValues);
    });
  }//End function

  nextStep = () => { this.setState({ currentStep: (this.state.currentStep + 1) }) }//End function
  backStep = () => { this.setState({ currentStep: (this.state.currentStep - 1) }) }//End function

  backToJobList = () => {
    if (this.state.firstStargingMsgForApplier || this.state.showThankYouMsg || this.state.showDraftMsg) {
      this.props.backToJob();
    } else {
      let th = this;
      confirm({
        title: 'Are you sure to go back on Job List page?',
        content: <div>All data will be lost after going back by clicking <strong>Yes</strong> button, on the other hand you can click <strong>No</strong> and <strong>Draft</strong> the application by clicking Draft button below and then go back. In this case you will receive a draft <strong>ID</strong>, save it anywhere. You can continue the application by providing the draft id any time on Support Worker Form.</div>,
        okText: "Yes",
        cancelText: "No",
        onOk() { th.props.backToJob(); },
        onCancel() { },
      });
    }//End if condition
  }//End function

  getData = (id, draftId) => {
    var url = '';
    if (draftId) {
      url = '/supportWorker/get/index/draft/' + draftId;
    } else {
      url = '/supportWorker/get/index/id/' + id;
    }//End if condition
    this.setState({ getLoader: true });
    HTTP('get', url + '/se/ig').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      //console.log(res.appDefaultSetting)
      let formValues = res.formValues ? res.formValues : {};
      //let data = res.data ? res.data : {};
      this.setState({
        data: res.data,
        formValues: formValues,
        ads: res.appDefaultSetting
      });
      if (draftId) { this.setState({ firstStargingMsgForApplier: false }) }
    });
  }//End function

  render() {
    const st = this.state;
    const fp = this.formRefMainForm.current;
    const fv = this.state.formValues;
    return (
      <div className="support-worker-form-container">
        {!this.props.internalForm &&
          <div className="externalFormTitle">
            <h3 className="label"> Support Worker <span className="label-strong">Form</span></h3>
            <div className="logo">
              <img src={`${process.env.PUBLIC_URL}/img/${this.props.stv.app_data.logo_h}`} alt="Logo" />
            </div>
          </div>
        }

        <Form className="form-style-1" ref={this.formRefMainForm} layout="vertical" onFinish={this.submitForm} autoComplete="off">
          {(st.jobData && !st.showDraftMsg) && <SupportWorkerFormjobDetails jobData={st.jobData} backToJobList={() => this.backToJobList()} />}
          {!this.props.internalForm && st.firstStargingMsgForApplier ?
            <SupportWorkerFormFirstMsg data={st.data} startForm={() => this.setState({ firstStargingMsgForApplier: false })} getData={(e) => this.getData(null, e)} loader={st.getLoader} />
            :
            (st.showThankYouMsg) ?
              <SupportWorkerFormCompleteMsg data={st.data} />
              :
              (st.showDraftMsg) ?
                <SupportWorkerFormDraftMsg draft_code={st.data.draft_code} jobData={st.jobData} backToJobList={() => this.backToJobList()} /> :
                <ScreenLoader active={st.getLoader}>
                  {st.getLoader ? <span><Skeleton active /><Skeleton active /></span> :
                    <React.Fragment>
                      <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
                      {st.ads.step ?
                        <React.Fragment>
                          <div className="step_container pos-relative">
                            <Steps current={st.currentStep} onChange={(e) => ((!this.props.disabledClickOnStep && st.ads.allowClickOnSteps) ? this.setState({ currentStep: e }) : false)} direction="horizontal">
                              <Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step /><Step />
                            </Steps>
                            <button type="button" className="btnToLink" style={{
                              'position': 'absolute',
                              'bottom': '26px',
                              'right': '18px',
                              'width': 'auto'
                            }} onClick={() => window.location.reload(true)}>
                              <i className="las la-sync fs-18"></i>
                            </button>
                          </div>
                          {st.currentStep === 0 && <Step1 formProps={fp} data={st.data} jobData={st.jobData} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 1 && <Step2 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 2 && <Step3 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 3 && <Step4 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 4 && <Step5 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 5 && <Step6 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 6 && <Step7 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 7 && <Step8 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 8 && <Step9 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 9 && <Step10 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 10 && <Step11 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 11 && <Step12 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 12 && <Step13 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 13 && <Step14 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 14 && <Step15 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 15 && <Step16 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 16 && <Step17 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 17 && <Step18 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 18 && <Step19 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} />}
                          {st.currentStep === 19 && <Step20 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} uploadProgress={st.uploadProgress} />}
                          {/* {(dspooab ? st.currentStep === 2 : st.currentStep === 1) && <SodaDetails formProps={fp} data={st.data} updateData={this.updateListData} onChangeField={this.onChangeField} formValues={fv} next={() => this.setState({ formNameState: true })} submit={() => this.setState({ formSubmit: true, formNameState: true })} back={() => this.backStep()} hideBtn={st.ads.step} aniDur={st.animationDuration} separateDelivery={st.ads.separateDelivery} offMiltiOnAccount={dspooab} />} */}
                          {/* {((dspooab ? st.currentStep === 3 : st.currentStep === 2) && !st.ads.separateDelivery) && <DeliveryMethod formProps={fp} data={st.data} updateData={this.updateListData} onChangeField={this.onChangeField} formValues={fv} submit={() => this.setState({ formSubmit: true, formNameState: true })} back={() => this.backStep()} postLoader={st.postLoader} hideBtn={st.ads.step} aniDur={st.animationDuration} />} */}
                        </React.Fragment>
                        :
                        <React.Fragment>
                          {/* <Step1 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} hideBtn={st.ads.step} sectionHeading={st.ads.stepAsSections} title={sstd.title1} desc={sstd.desc1} /> */}
                          {/* <Step2 formProps={fp} data={st.data} onChangeField={this.onChangeField} formValues={fv} hideBtn={st.ads.step} sectionHeading={st.ads.stepAsSections} title={sstd.title2} desc={sstd.desc2} /> */}
                          {/* <SodaDetails formProps={fp} data={st.data} updateData={this.updateListData} onChangeField={this.onChangeField} formValues={fv} next={() => this.setState({ formNameState: true })} submit={() => this.setState({ formSubmit: true, formNameState: true })} hideBtn={st.ads.step} sectionHeading={st.ads.stepAsSections} title={sstd.title3} desc={sstd.desc3} separateDelivery={st.ads.separateDelivery} offMiltiOnAccount={dspooab} /> */}
                          {/* {!st.ads.separateDelivery && <DeliveryMethod formProps={fp} data={st.data} updateData={this.updateListData} onChangeField={this.onChangeField} formValues={fv} submit={() => this.setState({ formSubmit: true, formNameState: true })} postLoader={st.postLoader} hideBtn={st.ads.step} sectionHeading={st.ads.stepAsSections} title={sstd.title4} desc={sstd.desc4} />} */}
                        </React.Fragment>
                      }
                      <hr className="hr-1" /><br />
                      <div className="flex-sb">
                        <div>
                          {st.currentStep !== 0 && <Button size="large" type="primary" onClick={() => this.backStep()} disabled={st.postLoader}><i className="las la-angle-double-left m-r-5 pos-relative top-1" /> Back</Button>}
                        </div>
                        <div>
                          <div className="p-l-5 p-r-5 dis-inline-block fs-12 text-gray-1">{`${st.currentStep + 1}/20`}</div>
                          {st.currentStep === 19 ?
                            <Button size="large" type="primary" htmlType="submit" loading={st.postLoader} onClick={() => this.setState({ formSubmit: true })}>{fv.id ? 'Update' : 'Submit'}</Button>
                            :
                            <React.Fragment>
                              <Button size="large" type="primary" onClick={() => this.saveDraft()} loading={st.postLoader}><i className="las la-save m-r-5 pos-relative top-1" /> Draft</Button>
                              <div className="p-l-5 p-r-5 dis-inline-block">|</div>
                              <Button size="large" type="primary" htmlType="submit">Next <i className="las la-angle-double-right m-l-5 pos-relative top-1" /></Button>
                            </React.Fragment>
                          }
                        </div>
                      </div>
                    </React.Fragment>
                  }{/*End Loader condition*/}
                </ScreenLoader>
          }
        </Form>
      </div>
    )//End Return statement
  }//end End Render
  componentDidMount() {
    let id = this.props.id ? LoadArrLocalStorage(this.props.id) : '-';
    this.getData(id, null);
    let jobData = this.props.jobData ? this.props.jobData : null;
    this.setState({ jobData: jobData });
  }//End componentDidMount
}//End class

export default withRouter(connect(StoreGet)(SupportWorkerFormExternal));
// export default withRouter(SupportWorkerFormExternal);