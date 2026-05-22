<?php

$fortnightDates = currentFortnightDateListWithDay('Y-m-d', true);
// $_GET['from'] = '2022-07-25';
// $_GET['to'] = '2022-08-07';
// $from = @$_GET['from'] ? $_GET['from'] : date('Y-m-01');
// $to = @$_GET['to'] ? $_GET['to'] : date('Y-m-d',strtotime('+1 month',strtotime($from)));
$from = $fortnightDates[0][0];
$to = $fortnightDates[sizeof($fortnightDates) - 1][0];
// $fromServiceDate = $from;
// $toServiceDate = $to;

include '../apis/serviceSchedule/sch_functions.php';

//@ Get Support Worker =================================================================*/
$query = "
    SELECT 
    spw.id,CONCAT(spw.first_name,' ',spw.last_name) AS name,spw.days_availibility_json, spw.updated_date,spw.inserted_date,
    ut.id AS user_table_id,CONCAT(ut.first_name,' ',ut.last_name) AS profileName,ut.profileImage,ut.username,ut.password,ut.contact_number,ut.email,ut.current_login,ut.last_login,ut.second_last_login,ut.slug_color,
    ur.role
    FROM $support_worker_form_table AS spw 
    LEFT JOIN $users_table AS ut ON spw.id = ut.link_id 
    LEFT JOIN $users_role_table AS ur ON ut.role = ur.id
    WHERE spw.status = '5' AND COALESCE(spw.draft_code, '') = '' 
    ORDER BY name ASC ";
$spwData = dbQuery($query)['data'];
$spwIds = array();
foreach ($spwData as $k => $v) {
  $spwIds[] = $v['id'];
} //End foreach
/*====================================================================================*/
// print_rp($spwData);die();

//@ Get all service shift by SPW or Partners
include "../apis/serviceSchedule/includes/getShifts.php"; //print_rp($spData);//print_rp($serviceDataBySPW);//print_rp($shiftIds);

// $k = serviceListRecurring($serviceDataBySPW['109'],1,'Y-m-d',$from,$to);
// print_rp($k);
// die();

//@ Set SPW data and Merge service data as recurring shifts
$shiftArray = array();
foreach ($spwData as $k => $v) {
  $v['nameSlug'] = name_slug($v['name']);
  $v['profileImage'] = $v['profileImage'] ? $domainPath . '/files/uploads/user_profiles/' . $v['profileImage'] . '?k=' . rand() : '';
  $v['detailedPDF'] = $domainPath . '/files/documents/supportWorker/forms/' . $v['id'] . "-" . ($v['updated_date'] ? $v['updated_date'] : $v['inserted_date']) . '.pdf?k=' . rand();
  #Set Date Format
  $v['current_login'] = $v['current_login'] ? date('d-m-Y h:m:i A', strtotime($v['current_login'])) : '';
  $v['last_login'] = $v['last_login'] ? date('d-m-Y h:m:i A', strtotime($v['last_login'])) : '';
  $v['second_last_login'] = $v['second_last_login'] ? date('d-m-Y h:m:i A', strtotime($v['second_last_login'])) : '';
  #Get available Days for service
  $v['days_availibility_json'] = $v['days_availibility_json'] ? json_decode($v['days_availibility_json'], true) : array();
  $v['availableDays'] = (7 - @count(@array_filter(
      @$v['days_availibility_json']['not_available'] ? @$v['days_availibility_json']['not_available'] : array()
    ))) . ' Day(s) in a Week'; #Count true and less from 7 days (true means not available)  
  $v['totalShifts'] = 0;
  // $v['shifts'] = @$serviceDataBySPW[$v['id']] ? serviceListRecurring($serviceDataBySPW[$v['id']],1,'Y-m-d',$from,$to) : array();

  $v['shifts'] = array();
  if (@$serviceDataBySPW[$v['id']]) {
    $shiftArray = array_merge($shiftArray, serviceListRecurring($v['id'], $serviceDataBySPW[$v['id']], 1, 'Y-m-d', $from,$to,28));
  }//End if condition

  $spwData[$k] = $v;
} //End function

//@ Add unique recurring shift id ===========//
$shiftArray = shiftArrayUniqueRecurringId($shiftArray); //unique_recurring_id
// print_rp($shiftArray);die();


//@ Get Replacement Requested Shifts and update requested as true
$shiftArray = filterRequestedForReplacementShift($shiftArray, $shiftIds);



//@ Get SW individual Shift count
foreach ($shiftArray as $shk => $singleShift) {
  foreach ($spwData as $swk => $sw) {
    if ($singleShift['mainSPWId'] === $sw['id'] AND dateOrTimeCprBet('date', $singleShift['service_date'], array($from, $to))) {
      $spwData[$swk]['totalShifts'] = $spwData[$swk]['totalShifts'] + 1;
      break;
    }//End if condition  
  }//End foreach
}//End foreach

//@ Set Hour List
$hourList = array('12 AM');
for ($i = 0; $i < 23; $i++) {
  $hourList[$i + 1] = date('h A', strtotime($hourList[$i] . ' +1 hour'));
} //End for loop

//@ Advance Filter Operators
$conditionOperator = array(
  array('label' => 'AND', 'value' => 'AND'),
  array('label' => 'OR', 'value' => 'OR'),
);
$logicalOperator = array(
  '1' => array(
    array('label' => 'Equal To', 'value' => '='),
    array('label' => 'Not Equal To', 'value' => '!='),
  ),
  '2' => array(
    array('label' => 'Equal To', 'value' => '==='),
    array('label' => 'Not Equal To', 'value' => '!==='),
    array('label' => 'Greater Than', 'value' => '>'),
    array('label' => 'Greater Than OR Equal To', 'value' => '>='),
    array('label' => 'Less Than', 'value' => '<'),
    array('label' => 'Less Than OR Equal To', 'value' => '<='),
  )
);

$data = array(
  'spwList' => $spwData,
  'shiftArray' => $shiftArray,
  'shiftByFrequency' => $shiftByFrequency,
  'spwIds' => $spwIds,
  'settingData' => array(
    'fortnightList' => fortnightList(30, 30),
    'shiftFilters' => array(
      array('label' => 'Shift No', 'value' => 'shift_no', 'mode' => 'select', 'options' => $shiftNoForFilterArr, 'operatorIndex' => '1'),
      array('label' => 'Client Name', 'value' => 'client_name', 'mode' => 'select', 'options' => $clientNameForFilterArr, 'operatorIndex' => '1'),
      array('label' => 'Frequency', 'value' => 'frequency_name', 'mode' => 'select', 'options' => $frequencyNameForFilterArr, 'operatorIndex' => '1'),
      array('label' => 'Shift Date', 'value' => 'service_date_formatted', 'mode' => 'date', 'operatorIndex' => '2'),
      array('label' => 'Shift Day', 'value' => 'service_day', 'mode' => 'select', 'options' => $serviceDayForFilterArr, 'operatorIndex' => '1'),
      array('label' => 'Shift Start Time', 'value' => 'service_start_time', 'mode' => 'time', 'operatorIndex' => '2'),
      array('label' => 'Shift End Time', 'value' => 'service_end_time', 'mode' => 'time', 'operatorIndex' => '2'),
      array('label' => 'Inserted Date', 'value' => 'inserted_date', 'mode' => 'date', 'operatorIndex' => '2')
    ),
    'filterOptions' => array(
      'conditionOperator' => $conditionOperator,
      'logicalOperator' => $logicalOperator
    )
  ),
  'gridData' => array(
    'cols' => $fortnightDates,
    'hourList' => $hourList,
  )
);
// print_rp($data['shiftArray']);die();
echo json_encode(array('status' => true, 'data' => $data));
?>