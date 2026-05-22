<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  //print_r($_POST);die();
  
  $_POST['status'] = 'active';
  $res = dbQuery('post',$_POST,$job_table);
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  if(@$_POST['id']){
    $res['successMsg'] = "Job has been updated successfully";
  }else{
    $res['successMsg'] = "New Job has been added successfully";
  }//End if condition

  echo json_encode($res);

?>