import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'antd';
import UploadImage from '../../externalComponents/andt-upload-and-crop-image-component'
import { AntInput } from '../../externalComponents/antd-fields';
import { HTTP, GetObjectFromArr, GetCurrentDate, GetCurrentTime } from '../../services';


class TeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      profileImg: '',
      defaultImg: ''
    };
  }

  formRef = React.createRef();

  submitForm = (values) => {
    // e.preventDefault();
    // this.props.fp.validateFields((err, values) => {
    // if (err) { return false }//End if condition
    this.state.profileImg && (values.profileImg = this.state.profileImg);
    this.setState({ loader: true });
    HTTP('post', '/team/post/', values).then(res => {
      this.setState({ loader: false });
      if (!res) return false;
      this.formRef.current.resetFields();
      values.name = values.full_name;
      values.profileImg = res.profileImg ? res.profileImg : this.state.profileImg;
      //console.log(values);
      values.bornCountryName = GetObjectFromArr(values.bornCountry, 'id', this.props.countryList).name
      if (values.id) {
        this.props.updateData(values);
      } else {
        values.id = res.id;
        values.inserted_date = GetCurrentDate() + ', ' + GetCurrentTime();
        values.teamStatus = 'active';
        this.props.addData(values);
      }//End if condition
      this.props.closeModal();
      this.setState({ profileImg: '' });
    });
    // });
  }//End function

  render() {
    const fp = this.formRef.current;
    const st = this.state;
    return (
      <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm}>
        <AntInput name="id" containerClassName="dis-none-imp" noRequired={true} />
        <Row gutter={window.rowGutterSmall}>
          <Col lg={7} md={7} sm={24} xs={24}>
            <div className="upload_image">
              <UploadImage
                title="Upload a new image"
                defaultImageUrl={st.profileImg ? st.profileImg : st.defaultImg}
                onChange={(e) => this.setState({ profileImg: e })}
                width={194}
                height={213}
                type="button"
                imageType="square"
              />
            </div>
          </Col>
          <Col lg={17} md={17} sm={24} xs={24}>

            <Row gutter={window.rowGutter}>
              <Col lg={12} md={12} xs={24}>
                <AntInput name="full_name" label="Full Name" />
              </Col>
              <Col lg={12} md={12} xs={24}>
                <AntInput label="Position" name="teamPosition" />
              </Col>
            </Row>
            <Row gutter={window.rowGutter}>
              <Col lg={12} md={12} xs={24}>
                <AntInput name="otherLanguageSpeak" label="Languages can speak" />
              </Col>
              <Col lg={12} md={12} xs={24}>
                <AntInput type="select" label="Country of Birth" name="bornCountry" options={this.props.countryList} setValueLabel={['id', 'name']} filter={true} />
              </Col>
            </Row>
            <Row gutter={window.rowGutter}>
              <Col lg={12} md={12} xs={24}>
                <AntInput name="aboutExperience" type="textarea" label="Experience" noRequired={true} />
              </Col>
              <Col lg={12} md={12} xs={24}>
                <AntInput name="description" type="textarea" label="Description" noRequired={true} />
              </Col>
            </Row>

          </Col>
        </Row>
        <hr className="hr-1" /><br />
        <div className="flex-r-m">
          <Button size="large" type="primary" htmlType="submit" loading={this.state.loader}>
            {fp && fp.getFieldValue('id') ? 'Update' : 'Add New'} Member
          </Button>
        </div>
      </Form>
    );//End return
  }//End render

  componentDidUpdate(prevProps) {
    if ((this.props.data !== prevProps.data) && this.props.data && this.props.data.id) {
      let data = this.props.data;
      this.formRef.current.setFieldsValue({
        'id': data.id,
        'full_name': data.name,
        'teamPosition': data.teamPosition,
        'gender': data.gender,
        'otherLanguageSpeak': data.otherLanguageSpeak,
        'bornCountry': data.bornCountry,
        'aboutExperience': data.aboutExperience,
        'description': data.description
      });
      this.setState({ defaultImg: data.profileImg });
    }//End if condition
  }//End componentDidUpdate
}//End class


export default TeamForm;