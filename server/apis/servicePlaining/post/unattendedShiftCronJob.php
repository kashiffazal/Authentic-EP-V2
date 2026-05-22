<?php

  $res = dbQuery("post",array('service_plaining_ref_id' => '1'),$shift_unattended_table);
  print_rp($res);

?>