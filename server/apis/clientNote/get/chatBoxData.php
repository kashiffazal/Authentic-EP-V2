<?php
  $query = "
    SELECT 
    cn.*,
    CONCAT(ut.first_name,' ',ut.last_name) AS name, CONCAT('".$domainPath."/files/uploads/user_profiles/',ut.profileImage) AS img, ut.profileImage,ut.slug_color
    FROM $client_note_table AS cn
    INNER JOIN $users_table as ut ON cn.inserted_by = ut.id 
    WHERE client_ref_id = '$value'
  ";
  $pdo_res = executePDO($query);
  //print_r($pdo_res);
  $arr = array();
  $i = 1;
  while($row = $pdo_res['data']->fetch()){
    $row['nameSlug'] = name_slug($row['name']);
    $row['inserted_date'] = date('jS M Y', strtotime($row['inserted_date']));
    $arr[] = $row;
    $i++;
  }//End while loop
  $res = array('status' => true, 'data' => $arr);
  echo json_encode($res);

?>