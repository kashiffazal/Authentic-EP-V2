<?php
$res = dbQuery("
    SELECT
    sp.id,
    sp.start_time_actual,
    sp.end_time_actual,
    IF(sp.start_time_mod != '', sp.start_time_mod, sp.start_time) as start_time,
    IF(sp.end_time_mod != '', sp.end_time_mod, sp.end_time) as end_time,
    sp.status,
    sr.name AS service_name,
    CONCAT(spw1.first_name,' ',spw1.last_name) AS swp1_name,
    IFNULL(CONCAT(spw2.first_name,' ',spw2.last_name),'-') AS swp2_name,
    IFNULL(CONCAT(cl.first_name,' ',cl.last_name),'-') AS client_name,
    sp.inserted_date,

    spt.service_day,
    spt.service_date,
    IFNULL(req.request_no,'-') AS request_no,
    spt.shift_no,

    ets.description

    FROM $service_timing_table AS sp
    INNER JOIN $service_list_table AS sr ON sp.service_ref_id = sr.id
    INNER JOIN $client_form_table AS cl ON sp.client_ref_id = cl.id
    INNER JOIN $support_worker_form_table AS spw1 ON sp.spw_ref_id = spw1.id
    LEFT JOIN $support_worker_form_table AS spw2 ON sp.spw2_ref_id = spw2.id
    LEFT JOIN $timesheet_staff_table AS ets ON sp.staff_timesheet_ref_id = ets.id
    LEFT JOIN $service_plaining_rr_table AS req ON sp.request_id = req.id

    INNER JOIN $service_plaining_table AS spt ON sp.service_plaining_ref_id = spt.id

    WHERE sp.id = '$value'
    ORDER BY sp.id ASC
	");
$res['data'] = $res['data'][0];
// $res['data']['swp_name'] = $res['data']['swp1_name'].($res['data']['swp2_name'] ? ', '.$res['data']['swp2_name'] : '');
// $res['data']['hour_actual'] = timeDiff($res['data']['start_time_actual'],$res['data']['end_time_actual']);
// $res['data']['hour'] = timeDiff($res['data']['start_time'],$res['data']['end_time']);
// $res['data']['late'] = timeDiff($res['data']['start_time_actual'],$res['data']['start_time']);
echo json_encode($res);