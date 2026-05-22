<?php
  $res = dbQuery("SELECT * FROM $email_sender_receiver_table WHERE module_ref_id = '".$_GET['module']."' AND sub_module_ref_id = '".$_GET['subModule']."' AND section_ref_name = '".$_GET['section']."'");
  $res['data'] = $res['data'][0];
  $res['data']['send_attachment'] = ($res['data']['send_attachment'] === 'true') ? true : false;

  echo json_encode($res);
?>