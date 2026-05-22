<?php
   $userId = isset($value) ? @$value : @$session_user_id;//User id
   $settingJSON = json_decode(@file_get_contents('./settingJSON/'.$userId.'.json'),true);
   $devSettingJSON = json_decode(file_get_contents('./settingJSON/defaultAppSettings.json'),true);
   //print_r($settingJSON);
   //print_r($devSettingJSON);
?>