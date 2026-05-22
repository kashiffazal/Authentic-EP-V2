<?php
if (!isset($_POST) or !(sizeof($_POST) > 0)) {
  die();
} //End if condition

//@ Changes from Assign to Deleted
//@ Assigned shift has SP then also update SP status as On Hold/Deleted
if ($_POST['service_plaining_ref_id']) {
  $dt = array('id' => $_POST['service_plaining_ref_id'], 'status' => $_POST['newStatus']);
  dbQuery('post', $dt, $service_plaining_table);
}//End if condition

//@ Set variables for Update
$_POST['status'] = $_POST['newStatus'];
$_POST['oldStatus'] = $_POST['currentStatus'];
$newStatus = $_POST['newStatus'];
unset($_POST['newStatus']);
unset($_POST['currentStatus']);

$res = dbQuery('post', $_POST, $client_appointment_table);
$res['successNotify'] = true;
$res['successNotifyType'] = 'notify';
$res['successMsg'] = 'Status has been changes as ' . $newStatus;

echo json_encode($res);
?>