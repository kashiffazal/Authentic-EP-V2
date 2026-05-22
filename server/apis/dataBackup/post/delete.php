<?php

  $id = $_GET['id'];
  $folderName = $_GET['folderName'];
  $oldStatus = $_GET['oldStatus'];
  $res = dbQuery('post',array('id' => $id, 'status' => 'deleted','oldStatus' => $oldStatus),$backup_table);
  if($res['status']){
    deleteDirectoryWithFilsAndFolders('../backups/'.$folderName.'/');
    $res['successNotify'] = true;
    $res['successTitle'] = 'Deleted';
    $res['successMsg'] = 'Backup has been deleted successfully';

    #Get data to update Front-End side
    $dt = dbQuery("SELECT * FROM $backup_table WHERE id = '$id'")['data'][0];
    $dt['inserted_date_formatted'] = dateFormat($dt['inserted_date'],false,'d-m-Y');
    $dt['updated_date_formatted'] = dateFormat($dt['updated_date'],false,'d-m-Y');
    $dt['updated_by_name'] = @$_SESSION['user_name'];
    $res['data'] = $dt;
  }//End if condition  
  echo json_encode($res);

?>