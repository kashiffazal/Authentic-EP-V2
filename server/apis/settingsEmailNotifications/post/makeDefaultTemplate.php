<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  // print_rp($_POST);die();
  //@ Avoid all default_status from 'default';
  $res = dbQuery("UPDATE $email_template_table SET default_status = '' WHERE module_ref_id = '".$_POST['moduleId']."' AND sub_module_ref_id = '".$_POST['subModule']."' AND section_ref_name = '".$_POST['section']."'");
  if($res['status']){
    //@ Update default_status as 'true'
    $dt = array('id' => $_POST['id'], 'default_status' => 'true');
    $res = dbQuery('post',$dt,$email_template_table);  
  }//End if condition
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'message';
  $res['successMsg'] = 'Template is set as Default';
  echo json_encode($res);
?>