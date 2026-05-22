<?php

  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  // print_r($_POST);die();

  $id = @$_POST['id'];
  $type = $_POST['type'];
  $client_ref_id = @$_POST['client_ref_id'];
  $sp_ref_id = @$_POST['sp_ref_id'];
  unset($_POST['id']);
  unset($_POST['client_ref_id']);
  unset($_POST['sp_ref_id']);
  foreach($_POST as $k => $v){$_POST[$k] = $_POST[$k] ? date('d-m-Y', strtotime($_POST[$k])) : '';}//End foreach
  $_POST['id'] = $id;
  $_POST['client_ref_id'] = $client_ref_id;
  $_POST['sp_ref_id'] = $sp_ref_id;
  $_POST['type'] = $type;
  
  // print_r($_POST);die();

  $res = dbQuery('post',$_POST,$document_tracking_table);
  
  // if($res['status']){
  //   cronJobCreate('https://abc.com/asdf/asdf?aa=as&name=kashif','2021-11-20T03:04:12');
  // }//Endif condition
  
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  if(@$_POST['id']){
    $res['successMsg'] = "Expiry dates has been updated successfully";
  }else{
    $res['successMsg'] = "Expiry dates has been added successfully";
  }//End if condition

  echo json_encode($res);

?>