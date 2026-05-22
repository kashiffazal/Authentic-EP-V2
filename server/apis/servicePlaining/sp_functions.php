<?php
function separateServicesList($spId = '', $today = false)
{
  global $server_date, $service_plaining_table, $service_plaining_rr_table, $service_plaining_rspw_table, $client_form_table, $service_list_table, $support_worker_form_table, $dropdown_table, $users_table, $domainPath, $service_timing_table, $server_time, $shift_edit_table;
  $spId = $spId ? $spId : $_SESSION['link_id'];
  //!#Get assigned replaced shift to this SPW (Shift requested for replacement for another SPW)
  $assignReplacedShift = @dbQuery("
    SELECT spwr.*,spwr.id AS replaced_spw_id, sprr.id AS request_id,sprr.request_no,req_for_date,req_for_day,CONCAT(spw.first_name,' ',spw.last_name) AS requested_by
    FROM $service_plaining_rspw_table AS spwr
    INNER JOIN $service_plaining_rr_table AS sprr ON sprr.id = spwr.request_table_ref_id
    INNER JOIN $support_worker_form_table AS spw ON sprr.requested_by = spw.id
    WHERE (spwr.spw_ref_id = '$spId' OR spwr.spw_partner_ref_id = '$spId') 
    AND (sprr.status = 'replaced' OR (sprr.status = 'done' AND sprr.updated_date = '$server_date')) 
    AND (spwr.status = 'active' OR (spwr.status = 'done' AND spwr.updated_date = '$server_date'))
  ")['data'];
  // print_rp($assignReplacedShift);die();
  //!#Get all assign shift then separate in Today, Pending and Done Today
  $query = "
    SELECT
    sp.*,
    dr.name AS frequency_name,
    CONCAT(cl.first_name,' ',cl.last_name) AS client_name,cl.street_address,
    sr.name AS service_name,
    CONCAT(spw1.first_name,' ',spw1.last_name) AS swp1_name,
    CONCAT(spw2.first_name,' ',spw2.last_name) AS swp2_name,
    ut1.profileImage AS swp1_img, 
    ut2.profileImage AS swp2_img,
    sp.service_recurring_type,
    sp.service_from_date,sp.service_to_date,
    sp.last_done

    FROM $service_plaining_table AS sp
    INNER JOIN $client_form_table AS cl ON sp.client_ref_id = cl.id
    INNER JOIN $service_list_table AS sr ON sp.service_ref_id = sr.id
    INNER JOIN $support_worker_form_table AS spw1 ON sp.spw_ref_id = spw1.id
    LEFT JOIN $support_worker_form_table AS spw2 ON sp.spw_partner_ref_id = spw2.id
    INNER JOIN $dropdown_table AS dr ON sp.frequency = dr.id
    INNER JOIN $users_table AS ut1 ON spw1.id = ut1.link_id
    LEFT JOIN $users_table AS ut2 ON spw2.id = ut2.link_id
    WHERE (sp.spw_ref_id = '$spId' OR sp.spw_partner_ref_id = '$spId') AND sp.status = 'approve'
  ";
  //!#Also get service details for assign replaced shift if it's assigned
  if ($assignReplacedShift) {
    $assignReplacedQuery = array();
    foreach ($assignReplacedShift as $v) {
      $assignReplacedQuery[] = "sp.id = '" . $v['service_plaining_ref_id'] . "'";
    } //End foreach
    $query .= " OR (" . implode(' OR ', $assignReplacedQuery) . ") ";
  } //End if condition
  if ($today) {
    //On Client Request/Appointment
    //Weekly
    //Daily
    //Fortnightly
    $query .= " AND (
        ((sp.frequency = '9' or sp.frequency = '12') AND sp.service_day = '" . date('d-m-Y') . "') OR 
        (sp.frequency = '6' AND sp.service_day = '" . date('l') . "') OR
        (sp.frequency = '8') OR
        (sp.frequency = '5' AND sp.service_day = '" . date('l') . "')
      )";
  } //End if condition

  $query .= " ORDER BY sp.id DESC";
  // echo $query;die();
  $pending = dbQuery($query)['data'];

  //!#Update service details with updated assigned replaced shift to SPW
  if ($assignReplacedShift) {
    foreach ($pending as $k => $sp) {
      foreach ($assignReplacedShift as $sr) {
        if ($sp['id'] === $sr['service_plaining_ref_id']) {
          $sp['spw_ref_id'] = $sr['spw_ref_id'];
          $sp['spw_partner_ref_id'] = $sr['spw_partner_ref_id'];
          $sp['service_date'] = $sr['req_for_date'];
          $sp['service_day'] = $sr['req_for_day'];
          $sp['service_start_time'] = $sr['service_start_time'];
          $sp['service_end_time'] = $sr['service_end_time'];
          $sp['meal_break_min'] = $sr['meal_break_min'];
          $sp['rest_break_min'] = $sr['rest_break_min'];
          $sp['replaced_spw_id'] = $sr['replaced_spw_id'];
          $sp['request_id'] = $sr['request_id'];
          $sp['request_no'] = $sr['request_no'];
          $sp['requested_by'] = $sr['requested_by'];
          break;
        } //End if condition
      } //End foreach
      $pending[$k] = $sp;
    } //End foreach
  } //End if condition
  // print_rp($pending);die();

  //!#Set missing service date or day by frequency and compare with Service Recurring Type
  foreach ($pending as $k => $v) {
    //@ Compare with Service Recurring Type
    $next = false;
    if (
        //? Always - Current date is less then Service From Date then delete this entry
      ($v['service_recurring_type'] === '10' and dateOrTimeCpr('date', $server_date, '<=', $v['service_from_date']))
      or
        //? Range - Current date is NOT between Service From and To Date then delete this entry
      ($v['service_recurring_type'] === '11' and !dateOrTimeCprBet('date', $server_date, array($v['service_from_date'], $v['service_to_date'])))
    ) {
      $next = true;
    } //End if condition
    //? If Current Date is greater then service to date then skip this shift 
    if ($v['service_recurring_type'] === '11' and dateOrTimeCpr('date', $server_date, '>', $v['service_to_date'])) {
      unset($pending[$k]);
      continue;
    } //End if condition
    //@ Set missing Service Date or Day by Frequency
    $serviceDateAndDay = serviceMissingDateOrDayByFrequencyOrNext($v['service_date'], $v['service_day'], $v['frequency'], $v['frequencyWeek'], $next, $v['service_from_date']);
    // if ($v['shift_no'] === 'SPN-0018') {
    //   echo ($next === true) ? '- true' : '- false';
    //   print_rp($serviceDateAndDay);
    //   print_rp($v);
    //   die();
    // }
    //? If Service Date is greater then service to date then skip this shift 
    if ($v['service_recurring_type'] === '11' and dateOrTimeCpr('date', $serviceDateAndDay['service_date'], '>', $v['service_to_date'])) {
      unset($pending[$k]);
      continue;
    } //End if condition
    // print_rp($serviceDateAndDay);
    $v['service_date'] = $serviceDateAndDay['service_date'];
    $v['service_day'] = $serviceDateAndDay['service_day'];
    $pending[$k] = $v;
  } //End foreach
  // print_rp($pending);die();

  // //Update Edited Shifts and marge with current
  // $editedShift = dbQuery("SELECT * FROM $shift_edit_table WHERE DATE(service_date) >= '$server_date' AND status = 'active'")['data'];
  // // print_rp($editedShift);die();
  // $pending = updateShiftWithEditedShift($editedShift,$pending);
  // // print_rp($pending);die();

  //!#Get all requested for replacement data by the same SP or SP partner
  $replacementReqData = dbQuery("SELECT id,service_plaining_ref_id,req_for_date,req_for_day,spw_ref_id,spw2_ref_id,reason,status FROM $service_plaining_rr_table WHERE (spw_ref_id = '$spId' OR spw2_ref_id = '$spId') AND (status = 'requested' OR status = 'replaced') ORDER BY id ASC")['data'];
  // print_rp($replacementReqData);
  $today = array();
  $todayDone = array();

  $i = 0;
  foreach ($pending as $k => $v) {

    #Set Partner name for current support worker
    if ($v['spw_ref_id'] === $spId) {
      $v['partner_display_name'] = $v['swp2_name'];
      $v['partner_display_slug'] = name_slug($v['swp2_name']);
      $v['partner_display_img'] = $v['swp2_img'] ? $domainPath . '/files/uploads/user_profiles/' . $v['swp2_img'] . '?k=' . rand() : ''; //End if condition
    } //End if condition
    if ($v['spw_partner_ref_id'] === $spId) {
      $v['partner_display_name'] = $v['swp1_name'];
      $v['partner_display_slug'] = name_slug($v['swp1_name']);
      $v['partner_display_img'] = $v['swp1_img'] ? $domainPath . '/files/uploads/user_profiles/' . $v['swp1_img'] . '?k=' . rand() : ''; //End if condition
    } //End if condition
    #Set hour
    // $v['hour'] = timeDiff($v['service_start_time'],$v['service_end_time']);
    $v['hour'] = differenceInHours($v['service_start_time'], $v['service_end_time'], true, '%h:%i');
    // $v['service_date_time'] = ($v['service_date'] ? $v['service_date'] : $v['service_day']).' '.$v['service_start_time'];

    #Get last done by current user (There can be 2 user, 1 main user and 2nd Partner)
    $lastDone = explode("=>", $v['last_done']);
    $lastDone = (isset($v['spw_partner_ref_id']) and $v['spw_partner_ref_id'] != '' and $v['spw_partner_ref_id'] == $_SESSION['link_id']) ? @$lastDone[1] : @$lastDone[0];
    // echo $lastDone;      

    #Set request for replacement status for Front-End 
    $v['replacementRequested'] = false;
    $v['spwReplaced'] = false;
    foreach ($replacementReqData as $rr) {
      if (($rr['service_plaining_ref_id'] === $v['id']) and (($rr['spw_ref_id'] === $spId) or ($rr['spw2_ref_id'] === $spId))) {
        if ($rr['status'] === 'requested') {
          $v['replacementRequested'] = true;
          $v['replacementRequestedReason'] = $rr['reason'];
        } //End if condition
        if ($rr['status'] === 'replaced') {
          $v['spwReplaced'] = true;
          $v['req_for_date'] = $rr['req_for_date'];
          #Set missing service date or service day by frequency for next shift after request
          $serviceDateAndDay = serviceMissingDateOrDayByFrequencyOrNext($rr['req_for_date'], $rr['req_for_day'], $v['frequency'], $v['frequencyWeek'], true);
          $v['service_date'] = $serviceDateAndDay['service_date'];
          $v['service_day'] = $serviceDateAndDay['service_day'];
        } //End if condition
        // break;
      } //End if condition
    } //End foreach
    if ($v['spwReplaced']) {
      #If frequency is On Client Request/Appointment then remove this shift from pending
      #because it's not recurring shift it was just for one time
      if ($v['frequency'] !== '9' or $v['frequency'] !== '12' ) {
        $pending[$k] = $v;
      } else {
        unset($pending[$k]);
      } //End if condition
      continue;
    } //End if condition
    $pending[$k] = $v;

    $onClientRequest = ($v['frequency'] === '9' or $v['frequency'] === '12'); //On Client Request/Appointment
    if ($onClientRequest and $v['service_date'] === date('d-m-Y') and $server_date !== $lastDone) {
      $today[] = $v;
      unset($pending[$k]);
    } //End if condition

    $weeklyCon = ($v['frequency'] === '6'); //Weekly
    // if ($weeklyCon and $v['service_day'] === date('l') and $server_date !== $lastDone) {
    if ($weeklyCon and $v['service_date'] === date('d-m-Y') and $server_date !== $lastDone) {
      // $v['service_date'] = date('d-m-Y');
      // echo 'asdf';
      $today[] = $v;
      unset($pending[$k]);
    } //End if condition

    $dailyCon = ($v['frequency'] === '8'); //Daily
    if ($dailyCon and $server_date !== $lastDone and $server_date === date('Y-m-d', strtotime($v['service_date']))) {
      $today[] = $v;
      unset($pending[$k]);
    } //End if condition

    $fortnightly = ($v['frequency'] === '5'); //Fortnightly
    if ($fortnightly and $v['service_day'] === date('l') and $server_date === date('Y-m-d', strtotime($v['service_date'])) and $server_date !== $lastDone) {
      $dateList = currentFortnightDateListWithDay();
      if (in_array(date('Y-m-d') . '-' . date('l'), $dateList)) {
        $today[] = $v;
        unset($pending[$k]);
      } //End if condition
    } //End if condition

    #Remove todays done shifts, if it's available in pending list
    if ($server_date == $lastDone) {
      #Get Today Done shift details
      $doneTodayShift = @dbQuery("SELECT id AS ss,start_time AS done_start_time,end_time AS done_end_time FROM $service_timing_table WHERE service_plaining_ref_id = '" . $v['id'] . "' AND (service_started_by_spw_ref_id = '" . $_SESSION['link_id'] . "' AND service_done_by_spw_ref_id = '" . $_SESSION['link_id'] . "') ")['data'][0];
      // print_rp($doneTodayShift);
      $doneTodayShift['done_hour'] = @timeDiff($doneTodayShift['done_start_time'], $doneTodayShift['done_end_time']);
      $v = array_merge($v, $doneTodayShift);
      #Set missing service date or service day by frequency for next shift
      $serviceDateAndDay = serviceMissingDateOrDayByFrequencyOrNext($v['service_date'], $v['service_day'], $v['frequency'], $v['frequencyWeek'], true);
      $v['service_date'] = $serviceDateAndDay['service_date'];
      $v['service_day'] = $serviceDateAndDay['service_day'];
      $todayDone[] = $v;
      unset($pending[$k]);
    } //End if condition
  } //End foreach

  // print_rp($pending);die();
  // print_rp($today);die();
  // print_rp($todayDone);die();

  //Update Edited Shifts and marge with current
  $editedShift = dbQuery("SELECT * FROM $shift_edit_table WHERE DATE(service_date) >= '$server_date' AND status = 'active'")['data'];
  // print_rp($editedShift);die();
  $dt = updateShiftWithEditedShift($editedShift, array('pending' => $pending, 'today' => $today, 'todayDone' => $todayDone));
  $pending = @$dt['data']['pending'] ? $dt['data']['pending'] : array();
  $today = @$dt['data']['today'] ? $dt['data']['today'] : array();
  $todayDone = @$dt['data']['todayDone'] ? $dt['data']['todayDone'] : array();

  #No Services Messages
  $noServiceMsg = (sizeof($pending) === 0 and sizeof($today) === 0) ? array('title' => 'No Service yet!', 'msg' => 'Service is not assigned by your administrator.') : array();
  $noPendingServiceMsg = (sizeof($pending) === 0 ? array('title' => 'No Pending Service yet!', 'msg' => 'Service is not assigned by your administrator.') : array());
  $noTodayServiceMsg = (sizeof($today) === 0 ? array('title' => 'No Today\'s Service yet!', 'msg' => 'Service is not assigned by your administrator.') : array());
  $noTodayDoneServiceMsg = (sizeof($todayDone) === 0 ? array('title' => 'No Service is Done Today!', 'msg' => 'There is no Services are done Today') : array());

  #If timer is start of this current support worker then get Data from timer table and send to front-end
  $runningServiceData = dbQuery("
      SELECT id,service_plaining_ref_id,start_time,timerData FROM $service_timing_table 
      WHERE 
      (spw_ref_id = '" . $_SESSION['link_id'] . "' OR
      spw2_ref_id = '" . $_SESSION['link_id'] . "') AND
      service_started_by_spw_ref_id = '" . $_SESSION['link_id'] . "' AND
      COALESCE(end_time, '') = '' AND
      COALESCE(timerData, '') != ''
    ");
  // print_rp($runningServiceData);
  $service_plain_id = @$runningServiceData['data'][0]['service_plaining_ref_id'];
  $start_time = @$runningServiceData['data'][0]['start_time'];
  $timer_data = @$runningServiceData['data'][0]['timerData'];
  $server_time = $start_time ? timeDiff($start_time, $server_time) : '00:00:00';
  $server_time = explode(':', $server_time);
  $server_time = array('hour' => (int) $server_time[0], 'min' => (int) $server_time[1], 'sec' => (int) $server_time[2]);
  $server_time = json_encode($server_time);
  //print_rp($pending);
  #Sort by date and time
  usort($pending, function ($a, $b) {
    return new DateTime($a['service_date'] . ' ' . $a['service_start_time']) <=> new DateTime($b['service_date'] . ' ' . $b['service_start_time']);
  });
  usort($today, function ($a, $b) {
    return new DateTime($a['service_date'] . ' ' . $a['service_start_time']) <=> new DateTime($b['service_date'] . ' ' . $b['service_start_time']);
  });
  usort($todayDone, function ($a, $b) {
    return new DateTime($a['service_date'] . ' ' . $a['service_start_time']) <=> new DateTime($b['service_date'] . ' ' . $b['service_start_time']);
  });
  //print_rp($today);


  return array(
    'status' => true,
    'data' => array(
      'pending' => array_values($pending),
      'today' => $today,
      'todayDone' => $todayDone,
      'count' => array(
        'pending' => str_pad(sizeof($pending), 2, '0', STR_PAD_LEFT),
        'today' => str_pad(sizeof($today), 2, '0', STR_PAD_LEFT),
        'todayDone' => str_pad(sizeof($todayDone), 2, '0', STR_PAD_LEFT),
        'onClient' => str_pad(@$dt['count']['onClientRequest'], 2, '0', STR_PAD_LEFT),
        'monthly' => str_pad(@$dt['count']['countCurrentMonthly'], 2, '0', STR_PAD_LEFT),
        'weekly' => str_pad(@$dt['count']['weeklyCon'], 2, '0', STR_PAD_LEFT),
        'daily' => str_pad(@$dt['count']['countCurrentDaily'], 2, '0', STR_PAD_LEFT),
        'fortnightly' => str_pad(@$dt['count']['countCurrentFortnightly'], 2, '0', STR_PAD_LEFT),
        'onReplaceRequest' => str_pad(@$dt['count']['onReplaceRequest'], 2, '0', STR_PAD_LEFT),
        'total' => str_pad((sizeof($pending) + sizeof($today)), 2, '0', STR_PAD_LEFT)
      ),
      'current_time' => @$server_time,
      'start_time' => @$start_time,
      'timerData' => @$timer_data,
      'service_plain_id' => @$service_plain_id,
      'noServiceMsg' => $noServiceMsg,
      'noPendingServiceMsg' => $noPendingServiceMsg,
      'noTodayServiceMsg' => $noTodayServiceMsg,
      'noTodayDoneServiceMsg' => $noTodayDoneServiceMsg,
    )
  );
} //End function

function updateShiftWithEditedShift($editedShift, $dataArr)
{
  $arr = array();
  $countArr = array(
    'onClientRequest' => 0,
    'countCurrentDaily' => 0,
    'weeklyCon' => 0,
    'countCurrentMonthly' => 0,
    'countCurrentFortnightly' => 0,
    'onReplaceRequest' => 0
  );
  foreach ($dataArr as $type => $data) {
    foreach ($data as $k => $v) {
      foreach ($editedShift as $s) {
        $s['current_service_date'] = date('d-m-Y', strtotime($s['current_service_date']));
        if (
          $s['service_plaining_ref_id'] === $v['id'] and
          $s['current_service_date'] === $v['service_date'] and
          $s['current_start_time'] === $v['service_start_time'] and
          $s['current_end_time'] === $v['service_end_time']
        ) {
          $v['service_ref_id'] = $s['service_ref_id'];
          $v['service_date'] = date('d-m-Y', strtotime($s['service_date']));
          $v['service_day'] = date('l', strtotime($s['service_date']));
          $v['service_start_time'] = $s['service_start_time'];
          $v['service_end_time'] = $s['service_end_time'];
          $v['meal_break_min'] = $s['meal_break_min'];
          $v['rest_break_min'] = $s['rest_break_min'];
          $v['remarks'] = $s['remarks'];
          $v['shift_edit_ref_id'] = $s['id'];
          $v['hour'] = differenceInHours($v['service_start_time'], $v['service_end_time'], true, '%h:%i');
          $v['delete_recover_status'] = $s['delete_recover_status'];
        } //End if condition
      } //End foreach

      #Skip deleted shift from list
      #BUT this deleted shift must be in Pending with next Date (Without On Client Request/Appointment)
      if (@$v['delete_recover_status'] === 'deleted') {
        $serviceDateAndDay = serviceMissingDateOrDayByFrequencyOrNext($data[$k]['service_date'], $data[$k]['service_day'], $v['frequency'], $v['frequencyWeek'], true);
        $v['service_date'] = $serviceDateAndDay['service_date'];
        $v['service_day'] = $serviceDateAndDay['service_day'];
        $arr['pending'][] = $v;
        continue;
      } //Skip this deleted shift

      if ($v['frequency'] === '9' or $v['frequency'] === '12') {
        $countArr['onClientRequest']++;
      }
      if ($v['frequency'] === '8') {
        $countArr['countCurrentDaily']++;
      }
      if ($v['frequency'] === '6') {
        $countArr['weeklyCon']++;
      }
      if ($v['frequency'] === '5') {
        $countArr['countCurrentFortnightly']++;
      }
      if (@$v['request_no']) {
        $countArr['onReplaceRequest']++;
      }

      #If pending shift is Edited with Today's Date then add it into Today's Shift
      // if ($type === 'pending' and $v['service_day'] === date('l')) {
      if ($type === 'pending' and $v['service_date'] === date('d-m-Y')) {
        $arr['today'][] = $v;
      } else {
        $arr[$type][] = $v;
      } //End if condition

    } //End foreach
  } //End foreach Main

  return array('data' => $arr, 'count' => $countArr);
} //End function

function getAfterSetUnattendedShifts($getList = true, $spId = false)
{
  global $service_plaining_table, $service_timing_table, $server_date, $server_time;
  //! If this is SP id then get unattended for this one otherwise get all 
  $whereCo = '';
  if ($spId) {
    $whereCo = "AND id = '$spId'";
  } //End if condition
  $sp = dbQuery("SELECT id,shift_no,spw_ref_id,spw_partner_ref_id,service_ref_id,client_ref_id,frequency,frequencyWeek,service_day,service_date,service_start_time,service_recurring_type,service_end_time,service_from_date,service_to_date,last_check_unattended_date,last_check_unattended_time,inserted_date FROM $service_plaining_table WHERE status = 'approve' $whereCo")['data'];
  //! Get service recurring list of each SP 
  //! Start from service start date at first time after that start from last check of Unattended
  include "../apis/serviceSchedule/sch_functions.php"; //$adminEmailContent
  $allShiftArr = array();
  $conditionVar = array();
  $spIds = array();
  foreach ($sp as $vl) {
    //@ Getting From and To Date and also total month =========================//
    $vl['last_check_unattended_time'] = $vl['last_check_unattended_time'] ? $vl['last_check_unattended_time'] : date('h:i:s A',strtotime($vl['service_start_time']. ' - 1 minutes'));//@ To make the condition true
    $fromDate = date('Y-m-d', strtotime($vl['last_check_unattended_date'] ? $vl['last_check_unattended_date'] : $vl['service_from_date']));
    $toDate = date('Y-m-d', strtotime($vl['service_to_date'] ? $vl['service_to_date'] : $server_date));
    // $toDate = date('Y-m-d', strtotime($server_date));
    $totalMonth = date_diff(date_create($fromDate), date_create($toDate))->m;
    $totalMonth = $totalMonth === 0 ? 1 : $totalMonth;
    //@ =======================================================================//

    //@ Crate all Shift Array and condition array for DB Query =================//
    $vl['mainSPWId'] = $vl['spw_ref_id'];
    $allShiftOfSW = serviceListRecurring($vl['mainSPWId'], array($vl), $totalMonth, 'Y-m-d', $fromDate, $toDate);
    //@ Set Partner Shift Array
    if ($vl['spw_partner_ref_id']) {
      $vl['mainSPWId'] = $vl['spw_partner_ref_id'];
      $allShiftOfSW = array_merge($allShiftOfSW, serviceListRecurring($vl['mainSPWId'], array($vl), $totalMonth, 'Y-m-d', $fromDate, $toDate));
    } //End if condition
    // print_rp($allShiftOfSW);

    //@ Set condition Variable for DB Query
    foreach ($allShiftOfSW as $k => $v) {
      //! If this recurring shift in between From and To Dates then allow farther process otherwise delete this shift from shift array
      //! Also check last Checked time for Unattended Shift      
      if (
        dateOrTimeCprBet('date', $v['service_date'], array($fromDate, $server_date))
        and dateOrTimeCpr('time', $v['service_start_time'],
          '>', $vl['last_check_unattended_time'])
      ) {
        $conditionVar[] = "(service_plaining_ref_id = '" . $v['id'] . "' AND inserted_date = '" . $v['service_date'] . "' AND service_done_by_spw_ref_id = '" . $v['mainSPWId'] . "')";
      } else {
        unset($allShiftOfSW[$k]);
      } //End if condition
    } //End foreach
    $allShiftArr = array_merge($allShiftArr, $allShiftOfSW);
    $spIds[] = $vl['id'];
    //@ =======================================================================//
  } //End foreach
  // print_rp($allShiftArr);
  // die();
  //! Adjust shift array with Replacement Requested Shifts =====================//
  $allShiftArr = filterRequestedForReplacementShift($allShiftArr, $spIds);
  //! =========================================================================//
  $queryChunkValue = 500;
  //! Getting all done shifts from DB ========================================//
  $conditionVar = array_chunk($conditionVar, $queryChunkValue);
  $doneShiftArray = array();
  foreach ($conditionVar as $con) {
    $doneShiftArray = array_merge(@$doneShiftArray, dbQuery("SELECT id,service_plaining_ref_id,inserted_date,spw_ref_id,spw2_ref_id,service_done_by_spw_ref_id FROM $service_timing_table WHERE " . implode(' OR ', $con) . "")['data']);
  } //End foreach
  // print_rp($doneShiftArray);die();
  //! =======================================================================//
  //! Cross Check all shift (Remove all done shifts from All Shift Array)
  $queryInsertValuesArr = array();
  $allShiftIdsInArr = array();
  // $todayShifts = array();
  foreach ($allShiftArr as $sk => $shift) {
    foreach ($doneShiftArray as $done) {
      $isDeleteShift = false; //@This is to skip current loop after delete current shift from array
      if (($shift['id'] === $done['service_plaining_ref_id'] and $shift['service_date'] === $done['inserted_date']) and $done['service_done_by_spw_ref_id'] === $shift['mainSPWId']) {
        unset($allShiftArr[$sk]);
        $isDeleteShift = true;
        break;
      } //End if condition
    } //End foreach
    if (@$isDeleteShift) {
      continue;
    } //End if condition
    //@ Remove Today's shift - Shifts whose time has not started or did't cross unattended default time
    $unattendedCrossTime = date('h:i:s A', strtotime($shift['service_start_time'] . ' +' . $_SESSION['dst']['shift']['unattendedMaxTimeInMinutes'] . ' minutes'));
    if ($shift['service_date'] === $server_date and dateOrTimeCpr('time', $unattendedCrossTime, '>=', $server_time)) {
      // $todayShifts[] = $shift;
      unset($allShiftArr[$sk]);
      continue;
    } //End if condition   
    //@================================================================================================//
    //? Inserted Date and Time is Service Start Date and Time + additional minutes from setting (the duration of unattended)
    $queryInsertValuesArr[] = "('" . $shift['id'] . "','" . $shift['service_ref_id'] . "','" . $shift['client_ref_id'] . "','" . $shift['spw_ref_id'] . "','" . $shift['spw_partner_ref_id'] . "','" . $shift['mainSPWId'] . "','" . $shift['service_start_time'] . "','" . $shift['service_end_time'] . "','unattended','" . $shift['service_date'] . "','" . $unattendedCrossTime . "')";
    $allShiftIdsInArr[] = $shift['id']; //Getting shift ids for update SP partially
  } //End foreach
  // print_rp($todayShifts);
  // print_rp($allShiftArr);
  // print_rp($doneShiftArray);
  // print_rp($queryInsertValuesArr);
  // die();
  //! Make Default response in case if there is no any insert
  $res = array(array('status' => true));
  //!Make DB Query for Unattended Shift
  $unAttendInsertQuery = "INSERT INTO $service_timing_table(`service_plaining_ref_id`, `service_ref_id`, `client_ref_id`, `spw_ref_id`, `spw2_ref_id`, `service_done_by_spw_ref_id`, `start_time_actual`, `end_time_actual`, `status`, `inserted_date`, `inserted_time`) VALUES ";
  $queryInsertValuesArr = array_chunk($queryInsertValuesArr, $queryChunkValue);
  $allShiftIdsInArr = array_chunk($allShiftIdsInArr, $queryChunkValue);
  foreach ($queryInsertValuesArr as $k => $v) {
    $spIds = array_unique($allShiftIdsInArr[$k]);
    /* 
    ! Run 2 Queries in one step 
    ? 1st query for Insert Unattended data
    ? 2nd query for Update SP as Last Check date for unattended
    */
    $res[$k] = dbQuery(
      $unAttendInsertQuery . implode(', ', $v) . ";
      UPDATE $service_plaining_table SET last_check_unattended_date = '$server_date', last_check_unattended_time = '$server_time' WHERE id IN (" . implode(',', $spIds) . ")
    "
    );
  } //End foreach
  // print_rp($res);
  $res = bulk_response($res);
  // print_rp($res);
  // die();

  //! Getting all Unattended shift
  if ($getList) {
    return getUnattendedShifts();
  } else {
    return $res;
  } //End if conditionF
} //End function

function getUnattendedShifts()
{
  global $service_timing_table, $client_form_table, $support_worker_form_table, $service_list_table, $service_plaining_rr_table, $service_plaining_table;
  $query = "
    SELECT
    sp.id,
    sp.spw2_ref_id,
    sp.start_time_actual,
    sp.end_time_actual,
    sr.code,
    CONCAT(cl.first_name,' ',cl.last_name) AS client_name,
    CONCAT(spw.first_name,' ',spw.last_name) AS swp_name,
    sp.inserted_date,sp.inserted_time,
    req.request_no,
    spt.shift_no,
    sp.status
    FROM $service_timing_table AS sp
    INNER JOIN $client_form_table AS cl ON sp.client_ref_id = cl.id
    LEFT JOIN $support_worker_form_table AS spw ON sp.service_done_by_spw_ref_id = spw.id
    INNER JOIN $service_list_table AS sr ON sp.service_ref_id = sr.id
    LEFT JOIN $service_plaining_rr_table AS req ON sp.request_id = req.id
    INNER JOIN $service_plaining_table AS spt ON sp.service_plaining_ref_id = spt.id
    WHERE sp.status = 'unattended'
    ORDER BY sp.id ASC
  ";
  $pdo_res = executePDO($query);
  $arr = array();
  $i = 1;
  while ($row = $pdo_res['data']->fetch()) {
    $row['key'] = $i;
    $row['inserted_date_formatted'] = date('d-m-Y', strtotime($row['inserted_date']));
    $row['swp_name'] = $row['swp_name'] . ' - (' . $row['code'] . ')' . ($row['spw2_ref_id'] ? ' - Partner ' : '');
    $row['request_no'] = $row['request_no'] ? $row['request_no'] : '-';
    $row['hour_actual'] = timeDiff($row['start_time_actual'], $row['end_time_actual'], '%h:%i');
    $arr[] = $row;
    $i++;
  } //End while loop

  usort($arr, function ($a, $b) {
    return new DateTime($a['inserted_date'] . ' ' . $a['inserted_time']) <=> new DateTime($b['inserted_date'] . ' ' . $a['inserted_time']);
  });

  return array('status' => true, 'data' => array_reverse($arr));
} //End function

?>