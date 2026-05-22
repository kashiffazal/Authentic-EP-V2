<?php
if (!isset($_POST) or !(sizeof($_POST) > 0)) {
	die();
} //End if condition
$dt = $_POST;
$id = $dt['id'];
// print_rp($dt);
// die();
//! If it's transfer from unattended then add this in staff time-sheet and then update status with timesheet ref id
if ($dt['oldStatus'] === 'unattended') {
	$data['start_time'] = @$dt['start_time'];
	$data['end_time'] = @$dt['end_time'];

	//@ Unattended To Deleted 
	if ($data['newStatus'] === 'deleted') {
		//? Just Update the Status
		$res = dbQuery("UPDATE $service_timing_table SET status = '".$dt['newStatus']."' WHERE id = '$id'");
	} else {
	//@ Unattended To Reviewed/Un-Reviewed 
		$res = addStaffTimeSheet($data, false, $id);
		if (!$res['status']) {//@ If Time-Sheet data is inserted then update status and Time-Sheet ID 
			$res = dbQuery("UPDATE $service_timing_table SET status = '".$dt['newStatus']."', staff_timesheet_ref_id = '".$res['id']."' WHERE id = '$id'");
		} //End if condition
	}//End if condition 

	//@Deleted to Unattended
} else if($dt['oldStatus'] === 'deleted' AND $dt['newStatus'] === 'unattended'){
		//? Just Update the Status
		$res = dbQuery("UPDATE $service_timing_table SET status = '".$dt['newStatus']."' WHERE id = '$id'");
} else if($dt['newStatus'] === 'unattended'){

} else {
	$res = dbQuery("UPDATE $service_timing_table SET status = '" . $dt['newStatus'] . "' WHERE id = '$id'");
} //End if condition

$res['successNotify'] = true;
$res['successNotifyType'] = 'notify';
$res['successMsg'] = "Status has been updated successfully";
echo json_encode($res);
?>