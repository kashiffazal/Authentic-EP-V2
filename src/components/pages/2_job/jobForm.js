import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'antd';
import { AntInput } from '../../externalComponents/antd-fields';
import { HTTP, GetObjectFromArr, GetCurrentDate, GetCurrentTime } from '../../services';

class jobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      timeList: {},
    };
  }

  formRef = React.createRef();

  submitForm = (values) => {
    // e.preventDefault();
    // this.props.fp.validateFields((err, values) => {
      // if (err) { return false }//End if condition
      this.setState({ loader: true });
      HTTP('post', '/job/post/', values).then(res => {
        this.setState({ loader: false });
        if (!res) return false;
        this.formRef.current.resetFields();
        if (values.id) {
          this.props.updateData(values);
        } else {
          values.id = res.id;
          values.timing = GetObjectFromArr(values.timing_ref_id, 'value', this.state.timeList).label
          values.inserted_by = window.userData.first_name + ' ' + window.userData.last_name;
          values.inserted_by_date = GetCurrentDate() + ', ' + GetCurrentTime();
          values.status = 'active';
          values.job_count = '';
          this.props.addData(values);
        }//End if condition
        this.props.closeModal();
      });
    // });
  }//End function

  render() {
    const fp = this.formRef.current;
    return (
      <div>
        <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} autoComplete="off">
          <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
          <Row gutter={window.rowGutter}>
            <Col lg={8} md={24} sm={24} xs={24}>
              <AntInput label="Job Title" name="title" placeholder="Please type Job Title" />
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
              <AntInput label="Job Position" name="position" placeholder="Please type Job Position" />
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
              <AntInput type="select" label="Timing" name="timing_ref_id" options={this.state.timeList} filter={true} />
            </Col>
          </Row>
          <AntInput type="textarea" label="Description" name="description" placeholder="Please type Description" />
          <hr className="hr-1" /><br />
          <div className="flex-r-m">
            <Button size="large" type="primary" htmlType="submit" loading={this.state.loader}>
              {fp && fp.getFieldValue('id') ? 'Update' : 'Add New'} Job
            </Button>
          </div>
        </Form>
      </div>
    );//End return
  }//End render
  componentDidMount() {
    this.setState({ timeList: this.props.timeList });
  }//End componentDidMount
  componentDidUpdate(prevProps) {
    if ((this.props.data !== prevProps.data) && this.props.data && this.props.data.id) {
      let data = this.props.data;
      this.formRef.current.setFieldsValue({
        'id': data.id,
        'title': data.title,
        'position': data.position,
        'timing_ref_id': data.timing_ref_id,
        'description': data.description,
      })
    }//End if condition
    if (prevProps.timeList !== this.props.timeList) {
      this.setState({ timeList: this.props.timeList });
    }//End if condition
  }//End componentDidUpdate
}//End class


export default jobForm;