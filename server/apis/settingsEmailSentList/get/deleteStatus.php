<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}  
  $deleteStatus = 'deleted';
  $postArr = array('id' => $_POST['id'],'status' => $deleteStatus);
  $res = dbQuery('post',$postArr,$email_sent_list);
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "Record has been deleted";
  $res['status'] = $deleteStatus;
  echo json_encode($res);
?>