<?php
if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
$dt = $_POST;
$status = $dt['status'];
$id = $dt['id'];
$res = dbQuery("UPDATE $service_plaining_table SET status = '$status' WHERE id = '$id'");
if ($res['status']) {
	//@ If this SP is connected with Appointment Module then also Update status for Appointment
	if ($dt['appointment_ref_id']) {
		$statusForAppointment = ($status === 'approve' ? 'assigned' : $status);
		$res = dbQuery("UPDATE $client_appointment_table SET service_plaining_ref_id = '$id', status = '$statusForAppointment' WHERE id = '" . $dt['appointment_ref_id'] . "'");
	}//End if condition
	//@Send Email on change status
	require_once '../plugins/PHPMailer_v5.1/class.phpmailer.php'; //library added in download source
	sendServiceApproveBulkEmail($status, $id);
} //End if condition
$res['successNotify'] = true;
$res['successNotifyType'] = 'notify';
$res['successMsg'] = !$dt['appointment_ref_id'] ? 'Status has been updated successfully' : 'Appointment has been Updated';
echo json_encode($res);
