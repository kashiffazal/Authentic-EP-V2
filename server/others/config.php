<?php
  
  ini_set('max_execution_time', 6000000); //300 seconds = 5 minutes
  ini_set('upload_max_filesize', '300M');
  ini_set('post_max_size', '300M');
  ini_set('max_input_time', 3000);

  session_set_cookie_params(31536000);
  ini_set('session.gc_maxlifetime', 31536000 );//31536000 second, 8760 hours, 365 days
  ini_set('session.cookie_lifetime', 31536000 );//31536000 second, 8760 hours, 365 days

  #Session is always start at all apis because user login session must checked on all pages
  session_start([
    'cookie_lifetime' => 31536000, 
    'gc_maxlifetime' => 31536000
  ]);
  require_once dirname(__FILE__)."/1-connection-and-paths.php";
  require_once dirname(__FILE__)."/2-company-and-email-info.php";
  require_once dirname(__FILE__)."/3-access-cross-origin.php";
  //include dirname(__FILE__)."/4-spash-params.php";

  //if(@$app_post_data == true){
    # Condition is because '3-post-global.php' will return 'die()' if $_POST variable is not available
    # APIs like GET and other has no $_POST variable
    require_once dirname(__FILE__)."/5-post-global.php";
  //}//End if condition
  
  require_once dirname(__FILE__)."/6-date-and-time.php";
  require_once dirname(__FILE__)."/7-other-defines.php";
  require_once dirname(__FILE__)."/8-general-functions.php";
  require_once dirname(__FILE__)."/9-specific-functions.php";

  #If we don't want to check session id like at login page etc
  if(!@$app_no_token == true){
    $headers = getallheaders();//? Getting header data for token sent from front-end
    $token = str_replace('Bearer ', '', $headers['Authorization']);//? Set token data
    $session_user_id = checkJWTToken($token);
  }//End if condition

  $_SESSION['companyLogoPath'] = $companyLogoPath;//? This is used for email logo path for Email Module
  
?>
