import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../externalComponents/antd-fields';
import MFS from '../../../../../services/multiple_field_services';

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
        data.services_ndis_budget[index + 1] = data.services_ndis_budget[index + 1] ? data.services_ndis_budget[index + 1] : '';
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

  render() {
    // const fp = this.props.fp;
    const data = this.props.data;
    const fv = this.state.fieldValues;
    return (
      <React.Fragment>
        {data.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Row gutter={window.rowGutter}>
                <Col lg={12} md={12} sm={12} xs={24}>
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
                  {(fv.services_ref_id && fv.services_ref_id[index + 1]) &&
                    <AntInput type="number" step={0} comma={true} className="hide-arrow"
                      label="Annual approved NDIS budget of the service"
                      name={`services_ndis_budget%${index + 1}`}
                      onChange={e => this.onChangeVal(`services_ndis_budget%${index + 1}`,e)}
                      placeholder="Annual Budget"
                    />
                  }
                </Col>
                <Col lg={12} md={12} sm={12} xs={24}>
                  {(fv.services_ref_id && fv.services_ref_id[index + 1]) &&
                    <AntInput label="Please fill details" name={`services_desc%${index + 1}`} type="textarea" style={{ 'height': '68px' }} placeholder="Please type some details" onChange={e => this.onChangeVal(`services_desc%${index + 1}`, e)} />
                  }
                </Col>
              </Row>
              {(fv.services_ref_id && fv.services_ref_id[index + 1]) && <hr className="hr-2 m-t-10 m-b-12" />}
              {/* <div className="m-b-10"></div> */}
              {/* {fv.services_ref_id && fv.services_ref_id[index + 1]} */}

            </React.Fragment>
          )
        })}
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad(); }//End componentDidMount

}//End Class
export default MultipleServices;