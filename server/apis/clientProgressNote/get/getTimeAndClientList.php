<?php

  $res = array(
    'status' => true,
    'data' => array(
      'timeList' => timeList(),
      'clientList' => clientList()
    )
  );
  echo json_encode($res);
?>