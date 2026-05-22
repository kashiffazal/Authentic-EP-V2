<?php
  #Get general list by status but when status is 'replaced' then get replaced support workers name
  $query = "
    SELECT
    sprt.id,sprt.request_no,sprt.service_plaining_ref_id,sprt.req_for_date,sprt.req_for_day,sprt.reason,sprt.status,sprt.inserted_date,
    spt.shift_no,
    CONCAT(spw1.first_name,' ',spw1.last_name) AS swp1_name,
    CONCAT(spw2.first_name,' ',spw2.last_name) AS swp2_name
	";
  if($value === 'replaced'){
    $query .= ",
      CONCAT(spwr1.first_name,' ',spwr1.last_name) AS swpr1_name,
      CONCAT(spwr2.first_name,' ',spwr2.last_name) AS swpr2_name";
  }//End if condition
  $query .= "
    FROM $service_plaining_rr_table AS sprt
    INNER JOIN $service_plaining_table AS spt ON sprt.service_plaining_ref_id = spt.id
    LEFT JOIN $support_worker_form_table AS spw1 ON sprt.spw_ref_id = spw1.id
    LEFT JOIN $support_worker_form_table AS spw2 ON sprt.spw2_ref_id = spw2.id
  ";
  if($value === 'replaced'){
    $query .= "
    LEFT JOIN $service_plaining_rspw_table AS rpsp ON sprt.id = rpsp.request_table_ref_id
    LEFT JOIN $support_worker_form_table AS spwr1 ON rpsp.spw_ref_id = spwr1.id
    LEFT JOIN $support_worker_form_table AS spwr2 ON rpsp.spw_partner_ref_id = spwr2.id
    ";
  }//End if condition
  $query .= "WHERE sprt.status = '$value' ORDER by sprt.id ";

  $pdo_res = executePDO($query);
  $arr = array();
  $i = 1;
  while($row = $pdo_res['data']->fetch()){
    $row['key'] = $i;
    $row['inserted_date_formatted'] = date('d-m-Y',strtotime($row['inserted_date']));
    $row['req_for_date_formatted'] = date('d-m-Y',strtotime($row['req_for_date']));
    #SPW Name
    $row['sp_name'] = $row['swp1_name'];
    $row['partner'] = false;
    if($row['swp2_name']){
      $row['sp_name'] = $row['swp2_name'].' (Partner)';
      $row['partner'] = true;
    }//End if condition
    if(!$row['sp_name']){$row['sp_name'] = '-';}
    unset($row['swp1_name'],$row['swp2_name']);
    $arr[] = $row;
    $i++;
  }//End while loop
  $arr = array_reverse($arr);

  //@ Set Status List
  $statusList = array(
    'requested' => array( 'name' => 'Requested', 'icon' => $statusDataGlobal['requested']['icon'], 'mobileIcon' =>  $statusDataGlobal['requested']['mobileIcon'], 'color' => $statusDataGlobal['requested']['color']),
    'replaced' => array('name' => 'Replaced', 'icon' => $statusDataGlobal['replaced']['icon'], 'mobileIcon' =>  $statusDataGlobal['replaced']['mobileIcon'], 'color' => $statusDataGlobal['replaced']['color'] ),
    'hold' => array('name' => 'On Hold', 'icon' => $statusDataGlobal['on_hold']['icon'], 'mobileIcon' =>  $statusDataGlobal['on_hold']['mobileIcon'], 'color' => $statusDataGlobal['on_hold']['color']),
    'deleted' =>  array('name' => 'Deleted', 'icon' => $statusDataGlobal['deleted']['icon'], 'mobileIcon' =>  $statusDataGlobal['deleted']['mobileIcon'], 'color' => $statusDataGlobal['deleted']['color'] )
  );   

  echo json_encode(array('status' => true, 'data' => $arr, 'statusList' => $statusList));