<?php

  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

  require_once('../plugins/PHPMailer_v5.1/class.phpmailer.php'); //library added in download source

  //print_r($_POST);exit();
  
  $verificationLink = $clientDomainForLink."/verifyEmail.php?e=".encrypt_decrypt('encrypt',$_POST['email'])."&s=".$_POST['sessionName'];
  $receiverArr = array(array('email' => $_POST['email'], 'name' => $_POST['full_name']));
  include "login/get/confirmationEmailTemplate.php";
  $content = array(
    'subject' => 'Confirm your email address',
    'body' => $emailMsg,
    'plaintext' => 'This is the plain text version of the email content'
  );
  $res = emailPHPMailer($emailSenderArrProduct,$receiverArr,$content,$SMTPCred);

  $res['successNotify'] = true;
  $res['successTitle'] = 'Sent!';
  $res['successMsg'] = 'Verification email has been sent.';
  $res['successNotifyType'] = 'notify';
  
  echo json_encode($res);

?>