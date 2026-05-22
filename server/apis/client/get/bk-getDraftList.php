<?php

	$query = "
		SELECT 
		id,first_name,last_name,dateOfBirth,email,contactNumber,ndisNumber,suburb
		FROM $client_form_table
		WHERE COALESCE(draft_code, '') != ''
		ORDER BY id ASC 
	";

	$pdo_res = executePDO($query);
	$arr = array();
	$i = 1;
	while($row = $pdo_res['data']->fetch()){
		$row['name'] = $row['first_name'].' '.$row['last_name'];
        $row['dateOfBirth'] = $row['dateOfBirth'] ? $row['dateOfBirth'] : '-';
        $row['email'] = $row['email'] ? $row['email'] : '-';
        $row['contactNumber'] = $row['contactNumber'] ? $row['contactNumber'] : '-';
        $row['ndisNumber'] = $row['ndisNumber'] ? $row['ndisNumber'] : '-';
        $row['suburb'] = $row['suburb'] ? $row['suburb'] : '-';
		$row['key'] = $i;
		unset($row['first_name']);
		unset($row['last_name']);
		$arr[] = $row;
		$i++;
	}//End while loop	

    $res = array('status' => true, 'data' => $arr);
	echo json_encode($res);

?>