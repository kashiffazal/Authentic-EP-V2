<?php
  $res = getServicePlainingViewDetails($_GET['id'],$_GET['replacedId'],$_GET['editShiftId']);
  echo json_encode($res);
?>