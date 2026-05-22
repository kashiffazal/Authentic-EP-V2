<?php
	include "./timesheetStaff/function.php";
	$res = getTimeSheetList('approved');
	echo json_encode($res);
?>