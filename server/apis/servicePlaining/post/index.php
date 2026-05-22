<?php
if (!isset($_POST) or !(sizeof($_POST) > 0)) {
  die();
}
// print_r($_POST);die();
$dt = $_POST;

#Check shift timing is crossing or not, if yes then return error 
$res = checkShiftBetweenSelectedTime($dt['spw_ref_id'], @$dt['spw_partner_ref_id'],$dt['frequency'], @$dt['service_date'], @$dt['service_day'], $dt['service_start_time'], $dt['service_end_time'], @$dt['service_from_date'], @$dt['service_to_date'],@$dt['id']);
if ($res['timeCrossError']) {
  echo json_encode($res);
  die();
}//End if condition
// die();

$dt['shift_no'] = @$dt['shift_no'] ? $dt['shift_no'] : getNewServicePlainingShiftNumber();
$dt['plaining_type'] = @$dt['plaining_type'] ? $dt['plaining_type'] : '1';
$dt['service_date'] = @$dt['service_date'] ? date('d-m-Y', strtotime($dt['service_date'])) : '';
$dt['service_from_date'] = @$dt['service_from_date'] ? date('d-m-Y', strtotime($dt['service_from_date'])) : '';
$dt['service_to_date'] = @$dt['service_to_date'] ? date('d-m-Y', strtotime($dt['service_to_date'])) : '';

if ($dt['frequency'] === '5.1') {
  $dt['frequency'] = '5';
  $dt['frequencyWeek'] = '1';
} //End if condition

if ($dt['frequency'] === '5.2') {
  $dt['frequency'] = '5';
  $dt['frequencyWeek'] = '2';
} //End if condition

//@ If frequency is "On Client Request/Appointment" then auto select recurring type as Range and Start and End Time as Service Date
if ($dt['frequency'] === '9' or $dt['frequency'] === '12') {
  $dt['service_recurring_type'] = '11';//? Date Range
  $dt['service_from_date'] = $dt['service_date'];
  $dt['service_to_date'] = $dt['service_date'];
  $dt['service_day'] = date('l',strtotime($dt['service_date']));
} //End if condition

if (@$_POST['id']) {
  include "../apis/servicePlaining/sp_functions.php"; //$adminEmailContent
  $res = getAfterSetUnattendedShifts(false, $_POST['id']);
  //? If update unattended function has some error for any reason then don't update shift until it will be solved
  if (!$res['status']) {
    echo json_encode($res);
    die();
  } //End if condition
} //End if condition

#Add data into DB
$res = dbQuery("post", $dt, $service_plaining_table);
$spId = $res['id'];
if ($res['status'] AND $live_server) {
  require_once '../plugins/PHPMailer_v5.1/class.phpmailer.php'; //library added in download source
  sendServiceApproveBulkEmail($dt['status'], $res['id'], $dt['id']);
} //End if condition  

//@ If Form is submitted from Appointment Module then Update appointment Status
if ($res['status'] and $dt['appointment_ref_id']) {
  $statusForAppointment = ($dt['status'] === 'approve' ? 'assigned' : $dt['status']);
  $res = dbQuery("UPDATE $client_appointment_table SET service_plaining_ref_id = '$spId', status = '$statusForAppointment' WHERE id = '" . $dt['appointment_ref_id'] . "'");
  $res['successMsg'] = @$_POST['id']  ? 'Appointment has been Updated' : 'Appointment has been Assigned so Support Worker';
  $res['shift_no_old'] = @$dt['shift_no'];
} else {
  //@ If it's normal submit
  $res['successMsg'] = @$_POST['id'] ? 'Data has been updated successfully' : 'Data has been added successfully';
  $res['shift_no'] = getNewServicePlainingShiftNumber();  
}//End if condition

$res['id'] = $spId;
$res['successNotify'] = true;
$res['successNotifyType'] = 'notify';
echo json_encode($res);