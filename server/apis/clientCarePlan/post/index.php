<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $data = $_POST;
  // print_rp($_POST);die();  
    
  if (@$data['risk_strategy_multi_'.@$data['serviceId']]) {
    //@Set variables  
    $rs = multiFieldsJsonSeparate($data['risk_strategy_multi_'.$data['serviceId']],false,'<%>');
    $crs['risk_strategy_json'] = @$rs['json'];
    $crs['risk'] = @$rs['risk'];
    $crs['strategy'] = @$rs['strategy'];
    $crs['care_plan_ref_id'] = $data['id'];
    $crs['service_ref_id'] = $data['serviceId'];
    $crs['id'] = $data['risk_strategy_id'];
    // print_rp($crs);die();
    //@ Add Strategy Data in Different Table
    $res = dbQuery('post',$crs,$care_plan_risk_strategy_table);
    if ($res['status']) {
      $crs_id = $res['id'];
      //@ Update ID(s) into Main Care Plan Table after get old one for concatenate
      //? Get Old ID(s)
      $ids = dbQuery("SELECT risk_strategy_ref_ids FROM $care_plan_table WHERE id = '" . $data['id'] . "'")['data'][0]['risk_strategy_ref_ids'];
      //? Concatenate And Update
      $ids = explode(',',$ids);
      $ids[] = $crs_id;
      sort($ids);//Sort Ids
      $ids = implode(',', array_unique(array_filter($ids)));
      $res = dbQuery('post',array('id' => $data['id'],'risk_strategy_ref_ids' => $ids),$care_plan_table);
    } else {
      echo json_encode($res);
    }//End if condition

  }else{
    // print_rp($data);die();

    if (@$data['risk_identified_multi']) {
      $rs = multiFieldsJsonSeparate($data['risk_identified_multi'],false,'<%>');
      $data['risk_identified_json'] = @$rs['json'];
      $data['identified_risk'] = @$rs['identified_risk'];
      $data['triggered_by'] = @$rs['triggered_by'];
      $data['risk_rating'] = @$rs['risk_rating'];
      $data['goals_will_impact'] = @$rs['goals_will_impact'];
      $data['risk_treatment_strategy'] = @$rs['risk_treatment_strategy'];
    } //End if condition
    unset($data['risk_identified_multi']);
    // print_rp($data);die();

    if (@$data['services_multi']) {
      $services = multiFieldsJsonSeparate($data['services_multi'],false,'<%>');
      $data['services_json'] = @$services['json'];
      $data['services_ref_ids'] = @$services['services_ref_id'];
      $data['services_desc'] = @$services['services_desc'];
    } //End if condition
    unset($data['services_multi']);
    // print_rp($data);die();
    
    $res = dbQuery('post',$data,$care_plan_table);
  } //End if condition
  if($res['status']){

    #Get Lists for PDF like City Country And State etc
    $listData = array();
    $listData['services'] = serviceListByType();
    $listData['states'] = getStateList();
    $listData['countries'] = getCountryList();

    require_once '../plugins/mpdf-8.1.4/vendor/autoload.php';
    include '../apis/client/client_functions.php';
    $clientData = dbQuery("SELECT * FROM $client_form_table WHERE id = '".$data['client_ref_id']."'")['data'][0];
    $carePlanData = dbQuery("SELECT *,id AS cp_id FROM $care_plan_table WHERE client_ref_id = '".$data['client_ref_id']."'")['data'][0];
    $data = array_merge($clientData,$carePlanData);
    // $data = array_merge($clientData,$data)
    $res = createCarePlan($data,false);
    $res['carePlanPDFLink'] = $domainPath.'/files/documents/client/carePlan/'.$res['fileName'].'?k='.rand(); 
    $res['crs_id'] = @$crs_id;
    // print_rp($res);
  }//End if condition

  $res['successNotify'] = true;
  $res['successNotifyType'] = 'message';
  $res['successMsg'] = 'Care Plan has been updates';

  echo json_encode($res);


?>