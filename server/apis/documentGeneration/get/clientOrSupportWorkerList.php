<?php
    if($value == 'client'){$data = clientList();}//End function
    if($value == 'supportworker'){$data = supportWorkerList();}//End function
    echo json_encode(array('status' => true, 'data' => $data));
?>