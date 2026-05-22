<?php
  $requestData = dbQuery("
    SELECT spr.*, CONCAT(spw.first_name,' ',spw.last_name) AS requested_by_name
    FROM $service_plaining_rr_table AS spr 
    LEFT JOIN $support_worker_form_table AS spw ON spr.requested_by = spw.id
    WHERE spr.id = '$value'
  ",array('dateFormat' => array('req_for_date','d-m-Y')))['data'][0];
  // print_rp($requestData);
  $shiftDetails = getServicePlainingViewDetails($requestData['service_plaining_ref_id'])['data'];
  $totalHour = differenceInHours($shiftDetails['service_start_time'],$shiftDetails['service_end_time'],true,'%h:%i');

  #If replaced SPW is available in DB then get data to update it
  $formUpdateData = @dbQuery("SELECT * FROM $service_plaining_rspw_table WHERE request_table_ref_id = '".$requestData['id']."'")['data'][0];
  if(@$formUpdateData['status']){
    #If Partner is replaced then set MAIN SP from shift data to view in Form
    if(!@$formUpdateData['spw_ref_id']){$formUpdateData['spw_ref_id'] = $shiftDetails['spw_ref_id'];}
    #If Main SP is replaced then set partner from shift data to view in Form
    if(!@$formUpdateData['spw_partner_ref_id']){$formUpdateData['spw_partner_ref_id'] = $shiftDetails['spw_partner_ref_id'];}
    $totalHour = differenceInHours(@$formUpdateData['service_start_time'],@$formUpdateData['service_end_time'],true,'%h:%i');
  }//End if condition

  $data = array(
    'requestData' => $requestData,
    'shiftDetails' => $shiftDetails,
    'formUpdateData' => @$formUpdateData,
    'dayAvailability' => getAvailability($shiftDetails['spw_ref_id'],$shiftDetails['spw_partner_ref_id'])['data'],
    'supportWorkerList' => supportWorkerList(),
    'timeListArr' => timeList(),
    'totalHour' => $totalHour
  );
  $res = array('status' => true, 'data' => $data);
  echo json_encode($res);
?>