<?php
  $data = dbQuery("
  SELECT 
  (SELECT COUNT(id) FROM $support_worker_form_table WHERE status = '5') AS spCount,
  (SELECT COUNT(id) FROM $support_worker_form_table WHERE status = '2') AS spsCount,
  (SELECT COUNT(id) FROM $client_form_table WHERE status = 'active') AS clCount,
  (SELECT COUNT(id) FROM $client_form_table WHERE status = 'in_active') AS cliCount,
  (SELECT COUNT(id) FROM $service_plaining_table WHERE status = 'approve') AS srCount,
  (SELECT COUNT(id) FROM $service_plaining_table WHERE status = 'unapproved') AS sruCount
");

  if($data['status']){
    $arr = $data['data'][0];
    unset($arr['key']);
    foreach($arr as $k => $v){$arr[$k] = str_pad($arr[$k], 2, '0', STR_PAD_LEFT);}//End foreach
    unset($data['data']);
    $data['data']['count'] = $arr;
  }//End if condition


?>