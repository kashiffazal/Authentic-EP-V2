<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  if(!@$_POST['id']){
    $res = array();
    $res['status'] = false;
    $res['errorNotify'] = true;
    $res['errorNotifyType'] = 'message';
    $res['successMsg'] = "Please set sender first";
  }else{
    $res = dbQuery('post',$_POST,$email_sender_receiver_table);  
    $res['successNotify'] = true;
    $res['successNotifyType'] = 'message';
    $res['successMsg'] = "Receiver details saved successfully";
  }//End if condition

  echo json_encode($res);  
?>