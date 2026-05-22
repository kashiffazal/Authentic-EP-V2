<?php

    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
    $dt = $_POST;
    unset($dt['modal_width']);
    // print_r($dt);
    $dt['status'] = 'active';
    if(@$dt['client_ref_id']){
			$data = dbQuery("
        SELECT cl.*,
        st.name AS guardianState
        FROM $client_form_table AS cl 
        LEFT JOIN $dropdown_state_table AS st ON cl.guardianState = st.id
        WHERE cl.id = '".$dt['client_ref_id']."'
      ");
			$data = $data['data'][0];
      $data['serviceList'] = serviceListByType('mutual',true);
      // print_r($data);
    }//End function

    if(@$dt['spw_ref_id']){
			$data = dbQuery("
        SELECT swt.*,
        jt.position AS job_position
        FROM $support_worker_form_table AS swt
        LEFT JOIN $job_table AS jt ON swt.job_ref_id = jt.id
        WHERE swt.id = '".$dt['spw_ref_id']."'
      ");
			$data = $data['data'][0];
    }//End function
    $data['doc_name'] = $dt['doc_name'];
    unset($dt['doc_name']);
    //print_r($data);

    //Client File Checklist
    if($dt['doc_ref_id'] == '1'){
			include "../apis/documentGeneration/post/partial/1_pdf_clientFileCheckList.php";//Set $html;
			$folderName = 'clientFileChecklist';
    }//End if condition
    //Client Initial Support Assessment
    if($dt['doc_ref_id'] == '2'){
			include "../apis/documentGeneration/post/partial/2_pdf_initialSupportAssessmentForm.php";//Set $html;
			$folderName = 'initialSupportAssessmentForm';
    }//End if condition
    //Client Service Agreement
    if($dt['doc_ref_id'] == '3'){
			include "../apis/documentGeneration/post/partial/3_pdf_serviceAgreement.php";//Set $html;
			$folderName = 'serviceAgreement';
    }//End if condition
    
    //Support Worker Casual Award Employment Contract
    if($dt['doc_ref_id'] == '4'){
			include "../apis/documentGeneration/post/partial/4_pdf_casualAwardEmploymentContract.php";//Set $html;
			$folderName = 'casualAwardEmploymentContract';
    }//End if condition
    //Support Worker Employment Offer Letter
    if($dt['doc_ref_id'] == '5'){
			include "../apis/documentGeneration/post/partial/5_pdf_employmentOfferLetter.php";//Set $html;
			$folderName = 'employmentOfferLetter';
    }//End if condition
    //Support Worker New Staff Information
    if($dt['doc_ref_id'] == '6'){
			include "../apis/documentGeneration/post/partial/6_pdf_newStaffInformation.php";//Set $html;
			$folderName = 'newStaffInformation';
    }//End if condition
    //Support Worker Welcome Acceptance Letter
    if($dt['doc_ref_id'] == '7'){
			include "../apis/documentGeneration/post/partial/7_pdf_welcomeAcceptanceLetter.php";//Set $html;
			$folderName = 'welcomeAcceptanceLetter';
    }//End if condition
    //Support Worker Position Description Disability Support Worker
    if($dt['doc_ref_id'] == '8'){
			include "../apis/documentGeneration/post/partial/8_pdf_positionDescriptionDisabilitySupportWorker.php";//Set $html;
			$folderName = 'positionDescriptionDisabilitySupportWorker';
    }//End if condition
    //Support Worker Staff Code Of Conduct
    if($dt['doc_ref_id'] == '9'){
			include "../apis/documentGeneration/post/partial/9_pdf_staffCodeOfConduct.php";//Set $html;
			$folderName = 'staffCodeOfConduct';
    }//End if condition
    
    //Create pdf
    require_once '../plugins/mpdf-8.1.4/vendor/autoload.php';
		$path = '../files/documents/'.$folderName;
    $fileName = $data['id']."-".$server_date.randCode();
    // echo $fileName;
    // $fileName = $data['id']."-".$server_date;
    $file_ref = createPDF($path,$fileName,$html,$header,$footer);
    // echo " --- ".$file_ref['fileName'];
    if($file_ref['status']){
      // die();
			$dt['file_name'] = $file_ref['fileName'];
			$dt['folder_name'] = $folderName;
			$res = dbQuery("post", $dt, $document_generate_table);
			$res['folderName'] = $folderName;;
      $res['fileName'] = $file_ref['fileName'];
    }//End if condition

    $res['successNotify'] = true;
    $res['successNotifyType'] = 'notify';
    $res['successMsg'] = "Document has been created successfully";
    echo json_encode($res);
    // print_r($res);

?>