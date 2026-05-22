<?php

  function GDOE($vl){//Get Dash on Empty
    global $data;
    return @$data[$vl] ? @$data[$vl] : '-';
  }//End function

  function GVFLC($value){//Get value from List;
    global $listData;
    $index = array_search($value, array_column($listData['countries'], 'value'));
    return $listData['countries'][$index]['label'];
  }//End function

  function GVFLS($value){//Get value from List;
    global $listData;
    $index = array_search($value, array_column($listData['states'], 'value'));
    return $listData['states'][$index]['label'];
  }//End function

  function GVFLSV($value){//Get value from List;
    global $listData;
    $index = array_search($value, array_column($listData['services'], 'id'));
    return $listData['services'][$index]['name'];
  }//End function

  function createCarePlan($clientData,$update = true){
    global $care_plan_table,$care_plan_risk_strategy_table,$service_list_table;
    $data = $clientData;

    #Care Plan Functions and Variables
    $clientName = @$data['first_name']." ".@$data['last_name'];
    $cpDefaultValues = array(
      //Participant Risk and Containment Strategies - Default Values
      'risk_strategy_json' => '{"risk":{"1":"Car Safety","2":"Stranger Awareness","3":"Road Safety & Community"},"strategy":{"1":"Ensure seat belt is on and also child safety is locked while car is moving. Also ensure '.$clientName.' do not get down while you are parking the car.","2":"Constant supervision when in community and general awareness the surrounding risks.","3":"Aware the road safety and other users on the road while you are working with the '.$clientName.'."}}',
      'risk' => 'Car Safety<%>Stranger Awareness<%>Road Safety & Community',
      'strategy' => 'Ensure seat belt is on and also child safety is locked while car is moving. Also ensure '.$clientName.' do not get down while you are parking the car.<%>Constant supervision when in community and general awareness the surrounding risks.<%>Aware the road safety and other users on the road while you are working with the '.$clientName.'.',
      //Special Comment
      'special_comment' => '
        <ol>
          <li>Please always keep inform the participant about the timing of the service if you are getting late by calling.</li>
          <li>Excellent customer service interaction is very important. Always ask the '.$clientName.' if he/she is happy with the service or not.</li>
          <li>Always encourage her to speak up if she has any issue or not satisfied with the service.</li>
          <li>Make sure participant to maximize the service hours. For example, if the service is for 2 hours and you finish whatever required in less than 1 hour, the remaining one hour you can do something else or ask the participant some other thing.</li>
        </ol>
        '
    );

    #If there is no data then get from DB by id
    if(@!$data['cp_id']){
      //@ Set Default Values
      $clientData = array_merge($clientData,$cpDefaultValues);
      //@ Getting Care Plan Data from DB
      $carePlanData = @dbQuery("SELECT *,id AS cp_id FROM $care_plan_table WHERE client_ref_id = '".$data['id']."'")['data'][0];
      unset($carePlanData['id']);      
      $carePlanData = $carePlanData ? $carePlanData : array();
      $data = array_merge($clientData,$carePlanData);
    }else{
      $data['id'] = $data['client_ref_id'];
    }//End if condition

    //@ Get Risk Strategy Data from DB and Set with main variable
    if(@$data['risk_strategy_ref_ids'] AND $data['risk_strategy_ref_ids'] !== '') {
      $crs = dbQuery("
        SELECT 
          crs.risk_strategy_json,
          CONCAT(sl.code,' ',sl.name) AS service_name
          FROM $care_plan_risk_strategy_table AS crs
          INNER JOIN $service_list_table AS sl ON crs.service_ref_id = sl.id
        WHERE crs.id IN (".$data['risk_strategy_ref_ids'].")
      ")['data'];
      foreach ($crs as $vl) {
        $dt = $vl['risk_strategy_json'] ? json_decode($vl['risk_strategy_json'], true) : array();
        $dt['service_name'] = $vl['service_name'];
        $data['risk_strategy_multi'][] = $dt;
      }//End foreach
    }//End if condition  

    // print_rp($data);
    $res = createCarePlanPDF($data);  
    if($res['status'] AND $update){
      $post = array(
        'id' => @$data['cp_id'],
        'client_ref_id' => $data['id'],
        'primaryDiagnos' => @$data['primaryDiagnos'],
        'secondaryDiagnos' => @$data['secondaryDiagnos'],
        'likes' => @$data['likes'],
        'dislikes' => @$data['dislikes'],
        'services_json' => @$data['services_json'],
        'services_ref_ids' => @$data['services_ref_ids'],
        'services_desc' => @$data['services_desc'],
        // 'risk_strategy_json' => @$data['risk_strategy_json'],
        // 'risk' => $data['risk'],
        // 'strategy' => $data['strategy'],
        'special_comment' => $data['special_comment']
      );
      // print_rp($post);
      $res['db'] = dbQuery("post",$post,$care_plan_table);
    }//End if condition
    return $res;  
  }//End function

  function createCarePlanPDF($dt){
    global $server_date,$server_time,$service_list_table,$pdfOrImagePath,$companyDetails,$domainPath;
    // print_rp($dt);

    #Client details
    $clientName = @$dt['first_name']." ".@$dt['last_name'];
    $clientAge = @dateDifference(@$dt['dateOfBirth'],false,false,'y');

    #Header ---------------------------------//
    $header = "
    <div style='margin:0px 0px;'>
        <table border='0' style='width:100%;padding:0;border-collapse: collapse;'>
            <tr>
              <td width='70%' style='font-size:18px;color:#424242'>
                <h3>Participant Care Plan for</h3>
                ".$clientName." - Age ".$clientAge.", <span style='font-size:14px'>".@$dt['street_address']."</span>
              </td>
              <td width='30%' style='text-align:right;'><img align='right' src='$pdfOrImagePath/logo-company.png' width='90px'></td>
            </tr>
        </table>
        <!--hr style='margin:5px 0px;border: 0.5pt solid #ccc'/-->
    </div>
    ";
    //---------------------------------------//  
    $footer = '
    <!--hr style="margin:5px 0px;border: 1px solid #e96b28"/-->
    <table width="100%" border="0" style="font-size:12px">
      <tr>
          <td width="50%" ></td>
          <td width="50%" style="text-align: right;"><i>'.date("d-M-Y", strtotime($server_date)).', '.$server_time.'</i> | Page {PAGENO} of {nbpg}</td>
      </tr>
    </table>
    ';

    $html = '<html>
    <head>
        <title>Participant Care Plan</title>
        <style>
        .container{
          border:1px solid #e96b28;
          padding:10px;
          height:100%;
          /*background:#eeeeee;*/
        }
        .table{
          width:100%;
          border-collapse: collapse;
        }
        .table tr td{font-size:12px;border:1px solid #999;padding: 9px 10px;border-bottom:none;}
        .tbb{border-bottom:1px solid #999}
        .section{
          background:#e96b28;
          font-size:16px;
          color:#fff;
          font-weight:bold;
          padding:10px;
          margin:-10px;
          margin-bottom:10px;
          margin-top:10px;
        }
        .subSection{
          background:#ff965f;
          font-size:14px;
          color:#fff;
          font-weight:bold;
          padding:10px;
          margin:-10px;
          margin-bottom:10px;
          margin-top:10px;
        }
        .label{
          font-weight:bold;
          background:#f7f7f7;
        }
        .headingLabel{
          font-weight:bold;
          background:#d5d5d5;
        }
        .p{
          font-size:12px
        }
        </style>
    </head>
    <body style="font-family: \'Roboto\', sans-serif;">
    <div class="container">
      <div class="section" style="margin-top:-10px">Participant General Information</div>
      <table class="table tbb">
        <tr>
          <td class="label" width="27%">Full Name</td>
          <td class="value" width="73%">'.$clientName.'</td>
        </tr>
        <tr><td class="label">Gender</td><td class="value">'.@$dt['gender'].'</td></tr><tr><td class="label">Date of Birth/Age</td><td class="value">'.@date('M jS Y',strtotime(@$dt['dateOfBirth'])).' - '.$clientAge.'</td></tr>
        <tr><td class="label">Residential Address</td><td class="value">'.@$dt['street_address'].', '.@$dt['suburb'].', '.GVFLS(@$dt['state']).', '.@$dt['postCode'].'</td></tr>
        <tr><td class="label">Place of Birth</td><td class="value">'.GVFLC(@$dt['bornCountry']).'</td></tr>
        <tr><td class="label">Contact Number</td><td class="value">'.@$dt['contactNumber'].'</td></tr>
        <tr><td class="label">Emergency Contact Details</td><td class="value">'.@$dt['emConPersonName'].', '.@$dt['relationToParti'].', '.@$dt['emContPersonNumber'].'</td></tr>
        <tr><td class="label">Support Coordinator Details</td><td class="value">'.@$dt['makeRefName'].', '.@$dt['makeRefPosition'].', '.@$dt['makeRefPhone'].', '.@$dt['makeRefEmail'].'</td></tr>
        <tr><td class="label" valign="top">More Details</td><td class="value">'.(@$dt['more_details'] ? nl2br($dt['more_details']) : '-').'</td></tr>
      </table>

      <div class="section">Information in Details</div>
      <table class="table tbb">
        <tr>
          <td class="label" width="27%" valign="top">Personal History Background</td>
          <td class="value" width="73%">'.@nl2br(@$dt['primaryDiagnos']).'</td>
        </tr>
        <tr><td class="label" valign="top">Health Issues/Diagnose</td><td class="value">'.@nl2br(@$dt['secondaryDiagnos']).'</td></tr>
        <tr><td class="label" valign="top">Likes</td><td class="value">'.@nl2br(@$dt['likes']).'</td></tr>
        <tr><td class="label" valign="top">Dislikes</td><td class="value">'.@nl2br(@$dt['dislikes']).'</td></tr>
        <tr><td class="label" valign="top">Any Health Alerts or Concerns</td><td class="value">'.@nl2br(@$dt['health_alerts']).'</td></tr>
        <tr><td class="label" valign="top">Support/Assistance Required</td><td class="value">'.@nl2br(@$dt['support_required']).'</td></tr>
        <tr><td class="label" valign="top">Any Special Instructions to Staff</td><td class="value">'.@nl2br(@$dt['special_instructions']).'</td></tr>
        <tr><td class="label" valign="top">Any Special Need</td><td class="value">'.@nl2br(@$dt['special_need']).'</td></tr>
      </table>

      <div class="section">Safety Information</div>
      <table class="table tbb">
        <tr>
          <td class="label" colspan="2">Any risk of self-harm identified</td>
        </tr>
        <tr>
          <td class="value" width="27%">'.ucfirst(@$dt['anyRisk']).'</td>
          <td class="value" width="73%">'.(@$dt['anyRiskSpecify'] ? nl2br($dt['anyRiskSpecify']) : '-').'</td>
        </tr>

        <tr><td class="label" colspan="2">Harm from others Identified</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['harmFromOther']).'</td><td class="value">'.(@$dt['harmFromOtherSpecify'] ? nl2br($dt['harmFromOtherSpecify']) : '-').'</td></tr>
        
        <tr><td class="label" colspan="2">Harm to others identified</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['harmToOther']).'</td><td class="value">'.(@$dt['harmToOtherSpecify'] ? nl2br($dt['harmToOtherSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Any pets on the property</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['anyPet']).'</td><td class="value">'.(@$dt['anyPetSpecify'] ? nl2br($dt['anyPetSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Any firearms being stored in the property</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['anyFireamers']).'</td><td class="value">'.(@$dt['anyFireamersSpecify'] ? nl2br($dt['anyFireamersSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Any history or current of people using alcohol or drugs at the property</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['anyDrugHistory']).'</td><td class="value">'.(@$dt['anyDrugHistorySpecify'] ? nl2br($dt['anyDrugHistorySpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Any risk that support staff need to know</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['anyRishToKnow']).'</td><td class="value">'.(@$dt['anyRishToKnowSpecify'] ? nl2br($dt['anyRishToKnowSpecify']) : '-').'</td></tr>

      </table>

      <div class="subSection">Mobility</div>
      <table class="table tbb">
        <tr>
          <td class="headingLabel" colspan="2">a) Communication</td>
        </tr>
        <tr>
          <td class="label" colspan="2">Hearing OK</td>
        </tr>
        <tr>
          <td class="value" width="27%">'.ucfirst(@$dt['hearing']).'</td>
          <td class="value" width="73%">'.(@$dt['hearingSpecify'] ? nl2br($dt['hearingSpecify']) : '-').'</td>
        </tr>

        <tr><td class="label" colspan="2">Speech OK</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['speech']).'</td><td class="value">'.(@$dt['speechSpecify'] ? nl2br($dt['speechSpecify']) : '-').'</td></tr>
        
        <tr><td class="label" colspan="2">Able to write</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['ableToWrite']).'</td><td class="value">'.(@$dt['ableToWriteSpecify'] ? nl2br($dt['ableToWriteSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">English language skills</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['englishSkill']).'</td><td class="value">'.(@$dt['englishSkillSpecify'] ? nl2br($dt['englishSkillSpecify']) : '-').'</td></tr>

        <tr><td class="headingLabel" colspan="2">b) Cognition</td></tr>
        <tr><td class="label" colspan="2">Client willing to participate and assist in care</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['willingToParticipate']).'</td><td class="value">'.(@$dt['willingToParticipateSpecity'] ? nl2br($dt['willingToParticipateSpecity']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Oriented in time and place</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['orientation']).'</td><td class="value">'.(@$dt['orientationSpecify'] ? nl2br($dt['orientationSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Client able to accept direction and instruction</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['acceptDiraction']).'</td><td class="value">'.(@$dt['acceptDiractionSpecific'] ? nl2br($dt['acceptDiractionSpecific']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Short-term memory issues</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['shortMemory']).'</td><td class="value">'.(@$dt['shortMemorySpecify'] ? nl2br($dt['shortMemorySpecify']) : '-').'</td></tr>

        <tr><td class="headingLabel" colspan="2">c) Mobility</td></tr>
        <tr><td class="label" colspan="2">Walk unaided</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['walkUnaided']).'</td><td class="value">'.(@$dt['walkUnaidedSpecify'] ? nl2br($dt['walkUnaidedSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Manages stairs unaided</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['managesStairs']).'</td><td class="value">'.(@$dt['managesStairsSpecify'] ? nl2br($dt['managesStairsSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Uses walking aid to walk</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['usesWalkingAid']).'</td><td class="value">'.(@$dt['usesWalkingAidSpecify'] ? nl2br($dt['usesWalkingAidSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Uses self-propelled wheelchair</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['wheelshair']).'</td><td class="value">'.(@$dt['wheelshairSpecify'] ? nl2br($dt['wheelshairSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Uses electric wheelchair/ scooter</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['usesElecWheelChair']).'</td><td class="value">'.(@$dt['usesElecWheelChairSpecify'] ? nl2br($dt['usesElecWheelChairSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Transfers independently</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['transferIndep']).'</td><td class="value">'.(@$dt['transferIndepSpecify'] ? nl2br($dt['transferIndepSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Transfers with supervision</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['transferWithSuper']).'</td><td class="value">'.(@$dt['transferWithSuperSpecify'] ? nl2br($dt['transferWithSuperSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Transfers with hoist</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['transferWithHoist']).'</td><td class="value">'.(@$dt['transferWithHoistSpecify'] ? nl2br($dt['transferWithHoistSpecify']) : '-').'</td></tr>

        <tr><td class="headingLabel" colspan="2">d) Personal Care Assistance Required</td></tr>
        <tr><td class="label" colspan="2">Bed mobility</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['bedMobility']).'</td><td class="value">'.(@$dt['bedMobilitySpecify'] ? nl2br($dt['bedMobilitySpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Showering</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['showering']).'</td><td class="value">'.(@$dt['showeringSpecify'] ? nl2br($dt['showeringSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Toileting</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['toileting']).'</td><td class="value">'.(@$dt['toiletingSpecify'] ? nl2br($dt['toiletingSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Grooming</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['grooming']).'</td><td class="value">'.(@$dt['groomingSpecify'] ? nl2br($dt['groomingSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Repositioning in bed</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['repoInBed']).'</td><td class="value">'.(@$dt['repoInBedSpecify'] ? nl2br($dt['repoInBedSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Repositioning in chair</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['repoInChair']).'</td><td class="value">'.(@$dt['repoInChairSpecify'] ? nl2br($dt['repoInChairSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Mouth care</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['mouthCare']).'</td><td class="value">'.(@$dt['mouthCareSpecify'] ? nl2br($dt['mouthCareSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Eating</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['eating']).'</td><td class="value">'.(@$dt['eatingSpecify'] ? nl2br($dt['eatingSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Skin care</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['skinCare']).'</td><td class="value">'.(@$dt['skinCareSpecify'] ? nl2br($dt['skinCareSpecify']) : '-').'</td></tr>

        <tr><td class="headingLabel" colspan="2">e) Violence Risk</td></tr>
        <tr><td class="label" colspan="2">Physical aggression to support worker</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['phyAggToSp']).'</td><td class="value">'.(@$dt['phyAggToSpSpecify'] ? nl2br($dt['phyAggToSpSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Verbal aggression to support worker</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['verAggToSp']).'</td><td class="value">'.(@$dt['verAggToSpSpecify'] ? nl2br($dt['verAggToSpSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Aggression to other clients</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['aggToClients']).'</td><td class="value">'.(@$dt['aggToClientsSpecify'] ? nl2br($dt['aggToClientsSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Aggression with/against objects</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['aggWithObjects']).'</td><td class="value">'.(@$dt['aggWithObjectsSpecify'] ? nl2br($dt['aggWithObjectsSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Self-harm</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['selfHarm']).'</td><td class="value">'.(@$dt['selfHarmSpecify'] ? nl2br($dt['selfHarmSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Substance abuse</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['subAbuse']).'</td><td class="value">'.(@$dt['subAbuseSpecify'] ? nl2br($dt['subAbuseSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Sexual abuse</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['sexualAbuse']).'</td><td class="value">'.(@$dt['sexualAbuseSpecify'] ? nl2br($dt['sexualAbuseSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Threats to staff in any way</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['threatsToStaff']).'</td><td class="value">'.(@$dt['threatsToStaffSpecify'] ? nl2br($dt['threatsToStaffSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Use of emotions to achieve goals</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['useEmotionToAcGols']).'</td><td class="value">'.(@$dt['useEmotionToAcGolsSpecify'] ? nl2br($dt['useEmotionToAcGolsSpecify']) : '-').'</td></tr>

        <tr><td class="headingLabel" colspan="2">f) Restrictive Practices</td></tr>
        <tr><td class="label" colspan="2">Does the participant has authorized restrictive practice?</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['restrictivePractice']).'</td><td class="value">'.(@$dt['restrictivePracticeSpecify'] ? nl2br($dt['restrictivePracticeSpecify']) : '-').'</td></tr>

        <tr><td class="label" colspan="2">Does the participant have a behavior support plan if we identify restrictive practices while doing home risk assessments?</td></tr>
        <tr><td class="value">'.ucfirst(@$dt['behaviorSupportPlan']).'</td><td class="value">'.(@$dt['behaviorSupportPlanSpecify'] ? nl2br($dt['behaviorSupportPlanSpecify']) : '-').'</td></tr>

      </table>

      <div class="section">Participant Goals</div>
      <table class="table tbb">
        <tr><td class="value" width="100%">'.@nl2br(@$dt['ndisGoals']).'</td></tr>
      </table>';

      if(@$dt['risk_strategy_multi']){
        foreach ($dt['risk_strategy_multi'] as $vl) {
          $html .= '
            <div class="section">Participant Risk and Containment Strategies <br/> <span style="font-size:14px">('.$vl['service_name'].')</span></div>
            <table class="table tbb">
              <tr>
                <td class="label" width="6%">#</td>
                <td class="label" width="21%">Risk</td>
                <td class="label" width="73%">Strategy</td>
              </tr>
          ';
          $sr = 1;
          foreach($vl['risk'] as $k => $v){
            $html .= '
              <tr>
                <td class="value" valign="top">'.$sr.'</td>
                <td class="value">'.$v.'</td>
                <td class="value">'.($vl['strategy'][$k] ? nl2br($vl['strategy'][$k]) : '-').'</td>
              </tr>
            ';
            $sr++;
          }//End foreach
            $html .= '
              </table>';
        }//End foreach
      }//End if condition

      $html .= '
      <div class="section">'.$companyDetails['name'].' Services to Participant</div>
      <table class="table tbb">
        <tr>
          <td class="label" width="6%">#</td>
          <td class="label" width="21%">Service</td>
          <td class="label" width="73%">Description</td>
        </tr>';
        $ser_ids = explode('<%>', GDOE('services_ref_ids'));
        $ser_budget = explode('<%>', GDOE('services_ndis_budget'));
        $ser_desc = explode('<%>', GDOE('services_desc'));
        $sr = 1;
        foreach($ser_ids as $k => $v){
          if($v){
            $html .= '
              <tr>
                <td class="value" valign="top">'.$sr.'</td>
                <td class="value">'.GVFLSV($v).'</td>
                <td class="value">'.($ser_desc[$k] ? nl2br($ser_desc[$k]) : '-').'</td>
              </tr>
            ';
            $sr++;
          }//End if condition
        }//End foreach
      $html .= '</table>
      
      <div class="section">Any special Comments for Staff</div>
      <table class="table tbb">
        <tr><td class="value" width="100%">'.(@$dt['special_comment'] ? $dt['special_comment'] : '-').'</td></tr>
      </table>

      <div class="section">Risk Assessment</div>
        ';
        if(@$dt['identified_risk']){
          $dt['identified_risk'] = explode('<%>',$dt['identified_risk']);
          $dt['triggered_by'] = explode('<%>',$dt['triggered_by']);
          $dt['risk_rating'] = explode('<%>',$dt['risk_rating']);
          $dt['goals_will_impact'] = explode('<%>',$dt['goals_will_impact']);
          $dt['risk_treatment_strategy'] = explode('<%>',$dt['risk_treatment_strategy']);
          foreach($dt['identified_risk'] as $k => $v){

            $html .='
              <table class="table tbb">
                <tr>
                  <td class="label" width="6%">#</td>
                  <td class="label" width="21%">Identified Risk</td>
                  <td class="label" width="48%">Triggered by</td>
                  <td class="label" width="25%">Risk Rating</td>
                </tr>
                <tr>
                  <td class="value" valign="top" rowspan="5">'.($k+1).'</td>
                  <td class="value">'.$v.'</td>
                  <td class="value">'.$dt['triggered_by'][$k].'</td>
                  <td class="value">'.$dt['risk_rating'][$k].'</td>
                </tr>
                <tr><td class="label" colspan="4">Which of the goals will this impact?</td></tr>
                <tr><td class="value" colspan="4">'.$dt['goals_will_impact'][$k].'</td></tr>
                <tr><td class="label" colspan="4">Risk treatment strategy?</td></tr>
                <tr><td class="value" colspan="4">'.$dt['risk_treatment_strategy'][$k].'</td></tr>
              </table>
            ';

          }//End foreach
        }else{
          $html .='-';  
        }//End if condition
        $html .='



        <pagebreak/>
        <div class="section" style="margin-top:-10px">Participant Declaration Section</div>
        <table class="table" border="0" width="100%" style="border:unset">
          <tr>
            <td class="value" style="border:unset"><strong>I agree that the plan of care and associated services are discussed with me and documented.</strong></td>
          </tr>                    
        </table>


        <br/><br/><br/><br/>
        <table class="table" width="100%">
          <tr>
            <td class="value" width="33.3%" style="text-align:center;border:unset" valign="bottom">
              <strong>'.(@$dt['inserted_date'] ? date('d-m-Y',strtotime($dt['inserted_date'])) : date('d-m-Y')).'</strong>
              <hr>  
              Date of Submitting Referral
            </td>
            <td class="value" width="33.3%" style="text-align:center;border:unset" valign="bottom">
              <strong>'.$clientName.'</strong>
              <hr>  
              Participant Name
            </td>
            <td class="value" width="33.3%" style="text-align:center;border:unset" valign="bottom">
              <img style="max-width:160px" src="'.$domainPath.'/files/documents/signatures/client-ref-form/'.$dt['id'].'-c.png">
              <hr/>
              Participant Signature
            </td>
          </tr>
        </table>

        <br/><br/><br/><br/><br/><br/>
        <table class="table" width="100%">
          <tr>
            <td class="value" width="33.3%" style="text-align:center;border:unset" valign="bottom">
              <strong>'.(@$dt['approve_date'] ? date('d-m-Y',strtotime($dt['approve_date'])) : '').'</strong>
              <hr>  
              Date of Approval
            </td>
            <td class="value" width="33.3%" style="text-align:center;border:unset" valign="bottom">
              <strong>'.@$dt['approved_by_name'].'</strong>
              <hr>  
              Staff Manager Name
            </td>
            <td class="value" width="33.3%" style="text-align:center;border:unset" valign="bottom">
              '.(@$dt['cp_id'] ? '<img style="max-width:160px" src="'.$domainPath.'/files/documents/signatures/care-plan/'.@$dt['id'].'-'.@$dt['cp_id'].'-cp.png">' : '').'
              <hr/>
              Manager Signature
            </td>
          </tr>
        </table>


      </div>
    </body>
    </html>
    ';

    $path = "../files/documents/client/carePlan";
    $fileName = $dt['id'].'-client-care-plan';
    return createPDF($path,$fileName,$html,$header,$footer);
  }//End function

?>