<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $dt = $_POST;
  $dt['statusData'] = json_decode($dt['statusData'],true);
  //print_r($dt);die();
  $id = $dt['id'];
  $status = $dt['statusData'];
  $res = dbQuery("UPDATE $support_worker_form_table SET teamStatus = '$status' WHERE id = '$id'");
    
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "Status has been updated successfully";
  echo json_encode($res);
?>