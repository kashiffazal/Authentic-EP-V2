<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

  //@ Reply-to name is not there then set name and email as empty
  //? It's because on Update mode Reply-to could be removed by user
  if(!@$_POST['reply_to_name']){
    $_POST['reply_to_name'] = '';
    $_POST['reply_to_email'] = '';
  }//End if condition
  // print_rp($_POST);die();

  $res = dbQuery('post',$_POST,$email_sender_receiver_table);  
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'message';
  $res['successMsg'] = "Subject and Sender saved successfully";
  echo json_encode($res);
?>