<?php
  //Just checking session to hit this dummy api
  $_SESSION['checkKey'] = randCode();
  echo json_encode(array('status' => true));
?>