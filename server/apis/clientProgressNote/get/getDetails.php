<?php
    $query = "
        SELECT 
        cnt.*,
        ct.first_name,ct.last_name,

        ut.first_name AS inserted_by_first_name,
        ut.last_name AS inserted_by_last_name,

        IFNULL(utu.first_name,'') AS updated_by_first_name,
        IFNULL(utu.last_name,'') AS updated_by_last_name

        FROM $client_progress_note_table AS cnt
        LEFT JOIN $client_form_table AS ct ON cnt.client_ref_id = ct.id

        INNER JOIN $users_table AS ut ON cnt.inserted_by = ut.id
        LEFT JOIN $users_table AS utu ON cnt.updated_by = utu.id

        WHERE cnt.id = '$value'
        ORDER BY cnt.id DESC
    ";

    $pdo_res = executePDO($query);
    while($row = $pdo_res['data']->fetch()){
        $row['name'] = $row['first_name'].' '.$row['last_name'];
        $row['date'] = date('d-m-Y',strtotime($row['date']));
        $row['inserted_by'] = $row['inserted_by_first_name'].' '.$row['inserted_by_last_name'];
        $row['inserted_by_date'] = dateFormat($row['inserted_date'],$row['inserted_time']);
        $row['updated_by'] = $row['updated_by_first_name'] ? $row['updated_by_first_name'].' '.$row['updated_by_last_name'] : '';
        $row['updated_by_date'] = $row['updated_date'] ? dateFormat($row['updated_date'],$row['updated_time']) : '';
        unset($row['inserted_date']);
        unset($row['inserted_time']);
        unset($row['updated_time']);
        unset($row['updated_time']);
        $arr = $row;
    }//End while loop
    $res = array('status' => true, 'data' => $arr );
    echo json_encode($res);
?>