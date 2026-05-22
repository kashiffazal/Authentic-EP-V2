<?php

  
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
    // print_r($_POST);
  #Check if user email or email already exists or not -------------//
  if(@!$_POST['id']){
    $email = @dbQuery("SELECT email FROM $users_table WHERE email = '".$_POST['email']."'")['data'][0]['email'];
    $username = @dbQuery("SELECT username FROM $users_table WHERE username = '".$_POST['username']."'")['data'][0]['username'];
    if(isset($email) OR isset($username)){
      $res = array();
      $res['status'] = false;
      $res['errorNotifyType'] = 'notify';
      $res['errorMsg'] = ($email ? 'Email' : 'Username')." already exists";
      echo json_encode($res);
      die();
    }//End if condition
  }//End if condition
  #------------------------------------------------//
  $fullName = $_POST['full_name'];
  $profileImage = @$_POST['profileImageCurrent'];
  $profileOldImgName = @$_POST['profileOldImgName'];
  $_POST['full_name'] = split_name($_POST['full_name']);
  $_POST['first_name'] = $_POST['full_name'][0];
  $_POST['last_name'] = $_POST['full_name'][1];
  unset($_POST['full_name']);
  unset($_POST['profileImageCurrent']);
  unset($_POST['profileOldImgName']);

  $_POST['approve_status'] = 'true';
  if(!@$_POST['company_ref_ids']){$_POST['company_ref_ids'] = '1';}
  $_POST['slug_color'] = '#'.randCode(6);
  $res = dbQuery('post',$_POST,$users_table);

  //@If images in uploaded
  if($res['status'] AND $profileImage){
    $fileName = $res['id'].'_'.randCode(5).'profileImage.png';
    $folderPath = '../files/uploads/user_profiles/';
    if (base64_to_image($profileImage, $folderPath, $fileName)) {
      dbQuery('post', array('id' => $res['id'], 'profileImage' => $fileName), $users_table);
      $res['data']['profileImage'] = $fileName;
      @unlink($folderPath.$profileOldImgName);
    } //End if condition
  } //End if condition


  #Send email on New USer
  if($res['status'] AND @!$_POST['id']){
    require_once '../plugins/PHPMailer_v5.1/class.phpmailer.php'; //library added in download source
    include "../apis/usersManagement/post/email_templates/addNewUserTemplate.php";//$newUserEmailContent
    $receiver = array('name' =>  $fullName, 'email' => $_POST['email']);
    $res['email_status'] = emailPHPMailer($emailSenderArrCompany,array($receiver),$newUserEmailContent,$SMTPCred,false,array(),$emailBCCArr);
  }//End if condition

  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  if(@$_POST['id']){
    $res['successMsg'] = "User has been updated successfully";
  }else{
    $res['successMsg'] = "User has been added successfully";
  }//End if condition

  echo json_encode($res);

?>