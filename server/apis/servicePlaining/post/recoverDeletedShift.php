<?php
	if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

  #Check shift timing is crossing or not, if yes then return error 
  include '../apis/serviceSchedule/sch_functions.php';
  $res = checkRecurringShiftBetweenSelectedTime($_POST);
  //print_rp($res);die();
  if($res['timeCrossError']){echo json_encode($res);die();}

  $dt = array('id' => $_POST['shift_edit_ref_id']);
  $skipCols = 'updated_date,updated_time,updated_by'; 
  date_default_timezone_set("Asia/Karachi");
  $dt['delete_recover_date'] = date('Y-m-d');
  $dt['delete_recover_time'] = date('h:i:s A');
  $dt['delete_recover_by'] = @$_SESSION['user_id'];
  $dt['delete_recover_status'] = 'recover';
  //print_rp($_POST);die();
  $res = dbQuery('post',$dt,$shift_edit_table,$skipCols);  
  $res['successNotify'] = true;
	$res['successNotifyType'] = 'notify';
	$res['successMsg'] = "Shift has been recovered";
  echo json_encode($res);
?>