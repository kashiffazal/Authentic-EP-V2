<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  // print_r($_POST);die();
  $postStartTimeData = array(
    'service_plaining_ref_id' => $_POST['id'],
    'service_ref_id' => $_POST['service_ref_id'],
    'client_ref_id' => $_POST['client_ref_id'],
    'spw_ref_id' => $_POST['spw_ref_id'],
    'spw2_ref_id' => $_POST['spw_partner_ref_id'],
    'start_time' => $_POST['start_time'],
    'service_started_by_spw_ref_id' => $_SESSION['link_id'],
    'timerData' => json_encode($_POST)
  );

  $res = dbQuery("
    SELECT id FROM $service_timing_table 
    WHERE 
    service_plaining_ref_id = '".$_POST['id']."' AND
    service_ref_id = '".$_POST['service_ref_id']."' AND
    client_ref_id = '".$_POST['client_ref_id']."' AND
    spw_ref_id = '".$_POST['spw_ref_id']."' AND
    spw2_ref_id = '".$_POST['spw_partner_ref_id']."' AND
    service_started_by_spw_ref_id = '".$_SESSION['link_id']."' AND
    COALESCE(timerData, '') != ''
  ");
  if(@$res['data'][0]['id']){
    #Get Started time from DB
    $res['id'] = $res['data'][0]['id'];
  }else{

    //@ Getting Company and Branch by SW
    $cData = getSWCompany($_POST['spw_ref_id']);
    $postStartTimeData['company_ref_id'] = $cData['company_ref_id'];
    $postStartTimeData['branch_ref_id'] = $cData['branch_ref_id'];

    #Add Start Time into DB
    $res = dbQuery("post",$postStartTimeData,$service_timing_table);
  }//End if condition
  //print_r($res);die();
  echo json_encode($res);
?>