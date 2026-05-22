<?php

  $spId = $_GET['spid'];
  $shiftEditId = $_GET['shiftEditId'];

  $res = array('status' => true);
  $res['data']['serviceList'] = serviceListByType();
  $res['data']['timeListArr'] = timeList();
  #Get remaining data
  $res['data']['formData'] = dbQuery("SELECT id,service_ref_id,meal_break_min,rest_break_min,remarks FROM $service_plaining_table WHERE id = '$spId'")['data'][0];
  #Load data from shift edit table if available 
  if(@$_GET['shiftEditId']){
    $v = dbQuery("SELECT id AS shift_edit_ref_id,service_ref_id,service_date,service_start_time,service_end_time,meal_break_min,rest_break_min,remarks FROM $shift_edit_table WHERE id = '$shiftEditId'")['data'][0];
    $res['data']['formData'] = array_merge($res['data']['formData'],$v);
  }//End if condition  
  
  echo json_encode($res);
?>