<?php

if ($value === 'unattended') {
  include "../apis/servicePlaining/sp_functions.php"; //$adminEmailContent
  $res = getAfterSetUnattendedShifts();
} else {
  $query = "
      SELECT
      sp.id,
      sp.spw2_ref_id,
      sp.start_time_actual,
      sp.end_time_actual,
      IF(sp.start_time_mod != '', sp.start_time_mod, sp.start_time) as start_time,
      IF(sp.end_time_mod != '', sp.end_time_mod, sp.end_time) as end_time,
      sp.delayStatus,sp.status,
      sr.code,
      CONCAT(cl.first_name,' ',cl.last_name) AS client_name,
      CONCAT(spw.first_name,' ',spw.last_name) AS swp_name,
      sp.inserted_date,
      req.request_no,
      spt.shift_no
      FROM $service_timing_table AS sp
      INNER JOIN $client_form_table AS cl ON sp.client_ref_id = cl.id
      LEFT JOIN $support_worker_form_table AS spw ON sp.service_done_by_spw_ref_id = spw.id
      INNER JOIN $service_list_table AS sr ON sp.service_ref_id = sr.id
      LEFT JOIN $service_plaining_rr_table AS req ON sp.request_id = req.id
      INNER JOIN $service_plaining_table AS spt ON sp.service_plaining_ref_id = spt.id
      WHERE sp.status = '$value'
      ORDER BY sp.id ASC
    ";
  // CONCAT(spw2.first_name,' ',spw2.last_name) AS swp2_name,
  // INNER JOIN $support_worker_form_table AS spw1 ON sp.spw_ref_id = spw1.id
  // LEFT JOIN $support_worker_form_table AS spw2 ON sp.spw2_ref_id = spw2.id
  // service_done_by_spw_ref_id

  // sr.name AS service_name,
  //INNER JOIN $service_list_table AS sr ON sp.service_ref_id = sr.id

  $pdo_res = executePDO($query);
  $arr = array();
  $i = 1;
  while ($row = $pdo_res['data']->fetch()) {
    $row['key'] = $i;
    $row['inserted_date'] = date('d-m-Y', strtotime($row['inserted_date']));
    $row['swp_name'] = $row['swp_name'] . ' - (' . $row['code'] . ')' . ($row['spw2_ref_id'] ? ' - Partner ' : '');
    $row['request_no'] = $row['request_no'] ? $row['request_no'] : '-';
    // $row['swp_name'] = $row['swp1_name'].($row['swp2_name'] ? ', '.$row['swp2_name'] : '');
    $row['hour_actual'] = timeDiff($row['start_time_actual'], $row['end_time_actual'], '%h:%i');
    $row['hour'] = timeDiff($row['start_time'], $row['end_time']);
    // $row['late'] = timeDiff($row['start_time_actual'],$row['start_time']);
    // unset($row['swp1_name']);
    // unset($row['swp2_name']);
    $arr[] = $row;
    $i++;
  } //End while loop

  $res = array('status' => true, 'data' => array_reverse($arr));
} //End if condition

//@Set Status
$res['statusList'] = array(
  'unreviewed' => array( 'name' => 'Unreviewed', 'icon' => $statusDataGlobal['unapproved']['icon'], 'mobileIcon' =>  $statusDataGlobal['unapproved']['mobileIcon'], 'color' => $statusDataGlobal['unapproved']['color']),
  'reviewed' => array('name' => 'Reviewed', 'icon' => $statusDataGlobal['approved']['icon'], 'mobileIcon' =>  $statusDataGlobal['approved']['mobileIcon'], 'color' => $statusDataGlobal['approved']['color'] ),
  'unattended' => array('name' => 'Unattended', 'icon' => $statusDataGlobal['pending']['icon'], 'mobileIcon' =>  $statusDataGlobal['pending']['mobileIcon'], 'color' => $statusDataGlobal['pending']['color']),
  'deleted' =>  array('name' => 'Deleted', 'icon' => $statusDataGlobal['deleted']['icon'], 'mobileIcon' =>  $statusDataGlobal['deleted']['mobileIcon'], 'color' => $statusDataGlobal['deleted']['color'] )
);


include './settingJSON/get/getJSON.php';
$res['appDefaultSetting'] = $devSettingJSON['formSetting']['servicePlainingTimerLog'];
$res['timingList'] = timeList();

echo json_encode($res);