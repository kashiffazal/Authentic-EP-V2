<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}  
  
  //@ Getting Data for Resent
  $dt = dbQuery("SELECT * FROM $email_sent_list WHERE id = '".$_POST['id']."'")['data'][0];
  //? Set Cc if available
  $dtCc = array();
  if($dt['cc_name']){
    $ccName = explode(',',$dt['cc_name']);
    $ccEmail = explode(',',$dt['cc_email']);
    foreach ($ccName as $k => $v){$dtCc[] = array('name' => $v, 'email' => $ccEmail[$k]);}//End foreach
  }//End if condition
  //? Set Bcc if available
  $dtBcc = array();
  if($dt['bcc_name']){
    $bccName = explode(',',$dt['bcc_name']);
    $bccEmail = explode(',',$dt['bcc_email']);
    foreach ($bccName as $k => $v){$dtBcc[] = array('name' => $v, 'email' => $bccEmail[$k]);}//End foreach
  }//End if condition

  //@ Getting Delivery Server to Send
  $ds = dbQuery("SELECT * FROM $email_delivery_servers_table WHERE id = '".$dt['ds_ref_id']."'")['data'][0];
  // print_rp($ds);die();
  //@ Sent Email
  $res = emailPHPMailer(
    array('name' => $dt['from_name'], 'email' => $dt['from_email']),
    array(array('name' => $dt['receiver_name'], 'email' => $dt['receiver_email'])),
    array('subject' => $dt['subject'], 'body' => $dt['content'], 'plaintext' => $dt['plaintext']),
    array(
      'host' => $ds['host'],
      'username' => $ds['username'],
      'password' => $ds['password'],
      'SMTPSecure' => $ds['smtp_secure'],
      'port' => $ds['port']
    ),
    $dt['send_attachment'] ? json_decode($dt['send_attachment']) : false,
    $dtCc,
    $dtBcc
  );
  
  //@ If sent then update in DB as status
  if($res['status']){
    $status = 'sent';
    dbQuery("UPDATE $email_sent_list SET sent_status = '$status', sent_date = '$server_date', sent_time = '$server_time' WHERE id = '".$_POST['id']."'");
  }//End if condition

  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "Email sent successfully";
  $res['newStatus'] = @$status;  
  echo json_encode($res);
?>