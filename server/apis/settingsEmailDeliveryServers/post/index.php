<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $_POST['status'] = 'active';
  $res = dbQuery('post',$_POST,$email_delivery_servers_table);   
  echo json_encode($res);
?>