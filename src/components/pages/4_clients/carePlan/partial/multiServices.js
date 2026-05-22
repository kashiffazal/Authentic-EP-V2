import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { AntInput } from '../../../../externalComponents/antd-fields';
import MFS from '../../../../services/multiple_field_services';
import { AccessControl } from '../../../../services';

class MultipleServices extends Component {
  state = {
    fieldValues: {},
  }//End state

  onChangeVal = (fieldName, fieldValue) => {
    // console.log(fieldName, fieldValue);
    this.setState({ fieldValues: MFS.onChange(fieldName, fieldValue, this.state.fieldValues) }, () => {
      this.props.onChange(this.state.fieldValues);
      // console.log(this.state.fieldValues);
    });
  }//End function

  setFieldsOnLoad = () => {
    //console.log(this.props.formValues);
    if (this.props.formValues && this.props.formValues.services_ref_id) {
      let data = this.props.formValues;
      this.props.data.forEach((item, index) => {
        data.services_ref_id[index + 1] = data.services_ref_id[index + 1] ? data.services_ref_id[index + 1] : false;
        // data.services_ndis_budget[index + 1] = data.services_ndis_budget[index + 1] ? data.services_ndis_budget[index + 1] : '';
        data.services_desc[index + 1] = data.services_desc[index + 1] ? data.services_desc[index + 1] : '';
      })
      // console.log(data);
      // let data = {
      //   broker_ref_id: { 1: '11', 2: '10' },
      //   brokery_type_ref_id: { 1: '2', 2: '4' },
      //   brokery: { 1: 0.5, 2: 2500 }
      // }
      // this.setState({ fieldValues: data });
      // let set = MFS.loadDataOnMount(data);
      let set = MFS.loadDataOnMount(data);
      // console.log(set);
      this.setState({ rowArr: this.state.rowArr, fieldValues: data }, () => {
        // console.log(set.formValObj);
        this.props.data.forEach((item, index) => {
          set.formValObj[`services_ref_id%${index + 1}`] = set.formValObj[`services_ref_id%${index + 1}`] ? true : false;
        })
        this.props.fp.setFieldsValue(set.formValObj)
      })
    }//End if condition
  }//End if condition

  tableHeader = (form = true, index = false) => {
    return (
      <>
        <Col lg={2} md={2} sm={3} xs={3} className="just-col head"><label>Sr:</label></Col>
        <Col lg={10} md={22} sm={21} xs={21} className="just-col head">
          <label>Service:</label>
          {index === 0 && AccessControl(27) && <Button size="small" ghost className="edit-btn" type="primary" onClick={() => { this.props.showHideFieldToggle(true); this.setFieldsOnLoad(); }}>Edit</Button>}
          <div className="hidden-lg">
            {!form && AccessControl(27) && <Button size="small" ghost className="edit-btn" type="primary" onClick={() => { this.props.showHideFieldToggle(true); this.setFieldsOnLoad(); }}>Edit</Button>}
            {this.props.showHideField &&
              <Button size="small" className="edit-btn" onClick={() => { this.props.showHideFieldToggle(false); this.props.onClose() }}><i className="las la-times-circle" /></Button>
            }
          </div>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24} className="just-col head hidden-md hidden-sm hidden-xs">
          <label>Description:</label>
          {!form && AccessControl(27) && <Button size="small" ghost className="edit-btn" type="primary" onClick={() => { this.props.showHideFieldToggle(true); this.setFieldsOnLoad() }}>Edit</Button>}
          {this.props.showHideField &&
            <Button size="small" className="edit-btn" onClick={() => { this.props.showHideFieldToggle(false); this.props.onClose() }}><i className="las la-times-circle" /></Button>
          }
        </Col>
      </>
    );
  }//End function

  serviceDescField = (index, placeholder = 'Please fill details', label = false) => {
    return (
      (this.state.fieldValues.services_ref_id && this.state.fieldValues.services_ref_id[index + 1]) &&
      <>
        {label && <div className="just-col head-mid"><label>Please fill details:</label></div>}
        <AntInput placeholder={placeholder} className="m-b-0-imp" name={`services_desc%${index + 1}`} type="textarea" style={{ 'height': '68px' }} onChange={e => this.onChangeVal(`services_desc%${index + 1}`, e)} />
      </>
    );
  }//End function

  render() {
    const pr = this.props;
    // const fp = this.props.fp;
    const data = this.props.data;
    const vl = this.props.formValues;
    const srid = this.state.fieldValues.services_ref_id
    // const fv = this.state.fieldValues;
    // console.log(vl);
    var k = 1;
    return (
      <React.Fragment>
        {pr.showHideField ?
          <>
            <Row gutter={window.rowGutter} className="list">
              {this.tableHeader()}
              {data && data.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Col lg={2} md={2} sm={3} xs={3} className="just-col">
                      <span className="sticky-element top-50-imp z-index-99-imp">{index + 1}</span>
                    </Col>
                    <Col lg={10} md={22} sm={21} xs={21} className="just-col">
                      {(index !== 0 && srid && srid[index + 1]) && <div className="just-col hidden-lg head-mid m-t--9-imp"><label>Service:</label></div>}
                      <AntInput
                        type="checkbox"
                        name={`services_ref_id%${index + 1}`}
                        text={item.name}
                        // reqMsg="Please tick the box"
                        onChange={e => this.onChangeVal(`services_ref_id%${index + 1}`, (e ? item.id : false))}
                        noRequired={true}
                        className="p-b-10-imp"
                        containerClassName="m-0-imp h-30"
                      />
                      <div className="hidden-lg">
                        {this.serviceDescField(index, 'Type here', true)}
                      </div>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className="just-col hidden-md hidden-sm hidden-xs">
                      {this.serviceDescField(index)}
                    </Col>
                  </React.Fragment>
                )
              })}
              <Col lg={24} md={24} sm={24} xs={24} className="just-col">
                <div className="text-right m-t-5">
                  <Button size="small" onClick={() => { pr.showHideFieldToggle(false); pr.onClose() }}>Cancel</Button>&nbsp;|&nbsp;
                  <Button size="small" type="primary" htmlType="submit" loading={pr.loading} onClick={() => pr.onSave()}>Save</Button>
                </div>
              </Col>
            </Row>
          </>
          :
          <>
            <Row gutter={window.rowGutter} className="list">
              {!window.is_xs && this.tableHeader(false)}
              {vl && vl.services_ref_id &&
                Object.keys(vl.services_ref_id).map((item, index) => {
                  return (
                    vl['services_ref_id'][item] &&
                    (<React.Fragment key={index}>
                      {window.is_xs && this.tableHeader(false, index)}
                      <Col lg={2} md={2} sm={3} xs={3} className="just-col">
                        <span className="sticky-element top-50-imp z-index-99-imp">{k++} </span>
                      </Col>
                      <Col lg={10} md={22} sm={21} xs={21} className="just-col">
                        {k !== 2 && <div className="just-col hidden-lg head-mid m-t--9-imp"><label>Service:</label></div>}
                        {data.map(i => { return ((i.id === vl['services_ref_id'][item]) && i.name) })}
                        <div className="hidden-lg">
                          <div className="just-col head-mid"><label>Description:</label></div>
                          <div className="textbox-value">{vl['services_desc'][item]}</div>
                        </div>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24} className="just-col hidden-md hidden-sm hidden-xs">
                        <div className="textbox-value">{vl['services_desc'][item]}</div>
                      </Col>
                    </React.Fragment>)
                  )
                })
              }
            </Row>
          </>
        }

      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad(); }//End componentDidMount
}//End Class
export default MultipleServices;