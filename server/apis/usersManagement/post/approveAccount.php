<?php
  

  $id = $_GET['id'];
  $status = @$_GET['status'];
  $fullName = $_GET['fullName'];
  $email = $_GET['email'];

  if($status == 'true'){
    $val = '';
  }else{
    $val = 'true';
  }//End if condition

  $res = dbQuery("UPDATE $users_table SET `approve_status` = '$val' WHERE id = '$id'");

  if($res['status'] AND $val == 'true'){
    require_once('../plugins/PHPMailer_v5.1/class.phpmailer.php'); //library added in download source
    $receiverArr = array(array('email' => $email, 'name' => $fullName));
    include "login/get/approvedEmailTemplate.php";
    $content = array(
      'subject' => 'Account approved',
      'body' => $emailMsg,
      'plaintext' => 'This is the plain text version of the email content'
    );
    $res['data']['emailStatus'] = emailPHPMailer($emailSenderArrProduct,$receiverArr,$content,$SMTPCred);
    $res['successMsg'] = "User has been approved successfully";
  }else{
    $res['successMsg'] = "User has been unapproved successfully";
  }//End if condition


  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  

  echo json_encode($res);
?>