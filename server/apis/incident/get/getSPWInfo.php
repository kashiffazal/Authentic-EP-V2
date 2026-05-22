<?php
  $spwId = $_GET['spwId'];
  $clientId = $_GET['clientId'];
  include './incident/initial_functions.php';
  $res = getSPWInfo($spwId,$clientId);
  echo json_encode($res);
?>