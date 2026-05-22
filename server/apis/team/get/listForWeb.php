<?php
    $query = "
        SELECT 
        swt.first_name,swt.last_name,swt.profileImg,swt.teamPosition,swt.otherLanguageSpeak,swt.aboutExperience,swt.description,
        ct.name AS bornCountry
		FROM $support_worker_form_table AS swt
		INNER JOIN $dropdown_country_table AS ct ON swt.bornCountry = ct.id
        WHERE COALESCE(isteamMember, '') = 'true' AND teamStatus = 'active'
        ORDER BY swt.id
    ";

    $pdo_res = executePDO($query);
    $arr = array();
    $i = 1;
    $imgPath = $domainPath.'/files/uploads/supportWorkerProfile/';
	while($row = $pdo_res['data']->fetch()){
        $row['key'] = $i;
        $row['name'] = $row['first_name'].' '.$row['last_name'];
		$row['profileImg'] = $row['profileImg'] ? $imgPath.$row['profileImg'].'?k='.rand() : $imgPath.'avatar.png';
        unset($row['first_name']);
        unset($row['last_name']);
        $arr[] = $row;
		$i++;
	}//End while loop
    
    $res = array('status' => true, 'data' => $arr);
    echo json_encode($res);
?>