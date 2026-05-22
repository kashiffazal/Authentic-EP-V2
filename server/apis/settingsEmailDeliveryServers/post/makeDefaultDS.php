<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  //@ Avoid all default_status from 'default';
  $res = dbQuery("UPDATE $email_delivery_servers_table SET default_status = ''");
  if($res['status']){
    //@ Update default_status as 'true'
    $dt = array('id' => $_POST['id'], 'default_status' => 'true');
    $res = dbQuery('post',$dt,$email_delivery_servers_table);  
  }//End if condition
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'message';
  $res['successMsg'] = 'Template is set as Default';
  echo json_encode($res);
?>