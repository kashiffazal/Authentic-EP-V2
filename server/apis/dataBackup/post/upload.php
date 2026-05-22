<?php

  $fileUpRes = fileUpload($_FILES['upload-backup'],'../backups/temp/');
  $fileName = '../backups/temp/'.@$fileUpRes['fileName'];
  $sd = $server_date;
  $st = str_replace(array(':',' '),array('-','-'),$server_time);
  $status = 'upload';
  if($fileUpRes['status']){
    $extractToFolder = '../backups/temp/'.$sd.'(s)'.$st;
    $res = zipArchiveToFolder($fileName,$extractToFolder);
    if($res['status']){
      unlink($fileName);
      $files = array_diff(scandir($extractToFolder), array('.', '..'));
      if(sizeof($files) !== 2){
        $res['status'] = false;
        $res['errorTitle'] = 'Invalid Backup File';
        $res['errorMsg'] = 'Zip archive must has 2 files, please check before uploading';
      }else{
        $sqlZip = @glob($extractToFolder.'/*.sql.gz')[0];
        $fileZip = @glob($extractToFolder.'/*.zip')[0];
        if($sqlZip AND $fileZip){
          $dbSize = filesizeReadable($sqlZip);
          $filesSize = filesizeReadable($fileZip);
          #Get backup create date and time
          $fileCreatedDateTime = explode('/',$sqlZip);
          $fileCreatedDateTime = $fileCreatedDateTime[sizeof($fileCreatedDateTime)-1];
          $fileCreatedDateTime = explode('(s)',$fileCreatedDateTime);
          $backupCreatedDate = @$fileCreatedDateTime[2];
          $backupCreatedTime = @str_replace(array('-PM','-AM','-'),array(' PM',' AM',':'),@$fileCreatedDateTime[3]);

          $res = dbQuery('post',
          array('status' => $status,'dbSize' => $dbSize[0],'dbSizeBytes' => $dbSize[1],'filesSize' => $filesSize[0],'filesSizeBytes' => $filesSize[1],'backupCreatedDate' => $backupCreatedDate,'backupCreatedTime' => $backupCreatedTime),$backup_table);
          $zipFolderName = $res['id'].'(s)'.$sd.'(s)'.$st.'(s)'.$_SESSION['user_id'];
          #Copy files to main backup folder
          if(makedirs('../backups/'.$zipFolderName)){
            rename($sqlZip,'../backups/'.$zipFolderName.'/'.$res['id'].'(s)db-backup(s)'.$sd.'(s)'.$st.'(s)'.$_SESSION['user_id'].'.sql.gz');
            rename($fileZip,'../backups/'.$zipFolderName.'/'.$res['id'].'(s)files-backup(s)'.$sd.'(s)'.$st.'(s)'.$_SESSION['user_id'].'.zip');
          }//End if condition
          #Delete folder in temp
          deleteDirectoryWithFilsAndFolders($extractToFolder.'/');
          $res['successTitle'] = 'Success';
          $res['successMsg'] = 'Backup file has been uploaded';
          #Set data for Front-End
          $res['data'] = array(
            'id' => $res['id'],
            'status' => $status,
            'backupCreatedDate' => $backupCreatedDate,
            'backupCreatedDate_formatted' => dateFormat($backupCreatedDate,false,'d-m-Y'),
            'backupCreatedTime' => $backupCreatedTime,
            'dbSize' => $dbSize[0],
            'dbSizeBytes' => $dbSize[1],
            'filesSize' => $filesSize[0],
            'filesSizeBytes' => $filesSize[1],
            'inserted_date' => $server_date,
            'inserted_time' => $server_time,
            'inserted_date_formatted' => dateFormat($sd,false,'d-m-Y'),
            'inserted_by' => @$_SESSION['user_id'],
            'name' => @$_SESSION['user_name'],
            'folderName' => createBackupFolderName($res['id'],$server_date,$server_time,@$_SESSION['user_id'])
          );
        }else{
          $res['status'] = false;
          $res['errorTitle'] = 'Invalid Backup File';
          $res['errorMsg'] = 'File maybe invalid or corrupted';  
        }//End if condition
      }//End if condition
    }//End if condition
  }//End if condition
  $res['successNotify'] = true;
  $res['errorNotify'] = true;
  echo json_encode($res);

?>