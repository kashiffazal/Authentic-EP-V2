<?php

include '../apis/servicePlaining/sp_functions.php';
$res = array('status' => true, 'data' => array());
$res['data']['services'] = separateServicesList()['data'];

$data = dbQuery("SELECT days_availibility_json FROM $support_worker_form_table WHERE id = '".$_SESSION['link_id']."'");
$data = @$data['data'][0]['days_availibility_json'];
$data = $data ? json_decode($data,true) : array();
if(!@$data['day']){
  $data = array('from' => array(), 'to' => array(), 'not_available' => array(), 'day' => array());
  for ($i=0; $i < 7; $i++) { 
    $data['from'][$i+1] = '';
    $data['to'][$i+1] = '';
    $data['not_available'][$i+1] = '';
    $data['day'][$i+1] = '';
  }//End for loop
}//End if condition
$res['data']['availability'] = $data;




echo json_encode($res);
