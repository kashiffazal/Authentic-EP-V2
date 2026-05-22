<?php

	$query = "SELECT id,first_name,last_name,mobile,email,skypeId,inserted_date,updated_date FROM $support_worker_form_table WHERE job_ref_id = '$value' ORDER BY updated_date ASC, id ASC";

	$pdo_res = executePDO($query);
    $arr = array();
    $i = 1;
	while($row = $pdo_res['data']->fetch()){
		$row['name'] = $row['first_name'].' '.$row['last_name'];
		$row['name'] = ($row['name'] AND $row['name'] !== ' ') ? $row['name'] : '-';
		$row['mobile'] = $row['mobile'] ? $row['mobile'] : '-';
		$row['email'] = $row['email'] ? $row['email'] : '-';
		$row['skypeId'] = $row['skypeId'] ? $row['skypeId'] : '-';
		$row['pdf_path'] = $domainPath.'/files/documents/supportWorker/forms/'.$row['id']."-".($row['updated_date'] ? $row['updated_date'] : $row['inserted_date']).'.pdf?k='.rand();
        $row['key'] = $i;
        unset($row['first_name']);
		unset($row['last_name']);
        $arr[] = $row;
        $i++;
    }//End while loop	
	
	$res = array(
		'status' => true, 
		'data' => array_reverse($arr)
	);

	echo json_encode($res);

?>