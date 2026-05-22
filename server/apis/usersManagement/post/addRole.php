<?php

  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

  //$_POST['permission_ref_ids'] = implode(",",$_POST['permission_ref_ids']);

  if($_POST['linkWithSP']){
    $_POST['linkRole'] = 'SPW';
  }//End if condition
  unset($_POST['linkWithSP']);

  unset($_POST['check_all']);
  if(@$_POST['hideForOthers']){
    $_POST['hideForOthers'] = 'true';
  }else{
    $_POST['hideForOthers'] = '';
  }//End if condition

  $_POST['permission_ref_ids'] = str_replace('check_all,','',$_POST['permission_ref_ids']);
  $_POST['permission_ref_ids'] = str_replace('check_all','',$_POST['permission_ref_ids']);
  // print_r($_POST);exit();

  $res = dbQuery('post',$_POST,$users_role_table);
  
  $res['successNotify'] = true;
  if(@$_POST['id']){
    $res['successMsg'] = "Role has been updated successfully.";
  }else{
    $res['successMsg'] = "Role has been added successfully.";
  }//End if condition

  echo json_encode($res);
  
 ?>