<?php
    $id = @$_GET['id'] ? $_GET['id'] : $_SESSION['link_id'];
    $res = dbQuery("SELECT days_availibility_json FROM $support_worker_form_table WHERE id = '".$id."'");
    $res['data'] = @$res['data'][0]['days_availibility_json'];
    $res['data'] = $res['data'] ? json_decode($res['data']) : array();
    $res['timeList'] = timeList();
    echo json_encode($res);
?>