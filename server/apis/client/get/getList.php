<?php

	$query = "
		SELECT 
		id,company_ref_id,draft_code,first_name,last_name,dateOfBirth,email,contactNumber,ndisNumber,suburb,inserted_date,updated_date,status
		FROM $client_form_table
		ORDER BY id ASC 
	";
	//@ Set status name for client who has not assigned to any company yet!
	// $unassignCompanyStatus = 'mutual';
	// $activeStatus = 'active';
	$status = array(
		'all' => array('name' => 'All', 'icon' => $statusDataGlobal['all']['icon'], 'mobileIcon' => $statusDataGlobal['all']['mobileIcon'], 'color' => $statusDataGlobal['all']['color']),
		'mutual' => array('name' => 'Mutual', 'icon' => $statusDataGlobal['on_hold']['icon'], 'mobileIcon' => $statusDataGlobal['on_hold']['mobileIcon'], 'color' => $statusDataGlobal['on_hold']['color']),
		'active' => array('name' => 'Active', 'icon' => $statusDataGlobal['approved']['icon'], 'mobileIcon' => $statusDataGlobal['approved']['mobileIcon'], 'color' => $statusDataGlobal['approved']['color']),
		'in_active' => array('name' => 'In Active', 'icon' => $statusDataGlobal['unapproved']['icon'], 'mobileIcon' => $statusDataGlobal['unapproved']['mobileIcon'], 'color' => $statusDataGlobal['unapproved']['color']),
		'deleted' => array('name' => 'Deleted', 'icon' => $statusDataGlobal['deleted']['icon'], 'mobileIcon' => $statusDataGlobal['deleted']['mobileIcon'], 'color' => $statusDataGlobal['deleted']['color']),
		'draft' => array('name' => 'Draft', 'icon' => $statusDataGlobal['draft']['icon'], 'mobileIcon' => $statusDataGlobal['draft']['mobileIcon'], 'color' => $statusDataGlobal['draft']['color'])
	);

	$pdo_res = executePDO($query);
	$arr = array();
	$i = 1;
	while($row = $pdo_res['data']->fetch()){
		$row['name'] = $row['first_name'].' '.$row['last_name'];
		$row['dateOfBirth'] = $row['dateOfBirth'] ? $row['dateOfBirth'] : '-';
		$row['email'] = $row['email'] ? $row['email'] : '-';
		$row['contactNumber'] = $row['contactNumber'] ? $row['contactNumber'] : '-';
		$row['ndisNumber'] = $row['ndisNumber'] ? $row['ndisNumber'] : '-';
		$row['suburb'] = $row['suburb'] ? $row['suburb'] : '-';
		$row['pdf_path'] = $domainPath.'/files/documents/client/forms/'.$row['id']."-client-".($row['updated_date'] ? $row['updated_date'] : $row['inserted_date']).'.pdf?k='.rand();
		$row['key'] = $i;
		unset($row['first_name']);
		unset($row['last_name']);
		if($row['draft_code']){$row['status'] = 'draft';}
		
		// @If there is no company in Client then separate it
		// if(!$row['company_ref_id'] AND $row['status'] === $activeStatus){
			// $arr[$unassignCompanyStatus]['data'][] = $row;
		// }else{
			$arr[$row['status']]['data'][] = $row;
		// }//End if condition
		
		// $arr[] = $row;
		$i++;
	}//End while loop	

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

	//If any status has no record then make it empty and Sort with status array
	$arrMod = array();
	$statusData = array();
	foreach($status as $k => $vl){
		$vl['status'] = $k;
		$statusData[] = $vl;
		if(!array_key_exists($k,$arr)){$arr[$k] = $vl;$arr[$k]['data'] = array();}
		$arrMod[$k] = $arr[$k];
	}//end foreach
	$arr = $arrMod;
	
  $res = array('status' => true, 'data' => $arr, 'status_list' => $statusData);

	//@ User Company List
	$res['userCompanyList'] = $_SESSION['userCompanyList'];

	//@ Get Default App Setting
	include './settingJSON/get/getJSON.php';
	$res['appDefaultSetting'] = $devSettingJSON['formSetting']['client'];
	
	echo json_encode($res);

?>