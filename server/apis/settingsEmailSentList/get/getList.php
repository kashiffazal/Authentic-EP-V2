<?php
  //@Get data from DB on Status
  $query = "SELECT el.id,el.subject,el.section_ref_name,el.sent_status,el.sent_date,el.sent_time,el.status,el.inserted_date,el.inserted_time,emm.module,esm.sub_module";
  //? If getting failed list then get failed reason
  if($value === 'failed' OR $value === 'deleted'){$query .= ",el.failed_reason";}//End if condition
  $query .= "
    FROM $email_sent_list AS el
    INNER JOIN $email_module_main_table AS emm ON el.module_ref_id = emm.id
    INNER JOIN $email_module_sub_table AS esm ON el.sub_module_ref_id = esm.id
    WHERE ";
  if($value === 'deleted'){
    $query .= "el.status = '$value'";
  }else{
    $query .= "el.sent_status = '$value' AND el.status = 'active'";
  }//End if condition

  $pdo_res = executePDO($query);
  // failed_reason
  $arr = array();
  $i = 1;
  while ($row = $pdo_res['data']->fetch()) {
    $row['key'] = $i;
    $row['inserted_date_formatted'] = dateFormat($row['inserted_date'],false,'jS M Y').', '.$row['inserted_time'];
    $row['sent_date_formatted'] = $row['sent_date'] ? dateFormat($row['sent_date'],false,'jS M Y').', '.$row['sent_time'] : '';
    $row['status'] = $row['status'] === 'deleted' ? $row['status'] : $row['sent_status'];
    $arr[] = $row;
    $i++;
  }//End while loop
  $res = array('status' => true, 'data' => array_reverse($arr));
  
  //@ Set Status list
  $status = array(
    'failed' => array('name' => 'Failed to Send', 'icon' => 'las la-exclamation-circle status-inactive-color', 'sub_title' => 'List of all failed email who could not be sent with any reason'),
    'sent' => array('name' => 'Sent Successfully', 'icon' => 'las la-check-circle status-active-color', 'sub_title' => 'List of all successfully sent email'),
    'deleted' => array('name' => 'Deleted', 'icon' => 'las la-times-circle status-close-color', 'sub_title' => 'List of all deleted email')
  );
  $res['status_list'] = $status;

  //@ Get app settings for log filtration
  include './settingJSON/get/getJSON.php';
  $res['appDefaultSetting'] = $devSettingJSON['settings']['emailSentList']; 

  echo json_encode($res);

?>