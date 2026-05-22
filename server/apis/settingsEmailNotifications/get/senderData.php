<?php
  // print_rp($_GET);

  $res = dbQuery("SELECT * FROM $email_sender_receiver_table WHERE module_ref_id = '".$_GET['module']."' AND sub_module_ref_id = '".$_GET['subModule']."' AND section_ref_name = '".$_GET['section']."'");
  if($res['status'] AND @$res['data'][0]){
    $dt = $res['data'][0];
    $dt['default_ds'] = ($dt['default_ds'] === 'true') ? true : false;
    $dt['force_from_sender'] = ($dt['force_from_sender'] === 'true') ? true : false;
    $res['data'] = $dt;
  }else{
    $res['data'] = null;
  }//End if condition
  //@ Delivery Server List
  $res['dsList'] = dbQuery("SELECT id AS value, name AS label, default_status FROM $email_delivery_servers_table WHERE status = 'active'")['data'];

  // print_rp($res['dsList']);
  //@ Getting Default Server Name
  foreach ($res['dsList'] as $v) {
    if($v['default_status'] === 'true'){
      $res['defaultDsName'] = $v['label'];
    }//End if condition
  }//End foreach

  echo json_encode($res);

?>