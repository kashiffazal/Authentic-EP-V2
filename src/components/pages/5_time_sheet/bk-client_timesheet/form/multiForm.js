import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { AntInput } from '../../../../externalComponents/antd-fields';
import MFS from '../../../../services/multiple_field_services';
import moment from 'moment';
import { GetObjectFromArr } from '../../../../services';
import SignCanvas from '../../../../externalComponents/sign-canvas';


class MultiForm extends Component {
  state = {
    rowArr: [1],
    focusObj: {},
    fieldValues: {},
    viewAddNewBrokerModal: false,//Visible Add Broker modal
    updatableBrokerFieldName: ''
  }//End state

  onChangeVal = (fieldName, fieldValue) => {
    this.setState({ fieldValues: MFS.onChange(fieldName, fieldValue, this.state.fieldValues) }, () => {
      this.props.onChange(this.state.fieldValues);
    });
  }//End function

  setFieldsOnLoad = () => {
    if (this.props.formValues.timesheet) {
      let data = this.props.formValues.timesheet;
      Object.keys(data['date']).forEach(item => {
        data['date'][item] = (data['date'][item] && data['date'][item] !== '-') ? moment(data['date'][item]) : '';
      });
      // let data = {
      //   broker_ref_id: { 1: '11', 2: '10' },
      //   brokery_type_ref_id: { 1: '2', 2: '4' },
      //   brokery: { 1: 0.5, 2: 2500 }
      // }
      // this.setState({ fieldValues: data });
      // let set = MFS.loadDataOnMount(data);


      //Extract Last values from all object and set fields value
      let dataLast = {};
      let len = Object.keys(data.client_ref_id).length;
      Object.keys(data).forEach(item => {
        var vl = data[item][len];
        dataLast[item] = {};
        dataLast[item][len] = vl ? vl : '';
      });
      var rowArr = [];
      for (var k = 0; k < len; k++) { rowArr.push((k + 1)); }//End for loop
      // console.log(data);
      // console.log(dataLast);
      //---------------------------------------------------------//

      let set = MFS.loadDataOnMount(dataLast);
      //Rename field name from %1 to last count
      Object.keys(set.formValObj).forEach(item => {
        var nItem = item.replace(/[1]/g, len);
        set.formValObj[nItem] = set.formValObj[item];
        delete set.formValObj[item];
      })
      //console.log(set.formValObj);
      //---------------------------------------//

      this.setState({ rowArr: rowArr, fieldValues: data }, () => {
        this.props.fp.setFieldsValue(set.formValObj)
      })
    }//End if condition
  }//End if condition

  setValueOnLess = (fieldName, num) => {
    return this.state.fieldValues[fieldName] && this.state.fieldValues[fieldName][num];
  }//End function

  showValueOnAddHideField = (fieldName, num, label, index, field, keyword = false, textarea = false, textWrap = false) => {
    return (
      (!this.state.focusObj[num] && MFS.addDisabled(this.state.rowArr, index)) ?
        <div className="fakeField" onClick={() => this.showFieldOnClick(num)}>
          <label>{label}:</label>
          <div className={` ${textarea ? 'textarea-height' : ''} ${textWrap ? 'text-in-one-line' : ''}`}>
            {(this.state.fieldValues[fieldName] && this.state.fieldValues[fieldName][num]) ?
              (keyword === 'date') ? moment(this.state.fieldValues[fieldName][num]).format('DD-MM-YYYY') :
                (keyword === 'clientList') ? GetObjectFromArr(this.state.fieldValues[fieldName][num], 'id', this.props.data.clients).name :
                  (keyword === 'serviceList') ? GetObjectFromArr(this.state.fieldValues[fieldName][num], 'value', this.props.data.serviceType).label : this.state.fieldValues[fieldName][num]
              : '-'
            }
          </div>
        </div>
        :
        field
    )
  }//End function


  showFieldOnClick = (item) => {
    this.setState({ focusObj: {} }, () => {
      let focusObj = this.state.focusObj;
      focusObj[item] = true;
      this.setState({ focusObj: focusObj })
    });
  }//End function

  disabledDate = (current) => {
    // Can not select days before today and today
    return (current && (current < moment(this.props.data.fortnightDate[0]))) || (current > moment(this.props.data.fortnightDate[1]).add(1, 'days'));
  }//End function

  render() {
    // const fp = this.props.fp;
    const rowArr = this.state.rowArr;
    const fv = this.state.fieldValues;
    const data = this.props.data;
    const svol = this.setValueOnLess;
    const svoahf = this.showValueOnAddHideField;
    const signs = this.props.signs ? this.props.signs : {};
    return (
      <React.Fragment>
        {rowArr.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Row gutter={window.rowGutterSmall}>
                <Col lg={4} md={12} sm={24} xs={24}>
                  {svoahf('date', item, 'Date', index,
                    <AntInput type="datepicker" label="Date" name={`date%${item}`} value={svol('date', item)}  disabledDate={this.disabledDate} onChange={(e) => this.onChangeVal(`date%${item}`, e)} />
                    , 'date')}
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {svoahf('client_ref_id', item, 'Client Name', index,
                    <AntInput type="select" label="Client Name" name={`client_ref_id%${item}`} value={svol('client_ref_id', item)}  options={data.clients} setValueLabel={['id', 'name']} filter={true}
                      onChange={(e) => this.onChangeVal(`client_ref_id%${item}`, e)}
                    />, 'clientList')}
                </Col>
                <Col lg={4} md={12} sm={24} xs={24}>
                  {svoahf('start_time', item, 'Time In', index,
                    <AntInput type="select" label="Time In" name={`start_time%${item}`} value={svol('start_time', item)}  options={data.startTime} filter={true}
                      onChange={(e) => this.onChangeVal(`start_time%${item}`, e)}
                    />)}
                </Col>
                <Col lg={4} md={12} sm={24} xs={24}>
                  {svoahf('finish_time', item, 'Time Out', index,
                    <AntInput type="select" label="Time Out" name={`finish_time%${item}`} value={svol('finish_time', item)}  options={data.finishTime} filter={true}
                      onChange={(e) => this.onChangeVal(`finish_time%${item}`, e)}
                    />)}
                </Col>
                <Col lg={6} md={24} sm={24} xs={24}>
                  {svoahf('service_type', item, 'Service Type / Activity', index,
                    <AntInput type="select" label="Service Type / Activity" name={`service_type%${item}`} value={svol('service_type', item)}  options={data.serviceType} filter={true}
                      onChange={(e) => this.onChangeVal(`service_type%${item}`, e)}
                    />, 'serviceList')}
                </Col>
              </Row>
              <Row gutter={window.rowGutterSmall}>
                <Col lg={9} md={10} sm={24} xs={24}>
                  {svoahf('description', item, 'Description', index,
                    <AntInput style={{ 'height': '183px', 'marginBottom': '0px' }} type="textarea" label="Description" placeholder="Description" noRequired={true} name={`description%${item}`} value={svol('description', item)}  onChange={(e) => this.onChangeVal(`description%${item}`, e)} />
                    , false, true)}
                </Col>
                <Col lg={9} md={14} sm={24} xs={24}>
                  <strong>Client Signature:</strong>
                  <SignCanvas onChange={(e) => this.onChangeVal(`client_sign%${item}`, e)} width="341"/>
                </Col>
                <Col lg={6} md={24} sm={24} xs={24}>
                  {signs[item] ? <React.Fragment><strong>Past Client Signature:</strong><div className="past-sign"><img src={signs[item]} alt="Signature" /></div></React.Fragment> :
                    <div className="sign-holder"><i className="las la-signature" /></div>
                  }
                  <Row gutter={window.rowGutterSmall} >
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Button className="w-full btn_height" type="dashed"
                        onClick={() => this.setState({ rowArr: MFS.addRow(rowArr), focusObj: {} })}
                        disabled={MFS.addDisabled(rowArr, index) || (item === '14')}
                      >Add <i className="las la-plus-circle m-l-3" /></Button>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Button className="w-full btn_height" type="dashed"
                        disabled={MFS.lessDisabled(rowArr)}
                        onClick={() => {
                          let rr = MFS.removeRow(rowArr, index, fv);
                          this.setState({ rowArr: rr[0], fieldValues: rr[1] })
                        }}>Less <i className="las la-minus-circle m-l-3" /></Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr className={`hr-2 ${rowArr.length > (index+1) ? 'm-t-5' : 'm-t-20'} m-b-20`} />
            </React.Fragment>
          )
        })}
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad() }//End componentDidMount
  componentDidUpdate(prevProps) {
    if ((prevProps.data !== this.props.data)) { this.setFieldsOnLoad() }//End if condition
  }//End componentDidMount


}//End Class
export default MultiForm;