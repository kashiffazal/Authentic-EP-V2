<?php

  if($_GET['type'] === 'clients'){
    $whereName = 'client_ref_id';
  }else{
    $whereName = 'sp_ref_id';
  }//End if condition

  $res = dbQuery("SELECT * FROM $document_tracking_table WHERE $whereName = '".$_GET['id']."'");
  $res['data'] = @$res['data'][0];
  echo json_encode($res);
?>