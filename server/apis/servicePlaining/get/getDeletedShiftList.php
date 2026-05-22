<?php
  $from = $_GET['from'];
  $to = $_GET['to'];

  $query = "
    SELECT 
    se.id AS shift_edit_ref_id,se.service_plaining_ref_id AS id,
    se.service_date,
    se.service_start_time,
    se.service_end_time,
    se.meal_break_min, se.rest_break_min,
    se.remarks,
    se.inserted_date, se.inserted_time,
    se.delete_recover_date AS updated_date, se.delete_recover_time AS updated_time,
    se.delete_recover_reason,
    sp.shift_no,
    sp.spw_ref_id,
    sp.spw_partner_ref_id,
    CONCAT(ut1.first_name,' ',ut1.last_name) AS inserted_by,
    CONCAT(ut2.first_name,' ',ut2.last_name) AS updated_by,
    CONCAT(sw1.first_name,' ',sw1.last_name) AS sw1_name,
    CONCAT(sw2.first_name,' ',sw2.last_name) AS sw2_name,
    CONCAT(sl1.code,' ',sl1.name) AS service_name
    FROM $shift_edit_table AS se
    INNER JOIN $service_plaining_table AS sp ON se.service_plaining_ref_id = sp.id
    INNER JOIN $support_worker_form_table AS sw1 ON sp.spw_ref_id = sw1.id
    LEFT JOIN $support_worker_form_table AS sw2 ON sp.spw_partner_ref_id = sw2.id 
    LEFT JOIN $service_list_table AS sl1 ON se.service_ref_id = sl1.id
    INNER JOIN $users_table AS ut1 ON se.inserted_by = ut1.id
    LEFT JOIN $users_table AS ut2 ON se.delete_recover_by = ut2.id
    WHERE 
    COALESCE(se.delete_recover_status,'') = 'deleted' AND (DATE(se.service_date) BETWEEN '$from' AND '$to')
    ORDER by se.id
  ";

  $pdo_res = executePDO($query);
  // print_rp($pdo_res);
  $arr = array();
  $i = 1;
  while($row = $pdo_res['data']->fetch()){
    $row['sw_name'] = $row['sw1_name'].(@$row['sw2_name'] ? ' & '.$row['sw2_name'] : '');
    $row['service_day'] = date('l',strtotime($row['service_date']));
    $row['service_date_formatted'] = date('d-m-Y',strtotime($row['service_date']));  
    $row['delete_date'] = dateFormat($row['inserted_date'],$row['inserted_time']);
    $row['last_delete_date'] = $row['updated_date'] ? dateFormat($row['updated_date'],$row['updated_time']) : dateFormat($row['inserted_date'],$row['inserted_time']);
    $row['last_delete_by'] = $row['updated_by'] ? $row['updated_by'] : $row['inserted_by'];
    $row['unique_recurring_id'] = str_replace(' ','',$row['id'].'-'.$row['service_date'].'-'.$row['service_start_time'].'-'.$row['service_start_time']);
    $row['service_plaining_ref_id'] = $row['id']; 
    unset($row['sw1_name'],$row['sw2_name'],$row['inserted_date'],$row['inserted_time'],$row['updated_date'],$row['updated_time']);
    $arr[] = $row;
    $i++;
  }//End while loop

  $arr = array_reverse($arr);
  echo json_encode(array('status' => true, 'data' => $arr));
?>