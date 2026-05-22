<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  //print_r($_POST);die();
  

  $_POST['date'] = $_POST['date'] ? date('d-m-Y', strtotime($_POST['date'])) : '';
  $_POST['status'] = 'active';
  $res = dbQuery('post',$_POST,$client_progress_note_table);
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  if(@$_POST['id']){
    $res['successMsg'] = "Progress Note has been updated successfully";
  }else{
    $res['successMsg'] = "Progress Note has been added successfully";
  }//End if condition

  echo json_encode($res);

?>