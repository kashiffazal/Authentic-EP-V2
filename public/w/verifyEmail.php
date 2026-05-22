<?php
  $avoid_json_res = true;
  $DIRECT_ACCESS_PAGE = 'true';
  $app_no_session = 'true';
  if($_SERVER['HTTP_HOST'] == 'localhost'){
    include '../../server/others/config.php';
    include '../../server/apis/login/get/verifyEmail.php';
  }else{
    include '../server/others/config.php';
    include '../server/apis/login/get/verifyEmail.php';
  }//End function
  if($res['status']){
    header('Location: '.$res['redirectPath']);
  }else{
    header('Location: '.$res['redirectPathError']);
  }//End if condition
?>