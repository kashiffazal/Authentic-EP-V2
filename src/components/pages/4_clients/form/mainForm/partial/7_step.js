import React, { Component } from 'react';
// import { AntInput } from '../../../../../externalComponents/antd-fields';
import MultipleServices from './multiple_services';

class Step7 extends Component {
  render() {
    const fp = this.props.formProps;
    const data = this.props.data;
    const ocf = this.props.onChangeField;
    const fsh = this.props.sectionHeading;//Form section heading
    let fv = this.props.formValues;
    return (
      <React.Fragment>
        <div className={fsh ? "form-section-container" : ""}>
          {fsh && <div className="form-section-heading"><p>{this.props.title}</p><p>{this.props.desc}</p><hr /><hr align="left" /><hr align="left" /></div>}
          <h2 className="form_heading">Details of Services Required</h2>
          <hr className="form_hr_sub" />
          {/* <AntInput label="Please fill details" name="serviceDetails" type="textarea" rows={3} placeholder="Please type some details"  onChange={e => ocf('serviceDetails', e)} /> */}
          {/* {JSON.stringify(fv.services)} */}
          <MultipleServices data={data.list.services} fp={fp} onChange={(e) => ocf('services', e)} formValues={fv.services} />



          {/* <AntInput
            type="checkbox"
            name="ast_per_act_service"
            
            text="0107 Assist-Personal Activities"
            // reqMsg="Please tick the box"
            onChange={e => ocf('ast_per_act_service', e)}
            noRequired={true}
          />
          <div className="m-b-10"></div>
          {fv.ast_per_act_service && <span><AntInput label="Please fill details" name="ast_per_act_ser_desc" type="textarea" rows={3} placeholder="Please type some details"  onChange={e => ocf('ast_per_act_ser_desc', e)} /><hr className="hr-2 m-b-20" /></span>}

          <AntInput
            type="checkbox"
            name="com_nur_car_service"
            
            text="0114 Community Nursing Care"
            // reqMsg="Please tick the box"
            onChange={e => ocf('com_nur_car_service', e)}
            noRequired={true}
          />
          <div className="m-b-10"></div>
          {fv.com_nur_car_service && <span><AntInput label="Please fill details" name="com_nur_car_ser_desc" type="textarea" rows={3} placeholder="Please type some details"  onChange={e => ocf('com_nur_car_ser_desc', e)} /><hr className="hr-2 m-b-20" /></span>}

          <AntInput
            type="checkbox"
            name="onv_com_par_service"
            
            text="0116 Innov Community Participation"
            // reqMsg="Please tick the box"
            onChange={e => ocf('onv_com_par_service', e)}
            noRequired={true}
          />
          <div className="m-b-10"></div>
          {fv.onv_com_par_service && <span><AntInput label="Please fill details" name="onv_com_par_ser_desc" type="textarea" rows={3} placeholder="Please type some details"  onChange={e => ocf('onv_com_par_ser_desc', e)} /><hr className="hr-2 m-b-20" /></span>}

          <AntInput
            type="checkbox"
            name="hou_hol_tas_service"
            
            text="0120 Household Tasks"
            // reqMsg="Please tick the box"
            onChange={e => ocf('hou_hol_tas_service', e)}
            noRequired={true}
          />
          <div className="m-b-10"></div>
          {fv.hou_hol_tas_service && <span><AntInput label="Please fill details" name="hou_hol_tas_ser_desc" type="textarea" rows={3} placeholder="Please type some details"  onChange={e => ocf('hou_hol_tas_ser_desc', e)} /><hr className="hr-2 m-b-20" /></span>}

          <AntInput
            type="checkbox"
            name="par_com_service"
            
            text="0125 Participate Community"
            // reqMsg="Please tick the box"
            onChange={e => ocf('par_com_service', e)}
            noRequired={true}
          />
          <div className="m-b-10"></div>
          {fv.par_com_service && <span><AntInput label="Please fill details" name="par_com_ser_desc" type="textarea" rows={3} placeholder="Please type some details"  onChange={e => ocf('par_com_ser_desc', e)} /><hr className="hr-2 m-b-20" /></span>}

          <AntInput
            type="checkbox"
            name="gro_cen_act_service"
            
            text="0136 Group/Centre Activities"
            // reqMsg="Please tick the box"
            onChange={e => ocf('gro_cen_act_service', e)}
            noRequired={true}
          />
          <div className="m-b-10"></div>
          {fv.gro_cen_act_service && <AntInput label="Please fill details" name="gro_cen_act_ser_desc" type="textarea" rows={3} placeholder="Please type some details"  onChange={e => ocf('gro_cen_act_ser_desc', e)} />}
 */}




        </div>
      </React.Fragment>
    );//End return
  }//End render

  // componentDidMount() {
  // let fv = this.props.formValues;
  // let formObj = {
  // 'services' : fv.services
  // 'ast_per_act_service': fv.ast_per_act_service,
  // 'com_nur_car_service': fv.com_nur_car_service,
  // 'onv_com_par_service': fv.onv_com_par_service,
  // 'hou_hol_tas_service': fv.hou_hol_tas_service,
  // 'par_com_service': fv.par_com_service,
  // 'gro_cen_act_service': fv.gro_cen_act_service
  // };
  // if (fv.ast_per_act_service) { formObj['ast_per_act_ser_desc'] = fv.ast_per_act_ser_desc; }
  // if (fv.com_nur_car_service) { formObj['com_nur_car_ser_desc'] = fv.com_nur_car_ser_desc; }
  // if (fv.onv_com_par_service) { formObj['onv_com_par_ser_desc'] = fv.onv_com_par_ser_desc; }
  // if (fv.hou_hol_tas_service) { formObj['hou_hol_tas_ser_desc'] = fv.hou_hol_tas_ser_desc; }
  // if (fv.par_com_service) { formObj['par_com_ser_desc'] = fv.par_com_ser_desc; }
  // if (fv.gro_cen_act_service) { formObj['gro_cen_act_ser_desc'] = fv.gro_cen_act_ser_desc; }

  // this.props.formProps.setFieldsValue(formObj);
}//End componentDidMount
// }//End class

export default Step7;