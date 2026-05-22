<?php

  include './reporting/reportingFunctions.php';
  $res = array('status' => true, 'data' => getColumnPreset());
  // print_rp($res);
  echo json_encode($res);

?>