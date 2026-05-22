import React, { Component } from 'react';
import { Form, Row, Col, Button, Empty } from 'antd';
import PageTitle from '../mutual/pageTitle';
import { AntInput } from '../../externalComponents/antd-fields';
import { HTTP, GetDaysFromTowDate, SetDatePicker, AccessControl } from '../../services';
import ScreenLoader from '../../externalComponents/screen-loader';
import './styles.less';

class DocumentTracking extends Component {
  state = {
    getLoader: false,
    postLoader: false,
    getExpiryLoader: false,
    data: { clients: [], supportWorker: [] },
    docList: {
      'clients': [
        { label: 'NDIS Plan Expiry', name: 'ndis_plan_expiry' },
        // { label: 'DOB Reminder', name: 'dob_reminder' },
        { label: 'Service Agreement Expiry', name: 'service_agreement_expiry' }
      ],
      'supportWorker': [
        { label: 'Driver License', name: 'driving_license' },
        { label: 'Medicare Care', name: 'medicare_care' },
        { label: 'Police Check', name: 'police_check' },
        { label: 'Car Insurance', name: 'car_insurance' },
        { label: 'Passport', name: 'passport' },
        { label: 'Working with Children Card', name: 'working_with_children_card' },
        { label: 'NDIS Worker Screening Check', name: 'ndis_worker_screening_check' },
        { label: 'First Aid Certificate', name: 'first_aid_certificate' },
        { label: 'Manual Handling Certificate', name: 'manual_handling_certificate' },
        { label: 'Food Handling Certificate', name: 'food_handling_certificate' },
        { label: 'Flu Vaccination Certificate', name: 'flu_vaccination_certificate' }
      ]
    },
    selectedType: ''
  }//End state

  formRef = React.createRef();

  submitForm = (values) => {
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    // if (err) { return false }//End if condition
    this.setState({ postLoader: true });
    HTTP('post', '/documentTracking/post/', values).then(res => {
      this.setState({ postLoader: false });
      if (!res) return false;
      this.formRef.current.resetFields();
    });
    // });
  }//End function

  emptyDateFields = (type, id) => {
    this.formRef.current.resetFields();
    this.formRef.current.setFieldsValue({ type: type });
    if (type === 'clients') {
      this.formRef.current.setFieldsValue({ client_ref_id: id });
    } else {
      this.formRef.current.setFieldsValue({ sp_ref_id: id });
    }//End if condition
  }//End function

  getExpiryDataOnByClient = (id) => {
    let type = this.formRef.current.getFieldValue('type');
    if (!id) { this.emptyDateFields(type, id); return false; }//End if condition
    this.setState({ getExpiryLoader: true });
    HTTP('get', '/documentTracking/get/getExpiryDate/id/' + id + '/type/' + type).then(res => {
      this.setState({ getExpiryLoader: false });
      if (!res) return false;
      // console.log(res);
      if (res.data) {
        let fieldObj = { id: res.data.id };
        this.state.docList[type].forEach(item => {
          res.data[item.name] = res.data[item.name] ? SetDatePicker(res.data[item.name]) : undefined;
          fieldObj[item.name] = res.data[item.name];
        })
        this.formRef.current.setFieldsValue(fieldObj);
      } else {
        this.emptyDateFields(type, id);
      }//End if condition
      // console.log(fieldObj);
      // console.log(res.data);
    });
  }//End function

  render() {
    const st = this.state;
    const fp = this.formRef.current;
    const addOrUpdatePermission = !AccessControl(100);
    return (
      <div className="document-tracking-container">
        <PageTitle
          titleIcon="las la-calendar-check"
          titleSpan="Document"
          titleHeading="Tracking"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-calendar-check', label: 'Document Tracking' }
          ]}
        />
        <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
          <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
          <Row gutter={window.rowGutter}>
            <Col lg={8} md={8} sm={24} xs={24}>
              <div className="container">
                <AntInput label="Type" type="select" name="type" options={[
                  { label: 'Client', value: 'clients' },
                  { label: 'Support Worker', value: 'supportWorker' }
                ]} filter={true} onChange={(e) => this.setState({ selectedType: e })} />
                {st.selectedType === 'clients' && <AntInput label="Select Client Name" type="select" name="client_ref_id" options={st.data.clients} setValueLabel={['id', 'name']} filter={true} loading={st.getLoader} onChange={(e) => this.getExpiryDataOnByClient(e)} />}
                {st.selectedType === 'supportWorker' && <AntInput label="Select Support Worker" type="select" name="sp_ref_id" options={st.data.supportWorker} setValueLabel={['id', 'name']} filter={true} loading={st.getLoader} onChange={(e) => this.getExpiryDataOnByClient(e)} />}
              </div>
            </Col>
            <Col lg={16} md={16} sm={24} xs={24}>
              <div className="container">
                <ScreenLoader active={st.getExpiryLoader}>
                  {!st.selectedType && <Empty />}
                  {st.selectedType && st.docList[st.selectedType].map((item, i) => {
                    return (
                      <div className="row" key={i} style={fp && fp.getFieldValue(item.name) && { background: (GetDaysFromTowDate(fp.getFieldValue(item.name))) > 0 ? '' : '#ffcfd1' }}>
                        <Row gutter={window.rowGutter} type="flex" justify="space-around" align="middle">
                          <Col lg={8} md={24} sm={24} xs={24}>
                            <span className="fw-500">{item.label}</span>
                          </Col>
                          <Col lg={8} md={24} sm={24} xs={24}>
                            <AntInput type="datepicker" name={item.name} containerClassName="expDate" placeholder="Please select Expiry Date" disabled={addOrUpdatePermission} noRequired={true} />
                          </Col>
                          <Col lg={8} md={24} sm={24} xs={24}>
                            <span style={{ color: '#666464', fontStyle: 'italic' }}>{fp && fp.getFieldValue(item.name) && 'Expiring in ' + GetDaysFromTowDate(fp.getFieldValue(item.name)) + ' days.'}</span>
                          </Col>
                        </Row>
                      </div>
                    )
                  })}
                  {((!addOrUpdatePermission) && st.selectedType) &&
                    <div className="text-right">
                      <hr className="hr-1" />
                      <Button size="large" type="primary" htmlType="submit" loading={st.postLoader} >Update</Button>
                    </div>
                  }
                </ScreenLoader>
              </div>
            </Col>
          </Row>
        </Form>

      </div>
    )//End Return statement
  }//end End Render
  componentDidMount() {
    this.setState({ getLoader: true });
    HTTP('get', '/documentTracking/get/').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ data: res.data });
    });
  }//End componentDidMount
}//End class

export default DocumentTracking;
