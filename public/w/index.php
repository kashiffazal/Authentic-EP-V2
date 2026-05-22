<?php
  
  #Registration with ref Link
  $DIRECT_ACCESS_PAGE = 'true';
  $app_no_session = 'true';
  
  //Get slash params in array
  #Old version
  // $pathinfo = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : @$_SERVER['REDIRECT_URL'];    
  // $params = preg_split('|/|', $pathinfo, -1, PREG_SPLIT_NO_EMPTY);

  #New Version
  $params = explode('/', $_SERVER['QUERY_STRING']);
  $params[0] = str_replace("p=","",$params[0]);

  $encryptId = end($params);
  //print_r($params);die();

  if($_SERVER['HTTP_HOST'] == 'localhost'){
    include '../../server/others/config.php';
  }else{
    include '../server/others/config.php';
  }//End if condition
  header('Location: '.$registerPagePath.'/'.$encryptId);
?>