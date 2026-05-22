<?php
    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
    $data = $_POST;
    // unset($data['id']);
    // print_r($data);die();
    // print_r($_FILES);die();

    $data['status'] = $data['status'] ? $data['status'] : 'active';//Applied
    if (@$data['services']) {
      $services = multiFieldsJsonSeparate($data['services'],false,'<%>');
      $data['services_json'] = @$services['json'];
      $data['services_ref_ids'] = @$services['services_ref_id'];
      $data['services_ndis_budget'] = @$services['services_ndis_budget'];
      $data['services_desc'] = @$services['services_desc'];
    } //End if condition
    unset($data['services']);
    $keyword = $data['keyword'];
    unset($data['keyword']);
    $internalForm = $data['internalForm'];
    unset($data['internalForm']);

    $listData = json_decode($data['listData'],true);
    unset($data['listData']);
    //print_r($listData['states']);
    //print_r($listData['countries']);
     //print_r($listData['countries']);die();
    unset($data['filePath']);//If form is updated
    $ndisPlanDocument = @$data['ndisPlanDocument'];
    unset($data['ndisPlanDocument']);
    $uploadBehaviourPlanFileDocument = @$data['uploadBehaviourPlanFileDocument'];
    unset($data['uploadBehaviourPlanFileDocument']);

    unset($data['referralSignUrl']);

    @$data['dateOfBirth'] = @$data['dateOfBirth'] ? date('d-m-Y', strtotime($data['dateOfBirth'])) : '';
    @$data['ndisPlanDate'] = @$data['ndisPlanDate'] ? date('d-m-Y', strtotime($data['ndisPlanDate'])) : '';
    @$data['ndisEndDate'] = @$data['ndisEndDate'] ? date('d-m-Y', strtotime($data['ndisEndDate'])) : '';
    @$data['dateOfRef'] = @$data['dateOfRef'] ? date('d-m-Y', strtotime($data['dateOfRef'])) : '';
    @$data['guardianDOB'] = @$data['guardianDOB'] ? date('d-m-Y', strtotime($data['guardianDOB'])) : '';

    #Set client signature variable
    $referralSign = @$data['referralSign'];
    unset($data['referralSign']);

    // print_r($data);die();

    //@ Set Client Company and Branch on Insert =============================================//
    $companyList = getCompanyListWithBranches();
    //? If there are more then one company or branch then find out should be default or not
    //? According to DST settings, Otherwise set Default the single company
    if(sizeof($companyList) > 1){
      //# If it's submitted by external form then get Default setting from JSON file and default company  
      if($internalForm !== 'true'){
        include './settingJSON/get/getJSON.php';
        $dstGeneral = $devSettingJSON['general'];
        $defaultCompany = getDefaultCompany();
      }else if(!@$data['id']){
        //# If not external then check is it Inserted or not (Need Inserted data)
        $dstGeneral = $_SESSION['dst']['general'];
        $defaultCompany = $_SESSION['defaultCompany'];
      }//End if condition
      if(@$dstGeneral){
        if($dstGeneral['addClientInDefaultCompany']){
          $data['company_ref_id'] = $defaultCompany['id'];
          $data['branch_ref_id'] = @$defaultCompany['default_branch_ref_id'];
        }else{
          //@ If there is no company then change status as 'mutual'
          $data['status'] = 'mutual';
        }//end if condition
      }//End if condition
    }else{
      $com = explode('=>', $companyList[0]['value']);
      $data['company_ref_id'] = $com[0];
      $data['branch_ref_id'] = @$com[1];
    }//End if condition
    //@ =====================================================================================//
    
    // print_rp($data);die();
    $res = dbQuery("post",$data,$client_form_table);
    $insertedId = @$res['id'];
    $data['id'] = $insertedId;

    #Upload Signature and Update in DB
    if($res['status'] AND $referralSign){
      $imgName = $insertedId.'-c.png';
      @base64ToImage($referralSign,'../files/documents/signatures/client-ref-form/'.$imgName);
      dbQuery("post",array('id' => $insertedId, 'referralSign' => $imgName),$client_form_table);
    }//End if condition

    //If form is drafted then generate draft_code othewise set it empty
    $draftCode = ($keyword !== 'complete') ? encrypt_decrypt('encrypt',$insertedId) : '';
    $res['draft_code'] = $draftCode;

    // //Upload NDIS Plain
    if($res['status'] AND sizeof($_FILES) > 0){
      $uploadPath = '../files/uploads/clientDocuments/';
      //?Upload NDIS Plan
      if($_FILES['ndisPlanDoc']){
        $fileUpResNdisPlanDoc = fileUpload($_FILES['ndisPlanDoc'],$uploadPath.'NDISPlanDoc/',$insertedId.'-NDIS-Plan-'.randCode().'-')['fileName'];
        if($ndisPlanDocument){unlink($uploadPath.'NDISPlanDoc/'.$ndisPlanDocument);}//End if condition
      }else{$fileUpResNdisPlanDoc = '';}//End if condition
      //? Upload Behaviour Plan File
      if($_FILES['uploadBehaviourPlanFile']){
        $fileUpResBehaviourPlan = fileUpload($_FILES['uploadBehaviourPlanFile'],$uploadPath.'uploadBehaviourPlanFile/',$insertedId.'-behaviour-plan-'.randCode().'-')['fileName'];
        if($uploadBehaviourPlanFileDocument){unlink($uploadPath.'uploadBehaviourPlanFile/'.$uploadBehaviourPlanFileDocument);}//End if condition
      }else{$fileUpResBehaviourPlan = '';}//End if condition

      $res['fileUpload'] = runQuery("UPDATE $client_form_table SET ndisPlanDoc = '$fileUpResNdisPlanDoc', uploadBehaviourPlanFile = '$fileUpResBehaviourPlan', draft_code = '$draftCode' WHERE id = '".$insertedId."'", $insertedId);
      $data['ndisPlanDocument'] = $fileUpResNdisPlanDoc;
      $data['uploadBehaviourPlanFile'] = $fileUpResBehaviourPlan;
    }else{
      if($res['status']){runQuery("UPDATE $client_form_table SET draft_code = '$draftCode' WHERE id = '$insertedId'");}//End if condition
      $data['ndisPlanDocument'] = $ndisPlanDocument;
      $data['uploadBehaviourPlanFile'] = $uploadBehaviourPlanFileDocument;
    }//End if condition

    if($res['status'] AND @trim($keyword) === 'complete'){
      
      require_once '../plugins/mpdf-8.1.4/vendor/autoload.php';
      include '../apis/client/client_functions.php';
      #Create Care Plan
      $res['carePlan'] = createCarePlan($data);
      // print_rp($res);die();

      //Create PDF
      include "../apis/client/post/pdf_html.php";//Set $html;
      $path = "../files/documents/client";
      $fileName = $insertedId."-client-".$server_date;
      $file_ref = createPDF($path.'/forms',$fileName,$html,$header,$footer);
      //print_r($file_ref);die();
      if($file_ref['status']){
        
        $res['file_ref'] = $file_ref;
        $attachedFile = array(
          array('path' => $path.'/forms/'.$file_ref['fileName'], 'name' => $file_ref['fileName']),
          array('path' => $path.'/carePlan/'.$res['carePlan']['fileName'], 'name' => $res['carePlan']['fileName'])
        );
        if(@$_FILES['ndisPlanDoc']){$attachedFile[] = array('path' => $uploadPath.'NDISPlanDoc/'.$data['ndisPlanDocument'], 'name' => $data['ndisPlanDocument']);}//End if condition
        // print_rp($attachedFile);
        #If it's submitted form is Internal then skip emails
        if($internalForm !== 'true'){//false means it's external
          // echo "asfd";
          // require_once '../plugins/PHPMailer_v5.1/class.phpmailer.php'; //library added in download source
          // include "../apis/client/post/email_templates/admin_email_set.php";//$adminEmailContent
          // $res['email_admin_res'] = emailPHPMailer($emailSenderArrCompany,array($companyDetails['emailAdminReceiver']),$adminEmailContent,$SMTPCred,$attachedFile,array(),$emailBCCArr);
          $res['email_admin_res'] = @sendEmail('2','3','admin',$attachedFile,$insertedId);

          #Email to Referral person
          if(@$data['makeRefEmail']){
            // $referralDate = date('m-d-Y',strtotime(@$data['dateOfRef']));
            // include "../apis/client/post/email_templates/referral_email_set.php";//$referralReceiverArr,$referralEmailContent
            // $res['email_referral_res'] = emailPHPMailer($emailSenderArrCompany,$referralReceiverArr,$referralEmailContent,$SMTPCred,false,array(),$emailBCCArr);
            $res['email_referral_res'] = @sendEmail('2','1','referral',false,$insertedId);
          }//End if condition
        
        }//End if condition
      
      }//End if condition
      
    }//End if condition
  
    if($internalForm !== 'false'){
      $res['successNotify'] = true;
      $res['successNotifyType'] = 'notify';
      if(@$data['id']){
        $res['successMsg'] = "Participant Referral Form has been updated successfully";
      }else{
        $res['successMsg'] = "Participant Referral Form has been added successfully";
      }//End if condition
      if($draftCode){
        $res['successMsg'] = "Participant Referral Form has been drafted successfully";
      }//End if condition
    }//End if condition
    // print_r($res);
    echo json_encode($res);
    

?>