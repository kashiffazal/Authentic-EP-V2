<?php
  $res = dbQuery("SELECT * FROM $email_template_table WHERE id = '$value'");
  if($res['status'] AND @$res['data'][0]){
    $res['data'] = $res['data'][0];
  }//End if condition
  echo json_encode($res);
?>