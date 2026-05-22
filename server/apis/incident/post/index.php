<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $data = $_POST;
  // print_r($data);die();

  #Set Form Number
  $data['form_no'] = @$data['form_no'] ? $data['form_no'] : getNewIncidentFormNumber();

  if (@$data['other_parties_multi']) {
    $parties = multiFieldsJsonSeparate($data['other_parties_multi'],false,'<%>');
    $data['parties_json'] = @$parties['json'];
    $data['parties_work_unit'] = @$parties['work_unit'];
    $dateTempVar = array();
    foreach(explode('<%>',@$parties['date_advised']) as $v){$dateTempVar[] = @$v ? date('d-m-Y', strtotime($v)) : '';}//End foreach
    $data['parties_date_advised'] = implode('<%>',$dateTempVar);
    $data['parties_method_of_contact'] = @$parties['method_of_contact'];
  } //End if condition
  unset($data['other_parties_multi']);

  #Set status
  if(@$_SESSION['link_id']){
    $data['spw_user_ref_id'] = $_SESSION['link_id'];
    $data['status'] = 'unapprove';
  }//End if condition
  if(!@$_SESSION['link_id'] AND (@$data['admin_signature'] OR @$data['admin_signature_url'])){
    $data['status'] = 'approved';
  }//End if condition
  if($data['internal'] === 'false'){
    $data['status'] = 'unapprove';
    $external = $data['internal'];
    unset($data['internal']);
  }//End if condition
  #If this is draft then skip the above status and set status as draft
  if(@$data['draft']){
    $data['status'] = 'draft';
    $draft = true;
    unset($data['draft']);
  }//End if condition

  #Set Images Variable 
  $circleImg = @$data['location_on_body_circle_img'];
  unset($data['location_on_body_circle_img']);
  unset($data['location_on_body_circle_img_url']);
  $adminSign = @$data['admin_signature'];
  unset($data['admin_signature']);
  unset($data['admin_signature_url']);
  $spwUserSign = @$data['spw_user_signature'];
  unset($data['spw_user_signature']);
  unset($data['spw_user_signature_url']);
  unset($data['key']);

  #Set Dates and Time
  @$data['date_of_injury'] = @$data['date_of_injury'] ? date('d-m-Y', strtotime($data['date_of_injury'])) : '';
  @$data['time_of_injury'] = @$data['time_of_injury'] ? date('h:i:s A', strtotime($data['time_of_injury'])) : '';
  @$data['due_date'] = @$data['due_date'] ? date('d-m-Y', strtotime($data['due_date'])) : '';

  #Set person id who is filling up the form (user or support worker)
  if(strstr($data['spw_user_ref_id'], '=>' ) !== false){
    $data['spw_user_ref_id'] = str_replace('=>', '',$data['spw_user_ref_id']);//This is actually user id not a support worker id
    $data['whos_filling'] = 'user';
  }else if(@$external){
    $data['whos_filling'] = 'external';
  }else{
    $data['whos_filling'] = 'spw';
  }//End if condition
  unset($data['internal']);
  //print_rp($data);die();

  //@ Getting Company and Branch by SW
  $cData = getSWCompany($data['spw_user_ref_id']);
  $data['company_ref_id'] = $cData['company_ref_id'];
  $data['branch_ref_id'] = $cData['branch_ref_id'];
  
  // print_rp($data);die();
  $res = dbQuery('post',$data,$incident_form_table);
  if($res['status']){
    include './incident/initial_functions.php';
    #Upload incident circle image
    if($circleImg){
      base64_to_image($circleImg, '../files/documents/incident/circleImg/', 'circleImg'.$res['id'].'-ci.png');
      imageMerge('circle-img.png','circleImg'.$res['id'].'-ci.png','../files/documents/incident/circleImg/','circleImg'.$res['id'].'-ci-mod.png');
    }//End if condition
    #Upload admin signature image
    if($adminSign){base64_to_image($adminSign, '../files/documents/incident/signatures/', 'adminSign'.$res['id'].'-as.png');}  
    #Upload admin signature image
    if($spwUserSign){base64_to_image($spwUserSign, '../files/documents/incident/signatures/', 'spwUserSign'.$res['id'].'-as.png');}  
    if(!@$draft){#Create PDF and send Email if status is not Draft
      #Create PDF
      include './incident/post/includes/createPDF.php';
      #Send Emails
      include '../plugins/PHPMailer_v5.1/class.phpmailer.php'; //library added in download source
      //Send to Ainan and CC to Support (When SPW is submitted internal or external)
      if((@$_SESSION['link_id'] OR @$external) AND ($data['status'] === 'unapprove') AND @$data['email_before_approval'] !== 'true'){
        include "../apis/incident/post/includes/emailBeforeApproval.php";
        #File Name and Path variable is set from createPDF.php page
        // $attachedFile = array(array('path' => $path."/".$file_ref['fileName'], 'name' => $file_ref['fileName']));
        // $res['emailBeforeApproval'] = sendEmail('2','3','admin',$attachedFile,$insertedId);
      }//End if condition
      //Send to Support after approved
      if(!@$_SESSION['link_id'] AND $data['status'] === 'approved' AND @$data['email_after_approval'] !== 'true'){
        include "../apis/incident/post/includes/emailAfterApproval.php";
      }//End if condition
      #Set email send status on DB
      dbQuery("UPDATE $incident_form_table SET email_before_approval = '".@$data['email_before_approval']."', email_after_approval = '".@$data['email_after_approval']."' WHERE id = '".$res['id']."'");
    }//End if condition
  }//End if condition

  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  if(@$data['id']){
    $res['successMsg'] = "Incident Form has been updated successfully";
  }else{
    $res['successMsg'] = "Incident Form has been added successfully";
  }//End if condition


  echo json_encode($res);

?>