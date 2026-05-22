<?php
  
  $status = $_GET['status'];
  
  if($status === 'export' OR $status === 'upload'){
    $col = 'bt.*';
    $ij = '';  
  }//End if condition

  if($status === 'import'){
    $col = 'bt.id,bt.backup_title,bt.oldStatus,bt.status,bt.import_ref_id,bt.inserted_date,bt.inserted_time,bt.inserted_by,bti.backup_title,bti.dbSize,bti.dbSizeBytes,bti.filesSize,bti.filesSizeBytes,bti.inserted_date AS backup_date,bti.inserted_time AS backup_time';
    $ij = "INNER JOIN $backup_table AS bti ON bti.id = bt.import_ref_id";
  }//End if condition
  
  if($status === 'deleted'){
    $col = "bt.id,bt.backup_title,bt.oldStatus,bt.status,bt.updated_date,bt.updated_time,bt.updated_by,bt.dbSize,bt.dbSizeBytes,bt.filesSize,bt.filesSizeBytes,bt.inserted_date ,bt.inserted_time,CONCAT(utu.first_name,' ',utu.last_name) AS updated_by_name";
    $ij = "INNER JOIN $users_table AS utu ON utu.id = bt.updated_by";
    // $ij = '';
  }//End if condition

  $res = dbQuery("
    SELECT $col,CONCAT(ut.first_name,' ',ut.last_name) AS name
    FROM $backup_table AS bt
    LEFT JOIN $users_table AS ut ON ut.id = bt.inserted_by $ij
    WHERE bt.status = '$status'
  ");

  if($res['status']){
    
    // if($status === 'deleted'){
    //   usort($res['data'], function($a, $b) {return new DateTime($a['updated_date'].' '.$a['updated_time']) <=> new DateTime($a['updated_date'].' '.$a['updated_time']);});
    // }

    foreach($res['data'] as $k => $v){
      $v['name']  = @$v['name'] ? $v['name'] : 'Server';
      $v['inserted_by']  = @$v['inserted_by'] ? $v['inserted_by'] : 'server';
      $v['inserted_date_formatted'] = dateFormat($v['inserted_date'],false,'jS M Y').', '.$v['inserted_time'];
      if(@$v['backupCreatedDate']){$v['backupCreatedDate_formatted'] = dateFormat($v['backupCreatedDate'],false,'jS M Y').', '.$v['backupCreatedTime'];}
      if(@$v['backup_date']){$v['backup_date_formatted'] = dateFormat($v['backup_date'],false,'jS M Y').', '.$v['backup_time'];}
      if(@$v['updated_date']){$v['updated_date_formatted'] = dateFormat($v['updated_date'],false,'jS M Y').', '.$v['updated_time'];}
      $v['folderName'] = createBackupFolderName($v['id'],$v['inserted_date'],$v['inserted_time'],$v['inserted_by']);
      $v['oldStatus'] = $v['oldStatus'] ? ucfirst($v['oldStatus']) : '-';
      $res['data'][$k] = $v;
    }//End foreach
    $res['data'] = array_reverse($res['data']);
  }//End if condition

  //@Status List
  $res['statusList'] = array(
    'export' => array('name' => 'Backups', 'icon' => $statusDataGlobal['export']['icon'], 'mobileIcon' => $statusDataGlobal['export']['mobileIcon'], 'color' => $statusDataGlobal['export']['color']),
    'upload' => array('name' => 'Uploads Logs', 'icon' => $statusDataGlobal['upload']['icon'], 'mobileIcon' => $statusDataGlobal['upload']['mobileIcon'], 'color' => $statusDataGlobal['upload']['color']),
    'import' => array('name' => 'Restore Logs', 'icon' => $statusDataGlobal['import']['icon'], 'mobileIcon' => $statusDataGlobal['import']['mobileIcon'], 'color' => $statusDataGlobal['import']['color']),
    'deleted' => array('name' => 'Deleted Log', 'icon' => $statusDataGlobal['deleted']['icon'], 'mobileIcon' => $statusDataGlobal['deleted']['mobileIcon'], 'color' => $statusDataGlobal['deleted']['color'])
  );

  echo json_encode($res);
?>