<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $res = dbQuery('post',$_POST,$email_template_table);

  //@If data is inserted first time (Not Updated)
  if($res['status'] AND !@$_POST['id']){
    $insertedId = $res['id'];
    //@Check if there is just one data in DB in this module with section
    $dt = dbQuery("SELECT id FROM $email_template_table WHERE module_ref_id = '".$_POST['module_ref_id']."' AND sub_module_ref_id = '".$_POST['sub_module_ref_id']."' AND section_ref_name = '".$_POST['section_ref_name']."'")['data'];
    //@If yes then make it default
    if(sizeof($dt) === 1){
      dbQuery("UPDATE $email_template_table SET default_status = 'true' WHERE id = '$insertedId'");
    }//End if condition
  }//End if condition

  $res['successNotify'] = true;
  $res['successNotifyType'] = 'message';
  $res['successMsg'] = 'Template has been '.(@$_POST['id'] ? 'updated' : 'added');
  echo json_encode($res);
?>