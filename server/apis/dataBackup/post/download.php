<?php
  $folderName = $_GET['folderName'];
  $path = '../backups/'.$folderName.'/';
  $fileName = "download-$folderName.zip";
  deleteDirectoryWithFilsAndFolders('../backups/downloads/');
  $res = folderToZipArchive($path,'../backups/downloads/'.$fileName);
  if($res['status']){
    $res['data']['path'] = "$domainPath/backups/downloads/$fileName";
    $res['data']['fileName'] = $fileName;
  }//End if condition
  echo json_encode($res);

?>