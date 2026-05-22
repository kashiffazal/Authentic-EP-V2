<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  //print_r($_POST);die();
  $id = $_POST['id'];
  $status = $_POST['status'];
  $res = dbQuery("UPDATE $job_table SET status = '$status' WHERE id = '$id'");
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "Status has been updated successfully";
  echo json_encode($res);
?>