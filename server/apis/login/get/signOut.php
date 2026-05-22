<?php

// session_start();
session_destroy();
echo json_encode(array('status' => true, 'data' => array()));

?>