<?php
function serviceListRecurring($spwId, $shiftData, $monthExtend = 1, $serviceDateFormat = 'd-m-Y', $from, $to, $scaleInDays = false)
{
  global $server_date, $shift_edit_table;

  //! Set From and To date with scale in days if available
  $actualFromDate = $from;
  $actualToDate = $to;
  if ($scaleInDays) {
    $from = date('Y-m-d', strtotime("-$scaleInDays days", strtotime($from)));
    $to = date('Y-m-d', strtotime("+$scaleInDays days", strtotime($to)));
  } //End if condition

  $allShifts = $shiftData;
  $newRecurringServices = array();
  foreach ($allShifts as $k => $st) {
    $st['mainSPWId'] = $spwId;
    $st['inserted_date_formatted'] = date('d-m-Y', strtotime($st['inserted_date']));
    $currentFortnight = dateOrTimeCprBet('date', $st['service_from_date'], array($actualFromDate, $actualToDate));
    $notPreviousDate = ($currentFortnight or dateOrTimeCpr('date', $st['service_from_date'], '<=', $actualFromDate));

    if ($st['frequency'] === '6' and $notPreviousDate) { //@ Weekly
      /////////////////////////////////////////////////////////////////////////
      $st['service_date'] = date($serviceDateFormat, strtotime('next ' . $st['service_day'], strtotime($currentFortnight ? $st['service_from_date'] : $from)));
      $st['service_date'] = date($serviceDateFormat, strtotime('-2 week', strtotime($st['service_date'])));
      $count = ($monthExtend * 10);
      for ($i = 0; $i < $count; $i++) { //Add three weeks more one by one
        $st['service_date'] = date($serviceDateFormat, strtotime('+1 week', strtotime($st['service_date'])));
        $st['service_date_formatted'] = date('d-m-Y', strtotime($st['service_date']));
        $betweenFromAndToDate = dateOrTimeCprBet('date', $st['service_date'], array($from, $to));
        $betweenInShiftRange = dateOrTimeCprBet('date', $st['service_date'], array($st['service_from_date'], $st['service_to_date']));
        if (
          (($st['service_recurring_type'] === '11' and ($betweenFromAndToDate and $betweenInShiftRange)) or
            ($st['service_recurring_type'] === '10' and $betweenFromAndToDate)) and
          dateOrTimeCpr('date', $st['service_date'], '>=', $st['service_from_date'])
        ) {
          $newRecurringServices[] = $st;
        } //End if condition
      } //End for loop
      /////////////////////////////////////////////////////////////////////////
    } //End if condition
    if ($st['frequency'] === '8' and $notPreviousDate) { //@ Daily
      /////////////////////////////////////////////////////////////////////////
      $st['service_date'] = date($serviceDateFormat, strtotime('+1 day', strtotime($currentFortnight ? $st['service_from_date'] : $from)));
      $st['service_date'] = date($serviceDateFormat, strtotime('-2 days', strtotime($st['service_date'])));
      $count = ($monthExtend * 60);
      for ($i = 0; $i < $count; $i++) {
        $st['service_date'] = date($serviceDateFormat, strtotime('+1 day', strtotime($st['service_date'])));
        $st['service_date_formatted'] = date('d-m-Y', strtotime($st['service_date']));
        $betweenFromAndToDate = dateOrTimeCprBet('date', $st['service_date'], array($from, $to));
        $betweenInShiftRange = dateOrTimeCprBet('date', $st['service_date'], array($st['service_from_date'], $st['service_to_date']));
        if (
          (($st['service_recurring_type'] === '11' and ($betweenFromAndToDate and $betweenInShiftRange)) or
            ($st['service_recurring_type'] === '10' and $betweenFromAndToDate)) and
          dateOrTimeCpr('date', $st['service_date'], '>=', $st['service_from_date'])
        ) {
          $newRecurringServices[] = $st;
        } //End if condition
      } //End for loop
      /////////////////////////////////////////////////////////////////////////
    } //End if condition
    if ($st['frequency'] === '5' and $notPreviousDate) { //@ Fortnightly
      /////////////////////////////////////////////////////////////////////////       
      if ($currentFortnight) {
        $st['service_date'] = serviceMissingDateOrDayByFrequencyOrNext('', $st['service_day'], $st['frequency'], $st['frequencyWeek'])['service_date'];
      } else {
        $fortnightDates = getCurrentFortnightDates($from);
        $day = date('l', strtotime($fortnightDates[0]));
        if ($st['frequencyWeek'] === '1') {
          $nexDay = date($serviceDateFormat, strtotime('next ' . $st['service_day'], strtotime($fortnightDates[0])));
          $st['service_date'] = ($day === $st['service_day']) ? $fortnightDates[0] : $nexDay;
        } //End if condition
        if ($st['frequencyWeek'] === '2') {
          $st['service_date'] = date($serviceDateFormat, strtotime((($day === $st['service_day']) ? 'next ' : 'second ') . $st['service_day'], strtotime($fortnightDates[0])));
        } //End if condition
      } //End if condition
      $st['service_date'] = date($serviceDateFormat, strtotime('-14 days', strtotime($st['service_date'])));
      $count = ($monthExtend * 5);
      for ($i = 0; $i < $count; $i++) {
        $st['service_date'] = date($serviceDateFormat, strtotime('+2 week', strtotime($st['service_date'])));
        $st['service_date_formatted'] = date('d-m-Y', strtotime($st['service_date']));
        $betweenFromAndToDate = dateOrTimeCprBet('date', $st['service_date'], array($from, $to));
        $betweenInShiftRange = dateOrTimeCprBet('date', $st['service_date'], array($st['service_from_date'], $st['service_to_date']));
        if (
          (($st['service_recurring_type'] === '11' and ($betweenFromAndToDate and $betweenInShiftRange)) or
            ($st['service_recurring_type'] === '10' and $betweenFromAndToDate)) and
          dateOrTimeCpr('date', $st['service_date'], '>=', $st['service_from_date'])
        ) {
          $newRecurringServices[] = $st;
        } //End if condition
      } //End for loop
      /////////////////////////////////////////////////////////////////////////
    } //End if condition
    if ($st['frequency'] === '7') { //Monthly
      ///////////////////////////////////////////////////////////////////////
      $st['service_date'] = date($serviceDateFormat, strtotime('+1 month', strtotime($currentMonth ? $st['inserted_date'] : $from)));
      $st['service_date'] = date($serviceDateFormat, strtotime('-1 month', strtotime($st['service_date'])));
      $count = ($monthExtend * 1);
      for ($i = 0; $i < $count; $i++) {
        $st['service_date'] = date($serviceDateFormat, strtotime('+1 month', strtotime($st['service_date'])));
        if (dateOrTimeCprBet('date', $st['service_date'], array($from, $to))) {
          $newRecurringServices[] = $st;
        } //End if condition
      } //End for loop
      ///////////////////////////////////////////////////////////////////////
    } //End if condition
    if ($st['frequency'] === '9' or $st['frequency'] === '12') { //@ On Client request/Appointment
      $st['service_day'] = serviceMissingDateOrDayByFrequencyOrNext($st['service_date'], '', $st['frequency'], '')['service_day'];
      $st['service_date'] = date($serviceDateFormat, strtotime($st['service_date']));
      $st['service_date_formatted'] = date('d-m-Y', strtotime($st['service_date']));
      if (dateOrTimeCprBet('date', $st['service_date'], array($from, $to))) {
        $newRecurringServices[] = $st;
      } //End if condition
    } //End if condition
  } //End foreach

  // $res = array_merge($allShifts,$newRecurringServices);
  $res = $newRecurringServices;
  usort($res, function ($a, $b) {
    return new DateTime($a['service_date']) <=> new DateTime($b['service_date']);
  });


  // echo $actualFromDate.' = '.$from.' = '.$to;
  //Getting Edited Shifts and marge with current
  // echo "SELECT * FROM $shift_edit_table WHERE (DATE(service_date) >= '$from' AND DATE(service_date) <= '$to') AND status = 'active'";
  $sd = dbQuery("SELECT * FROM $shift_edit_table WHERE (DATE(service_date) >= '$from' AND DATE(service_date) <= '$to') AND status = 'active'")['data'];
  // print_rp($sd);
  $arr = array();
  foreach ($res as $k => $v) {
    $v['shift_no_schedule'] = $v['shift_no'] . '-' . $st['mainSPWId'] . '-' . ($k + 1);
    foreach ($sd as $s) {
      if (
        $s['service_plaining_ref_id'] === $v['id'] and
        $s['current_service_date'] === $v['service_date'] and
        $s['current_start_time'] === $v['service_start_time'] and
        $s['current_end_time'] === $v['service_end_time']
      ) {
        $v['service_ref_id'] = $s['service_ref_id'];
        $v['service_date'] = $s['service_date'];
        $v['service_start_time'] = $s['service_start_time'];
        $v['service_end_time'] = $s['service_end_time'];
        $v['meal_break_min'] = $s['meal_break_min'];
        $v['rest_break_min'] = $s['rest_break_min'];
        $v['remarks'] = $s['remarks'];
        $v['shift_edit_ref_id'] = $s['id'];
        $v['delete_recover_status'] = $s['delete_recover_status'];
      } //End if condition
    } //End foreach
    $arr[] = $v;
  } //End foreach
  $res = $arr;

  // print_rp($res);
  // die();
  return $res;
} //End function

function shiftArrayUniqueRecurringId($shiftArray)
{
  $tempShiftArr = array();
  // $uniqueRecurringId = 1;
  foreach ($shiftArray as $v) {
    $v['unique_recurring_id'] = str_replace(' ', '', $v['id'] . '-' . $v['service_date'] . '-' . $v['service_start_time'] . '-' . $v['service_start_time']) . '-' . $v['mainSPWId'];
    $tempShiftArr[] = $v;
    // $uniqueRecurringId++;
  } //End foreach
  return $tempShiftArr;
} //End function

function filterRequestedForReplacementShift($shiftArray, $shiftIds)
{
  global $service_plaining_rr_table, $service_plaining_rspw_table;
  //Get Replacement Requested Shifts
  if (sizeof($shiftIds) > 0) { //@ Because Empty array give query error in db syntax
    $requested = dbQuery("SELECT id AS replacement_id,service_plaining_ref_id,req_for_date,requested_by,status AS req_status FROM $service_plaining_rr_table WHERE service_plaining_ref_id IN (" . implode(',', $shiftIds) . ") AND (status = 'requested' OR status = 'replaced')")['data'];
  } else {
    $requested = array();
  } //End if condition
  // print_rp($requested);
  //Get replacement IDs
  $replacementId = array();
  $replacedData = array();
  foreach ($requested as $k => $v) {
    if ($v['req_status'] === 'replaced') {
      $replacementId[] = $v['replacement_id'];
    }
  } //End foreach
  // print_rp($replacementId);
  //Get replaced spw
  if (sizeof($replacementId) > 0) {
    $replacedData = dbQuery("SELECT id AS replaced_spw_table_id,spw_ref_id,spw_partner_ref_id,service_start_time,service_end_time,meal_break_min,rest_break_min,remarks,request_table_ref_id FROM $service_plaining_rspw_table WHERE request_table_ref_id IN (" . implode(',', $replacementId) . ")", array('indexAsId' => 'request_table_ref_id'))['data'];
  } //End if condition
  // print_rp($replacedData);
  // print_rp($replacementId); 

  //Update requested shift in '$shiftArray'
  foreach ($shiftArray as $sk => $sv) {
    foreach ($requested as $k => $v) {
      if ($sv['id'] === $v['service_plaining_ref_id'] and $sv['service_date'] === date('Y-m-d', strtotime($v['req_for_date'])) AND $sv['mainSPWId'] === $v['requested_by']) {
        $sv['request_id'] = $v['replacement_id'];
        if ($v['req_status'] === 'requested') {
          $sv['requested'] = true;
        } //End if condition
        if ($v['req_status'] === 'replaced') {
          $sv['replaced'] = true;
          $sv['replaced_spw_table_id'] = $replacedData[$v['replacement_id']]['replaced_spw_table_id'];
          $sv['spw_ref_id'] = $replacedData[$v['replacement_id']]['spw_ref_id'];
          $sv['spw_partner_ref_id'] = $replacedData[$v['replacement_id']]['spw_partner_ref_id'];
          $sv['mainSPWId'] = $sv['spw_ref_id'] ? $sv['spw_ref_id'] : $sv['spw_partner_ref_id'];
          $sv['service_start_time'] = $replacedData[$v['replacement_id']]['service_start_time'];
          $sv['service_end_time'] = $replacedData[$v['replacement_id']]['service_end_time'];
        } //End if condition
        $shiftArray[$sk] = $sv;
      } //End if condition
    } //End foreach
  } //End foreach
  return $shiftArray;
} //End function

function checkRecurringShiftBetweenSelectedTime($data)
{
  global $service_plaining_table, $dropdown_table, $client_form_table, $support_worker_form_table;
  // print_rp($data['service_plaining_ref_id']);
  // $shiftArray = array();
  $spwIds = $data['spw_ref_id'];
  $spData = dbQuery("
      SELECT 
      sp.id,sp.shift_no,sp.spw_ref_id,sp.spw_partner_ref_id,sp.client_ref_id,sp.frequency,sp.frequencyWeek,sp.service_date,sp.service_day,sp.service_start_time,sp.service_end_time,sp.service_recurring_type,sp.service_from_date,sp.service_to_date,sp.inserted_date,sp.inserted_time,sp.status,
      dr.id AS frequency_id,dr.name AS frequency_name,dr.abbr AS frequency_abbr,
      cl.id AS client_id,CONCAT(cl.first_name,' ',cl.last_name) AS client_name,
      CONCAT(spw.first_name,' ',spw.last_name) AS spw_name,
      CONCAT(spw2.first_name,' ',spw2.last_name) AS spw2_name
      FROM $service_plaining_table AS sp
      INNER JOIN $dropdown_table AS dr ON sp.frequency = dr.id
      INNER JOIN $client_form_table AS cl ON sp.client_ref_id = cl.id
      INNER JOIN $support_worker_form_table AS spw ON sp.spw_ref_id = spw.id
      LEFT JOIN $support_worker_form_table AS spw2 ON sp.spw_partner_ref_id = spw2.id
      WHERE (sp.spw_ref_id = '$spwIds' OR sp.spw_partner_ref_id = '$spwIds') AND sp.status = 'approve' AND sp.id != '" . $data['service_plaining_ref_id'] . "'
    ")['data'];
  // print_r($spData);
  // $fromDate = date('Y-m-d', strtotime("-28 days", strtotime($data['service_date'])));
  // $toDate = date('Y-m-d', strtotime("+28 days", strtotime($data['service_date'])));
  $spData = serviceListRecurring($spwIds, $spData, 1, 'Y-m-d', $data['service_date'], $data['service_date'], 28);
  // print_rp($spData);die();
  $crossArr = array();
  $serviceDate = date('Y-m-d', strtotime($data['service_date']));
  foreach ($spData as $k => $v) {
    $st1 = dateOrTimeCpr('time', $data['service_start_time'], '>=', $v['service_end_time']);
    $st2 = (dateOrTimeCpr('time', $data['service_start_time'], '<=', $v['service_start_time']) and dateOrTimeCpr('time', $data['service_end_time'], '<=', $v['service_start_time']));
    if (!($st1 or $st2) and ($v['service_date'] === $serviceDate) 
      and ($v['delete_recover_status'] !== 'deleted') //@ Avoid Deleted Shift, Just uncomment to include
    ) {
      $v['service_date'] = date('d-m-Y', strtotime($v['service_date']));
      $crossArr[] = $v;
    } //End if condition
  } //End foreach

  $res = array('status' => true, 'data' => $crossArr, 'errorTitle' => 'Shift Timing Error', 'errorMsg' => 'Selected timing is not available because some shift already assigned in selected time duration.');
  if (sizeof($crossArr) > 0) {
    $res['timeCrossError'] = true;
  } else {
    $res['timeCrossError'] = false;
  } //End if condition
  // print_rp($res);
  return $res;
} //End function

?>