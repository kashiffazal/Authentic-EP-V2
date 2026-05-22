<?php
echo json_encode(array('status' => true, 'data' => array('clients' => clientList(), 'supportWorker' => supportWorkerList())));
?>