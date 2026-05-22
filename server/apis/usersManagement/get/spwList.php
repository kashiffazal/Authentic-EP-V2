<?php

    $res = dbQuery("SELECT id AS value,CONCAT(first_name,' ',last_name) AS label, email FROM $support_worker_form_table WHERE status = '5'");
    echo json_encode($res);

?>