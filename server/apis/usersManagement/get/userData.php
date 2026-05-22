<?php

  
  $id = $_GET['id'];
  $data = dbQuery("SELECT id,link_id,first_name,last_name,email,role,status,username AS username_cu,password AS password_cu,contact_number,company_ref_ids,branch_ref_ids,profileImage FROM $users_table WHERE id = '$id'");
  $data['data'] = $data['data'][0];
  $data['data']['profileImageCurrent'] = @$data['data']['profileImage'] ? $domainPath.'/files/uploads/user_profiles/'.$data['data']['profileImage'].'?k='.rand() : '';
  $data['data']['company_ref_ids'] = explode(',',$data['data']['company_ref_ids']);
  $data['data']['branch_ref_ids'] = $data['data']['branch_ref_ids'] ? explode(',',$data['data']['branch_ref_ids']) : array();

  $data['data']['full_name'] = $data['data']['first_name']." ".$data['data']['last_name'];
  unset($data['data']['first_name']);
  unset($data['data']['last_name']);
  unset($data['data']['key']);

  echo json_encode($data);

?>