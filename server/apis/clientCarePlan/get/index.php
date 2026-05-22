<?php
  $clientData = dbQuery("
    SELECT 
    cl.*,CONCAT(cl.first_name,' ',cl.last_name) AS name,
    ct.name AS bornCountry
    FROM $client_form_table AS cl 
    LEFT JOIN $dropdown_country_table AS ct ON cl.bornCountry = ct.id
    WHERE cl.id = '$value'
  ")['data'][0];
  $clientData['age'] = @dateDifference(@$clientData['dateOfBirth'],false,false,'y');
  $clientData['dateOfBirth'] =  @$clientData['dateOfBirth'].' - Age '.$clientData['age'];
  $clientData['emConDetails'] = @$clientData['emConPersonName'].', '.@$clientData['relationToParti'].', '.@$clientData['emContPersonNumber'];
  $clientData['supCorDetails'] = @$clientData['makeRefName'].', '.@$clientData['makeRefPosition'].', '.@$clientData['makeRefPhone'].', '.@$clientData['makeRefEmail'];

  $res = dbQuery("SELECT id,primaryDiagnos,secondaryDiagnos,likes,dislikes,health_alerts,support_required,special_instructions,special_need,risk_strategy_ref_ids,services_json,special_comment,risk_identified_json FROM $care_plan_table WHERE client_ref_id = '$value'");
  if($res['status']){
    $cpd = $res['data'][0];
 
    //@ Get Risk Strategy Data from DB and Set with main variable
    if($cpd['risk_strategy_ref_ids'] AND $cpd['risk_strategy_ref_ids'] !== '') {
      $crs = dbQuery("SELECT id,service_ref_id,risk_strategy_json FROM $care_plan_risk_strategy_table WHERE id IN (".$cpd['risk_strategy_ref_ids'].") ORDER BY id")['data'];
      foreach ($crs as $vl) {
        $cpd['risk_strategy_multi_'.$vl['service_ref_id']] = $vl['risk_strategy_json'] ? json_decode($vl['risk_strategy_json']) : '';
        $cpd['risk_strategy_ids'][$vl['service_ref_id']] = $vl['id'];//@Make Ids in Sequence for Update
      }//End foreach
      unset($cpd['risk_strategy_ref_ids']);
    }//End if condition

    $cpd['risk_identified_multi'] = $cpd['risk_identified_json'] ? json_decode($cpd['risk_identified_json']) : '';
    $cpd['services_multi'] = $cpd['services_json'] ? json_decode($cpd['services_json']) : '';

    unset($cpd['risk_identified_json'],$cpd['services_json']);
    $res['data'] = array_merge($clientData,$cpd);
    $res['data']['serviceListDB'] = serviceListByType();
    $res['data']['carePlanPDFLink'] = $domainPath.'/files/documents/client/carePlan/'.$value.'-client-care-plan.pdf?k='.rand();

  }//End if condition

  $res['data']['companyDetails'] = $companyDetails;

  echo json_encode($res); 

?>