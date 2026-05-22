<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $dt = $_POST;
  if(@$dt['delete_recover_status'] !== 'deleted'){
    #Check shift timing is crossing or not, if yes then return error 
    include '../apis/serviceSchedule/sch_functions.php';
    $res = checkRecurringShiftBetweenSelectedTime($dt);
    //print_rp($res);die();
    if($res['timeCrossError']){echo json_encode($res);die();}
  }//End if condition

  #If it's deleted or recover then skip updated details because it's not edit shift it's just changes status type of query
  #And add deleted/recover status date time details in order we can get details who deleted or recovered shift
  $skipCols = '';
  if(@$dt['delete_recover_status'] === 'deleted' OR @$dt['delete_recover_status'] === 'recover'){
    $skipCols = 'updated_date,updated_time,updated_by'; 
    date_default_timezone_set("Asia/Karachi");
    $dt['delete_recover_date'] = date('Y-m-d');
    $dt['delete_recover_time'] = date('h:i:s A');
    $dt['delete_recover_by'] = @$_SESSION['user_id'];
  }//End if condition

  // print_rp($dt);die();
  if(isset($dt['spw_ref_id'])){unset($dt['spw_ref_id']);}
  if(isset($dt['spw_partner_ref_id'])){unset($dt['spw_partner_ref_id']);}
  unset($dt['service_day']);

  $dt['service_date'] = date('Y-m-d',strtotime($dt['service_date']));
  $dt['status'] = 'active';
  // print_rp($dt);
  $res = dbQuery('post',$dt,$shift_edit_table,$skipCols);  
  $res['successNotify'] = true;
	$res['successNotifyType'] = 'notify';
	$res['successMsg'] = "Shift has been updated";
  echo json_encode($res);
?>