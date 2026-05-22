import React, { Component } from 'react';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import { Row, Col } from 'antd';

class Step_2 extends Component {
  render() {
    const pr = this.props;
    const fv = this.props.fv;
    const ocf = this.props.ocf;
    return (
      <React.Fragment>
        <h2 className="form_heading_sub">Details of incident or accident:</h2>
        <hr className="form_hr_sub" />
        <Row gutter={window.rowGutter}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput type="checkbox" name="location_of_incident" vertical containerClassName="long_label"
              label="Location of Injury"
              group={[
                { value: 'head_face', label: 'Head/Face' },
                { value: 'eye', label: 'Eye' },
                { value: 'internal_organs', label: 'Internal organs' },
                { value: 'hand_fingers', label: 'Hand/fingers' },
                { value: 'shoulders_arms', label: 'Shoulder/Arms' },
                { value: 'trunk', label: 'Trunk ( other than back )' },
                { value: 'hip_leg', label: 'Hip/Leg' },
                { value: 'foot_toes', label: 'Foot/Toes' },
                { value: 'back', label: 'Back' },
                { value: 'others', label: 'Others' }
              ]}
              // reqMsg="Choose your option(s)"
              // value={fv.sharingInformation}
              onChange={(e) => ocf('location_of_incident', e)}
            />
            {
              fv.location_of_incident && fv.location_of_incident.find((e) => e === 'others') &&
              <AntInput label="Others" name="location_of_incident_others" onChange={(e) => ocf('location_of_incident_others', e)} />
            }
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <AntInput type="checkbox" name="injury_details" vertical containerClassName="long_label"
              label="Injury Details"
              group={[
                { value: 'contusion_crush', label: 'Contusion/Crush' },
                { value: 'burn', label: 'Burn' },
                { value: 'dislocation', label: 'Dislocation' },
                { value: 'amputation', label: 'Amputation' },
                { value: 'laceration_open_wound', label: 'Laceration/Open wound' },
                { value: 'superficial_injury', label: 'Superficial injury' },
                { value: 'foreign_body', label: 'Foreign body' },
                { value: 'internal_injury', label: 'Internal Injury' },
                { value: 'concussion', label: 'Concussion' },
                { value: 'sprain_stain', label: 'Sprain/Stain' },
                { value: 'fracture', label: 'Fracture' },
                { value: 'dermatitis', label: 'Dermatitis' },
                { value: 'others', label: 'Others' }
              ]}
              // reqMsg="Choose your option(s)"
              // value={fv.sharingInformation}
              onChange={(e) => ocf('injury_details', e)}
            />
            {
              fv.injury_details && fv.injury_details.find((e) => e === 'others') &&
              <AntInput label="Others" name="injury_details_others" onChange={(e) => ocf('injury_details_others', e)} />
            }
          </Col>
          <Col lg={(pr.spList.length > 1) ? 8 : 12} md={(pr.spList.length > 1) ? 8 : 12} sm={24} xs={24}>
            <AntInput type="datepicker" label="Date of, or disclosure of, event" name="date_of_injury" onChange={(e) => ocf('date_of_injury', e)} />
          </Col>
          <Col lg={(pr.spList.length > 1) ? 8 : 12} md={(pr.spList.length > 1) ? 8 : 12} sm={24} xs={24}>
            <AntInput type="timepicker" label="Time of Incident" name="time_of_injury" onChange={(e) => ocf('time_of_injury', e)} />
          </Col>
          {pr.spList.length > 1 &&
            <Col lg={8} md={8} sm={24} xs={24}>
              <AntInput label="Activity engaged in at time of incident" name="activity_engaged" filter={true} options={pr.spList} type="select" onChange={(e) => ocf('activity_engaged', e)} />
            </Col>
          }
        </Row>
        <AntInput type="textarea" label="Describe how and what happened. Please include car registration number if reporting a Motor Vehicle Accident)" name="what_happen" style={{ height: '150px' }} onChange={(e) => ocf('what_happen', e)} />
      </React.Fragment>
    )//End return
  }//End render
  // componentDidMount() {
  //   setTimeout(() => {
  //     let fv = this.props.fv;
  //     this.props.fp.setFieldsValue({
  //       'location_of_incident': fv.location_of_incident,
  //       'location_of_incident_others': fv.location_of_incident_others,
  //       'injury_details_others': fv.injury_details_others,
  //       'next_of_kin': fv.next_of_kin,
  //       'report_non_report': fv.report_non_report,
  //       'reportable_list': fv.reportable_list,
  //       'rate_risk': fv.rate_risk,
  //       'rate_explain': fv.rate_explain,
  //       'witness_name': fv.witness_name,
  //       'witness_phone': fv.witness_phone,
  //       'was_first_aid': fv.was_first_aid,
  //       'first_aid_provider': fv.first_aid_provider,
  //       'was_medical_treatment': fv.was_medical_treatment,
  //       'medical_treating_doctor': fv.medical_treating_doctor,
  //       'was_hospital_treatment': fv.was_hospital_treatment,
  //       'hospital_treating_doctor': fv.hospital_treating_doctor
  //     });
  //     if (!this.props.currentSPWId) { /*Get SPW Data*/ }//End if condition
  //   }, 500);
  // }//End componentDidMount
}//End class
export default Step_2;