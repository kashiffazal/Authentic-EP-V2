<?php

#Header ---------------------------------//
    $header = "
        <div style='margin:0px 0px;'>
            <table border='0' style='width:100%;padding:0;border-collapse: collapse;'>
                <tr>
                  <td width='50%' style='font-size:18px;color:#424242'>
                    <b>Participant Referral Form</b>
                  </td>
                  <td width='50%' style='text-align:right;'><img align='right' src='$pdfOrImagePath/logo-company.png' width='90px'></td>
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
      <title>Participant Referral Form</title>
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
        background:#f7f7f7
      }
      .jobTitle{
        border: 1px dashed #b9b9b9;
        padding: 5px;
        margin-bottom: 20px;
        border-radius: 2px;
        background: #eef1f1;
        text-align:center;
      }
      .p{
        font-size:12px
      }
      </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  ';

  $html .= '
  <div class="container">
    <div class="section" style="margin-top:-10px">Details of Participant</div>
    
    <table class="table tbb">
      <tr>
        <td class="label" width="25%">First Name</td>
        <td class="label" width="25%">Last Name</td>
        <td class="label" width="25%">Date of Birth</td>
        <td class="label" width="25%">Place of Birth</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('first_name').'</td>
        <td class="value">'.GDOE('last_name').'</td>
        <td class="value">'.GDOE('dateOfBirth').'</td>
        <td class="value">'.GVFLC(@$data['bornCountry']).'</td>
      </tr>
      <tr>
        <td class="label">Gender</td>  
        <td class="label" colspan="2">Preferred Language</td>
        <td class="label">Interpreter Required?</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('gender').'</td>  
        <td class="value" colspan="2">'.GDOE('prefered_lang').'</td>
        <td class="value">'.GDOE('interpreterReq').'</td>
      </tr>
      <tr>
        <td class="label">NDIS Number</td>  
        <td class="label" colspan="2">Street Address</td>
        <td class="label">Suburb</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('ndisNumber').'</td>  
        <td class="value" colspan="2">'.GDOE('street_address').'</td>
        <td class="value">'.GDOE('suburb').'</td>
      </tr>
      <tr>
        <td class="label">State</td>
        <td class="label">Post Code</td>
        <td class="label">Email</td>
        <td class="label">Contact Number</td>
      <tr>
        <td class="value">'.GVFLS(@$data['state']).'</td>
        <td class="value">'.GDOE('postCode').'</td>
        <td class="value">'.GDOE('email').'</td>
        <td class="value">'.GDOE('contactNumber').'</td>
      </tr>
      <tr>
        <td class="label" colspan="2">NDIS Plan Date</td>
        <td class="label" colspan="2">NDIS End Date</td>
      </tr>
      <tr>
        <td class="value" colspan="2">'.GDOE('ndisPlanDate').'</td>
        <td class="value" colspan="2">'.GDOE('ndisEndDate').'</td>
      </tr>
    </table>

    <div class="section">Plan Manager & Contact Person</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="33.3%">Plan Manager & Contact Person</td>
        <td class="label" width="33.3%">Plan Manager Contact Number</td>
        <td class="label" width="33.3%">Plan Manager Email</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('planMangName').'</td>
        <td class="value">'.GDOE('planMangNumber').'</td>
        <td class="value">'.GDOE('planMangEmail').'</td>
      </tr>
      <tr>
        <td class="label">Emergency Contact Person Name</td>
        <td class="label">Relationship to NDIS participant</td>
        <td class="label">Contact Person Number</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('emConPersonName').'</td>
        <td class="value">'.GDOE('relationToParti').'</td>
        <td class="value">'.GDOE('emContPersonNumber').'</td>
      </tr>
      <tr>
        <td class="label">Approved NDIS Plan Document</td>
        <td class="label" colspan="2">NDIS Goals</td>
      </tr>
      <tr>
        <td class="value">
          '.(@$data['ndisPlanDocument'] ? '<a target="_blank" href="'.$domainPath.'/files/uploads/clientDocuments/NDISPlanDoc/'.GDOE('ndisPlanDocument').'">Click to View Document</a>' : '').'
        </td>
        <td class="value" colspan="2">'.(@$data['ndisGoals'] ? nl2br($data['ndisGoals']) : '-').'</td>
      </tr>
    </table>
  
    <div class="section">Living Arrangement</div>
    <table class="table">
      <tr>
        <td class="label" width="50%">Select any one of the following</td>
        <td class="value" width="50%">'.GDOE('livingArrang').'</td>
      </tr>
    </table>
    <table class="table tbb">
      <tr>
        <tr><td class="label">Please Specify</td></tr>
        <tr><td class="value">'.GDOE('livingArrangOther').'</td></tr>
      </tr>
    </table>
    
    <pagebreak/>
    <div class="section" style="margin-top:-10px">Guardian Details (if applicable)</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="25%">Name</td>
        <td class="label" width="25%">Date of Birth</td>
        <td class="label" width="25%">Home Phone</td>
        <td class="label" width="25%">Mobile Phone</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('guardianName').'</td>
        <td class="value">'.GDOE('guardianDOB').'</td>
        <td class="value">'.GDOE('guardianHomePhone').'</td>
        <td class="value">'.GDOE('guardianMobNumber').'</td>
      </tr>
      <tr>
        <td class="label">Work Phone</td>  
        <td class="label">Email Address</td>
        <td class="label" colspan="2">Street Address</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('guardianWorkPhone').'</td>  
        <td class="value">'.GDOE('guardianEmail').'</td>
        <td class="value" colspan="2">'.GDOE('guardianAddress').'</td>
      </tr>
      <tr>
        <td class="label">Subrub</td>  
        <td class="label">State</td>
        <td class="label" colspan="2">Post Code</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('guardianSubrub').'</td>  
        <td class="value">'.GVFLS(@$data['guardianState']).'</td>
        <td class="value" colspan="2">'.GDOE('guardianPostcode').'</td>
      </tr>
    </table>

    <div class="section">Details of Individual Making Referral</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="25%">Name</td>
        <td class="label" width="25%">Organization</td>
        <td class="label" width="25%">Position</td>
        <td class="label" width="25%">Email</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('makeRefName').'</td>
        <td class="value">'.GDOE('makeRefOrg').'</td>
        <td class="value">'.GDOE('makeRefPosition').'</td>
        <td class="value">'.GDOE('makeRefEmail').'</td>
      </tr>
      <tr>
        <td class="label" colspan="4">Street Address</td>  
      </tr>
      <tr>
        <td class="value" colspan="4">'.GDOE('makeRefAddress').'</td>  
      </tr>
      <tr>
        <td class="label">Subrub</td>  
        <td class="label">State</td>
        <td class="label">Post Code</td>
        <td class="label">Phone</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('makeRefSubrub').'</td>  
        <td class="value">'.GVFLS(@$data['makeRefState']).'</td>
        <td class="value">'.GDOE('makeRefPostCode').'</td>
        <td class="value">'.GDOE('makeRefPhone').'</td>
      </tr>
    </table>

    <div class="section">Participant Diagnosis</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="50%">Primary Diagnosis</td>
        <td class="label" width="50%">Secondary Diagnosis</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('primaryDiagnos').'</td>
        <td class="value">'.GDOE('secondaryDiagnos').'</td>
      </tr>
    </table>

    <div class="section">Participant Likes and Dislikes</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="50%">Likes</td>
        <td class="label" width="50%">Dislikes</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('likes').'</td>
        <td class="value">'.GDOE('dislikes').'</td>
      </tr>
    </table>

    <div class="section">Details of Services Required</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="40%">Service Name</td>
        <td class="label" width="15%">NDIS Budget</td>
        <td class="label" width="45%">Description</td>
      </tr>
    ';
    $ser_ids = explode('<%>', GDOE('services_ref_ids'));
    $ser_budget = explode('<%>', GDOE('services_ndis_budget'));
    $ser_desc = explode('<%>', GDOE('services_desc'));
    foreach($ser_ids as $key => $value){
      if($value){
        $html .= '
          <tr>
            <td class="value">'.GVFLSV($value).'</td>
            <td class="value" align="center">'. @number_format(@$ser_budget[$key],0).'</td>
            <td class="value">'.($ser_desc[$key] ? nl2br($ser_desc[$key]) : '-').'</td>
          </tr>        
        ';  
      }//Ene if condition
    }//End foreach
    $html .= '
   </table>
    
    <div class="section">Safety Information</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="50%">Any risk of self-harm identified</td>
        <td class="label" width="50%">If yes, please specify</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('anyRisk').'</td>
        <td class="value">'.GDOE('anyRiskSpecify').'</td>
      </tr>
      <tr>
        <td class="label">Harm from others Identified</td>
        <td class="label">If yes, please specify</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('harmFromOther').'</td>
        <td class="value">'.GDOE('harmFromOtherSpecify').'</td>
      </tr>
      <tr>
        <td class="label">Harm to others identified</td>
        <td class="label">If yes, please specify</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('harmToOther').'</td>
        <td class="value">'.GDOE('harmToOtherSpecify').'</td>
      </tr>
      <tr>
        <td class="label">Any pets on the property</td>
        <td class="label">If yes, please specify</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('anyPet').'</td>
        <td class="value">'.GDOE('anyPetSpecify').'</td>
      </tr>
      <tr>
        <td class="label">Any firearms being stored in the property</td>
        <td class="label">If yes, please specify</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('anyFireamers').'</td>
        <td class="value">'.GDOE('anyFireamersSpecify').'</td>
      </tr>
      <tr>
        <td class="label">Any history or current of people using alcohol or drugs at the property</td>
        <td class="label">If yes, please specify</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('anyDrugHistory').'</td>
        <td class="value">'.GDOE('anyDrugHistorySpecify').'</td>
      </tr>
      <tr>
        <td class="label">Any risk that support staff need to know</td>
        <td class="label">If yes, please specify</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('anyRishToKnow').'</td>
        <td class="value">'.GDOE('anyRishToKnowSpecify').'</td>
      </tr>
      <tr>
        <td class="label" colspan="2">Date of Referral</td>
      </tr>
      <tr>
        <td class="value" colspan="2">'.GDOE('dateOfRef').'</td>
      </tr>
    </table>

    <div class="section">Participant Risk Assessment - a) Communication</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="50%">Hearing OK</td>
        <td class="label" width="50%">Hazards identified & actions required</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('hearing').'</td>
        <td class="value">'.GDOE('hearingSpecify').'</td>
      </tr>
      <tr>
        <td class="label">Speech OK</td>
        <td class="label">Hazards identified & actions required</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('speech').'</td>
        <td class="value">'.GDOE('speechSpecify').'</td>
      </tr>
      <tr>
        <td class="label">Able to write</td>
        <td class="label">Hazards identified & actions required</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('ableToWrite').'</td>
        <td class="value">'.GDOE('ableToWriteSpecify').'</td>
      </tr>
      <tr>
        <td class="label">English language skills</td>
        <td class="label">Hazards identified & actions required</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('englishSkill').'</td>
        <td class="value">'.GDOE('englishSkillSpecify').'</td>
      </tr>
    </table>
    
    <div class="section">Participant Risk Assessment - b) Cognition</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="50%">Client willing to participate and assist in care</td>
        <td class="label" width="50%">Hazards identified & actions required</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('willingToParticipate').'</td>
        <td class="value">'.GDOE('willingToParticipateSpecity').'</td>
      </tr>
      <tr>
        <td class="label">Oriented in time and place</td>
        <td class="label">Hazards identified & actions required</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('orientation').'</td>
        <td class="value">'.GDOE('orientationSpecify').'</td>
      </tr>
      <tr>
        <td class="label">Client able to accept direction and instruction</td>
        <td class="label">Hazards identified & actions required</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('acceptDiraction').'</td>
        <td class="value">'.GDOE('acceptDiractionSpecific').'</td>
      </tr>
      <tr>
        <td class="label">Short-term memory issues</td>
        <td class="label">Hazards identified & actions required</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('shortMemory').'</td>
        <td class="value">'.GDOE('shortMemorySpecify').'</td>
      </tr>
    </table>

  <div class="section">Participant Risk Assessment - c) Mobility</div>
  <table class="table tbb">
    <tr>
      <td class="label" width="50%">Walk unaided</td>
      <td class="label" width="50%">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('walkUnaided').'</td>
      <td class="value">'.GDOE('walkUnaidedSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Manages stairs unaided</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('managesStairs').'</td>
      <td class="value">'.GDOE('managesStairsSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Uses walking aid to walk</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('usesWalkingAid').'</td>
      <td class="value">'.GDOE('usesWalkingAidSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Uses self-propelled wheelchair</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('wheelshair').'</td>
      <td class="value">'.GDOE('wheelshairSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Uses electric wheelchair/ scooter</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('usesElecWheelChair').'</td>
      <td class="value">'.GDOE('usesElecWheelChairSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Transfers independently</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('transferIndep').'</td>
      <td class="value">'.GDOE('transferIndepSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Transfers with supervision</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('transferWithSuper').'</td>
      <td class="value">'.GDOE('transferWithSuperSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Transfers with hoist</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('transferWithHoist').'</td>
      <td class="value">'.GDOE('transferWithHoistSpecify').'</td>
    </tr>                
  </table>

  <div class="section">Participant Risk Assessment - d) Personal Care Assistance Required</div>
  <table class="table tbb">
    <tr>
      <td class="label" width="50%">Bed mobility</td>
      <td class="label" width="50%">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('bedMobility').'</td>
      <td class="value">'.GDOE('bedMobilitySpecify').'</td>
    </tr>
    <tr>
      <td class="label">Showering</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('showering').'</td>
      <td class="value">'.GDOE('showeringSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Toileting</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('toileting').'</td>
      <td class="value">'.GDOE('toiletingSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Grooming</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('grooming').'</td>
      <td class="value">'.GDOE('groomingSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Repositioning in bed</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('repoInBed').'</td>
      <td class="value">'.GDOE('repoInBedSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Repositioning in chair</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('repoInChair').'</td>
      <td class="value">'.GDOE('repoInChairSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Mouth care</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('mouthCare').'</td>
      <td class="value">'.GDOE('mouthCareSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Eating</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('eating').'</td>
      <td class="value">'.GDOE('eatingSpecify').'</td>
    </tr>   
    <tr>
      <td class="label">Skin care</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('skinCare').'</td>
      <td class="value">'.GDOE('skinCareSpecify').'</td>
    </tr>                    
  </table>

  <div class="section">Participant Risk Assessment - e) Violence Risk</div>
  <table class="table tbb">
    <tr>
      <td class="label" width="50%">Physical aggression to support worker</td>
      <td class="label" width="50%">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('phyAggToSp').'</td>
      <td class="value">'.GDOE('phyAggToSpSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Verbal aggression to support worker</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('verAggToSp').'</td>
      <td class="value">'.GDOE('verAggToSpSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Aggression to other clients</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('aggToClients').'</td>
      <td class="value">'.GDOE('aggToClientsSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Aggression with/against objects</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('aggWithObjects').'</td>
      <td class="value">'.GDOE('aggWithObjectsSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Self-harm</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('selfHarm').'</td>
      <td class="value">'.GDOE('selfHarmSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Substance abuse</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('subAbuse').'</td>
      <td class="value">'.GDOE('subAbuseSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Sexual abuse</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('sexualAbuse').'</td>
      <td class="value">'.GDOE('sexualAbuseSpecify').'</td>
    </tr>
    <tr>
      <td class="label">Threats to staff in any way</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('threatsToStaff').'</td>
      <td class="value">'.GDOE('threatsToStaffSpecify').'</td>
    </tr>   
    <tr>
      <td class="label">Use of emotions to achieve goals</td>
      <td class="label">Hazards identified & actions required</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('useEmotionToAcGols').'</td>
      <td class="value">'.GDOE('useEmotionToAcGolsSpecify').'</td>
    </tr>                    
  </table>
  <div class="section">Participant Risk Assessment - f) Restrictive Practices</div>
  <table class="table tbb">
    <tr>
      <td class="label" colspan="2">Is there a positive behaviour support plan in place?</td>
    </tr>
    <tr>
      <td class="value" colspan="2">'.GDOE('behaviorSupportPlan').'</td>
    </tr>
    <tr>
      <td class="label" width="50%">Does the behaviour support plan have a restrictive practice?</td>
      <td class="label" width="50%">If yes, Please specify in detail</td>
    </tr>
    <tr>
      <td class="value">'.GDOE('restrictivePractice').'</td>
      <td class="value">
        '.GDOE('restrictivePracticeSpecify').'<br/>
        '.(@$data['uploadBehaviourPlanFile'] ? '<a target="_blank" href="'.$domainPath.'/files/uploads/clientDocuments/uploadBehaviourPlanFile/'.GDOE('uploadBehaviourPlanFile').'">Click to View Document</a>' : '').'
      </td>
    </tr>
  </table>
  <pagebreak/>
  <div class="section" style="margin-top:-10px">Declaration by the Person Filling up the Referral Form</div>
  <table class="table" border="0" width="100%" style="border:unset">
    <tr>
      <td class="value" style="border:unset">I am a support coordinator or authorized representative of the participant and I confirm that I am filling out this referral form on behalf of the <strong>'.GDOE('onBehalfOfName').'</strong></td>
    </tr>                    
  </table>
  <br/><br/><br/><br/><br/>
  <table class="table" width="100%">
    <tr>
      <td class="value" width="40%" style="text-align:center;border:unset" valign="bottom">
        <strong>'.(@$data['inserted_date'] ? $data['inserted_date'] : date('d-m-Y')).'</strong>
        <hr>  
        Date of Submitting Referral
      </td>
      <td class="value" width="20%" style="border:unset"></td>
      <td class="value" width="40%" style="text-align:center;border:unset" valign="bottom">
        <img style="max-width:160px" src="'.$domainPath.'/files/documents/signatures/client-ref-form/'.$insertedId.'-c.png?k='.randCode().'">
        <hr/>
        Signature
      </td>
    </tr>
  </table>';

  $html .='
  <pagebreak/>
  <div class="section" style="margin-top:-10px">Participant Consent Section</div>
  <p class="p">'.$companyDetails['name'].' will work closely with other agencies to coordinate the best support for you. This means your informed consent for the sharing of information will be sought and respected in all situations unless</p>';

  $arr = array(
    'we-are-oliged' => 'We are obliged by law to disclose your information regardless of consent or otherwise',
    'it-is-unreasonable' => 'It is unreasonable or impracticable to gain consent or consent has been refused',
    'the-disclosure' => 'The disclosure is reasonably necessary to prevent or lessen a serious threat to the life, health or safety of a person or group of people'
  );
  $v = explode(',',@$data['sharingInformation']);
  $html .='
  <table width="100%" border="0">
    <tr>
      <td width="4%" valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('we-are-oliged', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
      <td width="96%"><p class="p">'.$arr['we-are-oliged'].'</p></td>
    </tr> 
    <tr>
      <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('it-is-unreasonable', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
      <td><p class="p">'.$arr['it-is-unreasonable'].'</p></td>
    </tr> 
    <tr>
      <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('the-disclosure', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
      <td><p class="p">'.$arr['the-disclosure'].'</p></td>
    </tr> 
  </table>
  
  <p class="p">I hereby acknowledge that '.$companyDetails['name'].' has advised me of the following:</p>';
 
  $arr = array(
    'company-privacy' => $companyDetails['name'].' Privacy and Confidentiality Policy and Procedure',
    'right-to-access' => 'My right to access my personal information',
    'right-to-withdraw' => 'My right to withdraw my consent at any time'
  );
  $v = explode(',',@$data['acknowledge']);
  $html .='
  <table width="100%" border="0">
    <tr>
      <td width="4%" valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('company-privacy', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
      <td width="96%"><p class="p">'.$arr['company-privacy'].'</p></td>
    </tr> 
    <tr>
      <td valign="top"><img align="left" src="'.$pdfOrImagePath.'/'.(in_array('right-to-access', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
      <td><p class="p">'.$arr['right-to-access'].'</p></td>
    </tr> 
    <tr>
      <td valign="top"><img align="left" src="'.$pdfOrImagePath.'/'.(in_array('right-to-withdraw', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
      <td><p class="p">'.$arr['right-to-withdraw'].'</p></td>
    </tr> 
  </table>
  
  <p class="p">I understand that the follow service(s) are recommended and relevant information about me may be forwarded to the agency(s) that provide these services, in order that I receive the best possible service:</p>
  <table width="100%" border="0">
    <tr>
      <td width="4%" valign="top"><img src="'.$pdfOrImagePath.'/'.(@$data['understandServices'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
      <td width="96%"><p class="p">Do you agree?</p></td>
    </tr>
  </table>
  <p class="p">Check the following</p>
  ';

  $arr = array(
    'i-understand' => 'I understand that '.$companyDetails['name'].' must comply with relevant privacy laws and I will contact the organisation immediately if I feel that these laws have been breached',
    'my-worker' => 'My worker has discussed with me how and why certain information about me may need to be provided to other service providers',
    'recommendation' => 'I understand the recommendations and I give my permission for the information to be shared with the people or agencies as detailed above'
  );
  $v = explode(',',@$data['relevantPrivacyLaws']);
  $html .='
  <table border="0">
    <tr>
      <td width="4%" valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('i-understand', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
      <td width="96%"><p class="p">'.$arr['i-understand'].'</p></td>
    </tr> 
    <tr>
      <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('my-worker', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
      <td><p class="p">'.$arr['my-worker'].'</p></td>
    </tr> 
    <tr>
      <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('recommendation', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
      <td><p class="p">'.$arr['recommendation'].'</p></td>
    </tr> 
  </table>
  ';
    

  $html .= '</div></body></html>';

//   <table class="table">
//   <tr><td class="label">If you have a CV, please upload below</td></tr>
//   <tr><td class="value">';
//     foreach(explode(",",$uploadCV) as $value){
//       $html .= '<a href="'.$documentPath.'/supportWorker/cv/'.$value.'">'.$value.'</a><br/>';
//     }//End function
//   $html .='</td></tr>
// </table>

// <table class="table tbb">
// <tr><td class="label">Certified Copy of Your Passport</td></tr>
// <tr><td class="value">';
//   foreach(explode(",",$passport) as $value){
//     $html .= '<a href="'.$documentPath.'/supportWorker/passport/'.$value.'">'.$value.'</a><br/>';
//   }//End function
// $html .='</td></tr>
// </table>



// <table class="table tbb">
// <tr><td class="label">Please upload copies of any qualification certificates below</td></tr>
// <tr><td class="value">';
//   foreach(explode(",",$certificates) as $value){
//     $html .= '<a href="'.$documentPath.'/supportWorker/certificates/'.$value.'">'.$value.'</a><br/>';
//   }//End function
// $html .='</td></tr>
// </table>



?>