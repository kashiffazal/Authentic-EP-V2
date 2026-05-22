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


#Header ---------------------------------//
    $header = "
        <div style='margin:0px 0px;'>
            <table border='0' style='width:100%;padding:0;border-collapse: collapse;'>
                <tr>
                  <td width='50%' style='font-size:18px;color:#424242'>
                    <b>Support Worker Registration Form</b>
                    ".($job_title ? '<div style="font-size:14px;">'.$job_title.'</div>' : '')."
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
      <title>Support Worker Registration Form</title>
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
      </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  ';

  $html .= '
  <div class="container">
    <div class="section" style="margin-top:-10px">Contact Information</div>
    

    <table class="table">
      <tr>
        <td class="label" width="50%">NDIS Workers Screening ID</td>
        <td class"value">'.GDOE('ndis_workers_screening_id').'</td>
      </tr>
    </table>

    <table class="table tbb">
      <tr>
        <td class="label" width="25%">First Name</td>
        <td class="label" width="25%">Last Name</td>
        <td class="label" width="25%">Mobile</td>
        <td class="label" width="25%">Email</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('first_name').'</td>
        <td class="value">'.GDOE('last_name').'</td>
        <td class="value">'.GDOE('mobile').'</td>
        <td class="value">'.GDOE('email').'</td>
      </tr>
      <tr>
        <!--td class="label">Skype ID</td-->  
        <td class="label" colspan="3">Street Address</td>
        <td class="label">Suburb</td>
      </tr>
      <tr>
        <!--td class="value">'.GDOE('skypeId').'</td-->  
        <td class="value" colspan="3">'.GDOE('street_address').'</td>
        <td class="value">'.GDOE('suburb').'</td>
      </tr>
      <tr>
        <td class="label">State</td>
        <td class="label">Post Code</td>
        <td class="label">Country</td>
        <td class="label">Date of Birth</td>
      <tr>
        <td class="value">'.GVFLS($data['state']).'</td>
        <td class="value">'.GDOE('postCode').'</td>
        <td class="value">'.GVFLC($data['country']).'</td>
        <td class="value">'.GDOE('dateOfBirth').'</td>
      </tr>
    </table>
    
    <div class="section">Emergency Contact</div>
    <table class="table tbb">
      <tr>
        <td class="label">First Name</td>
        <td class="label">Last Name</td>
        <td class="label">Mobile</td>
        <td class="label">Email</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('emergency_first_name').'</td>
        <td class="value">'.GDOE('emergency_last_name').'</td>
        <td class="value">'.GDOE('emergency_mobile').'</td>
        <td class="value">'.GDOE('emergency_email').'</td>
      </tr>
      <tr>
        <td class="label">Relationship</td>
        <td class="label" colspan="3">Home Address</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('emergency_relationship').'</td>
        <td class="value" colspan="3">'.GDOE('emergency_address').'</td>
      </tr>
      <tr>
        <td class="label" width="25%">Suburb</td>
        <td class="label" width="25%">State</td>
        <td class="label" width="25%">Post Code</td>
        <td class="label" width="25%">Country</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('emergency_suburb').'</td>
        <td class="value">'.GVFLS($data['emergency_state']).'</td>
        <td class="value">'.GDOE('emergency_postCode').'</td>
        <td class="value">'.GVFLC($data['emergency_country']).'</td>
      </tr>
    </table>

    <div class="section">Before You Begin</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="50%">Please let us know how you first heard about '.$companyDetails['name'].'?</td>
        <td class="label" width="50%">Please provide the name of the person, venue or publication/media</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('firstHeardAboutYouFirst').'</td>
        <td class="value">'.GDOE('firstHeardAboutYouFirstOthers').'</td>
      </tr>
    </table>
  
    <div class="section">Support Worker Role</div>
    <table class="table">
      <tr>
        <td class="label" width="33.3%">Are you currently working as, or have you previously worked as a Support Worker?</td>
        <td class="label" width="33.3%">Please tell us a little more about your experience as a Support Worker</td>
        <td class="label" width="33.3%">Tell us a little bit about why you are interested in being a Support Worker</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('previouslyWorked')).'</td>
        <td class="value">'.GDOE('aboutExperience').'</td>
        <td class="value">'.GDOE('whyInterested').'</td>
      </tr>
      <tr>
        <td class="label">Are you currently working for, or connected to a '.$companyDetails['name'].' Client?</td>
        <td class="label">Client\'s First Name</td>
        <td class="label">Client\'s Last Name</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('currentlyWorking')).'</td>
        <td class="value">'.GDOE('currentClientFirstName').'</td>
        <td class="value">'.GDOE('currentClientLastName').'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="66.6%">Have you received an email from '.$companyDetails['name'].' with instructions on how to register as a Casual Support Worker?</td>
        <td class="value" width="33.3%">'.ucfirst(GDOE('haveYouReceiveEmail')).'</td>
      </tr>
    </table>
    <table class="table">
      <tr><td class="label">Support Services</td></tr>
      <tr><td class="value">'.GDOE('supportServices').'</td></tr>
      <tr><td class="label">Specialised Support Services</td></tr>
      <tr><td class="value">'.GDOE('specialisedSupportServices').'</td></tr>
    </table>

    <table class="table">
      <tr><td class="label">Secondary employment declaration</td></tr>
      <tr><td class="value">'.GDOE('secondaryEmploymentDeclaration').'</td></tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="50%">First Organization Name</td>
        <td class="label" width="50%">First Organization Address</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('first_org_name').'</td>
        <td class="value">'.GDOE('first_org_addr').'</td>
      </tr>
    </table>
    <table class="table tbb">
      <tr>
        <td class="label" width="25%">Suburb</td>
        <td class="label" width="25%">State</td>
        <td class="label" width="25%">Post Code</td>
        <td class="label" width="25%">Country</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('first_org_suburb').'</td>
        <td class="value">'.GVFLS(@$data['first_org_state']).'</td>
        <td class="value">'.GDOE('first_org_post_code').'</td>
        <td class="value">'.GVFLC(@$data['first_org_country']).'</td>
      </tr>
      <tr>
        <td class="label">Name Of Manager</td>
        <td class="label">Manager Contact #</td>
        <td class="label" colspan="2">Your Role in the Organization</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('first_org_manager_name').'</td>
        <td class="value">'.GDOE('first_org_manager_contact_no').'</td>
        <td class="value" colspan="2">'.GDOE('first_org_role').'</td>
      </tr>
    </table>
    <hr/>
    <table class="table">
      <tr>
        <td class="label" width="50%">Second Organization Name</td>
        <td class="label" width="50%">Second Organization Address</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('second_org_name').'</td>
        <td class="value">'.GDOE('second_org_addr').'</td>
      </tr>
    </table>
    <table class="table tbb">
      <tr>
        <td class="label" width="25%">Suburb</td>
        <td class="label" width="25%">State</td>
        <td class="label" width="25%">Post Code</td>
        <td class="label" width="25%">Country</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('second_org_suburb').'</td>
        <td class="value">'.GVFLS(@$data['second_org_state']).'</td>
        <td class="value">'.GDOE('second_org_post_code').'</td>
        <td class="value">'.GVFLC(@$data['second_org_country']).'</td>
      </tr>
      <tr>
        <td class="label">Name Of Manager</td>
        <td class="label">Manager Contact #</td>
        <td class="label" colspan="2">Your Role in the Organization</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('second_org_manager_name').'</td>
        <td class="value">'.GDOE('second_org_manager_contact_no').'</td>
        <td class="value" colspan="2">'.GDOE('second_org_role').'</td>
      </tr>
    </table>
    
    <div class="section">About You</div>
    <table class="table">
      <tr><td class="label">Your Address</td></tr>
      <tr><td class="value">'.GDOE('your_addr').'</td></tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="33.3%">Suburb</td>
        <td class="label" width="33.3%">State</td>
        <td class="label" width="33.3%">Post Code</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('your_suburb').'</td>
        <td class="value">'.GVFLS(@$data['your_state']).'</td>
        <td class="value">'.GDOE('your_post_code').'</td>
      </tr>
      <tr>
        <td class="label">Country</td>
        <td class="label">Your Email</td>
        <td class="label">Your Mobile</td>
      </tr>
      <tr>
        <td class="value">'.GVFLC(@$data['your_country']).'</td>
        <td class="value">'.GDOE('your_email').'</td>
        <td class="value">'.GDOE('your_mobile').'</td>
      </tr>
    </table>
    <table class="table">
      <tr><td class="label">Do you have, or have you ever had any disability or health conditions including, allergies, illnesses, injuries or diseases lasting for more than 6 months and that may adversely impact on your abilities to carry out the duties of your role?</td></tr>
      <tr><td class="value">'.ucfirst(GDOE('hadAnyDisability')).'</td></tr>
      <tr><td class="label">Please provide information below:</td></tr>
      <tr><td class="value">'.GDOE('hadAnyDisabilityDetails').'</td></tr>
    </table>
    <table class="table">
      <tr><td class="label">Do you have any pre-existing injury or disease which you are aware of or could reasonably be expected to foresee, that could be affected by the nature of the duties and responsibilities of the position for which you are applying?</td></tr>
      <tr><td class="value">'.ucfirst(GDOE('injury_disease')).'</td></tr>
      <tr><td class="label">Please provide brief description (or on a separate advice):</td></tr>
      <tr><td class="value">'.nl2br(GDOE('injury_disease_desc')).'</td></tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="50%">List your qualifications related to this position and any relevant certificates, diplomas, or others.</td>
        <td class="label" width="50%">Briefly list your skills relating to this position</td>
      </tr>
      <tr>
        <td class="value">'.nl2br(GDOE('qualification_explained')).'</td>
        <td class="value">'.nl2br(GDOE('sill_explained')).'</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="66.6%" colspan="2">Are you an active member of any employer\'s Union at the moment?</td>
        <td class="value" width="33.3%">'.ucfirst(GDOE('unionMoment')).'</td>
      </tr>
      <tr>
        <td class="label">Name of the Union</td>
        <td class="label">Contact Number of the Union</td>
        <td class="label">Address of the Union</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('unionName')).'</td>
        <td class="value">'.ucfirst(GDOE('unionContact')).'</td>
        <td class="value">'.ucfirst(GDOE('unionAddress')).'</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have your own reliable car?</td>
        <td class="label" width="50%">Do you have a VIC driving license?</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('reliableCar')).'</td>
        <td class="value">'.ucfirst(GDOE('hac_vic_driving_license')).'</td>
      </tr>
  </table>
  <table class="table">
    <tr>
      <td class="label" width="75%">Do you have a superannuation account with a registered super company?</td>
      <td class"value">'.GDOE('has_superannuation_ac').'</td>
    </tr>
  </table>
      
  <table class="table tbb">
    <tr>
      <td class="label" width="25%">Availability in a full week?</td>
      <td class="label" width="25%">From</td>
      <td class="label" width="25%">To</td>
      <td class="label" width="25%">Available?</td>
    </tr>
    ';
    $avl_days = explode(',', GDOE('days_availibility_day'));
    $avl_from = explode(',', GDOE('days_availibility_from'));
    $avl_to   = explode(',', GDOE('days_availibility_to'));
    $avl_na   = explode(',', GDOE('days_availibility_na'));
    foreach($avl_days as $key => $value){
      $html .= '
      <tr>
        <td class="value">'.$value.'</td>
        <td class="value">'.((!@$avl_na[$key] AND $avl_from[$key]) ? date('h:i:s A',strtotime($avl_from[$key])) : '-').'</td>
        <td class="value">'.((!@$avl_na[$key] AND $avl_to[$key]) ? date('h:i:s A',strtotime($avl_to[$key])) : '-').'</td>
        <td class="value">'.(@$avl_na[$key] ? 'N/A' : '-').'</td>
      </tr>        
      ';  
    }//End foreach
    $html .= '
  </table>

    <div class="section">Right to Work in Australia</div>
    <table class="table">
      <tr>
        <td class="label" width="50%">Are you an Australian Citizen or Permanent Resident?</td>
        <td class="label" width="50%">Do you have a visa that provides you with the Right to Work in Australia?</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('australianCitizen')).'</td>
        <td class="value">'.ucfirst(GDOE('haveVisa')).'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="25%">Class and subclass of your current visa?</td>
        <td class="label" width="25%">Visa grant number</td>
        <td class="label" width="25%">Visa expiry date</td>
        <td class="label" width="25%">Passport number</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('visaClassSubClass')).'</td>
        <td class="value">'.GDOE('visaGrantNumber').'</td>
        <td class="value">'.GDOE('visaExpDate').'</td>
        <td class="value">'.GDOE('passportNumber').'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="50%">Passport country of issue</td>
        <td class="label" width="50%">Are there any restrictions on your visa, or any other information about your visa that you think we should know?</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('countryOfIssue').'</td>
        <td class="value">'.GDOE('restrictionsOnVisa').'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="50%">Passport date of issue</td>
        <td class="label" width="50%">Passport date of expiry</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('passportIssueDate').'</td>
        <td class="value">'.GDOE('passportExpDate').'</td>
      </tr>
    </table>
    <table class="table tbb">
      <tr>
        <td class="label" width="75%">If you don\'t have visa</td>
        <td class"value">'.GDOE('dontHaveVisaDesc').'</td>
      </tr>
    </table>

    <div class="section">Diversity & Inclusion</div>
    <table class="table">
      <tr>
        <td class="label" width="50%">Gender</td>
        <td class="label" width="50%">Please self describe your gender below</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('gender').'</td>
        <td class="value">'.GDOE('genderSelfDesc').'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="75%">Do you identify as Aboriginal and / or Torres Strait Islander?</td>
        <td class="value" width="25%">'.ucfirst(GDOE('identify')).'</td>
      </tr>
      <tr>
        <td class="label">Are you of a Culturally and / or Linguistically Diverse (CALD) background?</td>
        <td class="value">'.ucfirst(GDOE('culturally')).'</td>
      </tr>
      <tr>
        <td class="label">Were you born in Australia?</td>
        <td class="value">'.ucfirst(GDOE('wherYouBorn')).'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
      <tr>
        <td class="label" width="50%">Please select your country of birth</td>
        <td class="label" width="50%">If you have selected Other, please let us know your country of birth</td>
      </tr>
      <tr>
        <td class="value">'.GVFLC(@$data['bornCountry']).'</td>
        <td class="value">'.ucfirst(GDOE('otherBornCountry')).'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="50%">Is English the main language you speak at home?</td>
        <td class="label" width="50%">Please let us know the main language you speak at home</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('isEnglishMain')).'</td>
        <td class="value">'.GDOE('mainLanguage').'</td>
      </tr>
      <tr>
        <td class="label">Other - Please let us know the main language spoken at home</td>
        <td class="label">What other languages you can speak?</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('otherMainLanguage').'</td>
        <td class="value">'.GDOE('otherLanguageSpeak').'</td>
      </tr>
    </table>
    <table class="table tbb">
      <tr>
        <td class="label" width="75%">Do you identify as Lesbian, Gay, Bi-Sexual, Transgender, Intersex and / or Queer?</td>
        <td class="value" width="25%">'.ucfirst(GDOE('identifyAs')).'</td>
      </tr>
    </table>
    
    <div class="section">Experience & Skills</div>
    <table class="table">
      <tr>
        <td class="label" width="50%">Please let us know about your current, or previous, work experience</td>
        <td class="label" width="50%">What is the name of your current employer?</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('workExp').'</td>
        <td class="value">'.GDOE('nameOfEmployer').'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="66.6%">What is the address of your current employer?</td>
        <td class="label" width="33.3%">Suburb</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('exp_street_address').'</td>
        <td class="value">'.GDOE('exp_suburb').'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="33.3%">State</td>
        <td class="label" width="33.3%">Post Code</td>
        <td class="label" width="33.3%">Country</td>
      </tr>
      <tr>
        <td class="value">'.GVFLS(@$data['exp_state']).'</td>
        <td class="value">'.GDOE('exp_postCode').'</td>
        <td class="value">'.GVFLC(@$data['exp_country']).'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="66.6%">What is the address of your last employer?</td>
        <td class="label" width="33.3%">Suburb</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('exp_last_street_address').'</td>
        <td class="value">'.GDOE('exp_last_suburb').'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="33.3%">State</td>
        <td class="label" width="33.3%">Post Code</td>
        <td class="label" width="33.3%">Country</td>
      </tr>
      <tr>
        <td class="value">'.GVFLS(@$data['exp_last_state']).'</td>
        <td class="value">'.GDOE('exp_last_postCode').'</td>
        <td class="value">'.GVFLC(@$data['exp_last_country']).'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="50%">What is your current role?</td>
        <td class="label" width="50%">What are the main skills you have gained in your current role?</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('currentWorkRole').'</td>
        <td class="value">'.GDOE('currentWorkSkills').'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="50%">What was the name of your last employer?</td>
        <td class="label" width="50%">What year did you stop working for your last employer?</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('nameOfLastEmp').'</td>
        <td class="value">'.GDOE('yearOfStopWorking').'</td>
      </tr>
      <tr>
        <td class="label">What was your previous role?</td>
        <td class="label">What are the main skills you gained in your previous role?</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('previousRole').'</td>
        <td class="value">'.GDOE('previousSkills').'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="75%">Have you undertaken any relevant volunteer work?</td>
        <td class="value" width="25%">'.ucfirst(GDOE('undertakenVolunteer')).'</td>
      </tr>
    </table>
    <table class="table tbb">
      <tr>
        <td class="label" width="33.3%">Please let us know what type of volunteering you have undertaken</td>
        <td class="label" width="33.3%">If you have selected Other, please let us know a little more about the type of volunteering you have undertaken</td>
        <td class="label" width="33.3%">What are the main skills you have developed while volunteering?</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('typeOfVolunteering').'</td>
        <td class="value">'.GDOE('otherVolunteering').'</td>
        <td class="value">'.GDOE('skillsOnVolunteering').'</td>
      </tr>
    </table>

    <div class="section">Local References</div>
    <table class="table tbb">
        <tr>
          <td class="label" width="60%">Please provide at least 2 local references from Australia. One of them must be a professional reference.</td>
          <td class="value" width="40%">'.ucfirst(GDOE('isLocalReferences')).'</td>
        </tr>
    </table>
    ';
    $lor_name = explode(',', GDOE('localReferences_name_of_referee'));
    $lor_cont = explode(',', GDOE('localReferences_contact_no'));
    $lor_email = explode(',', GDOE('localReferences_email_address'));
    $lor_orga   = explode(',', GDOE('localReferences_organisation'));
    $lor_posi   = explode(',', GDOE('localReferences_position_held'));
    foreach($lor_cont as $key => $value){
      $html .= '
      <div style="margin:10px 0px;"><strong>Local References # '.($key+1).'</strong></div>
      <table class="table tbb">
        <tr>
          <td class="label" width="30%">Name of Referee</td>
          <td class="label" width="30%">Contact No</td>
          <td class="label" width="40%">Email</td>
        </tr>
        <tr>
          <td class="value">'.$lor_name[$key].'</td>
          <td class="value">'.$value.'</td>
          <td class="value">'.$lor_email[$key].'</td>
        </tr>
        <tr>
          <td class="label" colspan="2">Position Held</td>
          <td class="label">Name of Organisation</td>
        </tr>
        <tr>
          <td class="value" colspan="2">'.$lor_posi[$key].'</td>
          <td class="value">'.$lor_orga[$key].'</td>
        </tr>
      </table>
      ';  
    }//End foreach
    $html .= '


  <div class="section">Criminal Declaration</div>
  <table class="table">
    <tr>
      <td class="label" width="75%">Do you have any convictions, finding of guilt and/or pending police charges against you that are less than 10 years old?</td>
      <td class="value" width="25%">'.ucfirst(GDOE('criminal_declaration')).'</td>
    </tr>
  </table>
  <table class="table">
    <tr>
      <tr><td class="label">Please provide brief description</td></tr>
      <tr><td class="value">'.GDOE('criminal_declaration_desc').'</td></tr>
    </tr>
  </table>
  <table class="table tbb">
  <tr>
    <>
      <td class="label" width="50%">From what date will you be able to start work?</td>
      <td class="value" width="50%">'.GDOE('joiningDate').'</td>
    </tr>
  </tr>
</table>



    <!--div class="section">Qualifications & Documents</div>
    <table class="table">
      <tr>
        <td class="label" width="75%">Do you have any relevant qualifications you would like to tell us about?</td>
        <td class="value" width="25%">'.ucfirst(GDOE('relevantQualifications')).'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="50%">Type of qualification</td>
        <td class="label" width="50%">If you have selected Other, please tell us what type of qualification your hold</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('typeOfQualification').'</td>
        <td class="value">'.GDOE('otherQulification').'</td>
      </tr>
      <tr>
        <td class="label">Qualification certificate name</td>
        <td class="label">Qualification completed or expected completion year</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('qualCertificateName').'</td>
        <td class="value">'.GDOE('qualCompleteYear').'</td>
      </tr>
    </table>
    <table class="table">
      <tr><td class="label">Qualification issuing body name e.g., school, university, TAFE name)?</td></tr>
      <tr><td class="value">'.GDOE('qualSchoolUniName').'</td></tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="75%">Would you like to add another qualification?</td>
        <td class="value" width="25%">'.ucfirst(GDOE('anotherQulification')).'</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td class="label" width="50%">Type of qualification</td>
        <td class="label" width="50%">If you have selected Other, please tell us what type of qualification your hold</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('anotherTypeOfQualification').'</td>
        <td class="value">'.GDOE('anotherOtherQulification').'</td>
      </tr>
      <tr>
        <td class="label">Qualification certificate name</td>
        <td class="label">Qualification completed or expected completion year</td>
      </tr>
      <tr>
        <td class="value">'.GDOE('anotherQualCertificateName').'</td>
        <td class="value">'.GDOE('anotherQualCompleteYear').'</td>
      </tr>
    </table>
    <table class="table tbb">
      <tr><td class="label">Qualification issuing body name e.g., school, university, TAFE name)?</td></tr>
      <tr><td class="value">'.GDOE('anotherQualSchoolUniName').'</td></tr>
    </table-->

    
    
    
    <pagebreak/>
    <div class="section" style="margin-top:-10px">Identification Documents - 100 Point Checklist</div>
    <table class="table tbb">
      <tr>
        <td width="7%" class="label" align="center">Tick</td>
        <td width="39%" class="label">Documents</td>
        <td width="20%" class="label" align="center">Required on Doc</td>
        <td width="10%" class="label" align="center">Point Worth</td>
        <td width="14%" class="label" align="center">Uploaded Documents</td>
        <td width="10%" class="label" align="center">Point Gained</td>
      </tr> 
      <tr>
        <td class="label" align="center" colspan="6">Primary Documents</td>
      </tr> 
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['havePassportCopy'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Foreign Passport (current)</td>
        <td class="value" align="center">Name & Photo</td>
        <td class="value" align="center">70</td>
        <td class="value" align="center">';
          if($data['havePassportCopy']){

            if(isset($fileNameForPDF['uploadCopyOfPassportOne'])){
              foreach(@$fileNameForPDF['uploadCopyOfPassportOne'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
            }else{$html .= '-';};

            // if(isset($fileNameForPDF['uploadCopyOfPassportTwo'])){
            //   foreach(@$fileNameForPDF['uploadCopyOfPassportTwo'] as $key => $value){
            //     foreach(explode(',',$value) as $k => $vl){
            //       $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
            //   }//End foreach
            // }else{$html .= '-';};

          }else{$html .= '-';};//End if condition
          $html .='</td>
        <td class="value" align="center">'.($data['havePassportCopy'] ? '70' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveAustPassportCopy'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Australian Passport (current or expired within last 2 years but not cancelled)</td>
        <td class="value" align="center">Name & Photo</td>
        <td class="value" align="center">70</td>
        <td class="value" align="center">';
          if($data['haveAustPassportCopy']){

            if(isset($fileNameForPDF['uploadCopyOfAustPassportOne'])){
                foreach(@$fileNameForPDF['uploadCopyOfAustPassportOne'] as $key => $value){
                  foreach(explode(',',$value) as $k => $vl){
                    $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
                }//End foreach
            }else{$html .= '-';};

            // if(isset($fileNameForPDF['uploadCopyOfAustPassportTwo'])){
            //   foreach(@$fileNameForPDF['uploadCopyOfAustPassportTwo'] as $key => $value){
            //     foreach(explode(',',$value) as $k => $vl){
            //       $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
            //   }//End foreach
            // }else{$html .= '-';};

          }else{$html .= '-';};//End if condition

          $html .='</td>
        <td class="value" align="center">'.($data['haveAustPassportCopy'] ? '70' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveAustCitizenCertificate'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Australian Citizenship Certificate</td>
        <td class="value" align="center">Name</td>
        <td class="value" align="center">70</td>
        <td class="value" align="center">';          
          if($data['haveAustCitizenCertificate'] AND isset($fileNameForPDF['uploadAustCitizenCertificate'])){
              foreach(@$fileNameForPDF['uploadAustCitizenCertificate'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveAustCitizenCertificate'] ? '70' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveFullBirthCertificate'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Full Birth certificate (not birth certificate extract)</td>
        <td class="value" align="center">Name</td>
        <td class="value" align="center">70</td>
        <td class="value" align="center">';          
          if($data['haveFullBirthCertificate'] AND isset($fileNameForPDF['uploadFullBirthCertificate'])){
              foreach(@$fileNameForPDF['uploadFullBirthCertificate'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveFullBirthCertificate'] ? '70' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveIdentityRefugeesCertificate'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Certificate of Identity issued by the Australian Government to refugees and non Australian citizens for entry to Australia</td>
        <td class="value" align="center">Name</td>
        <td class="value" align="center">70</td>
        <td class="value" align="center">';          
          if($data['haveIdentityRefugeesCertificate'] AND isset($fileNameForPDF['uploadIdentityRefugeesCertificate'])){
              foreach(@$fileNameForPDF['uploadIdentityRefugeesCertificate'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveIdentityRefugeesCertificate'] ? '70' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveDrivingLicense'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Australian Driver Licence/Learner\'s Permit</td>
        <td class="value" align="center">Name, Address & Photo</td>
        <td class="value" align="center">40</td>
        <td class="value" align="center">';
        
          if($data['haveDrivingLicense'] AND isset($fileNameForPDF['uploadDrivingLicenseFront'])){

            if(isset($fileNameForPDF['uploadDrivingLicenseFront'])){
              foreach(@$fileNameForPDF['uploadDrivingLicenseFront'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
                }//End foreach
            }else{$html .= '-';};
          
            if(isset($fileNameForPDF['uploadDrivingLicenseBack'])){
              foreach(@$fileNameForPDF['uploadDrivingLicenseBack'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
            }else{$html .= '-';};
          
          }else{$html .= '-';};//End if condition
          
          $html .='</td>
        <td class="value" align="center">'.($data['haveDrivingLicense'] ? '40' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveIdentityCard'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Current (Australian) Tertiary Student Identification Card</td>
        <td class="value" align="center">Name & Photo</td>
        <td class="value" align="center">40</td>
        <td class="value" align="center">';
          if($data['haveIdentityCard'] AND isset($fileNameForPDF['uploadIdentityCard'])){
              foreach(@$fileNameForPDF['uploadIdentityCard'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveIdentityCard'] ? '40' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveIdentityCardPhoto'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Photo identification card issued for Australian regulatory purposes (e.g. Aviation/Maritime Security identification, security industry etc.)</td>
        <td class="value" align="center">Name & Photo</td>
        <td class="value" align="center">40</td>
        <td class="value" align="center">';
          if($data['haveIdentityCardPhoto'] AND isset($fileNameForPDF['uploadIdentityCardPhoto'])){
              foreach(@$fileNameForPDF['uploadIdentityCardPhoto'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveIdentityCardPhoto'] ? '40' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveGovEmpId'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Government employee ID (Australian Federal/State/Territory)</td>
        <td class="value" align="center">Name & Photo</td>
        <td class="value" align="center">40</td>
        <td class="value" align="center">';
          if($data['haveGovEmpId'] AND isset($fileNameForPDF['uploadGovEmpId'])){
              foreach(@$fileNameForPDF['uploadGovEmpId'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveGovEmpId'] ? '40' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveForceIdentityCard'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Defence Force Identity Card (with photo or signature)</td>
        <td class="value" align="center">Name & Photo</td>
        <td class="value" align="center">40</td>
        <td class="value" align="center">';
          if($data['haveForceIdentityCard'] AND isset($fileNameForPDF['uploadForceIdentityCard'])){
              foreach(@$fileNameForPDF['uploadForceIdentityCard'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveForceIdentityCard'] ? '40' : '').'</td>
      </tr>
      <tr>
        <td class="label" align="center" colspan="6">Secondary Documents</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveDVACard'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Department of Veterans Affairs (DVA) card</td>
        <td class="value" align="center">Name & Address</td>
        <td class="value" align="center">40</td>
        <td class="value" align="center">';
          if($data['haveDVACard'] AND isset($fileNameForPDF['uploadDVACard'])){
              foreach(@$fileNameForPDF['uploadDVACard'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveDVACard'] ? '40' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveCentrelinkCard'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Centrelink card (with reference number)</td>
        <td class="value" align="center">Name & Address</td>
        <td class="value" align="center">40</td>
        <td class="value" align="center">';
          if($data['haveCentrelinkCard'] AND isset($fileNameForPDF['uploadCentrelinkCard'])){
              foreach(@$fileNameForPDF['uploadCentrelinkCard'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveCentrelinkCard'] ? '40' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveBirthExtractCertificate'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Birth Certificate Extract</td>
        <td class="value" align="center">Name</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveBirthExtractCertificate'] AND isset($fileNameForPDF['uploadBirthExtractCertificate'])){
              foreach(@$fileNameForPDF['uploadBirthExtractCertificate'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveBirthExtractCertificate'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveBirthCard'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Birth card (NSW Births, Deaths, Marriages issue only)</td>
        <td class="value" align="center">Name</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveBirthCard'] AND isset($fileNameForPDF['uploadBirthCard'])){
              foreach(@$fileNameForPDF['uploadBirthCard'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveBirthCard'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveMedicareCard'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Medicare card</td>
        <td class="value" align="center">Name</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveMedicareCard'] AND isset($fileNameForPDF['uploadMedicareCard'])){
              foreach(@$fileNameForPDF['uploadMedicareCard'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveMedicareCard'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveCreditCard'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Credit card or account card</td>
        <td class="value" align="center">Name</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveCreditCard'] AND isset($fileNameForPDF['uploadCreditCard'])){
              foreach(@$fileNameForPDF['uploadCreditCard'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveCreditCard'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveAustMarriageCertificate'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Australian Marriage certificate (Australian Registry issue only)</td>
        <td class="value" align="center">Name & Signature</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveAustMarriageCertificate'] AND isset($fileNameForPDF['uploadAustMarriageCertificate'])){
              foreach(@$fileNameForPDF['uploadAustMarriageCertificate'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveAustMarriageCertificate'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveDceNisiAbs'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Decree Nisi / Decree Absolute (Australian Registry issue only)</td>
        <td class="value" align="center">Name & Signature</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveDceNisiAbs'] AND isset($fileNameForPDF['uploadDceNisiAbs'])){
              foreach(@$fileNameForPDF['uploadDceNisiAbs'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveDceNisiAbs'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveChangeOfNameCertificate'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Change of name certificate (Australian Registry issue only)</td>
        <td class="value" align="center">Name & Address</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveChangeOfNameCertificate'] AND isset($fileNameForPDF['uploadChangeOfNameCertificate'])){
              foreach(@$fileNameForPDF['uploadChangeOfNameCertificate'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveChangeOfNameCertificate'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveBankStatement'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Bank statement (showing transactions)</td>
        <td class="value" align="center">Name & Address</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveBankStatement'] AND isset($fileNameForPDF['uploadBankStatement'])){
              foreach(@$fileNameForPDF['uploadBankStatement'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveBankStatement'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveProLeaseAgreement'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Property lease agreement - current address</td>
        <td class="value" align="center">Name & Address</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveProLeaseAgreement'] AND isset($fileNameForPDF['uploadProLeaseAgreement'])){
              foreach(@$fileNameForPDF['uploadProLeaseAgreement'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveProLeaseAgreement'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveTaxAssessNotice'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Taxation assessment notice</td>
        <td class="value" align="center">Name & Address</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveTaxAssessNotice'] AND isset($fileNameForPDF['uploadTaxAssessNotice'])){
              foreach(@$fileNameForPDF['uploadTaxAssessNotice'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveTaxAssessNotice'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveAustMortgageDoc'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Australian Mortgage Documents - Current address</td>
        <td class="value" align="center">Name & Address</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveAustMortgageDoc'] AND isset($fileNameForPDF['uploadAustMortgageDoc'])){
              foreach(@$fileNameForPDF['uploadAustMortgageDoc'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveAustMortgageDoc'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveRatingAuthority'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Rating Authority - Current address eg Land Rates</td>
        <td class="value" align="center">Name & Address</td>
        <td class="value" align="center">25</td>
        <td class="value" align="center">';
          if($data['haveRatingAuthority'] AND isset($fileNameForPDF['uploadRatingAuthority'])){
              foreach(@$fileNameForPDF['uploadRatingAuthority'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveRatingAuthority'] ? '25' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveUtilityBill'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Utility Bill - electricity, gas, telephone - Current address (less than 12 months old)</td>
        <td class="value" align="center">Name & Address</td>
        <td class="value" align="center">20</td>
        <td class="value" align="center">';
          if($data['haveUtilityBill'] AND isset($fileNameForPDF['uploadUtilityBill'])){
              foreach(@$fileNameForPDF['uploadUtilityBill'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveUtilityBill'] ? '20' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveRefIndigenousOrg'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Reference from Indigenous Organisation</td>
        <td class="value" align="center">Name & Photo</td>
        <td class="value" align="center">20</td>
        <td class="value" align="center">';
          if($data['haveRefIndigenousOrg'] AND isset($fileNameForPDF['uploadRefIndigenousOrg'])){
              foreach(@$fileNameForPDF['uploadRefIndigenousOrg'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveRefIndigenousOrg'] ? '20' : '').'</td>
      </tr>
      <tr>
        <td class="value" align="center"><img src="'.$pdfOrImagePath.'/'.($data['haveDocIssuedOutAust'] ? 'check-box-checked' : 'check-box-uncheck').'.jpg" width="15px"></td>
        <td class="value">Documents issued outside Australia (equivalent to Australian documents). Must have official translation attached</td>
        <td class="value" align="center">Name & Photo</td>
        <td class="value" align="center">20</td>
        <td class="value" align="center">';
          if($data['haveDocIssuedOutAust'] AND isset($fileNameForPDF['uploadDocIssuedOutAust'])){
              foreach(@$fileNameForPDF['uploadDocIssuedOutAust'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">View</a><br/>';}
              }//End foreach
          }else{$html .= '-';};
          $html .='</td>
        <td class="value" align="center">'.($data['haveDocIssuedOutAust'] ? '20' : '').'</td>
      </tr>
    </table>

    <div class="subSection">Other Document(s)</div>
    <table class="table tbb">
      <tr>
        <td class="label" width="50%">NDIS Workers Screening Check Document</td>
        <td class="value" width="50%">';
          if(isset($fileNameForPDF['ndisWorkersWcreeningDoc'])){
            foreach(@$fileNameForPDF['ndisWorkersWcreeningDoc'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
              }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">COVID - 19 Vaccinations Proof</td>
        <td class="label" width="50%">Vaccinations Proof</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveCovid19VaccinationsProof')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadCovid19VaccinationsProof'])){
            foreach(@$fileNameForPDF['uploadCovid19VaccinationsProof'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
              }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have a CV?</td>
        <td class="label" width="50%">Uploaded CV</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveResume')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadCV'])){
            foreach(@$fileNameForPDF['uploadCV'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
              }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Student ID Card?</td>
        <td class="label" width="50%">Uploaded Student ID Card</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveStudentIdCatd')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadStudentIdCard'])){
            foreach(@$fileNameForPDF['uploadStudentIdCard'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Driving License?</td>
        <td class="label" width="50%">Uploaded Driving License</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveDrivingLicense')).'</td>
        <td class="value">';

        if(isset($fileNameForPDF['uploadDrivingLicenseFront'])){
            foreach(@$fileNameForPDF['uploadDrivingLicenseFront'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
        }//End foreach
              }else{$html .= '-';};

        if(isset($fileNameForPDF['uploadDrivingLicenseBack'])){
          foreach(@$fileNameForPDF['uploadDrivingLicenseBack'] as $key => $value){
            foreach(explode(',',$value) as $k => $vl){
              $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
            }//End foreach
        }else{$html .= '-';};

        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Car Insurance Details?</td>
        <td class="label" width="50%">Uploaded Insurance Details</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveCarInsurance')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadCarInsurance'])){
            foreach(@$fileNameForPDF['uploadCarInsurance'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Passport Copy (if you are a foreigner)?</td>
        <td class="label" width="50%">Passport Copy</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('havePassportCopy')).'</td>
        <td class="value">';
        
          if(isset($fileNameForPDF['uploadCopyOfPassportOne'])){
              foreach(@$fileNameForPDF['uploadCopyOfPassportOne'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
              }//End foreach
          }else{$html .= '-';};

          if(isset($fileNameForPDF['uploadCopyOfPassportTwo'])){
            foreach(@$fileNameForPDF['uploadCopyOfPassportTwo'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
            }//End foreach
          }else{$html .= '-';};


        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Current Police Check (if you are foreigner and here in Australia in less than 10 years, please provide international police check)?</td>
        <td class="label" width="50%">Uploaded Current Police Check</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('havePoliceCheck')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadPoliceCheck'])){
            foreach(@$fileNameForPDF['uploadPoliceCheck'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
        }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Working with Children Card?</td>
        <td class="label" width="50%">Uploaded Children Card</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveWorkChildrenCard')).'</td>
        <td class="value">';

          if(isset($fileNameForPDF['uploadWorkChildrenCardOne'])){
              foreach(@$fileNameForPDF['uploadWorkChildrenCardOne'] as $key => $value){
                foreach(explode(',',$value) as $k => $vl){
                  $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
              }//End foreach
          }else{$html .= '-';};

          if(isset($fileNameForPDF['uploadWorkChildrenCardTwo'])){
            foreach(@$fileNameForPDF['uploadWorkChildrenCardTwo'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
            }//End foreach
          }else{$html .= '-';};

        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have First Aid Certificate?</td>
        <td class="label" width="50%">Uploaded First Aid Certificate</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveFirstAidCertificate')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadFirstAidCertificate'])){
            foreach(@$fileNameForPDF['uploadFirstAidCertificate'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Manual Handling Certificate?</td>
        <td class="label" width="50%">Uploaded Manual Handling Certificate</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveManualHandlingCertificate')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadManualHandlingCertificate'])){
            foreach(@$fileNameForPDF['uploadManualHandlingCertificate'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Food Handling Certificate?</td>
        <td class="label" width="50%">Uploaded Food Handling Certificate</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveFoodHandlingCertificate')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadFoodHandlingCertificate'])){
            foreach(@$fileNameForPDF['uploadFoodHandlingCertificate'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have evidence of working or Visa (If you\'re a foreigner)?</td>
        <td class="label" width="50%">Uploaded Evidence</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveWorkingOrVisa')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadWorkingOrVisa'])){
            foreach(@$fileNameForPDF['uploadWorkingOrVisa'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have NDIS Worker Orientation Completion Certificate?</td>
        <td class="label" width="50%">Uploaded NDIS Worker Orientation Completion Certificate</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveNDISWorOriComCer')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadNDISWorOriComCer'])){
            foreach(@$fileNameForPDF['uploadNDISWorOriComCer'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Diploma of Nursing  Certificate 4 in Aged Care?</td>
        <td class="label" width="50%">Uploaded Nursing  Certificate 4 in Aged Care</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveDiplomaOfNursing')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadDiplomaOfNursing'])){
            foreach(@$fileNameForPDF['uploadDiplomaOfNursing'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Certificate 3 in Disability or Individual Support?</td>
        <td class="label" width="50%">Uploaded Certificate 3 in Disability or Individual Support</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveCertificate3Disability')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadCertificate3Disability'])){
            foreach(@$fileNameForPDF['uploadCertificate3Disability'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
        }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Certificate 4 in Disability or Individual Support?</td>
        <td class="label" width="50%">Uploaded Certificate 4 in Disability or Individual Support</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveCertificate4Disability')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadCertificate4Disability'])){
            foreach(@$fileNameForPDF['uploadCertificate4Disability'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <td class="label" width="50%">Do you have Certificate 4 or Diploma in Mental Health?</td>
        <td class="label" width="50%">Uploaded Certificate 4 or Diploma in Mental Health</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveCertificate4Diploma')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadCertificate4Diploma'])){
            foreach(@$fileNameForPDF['uploadCertificate4Diploma'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table tbb">
      <tr>
        <td class="label" width="50%">Do you have any other relevant qualifications?</td>
        <td class="label" width="50%">Uploaded relevant qualifications documents</td>
      </tr>
      <tr>
        <td class="value">'.ucfirst(GDOE('haveRelevantQulification')).'</td>
        <td class="value">';
          if(isset($fileNameForPDF['uploadCertificates'])){
            foreach(@$fileNameForPDF['uploadCertificates'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
         }//End foreach
              }else{$html .= '-';};
        $html .='</td>
      </tr>
    </table>

    <table class="table tbb">
    <tr>
      <td class="label" width="50%">Do you have other document(s) to upload, if not mendtioned above?</td>
      <td class="label" width="50%">Uploaded other documents</td>
    </tr>
    <tr>
      <td class="value">'.ucfirst(GDOE('haveOtherDocuments')).'</td>
      <td class="value">';
        if(isset($fileNameForPDF['uploadOtherDocuments'])){
            foreach(@$fileNameForPDF['uploadOtherDocuments'] as $key => $value){
              foreach(explode(',',$value) as $k => $vl){
                $html .= '<a target="_blank" href="'.$domainPath.'/files/uploads/supportWorkerDocuments/'.@$insertedId.'/'.$key.'/'.$vl.'">'.$vl.'</a><br/>';}
              }//End foreach
            }else{$html .= '-';};
      $html .='</td>
    </tr>
  </table>
    
  <pagebreak/>
  <div class="section" style="margin-top:-10px">Declaration</div>
  <table class="table" border="0" width="100%" style="border:unset">
    <tr>
      <td class="value" style="border:unset">
        To the best of my knowledge, I believe that the above statements are true and correct. I understand that any deliberately false, misleading or incomplete statements may lead to my dismissal, if employed.
        <br/><br/>
        I, <strong>'.GDOE('first_name').' '.GDOE('last_name').'</strong> give this company permission to conduct the relevant reference checks and obtain the required information from past employers and or other relevant parties. I understand that this will be done in an ethical and legal manner and will not compromise my current employment situation.     
      </td>
    </tr>                    
  </table>
  <br/><br/><br/><br/><br/>
  <table class="table" width="100%">
    <tr>
      <td class="value" width="40%" style="text-align:center;border:unset" valign="bottom">
        <strong>'.(@$data['inserted_date'] ? $data['inserted_date'] : date('d-m-Y')).'</strong>
        <hr>  
        Date of Submitting
      </td>
      <td class="value" width="20%" style="border:unset"></td>
      <td class="value" width="40%" style="text-align:center;border:unset" valign="bottom">
        <img style="max-width:160px" src="'.$domainPath.'/files/documents/signatures/sw-form/'.$insertedId.'-s.png?k='.randCode().'">
        <hr/>
        Signature
      </td>
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