<?php
    $query = "
        SELECT 
        cnt.id,cnt.date,cnt.client_ref_id,cnt.time,cnt.note,cnt.inserted_date,cnt.inserted_time,
        ct.first_name,ct.last_name
        FROM $client_progress_note_table AS cnt
        LEFT JOIN $client_form_table AS ct ON cnt.client_ref_id = ct.id
    ";

    if(@$_SESSION['link_id']){$query .= "WHERE cnt.inserted_by = '$session_user_id'";}

    $pdo_res = executePDO($query);
    //print_r($pdo_res);
    $arr = array();
    $i = 1;
    while($row = $pdo_res['data']->fetch()){
      $row['key'] = $i;
      $row['name'] = $row['first_name'].' '.$row['last_name'];
      $row['date'] = date('d-m-Y',strtotime($row['date']));
      $row['inserted_by_date'] = dateFormat($row['inserted_date'],$row['inserted_time']);
      unset($row['inserted_date']);
      unset($row['inserted_time']);
      $arr[] = $row;
      $i++;
    }//End while loop
    $res = array('status' => true, 'data' => array_reverse($arr), 'list' => array('timeList' => timeList(), 'clientList' => clientList()));
    echo json_encode($res);
?>