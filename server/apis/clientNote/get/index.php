<?php

  $query = "
    SELECT 
    ct.id,CONCAT(ct.first_name,' ',ct.last_name) AS client_name, COUNT(ct.id) AS count
    FROM $client_form_table AS ct
    INNER JOIN $client_note_table AS cn ON cn.client_ref_id = ct.id
  ";

  if(@$_SESSION['link_id']){$query .= "WHERE cn.inserted_by = '$session_user_id'";}

  $query .= ' GROUP BY cn.client_ref_id';

  $res = dbQuery($query);
  // echo $query;
  // print_rp($res);

  $res['data'] = array_reverse($res['data']);
  echo json_encode($res);

?>