<?php
  include './incident/initial_functions.php';
  $res = incidentFormList($value);
  
  include './settingJSON/get/getJSON.php';
  $res['appDefaultSetting'] = $devSettingJSON['formSetting']['incident'];
  
  echo json_encode($res);
?>