import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Form, Steps, Button, message, Skeleton } from 'antd';

import { AntInput } from '../../../../externalComponents/antd-fields';
import { HTTP, setFormStateValues, GetUserData, isJSON, LoadArrLocalStorage, SetDatePicker } from '../../../../services';
import ScreenLoader from '../../../../externalComponents/screen-loader';

import Step1 from './partial/step_1';
import Step2 from './partial/step_2';
import Step3 from './partial/step_3';
import Step4 from './partial/step_4';

import { connect } from 'react-redux';
import StoreGet from '../../../../../store/get';

import '../../styles.less';

const { Step } = Steps;

class IncidentMainForm extends Component {
  state = {
    formValues: {},
    getLoader: false,
    postLoader: false,
    formSubmit: false,
    clientList: [],
    spwList: [],
    allegationOnList: [],
    currentStep: 0,
    currentSPWId: '',//If spw is login the there will be his/her id otherwise will be empty
    justOfficeSection: false,
    providedServiceList: []
  }//End state
  formRef = React.createRef();

  onChangeField = (fieldName, fieldValue) => {
    this.setState({ formValues: setFormStateValues(this.state.formValues, fieldName, fieldValue) }, () => {
      // console.log(this.state.formValues);
    });
  }//End function

  nextStep = () => { this.setState({ currentStep: (this.state.currentStep + 1) }) }//End function
  backStep = () => { this.setState({ currentStep: (this.state.currentStep - 1) }) }//End function

  saveDraft = () => {
    let fv = { ...this.state.formValues };
    if (!fv.client_ref_id) {
      message.info('Please insert at least Participant Name');
      return false;
    }//End if condition
    fv.draft = 'true';
    this.setState({ formValues: fv, formSubmit: true }, () => {
      this.submitForm();
    });
  }//End function  

  submitForm = (values) => {
    values = this.state.formValues;
    values.internal = this.props.internalForm ? 'true' : 'false';
    if (!values.draft) {
      if (
        ((this.state.justOfficeSection && this.state.currentStep === 0) || (!this.state.justOfficeSection && this.state.currentStep === 2))
        && (!values.location_on_body_circle_img && !values.location_on_body_circle_img_url)
      ) {
        message.error('Please make circle on body'); return false;
      }//End if condition
      if (
        ((this.state.justOfficeSection && this.state.currentStep === 1) || (!this.state.justOfficeSection && this.state.currentStep === 3))
        && (!values.admin_signature && !values.admin_signature_url)) {
        message.error('Please make Signature'); return false;
      }//End if condition
      if ((this.state.currentSPWId && this.state.currentStep === 2) && (!values.spw_user_signature && !values.spw_user_signature_url)) {
        message.error('Please make Signature'); return false;
      }//End if condition
      //Select services during incident, if it's just 1 service otherwise user will select in form 
      if (this.state.providedServiceList.length === 1) {
        values.activity_engaged = this.state.providedServiceList[0].value;
      }//End if condition
    }//End if condition
    // alert(this.state.formSubmit ? 'true' : 'false');
    if (this.state.formSubmit) {
      //Set some initial values
      if (values.other_parties_multi && !isJSON(values.other_parties_multi)) { values.other_parties_multi = JSON.stringify(values.other_parties_multi) }
      this.setState({ postLoader: true });
      HTTP('post', '/incident/post/index/se/ig', values).then(res => {
        this.setState({ postLoader: false });
        if (!res) return false;
        if (values.id || values.draft) {
          this.props.history.push('/e/incidentLog');
        } else {
          this.formRef.current.resetFields();
          this.setState({ formValues: {}, currentStep: 0 })
        }//End if condition
        this.setState({ formSubmit: false })
      });

    } else { this.nextStep(); }//End if condition
  }//End function

  getSPWInfo = (spwId, clientId) => {
    if (!this.props.internalForm) { return false; }
    spwId = this.state.currentSPWId ? this.state.currentSPWId : spwId;
    if (!spwId) { this.props.getSPWInfo({}); return false }
    this.props.getLoader(true);
    clientId = clientId ? clientId : '';
    HTTP('get', '/incident/get/getSPWInfo/spwId/' + spwId + '/clientId/' + clientId).then(res => {
      this.props.getLoader(false);
      if (!res) return false;
      this.props.getSPWInfo(res.data);
      this.setState({ providedServiceList: res.data.service_provided });
    });
  }//End function

  render() {
    const st = this.state;
    const ocf = this.onChangeField;
    const fv = st.formValues;
    const fp = this.formRef.current;
    const pr = this.props;
    const totalStep = (st.currentSPWId || !pr.internalForm) ? '3' : '4';
    return (
      <div className="incident-form-container">
        {!pr.internalForm &&
          <div className="externalFormTitle">
            <h3 className="label">Internal Incidents <span className="label-strong">Management Form</span></h3>
            <div className="logo">
              <img src={`${process.env.PUBLIC_URL}/img/${pr.stv.app_data.logo_h}`} alt="Logo" />
            </div>
          </div>
        }
        <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">

          <ScreenLoader active={st.getLoader}>
            {st.getLoader ? <span><Skeleton active /><Skeleton active /></span> :
              <React.Fragment>

                <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
                {st.justOfficeSection ?
                  <React.Fragment>
                    <div className="step_container_2">
                      <Steps className="tow_col" current={st.currentStep}
                        onChange={(e) => this.setState({ currentStep: e })}
                      >
                        <Step title="Incident Form Data" description="Form details" />
                        <Step title="Management Use Only" description="Incident/Accident Investigation" />
                      </Steps>
                    </div>
                    {st.currentStep === 0 &&
                      <React.Fragment>
                        <Step1 fv={fv} ocf={ocf} spwList={st.spwList} allegationOnList={st.allegationOnList} clientList={st.clientList} loader={st.getLoader} currentSPWId={st.currentSPWId} fp={fp} getSPWInfo={(e) => this.getSPWInfo(e)} />
                        <Step2 fv={fv} ocf={ocf} fp={fp} spList={st.providedServiceList} />
                        <Step3 fv={fv} ocf={ocf} fp={fp} currentSPWId={st.currentSPWId} internalForm={pr.internalForm} />
                      </React.Fragment>
                    }
                    {st.currentStep === 1 && <Step4 fv={fv} ocf={ocf} fp={fp} />}
                    <hr className="hr-1" /><br />
                    <div className="flex-sb">
                      <div>{st.currentStep !== 0 && <Button size="large" type="primary" onClick={() => { this.backStep(); this.setState({ formSubmit: false }) }} disabled={st.postLoader}><i className="las la-angle-double-left m-r-5 pos-relative top-1" /> Back</Button>}</div>
                      <div>
                        <div className="p-l-5 p-r-5 dis-inline-block fs-12 text-gray-1">{`${st.currentStep + 1}/2`}</div>
                        <div className="p-l-5 p-r-5 dis-inline-block">|</div>
                        {st.currentStep === 1 ?
                          <Button size="large" type="primary" htmlType="submit" loading={st.postLoader} onClick={() => this.setState({ formSubmit: true })}>
                            {/* {fv.id ? 'Update' : 'Approved'} */}
                            Approved
                          </Button>
                          :
                          <Button size="large" type="primary" htmlType="submit">Next <i className="las la-angle-double-right m-l-5 pos-relative top-1" /></Button>
                        }
                      </div>
                    </div>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <div className="step_container_2">
                      <Steps className={st.currentSPWId ? 'three_col' : 'four_col'} current={st.currentStep}
                        // onChange={(e) => this.setState({ currentStep: e })}
                      >
                        <Step title="Section 1" description="Affected Person or Participant" />
                        <Step title="Section 2" description="Incident or Accident" />
                        <Step title="Section 3" description="Physical Harm" />
                        {(!st.currentSPWId && pr.internalForm) && <Step title="Management Use Only" description="Incident/Accident Investigation" />}
                      </Steps>
                    </div>
                    {st.currentStep === 0 && <Step1 fv={fv} ocf={ocf} spwList={st.spwList} allegationOnList={st.allegationOnList} clientList={st.clientList} loader={st.getLoader} currentSPWId={st.currentSPWId} fp={fp} getSPWInfo={(e, f) => this.getSPWInfo(e, f)} />}
                    {st.currentStep === 1 && <Step2 fv={fv} ocf={ocf} fp={fp} spList={st.providedServiceList} />}
                    {st.currentStep === 2 && <Step3 fv={fv} ocf={ocf} fp={fp} currentSPWId={st.currentSPWId} internalForm={pr.internalForm} />}
                    {(st.currentStep === 3 && !st.currentSPWId) && <Step4 fv={fv} ocf={ocf} fp={fp} />}
                    <hr className="hr-1" /><br />
                    <div className="flex-sb">
                      <div>{st.currentStep !== 0 && <Button size="large" type="primary" onClick={() => { this.backStep(); this.setState({ formSubmit: false }) }} disabled={st.postLoader}><i className="las la-angle-double-left m-r-5 pos-relative top-1" /> Back</Button>}</div>
                      <div>
                        <div className="p-l-5 p-r-5 dis-inline-block fs-12 text-gray-1">{`${st.currentStep + 1}/${totalStep}`}</div>
                        {/* =={pr.internalForm ? 'True' : 'False'}== */}
                        {(((st.currentSPWId || !pr.internalForm) && st.currentStep === 2) || (st.currentStep === 3)) ?
                          <Button size="large" type="primary" htmlType="submit" loading={st.postLoader} onClick={() => this.setState({ formSubmit: true })}>
                            {(st.currentSPWId && st.currentStep === 2) ? (fv.id ? 'Update and Send' : 'Send for Approval') : (fv.id ? 'Update' : 'Submit')}
                          </Button>
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
                }{/*End justOfficeSection state*/}
              </React.Fragment>
            }{/*End getLoader state*/}
          </ScreenLoader>

        </Form>
      </div>
    )//end return
  }//End render
  componentDidMount() {
    let data = this.props.id ? LoadArrLocalStorage(this.props.id) : {};
    let id = data.id ? data.id : '-';
    if (data.officeSection) { this.setState({ justOfficeSection: true }) }
    this.setState({ getLoader: true });
    this.props.getLoader && this.props.getLoader(true);
    // console.log('/incident/get/index/id/' + id + '/se/ig');
    HTTP('get', '/incident/get/index/id/' + id + '/internal/' + (this.props.internalForm ? 'true' : 'false') + '/se/ig').then(res => {
      this.setState({ getLoader: false });
      this.props.getLoader && this.props.getLoader(false);
      if (!res) return false;
      // console.log(res);
      this.setState({ clientList: res.data.clientList, spwList: res.data.spwList, allegationOnList: res.data.allegationOnList }, () => {
        if (id && id !== '-') {
          let fv = res.data.formValues;
          this.setState({ formValues: fv })
          // console.log(fv);
          if (fv.date_of_injury) { fv.date_of_injury = SetDatePicker(fv.date_of_injury) }
          if (fv.time_of_injury) { fv.time_of_injury = SetDatePicker(fv.time_of_injury, 'hh:mm:ss A') }
          if (fv.due_date) { fv.due_date = SetDatePicker(fv.due_date); }
          this.formRef.current.setFieldsValue(fv);
          this.getSPWInfo(fv.spw_user_ref_id, fv.client_ref_id);
        }//End if condition
        //Set SPW Data
        if (res.data.spwDetails) { this.props.getSPWInfo && this.props.getSPWInfo(res.data.spwDetails); }
        this.props.setFormNumber && this.props.setFormNumber((res.data.formValues && res.data.formValues.form_no) ? res.data.formValues.form_no : res.data.form_no);
      })//End save state
    });

    //Check is SPW login of not
    if (this.props.internalForm) {
      let userData = GetUserData();
      if (userData && userData.link_id) { this.setState({ currentSPWId: userData.link_id }) }
    }//End if condition
  }//End componentDidMount
}//End class
export default withRouter(connect(StoreGet)(IncidentMainForm));
