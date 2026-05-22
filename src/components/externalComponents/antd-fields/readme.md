/*Select*/
<AntInput 
name="description" 
label="Description" 
placeholder="Add some description" 
noRequired={true} />

<AntInput 
filter={true}
type="select"
label="Select ESPS Server"
name="esps_server_name"
options={st.esps_server_list} 
setValueLabel={['value','label']}
emptyFirstVal="-Select-"
mode={true} //Hide -Select- option (default is false)
loading={true/false}
/>

<AntInput
  name="anotherSourceOfFunding"
  type="radio"
  label="Will another source of funding be used (either instead of or in addtion to NDIS funding)?"
  vertical
  radioOptions={[
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]}
  disabled={true/false}
/>


  



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
  onBlur,
  disabled,
  //Text and password
  preIcon = false,
  preIconColor = "rgba(0,0,0,.25)",
  sufIcon = false,
  sufIconColor = "rgba(0,0,0,.25)",
  //Email 
  emailErrorMsg = "The input is not valid E-mail!",
  //Number
  min = 0,
  max = 1000000000000000000000 * 1000000000000000000000,
  step = 0.1,
  numPreFix = false,
  numPostFix = false,
  //Select
  options = [],
  setValueLabel = false,
  filter = false,
  mode = false,
  //Datepicker
  format = "DD/MM/YYYY",
  //Radio
  radioOptions = [],
  vertical = false,
  //checkbox
  group = false,
  text,
  indeterminate = false,
  //Textarea
  rows,
  minRows = 4,
  maxRows, //Fix
  //Antd Essentials
  size = "default",
  formProps,
  help = undefined,
  feedback