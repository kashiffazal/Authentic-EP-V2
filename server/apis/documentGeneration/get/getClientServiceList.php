<?php
  $res = dbQuery("SELECT services_ref_ids FROM $client_form_table WHERE id = '$value'");
  $data = @$res['data'][0]['services_ref_ids'];
  $ids = array();
  
  if($data){
    $data = explode(',',$data);
    foreach($data as $v){if($v){$ids[] = $v;}}//End foreach
  }//End if condition
  
  if(sizeof($ids) > 0){
    $res = dbQuery("SELECT id as value,CONCAT(code,' ',name) AS label FROM $service_list_table WHERE id IN (".implode(',',$ids).")");
  }else{
    $res = array('status' => true, 'data' => array());
  }//End if condition
  echo json_encode($res);
?>