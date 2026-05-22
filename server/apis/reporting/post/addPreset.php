<?php
  
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $data = $_POST;
  // print_rp($data);die();
  $res = dbQuery( 'post', $data, $report_column_preset_data_table );
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  if ( @$data['id'] ) {
      $res['successMsg'] = 'Preset has been updated successfully';
  } else {
      $res['successMsg'] = 'Preset has been added successfully';
  }//End if condition
  
  echo json_encode($res);

?>