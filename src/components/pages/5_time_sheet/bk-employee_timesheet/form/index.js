import React, { Component } from 'react';
import PageTitle from '../../../mutual/pageTitle';
import SignCanvas from '../../../../externalComponents/sign-canvas';
import MultiForm from './multiForm';
import { Row, Col, Form, Button, message, Modal } from 'antd';
import { HTTP, setFormStateValues, LoadArrLocalStorage } from '../../../../services';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import '../../styles.less';

const { confirm } = Modal;

class StaffTimeSheetForm extends Component {
  state = {
    sign: null,
    id: null,
    formValues: {},
    postLoader: false,
    postDraftLoader: false,
    getLoader: false,
    listData: {},
    status: 'unapproved',
    signImg: null,
    adminSign: null,
    adminSignImg: null,
    unapprovedStatus: false,
    approvedStatus: null,
    confirmModalShow: true
  }

  formRef = React.createRef();

  onChangeField = (fieldName, fieldValue) => {
    this.setState({ formValues: setFormStateValues(this.state.formValues, fieldName, fieldValue) }, () => {
      //console.log(this.state.formValues);
    });
  }//End function


  showConfirmOnUnapproved = (e) => {
    let th = this;
    confirm({
      title: 'Are you sure to send this timesheet for approval?',
      content: 'After clicking Yes button, timesheet will be sent for approval and could not be edit by you.',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        th.setState({ confirmModalShow: false }, () => {
          th.submitForm(e);
        });
      }
    });
  }//End function

  showConfirmOnApprove = (e) => {
    let th = this;
    confirm({
      title: 'Are you sure to approve this timesheet?',
      content: 'After clicking Yes button, timesheet will be sent for approval and could not be edit by you.',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        th.setState({ confirmModalShow: false }, () => {
          th.submitForm(e);
        });
      }
    });
  }//End function


  submitForm = (values) => {
    // e.preventDefault();
    setTimeout(() => {
      // this.props.form.validateFields((err, values) => {
      // if (err) { this.setState({ postDraftLoader: false }); return false }//End if condition

      if (!this.state.approvedStatus) {
        if (this.state.unapprovedStatus && !this.state.adminSign) {
          message.error('Please make admin signature'); return false;
        }//End if condition
        if (this.state.status === 'unapproved' && !this.state.unapprovedStatus && !this.state.sign && !this.state.signImg) {
          message.error('Please make staff signature'); return false;
        }//End if condition
        if (this.state.status === 'unapproved' && this.state.confirmModalShow) {
          this.showConfirmOnUnapproved(values); return false;
        }//End if condition
        if (this.state.status === 'approved' && this.state.confirmModalShow) {
          this.showConfirmOnApprove(values); return false;
        }//End if condition
      }//End if condition

      values.data = JSON.stringify(this.state.formValues.timesheet);
      values.sign = this.state.sign;
      values.adminSign = this.state.adminSign;
      values.fortnightDate = this.state.listData.fortnightDate;
      values.clientsList = JSON.stringify(this.state.listData.clients);
      values.status = this.state.status;
      values.id = this.state.id;
      this.state.status !== 'draft' && this.setState({ postLoader: true });
      //console.log(values);
      HTTP('post', '/timesheetStaff/post/', values).then(res => {
        this.setState({ postLoader: false, postDraftLoader: false });
        if (!res) return false;
        //console.log(res);
        this.props.history.push('/e/staffTimesheetLog');
      });
      // });
    }, 20);//End setTimeout to set form state on submit btn
  }//End function




  render() {
    const st = this.state;
    const fp = this.formRef.current;
    const fv = this.state.formValues;
    return (
      <div className="timesteets-container">
        <PageTitle
          titleIcon="las la-money-check"
          titleSpan="Staff"
          titleHeading="Timesheet"
          titleDesc={<span className="fortnightDate"><strong>Fortnight: </strong> {st.listData.fortnightDate && `${st.listData.fortnightDate[2]} to ${st.listData.fortnightDate[3]}`}
          </span>}
          breadcrumb={[
            { iconLas: 'las la-book', label: 'Timesheets' },
            { iconLas: 'las la-money-check', label: 'Staff Timesheet' }
          ]}
        />
        <Row gutter={window.rowGutter}>
          <Col lg={19} md={24} sm={24} xs={24}>
            <div className="container">
              <ScreenLoader active={st.getLoader || st.postLoader}>
                <Form className="form-style-1" ref={this.formRef} layout="vertical" onFinish={this.submitForm} onFinishFailed={() => this.setState({ postDraftLoader: false })} autoComplete="off">
                  <MultiForm data={st.listData} fp={fp} onChange={(e) => this.onChangeField('timesheet', e)} formValues={fv} />

                  {st.approvedStatus ?
                    <Row gutter={window.rowGutterSmall} >
                      <Col lg={12} md={12} sm={24} xs={24}>
                        {st.signImg && <React.Fragment><strong>Staff Signature:</strong><div className="past-sign emp"><img src={st.signImg} alt="" /></div></React.Fragment>}
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        {st.adminSignImg && <React.Fragment><strong>Manager Signature/Approval:</strong><div className="past-sign emp"><img src={st.adminSignImg} alt="" /></div></React.Fragment>}
                      </Col>
                    </Row>
                    :
                    st.unapprovedStatus ?
                      <Row gutter={window.rowGutterSmall} >
                        <Col lg={12} md={12} sm={24} xs={24}>
                          <strong>Manager Signature/Approval:</strong>
                          <SignCanvas onChange={(e) => this.setState({ adminSign: e })} />
                        </Col>
                        <Col lg={12} md={12} sm={24} xs={24}>
                          {st.signImg && <React.Fragment><strong>Staff Signature:</strong><div className="past-sign emp"><img src={st.signImg} alt="" /></div></React.Fragment>}
                        </Col>
                      </Row>
                      : <Row gutter={window.rowGutterSmall} >
                        <Col lg={12} md={12} sm={24} xs={24}>
                          <strong>Staff Signature:</strong>
                          <SignCanvas onChange={(e) => this.setState({ sign: e })} />
                        </Col>
                        <Col lg={12} md={12} sm={24} xs={24}>
                          {st.signImg && <React.Fragment><strong>Your Past Signature:</strong><div className="past-sign emp"><img src={st.signImg} alt="" /></div></React.Fragment>}
                        </Col>
                      </Row>

                  }




                  <hr className="hr-2" />
                  <div className="text-right">

                    {/* {(!st.unapprovedStatus && !st.approvedStatus) &&
                      <React.Fragment>
                        <Button size="large" htmlType="submit" onClick={() => this.setState({ status: 'draft', postDraftLoader: true })} loading={st.postDraftLoader} disabled={st.postLoader}>Draft</Button>
                        <div className="p-l-5 p-r-5 dis-inline-block">|</div>
                      </React.Fragment>
                    } */}

                    {/* <Button size="large" type="primary" htmlType="submit" onClick={() => this.setState({ status: 'approved' })} loading={st.postLoader}>{st.unapprovedStatus ? 'Approve' : (st.approvedStatus ? 'Update' : 'Send for approval')}</Button> */}
                    {(st.unapprovedStatus || st.approvedStatus) && <Button size="large" type="primary" htmlType="submit" onClick={() => this.setState({ status: 'approved' })} loading={st.postLoader}>{st.unapprovedStatus ? 'Approve' : (st.approvedStatus ? 'Update' : '')}</Button>}
                    {(!st.unapprovedStatus && !st.approvedStatus) && <Button size="large" type="primary" htmlType="submit" loading={st.postLoader} disabled={st.postDraftLoader}>Send for approval</Button>}
                  </div>

                </Form>
              </ScreenLoader>
            </div>
          </Col>
          <Col lg={5} md={24} sm={24} xs={24}>
            <div className="container">
              <ul className="sideInloList">
                <li><span>MT</span> = Meal Time</li>
                <li><span>NH</span> = Normal Hours</li>
                <li><span>WH</span> = Weekend Hours</li>
                <li><span>PH</span> = Public Holidays</li>
                <li><span>EH</span> = Educational Hours</li>
                <li><span>KMT</span> = Kilometers Traveled</li>
              </ul>
              <hr className="hr-1" />
              <div><strong>NOTE:</strong><br />Add value as hour in input fields.</div>
            </div>
          </Col>
        </Row>
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    // console.log(this.props.match.params);
    let id = this.props.match.params.id ? LoadArrLocalStorage(this.props.match.params.id) : '';
    this.setState({ getLoader: true, id: id });
    HTTP('get', '/timesheetStaff/get/index/id/' + id).then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      // console.log(res);
      this.setState({
        listData: res.data,
        formValues: res.data.formValues ? res.data.formValues : {},
        signImg: res.data.signImg,
        adminSignImg: res.data.adminSignImg,
        unapprovedStatus: (res.data.status === 'unapproved' ? true : false),
        approvedStatus: (res.data.status === 'approved' ? true : false)
      });
      // this.setState({ listData: res.data });
    });
  }//End componentDidMount
}//End class

export default StaffTimeSheetForm;