import React, { Component } from 'react';
import PageTitle from '../../../mutual/pageTitle';
import SignCanvas from '../../../../externalComponents/sign-canvas';
import { Row, Col, Button, message, Modal } from 'antd';
import { HTTP, LoadArrLocalStorage } from '../../../../services';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import '../../styles.less';

const { confirm } = Modal;

class StaffTimeSheetForm extends Component {
  state = {
    // sign: null,
    id: null,
    spwName: '',
    // formValues: {},
    postLoader: false,
    // postDraftLoader: false,
    getLoader: false,
    data: {},
    fortnightDate: '',
    // status: 'unapproved',
    // signImg: null,
    adminSign: null,
    adminSignImg: null,
    unapprovedStatus: false,
    approvedStatus: null,
    confirmModalShow: true
  }


  // showConfirmOnUnapproved = (e) => {
  //   let th = this;
  //   confirm({
  //     title: 'Are you sure to send this timesheet for approval?',
  //     content: 'After clicking Yes button, timesheet will be sent for approval and could not be edit by you.',
  //     okText: 'Yes',
  //     cancelText: 'No',
  //     onOk() {
  //       th.setState({ confirmModalShow: false }, () => {
  //         th.submitForm(e);
  //       });
  //     }
  //   });
  // }//End function

  showConfirmOnApprove = () => {
    let th = this;
    confirm({
      title: 'Are you sure to sign this timesheet?',
      content: 'After clicking Yes button, timesheet will be signed.',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        th.setState({ confirmModalShow: false }, () => {
          th.submitForm();
        });
      }
    });
  }//End function

  submitForm = () => {
    if (this.state.unapprovedStatus) {
      if (!this.state.adminSign) { message.error('Please make admin signature'); return false; }//End if condition
      if (this.state.confirmModalShow) { this.showConfirmOnApprove(); return false; }//End if condition        }//End if condition
    }//End if condition
    let values = {};
    values.adminSign = this.state.adminSign;
    values.id = this.state.id;
    //console.log(values);
    this.setState({ postLoader: true });
    HTTP('post', '/timesheetStaff/post/', values).then(res => {
      this.setState({ postLoader: false });
      if (!res) return false;
      //console.log(res);
      this.props.history.push('/e/staffTimesheetLog');
    });
    // });
    // }, 20);//End setTimeout to set form state on submit btn
  }//End function

  render() {
    const st = this.state;
    // console.log(st.data);
    // const fp = this.props.form;
    // const fv = this.state.formValues;
    return (
      <div className="timesteets-container">
        <PageTitle
          titleIcon="las la-money-check"
          titleSpan="Staff Timesheet"
          titleHeading={`(${st.spwName})`}
          titleDesc={<span className="fortnightDate"><strong>Fortnight: </strong> {st.fortnightDate && `${st.fortnightDate[2]} to ${st.fortnightDate[3]}`}
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
                {/* <Form className="form-style-1" onSubmit={this.submitForm} autoComplete="off"> */}

                {Object.keys(st.data).length > 0 && Object.keys(st.data.date).map((item, i) => {
                  return (
                    <div key={i}>
                      <Row gutter={window.rowGutterSmall} className="row-col-as-table">
                        <Col lg={3} md={3} sm={12} xs={24}><label>Date:</label><span className="value">{st.data.date[item]}</span></Col>
                        <Col lg={3} md={3} sm={12} xs={24}><label>Shift No:</label><span className="value">{st.data.shift_no ? st.data.shift_no[item] : '-'}</span></Col>
                        <Col lg={6} md={6} sm={12} xs={24}><label>Client Name:</label><span className="value">{st.data.client_name[item]}</span></Col>
                        <Col lg={12} md={12} sm={24} xs={24}><label>Service Type:</label><span className="value">{st.data.service_type[item]}</span></Col>
                        <Col lg={6} md={6} sm={12} xs={24}><label>Start Time:</label><span className="value">{(st.data.start_time_mod && st.data.start_time_mod[item]) ? st.data.start_time_mod[item] : st.data.start_time[item]}</span></Col>
                        <Col lg={6} md={6} sm={12} xs={24}><label>End Time:</label><span className="value">{(st.data.end_time_mod && st.data.end_time_mod[item]) ? st.data.end_time_mod[item] : st.data.end_time[item]}</span></Col>
                        <Col lg={6} md={6} sm={12} xs={24}><label>KM Travel:</label><span className="value">{st.data.km_travel[item] ? st.data.km_travel[item] : '0'}</span></Col>
                        <Col lg={6} md={6} sm={12} xs={24}><label>Working Day Hour:</label><span className="value">{st.data.normal_hour[item] ? st.data.normal_hour[item] : '0'}</span></Col>
                        <Col lg={6} md={6} sm={12} xs={24}><label>Weekend Hour (Saturday):</label><span className="value">{st.data.weekend_hour_sat[item] ? st.data.weekend_hour_sat[item] : '0'}</span></Col>
                        <Col lg={6} md={6} sm={12} xs={24}><label>Weekend Hour (Sunday):</label><span className="value">{st.data.weekend_hour_sun[item] ? st.data.weekend_hour_sun[item] : '0'}</span></Col>
                        <Col lg={6} md={6} sm={12} xs={24}><label>Public Holiday Hour:</label><span className="value">{st.data.public_holidays_hour[item] ? st.data.public_holidays_hour[item] : '0'}</span></Col>
                        <Col lg={6} md={6} sm={12} xs={24}><label>Total {st.data.day_hour_label[item]} Hour:</label><span className="value">{st.data.total_hour[item] ? st.data.total_hour[item] : '0'}</span></Col>
                        <Col lg={24} md={24} sm={24} xs={24}><label>Description:</label><span className="value">{st.data.description[item] ? st.data.description[item] : '-'}</span></Col>
                        <Col lg={12} md={12} sm={12} xs={24}><label>Client Signature:</label><span className="value"><div className="emp"><img src={st.data.client_sign[item]} alt="" /></div></span></Col>
                        <Col lg={12} md={12} sm={12} xs={24}><label>Support Worker Signature:</label><span className="value"><div className="emp"><img src={st.data.staff_sign[item]} alt="" /></div></span></Col>
                      </Row>
                      <hr className="hr-1 p-0 m-t-12 m-b-12" />
                    </div>
                  )
                })}

                {st.approvedStatus ?
                  st.adminSignImg && <React.Fragment><strong>Manager Signature/Approval:</strong><div className="past-sign emp"><img src={st.adminSignImg} alt="" /></div></React.Fragment>
                  :
                  <React.Fragment>

                    <SignCanvas
                      label={<strong>Manager Signature/Approval:</strong>}
                      onChange={(e) => this.setState({ adminSign: e })}
                      name="adminSign"
                      currentValue={st.adminSign}
                      width={337}
                      height={193}
                    />
                  </React.Fragment>
                }



                {!st.approvedStatus &&
                  <div className="text-right">
                    <hr className="hr-2" />
                    <Button size="large" type="primary" onClick={() => this.submitForm()} loading={st.postLoader}>Signed</Button>
                  </div>
                }

                {/* </Form> */}
              </ScreenLoader>
            </div>
          </Col>
          <Col lg={5} md={24} sm={24} xs={24}>
            <div className="container">
              <ul className="sideInloList">
                <li><span className="fs-12">Fortnight Start</span>: {st.fortnightDate && st.fortnightDate[2]}</li>
                <li><span className="fs-12">Fortnight End</span>: {st.fortnightDate && st.fortnightDate[3]}</li>
              </ul>
            </div>
            {/* 

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
            </div> */}
          </Col>
        </Row>
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    // console.log(this.props.match.params);
    let data = this.props.match.params.id ? LoadArrLocalStorage(this.props.match.params.id) : {};
    this.setState({ getLoader: true, id: data.id, spwName: data.swp_name });
    HTTP('get', '/timesheetStaff/get/index/id/' + data.id).then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      // console.log(res);
      this.setState({
        data: res.data.data,
        fortnightDate: res.data.fortnightDate,
        // formValues: res.data.formValues ? res.data.formValues : {},
        // signImg: res.data.signImg,
        adminSignImg: res.data.adminSignImg,
        unapprovedStatus: (res.data.status === 'unapproved' ? true : false),
        approvedStatus: (res.data.status === 'approved' ? true : false)
      });
      // this.setState({ data: res.data });
    });
  }//End componentDidMount
}//End class

export default StaffTimeSheetForm;