<?php
  $res = dbQuery("
    SELECT 
    dl.doc_name,
    IFNULL(CONCAT(cl.first_name,' ',cl.last_name),'-') AS cl_name,
    IFNULL(CONCAT(sp.first_name,' ',sp.last_name),'-') AS sp_name,
    d.file_name,
    d.folder_name,
    CONCAT(ut.first_name,' ',ut.last_name) AS inserted_by
    FROM $document_generate_table AS d
    LEFT JOIN $client_form_table AS cl ON d.client_ref_id = cl.id
    LEFT JOIN $support_worker_form_table AS sp ON d.spw_ref_id = sp.id
    INNER JOIN $document_list_table AS dl ON d.doc_ref_id = dl.id
    INNER JOIN $users_table AS ut ON d.inserted_by = ut.id
    WHERE d.status = 'active'
    ORDER BY d.id
  ");
  $res['data'] = array_reverse($res['data']);
  $res['path'] = $domainPath.'/files/documents';
  echo json_encode($res);
?>