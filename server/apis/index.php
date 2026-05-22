<?php

  //@ Require JWT Library
  require_once("../plugins/firebase-php-jwt/vendor/autoload.php");

  //Get slash params in array
  $pathinfo = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : @$_SERVER['REDIRECT_URL'];    
  $params = preg_split('|/|', $pathinfo, -1, PREG_SPLIT_NO_EMPTY);
  //print_r($params);
  // $params[0] => Folder Name
  // $params[1] => Action (get or post)
  // $params[2] => File Name
  // $params[3] => Query String(s) - Property
  // $params[4] => Query String(s) - Value
  // $params[5] => Other Query String(s) with & sign (property = value)

  #Set query string(s) if available
  $pr = $params;
  array_splice($pr,0,3);
  $GET = array();
  foreach($pr as $key => $value){if($key %2 === 0){$GET['keys'][] = $value;}else{$GET['values'][] = $value;}}//End foreach
  if(@$GET['keys'] AND @sizeof(@$GET['keys'])>0){foreach($GET['keys'] as $key => $value){$_GET[$value] = @$GET['values'][$key];}/*End foreach*/}//End if condition
  //print_r($_GET);die();
  
  #Ignore Session by providing query string
  if(@$_GET['se'] === 'ig'){$app_no_token = true;}//End if condition
  #Ignore Direct Page Access
  if(@$_GET['dr'] === 'ig'){$DIRECT_ACCESS_PAGE = 'true';}//End if condition

  //if(isset($params[0])){$params[0] = $params[0].'/';}
  #Set if get/post keyword is not available then make them as file name 
  //if(@$params[1] === 'get' || @$params[1] === 'post'){$params[1] = $params[1].'/';}else{$params[2] = @$params[1];$params[1] = '';}
  #Set 'index.php' file name if not provided
  if(!isset($params[2])){$params[2] = 'index';}//End if condition

  //echo $params[0].'/'.$params[1].'/'.$params[2].'.php';die();
  require_once '../others/config.php';
  #e.g. http:domain.com/server/apis/index.php/generalJournal/get/get_entries/id/20/&name=kashif
  //include 'generalJournal/get/get_entries.php?id=20';
  //echo $params[0].'/'.$params[1].'/'.$params[2];die();
  require_once $params[0].'/'.$params[1].'/'.$params[2].'.php';
  require_once '../clear_memory.php';
?>