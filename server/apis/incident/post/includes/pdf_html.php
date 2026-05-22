<?php

  function GDOE($vl){//Get Dash on Empty
    global $data;
    return @$data[$vl] ? @$data[$vl] : '-';
  }//End function

#Header ---------------------------------//
    $header = "
        <div style='margin:0px 0px;'>
            <table border='0' style='width:100%;padding:0;border-collapse: collapse;'>
                <tr>
                  <td width='50%' style='text-align:left;'><img align='right' src='$pdfOrImagePath/logo-company.png' width='90px'></td>
                  <td width='50%' style='text-align:right;font-size:18px;color:#424242'>
                    Form # ".$data['form_no']."<br/>
                    <b>Internal Incident Reporting Form</b>
                  </td>
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
      <title>Internal Incidents Management Form</title>
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
      .risk-label{
        padding:3px 5px;
        font-weight:bold
      }
      </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  ';

  $html .= '
  <div class="container">
    <div class="section" style="margin-top:-10px">Details of the affected person or participant</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="50%" colspan="2">Participant Name</td>
        <td class="label" width="50%" colspan="2">Affected Person Name (If it\'s not a client)</td>
      </tr>
      <tr>
        <td class="value" colspan="2">'.GDOE('client_name').'</td>
        <td class="value" colspan="2">'.GDOE('affected_person_name').'</td>
      </tr>
      <tr>
        <td class="label" width="25%">Gender</td>  
        <td class="label" width="50%" colspan="2">Address</td>
        <td class="label" width="25%">Date of Birth</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('client_gender').'</td>  
        <td class="value" colspan="2">'.GDOE('client_address').'</td>
        <td class="value">'.GDOE('client_dob').'</td>
      </tr>
      <tr>
        <td class="label" width="25%">Contact Number</td>
        <td class="label" width="25%">NDIS Number</td>  
        <td class="label" width="50%" colspan="2">Next of Kin</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('client_contactNumber').'</td>
        <td class="value">'.GDOE('client_ndisNumber').'</td>  
        <td class="value" colspan="2">'.GDOE('next_of_kin').'</td>
      </tr>
    </table>

    <div class="section">Details of the person filling up the form</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="33.3%">Full Name</td>
        <td class="label" width="33.3%">Gender</td>
        <td class="label" width="33.3%">Contact Number</td>
      </tr>
      <tr>
        <td class="value">'.$data['ud']['name'].'</td>
        <td class="value">'.($data['ud']['gender'] ? $data['ud']['gender'] : '-').'</td>
        <td class="value">'.($data['ud']['mobile'] ? $data['ud']['mobile'] : '-').'</td>
      </tr>
      <tr>
        <td class="label">Manager Name</td>
        <td class="label" colspan="2">Service Provided to Client</td>
      </tr>
      <tr>
        <td class="value">'.($data['ud']['manager'] ? $data['ud']['manager'] : '-').'</td>
        <td class="value" colspan="2">
    ';   
    #Add Provided Services
    // if($data['ud']['service_provided'] AND sizeof($data['ud']['service_provided']) > 0){
    //     $html .= implode(', ',$data['ud']['service_provided']);
    // }//End if condition

    $html .= GDOE('activity_engaged');

    $html .='</td>
      </tr>
      <tr>
        <td class="label">Is this a reportable incident?</td>
        <td class="value" colspan="2">'.ucfirst(GDOE('report_non_report')).'</td>
      </tr>
    </table>

    <div class="section">Subject of Allegation</div>
    <table class="table tbb">
    <tr>
      <td class="label">Any one for Allegation?</td>
      <td class="label" colspan="2">If not then why?</td>
    </tr>
    <tr>
      <td class="value">'.ucfirst(GDOE('is_allegation_person')).'</td>
      <td class="value" colspan="2">'.GDOE('why_not_allegation').'</td>
    </tr>  
    <tr>
        <td class="label" width="33.3%">Full Name</td>
        <td class="label" width="33.3%">Gender</td>
        <td class="label" width="33.3%">Contact Number</td>
      </tr>
      <tr>
        <td class="value">'.($data['sa']['name'] ? $data['sa']['name'] : '-').'</td>
        <td class="value">'.($data['sa']['gender'] ? $data['sa']['gender'] : '-').'</td>
        <td class="value">'.($data['sa']['mobile'] ? $data['sa']['mobile'] : '-').'</td>
      </tr>
      <tr>
        <td class="label">Employer</td>
        <td class="label" colspan="2">Service Provided to Client</td>
      </tr>
      <tr>
        <td class="value">'.($data['sa']['employer'] ? $data['sa']['employer'] : '-').'</td>
        <td class="value" colspan="2">
    ';   
    #Add Provided Services
    if($data['sa']['service_provided'] AND sizeof($data['sa']['service_provided']) > 0){
      $sr = array();
      foreach($data['sa']['service_provided'] as $v){$sr[] .= $v['label'];}//End foreach
      $html .= implode(', ',$sr);
    }else{
      $html .= '-';
    }//End if condition
    $html .='</td>
      </tr>
    </table>

    <pagebreak/>
    <div class="section" style="margin-top:-10px">Reportable or non-reportable</div>  
    <table class="table tbb">
      <tr>
        <td class="label" width="50%">Is this a reportable incident?</td>
        <td class="value" width="50%">'.ucfirst(GDOE('report_non_report')).'</td>
      </tr>
    </table>
    <p style="font-weight:bold;font-size:12px">Refer reportable incident list:</p>';
  
    $arr = array(
      'death' => 'The death of a person with disability;',
      'injury' => 'Serious injury of a person with disability',
      'abuse' => 'Abuse or neglect of a person with disability',
      'sexual_physical' => 'Unlawful sexual or physical contact with, or assault of, a person with disability',
      'sexual_misconduct' => 'Sexual misconduct committed against, or in the presence of, a person with disability, including grooming of the person for sexual activity',
      'restrictive_in_relation' => 'The use of a restrictive practice in relation to a person with disability, other than where the use is in accordance with an authorisation (however described) of a State or Territory in relation to the person',
      'others' => 'Others'
    );
    $v = explode(',',@$data['reportable_list']);
    $html .='
    <table width="100%" border="0">
      <tr>
        <td width="4%" valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('death', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td width="96%"><p class="p">'.$arr['death'].'</p></td>
      </tr> 
      <tr>
        <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('injury', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td><p class="p">'.$arr['injury'].'</p></td>
      </tr> 
      <tr>
        <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('abuse', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td><p class="p">'.$arr['abuse'].'</p></td>
      </tr> 
      <tr>
        <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('sexual_physical', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td><p class="p">'.$arr['sexual_physical'].'</p></td>
      </tr> 
      <tr>
        <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('sexual_misconduct', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td><p class="p">'.$arr['sexual_misconduct'].'</p></td>
      </tr> 
      <tr>
        <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('restrictive_in_relation', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td><p class="p">'.$arr['restrictive_in_relation'].'</p></td>
      </tr> 
      <tr>
        <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('others', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td><p class="p">'.$arr['others'].'</p></td>
      </tr>
    </table>
    <table class="table tbb" style="margin-top:10px">
      <tr>
        <td class="label" width="25%">Other</td>
        <td class="value" width="75%">'.(in_array('others', $v) ? GDOE('reportable_list_other') : '-').'</td>
      </tr>
    </table>


    <p style="font-weight:bold;font-size:12px"><img src="'.$pdfOrImagePath.'/flag.png" width="20px" style="margin-right:10px;">If this is a Reportable Incident, please refer to the Incident Management Policy for how to report this incident on the NDIS Commission Portal and continue to complete this incident form for internal purpose.</p>
    <p style="font-size:12px">If this is not a reportable incident, continue to complete this incident form and submit to your manager or supervisor for review.</p>
 
    <div class="section">What is the Risk Rating of the is Incident?</div>';    
    $arr = array(
      'catastrophic' => 'Catastrophic',
      'major' => 'Major',
      'moderate' => 'Moderate',
      'minor' => 'Minor',
      'insignificant' => 'Insignificant'
    );
    $v = explode(',',@$data['rate_risk']);
    $html .='
    <table width="25%" border="0">
      <tr>
        <td width="18%" valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('catastrophic', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td width="82%" class="risk-label" style="'.(in_array('catastrophic', $v) ? 'background:#400000;color:#fff;' : '').'"><p class="p"><span>'.$arr['catastrophic'].'<span></p></td>
      </tr> 
      <tr>
        <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('major', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="risk-label" style="'.(in_array('major', $v) ? 'background:#800000;color:#fff;' : '').'"><p class="p">'.$arr['major'].'</p></td>
      </tr> 
      <tr>
        <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('moderate', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="risk-label" style="'.(in_array('moderate', $v) ? 'background:#bf0000;color:#fff;' : '').'"><p class="p">'.$arr['moderate'].'</p></td>
      </tr> 
      <tr>
        <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('minor', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="risk-label" style="'.(in_array('minor', $v) ? 'background:#ff0000;color:#fff;' : '').'"><p class="p">'.$arr['minor'].'</p></td>
      </tr> 
      <tr>
        <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('insignificant', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="risk-label" style="'.(in_array('insignificant', $v) ? 'background:#ff5050;color:#fff;' : '').'"><p class="p">'.$arr['insignificant'].'</p></td>
      </tr> 
    </table>
    <table class="table" style="margin-top:10px">
      <tr><td class="label">Briefly explain why you’ve rated at this level</td></tr>
      <tr><td class="value">'.GDOE('rate_explain').'</td></tr>
    </table>
    
    <table class="table tbb">
      <tr>
        <td class="label" width="25%">Name of Witness</td>
        <td class="value" width="25%">'.GDOE('witness_name').'</td>
        <td class="label" width="25%">Phone</td>
        <td class="value" width="25%">'.GDOE('witness_phone').'</td>
      </tr>
      <tr>
        <td class="label">Was First Aid Required?</td>
        <td class="value">'.ucfirst(GDOE('was_first_aid')).'</td>
        <td class="label">If yes who was the First Aid provider?</td>
        <td class="value">'.GDOE('first_aid_provider').'</td>
      </tr>
      <tr>
        <td class="label">Was medical treatment required?</td>
        <td class="value">'.ucfirst(GDOE('was_medical_treatment')).'</td>
        <td class="label">If yes who was the treating doctor?:</td>
        <td class="value">'.GDOE('medical_treating_doctor').'</td>
      </tr>
      <tr>
        <td class="label">Was hospital treatment required?</td>
        <td class="value">'.ucfirst(GDOE('was_hospital_treatment')).'</td>
        <td class="label">If yes who was the treating doctor?</td>
        <td class="value">'.GDOE('hospital_treating_doctor').'</td>
      </tr>
    </table>
    
    <pagebreak/>
    <div class="section" style="margin-top:-10px">Details of incident or accident</div>
    <table width="100%" border="0">
      <tr>
        <td valign="top" width="50%">';
        $arr = array(
          'head_face' => 'Head/Face',
          'eye' => 'Eye',
          'internal_organs' => 'Internal organs',
          'hand_fingers' => 'Hand/fingers',
          'shoulders_arms' => 'Shoulder/Arms',
          'trunk' => 'Trunk ( other than back )',
          'hip_leg' => 'Hip/Leg',
          'foot_toes' => 'Foot/Toes',
          'back' => 'Back',
          'others' => 'Others'
        );
        $v = explode(',',@$data['location_of_incident']);
        $html .='
          <p style="font-weight:bold;font-size:12px;">Location of Injury</p>
          <table border="0" style="border:unset;margin-top:10px">
            <tr>
              <td width="30px" valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('head_face', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td ><p class="p">'.$arr['head_face'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('eye', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['eye'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('internal_organs', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['internal_organs'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('hand_fingers', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['hand_fingers'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('shoulders_arms', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['shoulders_arms'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('trunk', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['trunk'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('hip_leg', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['hip_leg'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('foot_toes', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['foot_toes'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('back', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['back'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('others', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['others'].'</p></td>
            </tr> 
          </table>
        </td>
        <td valign="top" width="50%">';
        $arr = array(
          'contusion_crush' => 'Contusion/Crush',
          'burn' => 'Burn',
          'dislocation' => 'Dislocation',
          'amputation' => 'Amputation',
          'laceration_open_wound' => 'Laceration/Open wound',
          'superficial_injury' => 'Superficial injury',
          'foreign_body' => 'Foreign body',
          'internal_injury' => 'Internal Injury',
          'concussion' => 'Concussion',
          'sprain_stain' => 'Sprain/Stain',
          'fracture' => 'Fracture',
          'dermatitis' => 'Dermatitis',
          'others' => 'Others'
        );
        $v = explode(',',@$data['injury_details']);
        $html .='
          <p style="font-weight:bold;font-size:12px;">Injury Details</p>
          <table border="0" style="border:unset;margin-top:10px">
            <tr>
              <td width="30px" valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('contusion_crush', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td ><p class="p">'.$arr['contusion_crush'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('burn', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['burn'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('dislocation', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['dislocation'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('amputation', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['amputation'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('laceration_open_wound', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['laceration_open_wound'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('superficial_injury', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['superficial_injury'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('foreign_body', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['foreign_body'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('internal_injury', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['internal_injury'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('concussion', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['concussion'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('sprain_stain', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['sprain_stain'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('fracture', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['fracture'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('dermatitis', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['dermatitis'].'</p></td>
            </tr> 
            <tr>
              <td valign="top"><img src="'.$pdfOrImagePath.'/'.(in_array('others', $v) ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
              <td><p class="p">'.$arr['others'].'</p></td>
            </tr> 
          </table>
        </td>
      </tr>
    </table>

    <table class="table tbb">
      <tr>
        <td class="label">Other Location</td>
        <td class="value">'.(in_array('others', $v) ? GDOE('location_of_incident_others') : '-').'</td>
        <td class="label">Other Details</td>
        <td class="value">'.(in_array('others', $v) ? GDOE('injury_details_others') : '-').'</td>
      </tr>
      <tr>
        <td class="label" width="25%">Date of, or disclosure of, event </td>
        <td class="value" width="25%">'.GDOE('date_of_injury').'</td>
        <td class="label" width="25%">Time of Incident </td>
        <td class="value" width="25%">'.GDOE('time_of_injury').'</td>
      </tr>
      <tr>
        <td class="label" colspan="4">Service involved at the time of incident</td>
      </tr>
      <tr>
        <td class="value" colspan="4">'.GDOE('activity_engaged').'</td>
      </tr>
      <tr>
        <td class="label" colspan="4">Describe how and what happened. Please include car registration number if reporting a Motor Vehicle Accident).</td>
        </tr>
        <tr>
        <td class="value" colspan="4">'.GDOE('what_happen').'</td>
      </tr>
    </table>
    
    <pagebreak/>

    <div class="section" style="margin-top:-10px">Physical Harm</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="50%">Nature of Incident (injury/illness: e.g. burn, sprain, cut etc.)</td>
        <td class="label" width="50%">Location on body (please circle and specify)</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('nature_of_injury').'</td>
        <td class="value" rowspan="3">
          <img src="'.$domainPath.'/files/documents/incident/circleImg/circleImg'.$res['id'].'-ci-mod.png" width="350px">
        </td>
      </tr>
      <tr>
        <td class="label">How incident occurred (e.g. fall, grabbed by person, muscular stress)</td>
      </tr>
      <tr>
        <td class="value" style="height:240px" valign="top">'.GDOE('how_injury_occurred').'</td>
      </tr>
      <tr>
        <td class="label">Treatment administered if required</td>
        <td class="label">Treatment</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('treatment_administered').'</td>        
        <td class="value">'.GDOE('treatment').'</td>
      </tr>
      <tr>
        <td class="label">Referral required</td>
        <td class="label">Who to</td>
      </tr>
      <tr>
      <td class="value">'.GDOE('referral_required').'</td>        
        <td class="value">'.GDOE('referral_who_to').'</td>
      </tr>
      <tr>
        <td class="label">First Aid Attendant Name</td>
        <td class="value">'.GDOE('first_aid_attendant_name').'</td>
      </tr>
    </table>';
    
    
    #SPW or User Signature if available
    if(file_exists('../files/documents/incident/signatures/spwUserSign'.$res['id'].'-as.png')){
      $html .= '<br/><br/>
      <table class="table" width="100%">
        <tr>
          <td class="value" width="40%" style="text-align:center;border:unset" valign="bottom">
            <strong>'.(GDOE('inserted_date') === '-' ? date('d-m-Y') : date('d-m-Y',strtotime(GDOE('inserted_date')))).'</strong>
            <hr>  
            Date of Submitting
          </td>
          <td class="value" width="20%" style="border:unset"></td>
          <td class="value" width="40%" style="text-align:center;border:unset" valign="bottom">
            <img style="max-width:160px" src="'.$domainPath.'/files/documents/incident/signatures/spwUserSign'.$res['id'].'-as.png">
            <hr/>
            Signature
          </td>
        </tr>
      </table>
      ';
    }//End if condition


    #If it's not Support Worker then add Office Use section in PDF
    if(!@$_SESSION['link_id'] AND !@$external){

      $html .= '<pagebreak/>

      <div class="section" style="margin-top:-10px">For Management Use Only</div>
      <div class="section" style="margin-top:-15px">Incident Or Accident Investigation</div>

      <table class="table tbb">
        <tr>
          <td class="label" width="50%">Is this a reportable incident?</td>
          <td class="label" width="50%">Which regulators have been notified?</td>
        </tr>
        <tr>
          <td class="value">'.GDOE('is_reportable_incident').'</td>
          <td class="value">'.GDOE('regulator_notice').'</td>
        </tr>
        <tr>
          <td class="label">Have you referred to the NDIS Incident Report Policy (for reportable incidents)</td>
          <td class="value">'.GDOE('referred_to_ndis').'</td>
        </tr>
      </table>

      <div class="section">Other parties to advise about the incident?</div>
      <table class="table tbb">
          <tr>
            <td class="label" width="33.3%">Work Unit/Individual</td>
            <td class="label" width="33.3%">Date Advised</td>
            <td class="label" width="33.3%">Method of Contact</td>
          </tr>
          ';
          if (@$parties) {
            foreach(explode('<%>',$data['parties_work_unit']) as $k => $v){
              $html .= '
              <tr>
                <td class="value">'.$v.'</td>
                <td class="value">'.explode('<%>',$data['parties_date_advised'])[$k].'</td>
                <td class="value">'.explode('<%>',$data['parties_method_of_contact'])[$k].'</td>
              </tr>
              ';
            }//End foreach
          }else{
            $html .= '
            <tr>
              <td class="value">-</td>
              <td class="value">-</td>
              <td class="value">-</td>
            </tr>
            ';
          }//End if condition
          $html .='
      </table>

      <div class="section">Consideration for further Risk Management</div>
      <table class="table tbb">
        <tr>
          <td class="label" width="33.3%">Risk Management Plan</td>
          <td class="label" width="33.3%">Risk Management plan to be reviewed by</td>
          <td class="label" width="33.3%">Date Due</td>
        </tr>
        <tr>
          <td class="value">'.GDOE('risk_management_plan').'</td>
          <td class="value">'.GDOE('risk_management_plan_reviewed_by').'</td>
          <td class="value">'.GDOE('due_date').'</td>
        </tr>
        <tr><td class="label" colspan="3">Reporting Person or Reviewer Comments</td><tr>
        <tr><td class="value" colspan="3">'.GDOE('reporting_person_comment').'</td><tr>
      </table>


      <br/><br/><br/>
      <table class="table" width="100%">
        <tr>
          <td class="value" width="40%" style="text-align:center;border:unset" valign="bottom">
            <strong>'.(GDOE('inserted_date') === '-' ? date('d-m-Y') : (GDOE('updated_date') === '-' ? date('d-m-Y',strtotime(GDOE('inserted_date'))) : date('d-m-Y',strtotime(GDOE('updated_date'))))).'</strong>
            <hr>  
            Date of Approved
          </td>
          <td class="value" width="20%" style="border:unset"></td>
          <td class="value" width="40%" style="text-align:center;border:unset" valign="bottom">
            <img style="max-width:160px" src="'.$domainPath.'/files/documents/incident/signatures/adminSign'.$res['id'].'-as.png">
            <hr/>
            Signature
          </td>
        </tr>
      </table>';


      $html .= '</div></body></html>';

    }//End if condition



?>