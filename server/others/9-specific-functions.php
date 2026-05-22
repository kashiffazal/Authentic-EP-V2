<?php

function getTotalTransactions()
{
  global $session_user_id;
  global $users_table;
  global $users_role_table;
  global $job_table;

  $tableArr = array($users_table, $users_role_table, $job_table);

  $totalTransaction = 0;
  foreach ($tableArr as $tr) {
    $dt = dbQuery("SELECT count(inserted_by) AS dtc FROM $tr WHERE inserted_by = '$session_user_id'");
    if ($dt['status']) {
      $totalTransaction = $totalTransaction + $dt['data'][0]['dtc'];
    }
  } //End foreach

  return $totalTransaction;
} //End function

function getDropdownByListName($listNames = false)
{
  if (!$listNames) {
    echo 'Please provide List Name';
    die();
  }
  global $dropdown_table;
  $listNames = explode(',', $listNames);
  foreach ($listNames as $key => $vl) {
    $listNames[$key] = "list_name = '$vl'";
  }
  $pdo_res = executePDO("SELECT id AS value,name AS label,list_name FROM $dropdown_table WHERE " . implode(' OR ', $listNames));
  $arr = array();
  if ($pdo_res['errorMsg']) {
    echo $pdo_res['errorMsg'];
    die();
  }
  $key = 1;
  while ($row = $pdo_res['data']->fetch()) {
    $row['key'] = $key;
    $arr[$row['list_name']][] = $row;
    $key++;
  } //End while loop
  return $arr;
} //End function

function checkMultiFieldValue($JSONData)
{
  $res = '';
  #If there is item details JSON
  if (isset($JSONData)) {
    #Decode JSON into an array
    $itemJSON = json_decode($JSONData, true);
    $dataKyes = array_keys($itemJSON);
    #Check if item is selected or not
    $res = empty($itemJSON[$dataKyes[0]][0]) ? false : true;
  } else {
    $res = false;
  } //End if condition
  return $res;
} //End function

function checkExistsDataInDB($tableName, $conditionArray, $infoMsg = 'Data already exists', $infoTitle = 'Info', $skipId = false)
{
  #$conditionArray is multidymential array each array has column and value
  $where = array();
  foreach ($conditionArray as $value) {
    $where[] = $value[0] . " = '" . $value[1] . "'";
  } //End foreach
  $query = "SELECT id, COUNT(id) AS Records from $tableName WHERE (" . implode(' AND ', $where) . ")";
  if ($skipId) {
    $query .= " AND id != '$skipId'";
  } //Skip id for update record
  //echo $query;
  $res = dbQuery($query, array('noRecordMsg' => true));
  $response = array();
  if ($res['status'] and $res['data'][0]['Records'] !== '0') {
    #Set '{count}' variable
    $infoMsg = str_replace('{count}', $res['data'][0]['Records'], $infoMsg);
    $infoTitle = str_replace('{count}', $res['data'][0]['Records'], $infoTitle);
    $response['status'] = true;
    $response['infoTitle'] = $infoTitle;
    $response['infoMsg'] = $infoMsg;
    $response['duplicateData'] = true;
    $response['id'] = $res['data'][0]['id'];
    $response['count'] = $res['data'][0]['Records'];
  } else {
    $response['status'] = false;
  } //End if condition
  #If duplicate found just stop executaion and send Error
  if ($response['status']) {
    echo json_encode($response);
    die();
  }
  ;
} //End function

function saveFile($filename, $filecontent, $folderPath)
{
  if (strlen($filename) > 0) {
    if (!file_exists($folderPath)) {
      mkdir($folderPath);
    }
    $file = @fopen($folderPath . DIRECTORY_SEPARATOR . $filename, "w");
    if ($file != false) {
      fwrite($file, $filecontent);
      fclose($file);
      return array('status' => true, 'fileName' => $filename);
    } //End if condition
    return array('status' => false, 'errorMsg' => 'File could not created');
  } //End if condition
  return array('status' => false, 'errorMsg' => 'Please provide file name');
} //End function

function years_current()
{
  $date = date('Y');
  $till = '2000';
  $arr = array();
  $i = 1;
  while ($till <= $date) {
    $year = (string) $date;
    $arr[] = array('value' => $year, 'label' => $year, 'key' => $i);
    $date--;
    $i++;
  } //End while loop
  $arr[] = array('value' => 'Before ' . $till, 'label' => 'Before ' . $till, 'key' => $i);
  return $arr;
} //End function

function years()
{
  $date = date('Y');
  $date = ($date + 6);
  $till = '2000';
  $arr = array();
  $i = 1;
  while ($till <= $date) {
    $year = (string) $date;
    $arr[] = array('value' => $year, 'label' => $year, 'key' => $i);
    $date--;
    $i++;
  } //End while loop
  $arr[] = array('value' => 'Before ' . $till, 'label' => 'Before ' . $till, 'key' => $i);
  return $arr;
} //End function

function years_old()
{
  $date = date('Y');
  $date = ($date + 6);
  $till = '1950';
  $arr = array();
  $i = 1;
  while ($till <= $date) {
    $year = (string) $date;
    $arr[] = array('value' => $year, 'label' => $year, 'key' => $i);
    $date--;
    $i++;
  } //End while loop
  return $arr;
} //End function

function getCountryList()
{
  global $dropdown_country_table;
  $data = dbQuery("SELECT id AS value, name AS label FROM $dropdown_country_table");
  return $data['data'];
} //End function

function getStateList()
{
  global $dropdown_state_table;
  $data = dbQuery("SELECT id AS value, name AS label FROM $dropdown_state_table");
  return $data['data'];
} //End function

function getLanguageList()
{
  global $dropdown_languages_table;
  $data = dbQuery("SELECT id AS value, name AS label FROM $dropdown_languages_table");
  return $data['data'];
} //End function

function getCurrentFortnightDates($fortnightOfDate = false)
{
  $fortnightOfDate = $fortnightOfDate ? $fortnightOfDate : date('d-m-Y');
  #Create fortnight List ---------------------------------//
  //Start from
  $startDate = '2021-02-08';
  $format = 'Y-m-d';
  $dateArr = array();
  $dateArr[0] = date($format, strtotime($startDate));
  for ($i = 0; $i < 500; $i++) {
    $dtt = strtotime('+2 week', strtotime($dateArr[$i]));
    $dateArr[($i + 1)] = date($format, $dtt);
  } //End for loop
  //------------------------------------------------------//
  #Check nearest week of given date and make fortnight date range 
  $fortnightDates = array();
  foreach ($dateArr as $k => $vl) {
    if (strtotime($fortnightOfDate) < strtotime($vl)) {
      $fortnightDates = array(date($format, strtotime($dateArr[$k - 1])), date($format, strtotime('-1 day', strtotime($dateArr[$k]))));
      break;
    } //End if condition
  } //End foreach
  return array(
    $fortnightDates[0],
    $fortnightDates[1],
    date('jS M Y', strtotime($fortnightDates[0])),
    date('jS M Y', strtotime($fortnightDates[1]))
  );
} //End function

function currentFortnightDateListWithDay($format = 'Y-m-d', $separateDaysInArray = false, $fortnightOfDate = false)
{
  $dateList = getCurrentFortnightDates($fortnightOfDate);
  $newDateList = array($separateDaysInArray ? array(date($format, strtotime($dateList[0])), date('l', strtotime($dateList[0]))) : date($format, strtotime($dateList[0])) . '-' . date('l', strtotime($dateList[0])));
  $modDateList = array($dateList[0]);
  for ($i = 0; $i < 13; $i++) {
    $dt = date('Y-m-d', strtotime($modDateList[$i] . " +1 days"));
    $modDateList[] = $dt;
    $newDateList[] = $separateDaysInArray ? array(date($format, strtotime($dt)), date('l', strtotime($dt))) : date($format, strtotime($dt)) . '-' . date('l', strtotime($dt));
  } //End for loop
  return $newDateList;
} //End function

function fortnightShiftDateByDayAndWeek($day, $week)
{
  $dateList = currentFortnightDateListWithDay();
  foreach ($dateList as $k => $v) {
    $dateDay = explode('-', $v);
    if ($week === '1' and $k <= 6) {
      if ($dateDay[3] === $day) {
        $date = $dateDay[0] . '-' . $dateDay[1] . '-' . $dateDay[2];
        break;
      } //End if condition
    } //End if condition
    if ($week === '2' and $k > 6) {
      if ($dateDay[3] === $day) {
        $date = $dateDay[0] . '-' . $dateDay[1] . '-' . $dateDay[2];
        break;
      } //End if condition
    } //End if condition
  } //End foreach
  return $date;
} //End function

function fortnightShiftDateByDayShiftStartDateAndWeek($shiftStartDate, $day, $week)
{
  $dateList = currentFortnightDateListWithDay('Y-m-d', false, $shiftStartDate);
  foreach ($dateList as $k => $v) {
    $dateDay = explode('-', $v);
    $conditionDate = $dateDay[0] . '-' . $dateDay[1] . '-' . $dateDay[2];
    if ($week === '1' and $k <= 6) {
      if ($dateDay[3] === $day) {
        $date = $conditionDate;
        break;
      } //End if condition
    } //End if condition
    if ($week === '2' and $k > 6) {
      if ($dateDay[3] === $day) {
        $date = $conditionDate;
        break;
      } //End if condition
    } //End if condition
  } //End foreach

  if (dateOrTimeCpr('date', $date, '<', $shiftStartDate)) {
    $date = date('d-m-Y', strtotime('+2 week', strtotime($date)));
  } //End if condition
  // echo $date.' -- ';
  return $date;
} //End function

function currentWeekInFortnight()
{
  global $server_date;
  $dateList = currentFortnightDateListWithDay();
  foreach ($dateList as $k => $v) {
    $v = explode('-', $v);
    unset($v[3]);
    $v = implode('-', $v);
    if ($v === $server_date and $k <= 6) {
      return '1';
    } else {
      return '2';
    }
  } //End foreach
} //End function

function fortnightList($previousCountFromCurrent, $nextCountFromCurrent, $format = 'jS M Y')
{
  $currentFT = getCurrentFortnightDates();
  $date = $currentFT[0];
  $prev = ($previousCountFromCurrent * 2);
  $next = ($nextCountFromCurrent * 2);
  $totalCount = $previousCountFromCurrent + $nextCountFromCurrent;
  $fortnightList = array();
  $startDate = date('Y-m-d', strtotime('-' . ($prev + 2) . ' week', strtotime($date)));
  for ($i = 0; $i < $totalCount; $i++) {
    $startDate = date('Y-m-d', strtotime('+2 week', strtotime($startDate)));
    $endDate = date('Y-m-d', strtotime('+13 day', strtotime($startDate)));
    $fortnightList['list'][] = array('value' => $startDate . '%' . $endDate, 'label' => date($format, strtotime($startDate)) . ' to ' . date($format, strtotime($endDate)));
  } //End for loop
  $fortnightList['defaultCurrent'] = $currentFT[0] . '%' . $currentFT[1];
  return $fortnightList;
} //End function

function base64ToImage($base64, $pathWithImageName)
{
  list($type, $base64) = explode(';', $base64);
  list(, $base64) = explode(',', $base64);
  $base64 = base64_decode($base64);
  file_put_contents($pathWithImageName, $base64);
} //End function

function mageToBase64($pathWithImageName)
{
  $type = pathinfo($pathWithImageName, PATHINFO_EXTENSION);
  $data = file_get_contents($pathWithImageName);
  return 'data:image/' . $type . ';base64,' . base64_encode($data);
} //End function

function differenceInHours($startdate, $enddate, $label = true, $format = '%h:%i:%s')
{
  // $starttimestamp = strtotime($startdate);
  // $endtimestamp = strtotime($enddate);
  // $difference = abs($endtimestamp - $starttimestamp)/3600;
  // return $difference;
  $time = timeDiff($startdate, $enddate, $format);
  if ($label) {
    $th = explode(':', $time);
    if ($th[0] === '00') { //Check hour
      $time = $th[1] . ' minutes';
    } //End if condition
    if ($th[1] === '00') { //Check minutes
      $time = $th[0] . ' hour(s)';
    } //End if condition
    if ($th[0] !== '00' and $th[1] !== '00') {
      // print_rp($time);
      $time = $time . ' minutes';
    } //End if condition
  } //End if condition
  return $time;
} //End function

function timeDiff($time1, $time2, $format = '%h:%i:%s')
{
  $datetime1 = date_create($time1);
  $datetime2 = date_create($time2);
  $interval = date_diff($datetime2, $datetime1);
  $dt = $interval->format($format);
  $mdt = array();
  foreach (explode(':', $dt) as $k => $v) {
    $mdt[] = ((strlen($v) === 1) ? '0' : '') . $v;
  } //End foreach
  return implode(':', $mdt);
} //End function

function getTotalTimeFromTimeArr($timeArr)
{
  $tTime = array();
  // print_r($timeArr);die();
  foreach ($timeArr as $v) {
    $t = explode(':', $v);
    $tTime['h'][] = @$t[0] ? $t[0] : '00';
    $tTime['m'][] = @$t[1] ? $t[1] : '00';
    $tTime['s'][] = @$t[2] ? $t[2] : '00';
  } //End foreach
  $tTime['h'] = array_sum($tTime['h']);
  $tTime['m'] = array_sum($tTime['m']);
  $tTime['s'] = array_sum($tTime['s']);
  $tTime = implode(':', $tTime);

  $interval = date_diff(date_create($tTime), date_create('00:00'));
  $tTime = $interval->format('%h:%i:%s');
  $mdt = array();
  foreach (explode(':', $tTime) as $k => $v) {
    $mdt[] = ((strlen($v) === 1) ? '0' : '') . $v;
  } //End foreach
  $tTime = implode(':', $mdt);

  // $tTime = date('H:i:s',strtotime($tTime));
  return $tTime;
} //End function

function timeList()
{
  $startTime = '12:00 AM';
  $timeArr = array();
  $i = 1;
  do {
    $timeArr[] = array('key' => $i, 'label' => $startTime, 'value' => $startTime);
    $startTime = date('h:i A', strtotime('+5 minutes', strtotime($startTime)));
    $i++;
  } while ($startTime != '12:00 AM');
  return $timeArr;
} //End function

function clientList($indexAsId = false, $col = "id,CONCAT(first_name,' ',last_name) AS name"){
  global $client_form_table, $service_plaining_table;
  if (@$_SESSION['link_id']) { //@If SW is login then get Client for Specific SW
    //@Just get client who has assign to this SW
    $swId = $_SESSION['link_id'];
    $clData = dbQuery("SELECT client_ref_id FROM $service_plaining_table WHERE (spw_ref_id = '$swId' OR spw_partner_ref_id = '$swId')")['data'];
    if (sizeof($clData) > 0) {
      $clDataIds = array();
      foreach ($clData as $v) {$clDataIds[] = $v['client_ref_id'];} //End foreach
      $clDataIds = array_unique($clDataIds);
      $res = dbQuery("SELECT $col FROM $client_form_table WHERE id IN (" . implode(',', $clDataIds) . ") ORDER BY id DESC ", ($indexAsId ? array('indexAsId' => true) : array()));
    } else {
      $res = array('status' => true, 'data' => array());
    } //End if condition
  } else { //@Get All client from DB

    //@ Make condition for company and branch 
    //? Just get Client for those company and branch which user has access 
    if(@!$_SESSION['userCompanyList']){
      $whereCondition = '';
    }else{
      $whereCondition = array();
      foreach ($_SESSION['userCompanyList'] as $vl) {
        $cd = explode('=>',$vl['id']);
        $whereCondition[] = "(company_ref_id = '$cd[0]' AND COALESCE(branch_ref_id, '') = '$cd[1]')"; 
      }//End foreach
      $whereCondition = 'AND ('.implode(' OR ',$whereCondition).')';
    }//End if condition
    $res = dbQuery("SELECT $col FROM $client_form_table WHERE (status = 'active' OR status = 'mutual') AND COALESCE(draft_code, '') = '' $whereCondition ORDER BY id DESC ", ($indexAsId ? array('indexAsId' => true) : array()));
  } //End if condition
  return $res['data'];
} //End function

function supportWorkerList($col = "id,CONCAT(first_name,' ',last_name) AS name"){
  global $support_worker_form_table;

  //@ Make condition for company and branch 
  //? Just get SW for those company and branch which user has access 
  if(@!$_SESSION['userCompanyList']){
    $whereCondition = '';
  }else{
    $whereCondition = array();
    foreach ($_SESSION['userCompanyList'] as $vl) {
      $cd = explode('=>',$vl['id']);
      $whereCondition[] = "(company_ref_id = '$cd[0]' AND COALESCE(branch_ref_id,'') = '$cd[1]')"; 
    }//End foreach
    $whereCondition = 'AND ('.implode(' OR ',$whereCondition).')';
  } //End if condition
  $res = dbQuery("SELECT $col FROM $support_worker_form_table WHERE status = '5' AND COALESCE(draft_code, '') = '' $whereCondition ORDER BY id DESC ");
  return $res['data'];
} //End function

function jobList($active = false, $col = "id AS value,title AS label"){
  global $job_table;
  $query = "SELECT $col FROM $job_table";
  if ($active) {
    $query .= " WHERE status = 'active'";
  }
  $res = dbQuery($query);
  return $res['data'];
} //End function

function serviceListByType($type = 'mutual', $indexAsId = false)
{
  global $service_list_table;
  $res = dbQuery("SELECT id,CONCAT(code,' ',name) AS name FROM $service_list_table WHERE status = 'active' AND type = '$type'", ($indexAsId ? array('indexAsId' => true) : array()));
  return $res['data'];
} //End function

function serviceList($indexAsId = false, $col = "id,CONCAT(code,' ',name) AS name", $excludeServiceById = false)
{
  global $service_list_table;

  $excludeServiceCon = '';
  if ($excludeServiceById) {
    $excludeServiceById = explode(',', $excludeServiceById);
    $excludeServiceCon = array();
    foreach ($excludeServiceById as $v) {
      $excludeServiceCon[] = "id != '$v'";
    } //End foreach
    $excludeServiceCon = ' AND (' . implode(' AND ', $excludeServiceCon) . ')';
  } //End if condition

  $res = dbQuery("SELECT $col FROM $service_list_table WHERE status = 'active' $excludeServiceCon", ($indexAsId ? array('indexAsId' => true) : array()));
  return $res['data'];
} //End function

function serviceFrequencyList($excludeFrequencyById = false)
{
  global $dropdown_table;
  $excludeFrequencyCon = '';
  if ($excludeFrequencyById) {
    $excludeFrequencyById = explode(',', $excludeFrequencyById);
    $excludeFrequencyCon = array();
    foreach ($excludeFrequencyById as $v) {
      $excludeFrequencyCon[] = "id != '$v'";
    } //End foreach
    $excludeFrequencyCon = ' AND (' . implode(' AND ', $excludeFrequencyCon) . ')';
  } //End if condition

  return dbQuery("SELECT id AS value, name AS label FROM $dropdown_table WHERE list_name = 'service_frequency' $excludeFrequencyCon")['data'];
} //End function

function servicePlainingList($value, $plainingType, $limit = false, $dashboard = false)
{
  global $service_plaining_table, $service_list_table, $support_worker_form_table, $users_table, $emailSenderArrCompany, $client_form_table, $dropdown_table, $domainPath, $statusDataGlobal;
  $plainingType = ($plainingType ? " AND sp.plaining_type = '$plainingType'" : '');
  $limit = ($limit ? "LIMIT $limit" : '');
  if ($dashboard) {
    $profileLinkCol = "ut1.profileImage AS swp1_img,ut1.slug_color AS slugColor1, ut2.profileImage AS swp2_img,ut2.slug_color AS slugColor2, sp.inserted_date, sp.inserted_time,";
    $profileLinkJoin =
      "INNER JOIN $users_table AS ut1 ON spw1.id = ut1.link_id
      LEFT JOIN $users_table AS ut2 ON spw2.id = ut2.link_id";
    $sort = 'DESC';
  } else {
    $profileLinkCol = '';
    $profileLinkJoin = '';
    $sort = 'ASC';
  } //End if condition

  $query = "
      SELECT
      sp.id,
      sp.shift_no,
      sp.service_date,
      sp.service_day,
      sp.service_start_time,
      sp.service_end_time,
      sp.frequencyWeek,
      sp.appointment_ref_id,
      dr.name AS frequency,
      dr.id AS frequency_id,
      sr.name AS service_name,
      CONCAT(spw1.first_name,' ',spw1.last_name) AS swp1_name,
      CONCAT(spw2.first_name,' ',spw2.last_name) AS swp2_name,
      CONCAT(cl.first_name,' ',cl.last_name) AS client_name,
      $profileLinkCol
      sp.status
      FROM $service_plaining_table AS sp
      INNER JOIN $service_list_table AS sr ON sp.service_ref_id = sr.id
      INNER JOIN $support_worker_form_table AS spw1 ON sp.spw_ref_id = spw1.id
      INNER JOIN $client_form_table AS cl ON sp.client_ref_id = cl.id
      INNER JOIN $dropdown_table AS dr ON sp.frequency = dr.id
      LEFT JOIN $support_worker_form_table AS spw2 ON sp.spw_partner_ref_id = spw2.id
      $profileLinkJoin
      WHERE sp.status = '$value' $plainingType
      ORDER BY sp.id $sort $limit
    ";

  $pdo_res = executePDO($query);
  $arr = array();
  $i = 1;
  while ($row = $pdo_res['data']->fetch()) {
    $row['key'] = $i;
    $row['swp_name'] = $row['swp1_name'] . ($row['swp2_name'] ? ', ' . $row['swp2_name'] : '');
    $row['swp1_name_slug'] = name_slug($row['swp1_name']);
    $row['swp2_name_slug'] = name_slug($row['swp2_name']);
    $row['hour'] = timeDiff($row['service_start_time'], $row['service_end_time']);
    if ($row['frequency_id'] === '5') {
      $row['frequency'] = $row['frequency'] . ' (Week ' . $row['frequencyWeek'] . ')';
    }
    $row['service_day_date'] = ($row['service_day'] ? $row['service_day'] : ($row['service_date'] ? $row['service_date'] : '-'));
    if (@$row['swp1_img']) {
      $row['swp1_img'] = $domainPath . '/files/uploads/user_profiles/' . $row['swp1_img'] . '?k=' . rand();
    } //End if condition
    if (@$row['swp2_img']) {
      $row['swp2_img'] = $domainPath . '/files/uploads/user_profiles/' . $row['swp2_img'] . '?k=' . rand();
    } //End if condition
    $row['dateTime'] = @dateFormat($row['inserted_date'], $row['inserted_time']);
    // unset($row['swp1_name']);
    // unset($row['swp2_name']);
    $arr[] = $row;
    $i++;
  } //End while loop
  
  //@ Set Status List
  $statusList = array(
    'approve' => array('name' => 'Approved', 'icon' => $statusDataGlobal['approved']['icon'], 'mobileIcon' =>  $statusDataGlobal['approved']['mobileIcon'], 'color' => $statusDataGlobal['approved']['color']),
    'unapproved' => array('name' => 'Unapproved', 'icon' => $statusDataGlobal['unapproved']['icon'], 'mobileIcon' =>  $statusDataGlobal['unapproved']['mobileIcon'], 'color' => $statusDataGlobal['unapproved']['color']),
    'on_hold' => array('name' => 'On Hold', 'icon' => $statusDataGlobal['on_hold']['icon'], 'mobileIcon' =>  $statusDataGlobal['on_hold']['mobileIcon'], 'color' => $statusDataGlobal['on_hold']['color']),
    'deleted' =>  array('name' => 'Deleted', 'icon' => $statusDataGlobal['deleted']['icon'], 'mobileIcon' =>  $statusDataGlobal['deleted']['mobileIcon'], 'color' => $statusDataGlobal['deleted']['color'])
  );
  
  if ($dashboard) {
    return $arr;
  } else {
    $arr = array_reverse($arr);
    // print_rp($arr);
    return array('status' => true, 'data' => $arr, 'statusList' => $statusList);
  } //End if condition
} //End function


function recentUser($dashboard = false, $limit = 5){
  global $users_table, $users_role_table, $users_status_table, $session_user_id, $domainPath, $companies_table, $branches_table;
  $query = "
      SELECT 
      $users_table.*,
      $users_role_table.id AS role_id, $users_role_table.role AS role_name, $users_status_table.status AS status_name
      FROM $users_table   
      INNER JOIN $users_role_table  
      ON $users_table.role = $users_role_table.id
      INNER JOIN $users_status_table  
      ON $users_table.status = $users_status_table.id
      WHERE $users_table.id != '$session_user_id'
      ORDER BY $users_table.id DESC
      LIMIT $limit
    ";
  $pdo_res = executePDO($query);
  $arr = array();
  $companyIds = array();
  $branchIds = array();
  $i = 1;
  while ($row = $pdo_res['data']->fetch()) {
    $row['profileImage'] = $row['profileImage'] ? $domainPath . '/files/uploads/user_profiles/' . $row['profileImage'] . '?k=' . rand() : '';
    $row['name_slug'] = name_slug($row['first_name'] . ' ' . @$row['last_name']);
    $row['dateTime'] = dateFormat($row['inserted_date'], $row['inserted_time']);

    //#Remove Brackets from Company and Branch Ref Ids
    $row['company_ref_ids'] = str_replace(array('(',')'),array('',''),$row['company_ref_ids']);
    $row['branch_ref_ids'] = str_replace(array('(',')'),array('',''),$row['branch_ref_ids']);
    
    $row['key'] = $i;
    $arr[] = $row;
    
    if($row['company_ref_ids']){$companyIds[] = $row['company_ref_ids'];}
    if($row['branch_ref_ids']){$branchIds[] = $row['branch_ref_ids'];}
    
    $i++;
  } //End while loop

  //@ Get Companies and Branches name
  $companyData = @dbQuery("SELECT id,company_name FROM $companies_table WHERE id IN(".implode(',',$companyIds).")",array('indexAsId' => true))['data'];
  $branchData = @dbQuery("SELECT id,branch FROM $branches_table WHERE id IN(".implode(',',$branchIds).")",array('indexAsId' => true))['data'];
  foreach ($arr as $k => $value) {
    if($value['company_ref_ids']){
      $value['company_ref_ids'] = explode(',',$value['company_ref_ids']);
      $c = array();
      foreach($value['company_ref_ids'] as $v){$c[] = $companyData[$v]['company_name'];}//End Foreach
      $value['company_ref_ids'] = $c;
      $arr[$k] = $value;
    }//End if condition
    if($value['branch_ref_ids']){
      $value['branch_ref_ids'] = explode(',',$value['branch_ref_ids']);
      $b = array();
      foreach($value['branch_ref_ids'] as $v){$b[] = $branchData[$v]['branch'];}//End Foreach
      $value['branch_ref_ids'] = $b;
      $arr[$k] = $value;
    }//End if condition
  }//End foreach

  $arr = array_reverse($arr);
  if ($dashboard) {
    return array_reverse($arr);
  } else {
    return json_encode(array('status' => true, 'data' => $arr));
  } //End if condition
} //End function

// function addTimeSheet($type,$data){
//   #Set initial Variables
//   global $timesheet_client_table, $timesheet_employee_table, $session_user_id, $server_date;
//   $fortnightDate = getCurrentFortnightDates();
//   #Set mutual values for both timesheets
//   $commonData = array(
//     'fortnightStartDate' => $fortnightDate[0],
//     'fortnightEndDate' => $fortnightDate[1],
//     'client_ref_id' => $data['client_ref_id'],
//     'date' => $server_date,
//     'start_time' => $data['start_time'],
//     'finish_time' => $data['end_time'],
//     'th' => differenceInHours($data['start_time'],$data['end_time'],false),
//     'status' => 'unapproved'
//   );
//   if($type === 'client'){
//     $table = $timesheet_client_table;
//     $data = array_merge($commonData,array('service_type' => $data['service_ref_id'],'description' => @$data['description']));
//   }else{
//     $table = $timesheet_employee_table;
//     $data = array_merge($commonData,array('service_type' => $data['service_ref_id'], 'mt' => @$data['mt'],'nh' => @$data['nh'],'wh' => @$data['wh'],'ph' => @$data['ph'],'eh' => @$data['eh'],'kt' => @$data['kt']));
//   }//End if condition
//   #Get data from DB if available for
//   $tsData = dbQuery("SELECT id,json FROM $table WHERE fortnightStartDate = '".$fortnightDate[0]."' AND fortnightEndDate = '".$fortnightDate[1]."' AND inserted_by = '$session_user_id' ORDER BY id DESC");
//   $tsData = @$tsData['data'][0];
//   #Set mutual values for both timesheets
//   if(@$tsData['json']){
//     $json = json_decode($tsData['json'],true);
//     $json['date'][] = $data['date'];
//     $json['th'][] = $data['th'];
//     $json['client_ref_id'][] = $data['client_ref_id'];
//     $json['start_time'][] = $data['start_time'];
//     $json['finish_time'][] = $data['finish_time'];
//     $json['service_type'][] = $data['service_type'];
//     $data['id'] = $tsData['id'];
//   }else{
//     $addJsonArr = array(
//       'date' => array('1' => $data['date']),
//       'th' => array('1' => $data['th']),
//       'client_ref_id' => array('1' => $data['client_ref_id']),
//       'start_time' => array('1' => $data['start_time']),
//       'finish_time' => array('1' => $data['finish_time']),
//       'service_type' => array('1' => $data['service_type'])
//     );
//   }//End if condition
//   if($type === 'client'){
//     if(@$tsData['json']){
//       $json['description'][] = @$data['description'];
//       $data['json'] = json_encode($json);
//     }else{
//       $data['json'] = json_encode(array_merge($addJsonArr, array(
//         'description' => array('1' => @$data['description'])
//       )));
//     }//End if condition
//   }else{//Else if it's staff
//     if(@$tsData['json']){
//       $json['mt'][] = @$data['mt'];
//       $json['nh'][] = @$data['nh'];
//       $json['wh'][] = @$data['wh'];
//       $json['ph'][] = @$data['ph'];
//       $json['eh'][] = @$data['eh'];
//       $json['kt'][] = @$data['kt'];
//       $data['json'] = json_encode($json);
//     }else{
//       $data['json'] = json_encode(array_merge($addJsonArr, array(
//         'mt' => array('1' => @$data['mt']),
//         'nh' => array('1' => @$data['nh']),
//         'wh' => array('1' => @$data['wh']),
//         'ph' => array('1' => @$data['ph']),
//         'eh' => array('1' => @$data['eh']),
//         'kt' => array('1' => @$data['kt'])
//       )));
//     }//End if condition
//   }//End if condition
//   // print_r($data);
//   $res = dbQuery('post',$data,$table);

//   $json_count = json_decode($data['json'],true);
//   $res['json_count'] = sizeof($json_count['date']);

//   return $res;
// }//End function



function addStaffTimeSheet($data, $dateForFortnight = false, $timing_ref_id = false)
{
  global $service_timing_table, $service_plaining_table, $timesheet_staff_table, $public_holidays_aust_table, $session_user_id, $server_date;
  //@ If there is no data and Timing ref id is given then Get data for Time-Sheet ================//
  if ($timing_ref_id) {
    $spId = dbQuery("SELECT service_plaining_ref_id FROM $service_timing_table WHERE id = '$timing_ref_id'")['data'][0]['service_plaining_ref_id'];
    $data = array_merge(
      dbQuery("SELECT * FROM $service_plaining_table WHERE id = '$spId'")['data'][0],
      dbQuery("SELECT * FROM $service_timing_table WHERE id = '$timing_ref_id'")['data'][0],
      $data
    );
    $dateForFortnight = $data['inserted_date']; //? Inserted Date is actually Service Date in Timing table
  } //End if condition
  // print_rp($data);die();
  //@=============================================================================================//
  $fortnightDate = getCurrentFortnightDates($dateForFortnight);
  //! Set initial values Time-sheet
  $dt = array(
    'fortnightStartDate' => $fortnightDate[0],
    'fortnightEndDate' => $fortnightDate[1],
    'client_ref_id' => $data['client_ref_id'],
    'service_plaining_ref_id' => $data['service_plaining_ref_id'],
    'shift_no' => $data['shift_no'],
    'date' => $server_date,
    'start_time' => $data['start_time'],
    'end_time' => $data['end_time'],
    'status' => 'unapproved',
    'service_type' => $data['service_ref_id'],
    'normal_hour' => '',
    'weekend_hour_sat' => '',
    'weekend_hour_sun' => '',
    'public_holidays_hour' => '',
    'km_travel' => @$data['km_travel'],
    'description' => @$data['description']
  );
  $data = $dt;
  //! Get public holidays hour if available=============//
  $totalHour = differenceInHours($data['start_time'], $data['end_time'], false);
  $current_date = date('j M', strtotime($server_date));
  $holidaysArr = dbQuery("SELECT * FROM $public_holidays_aust_table");
  $holidaysArr = $holidaysArr['data'];
  foreach ($holidaysArr as $v) {
    if ($current_date === $v['date']) {
      $data['public_holidays_hour'] = $totalHour;
    } //End if condition
  } //End foreach
  //! Get weekend hour if available =====================//
  $current_day = date('D', strtotime($server_date));
  if (@!$data['public_holidays_hour'] and ($current_day === 'Sat')) {
    $data['weekend_hour_sat'] = $totalHour;
  } //End if condition
  if (@!$data['public_holidays_hour'] and ($current_day === 'Sun')) {
    $data['weekend_hour_sun'] = $totalHour;
  } //End if condition
  #Get normal hour if ir's in normal days
  if (@!$data['public_holidays_hour'] and @!$data['weekend_hour_sat'] and @!$data['weekend_hour_sun']) {
    $data['normal_hour'] = $totalHour;
  } //End if condition
  // print_r($data);die();
  //! Get data from DB if available for =================//
  $tsData = dbQuery("SELECT id,json FROM $timesheet_staff_table WHERE fortnightStartDate = '" . $fortnightDate[0] . "' AND fortnightEndDate = '" . $fortnightDate[1] . "' AND inserted_by = '$session_user_id' ORDER BY id DESC");
  $tsData = @$tsData['data'][0];
  //! Set mutual values for both Time-Sheet =============//
  if (@$tsData['json']) {

    $json = json_decode($tsData['json'], true);
    $json['client_ref_id'][] = $data['client_ref_id'];
    $json['service_plaining_ref_id'][] = $data['service_plaining_ref_id'];
    $json['shift_no'][] = $data['shift_no'];
    $json['date'][] = $data['date'];
    $json['start_time'][] = $data['start_time'];
    $json['end_time'][] = $data['end_time'];
    $json['normal_hour'][] = $data['normal_hour'];
    $json['weekend_hour_sat'][] = $data['weekend_hour_sat'];
    $json['weekend_hour_sun'][] = $data['weekend_hour_sun'];
    $json['public_holidays_hour'][] = $data['public_holidays_hour'];
    $json['km_travel'][] = @$data['km_travel'];
    $json['service_type'][] = $data['service_type'];
    $json['description'][] = @$data['description'];

    $data['client_ref_id'] = implode(',', $json['client_ref_id']);
    $data['service_plaining_ref_id'] = implode(',', $json['service_plaining_ref_id']);
    $data['shift_no'] = implode(',', $json['shift_no']);
    $data['date'] = implode(',', $json['date']);
    $data['start_time'] = implode(',', $json['start_time']);
    $data['end_time'] = implode(',', $json['end_time']);
    $data['normal_hour'] = implode(',', $json['normal_hour']);
    $data['weekend_hour_sat'] = implode(',', $json['weekend_hour_sat']);
    $data['weekend_hour_sun'] = implode(',', $json['weekend_hour_sun']);
    $data['public_holidays_hour'] = implode(',', $json['public_holidays_hour']);
    $data['km_travel'] = implode(',', @$json['km_travel']);
    $data['service_type'] = implode(',', $json['service_type']);
    $data['description'] = implode(',', @$json['description']);

    $data['id'] = $tsData['id'];
    $data['json'] = json_encode($json);
  } else {
    $data['json'] = json_encode(
      array(
        'date' => array('1' => $data['date']),
        'normal_hour' => array('1' => $data['normal_hour']),
        'weekend_hour_sat' => array('1' => $data['weekend_hour_sat']),
        'weekend_hour_sun' => array('1' => $data['weekend_hour_sun']),
        'public_holidays_hour' => array('1' => $data['public_holidays_hour']),
        'client_ref_id' => array('1' => $data['client_ref_id']),
        'service_plaining_ref_id' => array('1' => $data['service_plaining_ref_id']),
        'shift_no' => array('1' => $data['shift_no']),
        'start_time' => array('1' => $data['start_time']),
        'end_time' => array('1' => $data['end_time']),
        'service_type' => array('1' => $data['service_type']),
        'km_travel' => array('1' => @$data['km_travel']),
        'description' => array('1' => @$data['description'])
      )
    );
  } //End if condition

  // print_r($data);die();
  $res = dbQuery('post', $data, $timesheet_staff_table);
  // print_r($res);die();
  $json_count = json_decode($data['json'], true);
  $res['json_count'] = sizeof($json_count['date']);

  return $res;
} //End function

function sendServiceApproveBulkEmail($status, $ids, $update = false, $partnerArr = false)
{
  if (!(($status == 'approve') or ($status == 'deleted'))) {
    return false;
  }
  if ($status === 'deleted') {
    $delete = true;
  } else {
    $delete = false;
  }
  global $users_table, $dropdown_table, $service_plaining_table, $client_form_table, $support_worker_form_table, $service_list_table, $companyDetails, $emailSenderArrCompany, $SMTPCred, $emailCCArr, $emailBCCArr, $server_date;
  $arr = array();
  if ($partnerArr and sizeof($partnerArr) > 0) {
    $res = $partnerArr;
    $clientNameOnSingleData = (sizeof($res) === 1) ? ' for ' . $res[0]['client_name'] : '';
    foreach ($res as $v) {
      $hold = $v;
      $v['swp1_email'] = $v['swp2_email'];
      $v['swp1_name'] = $v['swp2_name'];
      $v['swp1_id'] = $v['swp2_id'];

      $v['swp2_email'] = $hold['swp1_email'];
      $v['swp2_name'] = $hold['swp1_name'];
      $v['swp2_id'] = $hold['swp1_id'];

      $arr[$v['swp1_id']][] = $v;
    } //End foreach
    // print_rp($arr);
  } else {
    #Getting Data from DB
    $res = dbQuery("
      SELECT 
        sp.service_start_time,
        sp.service_end_time,
        sp.remarks,
        sp.service_date,
        sp.service_day,
        sp.emailStatus,
        CONCAT(cl.first_name,' ',cl.last_name) AS client_name,
        cl.street_address,
        cl.contactNumber,
        CONCAT(spw1.first_name,' ',spw1.last_name) AS swp1_name,
        spw1.id AS swp1_id,
        spw1.email AS swp1_email,
        CONCAT(spw2.first_name,' ',spw2.last_name) AS swp2_name,
        spw2.id AS swp2_id,
        spw2.email AS swp2_email,
        sr.name AS service_name,
        ut1.email AS swp1_ut_email,
        ut2.email AS swp2_ut_email,
        dt.name AS frequency

        FROM $service_plaining_table AS sp
        INNER JOIN $client_form_table AS cl ON sp.client_ref_id = cl.id
        INNER JOIN $support_worker_form_table AS spw1 ON sp.spw_ref_id = spw1.id
        LEFT JOIN $support_worker_form_table AS spw2 ON sp.spw_partner_ref_id = spw2.id
        INNER JOIN $service_list_table AS sr ON sp.service_ref_id = sr.id
        LEFT JOIN $users_table AS ut1 ON spw1.id = ut1.link_id
        LEFT JOIN $users_table AS ut2 ON spw2.id = ut2.link_id
        INNER JOIN $dropdown_table AS dt ON sp.frequency = dt.id
        WHERE sp.id IN ($ids)
      ");
    // print_rp($res);die();
    $res = $res['data'];
    $clientNameOnSingleData = (sizeof($res) === 1) ? ' for ' . $res[0]['client_name'] : '';
    $arrSP2 = array(); //Create separate array for partners to call this function in recursion 
    foreach ($res as $v) {
      //! If SWs user has email then use it otherwise take it from SWs Form
      $v['swp1_email'] = $v['swp1_ut_email'] ? $v['swp1_ut_email'] : $v['swp1_email'];
      $v['swp2_email'] = $v['swp2_ut_email'] ? $v['swp2_ut_email'] : $v['swp2_email'];
      $arr[$v['swp1_id']][] = $v;
      if ($v['swp2_id']) { #If partner exists
        $arrSP2[] = $v;
      } //End if condition
    } //End foreach
  } //End if condition
  // print_rp($arrSP2);
  // print_rp($arr);die();

  #Create email and tabular data array
  $emailDataArr = array();
  foreach ($arr as $v) {

    $innetTable = '';
    $containerWidth = '700px';
    foreach ($v as $i) {
      $trStyle = '';
      $tdStyle = 'style="text-align:left;border-bottom:1px solid #ced6db;padding-top:8px;padding-bottom:8px"';
      $innetTable .= '
          <table border="0" width="' . $containerWidth . '" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="padding:16px;margin-bottom:10px;margin-top:10px;border-radius:4px;border:1px solid #ced6db;border-collapse:separate">
            <tbody>
              <tr ' . $trStyle . '>
                <th ' . $tdStyle . ' width="25%">Participant Name</th><td ' . $tdStyle . ' width="25%">' . $i['client_name'] . '</td>
                <th ' . $tdStyle . '>Participant Mobile</th><td ' . $tdStyle . '>' . $i['contactNumber'] . '</td>
                </tr>
              <tr ' . $trStyle . '>
                <th ' . $tdStyle . '>Participant Address</th><td ' . $tdStyle . ' colspan="3">' . $i['street_address'] . '</td>
              </tr>
              <tr ' . $trStyle . '>
                <th ' . $tdStyle . ' width="25%">Frequency</th><td ' . $tdStyle . ' width="25%">' . $i['frequency'] . '</td>  
                <th ' . $tdStyle . ' width="25%">Shift Start Time</th><td ' . $tdStyle . ' width="25%">' . $i['service_start_time'] . '</td>              
              </tr>
              <tr ' . $trStyle . '>
                <th ' . $tdStyle . '>Service Date / Day</th><td ' . $tdStyle . '>' . ($i['service_date'] ? $i['service_date'] : $i['service_day']) . '</td>  
                <th ' . $tdStyle . '>Shift End Time</th><td ' . $tdStyle . '>' . $i['service_end_time'] . '</td>     
              </tr>
              <tr ' . $trStyle . '>
                <th ' . $tdStyle . '>Service Type</th><td ' . $tdStyle . '>' . $i['service_name'] . '</td>
                <th ' . $tdStyle . '>Your Manager Name</th><td ' . $tdStyle . '>' . $companyDetails['managerName'] . '</td>
              </tr>
              <tr ' . $trStyle . '>
                <th ' . $tdStyle . '>Shift Partner Name</th><td ' . $tdStyle . '>' . ($i['swp2_name'] ? $i['swp2_name'] : '-') . '</td>
                <th ' . $tdStyle . '>Your Manager Mobile No</th><td ' . $tdStyle . '>' . $companyDetails['mobile'] . '</td>
              </tr>
              <tr>
                <th style="text-align:left;padding-top:8px" valign="top">Notes by Management</th><td style="padding-top:5px" colspan="3" >' . $i['remarks'] . '</td>
              </tr>
            </tbody>
          </table>
        ';
    } //End if condition

    if ($update) {
      $statement = '<p>Please note the shift details again as we did some changes.</p>';
      $subject = 'Your Shift Changes with ' . $companyDetails['name'] . $clientNameOnSingleData . ' - ' . dateFormat($server_date);
    } else if ($delete) {
      $statement = 'We have deleted the following assigned shift from your shifts schedule.';
      $subject = ($clientNameOnSingleData ? 'Your Shift with ' . $clientNameOnSingleData : 'Some shifts') . ' has been Deleted - ' . dateFormat($server_date);
    } else {
      $statement = '
        <p>Please have a look below at your shifts with ' . $companyDetails['name'] . ':</>
        <p>Please do not forget to read the care plan before the shift and make sure to follow the necessary guidelines from the Management.</p>';
      $subject = 'Your Schedule Shift with ' . $companyDetails['name'] . $clientNameOnSingleData . ' - ' . dateFormat($server_date);
    } //End if condition

    $emailTemplate = '
      <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
        <tbody>
          <tr>
            <td align="center" width="' . $containerWidth . '" valign="top" bgcolor="#ffffff" style="background-color:#ffffff">
              <div style="width:' . $containerWidth . '">
                <div style="text-align:left">
                  Dear ' . ucwords($v[0]['swp1_name']) . ',<br/>
                  ' . $statement . '
                </div>
                ' . $innetTable . '
                <div style="text-align:left">
                  <p>If you have any questions, please do not hesitate to the support team personal ' . $companyDetails['supportPersonName'] . ' at ' . $companyDetails['supportPersonContact'] . ' or you can email at ' . $companyDetails['emailSupport'] . '. </p>
                  <p>Thank You</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    ';
    $emailData = array();
    $emailData['receiver'] = array(array('name' => $v[0]['swp1_name'], 'email' => $v[0]['swp1_email']));
    $emailData['template'] = $emailTemplate;
    $emailDataArr[] = $emailData;
  } //End foreach

  $res = array();
  foreach ($emailDataArr as $emailData) {
    $emailData['template'] = array('body' => $emailData['template'], 'plaintext' => $emailData['template'], 'subject' => $subject);
    $res[] = emailPHPMailer($emailSenderArrCompany, $emailData['receiver'], $emailData['template'], $SMTPCred, false, $emailCCArr, $emailBCCArr);
    // print_rp($emailData);
    // echo "<hr/>";
  } //End foreach
  // print_r($arr);
  // print_r($emailDataArr);
  $res = dbQuery("UPDATE $service_plaining_table SET emailStatus = 'true' WHERE Id IN ($ids)");
  // print_rp($res); 
  if (@$arrSP2 and sizeof($arrSP2) > 0) {
    sendServiceApproveBulkEmail('approve', false, $update, $arrSP2);
  }
  return $res;
  // print_r($res);
} //End if condition

function empTimesheetJsonDataSet($json, $timesheetId)
{
  global $domainPath, $service_timing_table;
  $list = array('clients' => clientList(true), 'serviceType' => serviceList('id AS value, name AS label'));
  $json = json_decode($json, true);
  // print_rp($json);die();
  #Add Start and End Modified time -----------------------------------#
  $modifiedTime = dbQuery("SELECT start_time_mod,end_time_mod FROM $service_timing_table WHERE staff_timesheet_ref_id = '$timesheetId'");
  $modifiedTime = $modifiedTime['data'];
  foreach ($modifiedTime as $k => $v) {
    $json['start_time_mod'][$k + 1] = $v['start_time_mod'];
    $json['end_time_mod'][$k + 1] = $v['end_time_mod'];
    if ($v['start_time_mod']) {
      $json['normal_hour'][$k + 1] = differenceInHours($v['start_time_mod'], $v['end_time_mod'], false);
    } //End if condition
  } //End foreach
  // print_rp($json);die();
  #-----------------------------------------------------------------#
  foreach ($json['client_ref_id'] as $k => $v) {
    $json['client_name'][$k] = $list['clients'][$v]['name'];
  }
  foreach ($json['service_type'] as $k => $v) {
    $json['service_type'][$k] = $list['serviceType'][$v]['name'];
    $json['date'][$k] = date('d-m-Y', strtotime($json['date'][$k]));

    $json['normal_hour'][$k] = $json['normal_hour'][$k] ? $json['normal_hour'][$k] : '00:00';
    $json['weekend_hour_sat'][$k] = $json['weekend_hour_sat'][$k] ? $json['weekend_hour_sat'][$k] : '00:00';
    $json['weekend_hour_sun'][$k] = $json['weekend_hour_sun'][$k] ? $json['weekend_hour_sun'][$k] : '00:00';
    $json['public_holidays_hour'][$k] = $json['public_holidays_hour'][$k] ? $json['public_holidays_hour'][$k] : '00:00';

    $json['total_hour'][$k] = getTotalTimeFromTimeArr(array($json['normal_hour'][$k], $json['weekend_hour_sat'][$k], $json['weekend_hour_sun'][$k], $json['public_holidays_hour'][$k]));
    $json['day_hour_label'][$k] = dayNameLabelForEmpTimeSheet($json['start_time'][$k]);
    $json['client_sign'][$k] = $domainPath . '/files/documents/signatures/client/' . $timesheetId . '-' . $k . '-c.png?k=' . rand();
    $json['staff_sign'][$k] = $domainPath . '/files/documents/signatures/staff/' . $timesheetId . '-' . $k . '-e.png?k=' . rand();
  } //End foreach
  return $json;
} //End function

function dayNameLabelForEmpTimeSheet($startTime)
{
  $hourLabelArr = array(
    array('st' => '06:00:00 am', 'ed' => '06:00:00 pm', 'name' => 'Normal'),
    array('st' => '06:00:00 pm', 'ed' => '12:00:00 am', 'name' => 'Evening'),
    array('st' => '12:00:00 am', 'ed' => '06:00:00 am', 'name' => 'Night'),
  );
  $label = '-';
  foreach ($hourLabelArr as $cv) {
    if (strtotime($startTime) >= strtotime($cv['st']) and strtotime($startTime) <= strtotime($cv['ed'])) {
      $label = $cv['name'];
      break;
    }
  } //End foreach
  return $label;
} //End function


function serviceMissingDateOrDayByFrequencyOrNext($serviceDate, $serviceDay, $frequency, $frequencyWeek, $next = false, $startFromDate = false)
{
  global $server_date;
  if ($frequency === '8') { //@ Daily
    #Next date mean add 1 day more
    $serviceDate = $serviceDate ? $serviceDate : $server_date;
    $sData = $next ? dateIncDecDays($serviceDate) : $serviceDate;
    //! If there is a Future Start Date then set future date as service date 
    if ($next and $startFromDate and dateOrTimeCpr('date', $server_date, '<=', $startFromDate)) {
      $sData = $startFromDate;
    } //End if condition
    $serviceDate = date('d-m-Y', strtotime($sData));
    $serviceDay = date('l', strtotime($sData));
  } //End if condition
  if ($frequency === '9' or $frequency === '12') { //@ On Client Request/Appointment
    $serviceDay = date('l', strtotime($serviceDate));
    if ($next and !$startFromDate) {
      $serviceDate = '';
      $serviceDay = '';
    } //End if condition
  } //End if condition
  if ($frequency === '6') { //@ Weekly
    $nextWeek = (date('l', strtotime($server_date)) === $serviceDay) ? '' : 'next ';
    $serviceDate = date("d-m-Y", strtotime($nextWeek . $serviceDay));
    if ($next and !$startFromDate) {
      $serviceDate = date('d-m-Y', strtotime('+1 week', strtotime($serviceDate)));
    } //End if condition
    //! If there is Service From Date
    if ($next and $startFromDate and dateOrTimeCpr('date', $server_date, '<=', $startFromDate)) {
      $serviceDate = (($serviceDay === date('l', strtotime($startFromDate))) ? date("d-m-Y", strtotime($startFromDate)) : date("d-m-Y", strtotime('next ' . $serviceDay, strtotime($startFromDate))));
    } //End if condition
  } //End if condition
  if ($frequency === '5') { //@ Fortnightly
    if ($startFromDate) {
      $serviceDate = fortnightShiftDateByDayShiftStartDateAndWeek($startFromDate, $serviceDay, $frequencyWeek);
    } else {
      $serviceDate = fortnightShiftDateByDayAndWeek($serviceDay, $frequencyWeek);
    } //End if condition    
    if (dateOrTimeCpr('date', $server_date, '>', $serviceDate)) {
      $serviceDate = date('d-m-Y', strtotime('+2 week', strtotime($serviceDate)));
    } //End if condition
    $serviceDate = date('d-m-Y', strtotime($serviceDate));
    if ($next and !$startFromDate) {
      $serviceDate = date('d-m-Y', strtotime('+2 week', strtotime($serviceDate)));
    } //End if condition
    //@ Old ============================//
    // $serviceDate = fortnightShiftDateByDayAndWeek($serviceDay, $frequencyWeek);
    // if (dateOrTimeCpr('date', $server_date, '>', $serviceDate) and $frequencyWeek === '1') {
    //   $serviceDate = date('d-m-Y', strtotime('+2 week', strtotime($serviceDate)));
    // } //End if condition
    // if (dateOrTimeCpr('date', $server_date, '>', $serviceDate) and $frequencyWeek === '2') {
    //   $serviceDate = date('d-m-Y', strtotime('+2 week', strtotime($serviceDate)));
    // } //End if condition
    // $serviceDate = date('d-m-Y', strtotime($serviceDate));
    // if ($next and !$startFromDate) {
    //   $serviceDate = date('d-m-Y', strtotime('+2 week', strtotime($serviceDate)));
    // } //End if condition
  } //End if condition
  $res = array('service_date' => $serviceDate, 'service_day' => $serviceDay);
  // print_rp($res);
  return $res;
} //End function

// function cronJobCreate($url,$dateAndTime){
//   global $apiKeyCallMyAppCronJob;
//   #Using https://callmyapp.com/ API
//   // $replaceFrom = array(':','/','?','=','&','+');
//   // $replaceTo = array('%3A','%2F','%3F','%3D','%26','%2B');
//   $dateAndTime = date('Y-m-d',strtotime($dateAndTime)).'T'.date('h:i:s',strtotime($dateAndTime)).'+05:00';

//   // $url = str_replace($replaceFrom,$replaceTo,$url);
//   // $dateAndTime = str_replace($replaceFrom,$replaceTo,$dateAndTime);

//   // "http://callmyapp.com/api/1.0/create/?api_key=cma619aead426567&callback_url=http://apihouse.com/demo-callback-endpoint&callback_time=2010-11-28T19:55:00%2B01:00"
//   echo $callBackUrl = "https://callmyapp.com/api/1.0/create?api_key=$apiKeyCallMyAppCronJob&callback_url=$url&callback_time=$dateAndTime&response_format=json";
// }//End function

function serialIncrement($serial, $serialIndex = 1, $increment = 1)
{
  $serial = explode('-', $serial);
  $newVal = $serial[$serialIndex] + $increment;
  #Set increment according to date if available
  if (isset($serial[2])) {
    if ($serial[2] !== date('Y')) {
      $newVal = str_pad(1, 4, 0, STR_PAD_LEFT);
      $serial[2] = date('Y');
    } //End if condition
  } //End if condition
  $serial[$serialIndex] = str_pad($newVal, 4, 0, STR_PAD_LEFT);
  return implode('-', $serial);
} //End if condition

function getNewServicePlainingShiftNumber()
{
  global $service_plaining_table;
  $res = @dbQuery("SELECT shift_no FROM $service_plaining_table ORDER BY id DESC LIMIT 1")['data'][0];
  $shNumber = @$res['shift_no'] ? $res['shift_no'] : 'SPN-' . str_pad(0, 4, 0, STR_PAD_LEFT);
  return serialIncrement($shNumber);
} //End if condition

function getNewIncidentFormNumber()
{
  global $incident_form_table;
  $res = @dbQuery("SELECT form_no FROM $incident_form_table ORDER BY id DESC LIMIT 1")['data'][0];
  $infNumber = @$res['form_no'] ? $res['form_no'] : 'IFN-' . str_pad(0, 4, 0, STR_PAD_LEFT);
  return serialIncrement($infNumber);
} //End if condition

function getNewShiftReplacementNumber()
{
  global $service_plaining_rr_table;
  $res = @dbQuery("SELECT request_no FROM $service_plaining_rr_table ORDER BY id DESC LIMIT 1")['data'][0];
  $srNumber = @$res['request_no'] ? $res['request_no'] : 'SRN-' . str_pad(0, 4, 0, STR_PAD_LEFT);
  return serialIncrement($srNumber);
} //End if condition

function getNewAppointmentNumber()
{
  global $client_appointment_table;
  $res = @dbQuery("SELECT appointment_no FROM $client_appointment_table ORDER BY id DESC LIMIT 1")['data'][0];
  $apNumber = @$res['appointment_no'] ? $res['appointment_no'] : 'APT-' . str_pad(0, 4, 0, STR_PAD_LEFT);
  return serialIncrement($apNumber);
} //End if condition

function getServicePlainingViewDetails($shiftId, $replacedId = false, $editShiftId = false)
{
  global $service_plaining_table, $service_list_table, $dropdown_table, $support_worker_form_table, $users_table, $client_form_table, $service_plaining_rspw_table, $shift_edit_table;
  $arr = dbQuery("
      SELECT 
        sp.id,sp.shift_no,sp.service_date,sp.service_day,sp.frequencyWeek,sp.service_start_time,sp.service_end_time,sp.plaining_type,sp.service_recurring_type,sp.service_from_date,sp.service_to_date,sp.meal_break_min,sp.rest_break_min,sp.inserted_date,sp.inserted_time,sp.updated_date,sp.updated_time,sp.remarks,sp.status,
        dr.name AS frequency_name,dr.id AS frequency_id,
        sp.spw_ref_id, spw_partner_ref_id,
        sr.name AS service_name,
        CONCAT(spw1.first_name,' ',spw1.last_name) AS swp1_name,
        CONCAT(spw2.first_name,' ',spw2.last_name) AS swp2_name,
        CONCAT(ut.first_name,' ',ut.last_name) AS inserted_by,
        CONCAT(IFNULL(utu.first_name,''),' ',IFNULL(utu.last_name,'')) AS updated_by,
        CONCAT(cl.first_name,' ',cl.last_name) AS client_name
      FROM $service_plaining_table AS sp
        INNER JOIN $service_list_table AS sr ON sp.service_ref_id = sr.id
        INNER JOIN $support_worker_form_table AS spw1 ON sp.spw_ref_id = spw1.id
        LEFT JOIN $support_worker_form_table AS spw2 ON sp.spw_partner_ref_id = spw2.id
        INNER JOIN $dropdown_table AS dr ON sp.frequency = dr.id
        INNER JOIN $users_table AS ut ON sp.inserted_by = ut.id
        LEFT JOIN $users_table AS utu ON sp.updated_by = utu.id    
        INNER JOIN $client_form_table AS cl ON sp.client_ref_id = cl.id
        WHERE sp.id = '$shiftId'
        ORDER BY sp.id ASC
    ");
  // print_rp($arr);
  $row = $arr['data'][0];

  #Modified data with replaced details, update spw from old to new replaced one and other details
  if ($replacedId) {
    $replacedData = dbQuery("
        SELECT 
        sp.spw_ref_id,sp.spw_partner_ref_id,sp.service_start_time,sp.service_end_time,sp.meal_break_min,sp.rest_break_min,sp.remarks
        FROM $service_plaining_rspw_table AS sp
        LEFT JOIN $support_worker_form_table AS spw1 ON sp.spw_ref_id = spw1.id
        LEFT JOIN $support_worker_form_table AS spw2 ON sp.spw_partner_ref_id = spw2.id
        WHERE sp.id = '$replacedId'
      ")['data'][0];
    // print_rp($replacedData);
    $row = array_merge($row, $replacedData);
    // print_rp($arr);
  } //End if condition

  #Update Edited fields
  if ($editShiftId) {
    $editShiftData = dbQuery("SELECT id AS shift_edit_ref_id,service_ref_id,service_date,service_start_time,service_end_time,meal_break_min,rest_break_min,remarks FROM $shift_edit_table WHERE id = '$editShiftId'")['data'][0];
    $row = array_merge($row, $editShiftData);
  } //End if condition  
  $row['service_date'] = $row['service_date'] ? date('d-m-Y', strtotime($row['service_date'])) : '';
  $row['inserted_by_date'] = dateFormat($row['inserted_date'], $row['inserted_time']);
  $row['updated_by_date'] = $row['updated_date'] ? dateFormat($row['updated_date'], $row['updated_time']) : '';
  $row['hour'] = timeDiff($row['service_start_time'], $row['service_end_time']);
  $row['plaining_type'] = $row['plaining_type'] === '1' ? 'Regular' : 'Extra';
  $row['status'] = ucwords(str_replace('_', ' ', $row['status']));
  if ($row['frequency_id'] === '5') {
    $row['frequency_name'] = $row['frequency_name'] . ' (Week ' . $row['frequencyWeek'] . ')';
  }
  $arr['data'] = $row;
  // print_rp($arr);
  return $arr;
} //End function

function getAvailability($spw1, $spw2){
  global $support_worker_form_table;
  $data = dbQuery("SELECT id,CONCAT(first_name,' ',last_name) AS name,days_availibility_json FROM $support_worker_form_table WHERE id IN ('$spw1','$spw2')", array('indexAsId' => true))['data'];
  //@ Soft by First and and Second SWs ====//
  $dataMod = array();
  foreach (array($spw1, $spw2) as $v) {
    if (@$data[$v]) {
      $dataMod[] = $data[$v];
    } //End if condition
  } //End foreach
  $data = $dataMod;
  //@======================================//
  $daysList = $data[0]['days_availibility_json'] ? json_decode($data[0]['days_availibility_json'], true) : array();
  $timeList = array();
  $dataMod = array();
  foreach ($data as $d) {
    if ($d['id'] == $spw1) {
      #Check SPW has proper availability or not =====================*/
      $availData = $d['days_availibility_json'];
      $availData = $availData ? json_decode($availData, true) : array();
      if (!@sizeof($availData) > 0) {
        return array('status' => true, 'data' => [], 'noData' => 'true', 'noDataTitle' => 'Support Worker Availability Data NOT Available', 'noDataMsg' => 'Please edit SW Form or force him/her to update availability.');
        die();
        break;
      } //End if condition
      /*==============================================================*/
      $d['index'] = 0;
      $dataMod[0] = $d;
    } //End if condition
    if ($d['id'] == $spw2) {
      #Check SW Partner has proper availability or not
      $availData2 = $d['days_availibility_json'];
      $availData2 = $availData2 ? json_decode($availData2, true) : array();
      if (!@sizeof($availData2) > 0) {
        return array('status' => true, 'data' => [], 'noData' => 'true', 'noDataTitle' => 'SW Partner Availability Data NOT Available', 'noDataMsg' => 'Please edit SW Form or force him/her to update availability.');
        die();
        break;
      } //End if condition  
      /*==============================================================*/
      $d['index'] = 1;
      $dataMod[1] = $d;
    } //End if condition
  } //End foreach

  $daysList = $daysList['day'];
  $names = array($data[0]['name'], @$data[1]['name']);
  // print_rp($data);

  $data = sort_multidimensional_array_by_key($dataMod, 'index');
  foreach ($data as $key => $value) {
    $value['days_availibility_json'] = json_decode($value['days_availibility_json'], true);
    #Make 'Not Available'	key as true when 'from' or 'to' is missing
    foreach ($value['days_availibility_json']['from'] as $key => $vl) {
      if ($value['days_availibility_json']['from'][$key] == '-' or $value['days_availibility_json']['to'][$key] == '-') {
        $value['days_availibility_json']['not_available'][$key] = true;
      } //End if condition
    }
    #--------------------------------------------------------------#
    $hideNotAvailTiming = true; //! If we want to Hide not available timing then "false" it
    //@ Set days list
    if (!$hideNotAvailTiming and @$value['days_availibility_json']['not_available']) {
      foreach ($value['days_availibility_json']['not_available'] as $ky => $vl) {
        if ($vl == '1') {
          $daysList[$ky] = '-';
        } //End if condition
      } //End foreach
    } //End if condition

    #Set time list
    foreach ($value['days_availibility_json']['from'] as $ky => $vl) {
      if ($vl != '-' and $vl != '') {
        $timeList[$ky] = @$timeList[$ky] . '(%)' . $vl . ' to ' . $value['days_availibility_json']['to'][$ky];
      } else {
        $timeList[$ky] = '-';
      } //End if condition
    } //End foreach
    //$data[$key] = $value;
  } //End foreach

  if (!$hideNotAvailTiming) {
    foreach ($daysList as $k => $v) {
      if ($v === '-') {
        unset($daysList[$k]);
        unset($timeList[$k]);
      }
    } //End foreach
  } //End if condition

  $daysList = array_values($daysList);
  $timeList = array_values($timeList);

  if ($spw2) {
    foreach ($timeList as $ky => $vl) {
      if (isset($daysList[$ky])) {
        $timeList[$ky] = explode('(%)', $timeList[$ky]);
        unset($timeList[$ky][0]);
        $timeList[$ky] = implode('(%)', $timeList[$ky]);
      } else {
        unset($timeList[$ky]);
      } //End if condition
    } //End foreach
  } else {
    foreach ($timeList as $k => $v) {
      $v = explode('(%)', $v);
      $timeList[$k] = @$v[1] ? $v[1] : '-';
    } //End foreach
  } //End if condition

  #Make dropdown list for Front-End
  foreach ($daysList as $k => $v) {
    $daysList[$k] = array('label' => $v, 'value' => $v);
    $dayMearge[$v] = $timeList[$k];
  } //End foreach
  // print_rp($daysList);
  // print_rp($timeList);
  // print_rp($dayMearge);
  // print_rp($names);
  return array('status' => true, 'data' => array('dayList' => $daysList, 'timeList' => $timeList, 'dayMearge' => $dayMearge, 'names' => $names), 'noData' => 'false');
} //End function

// function getReplacementRequestedShiftDate($servicePlainingId,$sp1RefId,$sp2RefId){
//   global $service_timing_table,$service_plaining_table,$server_date;
//   #Get Frequency from Service Plaining Table
//   $spData = dbQuery("SELECT frequency,service_day,service_date FROM $service_plaining_table WHERE id = '$servicePlainingId'")['data'][0];
//   #Get last shift data of Requested Shift for Replacement
//   $lastShiftDate = @dbQuery("SELECT inserted_date FROM $service_timing_table WHERE service_plaining_ref_id = '".$servicePlainingId."' AND (service_done_by_spw_ref_id = '".$sp1RefId."' OR service_done_by_spw_ref_id = '".$sp2RefId."') ORDER by id DESC LIMIT 1")['data'][0]['inserted_date'];
//   // $lastShiftDate = ($lastShiftDate ? $lastShiftDate : $server_date);

//   if($spData['frequency'] === '8'){//Daily
//     if($lastShiftDate === $server_date){//If it's last shift was Today, then it's mean request is for Tomorrow
//       $dateForReplacement = dateIncDecDays($server_date);
//     }else{//If the last shift was in the past date, it's mean the request is for Today
//       $dateForReplacement = $server_date;
//     }//End if condition
//   }//End if condition

//   if($spData['frequency'] === '6'){//Weekly
//     if($lastShiftDate === $server_date){//If it's last shift was Today, then it's mean request is for next week
//       $dateForReplacement = date("Y-m-d", strtotime('next '.$spData['service_day']));
//     }else{//If the last shift was in the past date, it's mean the request is for Today or for upcoming service day
//       $dateForReplacement = date("Y-m-d", strtotime($spData['service_day']));
//     }//End if condition
//   }//End if condition

//   if($spData['frequency'] === '5'){//Fortnightly
//     if($lastShiftDate === $server_date){//If it's last shift was Today, then it's mean request is for next to next week
//       $dateForReplacement = date("Y-m-d", strtotime('second '.$spData['service_day']));
//     }else{//If the last shift was in the past date, it's mean the request is for Today or for after next two week at service day
//       $dateForReplacement = date('Y-m-d',strtotime('+2 week',strtotime($lastShiftDate)));
//     }//End if condition
//   }//End if condition

//   if($spData['frequency'] === '9' or $spData['frequency'] === '12'){//On Client Request/Appointment
//     $dateForReplacement = $spData['service_date'];
//   }//End if condition

//   return $dateForReplacement;
// }//End function

function checkShiftBetweenSelectedTime($spwId, $spwPartnerId, $frequency, $serviceDate, $serviceDay, $startTime, $endTime, $startFromDate = false, $startToDate = false, $shiftIdIfEdit = ''){
  global $service_plaining_table, $shift_edit_table, $dropdown_table, $server_date;
  //@ If date id give then get day
  if ($serviceDate) {
    $serviceDay = date('l', strtotime($serviceDate));
  } //End if condition
  //@ Check in Service Plaining
  #Getting shifts
  $query = "
      SELECT 
      sp.id,sp.spw_ref_id,sp.spw_partner_ref_id,sp.shift_no,sp.service_start_time,sp.service_end_time,sp.service_date,sp.service_day,sp.frequency,
      dr.name AS frequency_name,sp.service_from_date,sp.service_to_date
      FROM $service_plaining_table AS sp
      INNER JOIN $dropdown_table AS dr ON sp.frequency = dr.id
      WHERE status = 'approve' AND 
    ";
  if ($spwPartnerId) {
    $query .= "((sp.spw_ref_id = '$spwId' AND sp.spw_partner_ref_id = '$spwPartnerId') OR (sp.spw_ref_id = '$spwPartnerId' OR sp.spw_partner_ref_id = '$spwPartnerId'))";
  } else {
    $query .= "(sp.spw_ref_id = '$spwId' OR sp.spw_partner_ref_id = '$spwId')";
  } //End if condition
  #Get day by date
  if ($serviceDate) {
    $serviceDate = date('d-m-Y', strtotime($serviceDate));
    $query .= " AND (sp.service_date = '$serviceDate' OR sp.service_date = '')";
  } //End if condition
  if ($serviceDay) {
    $query .= " AND sp.service_day = '$serviceDay'";
  } //End if condition
  if ($shiftIdIfEdit) {
    $query .= " AND  sp.id != '$shiftIdIfEdit'";
  } //End if condition
  // echo $query;
  // die();
  $spData = dbQuery($query)['data'];
  // print_rp($spData);
  $crossArr = array();
  foreach ($spData as $v) {
    $serviceDate = $serviceDate ? $serviceDate : ''; //Avoid false or null etc
    $serviceDay = $serviceDate ? date('l', strtotime($serviceDate)) : '';
    //Skip "On Client Request/Appointment" if it's in past
    if (($v['frequency'] === '9' or $v['frequency'] === '12') and dateOrTimeCpr('date', @$v['service_date'], '<', $server_date)) {
      continue;
    } //End if condition

    //@ Checking Service Start From and To Date
    $startToDateComp = $startToDate ? $startToDate : date('d-m-Y', strtotime($startFromDate . ' + 1000 days'));
    $v['service_to_date_comp'] = $v['service_to_date'] ? $v['service_to_date'] : date('d-m-Y', strtotime($v['service_from_date'] . ' + 1000 days'));
    $betweenInShiftRange = twoDatesCprBet(array($startFromDate, $startToDateComp), array($v['service_from_date'], $v['service_to_date_comp']));

    //@ Checking Service Start and End Time
    $st1 = dateOrTimeCpr('time', $startTime, '>=', $v['service_end_time']);
    $st2 = (dateOrTimeCpr('time', $startTime, '<=', $v['service_start_time']) and dateOrTimeCpr('time', $endTime, '<=', $v['service_start_time']));
    $timeCrossing = !($st1 or $st2); //@ Crossing The Time

    // print_rp($v);
    // print_rp(array($v['service_from_date'], $v['service_to_date']));
    // print_rp(array($startFromDate,$startToDate));
    // echo $betweenInShiftRange ? ' | True | ' : ' | False | ';
    // echo $timeCrossing ? ' | True | ' : ' | False | ';
    // echo ($betweenInShiftRange AND $timeCrossing) ? '  =  True = ' : ' = False = ';

    if (
      $betweenInShiftRange and
      $timeCrossing
      //  or (($v['frequency'] === '9' or $v['frequency'] === '12') and $v['service_date'] === $serviceDate and $v['service_day'] === @$serviceDay)
    ) {
      $crossArr[$v['id']] = $v;
    } //End if condition
  } //End foreach
  // print_rp($crossArr);

  //@Avoid Deleted Shift from '$crossArr'
  if ($frequency === '9' or $frequency === '12') { //?"On Client Request/Appointment"
    $serviceDate = date('Y-m-d', strtotime($serviceDate));
    $deletedDataCondition = array();
    foreach ($crossArr as $v) {
      $deletedDataCondition[] = "(service_plaining_ref_id = '" . $v['id'] . "' AND current_service_date = '" . $serviceDate . "')";
    } //End foreach
    //?Check array size first then get data from DB because empty array makes query error
    $deletedData = (sizeof($deletedDataCondition) > 0) ? dbQuery("SELECT id,service_plaining_ref_id FROM $shift_edit_table WHERE delete_recover_status = 'deleted' AND (" . implode(' OR ', $deletedDataCondition) . ")")['data'] : array();
    foreach ($deletedData as $k => $v) {
      if ($crossArr[$v['service_plaining_ref_id']]) {
        unset($crossArr[$v['service_plaining_ref_id']]);
      } //End if condition
    } //End foreach
  } //End if condition
  $crossArr = array_values($crossArr);

  //@ Checked in Replaced Shifts
  //@ ......... pending
  $res = array('status' => true, 'data' => $crossArr, 'errorTitle' => 'Shift Timing Error', 'errorMsg' => 'Selected timing is not available because some shift already assigned in selected time duration.');
  if (sizeof($crossArr) > 0) {
    $res['timeCrossError'] = true;
  } else {
    $res['timeCrossError'] = false;
  } //End if condition
  // print_rp($res);die();
  return $res;
} //End function

function getCompanyWithBranches($companyId = false,$col = 'id AS value,company_name AS label,branches_ref_ids'){
  global  $companies_table, $branches_table;
  $query = "SELECT $col FROM $companies_table";
  if($companyId){$query .= " WHERE id = '$companyId'";}
  $dt = dbQuery($query);
  $branchesIdsArr = array();
  foreach($dt['data'] as $k => $v){
    if($v['branches_ref_ids']){
      $v['branches_ref_ids'] = explode(',',$v['branches_ref_ids']);
      $branchesIdsArr = array_merge($branchesIdsArr,$v['branches_ref_ids']);
    }//End if condition
    $dt['data'][$k] = $v;
  }//End foreach
  $branches = dbQuery("SELECT id AS value, branch AS label FROM $branches_table WHERE id IN(".implode(',',$branchesIdsArr).")",array('indexAsId' => 'value'));
  foreach($dt['data'] as $k => $v){
    if($v['branches_ref_ids']){
      $branchesData = array();
      foreach($v['branches_ref_ids'] as $vl){$branchesData[] = $branches['data'][$vl];}//foreach
      $v['branches'] = $branchesData;
      $dt['data'][$k] = $v;
    }//End if condition
  }//End foreach
  return $dt;
}//End function

function getCompanyListWithBranches(){
  global  $companies_table, $branches_table;
  $dt = dbQuery("SELECT id,company_name,branches_ref_ids FROM $companies_table");
  $branchesIdsArr = array();
  foreach($dt['data'] as $k => $v){
    if(@$v['branches_ref_ids']){
      $v['branches_ref_ids'] = explode(',',$v['branches_ref_ids']);
      $branchesIdsArr = array_merge($branchesIdsArr,$v['branches_ref_ids']);
    }//End if condition
    $dt['data'][$k] = $v;
  }//End foreach
  // print_rp($branchesIdsArr);
  $branches = (sizeof($branchesIdsArr) > 1) ? dbQuery("SELECT id,branch FROM $branches_table WHERE id IN(".implode(',',$branchesIdsArr).")",array('indexAsId' => 'id'))['data'] : array();
  $list = array();
  foreach($dt['data'] as $k => $v){
    if($v['branches_ref_ids']){
      // $branchesData = array();
      foreach($v['branches_ref_ids'] as $vl){
        $list[] = array('value' => $v['id'] . '=>' . $vl, 'label' => $v['company_name'] . ' - ' . $branches[$vl]['branch']);
      }//foreach
    } else {
      $list[] = array('value' => $v['id'], 'label' => $v['company_name']);
    }//End if condition
  }//End foreach
  return $list;
}//End function

function getDefaultCompany(){
  global $companies_table, $domainPath;
  $defaultCompany = dbQuery("SELECT * FROM $companies_table WHERE is_default = 'true'")['data'][0];
  $defaultCompany['company_logo'] = $domainPath.'/files/uploads/companies_logo/'.$defaultCompany['company_logo'];
  return $defaultCompany;
}//End function

function getUserCompanyWithBranches($companyIds,$branchesIds){
  global  $companies_table, $branches_table;
  $comList = dbQuery("SELECT id,company_name,branches_ref_ids FROM $companies_table WHERE id IN(".$companyIds.")")['data'];
  $brnList = @dbQuery("SELECT id,branch FROM $branches_table WHERE id IN(".$branchesIds.")")['data'];
  $i = 0;
  $companyList = array();
  foreach($comList as $key => $vl){
    if($brnList AND $vl['branches_ref_ids']){
      foreach($brnList as $v){
        if(array_search($v['id'],explode(',',$vl['branches_ref_ids'])) !== FALSE){
          $companyList[$i]['company_name'] = $vl['company_name'].' - ('.$v['branch'].')';
          $companyList[$i]['id'] = $vl['id'].'=>'.$v['id'];
          $i++;
        }//End if condition
      }//End foreach
    }else{
      $companyList[$i]['company_name'] = $vl['company_name'];
      $companyList[$i]['id'] = $vl['id'].'=>';
      $i++;
    }//End if condition
  }//End foreach
  return $companyList;
}//End function

function getSWManagerList($companyAndBranchId){
  global $users_table;
  $dt = explode('=>',$companyAndBranchId);
  $company_ref_id = $dt[0];
  $branch_ref_id = $dt[1];
  $query = "SELECT id AS value, CONCAT(first_name,' ',last_name) AS label FROM $users_table WHERE is_manager = 'true' AND company_ref_ids LIKE '%($company_ref_id)%'";
  if($branch_ref_id){
    $query .= " AND branch_ref_ids LIKE '%($branch_ref_id)%'";
  }//End if condition
  // echo $query;
  $res = dbQuery($query);
  return $res;
}//end function

function getSWCompany($swRefId){
  global $support_worker_form_table;  
  $res = dbQuery("SELECT company_ref_id,branch_ref_id FROM $support_worker_form_table WHERE id = '$swRefId'")['data'][0];
  return $res;
}//end function

function fileExtensionIcon($fileNameOrWithPath){
  $ext = explode('.',$fileNameOrWithPath);
  $ext = $ext[sizeof($ext)-1];
  $icon = '';
  if($ext === 'pdf'){$icon = 'las la-file-pdf';}
  if($ext === 'xls' OR $ext === 'xlsx'){$icon = 'las la-file-excel';}
  if($ext === 'doc' OR $ext === 'docx'){$icon = 'las la-file-word';}
  if($ext === 'zip'){$icon = 'las la-file-archive';}
  if($ext === 'jpg' OR $ext === 'jpeg' OR $ext === 'png' OR $ext === 'gif'){$icon = 'las la-file-image';}
  return $icon;
}//End function

//@ Start - Email Module Functions =============================================================//
function sendEmail(
  $moduleRefId,//@ Module Ref id e.g. Support Worker
  $subModuleRefId,//@ Sub-Module Ref id e.g. On Form Submit
  $sectionName = '',//@ Section Name means Admin/sw etc (Email is for admin or SW - Could be anything)
  $attachmentFileArrWithPathAndName = false,//@ Attached file is available or not
  $tagConvertTableId = false,//@ Id of row to convert the tags into actual values
  $tagConvertCompanyTableId = false,//@ Id of company to convert company tags into actual value
  $sendTestArr = false//@ Test array must include templateId and receiverEmail to send test email
){
  global $email_sender_receiver_table, $email_delivery_servers_table, $email_template_table, $email_module_main_table, $email_sent_list, $company_preset_title_ref_id,$companies_table,$server_date,$server_time;
  $emailData = array();
  
  //@Getting Sender and Receiver Email
  $emailData['senderReceiver'] = dbQuery("SELECT * FROM $email_sender_receiver_table WHERE module_ref_id = '$moduleRefId' AND sub_module_ref_id = '$subModuleRefId' AND section_ref_name = '$sectionName'")['data'][0];
  //@Getting Delivery Server
  $dsQuery = "SELECT * FROM $email_delivery_servers_table WHERE ".(($emailData['senderReceiver']['default_ds'] === 'true') ? "default_status = 'true'" : "id = '".$emailData['senderReceiver']['ds_ref_id']."'");
  $emailData['deliveryServer'] = dbQuery($dsQuery)['data'][0];
  //@Getting Template - If there is a test email then get Template by given ID otherwise default
  $edQuery = "SELECT * FROM $email_template_table WHERE module_ref_id = '$moduleRefId' AND sub_module_ref_id = '$subModuleRefId' AND section_ref_name = '$sectionName' AND ".(($sendTestArr AND $sendTestArr['templateId']) ? "id = '".$sendTestArr['templateId']."'" : "default_status = 'true'");
  $emailData['template'] = dbQuery($edQuery)['data'][0];
  
  //? If there is a test email then change receiver
  if($sendTestArr){
    $emailData['senderReceiver']['receiver_email'] = $sendTestArr['receiverEmail'];
  }//End If Condition

  //@Getting Data for Tag conversion
  if($tagConvertTableId OR $sendTestArr){
    require_once('../apis/reporting/reportingFunctions.php');
    //# Module tag and conversion
    $reportTitleRefIdForTags = dbQuery("SELECT report_title_ref_id FROM $email_module_main_table WHERE id = '$moduleRefId'")['data'][0]['report_title_ref_id'];
    $tagData = getTableDataListWithPreset(false,$reportTitleRefIdForTags,($sendTestArr ? 'sampleValue' : $tagConvertTableId));
    $emailData['tagConvertData'] = $tagData['data'][0];
    // print_rp($emailData['tagConvertData']);die();
    //# Add/Marge Company Tag and Tag Data
    if(!$tagConvertCompanyTableId){$tagConvertCompanyTableId = dbQuery("SELECT id FROM $companies_table WHERE is_default = 'true'")['data'][0]['id'];}//End if condition
    $companyTagData = getTableDataListWithPreset(false,$company_preset_title_ref_id,($sendTestArr ? 'sampleValue' : $tagConvertCompanyTableId));
    // print_rp($companyTagData['data'][0]);die();
    $emailData['tagConvertData'] = array_merge($emailData['tagConvertData'],$companyTagData['data'][0]);
    $tagData['presetData']['col_data'] = array_merge($tagData['presetData']['col_data'],$companyTagData['presetData']['col_data']);

    $tags = $tagData['presetData']['col_data'];
    // print_rp($tags);die();
  }//End if condition
  //@Setting Variables for Sending Email
  //#Setting Sender 
  $senderArr = array(
    'name' => tagConvertEmail($emailData['senderReceiver']['from_name'],@$emailData['tagConvertData'],@$tags),
    'email' => tagConvertEmail($emailData['senderReceiver']['from_email'],@$emailData['tagConvertData'],@$tags),
    'reply-to-name' => tagConvertEmail($emailData['senderReceiver']['reply_to_name'],@$emailData['tagConvertData'],@$tags),
    'reply-to-email' => tagConvertEmail($emailData['senderReceiver']['reply_to_email'],@$emailData['tagConvertData'],@$tags)
  );
  //#Setting Receiver 
  $receiverArr = array();
  $emailData['senderReceiver']['receiver_name'] = tagConvertEmail($emailData['senderReceiver']['receiver_name'],@$emailData['tagConvertData'],@$tags);
  $emailData['senderReceiver']['receiver_email'] = tagConvertEmail($emailData['senderReceiver']['receiver_email'],@$emailData['tagConvertData'],@$tags);
  $receiverNameData = explode(',',$emailData['senderReceiver']['receiver_name']);
  $receiverEmailData = explode(',',$emailData['senderReceiver']['receiver_email']);
  foreach($receiverEmailData as $k => $v){
    //?Check valid email
    if (filter_var($receiverEmailData[$k])) {
      //? if email is valid then check name
      //? If Name is exists then add email with name otherwise just add email
      $receiverArr[] = @$receiverNameData[$k] ? array('name' => $receiverNameData[$k],'email' => $receiverEmailData[$k]) : array('email' => $receiverEmailData[$k]);
    }//End if condition
  }//End foreach
  //#Set Template
  // print_rp(tagConvertEmail($emailData['senderReceiver']['subject'],@$emailData['tagConvertData'],@$tags));die();
  $body = tagConvertEmail($emailData['template']['template'],@$emailData['tagConvertData'],@$tags);
  $content = array(
    'subject' => tagConvertEmail($emailData['senderReceiver']['subject'],@$emailData['tagConvertData'],@$tags),
    'body' => $body,
    'plaintext' => strip_tags($body),
  );
  // print_rp($content);die();
  //#Set SMTP Array
  $SMTPArray = array(
    'host' => $emailData['deliveryServer']['host'],
    'username' => $emailData['deliveryServer']['username'],
    'password' => $emailData['deliveryServer']['password'],
    'SMTPSecure' => $emailData['deliveryServer']['smtp_secure'],
    'port' => $emailData['deliveryServer']['port']
  );
  //#Set Attachment
  $attachment = false;
  if($emailData['senderReceiver']['send_attachment']){
    //?Attachment required array as 'path' and 'name'
    $attachment = $attachmentFileArrWithPathAndName ? $attachmentFileArrWithPathAndName : false;
  }//End if condition
  //#Set Cc Email(s)
  $addCC = array();
  if($emailData['senderReceiver']['is_cc']){
    $emailData['senderReceiver']['cc_name'] = tagConvertEmail($emailData['senderReceiver']['cc_name'],@$emailData['tagConvertData'],@$tags);
    $emailData['senderReceiver']['cc_email'] = tagConvertEmail($emailData['senderReceiver']['cc_email'],@$emailData['tagConvertData'],@$tags);
    $ccNameData = explode(',',$emailData['senderReceiver']['cc_name']);
    $ccEmailData = explode(',',$emailData['senderReceiver']['cc_email']);
    foreach($ccEmailData as $k => $v){
      //?Check valid email
      if (filter_var($ccEmailData[$k])) {
        //? if email is valid then check name
        //? If Name is exists then add email with name otherwise just add email
        $addCC[] = @$ccNameData[$k] ? array('name' => $ccNameData[$k],'email' => $ccEmailData[$k]) : array('email' => $ccEmailData[$k]);
      }//End if condition
    }//End foreach
  }//End if condition
  //#Set Bcc Email(s)
  $addBCC = array();
  if($emailData['senderReceiver']['is_bcc']){
    $emailData['senderReceiver']['bcc_name'] = tagConvertEmail($emailData['senderReceiver']['bcc_name'],@$emailData['tagConvertData'],@$tags);
    $emailData['senderReceiver']['bcc_email'] = tagConvertEmail($emailData['senderReceiver']['bcc_email'],@$emailData['tagConvertData'],@$tags);
    $bccNameData = explode(',',$emailData['senderReceiver']['bcc_name']);
    $bccEmailData = explode(',',$emailData['senderReceiver']['bcc_email']);
    foreach($bccEmailData as $k => $v){
      //?Check valid email
      if (filter_var($bccEmailData[$k])) {
        //? if email is valid then check name
        //? If Name is exists then add email with name otherwise just add email
        $addBCC[] = @$bccNameData[$k] ? array('name' => $bccNameData[$k],'email' => $bccEmailData[$k]) : array('email' => $bccEmailData[$k]);
      }//End if condition
    }//End foreach
  }//End if condition

  $res = emailPHPMailer($senderArr,$receiverArr,$content,$SMTPArray,$attachment,$addCC,$addBCC);
  $sentStatus = $res['status'] ? 'sent' : 'failed';
  
  if(!$sendTestArr){
    $post_list = array(
      'subject' => $content['subject'],
      'content' => $content['body'],
      'plaintext' => $content['plaintext'],
      'module_ref_id' => $emailData['template']['module_ref_id'],
      'sub_module_ref_id' => $emailData['template']['sub_module_ref_id'],
      'section_ref_name' => $emailData['template']['section_ref_name'],
      'template_ref_id' => $emailData['template']['id'],
      'ds_ref_id' => $emailData['deliveryServer']['id'],
      'from_name' => $senderArr['name'],
      'from_email' => $senderArr['email'],
      'reply_to_name' => $senderArr['reply-to-name'],
      'reply_to_email' => $senderArr['reply-to-email'],
      'receiver_name' => $emailData['senderReceiver']['receiver_name'],
      'receiver_email' => $emailData['senderReceiver']['receiver_email'],
      'cc_name' => $emailData['senderReceiver']['cc_name'],
      'cc_email' => $emailData['senderReceiver']['cc_email'],
      'bcc_name' => $emailData['senderReceiver']['bcc_name'],
      'bcc_email' => $emailData['senderReceiver']['bcc_email'],
      'send_attachment' => $attachment ? json_encode($attachment) : '',
      'sent_status' => $sentStatus,
      'sent_date' => $server_date,
      'sent_time' => $server_time,
      'status' => 'active',
      'failed_reason' => @$res['errorMsg']
    );
    $res['db-status'] = dbQuery("post",$post_list,$email_sent_list);
  }//End if condition
  
  return $res;  
}//End function

function tagConvertEmail($content,$tagsData,$tags){
  $keys = array();
  $values = array();
  //@Get conditional variables in $matches variable
  preg_match_all('#\%\[(.*?)\]\%#', $content, $matches);
  $matches = $matches[1];
  foreach ($tags as $tag) {
    $value = @trim($tagsData[$tag['colName']]);
    $value = ($value AND $value !== '-') ? $value : '';
    $keys[] = $tag['tag'];
    $values[] = $value;
    //@============================================================================================
    //#Check condition that variable is available or not
    //#Variable in Narration must set like this %[Term ${{term_days}}-Days || term not found]%
    foreach($matches as $vl){
      if (strpos($vl, $tag['tag']) !== false) {
        $e = explode('||',$vl);
        $e = $value ? @$e[0] : @$e[1];
        $content = str_replace(array($vl,'%[',']%'),array($e,'',''),$content);
      }//End if condition
    }//End foreach
    //@============================================================================================
  }//End foreach
  $content = str_replace($keys,$values,$content);//Convert all variables into values
  $content = str_replace(array(', ,',',,',' ,'), array(', ',',',','), $content);//Remove extra space with comma, if this available
  $content = trim(preg_replace('/\s\s+/', ' ', str_replace("\n", " ", $content)));//Remove all extra spaces
  return $content;
}//End function

function sentTestEmail($data){
  $missingValArr = array('status' => false, 'errorTitle' => 'Error');
  //@ SMTP Cred
  if(!@$data['host']){ $missingValArr['errorMsg'] = 'Host is missing';return $missingValArr;}//End if condition
  if(!$data['username']){$missingValArr['errorMsg'] = 'Username is missing';return $missingValArr;}//End if condition
  if(!$data['password']){$missingValArr['errorMsg'] = 'Password is missing';return $missingValArr;}//End if condition
  if(!$data['port']){$missingValArr['errorMsg'] = 'Port is missing';return $missingValArr;}//End if condition
  if(!$data['smtp_secure']){$missingValArr['errorMsg'] = 'SMTP Secure is missing';return $missingValArr;}//End if condition
  //@ Test Cred
  if(!$data['test_sender_name']){$missingValArr['errorMsg'] = 'Sender Name is missing';return $missingValArr;}//End if condition
  if(!$data['test_sender_email']){$missingValArr['errorMsg'] = 'Sender Email is missing';return $missingValArr;}//End if condition
  if(!$data['test_send_to']){$missingValArr['errorMsg'] = 'Receiver Email is missing';return $missingValArr;}//End if condition

  $senderArr = array('name' => $data['test_sender_name'], 'email' => $data['test_sender_email']);
  $receiverArr = array(array('email' => $data['test_send_to']));
  $body = 'Test Email by delivery server named as '.$data['name'];
  $content = array(
      'subject' => 'Test Email by DS - '.$data['name'],
      'body' => $body,
      'plaintext' => strip_tags($body),
  );
  $SMTPArray = array(
      'host' => $data['host'],
      'username' => $data['username'],
      'password' => $data['password'],
      'SMTPSecure' => $data['smtp_secure'],
      'port' => $data['port']
  );
  $res = emailPHPMailer($senderArr,$receiverArr,$content,$SMTPArray);
  // $res['email_admin_res'] = sendEmail('1','1','admin',$attachedFile,$insertedId);
  return $res;
}//End function
//@ End - Email Module Functions ===============================================================//


?>