<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $dt = $_POST;
  $dt['statusData'] = json_decode($dt['statusData'],true);
  //print_r($dt);die();
  $id = $dt['id'];
  $status = $dt['statusData']['status'];

  //@ If status is Active with Company then set variables
  //?Set Company and Branch
  $set = '';
  if($status === 'active' AND @$dt['company_ref_id']){
    $cb = explode('=>',$dt['company_ref_id']);
    $companyRefId = $cb[0];
    $branchRefId = @$cb[1];
    $set = ", company_ref_id = '$companyRefId', branch_ref_id = '$branchRefId'";
  }//End if condition
  // echo $set;die();

  //echo "UPDATE $support_worker_form_table SET status = '$status' $set WHERE id = '$id'";die();
  $res = dbQuery("UPDATE $client_form_table SET status = '$status' $set WHERE id = '$id'");
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "Status has been updated successfully";
  echo json_encode($res);
?>