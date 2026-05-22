<?php

	$query = "
		SELECT 
		id,fortnightStartDate,fortnightEndDate,th,inserted_date,inserted_time,updated_date,updated_time
		FROM $timesheet_employee_table
		WHERE status = 'draft' AND inserted_by = '$session_user_id'
		ORDER BY id DESC 
	";

	include './timesheetStaff/get/partial.php';

	#Get Unapproved Count
	$unap = dbQuery("SELECT COUNT(id) AS unaCount FROM $timesheet_employee_table WHERE status = 'unapproved'");
	$unap = $unap['data'][0]['unaCount'];

	#Get Approved Count
	$apro = dbQuery("SELECT COUNT(id) AS aprCount FROM $timesheet_employee_table WHERE status = 'approved'");
	$apro = $apro['data'][0]['aprCount'];

    $res = array('status' => true, 'data' => $arr, 'unapCount' => $unap, 'aproCount' => $apro);
	echo json_encode($res);

?>