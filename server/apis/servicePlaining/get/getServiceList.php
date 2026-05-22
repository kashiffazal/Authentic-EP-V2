<?php
// $res = dbQuery("
//     SELECT
//     sp.*,
//     CONCAT(cl.first_name,' ',cl.last_name) AS client_name,
//     cl.street_address,
//     sr.name AS service_name,
//     CONCAT(spw2.first_name,' ',spw2.last_name) AS swp2_name,
//     sp.last_done
//     FROM $service_plaining_table AS sp
//     INNER JOIN $client_form_table AS cl ON sp.client_ref_id = cl.id
//     INNER JOIN $service_list_table AS sr ON sp.service_ref_id = sr.id
//     LEFT JOIN $support_worker_form_table AS spw2 ON sp.spw_partner_ref_id = spw2.id
//     INNER JOIN $users_table AS ut ON sp.inserted_by = ut.id
//     LEFT JOIN $users_table AS utu ON sp.updated_by = utu.id
//     WHERE (sp.spw_ref_id = '" . $_SESSION['link_id'] . "' OR sp.spw_partner_ref_id = '" . $_SESSION['link_id'] . "') AND sp.status = 'approve'
//     ORDER BY sp.id DESC
// 	");

// $pending = $res['data'];
// // print_r($pending);
// $today = array();

// foreach ($pending as $k => $v) {

//     #Get last done by current user (There can be 2 user, 1 main user and 2nd Partner)
//     $lastDone = explode("=>",$v['last_done']);
//     $lastDone = (isset($v['spw_partner_ref_id']) AND $v['spw_partner_ref_id'] != '' AND $v['spw_partner_ref_id'] == $_SESSION['link_id']) ? @$lastDone[1] : @$lastDone[0];
//     // echo $lastDone;


//     if ($v['frequency'] === 'On Client Request' and $v['service_date'] === date('d-m-Y') and $server_date !== $lastDone) {
//         $today[] = $v;
//         unset($pending[$k]);
//     } //End if condition
//     if ($v['frequency'] === 'Weekly' and $v['service_day'] === date('l') and $server_date !== $lastDone) {
//         $today[] = $v;
//         unset($pending[$k]);
//     } //End if condition
//     if ($v['frequency'] === 'Daily' and $server_date !== $lastDone) {
//         $today[] = $v;
//         unset($pending[$k]);
//     } //End if condition
//     if ($v['frequency'] === 'Fortnightly' and $v['service_day'] === date('l') and $server_date !== $lastDone) {
//         $dateList = currentFortnightDateListWithDay();
//         if (in_array(date('Y-m-d') . '-' . date('l'), $dateList)) {
//             $today[] = $v;
//             unset($pending[$k]);
//         } //End if condition
//     } //End if condition

//     #Remove todays done shifts, if it's available in pending list
//     if ($server_date == $lastDone) {unset($pending[$k]);} //End if condition

// } //End foreach

// $noServiceMsg = (sizeof($pending) === 0 and sizeof($today) === 0) ? array('title' => 'No Service yet!', 'msg' => 'Service is not assigned by your administrator.') : array();
include '../apis/servicePlaining/sp_functions.php';
$serviceData = separateServicesList();
include './settingJSON/get/getJSON.php';
$serviceData['appDefaultSetting'] = $devSettingJSON['shift'];

  #If timer is start of this current support worker then get Data from timer table and send to front-end
  // $runningServiceData = dbQuery("
  //   SELECT id,service_plaining_ref_id,start_time,timerData FROM $service_timing_table 
  //   WHERE 
  //   (spw_ref_id = '".$_SESSION['link_id']."' OR
  //   spw2_ref_id = '".$_SESSION['link_id']."') AND
  //   COALESCE(end_time, '') = '' AND
  //   COALESCE(timerData, '') != ''
  // ");
  // $service_plain_id = @$runningServiceData['data'][0]['service_plaining_ref_id'];
  // $start_time = @$runningServiceData['data'][0]['start_time'];
  // $timer_data = @$runningServiceData['data'][0]['timerData'];
  // // print_rp($stt);
  // // print_rp($server_time);
  // $server_time = timeDiff($start_time, $server_time, '%h:%i:%s');
  // $server_time = explode(':', $server_time);
  // $server_time = array('hour' => (int) $server_time[0], 'min' => (int) $server_time[1], 'sec' => (int) $server_time[2]);
  // $server_time = json_encode($server_time);
  

// $res = array(
//   'status' => true, 
//   'data' => $serviceData['data']
// );
// // print_rp($res);
echo json_encode($serviceData);