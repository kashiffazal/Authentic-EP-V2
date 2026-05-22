<?php

  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $data = $_POST;
  // print_rp($data);
  $id = $_SESSION['user_id'];
  $password = $data['password'];
  
  // $uid = @fetchDataFromDB("SELECT id FROM $users_table WHERE id = '$id' AND password = '$password'",false,false,false,false,array(':id' => $id, ':password' => $password))['data'][0]['id'];
  $uid = @fetchDataFromDB("SELECT id FROM $users_table WHERE id = :id AND password = :password", false, false, false, false, array(':id' => $id, ':password' => $password))['data'][0]['id'];

  // print_r($uid);die();
  if(isset($uid)){
    $folderName = $data['folderName'];
    #Get id from folder name
    $folderName = explode('(s)',$folderName);
    $id = $folderName[0];
    #Extract id from folder name
    array_shift($folderName);  
    $folderName = implode('(s)',$folderName);

    $folderPath = "../backups/$id(s)$folderName";
    $dbName = "$folderPath/$id(s)db-backup(s)$folderName.sql.gz";
    $zipFile = "$folderPath/$id(s)files-backup(s)$folderName.zip";
    $res = importDBBackup($dbName);
    if($res['status']){
      $res['fileArchiveExtract'] = zipArchiveToFolder($zipFile,'../files/',true);
      $res['import'] = dbQuery("INSERT INTO $backup_table (status, import_ref_id,inserted_date, inserted_time, inserted_by) VALUES('import','$id','$server_date','$server_time','".$_SESSION['user_id']."')");
    }//End if condition
  }else{
    $res = array('status' => false, 'errorTitle' => 'Invalid password', 'errorMsg' => 'Please type a valid password');
  }//End if condition

  echo json_encode($res);


?>