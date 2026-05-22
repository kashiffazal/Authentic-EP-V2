import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'antd';
import PageTitle from '../../../mutual/pageTitle';
import { HTTP, setFormStateValues } from '../../../../services';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import { AntInput } from '../../../../externalComponents/antd-fields';
// import MultipleRiskStrategy from './multiRistStrategy';
// import MultipleIdentifiedRisk from './multiIdentifiedRisk';
import RichTextEditor from '../../../../externalComponents/rich-text-editor';
// import './styles.less';

class CarePlanForm extends Component {
  state = {
    loader: false,
    data: {},
    formValues: {}
  }//End state
  formRef = React.createRef();


  onChangeField = (fieldName, fieldValue) => {
    this.setState({ formValues: setFormStateValues(this.state.formValues, fieldName, fieldValue) }, () => {
      // console.log(this.state.formValues);
    });
  }//End function

  submitForm = (values) => {
    this.setState({ loader: true });
    HTTP('post', '/incident/post/index/', values).then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      if (values.id) {
        this.props.history.push('/e/carePlanLog');
      } else {
        this.formRef.current.resetFields();
      }//End if condition
    });
  }//End function

  render() {
    const st = this.state;
    const fp = this.formRef.current;
    const ocf = this.onChangeField;
    const fv = st.formValues;
    return (
      <React.Fragment>
        <PageTitle
          titleIcon="las la-file-medical"
          titleSpan="Care Plan"
          titleHeading="Form"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-id-card', label: 'Clients' },
            { iconLas: 'las la-folder', label: 'Care Plan' },
            { iconLas: 'las la-file-medical', label: 'Add New' }
          ]}
        />
        <Row gutter={window.rowGutter} className="care_plan_container">
          <Col lg={19} md={24} sm={24} xs={24}>
            <div className="container">
              <ScreenLoader active={st.getLoader}>
                <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
                  <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
                  {/* <AntInput label="Client Name" name="client_ref_id" filter={true} options={st.data.clientList} type="select" onChange={(e) => ocf('next_of_kin', e)} /> */}
                  <strong className="heading-label">Participant Information in Details</strong>

                  <Row gutter={window.rowGutter}>
                    <Col lg={6} md={6} sm={12} xs={24}>
                      <AntInput label="Personal History Background" name="personal_history" type="textarea" onChange={(e) => ocf('personal_history', e)} />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={24}>
                      <AntInput label="Health Issues/Diagnose" name="health_issues" type="textarea" onChange={(e) => ocf('health_issues', e)} />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={24}>
                      <AntInput label="Like" name="likes" type="textarea" onChange={(e) => ocf('likes', e)} />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={24}>
                      <AntInput label="Dislike" name="dislikes" type="textarea" onChange={(e) => ocf('dislikes', e)} />
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={24}>
                      <AntInput label="Any Health Alerts or Concerns" name="health_alerts" type="textarea" onChange={(e) => ocf('health_alerts', e)} />
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={24}>
                      <AntInput label="Support/Assistance Required" name="support_required" type="textarea" onChange={(e) => ocf('support_required', e)} />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={24}>
                      <AntInput label="Any Special Instructions to Staff" name="special_instructions" type="textarea" onChange={(e) => ocf('special_instructions', e)} />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={24}>
                      <AntInput label="Any Special Need" name="special_need" type="textarea" onChange={(e) => ocf('special_need', e)} />
                    </Col>
                  </Row>
                  {/* <AntInput label="Support/Assistance Required" name="support_assistance" onChange={(e) => ocf('support_assistance', e)} /> */}
                  <strong className="heading-label">Participant Risk and Containment Strategies</strong>
                  {/* <MultipleRiskStrategy formValues={fv} onChange={(e) => ocf('risk_strategy_multi', e)} fp={fp} /> */}
                  <strong className="heading-label">Any special Comments for Staff</strong>
                  <div className="m-b-15">
                    <RichTextEditor height="200" onChange={(e) => ocf('special_comment', e)} value="kashif" />
                  </div>
                  <strong className="heading-label">Risk Assessment</strong>
                  {/* <MultipleIdentifiedRisk formValues={fv} onChange={(e) => ocf('risk_identified_multi', e)} fp={fp} /> */}
                  <div className="flex-sb">
                    <Button size="large" type="primary" htmlType="submit">Next <i className="las la-angle-double-right m-l-5 pos-relative top-1" /></Button>
                  </div>
                </Form>
              </ScreenLoader>
            </div>
          </Col>
          <Col lg={5} md={24} sm={24} xs={24}>
            <div className="container">
              asdf
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )//End return
  }//End render
}//End class
export default CarePlanForm;