<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  //@Check First - Is it used in any template or not
  //@If no then delete this record
  $res = dbQuery("DELETE FROM $email_delivery_servers_table WHERE id = '".$_POST['id']."'");   
  
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "SMTP Server has been deleted";

  echo json_encode($res);
?>