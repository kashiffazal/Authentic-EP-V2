<?php
    $res = dbQuery("
        SELECT 
        jt.id,jt.title,jt.position,jt.description,
        dt.name AS timing
        FROM $job_table AS jt
        INNER JOIN $dropdown_table AS dt ON jt.timing_ref_id = dt.id
        WHERE jt.status = 'active'
    ");

    if($res['status'] AND sizeof($res['data']) === 0){
        $res['noJobMsg'] = '
        <div style="text-align: center;border: 1px dashed #e96b28;border-radius: 3px;padding: 25px 10px;background: floralwhite;">    
            <h1 style="margin:0px;">No Jobs available yet!</h1>
        </div>
        ';
    }else{
        $res['noJobMsg'] = '';
    }//End if condition
    
    echo json_encode($res);
?>