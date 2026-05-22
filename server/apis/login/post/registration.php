<?php
  
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

  require_once('../plugins/PHPMailer_v5.1/class.phpmailer.php'); //library added in download source
  
  $_POST['full_name'] = split_name($_POST['full_name']);
  $_POST['first_name'] = $_POST['full_name'][0];
  $_POST['last_name'] = $_POST['full_name'][1];
  unset($_POST['full_name']);

  $_POST['role'] = 4 ;//Data Entry ref id
  $_POST['status'] = 4;//Unverified email

  $email = $_POST['email'];
  $fullName = $_POST['first_name']." ".$_POST['last_name'];

  //Checking email
  $res = dbQuery("SELECT email FROM $users_table WHERE email = '$email'",array('noRecordMsg' => true));

  if($res['status']){
    $res['status'] = false;
    $res['errorTitle'] = 'Not Available';
    $res['errorMsg'] = 'This email is not available, please use another email.';
  }else{
    $_POST['username'] = $_POST['email'];
    $res = dbQuery('post',$_POST,$users_table);

    if($res['status']){
      #Set user setting json file
      copy('settingJSON/sampleFormat.json','settingJSON/'.$res['id'].'.json');
      $verificationLink = $clientDomainForLink."/verifyEmail.php?e=".encrypt_decrypt('encrypt',$_POST['email'])."&s=";
      $receiverArr = array(array('email' => $_POST['email'], 'name' => $fullName));
      include "login/get/confirmationEmailTemplate.php";
      $content = array(
        'subject' => 'Confirm your email address',
        'body' => $emailMsg,
        'plaintext' => 'This is the plain text version of the email content'
      );
      $res = emailPHPMailer($emailSenderArrProduct,$receiverArr,$content,$SMTPCred);
    }//End if condition
  }//End if condition

  echo json_encode($res);

?>