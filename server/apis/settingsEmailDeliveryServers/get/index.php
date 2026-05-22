<?php
  if($value){
    $res = dbQuery("SELECT * FROM $email_delivery_servers_table WHERE id = '$value'");
    $res['data'] = $res['data'][0];
  }else{
    $res = array('status' => true, 'data' => array());
  }//End if condition

  echo json_encode($res);
?>