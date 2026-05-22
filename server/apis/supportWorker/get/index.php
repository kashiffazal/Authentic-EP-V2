<?php

    if(@$_GET['draft']){
        $id = encrypt_decrypt('decrypt',$_GET['draft']);
    }//End if condition
    if(@$_GET['id'] AND $_GET['id'] != '-'){$id = $_GET['id'];}
    //echo $_GET['id'];

    $value = null;
    $res = array('status' => true, 'data' => array());
    include './settingJSON/get/getJSON.php';
    $res['appDefaultSetting'] = $devSettingJSON['formSetting']['supportWorker'];

    $res['data']['companyDetails'] = $companyDetails;
    $res['data']['list']['countries'] = getCountryList();
    $res['data']['list']['languages'] = getLanguageList();
    $res['data']['list']['states'] = getStateList();
    $res['data']['list']['years_current'] = years_current();
    $res['data']['list']['years'] = years();
    $res['data']['list']['years_old'] = years_old();
    $res['data']['list']['defaultCountryId'] = '16';    
    $res['data']['list']['uploadedDocuments'] = array();
    $res['data']['list']['timeList'] = timeList();
    $res['data']['list']['jobList'] = jobList();

    if(@$id){
        $data = dbQuery("
            SELECT 
            swt.id,swt.draft_code,swt.ndis_workers_screening_id,swt.job_ref_id,swt.first_name,swt.last_name,swt.street_address,swt.suburb,swt.state,swt.postCode,swt.country,swt.mobile,swt.email,swt.skypeId,swt.dateOfBirth,swt.emergency_first_name,swt.emergency_last_name,swt.emergency_mobile,swt.emergency_email,swt.emergency_relationship,swt.emergency_address,swt.emergency_suburb,swt.emergency_state,swt.emergency_postCode,swt.emergency_country,swt.firstHeardAboutYouFirst,swt.firstHeardAboutYouFirstOthers,swt.previouslyWorked,swt.aboutExperience,swt.currentlyWorking,swt.currentClientFirstName,swt.currentClientLastName,swt.whyInterested,swt.haveYouReceiveEmail,swt.supportServices,swt.specialisedSupportServices,swt.secondaryEmploymentDeclaration,swt.first_org_name,swt.first_org_addr,swt.first_org_suburb,swt.first_org_state,swt.first_org_post_code,swt.first_org_country,swt.first_org_manager_name,swt.first_org_manager_contact_no,swt.first_org_role,swt.second_org_name,swt.second_org_addr,swt.second_org_suburb,swt.second_org_state,swt.second_org_post_code,swt.second_org_country,swt.second_org_manager_name,swt.second_org_manager_contact_no,swt.second_org_role,swt.your_addr,swt.your_suburb,swt.your_state,swt.your_post_code,swt.your_country,swt.your_email,swt.your_mobile,swt.hadAnyDisability,swt.hadAnyDisabilityDetails,swt.injury_disease,swt.injury_disease_desc,swt.qualification_explained,swt.sill_explained,swt.unionMoment,swt.unionName,swt.unionContact,swt.unionAddress,swt.reliableCar,swt.hac_vic_driving_license,swt.has_superannuation_ac,swt.days_availibility_json,swt.australianCitizen,swt.haveVisa,swt.dontHaveVisaDesc,swt.visaClassSubClass,swt.visaGrantNumber,swt.passportNumber,swt.countryOfIssue,swt.restrictionsOnVisa,swt.gender,swt.genderSelfDesc,swt.identify,swt.culturally,swt.wherYouBorn,swt.bornCountry,swt.otherBornCountry,swt.isEnglishMain,swt.otherLanguageSpeak,swt.mainLanguage,swt.otherMainLanguage,swt.identifyAs,swt.workExp,swt.nameOfEmployer,swt.exp_street_address,swt.exp_suburb,swt.exp_state,swt.exp_postCode,swt.exp_country,swt.exp_last_street_address,swt.exp_last_suburb,swt.exp_last_state,swt.exp_last_postCode,swt.exp_last_country,swt.currentWorkRole,swt.currentWorkSkills,swt.nameOfLastEmp,swt.yearOfStopWorking,swt.previousRole,swt.previousSkills,swt.isLocalReferences,swt.localReferences_json,swt.criminal_declaration,swt.criminal_declaration_desc,swt.joiningDate,swt.undertakenVolunteer,swt.typeOfVolunteering,swt.otherVolunteering,swt.skillsOnVolunteering,swt.relevantQualifications,swt.typeOfQualification,swt.otherQulification,swt.qualCertificateName,swt.qualCompleteYear,swt.qualSchoolUniName,swt.anotherQulification,swt.anotherTypeOfQualification,swt.anotherOtherQulification,swt.anotherQualCertificateName,swt.anotherQualCompleteYear,swt.anotherQualSchoolUniName,swt.haveCovid19VaccinationsProof,swt.uploadCovid19VaccinationsProof,swt.haveResume,swt.ndisWorkersWcreeningDoc,swt.uploadCV,swt.haveStudentIdCatd,swt.uploadStudentIdCard,swt.haveDrivingLicense,swt.uploadDrivingLicenseFront,swt.uploadDrivingLicenseBack,swt.haveCarInsurance,swt.uploadCarInsurance,swt.havePassportCopy,swt.uploadCopyOfPassportOne,swt.uploadCopyOfPassportTwo,swt.havePoliceCheck,swt.uploadPoliceCheck,swt.haveWorkChildrenCard,swt.uploadWorkChildrenCardOne,swt.uploadWorkChildrenCardTwo,swt.haveFirstAidCertificate,swt.haveCPRCertificate,swt.uploadFirstAidCertificate,swt.uploadCPRCertificate,swt.haveManualHandlingCertificate,swt.uploadManualHandlingCertificate,swt.haveFoodHandlingCertificate,swt.uploadFoodHandlingCertificate,swt.haveWorkingOrVisa,swt.uploadWorkingOrVisa,swt.haveNDISWorOriComCer,swt.uploadNDISWorOriComCer,swt.haveDiplomaOfNursing,swt.uploadDiplomaOfNursing,swt.haveCertificate3Disability,swt.uploadCertificate3Disability,swt.haveCertificate4Disability,swt.uploadCertificate4Disability,swt.haveCertificate4Diploma,swt.uploadCertificate4Diploma,swt.haveRelevantQulification,swt.uploadCertificates,swt.haveOtherDocuments,swt.uploadOtherDocuments,swt.confirmation,swt.swSign,swt.visaExpDate,swt.passportIssueDate,swt.passportExpDate,swt.status,
            swt.haveAustPassportCopy,swt.uploadCopyOfAustPassportOne,swt.uploadCopyOfAustPassportTwo,swt.haveAustCitizenCertificate,swt.uploadAustCitizenCertificate,swt.haveFullBirthCertificate,swt.uploadFullBirthCertificate,swt.haveIdentityRefugeesCertificate,swt.uploadIdentityRefugeesCertificate,swt.haveIdentityCard,swt.uploadIdentityCard,swt.haveIdentityCardPhoto,swt.uploadIdentityCardPhoto,swt.haveGovEmpId,swt.uploadGovEmpId,swt.haveForceIdentityCard,swt.uploadForceIdentityCard,swt.haveDVACard,swt.uploadDVACard,swt.haveCentrelinkCard,swt.uploadCentrelinkCard,swt.haveBirthExtractCertificate,swt.uploadBirthExtractCertificate,swt.haveBirthCard,swt.uploadBirthCard,swt.haveMedicareCard,swt.uploadMedicareCard,swt.haveCreditCard,swt.uploadCreditCard,swt.haveAustMarriageCertificate,swt.uploadAustMarriageCertificate,swt.haveDceNisiAbs,swt.uploadDceNisiAbs,swt.haveChangeOfNameCertificate,swt.uploadChangeOfNameCertificate,swt.haveBankStatement,swt.uploadBankStatement,swt.haveProLeaseAgreement,swt.uploadProLeaseAgreement,swt.haveTaxAssessNotice,swt.uploadTaxAssessNotice,swt.haveAustMortgageDoc,swt.uploadAustMortgageDoc,swt.haveRatingAuthority,swt.uploadRatingAuthority,swt.haveUtilityBill,swt.uploadUtilityBill,swt.haveRefIndigenousOrg,swt.uploadRefIndigenousOrg,swt.haveDocIssuedOutAust,swt.uploadDocIssuedOutAust,
            swt.totalCheckListNumber,swt.inserted_date,
            jt.title AS job_title
            FROM $support_worker_form_table AS swt 
            LEFT JOIN $job_table AS jt ON swt.job_ref_id = jt.id
            WHERE swt.id = '$id'
        ");
        // print_rp($data);
        $data = $data['data'][0];
        $data['days_availibility'] = $data['days_availibility_json'] ? json_decode($data['days_availibility_json']) : array();
        $data['localReferences'] = $data['localReferences_json'] ? json_decode($data['localReferences_json']) : array();
        $data['filePath'] = $domainPath.'/files/uploads/supportWorkerDocuments/'.$data['id'].'/';
        $data['supportServices'] = explode(',',$data['supportServices']);
        $data['specialisedSupportServices'] = explode(',',$data['specialisedSupportServices']);
        $data['confirmation'] = $data['confirmation'] == 'true' ? true : false;
        
        
        $data['swSignUrl'] = $domainPath.'/files/documents/signatures/sw-form/'.$data['swSign'].'?k='.randCode(4);
        $data['swSignUrl'] = ($data['swSign'] AND file_exists('../files/documents/signatures/sw-form/'.$data['swSign'])) ? $data['swSignUrl'] : '';
        if($data['swSignUrl']){unset($data['swSign']);}
        
        $data['inserted_date'] = date('d-m-Y',strtotime($data['inserted_date']));

        unset($data['days_availibility_json']);
        unset($data['localReferences_json']);
        unset($data['key']);

        $data['totalCheckListNumber'] = $data['totalCheckListNumber'] ? (int) $data['totalCheckListNumber'] : 0;

        //?Upload file checklist checkbox
        $data['havePassportCopy'] = $data['havePassportCopy'] == 'true' ? true : false;
        $data['haveAustPassportCopy'] = $data['haveAustPassportCopy'] == 'true' ? true : false;
        $data['haveAustCitizenCertificate'] = $data['haveAustCitizenCertificate'] == 'true' ? true : false;
        $data['haveFullBirthCertificate'] = $data['haveFullBirthCertificate'] == 'true' ? true : false;
        $data['haveIdentityRefugeesCertificate'] = $data['haveIdentityRefugeesCertificate'] == 'true' ? true : false;
        $data['haveDrivingLicense'] = $data['haveDrivingLicense'] == 'true' ? true : false;
        $data['haveIdentityCard'] = $data['haveIdentityCard'] == 'true' ? true : false;
        $data['haveIdentityCardPhoto'] = $data['haveIdentityCardPhoto'] == 'true' ? true : false;
        $data['haveGovEmpId'] = $data['haveGovEmpId'] == 'true' ? true : false;
        $data['haveForceIdentityCard'] = $data['haveForceIdentityCard'] == 'true' ? true : false;
        $data['haveDVACard'] = $data['haveDVACard'] == 'true' ? true : false;
        $data['haveCentrelinkCard'] = $data['haveCentrelinkCard'] == 'true' ? true : false;
        $data['haveBirthExtractCertificate'] = $data['haveBirthExtractCertificate'] == 'true' ? true : false;
        $data['haveBirthCard'] = $data['haveBirthCard'] == 'true' ? true : false;
        $data['haveMedicareCard'] = $data['haveMedicareCard'] == 'true' ? true : false;
        $data['haveCreditCard'] = $data['haveCreditCard'] == 'true' ? true : false;
        $data['haveAustMarriageCertificate'] = $data['haveAustMarriageCertificate'] == 'true' ? true : false;
        $data['haveDceNisiAbs'] = $data['haveDceNisiAbs'] == 'true' ? true : false;
        $data['haveChangeOfNameCertificate'] = $data['haveChangeOfNameCertificate'] == 'true' ? true : false;
        $data['haveBankStatement'] = $data['haveBankStatement'] == 'true' ? true : false;
        $data['haveProLeaseAgreement'] = $data['haveProLeaseAgreement'] == 'true' ? true : false;
        $data['haveTaxAssessNotice'] = $data['haveTaxAssessNotice'] == 'true' ? true : false;
        $data['haveAustMortgageDoc'] = $data['haveAustMortgageDoc'] == 'true' ? true : false;
        $data['haveRatingAuthority'] = $data['haveRatingAuthority'] == 'true' ? true : false;
        $data['haveUtilityBill'] = $data['haveUtilityBill'] == 'true' ? true : false;
        $data['haveRefIndigenousOrg'] = $data['haveRefIndigenousOrg'] == 'true' ? true : false;
        $data['haveDocIssuedOutAust'] = $data['haveDocIssuedOutAust'] == 'true' ? true : false;

        $res['data']['list']['uploadedDocuments'] = array(
            'ndisWorkersWcreeningDoc' => $data['ndisWorkersWcreeningDoc'],
            'uploadCV' => $data['uploadCV'],
            'uploadCovid19VaccinationsProof' => $data['uploadCovid19VaccinationsProof'],
            'uploadStudentIdCard' => $data['uploadStudentIdCard'],
            'uploadDrivingLicenseFront' => $data['uploadDrivingLicenseFront'],
            'uploadDrivingLicenseBack' => $data['uploadDrivingLicenseBack'],
            'uploadCarInsurance' => $data['uploadCarInsurance'],
            'uploadCopyOfPassportOne' => $data['uploadCopyOfPassportOne'],
            'uploadCopyOfPassportTwo' => $data['uploadCopyOfPassportTwo'],
            'uploadPoliceCheck' => $data['uploadPoliceCheck'],
            'uploadWorkChildrenCardOne' => $data['uploadWorkChildrenCardOne'],
            'uploadWorkChildrenCardTwo' => $data['uploadWorkChildrenCardTwo'],
            'uploadFirstAidCertificate' => $data['uploadFirstAidCertificate'],
            'uploadCPRCertificate' => $data['uploadCPRCertificate'],
            'uploadManualHandlingCertificate' => $data['uploadManualHandlingCertificate'],
            'uploadFoodHandlingCertificate' => $data['uploadFoodHandlingCertificate'],
            'uploadWorkingOrVisa' => $data['uploadWorkingOrVisa'],
            'uploadNDISWorOriComCer' => $data['uploadNDISWorOriComCer'],
            'uploadDiplomaOfNursing' => $data['uploadDiplomaOfNursing'],
            'uploadCertificate3Disability' => $data['uploadCertificate3Disability'],
            'uploadCertificate4Disability' => $data['uploadCertificate4Disability'],
            'uploadCertificate4Diploma' => $data['uploadCertificate4Diploma'],
            'uploadCertificates' => $data['uploadCertificates'],
            'uploadOtherDocuments' => $data['uploadOtherDocuments'],

            'uploadCopyOfAustPassportOne' => $data['uploadCopyOfAustPassportOne'],
            'uploadCopyOfAustPassportTwo' => $data['uploadCopyOfAustPassportTwo'],
            'uploadAustCitizenCertificate' => $data['uploadAustCitizenCertificate'],
            'uploadFullBirthCertificate' => $data['uploadFullBirthCertificate'],
            'uploadIdentityRefugeesCertificate' => $data['uploadIdentityRefugeesCertificate'],
            'uploadIdentityCard' => $data['uploadIdentityCard'],
            'uploadIdentityCardPhoto' => $data['uploadIdentityCardPhoto'],
            'uploadGovEmpId' => $data['uploadGovEmpId'],
            'uploadForceIdentityCard' => $data['uploadForceIdentityCard'],
            'uploadDVACard' => $data['uploadDVACard'],
            'uploadCentrelinkCard' => $data['uploadCentrelinkCard'],
            'uploadBirthExtractCertificate' => $data['uploadBirthExtractCertificate'],
            'uploadBirthCard' => $data['uploadBirthCard'],
            'uploadMedicareCard' => $data['uploadMedicareCard'],
            'uploadCreditCard' => $data['uploadCreditCard'],
            'uploadAustMarriageCertificate' => $data['uploadAustMarriageCertificate'],
            'uploadDceNisiAbs' => $data['uploadDceNisiAbs'],
            'uploadChangeOfNameCertificate' => $data['uploadChangeOfNameCertificate'],
            'uploadBankStatement' => $data['uploadBankStatement'],
            'uploadProLeaseAgreement' => $data['uploadProLeaseAgreement'],
            'uploadTaxAssessNotice' => $data['uploadTaxAssessNotice'],
            'uploadAustMortgageDoc' => $data['uploadAustMortgageDoc'],
            'uploadRatingAuthority' => $data['uploadRatingAuthority'],
            'uploadUtilityBill' => $data['uploadUtilityBill'],
            'uploadRefIndigenousOrg' => $data['uploadRefIndigenousOrg'],
            'uploadDocIssuedOutAust' => $data['uploadDocIssuedOutAust']

        );
        $res['formValues'] = $data;
    }//End if condition

    if(@$_GET['draft'] AND @!$res['formValues']){
        $res['status'] = false;
        $res['errorMsg'] = "Draft ID not found";
    }//End if condition


    echo json_encode($res);
?>