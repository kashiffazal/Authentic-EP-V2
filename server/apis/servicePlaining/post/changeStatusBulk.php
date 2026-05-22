<?php
	if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
	$dt = $_POST;
	$status = $dt['status'];
	$ids = $dt['ids'];

	// echo $status;
	// echo $ids;
	// die();
	$res = dbQuery("UPDATE $service_plaining_table SET status = '$status' WHERE id IN ($ids)");
	if($res['status']){
		require_once '../plugins/PHPMailer_v5.1/class.phpmailer.php'; //library added in download source
		sendServiceApproveBulkEmail($status,$ids);
	}//End if condition
	$res['successNotify'] = true;
	$res['successNotifyType'] = 'notify';
	$res['successMsg'] = "Status has been updated successfully";
	echo json_encode($res);
?>