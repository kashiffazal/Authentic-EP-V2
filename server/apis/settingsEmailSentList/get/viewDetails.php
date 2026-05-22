<?php
  $res = dbQuery("
    SELECT el.*, emm.module,esm.sub_module,ds.name AS ds_name
      FROM $email_sent_list AS el
      INNER JOIN $email_module_main_table AS emm ON el.module_ref_id = emm.id
      INNER JOIN $email_module_sub_table AS esm ON el.sub_module_ref_id = esm.id
      INNER JOIN $email_delivery_servers_table AS ds ON el.ds_ref_id = ds.id
    WHERE el.id = '$value'
  ");
  $res['data'] = $res['data'][0];
  if($res['data']['send_attachment']){
    $send_attachment = json_decode($res['data']['send_attachment'],true);
    foreach($send_attachment as $k => $v){
      $v['path'] = str_replace('..',$domainPath,$v['path']);
      //@ Set Extension Icon
      $v['icon'] = fileExtensionIcon($v['path']);
      $send_attachment[$k] = $v;    
    }//End foreach
    $res['data']['send_attachment'] = $send_attachment;
    // print_rp($send_attachment);
  }//end if condition
  
  echo json_encode($res);
?>