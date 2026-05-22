<?php
 
  #Set User id for Postfix in files and to detect 
  #Backup is taken by user of by cron job(server)
  if(@$_GET['server']){
    $backupName = 'Backup by Server';
    $userId = 'server';
  }else{
    //If it's not by server then check on POST variable
    //Because Backup title must be in POST
    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
    $backupName = $_POST['backup_title'];
    $userId = @$_SESSION['user_id'] ? $_SESSION['user_id'] : '';
  }//End if condition
  $sd = $server_date;
  $st = $server_time;
  
  #Unknown Issue (Have to solve later) - Some time double record is inserted with empty backup title
  if(!$backupName){die();}

  #Set Export record in DB
  $res = dbQuery("post",array('backup_title' => $backupName, 'status' => 'export','inserted_date' => $sd,'inserted_time' => $st, 'inserted_by' => $userId),$backup_table);
  if($res['status']){

    #Set Relevant Variables
    $id = $res['id'];
    $sdt = $sd.'(s)'.str_replace(array(':',' '),array('-','-'),$st).'(s)'.$userId;
    $dirPath = "../backups/$id(s)$sdt";
    $dbBackUpFN = "$dirPath/$id(s)db-backup(s)$sdt.sql.gz";
    $filesBackUpFN = "$dirPath/$id(s)files-backup(s)$sdt.zip";

    #Export DB Backup 
    $res['dbStatus'] = exportDBBackup($dbBackUpFN,$backup_table);
    
    if($res['dbStatus']['status']){
      #Get DB Backup Size and Files backup
      $res['fileArchive'] = folderToZipArchive('../files/',$filesBackUpFN);
      $dbSize = filesizeReadable($dbBackUpFN);
      @$filesSize = filesizeReadable($filesBackUpFN);
    }//End if condition
  
    $res['updateStatus'] = dbQuery("UPDATE $backup_table SET dbSize = '".@$dbSize[0]."',dbSizeBytes = '".@$dbSize[1]."',filesSize = '".@$filesSize[0]."',filesSizeBytes = '".@$filesSize[1]."' WHERE id = '$id'",$id);
    $res['successNotify'] = true;
    $res['successTitle'] = $res['dbStatus']['successTitle'];
    $res['successMsg'] = $res['dbStatus']['successMsg'];

    #Set variables for Front-End
    $res['data']['id'] = $res['id'];
    $res['data']['backup_title'] = $backupName;
    $res['data']['dbSize'] = @$dbSize[0];
    $res['data']['dbSizeBytes'] = @$dbSize[1];
    $res['data']['filesSize'] = @$filesSize[0];
    $res['data']['filesSizeBytes'] = @$filesSize[1];
    $res['data']['inserted_date'] = $sd;
    $res['data']['inserted_time'] = $st;
    $res['data']['inserted_date_formatted'] = dateFormat($sd,false,'d-m-Y');
    $res['data']['inserted_by'] = @$_SESSION['user_id'];
    $res['data']['name'] = @$_SESSION['user_name'];
    $res['data']['folderName'] = createBackupFolderName($res['id'],$sd,$st,@$_SESSION['user_id']);

  }//End function
  echo json_encode($res);
?>