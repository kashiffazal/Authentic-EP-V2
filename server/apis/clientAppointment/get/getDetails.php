<?php
$query = "
        SELECT 
        cat.*,
        ct.first_name,ct.last_name,

        ut.first_name AS inserted_by_first_name,
        ut.last_name AS inserted_by_last_name,

        IFNULL(utu.first_name,'') AS updated_by_first_name,
        IFNULL(utu.last_name,'') AS updated_by_last_name,
        sp.shift_no

        FROM $client_appointment_table AS cat
        LEFT JOIN $client_form_table AS ct ON cat.client_ref_id = ct.id

        LEFT JOIN $service_plaining_table AS sp ON cat.service_plaining_ref_id = sp.id

        INNER JOIN $users_table AS ut ON cat.inserted_by = ut.id
        LEFT JOIN $users_table AS utu ON cat.updated_by = utu.id

        WHERE cat.id = '$value'
        ORDER BY cat.id DESC
    ";

$pdo_res = executePDO($query);
// print_rp($pdo_res);
while ($row = $pdo_res['data']->fetch()) {
	$row['name'] = $row['first_name'] . ' ' . $row['last_name'];
	$row['date'] = date('d-m-Y', strtotime($row['date']));
	$row['inserted_by'] = $row['inserted_by_first_name'] . ' ' . $row['inserted_by_last_name'];
	$row['inserted_by_date'] = dateFormat($row['inserted_date'], $row['inserted_time']);
	$row['updated_by'] = $row['updated_by_first_name'] ? $row['updated_by_first_name'] . ' ' . $row['updated_by_last_name'] : '';
	$row['updated_by_date'] = $row['updated_date'] ? dateFormat($row['updated_date'], $row['updated_time']) : '';

	//@Set Uploaded Document array 
	if ($row['documents']) {
		$doc = explode(',', $row['documents']);
		$docArr = array();
		foreach ($doc as $k => $vl) {
			$docArr[$k]['name'] = $vl;
			$docArr[$k]['link'] = $domainPath . '/files/uploads/appointmentDocuments/' . $vl;
		} //End foreach
		$row['documents'] = $docArr;
	} //End if condition

	unset($row['inserted_date']);
	unset($row['inserted_time']);
	unset($row['updated_time']);
	unset($row['updated_time']);
	$arr = $row;
} //End while loop
$res = array('status' => true, 'data' => $arr);
echo json_encode($res);
?>