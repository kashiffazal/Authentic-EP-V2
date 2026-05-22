<?php
if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
$dt = $_POST;
$status = $dt['status'];
$id = $dt['id'];
$res = dbQuery("UPDATE $service_plaining_rr_table SET status = '$status' WHERE id = '$id'");
$res['successNotify'] = true;
$res['successNotifyType'] = 'notify';
$res['successMsg'] = "Status has been updated successfully";
echo json_encode($res);
