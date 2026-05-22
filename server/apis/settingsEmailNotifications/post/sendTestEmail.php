<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  // print_rp($_POST);

  $sendTestArr = array(
    'templateId' => $_POST['templateId'],
    'receiverEmail' => $_POST['receiverEmail']
  );

  $res = sendEmail($_POST['moduleId'],$_POST['subModule'],$_POST['section'],false,false,$_SESSION['defaultCompany']['id'],$sendTestArr);
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "Test email has been sent, Please check your inbox or spam/junk folder.";
  echo json_encode($res);

?>