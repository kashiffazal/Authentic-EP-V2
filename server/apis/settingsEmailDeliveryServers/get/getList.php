<?php
  $res = dbQuery("SELECT * FROM $email_delivery_servers_table");
  foreach ($res['data'] as $k => $v) {
    $v['inserted_date_formatted'] = dateFormat($v['inserted_date'],false,'jS M Y').', '.$v['inserted_time'];
    $res['data'][$k] = $v;
  }//End foreach
  $res['data'] = array_reverse($res['data']);
  echo json_encode($res);
?>