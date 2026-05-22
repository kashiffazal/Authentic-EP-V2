<?php

	$statusData = dbQuery("SELECT id,name,icon,mobileIcon,color FROM $support_worker_status_table");
	$statusData = $statusData['data'];
	$statusDataMod = array();
	$statusDataTab = $statusData;
	foreach($statusData as $vl){$statusDataMod[$vl['id']] = $vl['name'];}
	$statusDataTab[] = array('id' => '', 'name' => 'Draft','icon' => $statusDataGlobal['draft']['icon'], 'mobileIcon' => $statusDataGlobal['draft']['mobileIcon'], 'color' => $statusDataGlobal['draft']['color'], 'key' => 1000);
	array_unshift($statusDataTab,array('id' => '', 'name' => 'All','icon' => $statusDataGlobal['all']['icon'], 'mobileIcon' => $statusDataGlobal['all']['mobileIcon'], 'color' => $statusDataGlobal['all']['color'],'key' => 1100));
	// print_rp($statusDataTab);die();
	$statusListMobileTable = array();
	foreach($statusDataTab as $v){$statusListMobileTable[$v['name']] = array('icon' => $v['icon'], 'mobileIcon' => $v['mobileIcon'], 'color' => $v['color']);}//End foreach
	// print_rp($statusListMobileTable);die();

	$query = "
		SELECT 
		swt.id,swt.first_name,swt.last_name,swt.mobile,swt.email,swt.skypeId,swt.suburb,swt.status,swt.rejectReason,swt.draft_code,swt.inserted_date,swt.updated_date,
		jt.title AS job_title
		FROM $support_worker_form_table AS swt
		LEFT JOIN $job_table AS jt ON swt.job_ref_id = jt.id
		WHERE COALESCE(swt.isTeamMember, '') != 'true'
		ORDER BY swt.id ASC, swt.updated_date ASC 
	";

	$pdo_res = executePDO($query);
	$arr = array();
	while($row = $pdo_res['data']->fetch()){
		$row['name'] = $row['first_name'].' '.$row['last_name'];
		$row['name'] = ($row['name'] AND $row['name'] !== ' ') ? $row['name'] : '-';
		$row['mobile'] = $row['mobile'] ? $row['mobile'] : '-';
		$row['email'] = $row['email'] ? $row['email'] : '-';
		$row['skypeId'] = $row['skypeId'] ? $row['skypeId'] : '-';
		$row['suburb'] = $row['suburb'] ? $row['suburb'] : '-';
		$row['job_title'] = $row['job_title'] ? $row['job_title'] : '-';
		$row['draft_code'] = $row['draft_code'] ? $row['draft_code'] : '';
		$row['rejectReason'] = stripslashes($row['rejectReason']);
		$status = $row['status'];
		$row['status_ref_id'] = $row['status'];
		$row['status'] = @$statusDataMod[@$row['status']];
		$row['pdf_path'] = $domainPath.'/files/documents/supportWorker/forms/'.$row['id']."-".($row['updated_date'] ? $row['updated_date'] : $row['inserted_date']).'.pdf?k='.rand();
		unset($row['first_name']);
		unset($row['last_name']);
		if($row['draft_code']){
			$row['status'] = 'Draft';
			$arr['Draft'][] = $row;
		}else{
			$arr[$statusDataMod[$status]][] = $row;
		}//End if condition
	}//End while loop	
	
	//Set keys for individual Status set
	foreach($arr as $key => $vl){
		$i = 1;
		foreach($vl as $k => $v){
			$arr[$key][$k]['key'] = $i;
			$i++;
		}//End foreach
		$arr[$key] = array_reverse($arr[$key]);
	}//End foreach

	//If any status has no record then make it empty
	foreach($statusData as $vl){if(!array_key_exists($vl['name'],$arr)){$arr[$vl['name']] = array();}}
	
	$res = array(
		'status' => true, 
		'data' => $arr, 
		'status_list' => $statusData, 
		'status_list_tab' => $statusDataTab,
		'status_list_mobile_table' => $statusListMobileTable
	);

	//@ User Company List
	$res['userCompanyList'] = $_SESSION['userCompanyList'];
	//? If there is a single company then get manager list
	$res['managerList'] = '';
	if(sizeof($res['userCompanyList']) === 1){
		$res['managerList'] = getSWManagerList($res['userCompanyList'][0]['id'])['data'];
		// print_rp($res['managerList']);
	}//End if condition

	//@ Get Default App Setting
	include './settingJSON/get/getJSON.php';
	$res['appDefaultSetting'] = $devSettingJSON['formSetting']['supportWorker'];
	$res['appDefaultSetting']['general'] = $devSettingJSON['general'];
	echo json_encode($res);
	// print_rp($_SESSION['userCompanyList']);

?>