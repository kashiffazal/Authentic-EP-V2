<?php

  $res = dbQuery("
    SELECT 
    sp.id,CONCAT(sp.first_name,' ',sp.last_name) AS name,sp.updated_date,sp.inserted_date,
    st.name AS status
    FROM $support_worker_form_table AS sp
    LEFT JOIN $support_worker_status_table AS st ON sp.status = st.id
    WHERE draft_code = '' ORDER BY id DESC LIMIT 5
  ");
	foreach($res['data'] as $k => $v){
    $res['data'][$k]['pdf_path'] = $domainPath.'/files/documents/supportWorker/forms/'.$v['id']."-".($v['updated_date'] ? $v['updated_date'] : $v['inserted_date']).'.pdf?k='.rand();
  }
  echo json_encode($res);

?>