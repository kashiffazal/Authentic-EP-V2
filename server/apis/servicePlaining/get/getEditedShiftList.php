<?php
  $from = $_GET['from'];
  $to = $_GET['to'];

  $query = "
    SELECT 
    se.id AS shift_edit_ref_id,se.service_plaining_ref_id AS id,
    se.current_service_date AS service_date,
    se.current_start_time AS service_start_time,
    se.current_end_time AS service_end_time,
    se.service_date AS edited_service_date,
    se.service_start_time AS edited_service_start_time,
    se.service_end_time AS edited_service_end_time,
    se.service_ref_id,
    se.meal_break_min AS edited_meal_break_min, se.rest_break_min AS edited_rest_break_min,
    se.remarks AS edited_remarks,
    se.inserted_date, se.inserted_time,
    se.updated_date, se.updated_time,
    sp.meal_break_min, sp.rest_break_min,
    sp.shift_no,
    sp.remarks,
    sp.inserted_date AS sp_inserted_date,sp.inserted_time AS sp_inserted_time,
    sp.updated_date AS sp_updated_date,sp.updated_time AS sp_updated_time,
    CONCAT(uts1.first_name,' ',uts1.last_name) AS sp_inserted_by,
    CONCAT(uts2.first_name,' ',uts2.last_name) AS sp_updated_by,
    CONCAT(ut1.first_name,' ',ut1.last_name) AS inserted_by,
    CONCAT(ut2.first_name,' ',ut2.last_name) AS updated_by,
    CONCAT(sw1.first_name,' ',sw1.last_name) AS sw1_name,
    CONCAT(sw2.first_name,' ',sw2.last_name) AS sw2_name,
    sp.spw_ref_id, sp.spw_partner_ref_id,
    CONCAT(sl1.code,' ',sl1.name) AS edited_service_name,
    CONCAT(sl2.code,' ',sl2.name) AS service_name
    FROM $shift_edit_table AS se
    INNER JOIN $service_plaining_table AS sp ON se.service_plaining_ref_id = sp.id
    INNER JOIN $support_worker_form_table AS sw1 ON sp.spw_ref_id = sw1.id
    LEFT JOIN $support_worker_form_table AS sw2 ON sp.spw_partner_ref_id = sw2.id 
    LEFT JOIN $service_list_table AS sl1 ON se.service_ref_id = sl1.id
    INNER JOIN $service_list_table AS sl2 ON sp.service_ref_id = sl2.id
    INNER JOIN $users_table AS ut1 ON se.inserted_by = ut1.id
    LEFT JOIN $users_table AS ut2 ON se.updated_by = ut2.id
    INNER JOIN $users_table AS uts1 ON sp.inserted_by = uts1.id
    LEFT JOIN $users_table AS uts2 ON sp.updated_by = uts2.id
    WHERE 
    COALESCE(se.delete_recover_status,'') != 'deleted' AND 
    ((DATE(se.current_service_date) BETWEEN '$from' AND '$to') OR (DATE(se.service_date) BETWEEN '$from' AND '$to'))
    ORDER by se.id
  ";

  $pdo_res = executePDO($query);
  //print_rp($pdo_res);
  $arr = array();
  $i = 1;
  while($row = $pdo_res['data']->fetch()){
    $row['sw_name'] = $row['sw1_name'].(@$row['sw2_name'] ? ' & '.$row['sw2_name'] : '');
    $row['service_day'] = date('l',strtotime($row['service_date']));
    $row['service_date_formatted'] = date('d-m-Y',strtotime($row['service_date']));
    $row['edited_service_day'] = date('l',strtotime($row['edited_service_date']));
    $row['edited_service_date_formatted'] = date('d-m-Y',strtotime($row['edited_service_date']));
    
    $row['sp_inserted_date'] = dateFormat($row['sp_inserted_date'],$row['sp_inserted_time']);
    $row['sp_last_edit_date'] = $row['sp_updated_date'] ? dateFormat($row['sp_updated_date'],$row['sp_updated_time']) : dateFormat($row['sp_inserted_date'],$row['sp_inserted_time']);
    $row['sp_last_edit_by'] = $row['sp_updated_by'] ? $row['sp_updated_by'] : $row['sp_inserted_by'];

    
    $row['edit_date'] = dateFormat($row['inserted_date'],$row['inserted_time']);
    $row['last_edit_date'] = $row['updated_date'] ? dateFormat($row['updated_date'],$row['updated_time']) : dateFormat($row['inserted_date'],$row['inserted_time']);
    $row['last_edit_by'] = $row['updated_by'] ? $row['updated_by'] : $row['inserted_by'];
    $row['unique_recurring_id'] = str_replace(' ','',$row['id'].'-'.$row['service_date'].'-'.$row['service_start_time'].'-'.$row['service_start_time']);
    unset($row['sw1_name'],$row['sw2_name'],$row['inserted_date'],$row['inserted_time'],$row['updated_date'],$row['updated_time']);
    $arr[] = $row;
    $i++;
  }//End while loop

  $arr = array_reverse($arr);
  echo json_encode(array('status' => true, 'data' => $arr));
?>