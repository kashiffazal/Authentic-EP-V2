<?php
    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
    $data = $_POST;
    // print_r($data);die();
    // print_r($_FILES);die();

    $data['status'] = $data['status'] ? $data['status'] : '1';//Applied
    if (@$data['days_availibility']) {
      $days_availibility = multiFieldsJsonSeparate($data['days_availibility']);
      $data['days_availibility_json'] = @$days_availibility['json'];
      $data['days_availibility_day'] = @$days_availibility['day'];
      $data['days_availibility_from'] = @$days_availibility['from'];
      $data['days_availibility_to'] = @$days_availibility['to'];
      $data['days_availibility_na'] = @$days_availibility['not_available'];
    } //End if condition
    unset($data['days_availibility']);

    if (@$data['localReferences']) {
      $localReferences = multiFieldsJsonSeparate($data['localReferences']);
      $data['localReferences_json'] = @$localReferences['json'];
      $data['localReferences_contact_no'] = @$localReferences['contact_no'];
      $data['localReferences_email_address'] = @$localReferences['email_address'];
      $data['localReferences_name_of_referee'] = @$localReferences['name_of_referee'];
      $data['localReferences_organisation'] = @$localReferences['organisation'];
      $data['localReferences_position_held'] = @$localReferences['position_held'];
    } //End if condition
    unset($data['localReferences']);

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
    $job_title = $data['job_title'];
    unset($data['job_title'],$data['primaryDocAvailable']);

    unset($data['swSignUrl']);


    @$data['dateOfBirth'] = @$data['dateOfBirth'] ? date('d-m-Y', strtotime($data['dateOfBirth'])) : '';
    @$data['joiningDate'] = @$data['joiningDate'] ? date('d-m-Y', strtotime($data['joiningDate'])) : '';
    @$data['visaExpDate'] = @$data['visaExpDate'] ? date('d-m-Y', strtotime($data['visaExpDate'])) : '';
    @$data['passportIssueDate'] = @$data['passportIssueDate'] ? date('d-m-Y', strtotime($data['passportIssueDate'])) : '';
    @$data['passportExpDate'] = @$data['passportExpDate'] ? date('d-m-Y', strtotime($data['passportExpDate'])) : '';

    #Set client signature variable
    $swSign = @$data['swSign'];
    unset($data['swSign']);


    $res = dbQuery("post",$data,$support_worker_form_table);
    $insertedId = $res['id'];
    //If form is drafted then generate draft_code othewise set it empty
    $draftCode = ($keyword !== 'complete') ? encrypt_decrypt('encrypt',$insertedId) : '';
    $res['draft_code'] = $draftCode;

    #Upload Signature and Update in DB
    if($res['status'] AND $swSign){
      $imgName = $insertedId.'-s.png';
      @base64ToImage($swSign,'../files/documents/signatures/sw-form/'.$imgName);
      dbQuery("post",array('id' => $insertedId, 'swSign' => $imgName),$support_worker_form_table);
    }//End if condition


    //Upload Files And sace draft_code into DB
    if($res['status'] AND sizeof($_FILES) > 0){
      //print_r($_FILES);
      $uploadPath = '../files/uploads/supportWorkerDocuments/'.$insertedId.'/';
      $fileNames = array();
      $fileNameForPDF = array();
      $_FILES = filesMakeMultidimensional($_FILES);
      foreach($_FILES as $key => $file){
        $fileUpRes = fileUpload($file,$uploadPath.$key.'/',$insertedId.'-'.randCode().'-');
        $fileNames[] = $key." = '".$fileUpRes['fileName']."'";
        $fileNameForPDF[$key][$key] = $fileUpRes['fileName'];

        if(isset($listData['uploadedDocuments'][$key])){
          deleteFilesFromDir($uploadPath.$key.'/',explode(',',$listData['uploadedDocuments'][$key]));
        }//End if condition

      }//End foreach
      $fileNames = implode(",",$fileNames);
      $res['fileUpload'] = runQuery("UPDATE $support_worker_form_table SET $fileNames , draft_code = '$draftCode' WHERE id = '$insertedId'", $insertedId);
      //print_r($res);
    }else{
      //If there is no file then just update draft value
      runQuery("UPDATE $support_worker_form_table SET draft_code = '$draftCode' WHERE id = '$insertedId'");
    }//End if condition

    //Update $fileNameForPDF variable if there is no new file and previously uploaded 
    foreach($listData['uploadedDocuments'] as $ky => $vl){if($vl AND !isset($fileNameForPDF[$ky])){$fileNameForPDF[$ky] = array($ky => $vl);}}//End foreach

    //print_r($fileNameForPDF);die();

    if($res['status'] AND @trim($keyword) === 'complete'){
      require_once '../plugins/mpdf-8.1.4/vendor/autoload.php';

      //Create PDF 
      include "../apis/supportWorker/post/pdf_html.php";//Set $html;
      $path = "../files/documents/supportWorker/forms";
      $fileName = $res['id']."-".$server_date;
      $file_ref = createPDF($path,$fileName,$html,$header,$footer);
  
      if($file_ref['status']){
        
        $res['file_ref'] = $file_ref;
        $attachedFile = array(array('path' => $path."/".$file_ref['fileName'], 'name' => $file_ref['fileName']));
        
        #If it's submitted form is Internal then skip emails
        if($internalForm === 'false'){//false means it's external
          // require_once '../plugins/PHPMailer_v5.1/class.phpmailer.php'; //library added in download source
          // include "../apis/supportWorker/post/email_templates/admin_email_set.php";//$adminEmailContent
          // $res['email_admin_res'] = emailPHPMailer($emailSenderArrCompany,array($companyDetails['emailAdminReceiver']),$adminEmailContent,$SMTPCred,$attachedFile,array(),$emailBCCArr);
          // include "../apis/supportWorker/post/email_templates/support_worker_email_set.php";//$clientReceiverArr,$clientEmailContent
          // $res['email_client_res'] = emailPHPMailer($emailSenderArrCompany,$clientReceiverArr,$clientEmailContent,$SMTPCred,$attachedFile,array(),$emailBCCArr);
          $res['email_admin_res'] = sendEmail('1','1','admin',$attachedFile,$insertedId);
          $res['email_client_res'] = sendEmail('1','1','sw',$attachedFile,$insertedId);
          // print_rp($res);
        }//End if condition
      
      }//End if condition
      
    }//End if condition
  
  
    if($internalForm !== 'false'){
      $res['successNotify'] = true;
      $res['successNotifyType'] = 'notify';
      if(@$data['id']){
        $res['successMsg'] = "Support Worker Form has been updated successfully";
      }else{
        $res['successMsg'] = "Support Worker Form has been added successfully";
      }//End if condition
      if($draftCode){
        $res['successMsg'] = "Support Worker Form has been drafted successfully";
      }//End if condition
    }//End if condition
    //print_r($res);
    echo json_encode($res);

?>