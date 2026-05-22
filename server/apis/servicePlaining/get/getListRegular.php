<?php

$res = servicePlainingList($value, '1');
include './settingJSON/get/getJSON.php';
$res['appDefaultSetting'] = $devSettingJSON['formSetting']['servicePlaining'];
echo json_encode($res);