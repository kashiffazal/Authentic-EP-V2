<?php

	$query = "
		SELECT 
		swt.id,swt.first_name,swt.last_name,swt.teamPosition,swt.otherLanguageSpeak,swt.bornCountry,swt.aboutExperience,swt.description,swt.profileImg,swt.teamStatus,swt.inserted_date,swt.inserted_time,swt.updated_date,swt.updated_time,
		ut.first_name AS inserted_by_first_name,
        ut.last_name AS inserted_by_last_name,
        IFNULL(utu.first_name,'') AS updated_by_first_name,
		IFNULL(utu.last_name,'') AS updated_by_last_name,
		ct.name AS bornCountryName
		FROM $support_worker_form_table AS swt
		INNER JOIN $users_table AS ut ON swt.inserted_by = ut.id
		LEFT JOIN $users_table AS utu ON swt.updated_by = utu.id
		INNER JOIN $dropdown_country_table AS ct ON swt.bornCountry = ct.id
		WHERE COALESCE(swt.isTeamMember, '') = 'true'
	";
	
	$active = AccessControl('12');
	$delete = AccessControl('16');	
	$query .= ($active AND $delete) ? '' : '';
	$query .= (!$active && $delete) ? "AND swt.teamStatus = 'deleted' " : '';
	$query .= ($active && !$delete) ? "AND swt.teamStatus = 'active' " : '';
	$query .= (!$active && !$delete) ? "AND swt.teamStatus = 'dummy' " : '';
	$query .= 'ORDER BY swt.teamStatus ASC, swt.id ASC';
	//echo $query;
	//die();

	$status = array(
		'active' => array('name' => 'Active', 'icon' => 'las la-check-circle'),
		'deleted' => array('name' => 'Deleted', 'icon' => 'las la-times-circle')
	);

	$pdo_res = executePDO($query);
	//print_r($pdo_res);
    $arr = array();
	$i = 1;
	$imgPath = $domainPath.'/files/uploads/supportWorkerProfile/';
	while($row = $pdo_res['data']->fetch()){
        $row['key'] = $i;
        $row['name'] = $row['first_name'].' '.$row['last_name'];
				$row['profileImg'] = $row['profileImg'] ? $imgPath.$row['profileImg'].'?k='.rand() : '';
        $row['inserted_date'] = dateFormat($row['inserted_date'], $row['inserted_time']);
        $row['updated_date'] = dateFormat($row['updated_date'], $row['updated_time']);

		$row['inserted_by'] = $row['inserted_by_first_name'].' '.$row['inserted_by_last_name'];
		$row['updated_by'] = $row['updated_by_first_name'].' '.$row['updated_by_last_name'];
		unset($row['first_name']);
    unset($row['last_name']);
		unset($row['inserted_time']);
		unset($row['updated_time']);
		unset($row['inserted_by_first_name']);
		unset($row['inserted_by_last_name']);
		unset($row['updated_by_first_name']);
		unset($row['updated_by_last_name']);
		//$arr[$row['teamStatus']] = $status[$row['teamStatus']];
        $arr[$row['teamStatus']]['data'][] = $row;
        $i++;
	}//End while loop	
    //echo "<pre>";print_r($arr);echo "</pre>";die();


	//Set keys for individual Status set
	foreach($arr as $key => $vl){
		$i = 1;
		$arr[$key] = array_merge($arr[$key],$status[$key]);
		// $arr[$key][] = $status[$key];
		foreach($vl['data'] as $k => $v){
			$arr[$key]['data'][$k]['key'] = $i;
			$i++;
		}//End foreach
		$arr[$key]['data'] = array_reverse($arr[$key]['data']);
	}//End foreach

	//Set empty status if it's not available
	// foreach($status as $k => $v){
	// 	if(!@$arr[$k]){
	// 		$v['data'] = array();
	// 		$arr[$k] = $v;
	// 	}//End if condition
	// }//End foreach
	//If any status has no record then make it empty
	foreach($status as $k => $vl){if(!array_key_exists($k,$arr)){$arr[$k] = $vl;$arr[$k]['data'] = array();}}


	$countryList = dbQuery("SELECT * FROM $dropdown_country_table");
	$countryList = $countryList['data'];

    $res = array('status' => true, 'data' => $arr, 'countryList' => $countryList);
		// print_rp($res['data']);
	echo json_encode($res);

?>