<?php

  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;

  function login_with_session($postArr,$getColArr = '*'){
    global $users_table;
    global $users_status_table;
    $activeStatusId = '1';
    $unverifiedStatusId = '4';
    //Adding keys to array
    $colKey = array();
    $colValue = array();
    $placeholderArr = array();
    foreach($postArr as $key => $value){
      $colKey[] = $key;
      $colValue[] = $value;
      $placeholderArr[':'.$key] = $value;
    }//End foreach
    $username = "$colKey[0] = :$colKey[0] AND ";
    $password = "$colKey[1] = :$colKey[1]";
    $condition = $username.$password;
    if($getColArr != '*'){$getColArr = "id,link_id,status,current_login,last_login,second_last_login,".$getColArr;}
    
    $data = fetchDataFromDB("SELECT $getColArr FROM $users_table WHERE $condition",false,false,false,false,$placeholderArr);
    $response = array();
    if(isset($data['data'][0]['id'])){
      $data = $data['data'][0];
      $user_id = $data['id'];
      $link_id = $data['link_id'];
      $user_status_id = $data['status'];
      $user_name = $data['first_name']." ".$data['last_name'];
      $user_email = $data['email'];
      $user_role_id = $data['kc'];

      //Get Status 
      $status_data = fetchDataFromDB("SELECT id,status,errorTitle,errorMsg FROM $users_status_table WHERE id = '$user_status_id'");
      $status_data = $status_data['data'][0];
      //Check Status
      if(
        trim($status_data['id']) != trim($activeStatusId)
        AND
        trim($status_data['id']) != trim($unverifiedStatusId)
      ){
        $response['status'] = false;
        $response['errorTitle'] = $status_data['errorTitle'];
        $response['errorMsg'] = $status_data['errorMsg'];
        $response['errorType'] = '';
        $response['errorNotifyType'] = 'notify';
        $response['errorDuration'] = ERROR_DURATION;
      }else{
        
        if(trim($status_data['id']) == trim($unverifiedStatusId)){
          $response['unverifiedUserData'] = array('name' => $user_name,'email' => $user_email);
          $response['unverified'] = true;
          $response['status'] = true;
          return $response;
          die();
        }else{
          $response['unverified'] = false;
        }//End if condition

        //Checking Approve or not
        if($data['approve_status'] != 'true'){
          $response['approve'] = false;
          $response['status'] = true;
          return $response;
          die();
        }else{$response['approve'] = true;}//End if condition

        $_SESSION['user_id'] = $user_id;//save user id in session
        $_SESSION['user_name'] = $user_name;//save user id in session
        $_SESSION['link_id'] = $link_id;//save user id in session
        $_SESSION['user_role_id'] = $user_role_id;//save user id in session
        if(isset($_SESSION['user_id'])){

          //Update login history
          updateLoginHistory($data);


          $response['status'] = true;
          $response['successTitle'] = 'Success';
          $response['successMsg'] = 'Login successful';
          $response['successNotifyType'] = 'message';
          $response['successDuration'] = SUCCESS_DURATION;
          $response['data'] = $data;
        }else{
          $response['status'] = false;
          $response['errorTitle'] = 'Login Failed';
          $response['errorMsg'] = 'Could not create session';
          $response['errorType'] = '';
          $response['errorNotifyType'] = 'notify';
          $response['errorDuration'] = ERROR_DURATION;
        }//End if condition

      }//End if condition

    }else{
      $response['status'] = false;
      $response['errorTitle'] = 'Invalid Inputs';
      $response['errorMsg'] = 'Incorrect username or password';
      $response['errorType'] = '';
      $response['errorNotifyType'] = 'notify';
      $response['errorDuration'] = ERROR_DURATION;
    }//end if condition
    return $response;
  }//End function

  function createJWTToken($data){
    global $jwt_secret_key;
    return JWT::encode($data, $jwt_secret_key,'HS256');
  }//End function

  function getJWTTokenData($token){
    global $jwt_secret_key;
    $decoded = JWT::decode($token, new Key($jwt_secret_key, 'HS256'));
    return objectToArray($decoded);
  }//End function

  function checkJWTToken($token){
    if(isset($token)){
      $_SESSION = getJWTTokenData($token);
      return $_SESSION['user_id'];
    }else{
      echo json_encode(array('status' => false, 'errorTitle' => 'Invalid Token' ,'errorMsg' => 'Invalid Token, please login again.', 'errorType' => 'session-error', 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION));
      die();
    }//End if condition
  }//End function

  function updateLoginHistory($data){
    global $server_date;
    global $server_time;
    global $users_table;
    $current_login = $server_date.', '.$server_time;
    $db_current_login = $data['current_login'];
    $last_login = $data['last_login'];
    $second_last_login = $data['second_last_login'];
    $id = $data['id'];
    dbQuery("
      UPDATE $users_table SET 
      `current_login` = '$current_login',
      `last_login` = '$db_current_login',
      `second_last_login` = '$last_login'
      WHERE id = '$id'
    ");
  }//End function

  //Check user has specific role or not (role id could be comma separated)
  function check_role_id($role_id,$user_id = false){
    if($user_id){
      $user_role_id = user_id_to_user_role_id($user_id);
    }else{
      $user_role_id = $_SESSION['user_role_id'];
    }//End if condition
    $role_id = explode(",",$role_id);
    foreach($role_id as $id){
      if(trim($id) == trim($user_role_id)){
        return true;
        break;
      }//End if condition
    }//End foreach
    return false;
  }//End function

  function user_id_to_user_role_id($id){
    global $users_table;
    $res = fetchDataFromDB("SELECT role FROM $users_table WHERE id = '$id'");
    return $res['data'][0]['role'];
  }//End function

  function executePDO($query,$placeholderArr = array()){
    global $pdo;
    $result = $pdo->prepare($query);
    foreach($placeholderArr as $k => $v){$result->bindValue($k,$v,PDO::PARAM_STR);}//End foreach
    $result->execute();
    $error = $result->errorInfo();
    $error = $error[2];
    if($error){
      $res = array('errorTitle' => 'Database Error', 'errorMsg' => $error, 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION, 'data' => array(), 'errorType' => 'db-error', 'query' => $query);
    }else{
      $res = array('errorTitle' => '', 'errorMsg' => false, 'errorNotifyType' => '', 'errorDuration' => '','data' => $result, 'errorType' => '', 'query' => $query);
    }//End if condition
    return $res;
  }//End function

  //$dateFormat = array('inserted_date,purchase_date','d-m-Y');
  function fetchDataFromDB($SQL_query,$reverse = false,$dateFormat = false,$noRecordMsg = false,$indexAsId = false, $PODPlaceholder = array()){
    $pdo_res = executePDO($SQL_query,$PODPlaceholder);
    $arr = array();
    if(!$pdo_res['errorMsg']){
      $i = 1;
      while($row = $pdo_res['data']->fetch()){
        #Change date formate if available        
        if($dateFormat){
          $colNames = explode(",",$dateFormat[0]);
          foreach($colNames as $dateColVal){
            if(@$row[$dateColVal] && @$row[$dateColVal] != ""){//If this column is available then update it
              $row[$dateColVal] = date($dateFormat[1], strtotime($row[$dateColVal]));
            }//End if condition
          }//End foreach
        }//End if condition

        $row['key'] = $i;
        if($indexAsId){$arr[$row[$indexAsId === true ? 'id' : $indexAsId]] = $row;}else{$arr[] = $row;};
        $i++;
      }//End while loop
      if(sizeof($arr) >= 1){
        if($reverse){$arr = array_reverse($arr);}
        $res = array('status' => true, 'data' => $arr, 'successNotify' => false, 'successTitle' => '', 'successMsg' => '', 'successNotify' => false, 'successNotifyType' => '', 'successDuration' => SUCCESS_DURATION);
      }else{
        if($noRecordMsg){
          $res = array('status' => false, 'data' => array(), 'errorTitle' => 'Data not available', 'errorMsg' => 'No record found', 'errorType' => '', 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION);
        }else{
          $res = array('status' => true, 'data' => array(), 'successTitle' => '', 'successMsg' => '', 'successNotify' => false, 'successNotifyType' => '', 'successDuration' => SUCCESS_DURATION);
        }//End if condition
      }//End if condition
    }else{
      $res = array('status' => false, 'errorTitle' => $pdo_res['errorTitle'], 'errorMsg' => $pdo_res['errorMsg'], 'errorType' => $pdo_res['errorType'], 'errorNotifyType' => $pdo_res['errorNotifyType'], 'errorDuration' => $pdo_res['errorDuration']);
    }//End if condition
    return $res;
  }//End function

  function create_SQL_query_by_array($array,$tableName,$action,$skipArray,$whereCondition,$runQuery = false,$id = false){
    //Modifying skipArray for create index as value ---------------------------//
    $skipArrayMod = array();
    if(isset($skipArray)){foreach($skipArray as $value){$skipArrayMod[$value] = $value;}}
    //--------------------------------------------------------------------------//
    $colsString = "";
    $valuesString = "";
    $updateString = "";
    $valuesStringMod = "";
    //Creating Columns ---------------------------------------------------------------------------------------//
    foreach($array as $key => $value){
      if($value == 'undefined'){$value = "";}
      if($key == array_search($key,$skipArrayMod)){continue;}//if it's found any skiped value then skip this route
      if(gettype($value) == 'array'){

        //Merge All array into one array ----------------------------------//
        $newArray = array();$a = 0;
        foreach($value as $partialArray){
          foreach ($partialArray as $partialKey => $partialValue) {
            if($a == 0){ $newArray[$partialKey] = $partialValue;
            }else{ $newArray[$partialKey] = $newArray[$partialKey]."=>".$partialValue;}
          }//End inner foreach loop
          $a++;
        }//End outer foreach loop
        //print_r($newArray);
        //-------------------------------------------------------------------//
        foreach($newArray as $keyInner => $valueInner){
          if($keyInner == array_search($keyInner,$skipArrayMod)){continue;}//if it's found any skiped value then skip this route
          $colsString .= $keyInner .",";
          $valuesString .= "'".addslashes($valueInner) ."',";
          $updateString .= $keyInner." = '".addslashes($valueInner)."',";
        }//End 1st inner foreach

      }else{
        $colsString .= $key .",";
        $valuesString .= "'".addslashes($value) ."',";
        $updateString .= $key." = '".addslashes($value)."',";
      }//End dif condition
    }//End foreach
    $colsString = rtrim($colsString,",");
    $valuesString = rtrim($valuesString,",");
    $updateString = rtrim($updateString,",");

    if($action == "insert"){
      $query = "INSERT INTO $tableName(".$colsString.")VALUES(".$valuesString.")";
    }else if($action == "update"){
      $query = "UPDATE $tableName SET ".$updateString." WHERE ".$whereCondition;
    }else{
      $query = "Please provide action, e.g. 'insert' or 'update'";
    }//End if condition
    //--------------------------------------------------------------------------------------------------------//

    if($runQuery){
      return runQuery($query,$id);
    }else{
      return $query;
    }//End if condition

  }//End function

  function fileUpload($fileVar,$pathToUpload,$prefix = '',$maxFileSizeInKb = false){
    //If it's not multidimensional array then make it
    if(!isset($fileVar[0])){$fileVar = array($fileVar);}//End if condition
    $filesName = array();
    $res = array();
    foreach($fileVar as $vl){
      if(@$vl['name']){
        //if no errors...
        if(!$vl['error']){
          $new_file_name = strtolower($vl['tmp_name']); //rename file
          //file size must be in kb
          if($maxFileSizeInKb AND $vl['size'] > ($maxFileSizeInKb)){
            $valid_file = false;
            $res['res'][] = array('status' => false, 'errorTitle' => 'Can\'t upload file', 'errorMsg' => 'Oops!  Your file\'s size is to large then '.$maxFileSizeInKb.'.', 'errorType' => '', 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION);
          }else{
            $valid_file = true;
          }//End if condition
          if($valid_file){
            makedirs($pathToUpload);//Create directory(s) if not available
            $fileName = $prefix.str_replace(' ','-',$vl['name']);
            //$fileName = $vl['name'];
            // ,'image/png'
            $imageFileMimeTypes = array('image/jpeg','image/gif');
            if(array_search($vl['type'],$imageFileMimeTypes) !== false){
              $fileName = compressImageWithConvertToJPG($vl['tmp_name'],$pathToUpload.$fileName,60);
            }else{
              move_uploaded_file($vl['tmp_name'], $pathToUpload.$fileName);
            }//End if condition        
            $res['res'][] = array('status' => true, 'successTitle' => 'Uploaded Successfully', 'successMsg' => 'Congratulations! Your file was accepted.', 'successNotify' => false, 'successNotifyType' => '', 'successDuration' => SUCCESS_DURATION, 'fileName' => $fileName);
            $filesName[] = $fileName;
          }//End if condition
        }else{$res['res'][] = array('status' => false, 'errorTitle' => 'Can\'t upload file', 'errorMsg' => 'Ooops!  Your upload triggered the following error:  '.$vl['errorMsg'], 'errorType' => '','errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION);}//End if condition
      }else{
        $res['res'][] = array('status' => false, 'errorTitle' => 'File not available', 'errorMsg' => 'Please provide file to upload', 'errorType' => '', 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION);
      }//End if condition
    }//End foreach

    $error = false;
    foreach($res['res'] as $vl){if(!$vl['status']){$error = true;}}
    if(!$error){$res = $res['res'][0];}
    $res['fileName'] = implode(',',$filesName);

    return $res;
  }//End function

  function filesMakeMultidimensional($files){
    $suffix = '';
    $fileArr = array();
    $count = 0;
    foreach($files as $key => $vl){
      $ex = explode('_',$key);
      if((int) @$ex[1] !== $count){$count = 0;}//End if condition
      $suffix = $ex[0];
      $count++;
      $fileArr[$suffix][] = $vl;
    }//End if condition
    return $fileArr;
  }//End function

  function makedirs($dirpath,$removeFileNameFromPath = false,$mode = 0777, $recursive = true) {
    if($removeFileNameFromPath){
      $path = explode('/',$dirpath);
      array_pop($path);//Remove file name from path
      $dirpath = implode('/',$path);
    }//End if condition    
    $oldMask=umask(002);
    $status = is_dir($dirpath) || mkdir($dirpath, $mode, $recursive);
    umask($oldMask);
    return $status;
  }//End function

  function deleteDirectoryWithFilsAndFolders($dir) {
    if(is_dir($dir)){
      $files = glob( $dir . '*', GLOB_MARK );
      foreach( $files as $file ){deleteDirectoryWithFilsAndFolders( $file );}
      rmdir( $dir );
    } elseif(is_file($dir)) {unlink( $dir );}
  }//End function

  function compressImageWithConvertToJPG($source, $destination, $quality) {
    $info = getimagesize($source);
    if ($info['mime'] == 'image/jpeg') 
      $image = imagecreatefromjpeg($source);
    elseif ($info['mime'] == 'image/gif') 
      $image = imagecreatefromgif($source);
    elseif ($info['mime'] == 'image/png') 
      $image = imagecreatefrompng($source);
    imagejpeg($image, $destination, $quality);

    #Change extension into .jpg
    $fileExplode = explode('.',$destination);
    unset($fileExplode[sizeof($fileExplode)-1]);
    $destination = implode('.',$fileExplode).'.jpg';
    
    imagejpeg($image, $destination, $quality);
    imagedestroy($image);
  
    #return file name
    $fileName = explode('/',$destination);
    return $fileName = $fileName[sizeof($fileName)-1];
  }//End function

  #File upload and post other data (File must be uploaded then other data will be post)
  function fileUploadWithDB($fileVar,$pathToUpload,$prefix = '',$maxFileSizeInKb = false,$tableName,$colName,$whereCondition = false,$otherPostData = false,$skipArray = array(),$removeFileArr = array()){
    $res = fileUpload($fileVar,$pathToUpload,$prefix,$maxFileSizeInKb);
    $otherRes = array();
    if($res['status']){
      if($whereCondition){
        $fetchRes = fetchDataFromDB("SELECT $colName FROM $tableName WHERE $whereCondition");
        
        $oldFileName = $fetchRes['data'][0][$colName];
        $newFileName = $res['fileName'];
        if(($oldFileName &&  $oldFileName !== $newFileName)){
          @unlink($pathToUpload.$fetchRes['data'][0][$colName]);
        }//End if condition

        foreach($removeFileArr as $value){@unlink($value);}//Remove files from given path (Optional)
        $updRes = runQuery("UPDATE $tableName SET $colName = '".$res['fileName']."' WHERE $whereCondition");
        if($updRes['status']){
          if($otherPostData){
            $otherRes = create_SQL_query_by_array($otherPostData,$tableName,'update',$skipArray,$whereCondition,true);
          }//End if condition
          $response = array('status' => true, 'successTitle' => 'Success', 'successMsg' => 'File has been updated successfully.', 'successNotify' => false, 'successNotifyType' => '', 'successDuration' => SUCCESS_DURATION, 'fileName' => $res['fileName']);
        }else{
          $response = array('status' => false, 'errorTitle' => $updRes['errorTitle'], 'errorMsg' => $updRes['errorMsg'], 'errorType' => $updRes['errorType'], 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION);
        }//End if condition
      }else{
        $insRes = runQuery("INSERT INTO $tableName($colName) VALUES('".$res['fileName']."')");
        if($insRes['status']){
          if($otherPostData){
            $otherRes =  create_SQL_query_by_array($otherPostData,$tableName,'update',$skipArray,"id = '".$insRes['id']."'",true);
          }//End if condition
          $response = array('status' => true, 'successTitle' => 'Success', 'successMsg' => 'File has been updated successfully', 'successNotify' => false, 'successNotifyType' => '', 'successDuration' => SUCCESS_DURATION, 'fileName' => $res['fileName']);
        }else{
          $response = array('status' => false, 'errorTitle' => $insRes['errorTitle'], 'errorMsg' => $insRes['errorMsg'], 'errorType' => $insRes['errorType'], 'errorNotifyType' => $insRes['errorNotifyType'], 'errorDuration' => $insRes['errorDuration']);
        }//End if condition
      }//End where if condition
    }else{
      $response = array('status' => false, 'errorTitle' => $res['errorTitle'], 'errorMsg' => $res['errorMsg'], 'errorType' => $res['errorType'], 'errorNotifyType' => $res['errorNotifyType'], 'errorDuration' => $res['errorDuration']);
    }//End res if condition
    $response['otherColUpdateREs'] = $otherRes;
    return $response;
  }//End function

  #Post data with file or not (Data must be posted or updated and file is not required)
  #It's use for profile data where profile image could be provided or not
  function postDataWithFile(
    $postData,$tableName,$action,$skipArray,$whereCondition,$id, //Post or update data params
    $fileVar,$pathToUpload,$prefix,$colName //File upload params
    ){
    $res = create_SQL_query_by_array($postData,$tableName,$action,$skipArray,$whereCondition,true,$id);
    if($res['status']){
      $last_insert_id = $res['id'];
      if($action == 'update'){
        #if post data action is update then use same where condition
        $fileWhereCon = $whereCondition;
      }else{
        #Otherwise use last inserted id givin by 'create_SQL_query_by_array' at insert data
        $fileWhereCon = "id = '$last_insert_id'";
      }//End if condition
      $res['file_res'] = $fileVar ? fileUploadWithDB($fileVar,$pathToUpload,$prefix,false,$tableName,$colName,$fileWhereCon) : array();
    }//End if condition
    return $res;
  }//End function

  function randCode($numberCount = 4){
    if($numberCount){
      $number = $numberCount;
    }else{
      $number = 4;
    }//end if condition
    return substr(md5(microtime()),rand(0,26),$number);
  }//End function

  function randNumber($numberCount = 4){
    $res = "";
    for($i = 0; $i<$numberCount; $i++){$res .= rand(1,9);}//End foreach
    return $res; 
  }//End function

  function addKeyInArray($arr){
    $i = 1;
    foreach($arr as $key => $value){
      $value['key'] = $i++;
      $arr[$key] = $value;
    }
    return $arr;
  }//End function

  #Date difference
  function dateDifference($dateTime,$prefix = false,$postfix = false,$inWhat = ''){
    $today          = new DateTime('now');
    $givenDateTime  = new DateTime($dateTime);
    $difference = $today->diff($givenDateTime);

    $res = "";

    $year = $difference->format('%y');
    $month = $difference->format('%m');
    $days = $difference->format('%d');
    $hour = $difference->format('%h');
    $mint = $difference->format('%i');
    $sec = $difference->format('%s');
    $micSec = $difference->format('%f');//Microseconds

    if($inWhat === 'y'){return $year;}
    if($inWhat === 'm'){return $month;}
    if($inWhat === 'd'){return $days;}
    if($inWhat === 'h'){return $hour;}
    if($inWhat === 'i'){return $mint;}
    if($inWhat === 's'){return $sec;}
    if($inWhat === 'f'){return $micSec;}


    if($year){
      if($year > 1){
        $res .= $year." years ";
      }else{
        $res .= $year." year ";
      }//End if condition
    }else{
      if($month){
        if($month > 1){
          $res .= $month." months ";
        }else{
          $res .= $month." month ";
        }//End if condition
      }else{
        if($days){
          if($days > 1){
            $res .= $days." days ";
          }else{
            $res .= $days." day ";
          }//End if condition
        }else{
          if($hour){
            if($hour > 1){
              $res .= $hour." hours ";
            }else{
              $res .= $hour." hour ";
            }//End if condition
          }else{
              if($mint){
                if($mint > 1){
                  $res .= $mint." minutes ";
                }else{
                  $res .= $mint." minute ";
                }//End if condition
              }else{
                if($sec){
                  if($sec > 1){
                    $res .= $sec." seconds ";
                  }else{
                    $res .= $sec." second ";
                  }//End if condition
                }else{
                  if($micSec){
                    $milliSecond = $micSec;//Round up
                    $res .= $milliSecond." milliseconds ";
                  }//End if condition
                }//End if condition
              }//End if condition
          }//End if condition
        }//End if condition
      }//End if condition
    }//Emnd if condition
    $res = ($prefix ? $prefix." ".$res : $res);
    $res = ($postfix ? $res.$postfix : $res);

    return $res;
    //return $dateTime;
  }//End if condition

  function timeDifference($time1,$time2){
    $dateTimeObject1 = date_create($time1); 
    $dateTimeObject2 = date_create($time2); 
    // Calculating the difference between DateTime objects
    $interval = date_diff($dateTimeObject1, $dateTimeObject2); 
    $res = array();
    $res['hour'] = $interval->h;
    $minutes = $interval->days * 24 * 60;
    $minutes += $interval->h * 60;
    $minutes += $interval->i;
    $res['min'] = $minutes;
    $res['sec'] = $minutes * 60;
    return $res;
  }//End function



  function set_date($inserted_date_and_time, $showTime = false){

    if(!$inserted_date_and_time){return false;}
    //return $inserted_date_and_time;
    //print_r($inserted_date_and_time);

    $data = array();
    if(gettype($inserted_date_and_time) == 'array'){
      $params = $inserted_date_and_time;
      $data['date']                 = $params['date'];
      $data['showTime']             = (@$params['showTime'] === 'undefined' ? true : (@$params['showTime'] === false ? false : true));
      $data['day_limit']            = (@$params['day_limit'] ? @$params['day_limit'] : 1);
      $data['format']               = (@$params['format'] ? @$params['format'] : 'M jS Y');
      $data['prefix']               = (@$params['prefix'] ? @$params['prefix'] : 'about');
      $data['postfix']              = (@$params['postfix'] ? $params['postfix'] : 'ago');
    }else{
      $data['date']                 = $inserted_date_and_time;
      $data['showTime']             = $showTime;
      $data['day_limit']            = 1;
      $data['format']               = 'M jS Y';
      $data['prefix']               = "about";
      $data['postfix']              = "ago";
    }//End if condition for gettype
    
    //print_r($data);
    //return false;

    //Getting days till now
    $today          = new DateTime('now');
    $givenDateTime  = new DateTime($data['date']);
    $difference     = $today->diff($givenDateTime);
    $days           = $difference->format('%d');

    if($days >= $data['day_limit']){
      #If time is allow then change date formate with time-------#
      $res = date($data['format'],strtotime($data['date']));
      if($data['showTime']){
        //Add time after
        $res .= " at ".date("H:m:s a",strtotime($data['date']));
      }//End if condition
      #----------------------------------------------------------#
      //$res = date($data['format'],strtotime($data['date']));
    }else{
      $res = dateDifference($data['date'],$data['prefix'],$data['postfix']);
    }//End if condition

    return $res;
    
  }//End function

  function dateFormat($date,$time = false,$format = 'M jS Y'){
    if($time){
      return date($format,strtotime($date)).", ".$time;
    }else{
      return date($format,strtotime($date));
    }//End if condition
  }//End function

  #Date Increment and Decrement
  function dateIncDecDays($date,$day = 1,$format = "Y-m-d"){
    $date = strtotime("+".$day." day", strtotime($date));
    return date($format, $date);
  }//End function
  
  #Date compare
  function dateOrTimeCpr($type,$comparableDate,$compareSign,$compareWithDate){
    // $format = ($type === 'date') ? 'Y-m-d' : 'h:i:s A';
    $format = (($type === 'date') ? 'Y-m-d' : (($type === 'time') ? 'h:i:s A' : 'Y-m-d h:i:s A'));
    $comparableDate  = strtotime(date($format, strtotime($comparableDate)));
    $compareWithDate = strtotime(date($format, strtotime($compareWithDate)));
    switch($compareSign) {
      case '===': return $comparableDate === $compareWithDate;break;
      case '==': return $comparableDate == $compareWithDate;break;
      case '>': return $comparableDate > $compareWithDate;break;
      case '<': return $comparableDate < $compareWithDate;break;
      case '>=': return $comparableDate >= $compareWithDate;break;
      case '<=': return $comparableDate <= $compareWithDate;break;
    }//End switch case
  }//End function
  
  #Date compare between
  function dateOrTimeCprBet($type,$comparableDate,$compareWithDateArr,$notEqual = false){
    // $format = ($type === 'date') ? 'Y-m-d' : 'h:i:s A';
    $format = (($type === 'date') ? 'Y-m-d' : (($type === 'time') ? 'h:i:s A' : 'Y-m-d h:i:s A'));
    $comparableDate  = strtotime(date($format, strtotime($comparableDate)));
    $compareWithDateArr[0] = strtotime(date($format, strtotime($compareWithDateArr[0])));
    $compareWithDateArr[1] = strtotime(date($format, strtotime($compareWithDateArr[1])));
    if($notEqual){
        return ($comparableDate > $compareWithDateArr[0] && $comparableDate < $compareWithDateArr[1]);
    }else{
        return ($comparableDate >= $compareWithDateArr[0] && $comparableDate <= $compareWithDateArr[1]);
    }//End if condition
  }//End function

  function twoDatesCprBet($comparableDateArr,$compareWithDateArr){
    $res1 = dateOrTimeCprBet('date', $comparableDateArr[0], $compareWithDateArr);
    if (@$comparableDateArr[1]) {
      $res2 = dateOrTimeCprBet('date', $comparableDateArr[1], $compareWithDateArr);
      $res = ($res1 or $res2) ? true : false;
    } else {
      $res = $res1;
    }//End if condition
    return $res;
  }//End function


  #Run SQL query like insert, update etc.
  function runQuery($query,$id = false){
    global $pdo;
    $pdo_res = executePDO($query);
    $res = array();
    if($pdo_res['errorMsg']){
      $res['status'] = false;
      $res['errorTitle'] = $pdo_res['errorTitle'];
      $res['errorMsg'] = $pdo_res['errorMsg'];
      $res['errorType'] = $pdo_res['errorType'];
      $res['errorNotifyType'] = $pdo_res['errorNotifyType'];
      $res['errorDuration'] = $pdo_res['errorDuration'];
    }else{
      $res['status'] = true;
      if($id){$res['id'] = $id;}else{$res['id'] = $pdo->lastInsertId();}
    }//End if condition
    return $res;
  }//End function

  #GET domain name from email (e.g. gmail, yahoo, etc)
  function getDomainFromEmail($email){
    $email_read_with = substr($email,strpos($email, '@')+1,strlen($email));//Getting from '@' to end
    $email_read_with = substr($email_read_with,0,strpos($email_read_with, '.'));//Getting from start to '.'
    return ucfirst($email_read_with);
  }//End function

  #Call internal php internal or external API(s)
  function callAPI($method = 'GET', $url, $data = false, $jsonDecode = false){
    //if($data){$data = json_encode($data);}
    $curl = curl_init();
    switch ($method){
      case "POST":
          curl_setopt($curl, CURLOPT_POST, 1);
          if($data){curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));}
          break;
      case "PUT":
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
          if($data){curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));}
          break;
      default:
          if($data){$url = sprintf("%s?%s", $url, http_build_query($data));}
    }//End switch
    // OPTIONS:
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array("cache-control: no-cache"));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    // EXECUTE:
    $result = curl_exec($curl);
    //$error = curl_error($curl);print_r($error);
    //$info = curl_getinfo($curl);print_r($info);
    if(!$result){die("Connection Failure");}
    curl_close($curl);
    if($jsonDecode){
      return json_decode($result,true);
    }else{
      return $result;
    }//End if condition
  }//End function

  #Redirect
  function redirect($url, $statusCode = 303){
    header('Location: ' . $url, true, $statusCode);
    die();
  }//End if condition

  function getCSVdata($fileWithPath,$csv_label = false){
    $rows = array_map('str_getcsv', file($fileWithPath));
    $rows = array_map('array_filter', $rows);//Remove empty elements in multidimensional array
    $rows = array_filter($rows);//Remove empty array in multidimensional array
    $res = array();
    if($rows[0][0] AND $rows[0][0] != ''){
      $data = array();
      if($csv_label){
        $header = array_shift($rows);
        foreach ($rows as $row) {$data[] = array_combine($header, $row);}
      }else{
        $data = $rows;
      }//End if condition
      $res['status'] = true;
      $res['data'] = $data;
    }else{
      $res['status'] = false;
      $res['errorTitle'] = 'GET Error';
      $res['errorMsg'] = 'CSV file is empty';
    }//End if condition for checking empty file
    return $res;
  }//End function

  function getCSVToArr($fileWithPath, $CSVLabel = false){
    $fp = fopen($fileWithPath, 'r');
    $csvArray = array();
    while ($row = fgetcsv($fp)) {$csvArray[] = $row;}
    fclose($fp);
    if($CSVLabel){
      $labels = array_shift($csvArray);
      foreach($csvArray as $key =>  $value){
        $newArr = array();
        foreach($value as $k => $v){$newArr[$labels[$k]] = $v;}//End foreach
        $csvArray[$key] = $newArr;
      }//End foreach
    }//End if condition
    return $csvArray;
  }//End function

  function insert_SQL_multiple_row($arr,$tableName,$skipArr = array(),$arrNewValuesArr = array()){
    $colNames = array();
    //print_r($skipArr);
    array_unshift($skipArr,'');
    //Getting columns
    $arr[0] = array_change_key_case($arr[0],CASE_LOWER);
    foreach($arr[0] as $key => $value){
      if(!array_search($key,$skipArr)){$colNames[] = $key;}
    }//End forech
    foreach($arrNewValuesArr as $key => $value){$colNames[] = $key;}//End forech
    $colNames = implode(",",$colNames);

    #Removing skip values from array if it's given ---#
    foreach($arr as $key => $subArr){
      foreach($skipArr as $value){unset($subArr[$value]);}
      $arr[$key] = $subArr;
    }//End foreach
    #-------------------------------------------------#

    #Add additional values in array if it's given ---#
    foreach($arr as $key => $subArr){$arr[$key] = array_merge($subArr,$arrNewValuesArr);}//End foreach
    #-------------------------------------------------#

    /*## If array length is more the 500 them split it
    Resone: MySQL has post limit as 1MB in order to increse we must have ssh access or cpanel
    and most of clients has shared hosting with no ssh access.*/
    if(sizeof($arr) > 500){
      $partialArray = array();
      $divideRate = 10;
      $dividePartial = ceil((sizeof($arr) / $divideRate));
      $partialResponse = array();
      
      $startIndex = -1;
      //$endIndex = 0;
      for($i=0; $i<$divideRate; $i++){
        //$endIndex = $endIndex + $dividePartial;
        //$partialArray[] = array_chunk($arr,$dividePartial);
        //echo ($startIndex+1)." to ".$dividePartial."-- | --";
        $partialArray[] = array_slice($arr, $startIndex+1,$dividePartial);
        if($startIndex == -1){$startIndex = $startIndex = 0;}
        $startIndex = ($startIndex + $dividePartial);
      }//End for loop
      
    //print_r($partialArray);

      foreach($partialArray as $pArr){
        $valuesArr = array();
        foreach($pArr as $key => $value){
          //Add quots in string for query
          foreach($value as $key => $subValue){$value[$key] = "'".str_replace("'", "",$subValue)."'";}//End foreach
          $valuesArr[] = "(".implode(",",$value).")";
        }//End foreach
        $valuesArr = implode(", ",$valuesArr);
        $sql_query = "INSERT INTO $tableName($colNames) VALUES$valuesArr";
        $partialResponse[] = runQuery($sql_query);
      }//End foreach

      $response = array('status' => true , 'partialResponse' => $partialResponse, 'size' => sizeof($arr),'successTitle' => 'Success', 'successMsg' => 'Data has been added successfully.', 'successNotify' => false, 'successNotifyType' => '', 'successDuration' => SUCCESS_DURATION);
      //print_r($partialArray);
    }else{
      $valuesArr = array();
      foreach($arr as $key => $value){
        //Add quots in string for query
        foreach($value as $key => $subValue){$value[$key] = "'".str_replace("'", "",$subValue)."'";}//End foreach
        $valuesArr[] = "(".implode(",",$value).")";
      }//End foreach
      $valuesArr = implode(", ",$valuesArr);
      $sql_query = "INSERT  INTO $tableName($colNames) VALUES$valuesArr";
      $response = runQuery($sql_query);
      $response['size'] = sizeof($arr);
    }//End if condition
    
    return $response;   

  }//End function

  function getHtmlFromURL($url,$statusCode = false){
    $c = curl_init($url);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
    //curl_setopt(... other options you want...)
    $html = curl_exec($c);
    if (curl_error($c)){die(curl_error($c));}
    // Get the status code
    $status = curl_getinfo($c, CURLINFO_HTTP_CODE);
    curl_close($c);
    
    if($statusCode){
      return array('html' => $html, 'status' => $status, 'successTitle' => 'Success', 'successMsg' => 'HTML has been fetched successfully.', 'successNotify' => false, 'successNotifyType' => '', 'successDuration' => SUCCESS_DURATION);
    }else{
      return $html;
    }//End if condition
  }//End function

  function createHtmlFileFromUrl($url,$path,$fileName,$fileType = 'html'){
    $html = getHtmlFromURL($url);
    if($html){
      $res = createFile($html,$path,$fileName,$fileType);
      $res['html'] = $html;
      return $res;
    }else{
      return array('status' => false, 'errorTitle' => 'Restricted URL', 'errorMsg' => 'This url dose not allow to use HTML', 'errorType' => '', 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION);
    }//End if condition
  }//End function

  function htmlToPlainText($html_or_HTML_file,$file = true){
    if($file){
      $data = file_get_contents($html_or_HTML_file);
    }else{
      $data = $html_or_HTML_file;
    }//End if condition

    #Getting just body tags (skip script or title tag etc)------#
    $dom = new DOMDocument;
    $nowDom = new DOMDocument;
    @$dom->loadHTML($data);
    $body = $dom->getElementsByTagName('body')->item(0);
    foreach ($body->childNodes as $child){
      $nowDom->appendChild($nowDom->importNode($child, true));
    }//End foreach
    $data = $nowDom->saveHTML();
    #-----------------------------------------------------------#

    $data = strip_tags($data);
    //$data = trim(preg_replace('/[ \t]+/', ' ', preg_replace('/[\r\n]+/', "\n", $data)));//Remove Indent space
    //$data = trim(preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $data));//Remove Extra line break (Empty line break)
    //$data = trim(preg_replace("/[\r]{2,}|[\n]{2}/", "\n", $data));
    $data = trim(preg_replace("/(^[\r]{2,}|[\n]{2})/", "\n", $data));
    $data = trim(preg_replace("/\n\r+/", " ", $data));//Replace one or multiple new lines with one space:
    $data = trim(preg_replace('/\t+/', ' ', $data));//Replace one or multiple tabs with one space:

    return $data;
  }//End function

  function createFile($content,$path,$fileName,$fileType){
    if($fileName){
      if($fp = fopen($path.$fileName.".".$fileType,"wb")){
        fwrite($fp,$content);
        fclose($fp);
        $res = array('status' => true, 'successTitle' => 'Success', 'successMsg' => 'File has been created successfully.', 'successNotify' => false, 'successNotifyType' => '', 'successDuration' => SUCCESS_DURATION, 'fileName' => $fileName.".".$fileType);
      }else{
        $res = array('status' => false, 'errorTitle' => 'Error', 'errorMsg' => 'File could not created', 'errorType' => '', 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION);
      }//End if condition
    }else{
      $res = array('status' => false, 'errorTitle' => 'Error', 'errorMsg' => 'Please provide file name', 'errorType' => '', 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION);
    }//End if condition
    return $res;
  }//End function

  function get_single_array_form_multidimensional_array_by_key($arr,$key){
    $res = array();
    if(gettype($key) === 'array'){
      foreach($arr as $value){
        foreach($key as $k => $vl){$res[$vl][] = $value[$vl];}
      }//End foreach
    }else{
      foreach($arr as $value){$res[] = $value[$key];}
    }//End if condition
    return $res;
  }//End function

  function search_array_in_multidimensional($arr,$key,$value){
    return array_search($value, array_column($arr, $key));
  }//End function

  function sort_multidimensional_array_by_key($arr,$key){
    $columns = array_column($arr, $key);
    array_multisort($columns, SORT_ASC, $arr);
    return $arr;
  }

  function array_unique_multidimensional($arr){
    return array_values(array_map("unserialize", array_unique(array_map("serialize", $arr))));
  }//End function

  function array_unique_multidimensional_by_key($arr, $key) { 
    $tempArr = array_unique(array_column($arr,$key));
    $tempArr = array_intersect_key($arr, $tempArr);
    return array_values($tempArr);
  }//End function

  function multidimensional_array_to_single_array_by_key($arr,$key){
    return array_column($arr, $key);
  }//End function
  
  function remove_same_index_from_multidimensional($arr,$index_array_to_remove){
    return array_map(function($data) use ($index_array_to_remove) {
      foreach($index_array_to_remove as $value){unset($data[trim($value)]);}//End function
      return $data;
    },$arr);
  }//End function

  function multidimensional_array_sum_by_key($arr,$key){
    $sum = 0;
    foreach ($arr as $item) {$sum += $item[$key];}
    return $sum;
  }//End function

  function array_duplicate_count_by_key($arr,$key){
    return array_count_values(array_column($arr,$key));
  }//End function

  function remove_element_from_array_by_values($arr,$values){
    $values = explode(',',$values);
    return array_values(array_diff($arr, $values));
  }//End fucntion

  function duplicateDBRow($tableName,$id,$skipCols,$updateCols = null){
    $res =  fetchDataFromDB("SELECT * FROM $tableName WHERE id = '$id'");
    unset($res['data'][0]['key']);//Remove 'key' index provided by fetchDataFromDB;
    $keys = null;
    foreach($res['data'][0] as $key => $value){
      if($key == array_search($key,$skipCols)){continue;}//if it's found any skiped value then skip this route
      $keys .= '`'.$key.'`,';
    }//End foreach
    $keys = substr($keys,0,strlen($keys)-1);
    //return $keys;

    $res = runQuery("INSERT INTO $tableName ($keys) SELECT $keys FROM $tableName WHERE id = '$id'");
    if($updateCols){
      if($res['status']){
        $updateCol = "";
        foreach($updateCols as $key => $value){$updateCol .= "`".$key."` = '".$value."', ";}//End foreach
        $updateCol = substr($updateCol,0,strlen($updateCol)-2);
        $id = $res['id'];
        $res = runQuery("UPDATE $tableName SET $updateCol WHERE id = '$id'",$id);
      }//End if condition
    }//End if condition
    return $res;
  }//End function

  function encrypt_decrypt($action, $string,$ENCRYPTION_KEY = 'id_as_key',$secret_iv = 'secret_key'){
      $output = false;
      $encrypt_method = "AES-256-CBC";
      $secret_key = $ENCRYPTION_KEY;
      //$secret_iv = 'This is my secret iv';
      // hash
      $key = hash('sha256', $secret_key);

      // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
      $iv = substr(hash('sha256', $secret_iv), 0, 16);
      if ( $action == 'encrypt' ) {
          $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
          $output = base64_encode($output);
      }else if( $action == 'decrypt' ){
          $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
      }
      return $output;
  }//End function

  function findInMultidimensionalArray($key,$value,$arr,$strict = false){
    foreach ($arr as $item) {
      if(($strict ? $item[$key] === $value : $item[$key] == $value)){
        return true;
      }//end if condition
    }//End foreach
    return false;
  }//end function

  function sortDate($arr){
    usort($arr, function ($a, $b) {return strtotime($a) - strtotime($b);});
    return $arr;
  }//end function

  function dateByDays($startDate,$days = false,$format = 'Y-m-d',$endData = false){
    if(!$days){
      $date1 = date_create($startDate);
      $date2 = date_create($endData);
      $daysCount = date_diff($date1,$date2);
      $days = $daysCount->format("%a");
    }//End if condition

    $resData = array();
    $resData[] = date($format,strtotime($startDate));
    $curData = $startDate;
    for($i=0;$i<$days;$i++){
      $date = strtotime("+1 day", strtotime($curData));
      $curData = date($format, $date);
      $resData[] = $curData;
    }//End for loop

    return $resData;
  }//End Function

  function ip_info($ip = NULL, $purpose = "location") {
    $errorMsg = "Please provide valid IP address or set keyword as 'visitor' for visitor IP";
    if(!isset($ip)){return $errorMsg;}
    if($ip == 'visitor'){$ip = getUserRealIP();}//End if condition
    if(!filter_var($ip, FILTER_VALIDATE_IP)){return $errorMsg;}//End if condition

    $output     = NULL;
    $purpose    = str_replace(array("name", "\n", "\t", " ", "-", "_"), NULL, strtolower(trim($purpose)));
    $support    = array("country", "countrycode", "state", "region", "suburb", "location", "address");
    $continents = array(
        "AF" => "Africa",
        "AN" => "Antarctica",
        "AS" => "Asia",
        "EU" => "Europe",
        "OC" => "Australia (Oceania)",
        "NA" => "North America",
        "SA" => "South America"
    );
    if(filter_var($ip, FILTER_VALIDATE_IP) && in_array($purpose, $support)){
        //$ipdat = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=" . $ip));
        $ipdat = callAPI("GET","http://www.geoplugin.net/json.gp?ip=".$ip,false,true);//API response with josn_decode()
        //echo "<pre>";print_r($ipdat);echo "</pre>";
        //return false;
        if (strlen(trim($ipdat['geoplugin_countryCode'])) == 2) {
            switch ($purpose) {
                case "location":
                    $output = array(
                        "city"           => @$ipdat['geoplugin_city'],
                        "state"          => @$ipdat['geoplugin_regionName'],
                        "country"        => @$ipdat['geoplugin_countryName'],
                        "country_code"   => @$ipdat['geoplugin_countryCode'],
                        "continent"      => @$continents[strtoupper($ipdat['geoplugin_continentCode'])],
                        "latitude"       => @$ipdat['geoplugin_latitude'],
                        "longitude"      => @$ipdat['geoplugin_longitude'],
                        "continent_code" => @$ipdat['geoplugin_continentCode'],
                        "ip_address"     => $ip
                    );
                    break;
                case "address":
                    $address = array($ipdat['geoplugin_countryName']);
                    if (strlen($ipdat['geoplugin_regionName']) >= 1)
                        $address[] = $ipdat['geoplugin_regionName'];
                    if (strlen($ipdat['geoplugin_city']) >= 1)
                        $address[] = $ipdat['geoplugin_city'];
                    $output = implode(", ", array_reverse($address));
                    break;
                case "city":
                    $output = $ipdat['geoplugin_city'];
                    break;
                case "state":
                    $output = $ipdat['geoplugin_regionName'];
                    break;
                case "region":
                    $output = $ipdat['geoplugin_regionName'];
                    break;
                case "country":
                    $output = $ipdat['geoplugin_countryName'];
                    break;
                case "countrycode":
                    $output = $ipdat['geoplugin_countryCode'];
                    break;
            }
        }
    }
    return $output;
  }//End function

  function getUserRealIP(){
      // Get real visitor IP behind CloudFlare network
      if(isset($_SERVER["HTTP_CF_CONNECTING_IP"])){
        $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
        $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
      }//End if condition
      $client  = @$_SERVER['HTTP_CLIENT_IP'];
      $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
      $remote  = $_SERVER['REMOTE_ADDR'];

      if(filter_var($client, FILTER_VALIDATE_IP)){
          $ip = $client;
      }elseif(filter_var($forward, FILTER_VALIDATE_IP)){
          $ip = $forward;
      }else{
          $ip = $remote;
      }//End if condition
      return $ip;
  }//End function


  #Number to letter
  function numberToLetter($number,$uppercase = false){
    $numberToArray = array_map('strval', str_split($number));
    $res = "";
    $letters = array_combine(range(0,9), range('q', 'z'));
    foreach($numberToArray as $value){
      if(preg_match('~[0-9]+~',$value)){
        $res .= $letters[$value];
      }else{
        $res .= $value;
      }//End if condition
      ///$res .= chr(64+$value);
    }//End foreach
    if(!$uppercase){$res = strtolower($res);}//End if condition
    return $res;
  }//End function

  #Letter to Number
  function letterToNumber($letter){
    $letterToArray = array_map('strval', str_split($letter));
    $res = "";
    $alphabet = array_combine(range('q', 'z'), range(0,9));
    foreach($letterToArray as $value){
      if(preg_match('~[a-zA-Z]+~',$value)){
        $res .= $alphabet[$value];
      }else{
        $res .= $value;
      }//End if condition
      //$res .= ord($value);
    }//End foreach
    return $res;
  }//End function

  #Email (PHP Mailer)
  // function emailPHPMailer($senderArr,$receiverArr,$content,$SMTPArray = false,$attachment = false,$addCC = array(),$addBCC = array()){
  //   $res = array();
  //   if(!@$receiverArr[0]['email']){
  //     $res['status'] = false;
  //     $res['errorTitle'] = "Invalid Email";
  //     $res['errorMsg'] = "Email is not available";
  //     $res['errorType'] = "";
  //     $res['errorNotifyType'] = "notify";
  //     $res['errorDuration'] = ERROR_DURATION;
  //   }//End if condition
    
  //   $mail = new PHPMailer(true);
  //   $mail->CharSet = 'UTF-8';
  //   $mail->IsHTML(true);
  //   if($SMTPArray){
  //     $mail->IsSMTP();                                      // set mailer to use SMTP
  //     $mail->Host = $SMTPArray['host'];  // specify main and backup server
  //     $mail->SMTPDebug = 0; 
  //     $mail->SMTPAuth = true;     // turn on SMTP authentication
  //     $mail->Username = $SMTPArray['username'];  // SMTP username
  //     $mail->Password = $SMTPArray['password']; // SMTP password
  //     //If SMTP requires TLS encryption then set it
  //     if(@$SMTPArray['SMTPSecure']){$mail->SMTPSecure = $SMTPArray['SMTPSecure'];}//End if condition
  //     //Set TCP port to connect to 
  //     if(@$SMTPArray['port']){$mail->Port = $SMTPArray['port'];}//End if condition
  //   }//End if condition

  //   $mail->setFrom($senderArr['email'],$senderArr['name'],false);
  //   $mail->addReplyTo($senderArr['email'],$senderArr['name'],false);
  //   #Add Receiver
  //   foreach($receiverArr as $value){
  //     if($value['name']){
  //       $mail->addAddress($value['email'], $value['name']);
  //     }else{
  //       $mail->addAddress($value['email']);
  //     }//End if condition
  //   }//End foreach
  //   #Add CC
  //   foreach($addCC as $value){
  //     if($value['name']){
  //       $mail->addCC($value['email'], $value['name']);
  //     }else{
  //       $mail->addCC($value['email']);
  //     }//End if condition
  //   }//End foreach
  //   #Add BCC
  //   foreach($addBCC as $value){
  //     if($value['name']){
  //       $mail->addBCC($value['email'], $value['name']);
  //     }else{
  //       $mail->addBCC($value['email']);
  //     }//End if condition
  //   }//End foreach

  //   //Provide file path and name of the attachments
  //   if($attachment){
  //     foreach($attachment as $value){
  //       if($value['name']){
  //         $mail->addAttachment($value['path'], $value['name']);
  //       }else{
  //         $mail->addAttachment($value['path']);
  //       }//End if condition
  //     }//End foreach
  //   }//End foreach

  //   $mail->Subject = $content['subject'];
  //   //$mail->Body = $content['body'];
  //   $mail->MsgHTML($content['body']);
  //   if($content['plaintext']){$mail->AltBody = $content['plaintext'];}
    
  //   try{
  //     $mail->send();
  //     $res['status'] = true;
  //     $res['successTitle'] = 'Sent';
  //     $res['successMsg'] = 'Message has been sent successfully';
  //     $res['successNotify'] = false;
  //     $res['successNotifyType'] = '';
  //     $res['successDuration'] = SUCCESS_DURATION;
  //   }catch(Exception  $e){
  //     $res['status'] = false;
  //     $res['errorTitle'] = 'Email Sending Error';
  //     $res['errorMsg'] = $mail->ErrorInfo;
  //     $res['errorType'] = "";
  //     $res['errorNotifyType'] = "notify";
  //     $res['errorDuration'] = ERROR_DURATION;
  //     // $res['var_dump'] = var_dump($mail);
  //   }//End if condition
  //   $mail->ClearAllRecipients();
    
  //   return $res;
  // }//End function

  function emailPHPMailer($senderArr,$receiverArr,$content,$SMTPArray = false,$attachment = false,$addCC = array(),$addBCC = array()){
    //@Required a phpMailer file with custom-configuration
    include '../plugins/PHPMailer_v6.8.0/vendor/autoload-config.php'; //library added in download source

    $res = array();
    if(!@$receiverArr[0]['email']){
      $res['status'] = false;
      $res['errorTitle'] = "Invalid Email";
      $res['errorMsg'] = "Email is not available";
      $res['errorType'] = "";
      $res['errorNotifyType'] = "notify";
      $res['errorDuration'] = ERROR_DURATION;
      return false;
    }//End if condition
    
    $mail = new $PHPMailer(true);
    // print_rp($mail);
    $mail->CharSet = 'UTF-8';
    $mail->IsHTML(true);
    if($SMTPArray){
      $mail->IsSMTP();                                      // set mailer to use SMTP
      $mail->Host = $SMTPArray['host'];  // specify main and backup server
      $mail->SMTPDebug = 0; 
      $mail->SMTPAuth = true;     // turn on SMTP authentication
      $mail->Username = $SMTPArray['username'];  // SMTP username
      $mail->Password = $SMTPArray['password']; // SMTP password
      //If SMTP requires TLS encryption then set it
      if(@$SMTPArray['SMTPSecure']){$mail->SMTPSecure = $SMTPArray['SMTPSecure'];}//End if condition
      //Set TCP port to connect to 
      if(@$SMTPArray['port']){$mail->Port = $SMTPArray['port'];}//End if condition
    }//End if condition

    $mail->setFrom($senderArr['email'],$senderArr['name'],false);
    $mail->addReplyTo(
      @$senderArr['reply-to-email'] ? $senderArr['reply-to-email'] : $senderArr['email'],
      @$senderArr['reply-to-name'] ? $senderArr['reply-to-name'] : $senderArr['name'],false);
    #Add Receiver
    foreach($receiverArr as $value){
      if(@$value['name']){
        $mail->addAddress($value['email'], $value['name']);
      }else{
        $mail->addAddress($value['email']);
      }//End if condition
    }//End foreach
    #Add CC
    foreach($addCC as $value){
      if(@$value['name']){
        $mail->addCC($value['email'], $value['name']);
      }else{
        $mail->addCC($value['email']);
      }//End if condition
    }//End foreach
    #Add BCC
    foreach($addBCC as $value){
      if($value['name']){
        $mail->addBCC($value['email'], $value['name']);
      }else{
        $mail->addBCC($value['email']);
      }//End if condition
    }//End foreach

    //Provide file path and name of the attachments
    if($attachment){
      foreach($attachment as $value){
        if($value['name']){
          $mail->addAttachment($value['path'], $value['name']);
        }else{
          $mail->addAttachment($value['path']);
        }//End if condition
      }//End foreach
    }//End foreach

    $mail->Subject = $content['subject'];
    //$mail->Body = $content['body'];
    $mail->MsgHTML($content['body']);
    if($content['plaintext']){$mail->AltBody = $content['plaintext'];}

    try{
      $mail->send();
      $res['status'] = true;
      $res['successTitle'] = 'Sent';
      $res['successMsg'] = 'Message has been sent successfully';
      $res['successNotify'] = false;
      $res['successNotifyType'] = '';
      $res['successDuration'] = SUCCESS_DURATION;
    }catch(Exception $e){
      $res['status'] = false;
      $res['errorTitle'] = 'Email Sending Error';
      $res['errorMsg'] = $e->getMessage();
      $res['errorType'] = "";
      $res['errorNotifyType'] = "notify";
      $res['errorDuration'] = ERROR_DURATION;
      // $res['var_dump'] = var_dump($mail);

      //Type of Error reporting
      // $mail->ErrorInfo;
      // $e->errorMessage();
      // $e->getMessage();

    }//End if condition
    $mail->ClearAllRecipients();
    
    return $res;
  }//End function
  
  function checkDataFromDB($sql_query){
    $data = fetchDataFromDB($sql_query);
    $res = array();
    if($data['status']){
      if(!(sizeof($data['data']) >= 1)){
        $data['status'] = false;
        $data['errorTitle'] = 'Not Available';
        $data['errorMsg'] = 'No record found';
        $data['errorType'] = "";
        $data['errorNotifyType'] = 'notify';
        $data['errorDuration'] = ERROR_DURATION;
      }//End if condition
    }//End if condition
    return $data;
  }//End function

  function dbQuery($sql_query,$handles = array(),$tableName = '',$skipCols = '',$whereCondition = ''){
    $res = array();
    $sql_query = trim($sql_query);
    //Get SELECT keyword
    $typeSelect = substr($sql_query,0,6);
    if($typeSelect == 'SELECT' || $typeSelect == 'select'){
      
      if(array_key_exists("reverse", $handles)){$reverse = @$handles['reverse'];}else{$reverse = false;}//End if condition
      if(array_key_exists("dateFormat", $handles)){$dateFormat = @$handles['dateFormat'];}else{$dateFormat = false;}//End if condition
      if(array_key_exists("noRecordMsg", $handles)){$noRecordMsg = @$handles['noRecordMsg'];}else{$noRecordMsg = false;}//End if condition
      if(array_key_exists("indexAsId", $handles)){$indexAsId = @$handles['indexAsId'];}else{$indexAsId = false;}//End if condition

      $res = fetchDataFromDB($sql_query,$reverse,$dateFormat,$noRecordMsg,$indexAsId);

    }elseif($sql_query == 'post'){

      //Set local Date time for insert or updated date
      date_default_timezone_set("Asia/Karachi");
      $server_date = date('Y-m-d');
      $server_time = date('h:i:s A');
      $insert_update_by = @$_SESSION['user_id'];
      #------------------------------------------------#

      if(@$handles['id'] && @$handles['id'] != 'null'){
        $action = 'update';
        $id = $handles['id'];
        if(!$whereCondition){$whereCondition = "id = '$id'";}//End if condition
        $handles['updated_date'] = $server_date;
        $handles['updated_time'] = $server_time;
        $handles['updated_by'] = $insert_update_by;
      }else{
        $action = 'insert';
        $id = false;
        unset($handles['id']);//If empty id var is available then remove it from array
        $whereCondition = '';
        $handles['inserted_date'] = $server_date;
        $handles['inserted_time'] = $server_time;
        $handles['inserted_by'] = $insert_update_by;
      }//End if condition
      
      if($skipCols){
        $skipArray = explode(",",$skipCols);
      }else{
        $skipArray = array();
      }//End if condition

      $res = create_SQL_query_by_array($handles,$tableName,$action,$skipArray,$whereCondition,true,$id);
    
    }else{
      if($handles){$id = $handles;}else{$id = false;}//End if condition
      $res = runQuery($sql_query,$id);
    }//End if condition
    return $res;
  }//End function

  function arrayToCSV($arr,$path,$fileName){
    if($fileName){
      if($fp = fopen($path.$fileName.'.csv', 'w')){
        foreach ($arr as $fields) {fputcsv($fp, $fields);}
        fclose($fp);
        $res = array('status' => true, 'successTitle' => 'Success', 'successMsg' => 'CSV has been created successfully.', 'successNotify' => false, 'successNotifyType' => '', 'successDuration' => SUCCESS_DURATION, 'fileName' => $fileName.".csv");
      }else{
        $res = array('status' => false, 'errorTitle' => 'Error', 'errorMsg' => 'File could not created', 'errorType' => '', 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION);
      }//End if condition
    }else{
      $res = array('status' => false, 'errorTitle' => 'Error', 'errorMsg' => 'Please provide file name', 'errorType' => '', 'errorNotifyType' => 'notify', 'errorDuration' => ERROR_DURATION);
    }//End if condition
    return $res;
  }//End function

  function commaSeparatedStrToArray($commaSeparatedStr){
    $res = trim($commaSeparatedStr);
    //Convert into single dimensional array
    $res = explode("\n",$res);
    //Convert into multi dimensional array
    foreach($res as $key => $value){
      $value = explode(",",$value);
      //Set inner values
      foreach($value as $keyInner => $valueInner){
        $valueInner = trim($valueInner);
        if($valueInner == ""){unset($value[$keyInner]);}else{$value[$keyInner] = trim($valueInner);}//End if condition
      }//End foreach inner
      $value = array_values($value);//Reset indes
      if(sizeof($value) >= 1){$res[$key] = $value;}else{unset($res[$key]);}//End if condition
    }//End foreach
    $res = array_values($res);//Reset indes
    return $res;
  }//End function

  function commaSeparatedStrToCSV($commaSeparatedStr,$path,$fileName){
    $arr = commaSeparatedStrToArray($commaSeparatedStr);
    $res = arrayToCSV($arr,$path,$fileName);
    $res['data'] = $arr;
    return $res;
  }//End function
  
  #Delete files from directory (NOT GIVE ANY RESPONSE)
  function deleteFilesFromDir($dirPath,$fileArrayToDelete = array(),$fileNamePrefix = false){
    $files = scandir($dirPath);
    foreach($files as $value){
      if($fileNamePrefix){
        $pCount = strlen($fileNamePrefix);
        $prefixMatch = substr($value,0,$pCount);
        if($prefixMatch == $fileNamePrefix){
          unlink($dirPath.$value);
        }//End if condition
      }//End if condition
      if(sizeof($fileArrayToDelete) > 0){
        array_unshift($fileArrayToDelete,"");//For ignoring 0 index (push empty value at start)
        if(array_search($value,$fileArrayToDelete)){
          unlink($dirPath.$value);
        }//End if condition
      }//End if condition
    }//End foreach
  }//End function

  #Cron Job Functions
  // function setCronJob($serverHitURL,$cronJobName,$strDateTime,$db_update_id,$tableName,$successMsg = false){
  //   global $cronJobToken;
  //   $post_data = array(
  //       'token' => $cronJobToken,
  //       'url' => $serverHitURL,
  //       'expression' => scheduleDateToCronFormat($strDateTime),
  //       'timezone' => scheduleDateToCronFormat($strDateTime,true),//true means just get time zone
  //       'name' => $cronJobName
  //   );
  //   $res = callAPI("POST","https://www.setcronjob.com/api/cron.add",$post_data,true);

  //   if($res['status'] == 'success'){
  //     $res['status'] = true;
  //     $res['id'] = $res['data']['id'];
  //     $res['api_response'] = $res['data'];
  //     $res['successNotify'] = true;
  //     $res['successNotifyType'] = 'notify';
  //     $res['successTitle'] = 'Success';
  //     if($successMsg){
  //       $res['successMsg'] = 'Cron job has been set';
  //     }else{
  //       $res['successMsg'] = $successMsg;
  //     }//End if condition      
  //     //Update cronjob id in db
  //     $updateArr = array('id' => $db_update_id, 'cronJob_id' => $res['id'], 'cronJob_status' => 'active');
  //     $res['db_update_response'] = dbQuery('post',$updateArr,$tableName);
  //     unset($res['data']);
  //   }else{
  //     $res['status'] = false;
  //     $res['errorTitle'] = 'Error';
  //     $res['errorMsg'] = "Could not set schedule, (".$res['message'].")";
  //   }//End if condition

  //   return $res;
  // }//End function

  #Status could be ('disable','enable','delete','run','logs','failures')
  // function setCronJobStatus($status,$cronJobId,$db_update_id,$tableName,$successMsg = false){
  //   global $cronJobToken;
  //   $post_data = array(
  //     'token' => $cronJobToken,
  //     'id' => $cronJobId
  //   );
  //   $res = callAPI("POST","https://www.setcronjob.com/api/cron.".$status,$post_data,true);

  //   if($res['status'] == 'success'){
  //     $res['status'] = true;
  //     $res['api_response'] = $res['data'];
  //     $res['successNotify'] = true;
  //     $res['successNotifyType'] = 'notify';
  //     $res['successTitle'] = 'Success';
  //     if($successMsg){
  //       $res['successMsg'] = 'Cron job has been '.$status;
  //     }else{
  //       $res['successMsg'] = $successMsg;
  //     }//End if condition
  //     //Update cronjob id in db
  //     $updateArr = array('id' => $db_update_id, 'cronJob_status' => 'disable');
  //     $res['db_update_response'] = dbQuery('post',$updateArr,$tableName);
  //     unset($res['data']);
  //   }else{
  //     $res['status'] = false;
  //     $res['errorTitle'] = 'Error';
  //     $res['errorMsg'] = "Could not set schedule, (".$res['message'].")";
  //   }//End if condition

  //   return $res;
  // }//End function

  // function scheduleDateToCronFormat($strDateTime,$justTimeZone = false){
  //   parse_str($strDateTime,$d);
    
  //   $year = $d['date']['year'];
  //   $month = $d['date']['month'];
  //   $day = $d['date']['day'];

  //   $hour = (int) $d['time']['hour'];
  //   $min = (int) $d['time']['min'];
  //   $second = '0';
  //   $timeZone = $d['time']['timeZone'];
  //   $ampm = $d['time']['ampm'];

  //   if($ampm == 'pm'){$hour = $hour + 12;}
  //   if($ampm == 'am' && $hour == '12'){$hour = 0;}

  //   $weekDay = date("w", strtotime($year."-".$month."-".$day));
  //   if($weekDay == '0'){$weekDay = 7;}

  //   if($justTimeZone){
  //       return $timeZone;
  //   }else{
  //       return $min." ".$hour." ".$day." ".$month." ".$weekDay." ".$second." ".$year;
  //   }//End if condition
  // }//End function

  function bulk_response($res){
    $errorArr = array();
    $errorMsg = "";
    $i = 1;
    foreach($res as $rs){
      if(!$rs['status']){
        $errorArr[] = $rs['errorMsg'];
        $errorMsg .= ($i++)."- ".$rs['errorMsg'].", ";
      }//End if condition
    }//End foreach
    if(sizeof($errorArr) > 0){

      $response = array();
      $errorMsg = sizeof($errorArr)." record(s) has error out of ".sizeof($res)." records. ".$errorMsg;
      //If there is any success status then return true otherwise false
      if(sizeof($errorArr) == sizeof($res)){
        $response['status'] = false;
        $response['errorMsg'] = $errorMsg;
      }else{
        $response['status'] = true;
        $response['successNotify'] = true;
        $response['successTitle'] = 'Success';
        $response['successMsg'] = $errorMsg;
        $response['successNotifyType'] = 'notify';
      }//End if condition
      
    }else{
      $response = $res[0];
    }//End if condition
    return $response;
  }//End function

  function nullToEmpty($variable,$value = ''){
    if($variable == null){$variable = $value;}
    return $variable;
  }//End function

  function split_name($name) {
    $name = trim($name);
    $last_name = (strpos($name, ' ') === false) ? '' : preg_replace('#.*\s([\w-]*)$#', '$1', $name);
    $first_name = trim( preg_replace('#'.$last_name.'#', '', $name ) );
    return array($first_name, $last_name);
  }//End function

  function name_slug($name){
    $name = trim($name);
    if(!$name){return false;}
    $slugWords = explode(" ", $name);
    $slug = "";
    foreach ($slugWords as $w) {$slug .= @ucfirst($w[0]);}
    return $slug;
  }//End function

  function multiFieldsJsonSeparate($json,$dateCol = false,$separator = ','){
    $data = json_decode($json,true);
    $res = array();
    #if it has nested array then separate this
    if(@$data['nested']){
      $nested = $data['nested'];
      unset($data['nested']);
    }//End if condition

    //Set Date format if date field is available
    if($dateCol){
      foreach($data as $key => $value){
        if (strpos($key, $dateCol) !== false) {
          foreach($data[$key] as $ky => $vl){$data[$key][$ky] = date('d-m-Y', strtotime($vl));}
        }//End if condition
      }//End foreach
      if(@$nested){
        foreach($nested as $key => $value){
          foreach($value as $ky => $vl){
            if (strpos($ky, $dateCol) !== false) {
              foreach($nested[$key][$ky] as $k => $v){$nested[$key][$ky][$k] = date('d-m-Y', strtotime($v));}
            }//End if condition
          }////End foreach
        }//End foreach
      }//End if condition
    }//End if condition

    foreach($data as $key => $value){$res[$key] = implode($separator,$value);}//End foreach
    if(@$nested){
        $nestedArr = array();
        foreach($nested as $key => $value){
          foreach($value as $ky => $vl){
              #substr($ky, 0, -1) - Removing fiend number from last
              $n = substr($ky, 0, -1);
              $nestedArr[$n] = @$nestedArr[$n].implode($separator,$vl).(($key < sizeof($value)) ? '(%)' : '');
          }//End foreach
        }//End foreach
        $res['nested'] = $nestedArr;
        $data['nested'] = $nested;
    }//End if condition

    
    $res['json'] = json_encode($data);
    return $res; 
  }//End function

  function JSONSeparateWithIndex($json,$skipArray = array()){
    $data['json_decode'] = json_decode($json,true);
    $jsonRes = array();
    $res = array();
    foreach($data['json_decode'] as $kp => $value){
      foreach($value as $key => $vl){
        if(!in_array($key,$skipArray)){
          $res[$key][] = $vl;
          $jsonRes[$kp][$key] = $vl;
        }//End if condition
      }//End foreach
      $data['json_decode'][$kp] = $jsonRes[$kp];
    }//End foreach
    $res['json'] = json_encode($data['json_decode']);
    return $res;
  }//End function

  function createPDF($pathToFolder,$fileName,$html,$header = false,$footer = false,$oriantation = false){
    $fileName = strtolower(str_replace(" ","-",$fileName.".pdf"));
    //Directory does not exist, so lets create it.
    makedirs($pathToFolder);
    $file = $pathToFolder."/".$fileName;
    $mpdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => 'A4',
        'setAutoTopMargin' => 'stretch',
        'setAutoBottomMargin' => 'false',
        'orientation' => $oriantation ? $oriantation : 'P'//Expected 'L' - Landscape 'P' - Portrait 
    ]);
    $mpdf->SetDisplayMode('fullpage');
    if($header){$mpdf->SetHTMLHeader($header);}
    if(!$footer){$footer = "<p></p>";}
    $mpdf->SetHTMLFooter($footer);
    $mpdf->WriteHTML($html);
    $mpdf->Output($file);
    
    return array('status' => true, 'fileName' => $fileName);

  }//End function

  function htmlTableToCSV($html,$fileName,$filePath){
      
    $html = str_replace('&nbsp;','',$html);    
    $xml = new DOMDocument();
    $xml->loadHTML($html);
    $html = $xml;
    header('Content-type: application/ms-excel');
    header('Content-Disposition: attachment; filename='.$fileName.'.csv');

    #if folder is not exists then create it
    if(!file_exists($filePath)) {mkdir($filePath);}

    $fp = @fopen($filePath.DIRECTORY_SEPARATOR.$fileName.'.csv', 'w');
    if($fp != false){
      foreach($html->getElementsByTagName('tr') as $element){
        $th = array();
        foreach( $element->getElementsByTagName('th') as $row){$th [] = $row->nodeValue;}
        $td = array();
        foreach( $element->getElementsByTagName('td') as $row){$td [] = $row->nodeValue;}
        !empty($th) ? fputcsv($fp, $th) : fputcsv($fp, $td);
      }//End foreach
      fclose($fp); 
      return array('status' => true, 'fileName' => $fileName.'.csv');
    }else{
      return array('status' => false, 'errorMsg' => 'File could not created', 'fileName' => '');
    }//End if condition
  }//End function

  function print_rp($arr){
    echo "<pre>";print_r($arr);echo "</pre>";
  }

  function AccessControl($permission_id){
    $permission_ids_list = $_SESSION['permission_ids_list'];
    if($permission_ids_list == 'all'){return true;}
    $permission_ids_list = explode(',',$permission_ids_list);
    // print_rp($permission_ids_list);
    // echo $permission_ids_list;
    if (in_array($permission_id, $permission_ids_list)){
      return true;
    }else{
      return false;
    }//End if condition
  }//End function

  function base64_to_image($base64_code,$folder_path,$file_name){
    $image_parts = explode(";base64,", $base64_code);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);
    $file = $folder_path.$file_name;
    makedirs($file,true);//Create directory(s) if not available
    $k = file_put_contents($file, $image_base64);
    if($k){
      return true;
    }else{
      return false;
    }//End if condition
  }//End function

  function exportDBBackup($fileNameWithPath,$skipTables = ''){
    $queryPostfix = '(%)';
    $tables = array();
    $result = executePDO("SHOW TABLES");
    while($row = $result['data']->fetch(PDO::FETCH_NUM)){$tables[] = $row[0];}//End while loop
    $tables = remove_element_from_array_by_values($tables,$skipTables);
    
    $return = '';
    foreach($tables as $table){
      $result = executePDO("SELECT * FROM ".$table);
      $num_fields = $result['data']->columnCount();
      $return .= 'DROP TABLE '.$table.';'.$queryPostfix;
      $sh = executePDO("SHOW CREATE TABLE ".$table);
      $row2 = $sh['data']->fetch(PDO::FETCH_NUM);
      $return .= "\n\n".$row2[1].";$queryPostfix\n\n";
      
      for($i=0;$i<$num_fields;$i++){
        while($row = $result['data']->fetch(PDO::FETCH_NUM)){
          $return .= "INSERT INTO ".$table." VALUES(";
          for($j=0;$j<$num_fields;$j++){
            if(@is_null($row[$j])){
              $return .= 'NULL';
            }else if(isset($row[$j])){ 
              $row[$j] = @addslashes($row[$j]);
              $return .= '"'.$row[$j].'"';
            }else{ 
              $return .= '""';
            }//End if condition
            if($j<$num_fields-1){ $return .= ',';}
          }//End for loop
          $return .= ");$queryPostfix\n";
        }//End while loop
      }//End for loop
      $return .= "\n\n\n";
    }//End foreach
    
    #Calculate file size in KB before gz compression
    $fileSizeInKB = (mb_strlen($return, '8bit')/1024);
    
    $res = array();
    if($fileSizeInKB > 1){
      makedirs($fileNameWithPath,true);//Create directory(s) if not available
      $fp = gzopen ($fileNameWithPath, 'w9');// Open the gz file (w9 is the highest compression)
      gzwrite ($fp, $return);// Compress the file
      gzclose($fp);// Close the gz file and we're done
      $res['status'] = true;
      $res['successTitle'] = 'Success';
      $res['successMsg'] = 'Backup has been taken successfully';
    }else{
      $res['status'] = false;
      $res['errorTitle'] = 'Backup taken error';
      $res['errorMsg'] = 'It could be server directory permission issue.';
    }//End if condition
    return $res;
  }//End function

  function importDBBackup($fileNameWithPath){
    $queryPostfix = '(%)';
    $contents = gzdecode(file_get_contents($fileNameWithPath));
    $sql = explode(";$queryPostfix",$contents);
    $sql = array_filter(array_map('trim',($sql)));//Remove extra spaces and delete empty values
    // print_rp($sql);die();
    $response = array();
    $errorQueryArr = array();
    foreach($sql as $query){
      $result = executePDO($query);
      if($result){
        $response[] = 'true';
      }else{
        $response[] = 'false';
        $errorQueryArr[] = array($query,$result);
      }//End function
    }//End foreach
  
    $res = array();
    if(array_search("false",$response) === false){
      $res['status'] = true;
      $res['successTitle'] = 'Restored Successfully';
      $res['successMsg'] = 'Backup has been restored successfully';
    }else{
      $res['status'] = false;
      $res['errorTitle'] = 'Backup is Corrupted';
      $res['errorMsg'] = 'Maybe some data could not be imported, check browser console for more details.';
      $res['queryErrors'] = $errorQueryArr;
    }//End if condition
    return $res;
  }//End function

  function folderToZipArchive($fromFolder,$fileNameWithPath){
    makedirs($fileNameWithPath,true);//Create directory(s) if not available
    $zip = new ZipArchive();
    $tozip = $fromFolder;
    $res = array();
    // (B) OPEN/CREATE ZIP FILE
    if ($zip->open($fileNameWithPath, ZipArchive::OVERWRITE | ZipArchive::CREATE) === true) {
      // (B1) RECURSIVE ADD
      function zipall ($folder, $base, $ziparchive) {
        // FOLDER NAME INSIDE ZIP
        $options = ["remove_all_path" => true];
        if ($folder != $base) { $options["add_path"] = substr($folder, strlen($base));}
        // ADD CURRENT FOLDER TO ZIP ARCHIVE
        $ziparchive->addGlob($folder."*.*", GLOB_BRACE, $options);
        // ? 'Success<br/>' : 'Error<br/>';
        // ADD FOLDERS IN FOLDER
        $folders = glob($folder . "*", GLOB_ONLYDIR);
        if (count($folders)!=0) { foreach ($folders as $f) {zipall($f."/", $base, $ziparchive);}}
      }//End function
      zipall($tozip, $tozip, $zip);
      // (B2) CLOSE ZIP
      $zip->close();
      $res['status'] = true;
      $res['successTitle'] = 'Success';
      $res['successMsg'] = 'Folder Backup has been taken successfully';
    }//End if condition
    // (C) FAILED TO OPEN/CREATE ZIP FILE
    else { 
      $res['status'] = false;
      $res['errorTitle'] = 'Zip Archive Error';
      $res['errorMsg'] = 'Zip archive could be created/open.';
    }//End if condition 
    return $res;
  }//End function

  function zipArchiveToFolder($zipFileNameWithPath,$extractPath,$extractedFilesOrFolderMayAlreadyExists = false){
    #Warning be careful before set it to true, all files orr folder can be deleted with this condition
    #Use it when you have to replace existed content with extracted
    $etx = $extractedFilesOrFolderMayAlreadyExists;
    if($etx AND is_dir($extractPath)){
      $pa = array_filter(explode('/',$extractPath));
      array_pop($pa);
      $pa[] = 'newTemNameForArchiveExtract/';
      $newName = implode('/',$pa);
      @rename($extractPath,$newName);
      // echo realpath(dirname(__FILE__));
    }else{
      makedirs($extractPath);//Create directory(s) if not available
    }//End if condition
    
    $zip = new ZipArchive;
    $res = array();
    if($zip->open($zipFileNameWithPath) === true){
      $zip->open($zipFileNameWithPath);
      $zip->extractTo($extractPath);  
      $zip->close();
      $res['status'] = true;
      $res['successTitle'] = 'Success';
      $res['successMsg'] = 'Zip archive has been extracted successfully';
      if($etx){deleteDirectoryWithFilsAndFolders(@$newName);}
    }else{
      $res['status'] = false;
      $res['errorTitle'] = 'Zip Extraction Error';
      $res['errorMsg'] = 'Zip archive could not be extracted.';
      if($etx){@rename(@$newName,$extractPath);}
    }//End if condition
    return $res;
  }//End function

  function createBackupFolderName($id,$date,$time,$by){
    return $id.'(s)'.$date.'(s)'.str_replace(array(':',' '),array('-','-'),$time).'(s)'.$by;
  }

  function filesizeReadable($fileNameWithPath, $decimals = 2){
    $bytes = filesize($fileNameWithPath);
    $size = array('B','kB','MB','GB','TB','PB','EB','ZB','YB');
    $factor = floor((strlen($bytes) - 1) / 3);
    return array(sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$size[$factor],$bytes);
  }//End function

  function objectToArray($object){
    if (is_object($object)) {$object = (array)$object;}//End if condition
    if (is_array($object)) {
      $newArray = array();
      foreach ($object as $key => $value) {$newArray[$key] = objectToArray($value); }// Recursive call
    } else {
      $newArray = $object;
    }//End if condition
    return $newArray;
  }//End function

?>