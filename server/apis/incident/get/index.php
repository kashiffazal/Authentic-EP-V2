<?php
  if (@$_GET['id'] and $_GET['id'] != '-') {$id = $_GET['id'];}
  // echo $_GET['internal'];
  $res = array('status' => true);
  $res['data']['clientList'] = clientList(false,"id AS value,CONCAT(first_name,' ',last_name) AS label");
  $spwList = supportWorkerList("id AS value,CONCAT(first_name,' ',last_name) AS label");
  $res['data']['allegationOnList'] = $spwList;
  $res['data']['allegationOnList'][] = array('value' => '-', 'label' => 'Other', 'key' => (sizeof($spwList)+1));
  $res['data']['form_no'] = getNewIncidentFormNumber();
  if(@$_SESSION['link_id'] AND $_GET['internal'] !== 'false'){
    $res['data']['spwList'] = array();
    include './incident/initial_functions.php';
    $res['data']['spwDetails'] = getSPWInfo($_SESSION['link_id'])['data'];
  }else{
    #Get all hired support worker list and users those are not support worker separate with ids separator as '=>'
    #Because person filling up the form can be anything rather then just support worker
    $res['data']['spwList'] = array_merge($spwList,dbQuery("SELECT CONCAT(id,'=>') AS value,CONCAT(first_name,' ',last_name) AS label FROM $users_table WHERE COALESCE(link_id, '') = ''")['data']);
    #Set keys
    $k = 1;
    $arr = [];
    foreach($res['data']['spwList'] as $v){
      $v['key'] = $k;
      $arr[] = $v;
      $k++;
    }//End foreach
    $res['data']['spwList'] = $arr;
  }//End if condition

  if(@$id){
    $data = dbQuery("SELECT *,parties_json AS other_parties_multi FROM $incident_form_table WHERE id = '$id'")['data'][0];    
    if($data['whos_filling'] === 'user'){$data['spw_user_ref_id'] = $data['spw_user_ref_id'].'=>';}
    $data['location_of_incident'] = $data['location_of_incident'] ? explode(',',$data['location_of_incident']) : array();
    $data['injury_details'] = $data['injury_details'] ? explode(',',$data['injury_details']) : array();
    $data['other_parties_multi'] = $data['other_parties_multi'] ? json_decode($data['other_parties_multi']) : '';
    #Images URLs
    $data['location_on_body_circle_img_url'] = $domainPath.'/files/documents/incident/circleImg/circleImg'.$data['id'].'-ci.png?k='.randCode(4);
    $data['location_on_body_circle_img_url'] = file_exists('../files/documents/incident/circleImg/circleImg'.$data['id'].'-ci.png') ? $data['location_on_body_circle_img_url'] : '';
    $data['admin_signature_url'] = $domainPath.'/files/documents/incident/signatures/adminSign'.$data['id'].'-as.png?k='.randCode(4);
    $data['admin_signature_url'] = file_exists('../files/documents/incident/signatures/adminSign'.$data['id'].'-as.png') ? $data['admin_signature_url'] : '';
    $data['spw_user_signature_url'] = $domainPath.'/files/documents/incident/signatures/spwUserSign'.$data['id'].'-as.png?k='.randCode(4);
    $data['spw_user_signature_url'] = file_exists('../files/documents/incident/signatures/spwUserSign'.$data['id'].'-as.png') ? $data['spw_user_signature_url'] : '';
    $res['data']['formValues'] = $data;
  }//End if condition
    
  echo json_encode($res);
?>