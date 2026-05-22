<?php
if (!isset($_POST) or !(sizeof($_POST) > 0)) {
  die();
}
$dt = $_POST;

#Check shift timing is crossing or not, if yes then return error 
$res = checkShiftBetweenSelectedTime($dt['spw_ref_id'], @$dt['spw_partner_ref_id'], @$dt['frequency'], @$dt['service_date'], @$dt['service_day'], $dt['service_start_time'], $dt['service_end_time']);
if ($res['timeCrossError']) {
  echo json_encode($res);
  die();
} //End if condition
unset($dt['frequency'],$dt['service_date'], $dt['service_day']);

$dt['status'] = 'active';
// print_r($dt);die();
$res = dbQuery("post", $dt, $service_plaining_rspw_table);
if ($res['status']) {
  #Update status in Request Replacement Table
  $post = array('id' => $dt['request_table_ref_id'], 'status' => 'replaced');
  $res = dbQuery("post", $post, $service_plaining_rr_table);
} //End if condition
echo json_encode($res);
?>