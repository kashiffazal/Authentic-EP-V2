<?php

  function getTimeSheetList($status){
    global $timesheet_staff_table,$users_table,$session_user_id,$domainPath,$statusDataGlobal;
    $query = "
      SELECT 
      tce.id,tce.fortnightStartDate,tce.fortnightEndDate,tce.normal_hour,tce.weekend_hour_sat,tce.weekend_hour_sun,tce.public_holidays_hour,tce.status,tce.inserted_date,tce.inserted_time,tce.updated_date,tce.updated_time,
      CONCAT(ut.first_name,' ',ut.last_name) AS swp_name
      FROM $timesheet_staff_table AS tce
      INNER JOIN $users_table AS ut ON ut.id = tce.inserted_by
      WHERE tce.status = '$status'
    ";
    if(@$_SESSION['link_id']){$query .= " AND tce.inserted_by = '$session_user_id'";}
        
    $pdo_res = executePDO($query);
    // print_rp($pdo_res);
    $arr = array();
    $i = 1;
    while($row = $pdo_res['data']->fetch()){
      $row['fortnightStartDate'] = date('jS M Y',strtotime($row['fortnightStartDate']));
      $row['fortnightEndDate'] = date('jS M Y',strtotime($row['fortnightEndDate']));
  
      if($row['normal_hour']){$row['th'] = $row['normal_hour'];}
      if($row['weekend_hour_sat']){$row['th'] = $row['weekend_hour_sat'];}
      if($row['weekend_hour_sun']){$row['th'] = $row['weekend_hour_sun'];}
      if($row['public_holidays_hour']){$row['th'] = $row['public_holidays_hour'];}
      $row['th'] =  number_format(array_sum(explode(',',$row['th'])), 2, '.', '').' hr(s)';
  
      $lastUpdate = $row['updated_date'] ? $row['updated_date'].', '.$row['updated_time'] : $row['inserted_date'].', '.$row['inserted_time'];
      $row['lastUpdate'] = date('jS M Y, h:m:s a',strtotime($lastUpdate));
      $row['pdf_path'] = $domainPath.'/files/documents/timesheets/staff/'.$row['id']."-staff-timesheet-".($row['updated_date'] ? $row['updated_date'] : $row['inserted_date']).'.pdf?k='.rand();
      $row['key'] = $i;
      unset($row['inserted_date']);
      unset($row['inserted_time']);
      unset($row['updated_date']);
      unset($row['updated_time']);
  
      $arr[] = $row;
      $i++;
    }//End while loop
    
    $statusList = array(
      'unapproved' => array('name' => 'Unsigned', 'icon' => $statusDataGlobal['unapproved']['icon'], 'mobileIcon' => $statusDataGlobal['unapproved']['mobileIcon'], 'color' => $statusDataGlobal['unapproved']['color']),
      'approved' => array('name' => 'Signed', 'icon' => $statusDataGlobal['approved']['icon'], 'mobileIcon' => $statusDataGlobal['approved']['mobileIcon'], 'color' => $statusDataGlobal['approved']['color'])
    );  

    return array('status' => true, 'data' => array_reverse($arr), 'statusList' => $statusList);
  }//End function

?>