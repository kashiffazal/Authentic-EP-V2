<?php
    $query = "
        SELECT jt.*, dt.name AS timing,
        ut.first_name AS inserted_by_first_name,
        ut.last_name AS inserted_by_last_name,
        IFNULL(utu.first_name,'') AS updated_by_first_name,
        IFNULL(utu.last_name,'') AS updated_by_last_name,
        COUNT(swt.id) AS job_count
        FROM $job_table AS jt
        INNER JOIN $dropdown_table AS dt ON jt.timing_ref_id = dt.id
        INNER JOIN $users_table AS ut ON jt.inserted_by = ut.id
        LEFT JOIN $users_table AS utu ON jt.updated_by = utu.id
        LEFT JOIN $support_worker_form_table AS swt ON jt.id = swt.job_ref_id AND swt.draft_code = ''
        GROUP BY jt.id
    ";

    $pdo_res = executePDO($query);
    $arr = array();
    $i = 1;
    while($row = $pdo_res['data']->fetch()){
      $row['key'] = $i;
      $row['inserted_by'] = $row['inserted_by_first_name'].' '.$row['inserted_by_last_name'];
      $row['inserted_by_date'] = dateFormat($row['inserted_date'],$row['inserted_time']);
      $row['updated_by'] = $row['updated_by_first_name'] ? $row['updated_by_first_name'].' '.$row['updated_by_last_name'] : '';
      $row['updated_by_date'] = $row['updated_date'] ? dateFormat($row['updated_date'],$row['updated_time']) : '';
      unset($row['inserted_by_first_name']);
      unset($row['inserted_by_last_name']);
      unset($row['inserted_date']);
      unset($row['inserted_time']);
      unset($row['updated_by_first_name']);
      unset($row['updated_by_last_name']);
      unset($row['updated_date']);
      unset($row['updated_time']);
      $arr[] = $row;
      $i++;
    }//End while loop
    $res = array('status' => true, 'data' => array_reverse($arr));
    $res['timeList'] = getDropdownByListName('job_time_list');
    $res['timeList'] = $res['timeList']['job_time_list'];
    
    //@ Set Status List just for Mobile Table
    $res['statusList'] = array(
      'active' => array( 'name' => 'Active', 'icon' => $statusDataGlobal['approved']['icon'], 'mobileIcon' =>  $statusDataGlobal['approved']['mobileIcon'], 'color' => $statusDataGlobal['approved']['color']),
      'close' => array('name' => 'Close', 'icon' => $statusDataGlobal['deleted']['icon'], 'mobileIcon' =>  $statusDataGlobal['deleted']['mobileIcon'], 'color' => $statusDataGlobal['deleted']['color'] )
    );   
    
    echo json_encode($res);
?>