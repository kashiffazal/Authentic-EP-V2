<?php
  $currentYear = date('Y');
  $query = "
    SELECT st.id,st.spw_ref_id, CONCAT(sw.first_name,' ',sw.last_name) AS sp_name,st.inserted_date,
    GROUP_CONCAT(st.inserted_date SEPARATOR '(%)') AS date
    FROM $service_timing_table AS st
    INNER JOIN $support_worker_form_table AS sw ON st.spw_ref_id = sw.id
    WHERE st.inserted_date LIKE '$currentYear%'
    GROUP BY st.spw_ref_id
  ";
  $pdo_res = executePDO($query);
  $arr = array();
	$i = 1;
	while($row = $pdo_res['data']->fetch()){
     $dt = explode('(%)',$row['date']);//Explode dates
    $month = array();
    foreach($dt as $v){$month[] = explode('-',$v)[1];}
    $allMonths = array('01','02','03','04','05','06','07','08','09','10','11','12');
    $rowData = array();
    foreach($allMonths as $v){
      $row['month'] = $v;
      $row['month-name'] = date("F", mktime(0, 0, 0, $v, 10)).' '.$currentYear;
      $row['count'] = 0;
      if(array_search($v,$month) !== false){
        $row['count'] = array_count_values($month)[$v];
      }
      $rowData[] = $row;
    }
    $arr = array_merge($arr,$rowData);
		$i++;
	}//End while loop	
?>