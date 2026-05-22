<?php

$value = $_GET['id'] != '' ? $_GET['id'] : false;

$res = array('status' => true);
$res['data']['clientList'] = clientList();
$res['data']['supportWorkerList'] = supportWorkerList();
$res['data']['serviceList'] = serviceList(false,"id,CONCAT(code,' ',name) AS name",($_GET['dataForAppointment'] ? false : '15'));

#Get Frequency and add weeks for SP form
$frequency = serviceFrequencyList($_GET['dataForAppointment'] ? false : '12');
//@If there is frequency for Appointment then avoid the Fortnight Weeks
if(!$_GET['dataForAppointment']){
  $frequency[] = array('value' => '5.1', 'label' => $frequency[0]['label'] . ' (Week 1)', 'key' => 1.1);
  $frequency[] = array('value' => '5.2', 'label' => $frequency[0]['label'] . ' (Week 2)', 'key' => 1.2);
  unset($frequency[0]);
}//End if condition
$res['data']['frequency'] = sort_multidimensional_array_by_key($frequency, 'value');

$res['data']['recurring_type'] = getDropdownByListName('service_recurring_type')['service_recurring_type'];

//@ Meal and Rest Break list
$min = 0;
$minArr = array();
for ($i = 0; $i < 72; $i++) {
  $min = $min + 5;
  $minArr[] = array('value' => (string) $min, 'label' => (string) $min);
} //End for loop
$res['data']['meal_break_list'] = $minArr;
$res['data']['rest_break_list'] = $minArr;

$res['data']['timeListArr'] = timeList();
$res['data']['plaining_type'] = array(
  array('label' => 'Regular', 'value' => '1'),
  array('label' => 'Extra', 'value' => '2')
);
$res['data']['status'] = array(
  array('label' => 'Approve', 'value' => 'approve'),
  array('label' => 'Unapproved', 'value' => 'unapproved'),
  array('label' => 'On Hold', 'value' => 'on_hold'),
);
//@ If Form is Opened by Appoint Module then Include Deleted Status as well
if ($_GET['dataForAppointment']) {
  $res['data']['status'] = array(
    array('label' => 'Assigned', 'value' => 'approve'),
    array('label' => 'On Hold', 'value' => 'on_hold'),
    array('label' => 'Deleted', 'value' => 'deleted')
  );
}//End if condition

$res['data']['monthDayList'] = array();
for ($i = 0; $i < 31; $i++) {
  $res['data']['monthDayList'][] = array('label' => date('jS', strtotime(($i + 1) . '-12-2022')), 'value' => (string) str_pad(($i + 1), 2, 0, STR_PAD_LEFT));
} //End for loop
$res['data']['monthDayList'][] = array('label' => 'Last date of month', 'value' => 'last_date');
$res['shift_no'] = getNewServicePlainingShiftNumber();

if (@$value) {
  $data = dbQuery("SELECT id,shift_no,plaining_type,client_ref_id,service_ref_id,spw_ref_id,spw_partner_ref_id,frequency,frequencyWeek,service_day,service_date,service_start_time,service_end_time,service_recurring_type,service_from_date,service_to_date,meal_break_min,rest_break_min,remarks,appointment_ref_id,status FROM $service_plaining_table WHERE id = '$value'")['data'][0];
  unset($data['key']);
  $res['totalHour'] = differenceInHours($data['service_start_time'], $data['service_end_time'], true);
  if ($data['frequency'] === '5') {
    $data['frequency'] = $data['frequency'] . '.' . $data['frequencyWeek'];
  } //End if condition
  // print_rp($data);
  $res['data']['formValues'] = $data;
} //End if condition

echo json_encode($res);
?>