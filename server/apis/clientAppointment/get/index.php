<?php

$query = "
      SELECT 
      cat.id,cat.appointment_no,cat.client_ref_id,cat.date,cat.start_time,cat.end_time,cat.title,cat.service_plaining_ref_id,cat.status,cat.oldStatus,
      CONCAT(ct.first_name,' ',ct.last_name) AS name,
      sp.shift_no
      FROM $client_appointment_table AS cat
      LEFT JOIN $client_form_table AS ct ON cat.client_ref_id = ct.id
      LEFT JOIN $service_plaining_table AS sp ON cat.service_plaining_ref_id = sp.id   
  ";
  if(@!$_SESSION['link_id']){
    $query .= "WHERE cat.status = '".$value."'";
  }else{
    $query .= "WHERE cat.inserted_by = '$session_user_id'";
  }//End if condition

  
  $status = array(
    // 'all' => array('name' => 'All', 'icon' => 'las la-list-ul'),
    'unassigned' => array('name' => 'Unassigned', 'icon' => $statusDataGlobal['unapproved']['icon'], 'mobileIcon' => $statusDataGlobal['unapproved']['mobileIcon'], 'color' => $statusDataGlobal['unapproved']['color']),
    'assigned' => array('name' => 'Assigned', 'icon' => $statusDataGlobal['approved']['icon'], 'mobileIcon' => $statusDataGlobal['approved']['mobileIcon'], 'color' => $statusDataGlobal['approved']['color']),
    'on_hold' => array('name' => 'On Hold', 'icon' => $statusDataGlobal['on_hold']['icon'], 'mobileIcon' => $statusDataGlobal['on_hold']['mobileIcon'], 'color' => $statusDataGlobal['on_hold']['color']),
    'deleted' => array('name' => 'Deleted', 'icon' => $statusDataGlobal['deleted']['icon'], 'mobileIcon' => $statusDataGlobal['deleted']['mobileIcon'], 'color' => $statusDataGlobal['deleted']['color'])
  );  
  
  $pdo_res = executePDO($query);
  // print_r($pdo_res);
  $arr = array();
  $i = 1;
  while($row = $pdo_res['data']->fetch()){
    $row['key'] = $i;
    $row['date'] = date('d-m-Y',strtotime($row['date']));
    $row['time'] = $row['start_time'] ? ($row['start_time'] . ' to ' . $row['end_time']) : '-';
    $row['shift_no'] = $row['shift_no'] ? $row['shift_no'] : '-';    
    $arr[] = $row;
    $i++;
  }//End while loop

  $res = array('status' => true, 'data' => array_reverse($arr),'status_list' => $status, 'assignConfirmShiftMsg' => array(
    'title' => 'Assigning with Shift',
    'msg' => 'After assigning the appointment you cannot reset it as <strong>Unassigned</strong>, because assigning means create a new <strong>SP Shift</strong> for specific date. Rather then you can make <strong>Hold</strong> or <strong>Delete</strong> as you want.'
  ));
  
  include './settingJSON/get/getJSON.php';
  $res['appDefaultSetting'] = $devSettingJSON['formSetting']['appointment']; 
  
  echo json_encode($res);
?>