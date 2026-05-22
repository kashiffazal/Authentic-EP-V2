<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  //print_r($_POST);die();
  $_POST['status'] = 'active';
  $res = dbQuery('post',$_POST,$client_note_table);
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "Note has been added successfully";

  if($res['status']){
    $ud = dbQuery("SELECT CONCAT(first_name,' ',last_name) AS name, CONCAT('".$domainPath."/files/uploads/user_profiles/',profileImage) AS img,slug_color, profileImage FROM $users_table WHERE id = '$session_user_id'");    
    // print_r($ud);
    $ud = $ud['data'][0];
    $ud['nameSlug'] = name_slug($ud['name']);
    $ud['inserted_date'] = dateFormat($server_date,false,'jS M Y');
    $ud['inserted_time'] = $server_time;
    $ud['note'] = $_POST['note'];
    $res['userData'] = $ud;
  }//End if condition

  echo json_encode($res);
?>