<?php

if (@$_GET['id'] and $_GET['id'] != '-') {$id = $_GET['id'];}

$data = dbQuery("SELECT id,fortnightStartDate,fortnightEndDate,json,status FROM $timesheet_staff_table WHERE id = '$id'");
$data = $data['data'][0];

$res['data']['fortnightDate'] = array($data['fortnightStartDate'], $data['fortnightEndDate'], date('jS M Y', strtotime($data['fortnightStartDate'])), date('jS M Y', strtotime($data['fortnightEndDate'])));

// unset($json['th']);
$res['data']['data'] = empTimesheetJsonDataSet($data['json'],$data['id']);
unset($data['key']);
$res['data']['adminSignImg'] = $domainPath.'/files/documents/signatures/staff/'.$data['id'].'-a.png?k='.rand();
$res['data']['status'] = $data['status'];

// print_rp($res);
$res['status'] = true;
echo json_encode($res);
