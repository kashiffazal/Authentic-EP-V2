<?php
	if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
	$dt = $_POST;
	$status = $dt['status'];
	$ids = $dt['ids'];
	$res = dbQuery("UPDATE $service_timing_table SET status = '$status' WHERE id IN ($ids)");
	$res['successNotify'] = true;
	$res['successNotifyType'] = 'notify';
	$res['successMsg'] = "Statu(s) has been updated successfully";
	echo json_encode($res);
?>