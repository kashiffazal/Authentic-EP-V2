/*eslint-disable no-useless-escape*/
/*eslint-disable no-unused-expressions*/
/*eslint-disable array-callback-return*/
import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  Radio,
  Checkbox,
  Upload,
  Switch
} from "antd";


// import DynamicField, { AntDynamicFieldSet, AntDynamicFieldGet, AntDynamicFieldOpen } from "../antd-dynamic-fields";

import moment from "moment";
import $ from "jquery";

const { Option } = Select;
const { TextArea } = Input;

$(document).ready(function () {
  $(".typeNumber").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  });
});

var numberPrefixPostfix = (prefix, postfix, value) => {
  value = value.toString();
  if (prefix && postfix) {
    let regex = new RegExp("\\" + prefix + "s?|(,*)" + postfix, "g");
    let res = {
      formatter: `${prefix} ${value}${postfix}`.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      ),
      parser: value.replace(regex, "").trim()
    };
    return res;
  } else if (prefix) {
    let regex = new RegExp("\\" + prefix.trim() + "s?|(,*)", "g");
    let res = {
      formatter: `${prefix} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: value.replace(regex, "").trim()
    };
    return res;
  } else if (postfix) {
    let res = {
      formatter: `${value}${postfix}`,
      parser: value.replace(postfix, "")
    };
    return res;
  } else {
    let res = {
      formatter: value,
      parser: value
    };
    return res;
  } //End if condition
}; //End function


const nameError = {
  border: "1px solid #d8d8d8",
  padding: "5px 12px",
  borderRadius: "4px",
  background: "#ffeaea",
  color: "#d40000"
};
const radioVerticalStyle = {
  display: 'flex',
  height: "30px",
  lineHeight: "30px",
  margin: "0px"
};
const checkboxVerticalStyle = radioVerticalStyle;

export const AntInput = ({
  //Essentials
  type = "text",
  name,
  placeholder,
  value,
  label,
  noRequired = false,
  reqMsg = "Required",
  className = "",
  style,
  containerStyle,
  containerClassName,
  onChange,
  onClick,
  onBlur,
  onKeyDown,
  disabled,
  //Text and password
  preIconAnt = false,
  preIconLine = false,
  preIconColorLine = "rgba(0,0,0,.25)",
  sufIconAnt = false,
  sufIconLine = false,
  sufIconColorLine = "rgba(0,0,0,.25)",
  autoComplete = undefined,
  //Email 
  emailErrorMsg = "The input is not valid E-mail!",
  //Number
  min = 0,
  max = 1000000000000000000000 * 1000000000000000000000,
  step = 0.1,
  numPreFix = false,
  numPostFix = false,
  comma = false,
  //Select
  options = [],
  setValueLabel = false,
  filter = true,
  mode = false,
  emptyFirstVal = '-Select-',
  //Datepicker
  format = "DD-MM-YYYY",
  disabledPreviousDate = false,
  disabledNextDate = false,
  //Timepicker
  timeFormat = "h:mm:ss a",
  //Radio
  radioOptions = [],
  vertical = false,
  optionType = 'default',
  //checkbox
  group = false,
  text,
  indeterminate = false,
  //Textarea
  rows,
  //Antd Essentials
  size = "default",
  formProps,
  help = undefined,
  feedback,
  addonBefore = false,
  addonAfter = false,
  loading = false
}) => {
  let validateKeyword = undefined;
  let checkboxGroupInitialValues = [];
  let validateStausErrorMsg = (
    <div style={nameError}>
      feedback could be 'success', 'warning', 'error', 'validating' and could be
      empty without quotes
    </div>
  );
  // if (!formProps) {
  //   return (
  //     <div style={nameError}>
  //       Please provide formProps attribute.
  //     </div>
  //   )
  // }//End if condition
  //Default is required
  if (!name) {
    return <div style={nameError}>Please provide name attribute</div>;
  } //End if condition
  //If feedback is available validationStatus value then allow 'validateStatus'
  if (feedback && feedback !== true) {
    if (
      feedback !== "success" &&
      feedback !== "warning" &&
      feedback !== "error" &&
      feedback !== "validating"
    ) {
      return validateStausErrorMsg;
    } //End if condition
    validateKeyword = feedback;
    feedback = true;
  } else {
    //If feedback is like feedback="" then show error
    feedback = feedback !== true ? undefined : feedback;
    //return validateStausErrorMsg;
  } //End if condition

  //Checking input type
  if (type === "inputNumber") {
    return (
      <Form.Item
        label={label}
        name={name}
        initialValue={value}
        rules={[{ required: !noRequired, message: reqMsg }]}
        validateStatus={loading ? 'validating' : validateKeyword}
        hasFeedback={loading ? true : feedback}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        {/* {formProps.getFieldDecorator(name, {
          initialValue: value,
          rules: [{ required: !noRequired, message: reqMsg }]
        })( */}
        <InputNumber
          style={{ width: "100%", ...style }}
          className={className ? className + " typeNumber" : "typeNumber"}
          size={size}
          formatter={value =>
            numberPrefixPostfix(numPreFix, numPostFix, value).formatter
          }
          parser={value =>
            numberPrefixPostfix(numPreFix, numPostFix, value).parser
          }
          onChange={e => { onChange ? onChange(e) : ""; }}
          onBlur={e => { onBlur ? onBlur(e) : ""; }}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder ? placeholder : label}
          disabled={loading ? true : (disabled ? true : false)}
        />
        {/* )} */}
      </Form.Item>
    ); //End return
  } else if (type === "number") {
    return (
      <Form.Item
        label={label}
        name={name}
        initialValue={value}
        rules={[{ required: !noRequired, message: reqMsg }]}
        validateStatus={loading ? 'validating' : validateKeyword}
        hasFeedback={loading ? true : feedback}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        {/* {formProps.getFieldDecorator(name, {
          initialValue: value,
          rules: [{ required: !noRequired, message: reqMsg }]
        })( */}
        <InputNumber
          style={{ width: "100%", ...style }}
          className={className ? className + " typeNumber" : "typeNumber"}
          size={size}
          formatter={
            value => {
              //console.log(value);
              value = value ? value.replace(/[A-Za-z!@#$%^&*()]/g, '') : '';
              if (comma) { value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
              return value;
            }
          }
          //parser={value => value.replace(/\$\s?|(,*)/g, '')}
          onChange={e => { onChange ? onChange(e) : ""; }}
          onBlur={e => { onBlur ? onBlur(e) : ""; }}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder ? placeholder : label}
          disabled={loading ? true : (disabled ? true : false)}
        />
        {/* )} */}
      </Form.Item>
    ); //End return
  } else if (type === "email") {
    return (
      <Form.Item
        label={label}
        name={name}
        initialValue={value}
        rules={[{ type: 'email', message: emailErrorMsg, }, { required: !noRequired, message: reqMsg }]}
        validateStatus={loading ? 'validating' : validateKeyword}
        hasFeedback={loading ? true : feedback}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        <Input
          style={style}
          className={className}
          size={size}
          prefix={
            preIconLine ? <i className={preIconLine} style={{ color: preIconColorLine }} /> :
              preIconAnt ? preIconAnt : ""
          }
          suffix={
            sufIconLine ? <i className={sufIconLine} style={{ color: sufIconColorLine }} /> :
              sufIconAnt ? sufIconAnt : ""
          }
          placeholder={placeholder ? placeholder : label}
          onChange={e => { onChange ? onChange(e.target.value) : ""; }}
          onBlur={e => { onBlur ? onBlur(e.target.value) : ""; }}
          disabled={loading ? true : (disabled ? true : false)}
          autoComplete={autoComplete}
        />
      </Form.Item>
    ); //End of text and password
  } else if (type === "select") {
    if (!value || value === 'undefined' || value === '') { value = ""; }
    if (mode) { value = []; }
    return (
      <Form.Item
        label={label}
        name={name}
        initialValue={value}
        rules={[{ required: !noRequired, message: reqMsg }]}
        validateStatus={loading ? 'validating' : validateKeyword}
        hasFeedback={loading ? true : feedback}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        {mode === 'multiple-responsive' ?
          <Select
            style={style}
            className={className}
            size={size}
            onChange={e => { onChange ? onChange(e) : ""; }}
            onClick={e => { onClick ? onClick(e) : ""; }}
            onBlur={e => { onBlur ? onBlur(e) : ""; }}
            showSearch={filter}
            mode="multiple"
            options={options}
            maxTagCount='responsive'
            placeholder={placeholder ? placeholder : label}
            filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            disabled={loading ? true : (disabled ? true : false)}
          />
          :
          <Select
            style={style}
            className={className}
            size={size}
            onChange={e => { onChange ? onChange(e) : ""; }}
            onClick={e => { onClick ? onClick(e) : ""; }}
            onBlur={e => { onBlur ? onBlur(e) : ""; }}
            showSearch={filter}
            mode={mode}
            placeholder={placeholder ? placeholder : label}
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            disabled={loading ? true : (disabled ? true : false)}
          >
            {!mode && <Option value="">{emptyFirstVal}</Option>}
            {options.length > 0 && options.map((item, i) => {

              if (setValueLabel && setValueLabel.length > 0) {
                var value = item[setValueLabel[0]];
                var label = item[setValueLabel[1]];
              }//End if condition

              return (
                <Option
                  key={item.key ? item.key : item.id ? item.id : i}
                  value={value ? value : (item.value ? item.value : (label ? label : item.label))}
                >
                  {item.label ? item.label : (label ? label : (value ? value : item.value))}
                </Option>
              );
            })}
          </Select>
        }
      </Form.Item>
    );
  } else if (type === "datepicker") {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: !noRequired, message: reqMsg }]}
        initialValue={value ? moment(value, format) : undefined}
        validateStatus={loading ? 'validating' : validateKeyword}
        hasFeedback={loading ? true : feedback}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        {/* {formProps.getFieldDecorator(name, {
          initialValue: value ? moment(value, format) : undefined,
          rules: [{ required: !noRequired, message: reqMsg }]
        })( */}
        <DatePicker
          className={className}
          style={{ width: "100%", ...style }}
          onChange={onChange}
          format={format}
          disabledDate={(e) => {
            if (disabledPreviousDate && e) { return e < moment().subtract(1, 'day') }//End if condition
            if (disabledNextDate && e) { return e > moment().subtract(0, 'day') }//End if condition
          }}
          disabled={loading ? true : (disabled ? true : false)}
        />
        {/* )} */}
      </Form.Item>
    );
  } else if (type === "timepicker") {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: !noRequired, message: reqMsg }]}
        initialValue={value ? moment(value, format) : undefined}
        validateStatus={loading ? 'validating' : validateKeyword}
        hasFeedback={loading ? true : feedback}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        {/* {formProps.getFieldDecorator(name, {
          initialValue: value ? moment(value, format) : undefined,
          rules: [{ required: !noRequired, message: reqMsg }]
        })( */}
        <TimePicker
          use12Hours
          className={className}
          style={{ width: "100%", ...style }}
          onChange={onChange}
          format={timeFormat}
          disabled={loading ? true : (disabled ? true : false)}
        />
        {/* )} */}
      </Form.Item>
    );
  } else if (type === "radio") {
    return (
      <Form.Item
        label={label}
        name={name}
        initialValue={value}
        rules={[{ required: !noRequired, message: reqMsg }]}
        validateStatus={loading ? 'validating' : validateKeyword}
        hasFeedback={loading ? true : feedback}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        {/* {formProps.getFieldDecorator(name, {
          initialValue: value,
          rules: [{ required: !noRequired, message: reqMsg }]
        })( */}
        {vertical ?
          <Radio.Group
            onChange={e => { onChange ? onChange(e.target.value) : ""; }}
            onBlur={e => { onBlur ? onBlur(e.target.value) : ""; }}
            disabled={loading ? true : (disabled ? true : false)}
            size={size}
          >
            {radioOptions.map((item, i) => {
              return (
                <Radio
                  style={vertical ? { ...radioVerticalStyle, ...style } : style}
                  className={className}
                  key={item.key ? item.key : item.id ? item.id : i}
                  value={item.value ? item.value : item.label}
                >
                  {item.label}
                </Radio>
              );
            })}
          </Radio.Group>
          :
          <Radio.Group
            onChange={e => { onChange ? onChange(e.target.value) : ""; }}
            onBlur={e => { onBlur ? onBlur(e.target.value) : ""; }}
            disabled={loading ? true : (disabled ? true : false)}
            optionType={optionType}
            options={radioOptions}
            size={size}
          />
        }
        {/* )} */}
      </Form.Item>
    );
  } else if (type === "checkbox") {
    return (
      group ?
        <React.Fragment>
          <Form.Item
            label={label}
            name={name}
            initialValue={value ? value : checkboxGroupInitialValues}
            // initialValue={['Education / Training / Employment Support']}
            rules={[{ required: !noRequired, message: reqMsg }]}
            validateStatus={loading ? 'validating' : validateKeyword}
            hasFeedback={loading ? true : feedback}
            help={help}
            style={containerStyle}
            className={containerClassName}
          >
            {/* Set Group initial value */}
            {/* {!value && group.map(item => { item.checked && checkboxGroupInitialValues.push(item.value ? item.value : item.label) })} */}
            {/* {formProps.getFieldDecorator(name, {
                initialValue: (value ? value : checkboxGroupInitialValues), //Array
                rules: [{ required: !noRequired, message: reqMsg }]
              })( */}
            <Checkbox.Group
              onChange={e => { onChange ? onChange(e) : ""; }}
              onBlur={e => { onBlur ? onBlur(e) : ""; }}
            >
              {/* =={value}== */}
              {group.map(item => {
                return (
                  <Checkbox
                    key={item.label}
                    //style={vertical ? { ...checkboxVerticalStyle, ...style } : style}
                    style={vertical ? { ...checkboxVerticalStyle, ...style, ...item.style } : { ...style, ...item.style }}
                    className={className ? className + ' ' + item.className : item.className}
                    disabled={item.disabled ? true : false}
                    onChange={e => { item.onChange ? item.onChange(e.target.checked) : ""; }}
                    onBlur={e => { item.onBlur ? item.onBlur(e.target.checked) : ""; }}
                    value={item.value ? item.value : item.label}
                  >{item.label ? item.label : label}
                  </Checkbox>
                )//End return
              })}
            </Checkbox.Group>
            {/* )} */}
          </Form.Item>
        </React.Fragment>
        :
        <Form.Item
          label={label}
          name={name}
          valuePropName='checked'
          initialValue={value}
          rules={[{
            required: !noRequired, message: reqMsg,
            transform: vl => (vl || undefined),  // Those two lines
            type: 'boolean',                           // Do the magic
          }]}
          validateStatus={loading ? 'validating' : validateKeyword}
          hasFeedback={loading ? true : feedback}
          help={help}
          style={containerStyle}
          className={containerClassName}
        >
          {/* {formProps.getFieldDecorator(name, {
            valuePropName: 'checked',
            initialValue: value,
            rules: [{
              required: !noRequired, message: reqMsg,
              transform: vl => (vl || undefined),  // Those two lines
              type: 'boolean',                           // Do the magic
            }]
          })( */}
          <Checkbox
            style={style}
            className={className}
            indeterminate={indeterminate}
            disabled={loading ? true : (disabled ? true : false)}
            onChange={e => { onChange ? onChange(e.target.checked) : ""; }}
            onBlur={e => { onBlur ? onBlur(e.target.checked) : ""; }}
          >
            {text ? text : label}
          </Checkbox>
          {/* )} */}
          {/*End single checkbox*/}
        </Form.Item>
    );
  } else if (type === "textarea") {
    return (
      <Form.Item
        label={label}
        name={name}
        initialValue={value}
        rules={[{ required: !noRequired, message: reqMsg }]}
        validateStatus={loading ? 'validating' : validateKeyword}
        hasFeedback={loading ? true : feedback}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        <TextArea
          style={style}
          rows={rows}
          className={className}
          size={size}
          placeholder={placeholder ? placeholder : label}
          onChange={e => { onChange ? onChange(e.target.value) : ""; }}
          onBlur={e => { onBlur ? onBlur(e) : ""; }}
          disabled={loading ? true : (disabled ? true : false)}
          autoComplete={autoComplete}
        />
      </Form.Item>
    );
  } else if (type === "switch") {
    return (
      <Form.Item
        label={label}
        name={name}
        valuePropName='checked'
        initialValue={value}
        rules={[{ required: !noRequired, message: reqMsg }]}
        style={containerStyle}
        className={containerClassName}
      >
        {/* {formProps.getFieldDecorator(name, {
          valuePropName: 'checked',
          initialValue: value,
          rules: [{ required: !noRequired, message: reqMsg }]
        })( */}
        <Switch
          style={style}
          className={className}
          onChange={e => { onChange ? onChange(e) : ""; }}
          onBlur={e => { onBlur ? onBlur(e) : ""; }}
          disabled={loading ? true : (disabled ? true : false)}
          size={size}
        />
        {/* )} */}
      </Form.Item>
    );
  } else if (type === "password") {
    return (
      <Form.Item
        label={label}
        name={name}
        initialValue={value}
        rules={[{ required: !noRequired, message: reqMsg }]}
        validateStatus={loading ? 'validating' : validateKeyword}
        hasFeedback={loading ? true : feedback}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        <Input.Password
          style={style}
          className={className}
          size={size}
          prefix={
            preIconLine ? <i className={preIconLine} style={{ color: preIconColorLine }} /> :
              preIconAnt ? preIconAnt : ""
          }
          suffix={
            sufIconLine ? <i className={sufIconLine} style={{ color: sufIconColorLine }} /> :
              sufIconAnt ? sufIconAnt : ""
          }
          placeholder={placeholder ? placeholder : label}
          onChange={e => { onChange ? onChange(e) : ""; }}
          onBlur={e => { onBlur ? onBlur(e) : ""; }}
          disabled={loading ? true : (disabled ? true : false)}
          autoComplete={autoComplete}
        />
      </Form.Item>
    ); //End of text and password
  } else {
    return (
      <Form.Item
        label={label}
        name={name}
        initialValue={value}
        rules={[{ required: !noRequired, message: reqMsg }]}
        validateStatus={loading ? 'validating' : validateKeyword}
        hasFeedback={loading ? true : feedback}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        <Input
          style={style}
          className={className}
          size={size}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          prefix={
            preIconLine ? <i className={preIconLine} style={{ color: preIconColorLine }} /> :
              preIconAnt ? preIconAnt : ""
          }
          suffix={
            sufIconLine ? <i className={sufIconLine} style={{ color: sufIconColorLine }} /> :
              sufIconAnt ? sufIconAnt : ""
          }
          placeholder={placeholder ? placeholder : label}
          onChange={e => { onChange ? onChange(e.target.value) : ""; }}
          onBlur={e => { onBlur ? onBlur(e) : ""; }}
          onKeyDown={e => { onKeyDown ? onKeyDown(e) : ""; }}
          disabled={loading ? true : (disabled ? true : false)}
          autoComplete={autoComplete}
        />
      </Form.Item>
    ); //End of text and password
  } //End if condition
}; //End function

export const AntFileUpload = ({
  label = false,
  icon = 'cloud-upload',
  heading = 'Click or drag file to upload',
  para = '',
  multiple = false,
  maxCount = 1,
  listType = 'text',
  onChange = false,
  name,
  noRequired = false,
  reqMsg = "Please upload file",
  containerStyle,
  containerClassName,
  // formProps,
  help,
  value = false
}) => {

  if (!name) { return <div style={nameError}>Please provide name attribute</div>; }//End if condition
  // if (!formProps) { return <div style={nameError}>Please provide formProps attribute.</div> }//End if condition
  const Dragger = Upload.Dragger;

  const props = {
    multiple: multiple,
    listType: listType,
    maxCount: maxCount,
    //listType: 'text',
    //listType: 'picture',
    //listType: 'picture-card',
    //onRemove: (file) => {for(var i=0; i<fileList.length;i++){if(fileList[i].uid === file.uid){fileList.splice(i, 1);break;}}},
    beforeUpload: (file, fileList) => {
      // fileList.push(file);
      return false;
    },
    //onChange : () => {onChange && onChange(fileList);}
  };//End documents upload props
  const normFile = e => {
    //console.log(e);
    //if (Array.isArray(e)) {return e;}
    onChange && onChange(e.fileList);
    return e.fileList;
  };

  return (
    <React.Fragment>
      <Form.Item
        label={label}
        name={name}
        // initialValue={value}
        rules={[{ required: !noRequired, message: reqMsg }]}
        valuePropName='fileList'
        getValueFromEvent={normFile}
        help={help}
        style={containerStyle}
        className={containerClassName}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon" style={{ margin: '0px' }}>
            {/* <Icon type={icon} /> */}{icon}
          </p>
          {heading && <p style={{ fontSize: '18px' }}>{heading}</p>}
          {para && <p>{para}</p>}
        </Dragger>
      </Form.Item>
    </React.Fragment>
  )
}//End function

// //It's return fields name as array
// export const AntFieldsName = (object, dynamicObjName = false) => {
//   //#Adding specific class on every form element which is given-------------------#//
//   var form = document.querySelector("form");
//   var elements = form.querySelectorAll(
//     ".ant-select, input, textarea, select, .ant-calendar-picker, .ant-radio-group"
//   );
//   //Add class in every element
//   for (var i = 0; i < elements.length; i++) {
//     elements[i].classList.add("_form_field");
//   } //End for loop
//   //#------------------------------------------------------------------------------#//

//   //#Getting ids of added is because id is the name in Antd form ----#//
//   elements = document.querySelectorAll("._form_field");
//   var names = [].map.call(elements, elem => {
//     return elem.id;
//   });
//   //#----------------------------------------------------------------#//

//   //If object has value then fetch specific object values according to field names
//   if (object) {
//     let obj = {};
//     for (i = 0; i < names.length; i++) {
//       obj[names[i]] = object[names[i]];
//     } //End for loop

//     if (dynamicObjName && object[dynamicObjName]) {
//       obj = { ...obj, ...AntDynamicFieldsGet(object, dynamicObjName) };
//     }//End if condition

//     return obj;
//   } else {
//     return names;
//   } //End if condition
// }; //End function

// export const AntDynamicField = ({ name, formProps, fieldRender, label, getRowCount }) => {
//   return (
//     <DynamicField name={name} label={label} fieldRender={fieldRender} getRowCount={getRowCount} />
//   );
// };

//export const AntDynamicFieldsGet = (data, objName) => { return AntDynamicFieldGet(data, objName); }
//export const AntDynamicFieldsSet = (values, dynamicFieldName) => { return AntDynamicFieldSet(values, dynamicFieldName); }
//export const AntDynamicFieldsOpen = (values) => { return AntDynamicFieldOpen(values); }
//export default FormServices;
