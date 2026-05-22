import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import MultipleDaysAvailability from './multiple_day_availability';

class Step8 extends Component {
  render() {
    const fp = this.props.formProps;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    const fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">About You</h2>
          <hr className="form_hr" />
          <AntInput
            name="unionMoment"
            type="radio"
            containerClassName="long_label"
            label="Are you an active member of any employer's Union at the moment?"
            vertical
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}

            onChange={e => ocf('unionMoment', e)}
          />
          {fv.unionMoment === 'yes' &&
            <Row gutter={window.rowGutter}>
              <Col lg={8} md={8} sm={8} xs={24}>
                <AntInput name="unionName" label="Name of the Union" onChange={e => ocf('unionName', e)} />
              </Col>
              <Col lg={8} md={8} sm={8} xs={24}>
                <AntInput name="unionContact" label="Contact Number of the Union" onChange={e => ocf('unionContact', e)} />
              </Col>
              <Col lg={8} md={8} sm={8} xs={24}>
                <AntInput name="unionAddress" label="Address of the Union" onChange={e => ocf('unionAddress', e)} />
              </Col>
            </Row>
          }
          <div className="content-divider"></div>
          <AntInput
            name="reliableCar"
            type="radio"
            containerClassName="long_label"
            label="Do you have your own reliable car?"
            vertical
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}

            onChange={e => ocf('reliableCar', e)}
          />
          <div className="content-divider"></div>
          <AntInput
            name="hac_vic_driving_license"
            type="radio"
            containerClassName="long_label"
            label="Do you have a VIC driving license?"
            vertical
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}

            onChange={e => ocf('hac_vic_driving_license', e)}
          />
          <div className="content-divider"></div>
          {/* {fv.hac_vic_driving_license === 'yes' &&
            <AntInput label="Please provide VIC driving license number" name="vic_driving_license_number"  onChange={e => ocf('vic_driving_license_number', e)} />
          } */}
          <AntInput
            name="has_superannuation_ac"
            type="radio"
            containerClassName="long_label"
            label="Do you have a superannuation account with a registered super company? "
            vertical
            radioOptions={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}

            onChange={e => ocf('has_superannuation_ac', e)}
          />
          <div className="content-divider"></div>
          <div>
            <label>What is your availability in a full week?</label>
            <div className="content-divider"></div>
          </div>
          <MultipleDaysAvailability data={this.props.data} fp={fp} onChange={(e) => ocf('days_availibility', e)} formValues={fv.days_availibility} />

        </div>
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() {
    let fv = this.props.formValues;
    let formObj = {};
    // if (fv.hac_vic_driving_license === 'yes') {
    //   formObj['vic_driving_license_number'] = fv.vic_driving_license_number;
    // }//End if condition
    formObj['unionMoment'] = fv.unionMoment;
    if (fv.unionMoment === 'yes') {
      formObj['unionName'] = fv.unionName;
      formObj['unionContact'] = fv.unionContact;
      formObj['unionAddress'] = fv.unionAddress;
    }//End if condition

    this.props.formProps.setFieldsValue({
      reliableCar: fv.reliableCar,
      hac_vic_driving_license: fv.hac_vic_driving_license,
      has_superannuation_ac: fv.has_superannuation_ac,
      ...formObj
    });
  }//End componentDidMount
}//End class

export default Step8;