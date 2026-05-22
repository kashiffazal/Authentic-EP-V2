<?php

  $res = dbQuery("
    SELECT 
    sp.id,CONCAT(sp.first_name,' ',sp.last_name) AS name,sp.updated_date,sp.inserted_date,status
    FROM $client_form_table AS sp
    WHERE draft_code = '' ORDER BY id DESC LIMIT 5
  ");
	foreach($res['data'] as $k => $v){
    $res['data'][$k]['status'] = ucfirst($v['status']);
    $res['data'][$k]['pdf_path'] = $domainPath.'/files/documents/client/forms/'.$v['id']."-client-".($v['updated_date'] ? $v['updated_date'] : $v['inserted_date']).'.pdf?k='.rand();
  }
  echo json_encode($res);

?>