<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  // print_r($_POST);die();
  $res = dbQuery("post", $_POST, $service_timing_table);
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = 'Time has been added successfully';
  

  echo json_encode($res);
?>