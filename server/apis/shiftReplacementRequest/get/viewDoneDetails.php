<?php

  $res = dbQuery("
    SELECT 
    srr.*,
    sp.shift_no,
    CONCAT(spw_req.first_name,' ',spw_req.last_name) AS spw_req_name,
    CONCAT(spwr1.first_name,' ',spwr1.last_name) AS spwr1_name,
    CONCAT(spwr2.first_name,' ',spwr2.last_name) AS spwr2_name,
    rpsp.service_start_time,rpsp.service_end_time,rpsp.meal_break_min,rpsp.rest_break_min
    FROM $service_plaining_rr_table AS srr
    INNER JOIN $service_plaining_table AS sp ON srr.service_plaining_ref_id = sp.id
    INNER JOIN $support_worker_form_table AS spw_req ON srr.requested_by = spw_req.id
    INNER JOIN $service_plaining_rspw_table AS rpsp ON srr.id = rpsp.request_table_ref_id
    LEFT JOIN $support_worker_form_table AS spwr1 ON rpsp.spw_ref_id = spwr1.id
    LEFT JOIN $support_worker_form_table AS spwr2 ON rpsp.spw_partner_ref_id = spwr2.id
    WHERE srr.id = '$value'
  ");
  $res['data'] = $res['data'][0];
  $res['data']['hour'] = timeDiff($res['data']['service_start_time'],$res['data']['service_end_time']);
  $res['data']['inserted_date'] = dateFormat($res['data']['inserted_date'],false,'d-m-Y');


  echo json_encode($res);

?>