<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();} 
  // print_rp($_FILES);
  // print_r($_POST);die();
  $_POST['appointment_no'] = @$_POST['appointment_no'] ? $_POST['appointment_no'] : getNewAppointmentNumber();
  $_POST['date'] = $_POST['date'] ? date('d-m-Y', strtotime($_POST['date'])) : '';
  $_POST['status'] = $_POST['status'] ? $_POST['status'] : 'unassigned';

  //@Get Old Files from DB if available
  if(@$_POST['id'] AND sizeof($_FILES) > 0){
    $oldDocs = dbQuery("SELECT documents FROM $client_appointment_table WHERE id = '".$_POST['id']."'")['data'][0]['documents'];
  }//End if condition

  //@ If SP is assign then set Variable
  $spId = @$_POST['service_plaining_ref_id'];
  $spw1 = @$_POST['spw_ref_id'];
  $spw2 = @$_POST['spw_partner_ref_id'];
  unset($_POST['service_plaining_ref_id'],$_POST['spw_ref_id'],$_POST['spw_partner_ref_id']);

  $internalForm = $_POST['internalForm'];
  unset($_POST['internalForm']);

  $res = dbQuery('post',$_POST,$client_appointment_table);
  $catId = $res['id'];
  
  //@Upload Files in folder and save into DB
  if($res['status'] AND sizeof($_FILES) > 0){
    $uploadPath = '../files/uploads/appointmentDocuments/';
    $fileNames = array();
    $emailAttachmentArr = array();
    foreach($_FILES as $key => $file){
      $fileUpRes = fileUpload($file,$uploadPath,$catId.'-'.$_POST['client_ref_id'].'-'.randCode().'-');
      $fileNames[] = $fileUpRes['fileName'];
      $emailAttachmentArr[] = array('path' => $uploadPath.$fileUpRes['fileName'], 'name' => $fileUpRes['fileName']);
    }//End foreach
    //@ Delete old Files if available
    if(@$oldDocs){deleteFilesFromDir($uploadPath,explode(',',$oldDocs));}//End if condition
    $fileNames = implode(",",$fileNames);
    $documentsUpload = runQuery("UPDATE $client_appointment_table SET documents = '$fileNames' WHERE id = '$catId'");
  }//End if condition  
  
  if($internalForm !== 'true'){//false means it's external
    $clientCompanyId = dbQuery("SELECT company_ref_id FROM $client_form_table WHERE id = '".$_POST['client_ref_id']."'")['data'][0]['company_ref_id'];
    $res['email_admin_res'] = $res = sendEmail('3','5','',@$emailAttachmentArr,$catId,$clientCompanyId);
  }//End if condition

  //@ If Shift is assigned with SP then also Update Service Plaining
  if($res['status'] AND $spId){
    $postSP = array(
      'id' => $spId,
      'client_ref_id' => $_POST['client_ref_id'],
      'service_start_time' => $_POST['start_time'],
      'service_end_time' => $_POST['end_time'],
      'service_date' => $_POST['date'],
      'spw_ref_id' => $spw1,
      'spw_partner_ref_id' => $spw2
    );//End Array
    $res = dbQuery('post',$postSP,$service_plaining_table);
  }//End if condition
  $res['id'] = $catId;
  $res['documentsUpload'] = @$documentsUpload;
  
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  if(@$_POST['id']){
    $res['successMsg'] = "Appointment has been updated successfully";
  }else{
    $res['successMsg'] = "Appointment has been added successfully";
  }//End if condition

  //@ For Front-End Log Update
  $res['appointment_no'] = $_POST['appointment_no'];
  // $res['new_appointment_no'] = getNewAppointmentNumber();
  $res['status'] = $_POST['status'];
  echo json_encode($res);

?>