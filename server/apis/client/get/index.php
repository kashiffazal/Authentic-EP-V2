<?php

if (@$_GET['draft']) {
    $id = encrypt_decrypt('decrypt', $_GET['draft']);
} //End if condition
if (@$_GET['id'] and $_GET['id'] != '-') {$id = $_GET['id'];}
//echo $_GET['id'];

$value = null;
$res = array('status' => true, 'data' => array());
include './settingJSON/get/getJSON.php';
$res['appDefaultSetting'] = $devSettingJSON;

$res['data']['companyDetails'] = $companyDetails;
$res['data']['list']['countries'] = getCountryList();
$res['data']['list']['states'] = getStateList();
$res['data']['list']['services'] = serviceListByType();
$res['data']['list']['gender'] = array(array('label' => 'Male', 'value' => 'Male'), array('label' => 'Female', 'value' => 'Female'), array('label' => 'Prefer not to say', 'value' => 'Prefer not to say'));
$res['data']['list']['defaultCountryId'] = '16';

if (@$id) {
    $data = dbQuery("
            SELECT
            id,draft_code,first_name,last_name,dateOfBirth,bornCountry,gender,prefered_lang,interpreterReq,ndisNumber,street_address,suburb,state,postCode,email,contactNumber,ndisPlanDate,ndisEndDate,planMangName,planMangNumber,planMangEmail,emConPersonName,relationToParti,emContPersonNumber,ndisPlanDoc AS ndisPlanDocument,ndisGoals,livingArrang,livingArrangOther,guardianName,guardianDOB,guardianHomePhone,guardianMobNumber,guardianWorkPhone,guardianEmail,guardianAddress,guardianSubrub,guardianState,guardianPostcode,makeRefName,makeRefOrg,makeRefPosition,makeRefEmail,makeRefAddress,makeRefSubrub,makeRefState,makeRefPostCode,makeRefPhone,primaryDiagnos,secondaryDiagnos,likes,dislikes,services_json,
            anyRisk,anyRiskSpecify,harmFromOther,harmFromOtherSpecify,harmToOther,harmToOtherSpecify,anyPet,anyPetSpecify,anyFireamers,anyFireamersSpecify,anyDrugHistory,anyDrugHistorySpecify,anyRishToKnow,anyRishToKnowSpecify,dateOfRef,hearing,hearingSpecify,speech,speechSpecify,ableToWrite,ableToWriteSpecify,englishSkill,englishSkillSpecify,willingToParticipate,willingToParticipateSpecity,orientation,orientationSpecify,acceptDiraction,acceptDiractionSpecific,shortMemory,shortMemorySpecify,walkUnaided,walkUnaidedSpecify,managesStairs,managesStairsSpecify,usesWalkingAid,usesWalkingAidSpecify,wheelshair,wheelshairSpecify,usesElecWheelChair,usesElecWheelChairSpecify,transferIndep,transferIndepSpecify,transferWithSuper,transferWithSuperSpecify,transferWithHoist,transferWithHoistSpecify,bedMobility,bedMobilitySpecify,showering,showeringSpecify,toileting,toiletingSpecify,grooming,groomingSpecify,repoInBed,repoInBedSpecify,repoInChair,repoInChairSpecify,mouthCare,mouthCareSpecify,eating,eatingSpecify,skinCare,skinCareSpecify,phyAggToSp,phyAggToSpSpecify,verAggToSp,verAggToSpSpecify,aggToClients,aggToClientsSpecify,aggWithObjects,aggWithObjectsSpecify,selfHarm,selfHarmSpecify,subAbuse,subAbuseSpecify,sexualAbuse,sexualAbuseSpecify,threatsToStaff,threatsToStaffSpecify,useEmotionToAcGols,useEmotionToAcGolsSpecify,restrictivePractice,restrictivePracticeSpecify,uploadBehaviourPlanFile AS uploadBehaviourPlanFileDocument,behaviorSupportPlan,behaviorSupportPlanSpecify,onBehalfOfName,referralSign,sharingInformation,acknowledge,understandServices,relevantPrivacyLaws,status,inserted_date
            FROM $client_form_table
            WHERE id = '$id'
        ");
    $data = $data['data'][0];
    $data['filePath'] = $domainPath.'/files/uploads/clientDocuments/';
    $data['services'] = $data['services_json'] ? json_decode($data['services_json']) : array();

    $data['referralSignUrl'] = $domainPath.'/files/documents/signatures/client-ref-form/'.$data['referralSign'].'?k='.randCode(4);
    $data['referralSignUrl'] = ($data['referralSign'] AND file_exists('../files/documents/signatures/client-ref-form/'.$data['referralSign'])) ? $data['referralSignUrl'] : '';
    if($data['referralSignUrl']){unset($data['referralSign']);}
    
    unset($data['services_json']);
    #Checkbox value set
    $data['understandServices'] = $data['understandServices'] == 'true' ? true : false;    
    $data['relevantPrivacyLaws'] = explode(',',$data['relevantPrivacyLaws']);
    $data['sharingInformation'] = explode(',',$data['sharingInformation']);
    $data['acknowledge'] = explode(',',$data['acknowledge']);

    $data['inserted_date'] = date('d-m-Y',strtotime($data['inserted_date']));
    unset($data['key']);
    $res['formValues'] = $data;
} //End if condition

if (@$_GET['draft'] and @!$res['formValues']) {
    $res['status'] = false;
    $res['errorMsg'] = "Draft ID not found";
} //End if condition

echo json_encode($res);
