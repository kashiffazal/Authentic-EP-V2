import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'antd';
import { HTTP, setFormStateValues, isJSON, multidimensionalObjectSeparateInstance, UCFirst, GetObjectFromArr, AccessControl } from '../../../services';
import ScreenLoader from '../../../externalComponents/screen-loader';
import { AntInput } from '../../../externalComponents/antd-fields';
import MultipleRiskStrategy from './partial/multiRistStrategy';
import MultipleIdentifiedRisk from './partial/multiIdentifiedRisk';
import MultipleServices from './partial/multiServices';
import RichTextEditor from '../../../externalComponents/rich-text-editor';
import './styles.less';

class CarePlan extends Component {
  state = {
    postLoader: {},
    getLoader: false,
    data: {},
    companyDetails: {},
    formValues: {},
    carePlanData: {},
    showFieldObj: {},
    selectedEditableField: '',
  }//End state
  formRef = React.createRef();

  onChangeField = (fieldName, fieldValue) => {
    this.setState({ formValues: setFormStateValues(this.state.formValues, fieldName, fieldValue) }, () => {
      // console.log(this.state.formValues);
    });
  }//End function

  getData = (clientId) => {
    this.setState({ getLoader: true, carePlanData: {} });
    this.props.loader(true);
    this.formRef.current.setFieldsValue({});
    HTTP('get', '/clientCarePlan/get/index/' + clientId).then(res => {
      this.setState({ getLoader: false });
      this.props.loader(false);
      if (!res) return false;
      this.setState({ carePlanData: res.data, companyDetails: res.data.companyDetails }, () => {
        this.formRef.current.setFieldsValue(res.data);
      });
      this.props.clientData(res.data);
    });
  }//End function

  submitForm = (values) => {
    setTimeout(() => {
      //Set values for Submit
      let fieldName = this.state.selectedEditableField;
      let postObj = { id: values.id, client_ref_id: this.props.clientId };
      postObj[fieldName] = this.state.formValues[fieldName];

      if (!postObj[fieldName]) { this.showHideField(fieldName, false); return false; }
      if (((fieldName === 'risk_identified_multi') || (fieldName === 'services_multi')) && !isJSON(postObj[fieldName])) { postObj[fieldName] = JSON.stringify(postObj[fieldName]); }

      //@Inserting or Updating Risk Strategy
      let cpd = this.state.carePlanData;
      cpd['services_multi'] && Object.keys(cpd['services_multi']['services_ref_id']).forEach((item) => {
        if ((fieldName === `risk_strategy_multi_${cpd['services_multi']['services_ref_id'][item]}`) && !isJSON(postObj[fieldName])) {
          postObj[fieldName] = JSON.stringify(postObj[fieldName]);
          postObj['serviceId'] = cpd['services_multi']['services_ref_id'][item];
          postObj['risk_strategy_id'] = cpd['risk_strategy_ids'] ? cpd['risk_strategy_ids'][postObj['serviceId']] : '';
        }//End if condition
      });

      //Set Loader
      let postLoader = this.state.postLoader;
      postLoader[fieldName] = true;

      this.setState({ postLoader });
      HTTP('post', '/clientCarePlan/post/index/', postObj).then(res => {
        postLoader[fieldName] = false;
        this.setState({ postLoader });
        if (!res) return false;
        if (((fieldName === 'risk_identified_multi') || (fieldName === 'services_multi')) && isJSON(postObj[fieldName])) { postObj[fieldName] = JSON.parse(postObj[fieldName]) }

        //@Risk Strategy - Updating On Front-End 
        this.state.carePlanData['services_multi'] && Object.keys(this.state.carePlanData['services_multi']['services_ref_id']).map((item) => {
          if ((fieldName === `risk_strategy_multi_${this.state.carePlanData['services_multi']['services_ref_id'][item]}`) && isJSON(postObj[fieldName])) {
            postObj[fieldName] = JSON.parse(postObj[fieldName])//@ Set current value in Front-End
            //@ If there is no ID, means Insert then set inserted id in "risk_strategy_ids" for future update without refresh
            if (!postObj['risk_strategy_id']) {
              let ids = cpd['risk_strategy_ids'] ? cpd['risk_strategy_ids'] : {};
              ids[postObj['serviceId']] = res.crs_id;
              postObj['risk_strategy_ids'] = ids;
            }//End if condition
          }//End if condition
        });

        this.setState({ carePlanData: { ...this.state.carePlanData, ...postObj } });
        this.showHideField(fieldName, false);
        this.props.updatedPDFLink && this.props.updatedPDFLink(res.carePlanPDFLink);
      });
    }, 200);
  }//End function

  showHideField = (fieldName, type) => {
    let showFieldObj = this.state.showFieldObj;
    showFieldObj[fieldName] = type;
    this.setState({ showFieldObj });
  }//End function

  editableField = (fieldName, label, fieldType = 'textarea') => {
    return (
      this.state.showFieldObj[fieldName] ?
        <>
          {fieldType === 'textarea' &&
            <>
              <div className="just-col head-start">
                <label className="pre-label">{label && label + ':'}</label>
                <Button size="small" className="edit-btn" onClick={() => { this.showHideField(fieldName, false); this.onChangeField(fieldName, this.state.carePlanData[fieldName]) }}><i className="las la-times-circle" /></Button>
              </div>
              <AntInput placeholder={label} name={fieldName} type={fieldType} onChange={(e) => this.onChangeField(fieldName, e)} />
            </>
          }
          {fieldType === 'editor' && <RichTextEditor height="170" className="m-b-10" toolType={2} onChange={(e) => this.onChangeField('special_comment', e)} statusbar={false} value={this.state.carePlanData[fieldName]} />}
          <div className="text-right">
            <Button size="small" onClick={() => { this.showHideField(fieldName, false); this.onChangeField(fieldName, this.state.carePlanData[fieldName]) }}>Cancel</Button>&nbsp;|&nbsp;
            <Button size="small" type="primary" htmlType="submit" loading={this.state.postLoader[fieldName]} onClick={() => this.setState({ selectedEditableField: fieldName })}>Save</Button>
          </div>
        </>
        :
        <>
          {/* <div className="field-side-label"> */}
          {/* <button type="button" className="btnToLink link-color" onClick={() => this.showHideField(fieldName, true)}><i className="fs-14 pos-relative top-1 las la-edit" /> Edit</button> */}
          {/* <Button size="small" type="primary" ghost className="edit-btn" onClick={() => this.showHideField(fieldName, true)}> Edit</Button> */}
          {/* </div> */}
          <div className="just-col head-start">
            <label className="pre-label">{label && label + ':'}</label>
            {AccessControl('27') && <Button size="small" type="primary" ghost className="edit-btn" onClick={() => this.showHideField(fieldName, true)}> Edit</Button>}
          </div>
          {fieldType === 'textarea' && <span className="textbox-value">{this.state.carePlanData[fieldName] ? this.state.carePlanData[fieldName] : '-'}</span>}
          {fieldType === 'editor' && (this.state.carePlanData[fieldName] ? <div dangerouslySetInnerHTML={{ __html: this.state.carePlanData[fieldName] }} /> : '-')}
        </>
    );
  }//End function

  simpleData = (fieldName, label) => {
    return (
      <>
        {label &&
          <div className="just-col head-start">
            <label className="pre-label">{label + ':'}</label>
          </div>
        }
        <span className="textbox-value">{this.state.carePlanData[fieldName] ? UCFirst(this.state.carePlanData[fieldName]) : '-'}</span>
      </>
    )//End return
  }//End function

  render() {
    const st = this.state;
    const fp = this.formRef.current;
    const ocf = this.onChangeField;
    // const fv = st.formValues;
    const cpd = st.carePlanData;
    // console.log(cpd);
    // console.log(multidimensionalObjectSeparateInstance(cpd['services_multi']));
    return (
      <div gutter={window.rowGutter} className="care_plan_container">
        <ScreenLoader active={st.getLoader}>
          <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
            <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />

            <strong className="heading-label-first">Participant General Information</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={6} md={6} sm={12} xs={24} className="just-col">
                {this.simpleData('name', 'Full Name')}
              </Col>
              <Col lg={6} md={6} sm={12} xs={24} className="just-col">
                {this.simpleData('gender', 'Gender')}
              </Col>
              <Col lg={6} md={6} sm={12} xs={24} className="just-col">
                {this.simpleData('dateOfBirth', 'Date Of Birth')}
              </Col>
              <Col lg={6} md={6} sm={12} xs={24} className="just-col">
                {this.simpleData('bornCountry', 'Place of Birth')}
              </Col>
              <Col lg={6} md={6} sm={12} xs={24} className="just-col">
                {this.simpleData('contactNumber', 'Contact Number')}
              </Col>
              <Col lg={18} md={18} sm={12} xs={24} className="just-col">
                {this.simpleData('street_address', 'Residential Address')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('emConDetails', 'Emergency Contact Details')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('supCorDetails', 'Support Coordinator Details')}
              </Col>
              <Col lg={24} md={24} sm={24} xs={24} className="just-col">
                {this.editableField('more_details', 'More Details')}
              </Col>
            </Row>

            <strong className="heading-label">Participant Information in Details</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.editableField('primaryDiagnos', 'Personal History Background')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.editableField('secondaryDiagnos', 'Health Issues/Diagnose')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.editableField('likes', 'Likes')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.editableField('dislikes', 'Dislikes')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.editableField('health_alerts', 'Any Health Alerts or Concerns')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.editableField('support_required', 'Support/Assistance Required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.editableField('special_instructions', 'Any Special Instructions to Staff')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.editableField('special_need', 'Any Special Need')}
              </Col>
            </Row>

            <strong className="heading-label">Safety Information</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('anyRisk', 'Any risk of self-harm identified')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('anyRiskSpecify', 'If yes, please specify')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('harmFromOther', 'Harm from others Identified')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('harmFromOtherSpecify', 'If yes, please specify')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('harmToOther', 'Harm to others identified')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('harmToOtherSpecify', 'If yes, please specify')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('anyPet', 'Any pets on the property')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('anyPetSpecify', 'If yes, please specify')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('anyFireamers', 'Any firearms being stored in the property')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('anyFireamersSpecify', 'If yes, please specify')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('anyDrugHistory', 'Any history or current of people using alcohol or drugs at the property')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('anyDrugHistorySpecify', 'If yes, please specify')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('anyRishToKnow', 'Any risk that support staff need to know')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('anyRishToKnowSpecify', 'If yes, please specify')}
              </Col>
            </Row>

            <strong className="heading-label">Mobility</strong>
            <strong className="heading-label-sub">a) Communication</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('hearing', 'Hearing OK')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('hearingSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('speech', 'Speech OK')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('speechSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('ableToWrite', 'Able to write')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('ableToWriteSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('englishSkill', 'English language skills')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('englishSkillSpecify', 'Hazards identified & actions required')}
              </Col>
            </Row>

            <strong className="heading-label-sub">b) Cognition</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('willingToParticipate', 'Client willing to participate and assist in care')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('willingToParticipateSpecity', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('orientation', 'Oriented in time and place')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('orientationSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('acceptDiraction', 'Client able to accept direction and instruction')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('acceptDiractionSpecific', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('shortMemory', 'Short-term memory issues')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('shortMemorySpecify', 'Hazards identified & actions required')}
              </Col>
            </Row>

            <strong className="heading-label-sub">c) Mobility</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('walkUnaided', 'Walk unaided')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('walkUnaidedSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('managesStairs', 'Manages stairs unaided')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('managesStairsSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('usesWalkingAid', 'Uses walking aid to walk')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('usesWalkingAidSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('wheelshair', 'Uses self-propelled wheelchair')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('wheelshairSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('usesElecWheelChair', 'Uses electric wheelchair/ scooter')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('usesElecWheelChairSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('transferIndep', 'Transfers independently')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('transferIndepSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('transferWithSuper', 'Transfers with supervision')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('transferWithSuperSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('transferWithHoist', 'Transfers with hoist')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('transferWithHoistSpecify', 'Hazards identified & actions required')}
              </Col>
            </Row>

            <strong className="heading-label-sub">d) Personal Care Assistance Required</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('bedMobility', 'Bed mobility')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('bedMobilitySpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('showering', 'Showering')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('showeringSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('toileting', 'Toileting')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('toiletingSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('grooming', 'Grooming')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('groomingSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('repoInBed', 'Repositioning in bed')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('repoInBedSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('repoInChair', 'Repositioning in chair')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('repoInChairSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('mouthCare', 'Mouth care')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('mouthCareSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('eating', 'Eating')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('eatingSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('skinCare', 'Skin care')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('skinCareSpecify', 'Hazards identified & actions required')}
              </Col>
            </Row>

            <strong className="heading-label-sub">e) Violence Risk</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('phyAggToSp', 'Physical aggression to support worker')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('phyAggToSpSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('verAggToSp', 'Verbal aggression to support worker')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('verAggToSpSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('aggToClients', 'Aggression to other clients')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('aggToClientsSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('aggWithObjects', 'Aggression with/against objects')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('aggWithObjectsSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('selfHarm', 'Self-harm')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('selfHarmSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('subAbuse', 'Substance abuse')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('subAbuseSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('sexualAbuse', 'Sexual abuse')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('sexualAbuseSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('threatsToStaff', 'Threats to staff in any way')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('threatsToStaffSpecify', 'Hazards identified & actions required')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('useEmotionToAcGols', 'Use of emotions to achieve goals')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('useEmotionToAcGolsSpecify', 'Hazards identified & actions required')}
              </Col>
            </Row>

            <strong className="heading-label-sub">f) Restrictive Practices</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('restrictivePractice', 'Does the participant has authorized restrictive practice?')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('restrictivePracticeSpecify', 'Specified in detail')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('behaviorSupportPlan', 'Does the participant have a behavior support plan if we identify restrictive practices while doing home risk assessments?')}
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} className="just-col">
                {this.simpleData('behaviorSupportPlanSpecify', 'Specified in detail')}
              </Col>
            </Row>

            <strong className="heading-label">Participant Goals</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={24} md={24} sm={24} xs={24} className="just-col">
                {this.simpleData('ndisGoals', 'Participant NDIS Goals')}
              </Col>
            </Row>

            {cpd['services_multi'] && Object.keys(cpd['services_multi']['services_ref_id']).map((item) => {
              var serviceId = cpd['services_multi']['services_ref_id'][item];
              return (
                serviceId &&
                <React.Fragment key={item}>
                  <strong className="heading-label">Participant Risk and Containment Strategies - ({GetObjectFromArr(serviceId, 'id', cpd['serviceListDB']).name})</strong>
                  <MultipleRiskStrategy
                    serviceId={serviceId}
                    formValues={multidimensionalObjectSeparateInstance(cpd[`risk_strategy_multi_${serviceId}`])}
                    onChange={(e) => ocf(`risk_strategy_multi_${serviceId}`, e)}
                    fp={fp}
                    onClose={() => this.onChangeField(`risk_strategy_multi_${serviceId}`, cpd[`risk_strategy_multi_${serviceId}`])}
                    onSave={() => this.setState({ selectedEditableField: `risk_strategy_multi_${serviceId}` })}
                    loading={st.postLoader[`risk_strategy_multi_${serviceId}`]}
                    showHideField={st.showFieldObj[`risk_strategy_multi_${serviceId}`]}
                    showHideFieldToggle={(e) => this.showHideField(`risk_strategy_multi_${serviceId}`, e)}
                  />
                </React.Fragment>
              )
            })}

            <strong className="heading-label">{st.companyDetails.name} Services to Participant</strong>
            <MultipleServices
              data={cpd.serviceListDB}
              formValues={multidimensionalObjectSeparateInstance(cpd['services_multi'])}
              onChange={(e) => ocf('services_multi', e)}
              fp={fp}
              onClose={() => this.onChangeField('services_multi', this.state.carePlanData['services_multi'])}
              onSave={() => this.setState({ selectedEditableField: 'services_multi' })}
              loading={st.postLoader['services_multi']}
              showHideField={st.showFieldObj['services_multi']}
              showHideFieldToggle={(e) => this.showHideField('services_multi', e)}
            />

            <strong className="heading-label">Any special Comments for Staff</strong>
            <Row gutter={window.rowGutter} className="list">
              <Col lg={24} md={24} sm={24} xs={24} className="just-col">
                {this.editableField('special_comment', 'Comment', 'editor')}
              </Col>
            </Row>

            {/* {cpd['risk_identified_multi'] && */}
            <>
              <strong className="heading-label">Risk Assessment</strong>
              <MultipleIdentifiedRisk
                formValues={multidimensionalObjectSeparateInstance(cpd['risk_identified_multi'])}
                onChange={(e) => ocf('risk_identified_multi', e)}
                fp={fp}
                onClose={() => this.onChangeField('risk_identified_multi', this.state.carePlanData['risk_identified_multi'])}
                onSave={() => this.setState({ selectedEditableField: 'risk_identified_multi' })}
                loading={st.postLoader['risk_identified_multi']}
                showHideField={st.showFieldObj['risk_identified_multi']}
                showHideFieldToggle={(e) => this.showHideField('risk_identified_multi', e)}
              />
            </>
            {/* } */}
          </Form>
        </ScreenLoader>
      </div>
    )//End return
  }//End render
  componentDidMount() { this.getData(this.props.clientId); }//End componentDidMount
  componentDidUpdate(prevProps) {
    if (prevProps.clientId !== this.props.clientId) { this.getData(this.props.clientId); }//End if condition
  }//End componentDidUpdate

}//End class
export default CarePlan;