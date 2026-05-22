<?php

  $res = dbQuery("UPDATE $incident_form_table SET status = 'deleted' WHERE id = '$value'");
  echo json_encode($res);

?>