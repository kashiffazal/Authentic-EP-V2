<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $_POST['status'] = 'requested';
  $_POST['requested_by'] = @$_POST['requested_by'] ? $_POST['requested_by'] : $_SESSION['link_id'];
  
  //@Set Main Requestor SW
  if($_SESSION['link_id'] === $_POST['spw_ref_id']){$_POST['spw2_ref_id'] = '';}//End if condition
  if($_SESSION['link_id'] === $_POST['spw2_ref_id']){$_POST['spw_ref_id'] = '';}//End if condition
  
  //@ Request by Admin and Set Main SW for request
  if (@$_POST['requested_by'] === $_POST['spw_ref_id']) {$_POST['spw2_ref_id'] = '';}//End if condition
  if (@$_POST['requested_by'] === $_POST['spw2_ref_id']) {$_POST['spw_ref_id'] = '';}//End if condition

  if(!$_POST['req_for_day']){$_POST['req_for_day'] = date('l',strtotime($_POST['req_for_date']));}
  $_POST['req_for_date'] = date('d-m-Y',strtotime($_POST['req_for_date']));
  
  // print_rp($_POST);die();
  // $requestForDate = getReplacementRequestedShiftDate($_POST['service_plaining_ref_id'],$_POST['spw_ref_id'],$_POST['spw2_ref_id']);
  // print_rp($requestForDate);die();
  // $_POST['req_for_date'] = $requestForDate;
  // $_POST['req_for_day'] = date('l',strtotime($requestForDate));

  $_POST['request_no'] = getNewShiftReplacementNumber();

  $res = dbQuery("post",$_POST,$service_plaining_rr_table);
  echo json_encode($res);
?>