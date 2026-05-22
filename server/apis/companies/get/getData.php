<?php
  $data = dbQuery("SELECT * FROM $companies_table",array('reverse' => true));
  echo json_encode($data);
?>