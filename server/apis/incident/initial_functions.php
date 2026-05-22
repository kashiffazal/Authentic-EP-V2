<?php
 function getSPWInfo($spwId,$clientId = false){
  global $support_worker_form_table,$users_table;

  if(strstr($spwId, '=>' ) !== false){
    $spwId = str_replace('=>', '',$spwId);//This is actually user id not a support worker id
    $res = dbQuery("SELECT CONCAT(first_name,' ',last_name) AS name,gender,contact_number FROM $users_table WHERE id = '$spwId'");
    if($res['status']){
      $res['data'] = $res['data'][0];
      $res['data']['mobile'] = $res['data']['contact_number'];
      $res['data']['manager'] = '';
      $res['data']['service_provided'] = serviceProvidedToClientBySPWDropdown($spwId,$clientId)['data'];
    }//End if condition

  }else{
  
    $res = dbQuery("
      SELECT 
      CONCAT(sp.first_name,' ',sp.last_name) AS name,sp.gender,sp.mobile,
      CONCAT(mg.first_name,' ',mg.last_name) AS manager
      FROM $support_worker_form_table AS sp 
      LEFT JOIN $users_table AS mg ON mg.id = sp.manager_ref_id
      WHERE sp.id = '$spwId'
    ");
    if($res['status']){
      $res['data'] = $res['data'][0];
      $res['data']['service_provided'] = serviceProvidedToClientBySPWDropdown($spwId,$clientId)['data'];
    }//End if condition

  }//End if condition
  return $res;
 }//End function

 function serviceProvidedToClientBySPWDropdown($spwId,$clientId = false){
  global $service_plaining_table,$service_list_table;
  $query = "
    SELECT 
    DISTINCT(sl.name) AS label, sl.id AS value
    FROM $service_plaining_table AS sp
    INNER JOIN $service_list_table AS sl ON sp.service_ref_id = sl.id
    WHERE (sp.spw_ref_id = '$spwId' OR sp.spw_partner_ref_id = '$spwId')
  ";
  if($clientId){$query .= " AND sp.client_ref_id = '$clientId'";}//End if condition
  $res = dbQuery($query);
  $arr = array();
  // if($res['status']){foreach($res['data'] as $v){$arr[] = $v['service_name'];}}//End if condition
  // $res['data'] = $arr;
  return $res;
 }//End function

 function incidentFormList($status){
  global $incident_form_table,$support_worker_form_table,$users_table,$client_form_table,$domainPath,$statusDataGlobal;
  $query = "
    SELECT 
      inf.id,inf.form_no,
      CONCAT(spw.first_name,' ',spw.last_name) AS swp_name,
      CONCAT(us.first_name,' ',us.last_name) AS user_name,
      CONCAT(cl.first_name,' ',cl.last_name) AS client_name,
      inf.whos_filling,inf.affected_person_name, inf.rate_risk, inf.is_reportable_incident, inf.status
    FROM $incident_form_table AS inf 
    LEFT JOIN $support_worker_form_table AS spw ON spw.id = inf.spw_user_ref_id
    LEFT JOIN $users_table AS us ON us.id = inf.spw_user_ref_id
    INNER JOIN $client_form_table AS cl ON cl.id = inf.client_ref_id
    WHERE inf.status = '$status'
  ";

  if($_SESSION['link_id']){//If SPW is login
    $query .= " AND inf.spw_user_ref_id = '".$_SESSION['link_id']."'";
  }//end if condition

  $pdo_res = executePDO($query);
  $arr = array();
  $i = 1;
  while($row = $pdo_res['data']->fetch()){
    if($row['whos_filling'] === 'spw'){
      $row['filling_by_name'] = $row['swp_name'];
      $row['whos_filling'] = 'SPW';
    }//End if condition
    if($row['whos_filling'] === 'user'){
      $row['filling_by_name'] = $row['user_name'];
      $row['whos_filling'] = 'Admin';
    }//End if condition
    if($row['whos_filling'] === 'external'){
      $row['filling_by_name'] = $row['swp_name'];
      $row['whos_filling'] = 'External';
    }//End if condition
    $row['affected_person_name'] = $row['affected_person_name'] ? $row['affected_person_name'] : '-';
    $row['is_reportable_incident'] = @ucfirst(@$row['is_reportable_incident']);
    $row['rate_risk'] = @ucfirst(@$row['rate_risk']);
    #PDF for SPW version
    $row['pdf_path_una'] = $domainPath.'/files/documents/incident/forms/'.$row['id'].'-una-incident-form.pdf?k='.randCode();
    $row['pdf_path_una'] = file_exists('../files/documents/incident/forms/'.$row['id'].'-una-incident-form.pdf') ? $row['pdf_path_una'] : '';
    #PDF for Admin Version
    $row['pdf_path_apr'] = $domainPath.'/files/documents/incident/forms/'.$row['id'].'-apr-incident-form.pdf?k='.randCode();
    $row['pdf_path_apr'] = file_exists('../files/documents/incident/forms/'.$row['id'].'-apr-incident-form.pdf') ? $row['pdf_path_apr'] : '';
    $row['key'] = $i;
    $arr[] = $row;
    $i++;
  }//End while loop	

  #Getting counts
  $query = "
  SELECT
    count(if(status='unapprove',1,null)) as unApproveCount,
    count(if(status='approved',1,null)) as approvedCount,
    count(if(status='deleted',1,null)) as deletedCount,
    count(if(status='draft',1,null)) as draftCount
  FROM $incident_form_table";
  
  if($_SESSION['link_id']){//If SPW is login
    $query .= " WHERE spw_user_ref_id = '".$_SESSION['link_id']."'";
  }//end if condition

  $count = dbQuery($query)['data'][0];
  // print_rp($arr);

  $statusList = array(
    'unapprove' => array('name' => 'Unapproved', 'icon' => $statusDataGlobal['unapproved']['icon'], 'mobileIcon' => $statusDataGlobal['unapproved']['mobileIcon'], 'color' => $statusDataGlobal['unapproved']['color']),
    'approved' => array('name' => 'Approved', 'icon' => $statusDataGlobal['approved']['icon'], 'mobileIcon' => $statusDataGlobal['approved']['mobileIcon'], 'color' => $statusDataGlobal['approved']['color']),
    'deleted' => array('name' => 'Deleted', 'icon' => $statusDataGlobal['deleted']['icon'], 'mobileIcon' => $statusDataGlobal['deleted']['mobileIcon'], 'color' => $statusDataGlobal['deleted']['color']),
    'draft' => array('name' => 'Draft', 'icon' => $statusDataGlobal['draft']['icon'], 'mobileIcon' => $statusDataGlobal['draft']['mobileIcon'], 'color' => $statusDataGlobal['draft']['color'])
  );  

  return array('status' => true, 'data' => array_reverse($arr), 'count' => $count, 'statusList' => $statusList);
 }//End function

function imageMerge($img1='',$img2='',$folderPath,$fileName){
  header('Content-Type: image/png');
  $img1 = $folderPath.$img1;
  $img2 = $folderPath.$img2;
  $outputImage = imagecreatetruecolor(456, 396);
  $first = imagecreatefrompng($img1);
  $second = imagecreatefrompng($img2);
  //imagecopyresized ( resource $dst_image , resource $src_image , int $dst_x , int $dst_y , int $src_x , int $src_y , int $dst_w , int $dst_h , int $src_w , int $src_h )
  $x1 = 456;
  $y1 = 396;
  $x2 = 456;
  $y2 = 396;
  imagecopyresized($outputImage,$first,0,0,0,0, $x1, $y1,$x1,$y1);
  imagecopyresized($outputImage,$second,0,0,0,0, $x2, $y2,$x2,$y2);
  $filename = $folderPath.$fileName;
  imagepng($outputImage, $filename);
  imagedestroy($outputImage);
}//End function

?>