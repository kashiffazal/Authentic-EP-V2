<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  // print_r($_POST);die();
  $timesheetsData = json_decode($_POST['timesheetsData'],true);
  unset($_POST['timesheetsData']);
  $serviceTimeTableId = $_POST['service_time_table_ref_id'];
  unset($_POST['service_time_table_ref_id']);
  $lastDone = $_POST['last_done'];
  unset($_POST['last_done']);
  $_POST['service_done_by_spw_ref_id'] = $_SESSION['link_id'];
  $data = $_POST;
  // print_rp($data);die();
  // print_rp($_SESSION);
  //  print_r($data);
  //  print_r($timesheetsData);
  //  die();

  #Add or Update timesheets
  // $tsClId = addTimeSheet('client',array_merge($data,$timesheetsData));
  // $data['client_timesheet_ref_id'] = $tsClId['id'];
  // $tsEmId = addTimeSheet('staff',array_merge($data,$timesheetsData));
  // $data['staff_timesheet_ref_id'] = $tsEmId['id'];

  $tsEmId = addStaffTimeSheet(array_merge($data,$timesheetsData));
  if(!$tsEmId['status']){echo json_encode($tsEmId);die();}
  $data['staff_timesheet_ref_id'] = $tsEmId['id'];
  unset($data['shift_no']);
  // die();

  $data['id'] = $serviceTimeTableId;
  $data['status'] = 'unreviewed';
  $data['delayStatus'] = '';
  $data['timerData'] = '';

  #Check if shift is started on or after given minutes then changes status
  $timeDiffInMin = (int) timeDifference($data['start_time_actual'],$data['start_time'])['min'];
  if($timeDiffInMin >= $_SESSION['dst']['shift']['delayMaxTimeInMinutes']){$data['delayStatus'] = 'true';}//End if condition

  #If there is no id then return Error
  if(isset($data['id'])){
    $res = dbQuery("post", $data, $service_timing_table);
    if($res['status'] AND $data['request_id']){
      #Update requested tables status as done for both
      dbQuery("post",array('id' => $data['request_id'], 'status' => 'done'),$service_plaining_rr_table);
      dbQuery("post",array('id' => $data['replaced_spw_id'], 'status' => 'done'),$service_plaining_rspw_table);
    }//End if condition
  }else{
    $res['status'] = false;
    $res['errorMsg'] = 'Something gets wrong, Please try again';
  }//End if condition

  if($res['status']){
    #Uploads Sign images
    base64ToImage($timesheetsData['clientSign'],'../files/documents/signatures/client/'.$data['staff_timesheet_ref_id'].'-'.$tsEmId['json_count'].'-c.png');
    base64ToImage($timesheetsData['staffSign'],'../files/documents/signatures/staff/'.$data['staff_timesheet_ref_id'].'-'.$tsEmId['json_count'].'-e.png');
    
    #Set Last done date for support worker or partner (0 for support worker and 1 for partner)
    $lastDone = explode('=>', $lastDone);
    if($_SESSION['link_id'] == $data['spw_ref_id']){
      $lastDone[0] = $server_date;
    }else{
      $lastDone[1] = $server_date;
    }//End if condition
    $lastDone = implode('=>',$lastDone);
    // print_r($lastDone);
    
    $post = array('id' => $data['service_plaining_ref_id'], 'last_done' => $lastDone);
    $res = dbQuery("post",$post,$service_plaining_table);
  }//End if condition

  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = 'Service Start and End time has been added successfully';
  
  echo json_encode($res);
?>