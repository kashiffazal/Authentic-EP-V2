<?php

$id = ($_GET['id'] AND $_GET['id'] !== '-') ? $_GET['id'] : false;


$res = array(
  'status' => true,
  'data' => array('appointment_no' => getNewAppointmentNumber()),
  'timeList' => timeList(),
  'clientList' => clientList()
);

if ($id) {
  $res['formValues'] = dbQuery("
    SELECT cat.*,cat.documents AS uploadedDocuments,sp.shift_no,sp.spw_ref_id,sp.spw_partner_ref_id
    FROM $client_appointment_table AS cat
    LEFT JOIN $service_plaining_table AS sp ON cat.service_plaining_ref_id = sp.id
    WHERE cat.id = '$id'
  ")['data'][0];
  $res['formValues']['filePath'] = $domainPath.'/files/uploads/appointmentDocuments/';

  //@If Shift is assigned on it
  if($res['formValues']['service_plaining_ref_id']){
    $res['supportWorkerList'] = supportWorkerList();
  }//End if condition
}//End if condition
echo json_encode($res);
?>