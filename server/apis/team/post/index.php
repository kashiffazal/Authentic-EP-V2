<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

  $_POST['full_name'] = split_name($_POST['full_name']);
  $_POST['first_name'] = $_POST['full_name'][0];
  $_POST['last_name'] = $_POST['full_name'][1];
  unset($_POST['full_name']);

  $id = @$_POST['id'];

  if($id){
    $_POST['updated_date'] = $server_date;
    $_POST['updated_time'] = $server_time;
    $_POST['updated_by'] = $session_user_id;
    $keyword = 'update';
  }else{
    $_POST['inserted_date'] = $server_date;
    $_POST['inserted_time'] = $server_time;
    $_POST['inserted_by'] = $session_user_id;
    $keyword = 'insert';
    $_POST['teamStatus'] = 'active';
    $_POST['isTeamMember'] = 'true';
  }//End if condition

  // print_r(@$_FILES['profileImg']);
  // print_r($_POST);die();


    #If images in uploaded
    $profileImage = @$_POST['profileImg'];
    if ($profileImage) {
      if($id){
        $dt = dbQuery("SELECT profileImg FROM $support_worker_form_table WHERE id = '$id'");
        $dt = @$dt['data'][0]['profileImg'];
      }//End if condition
      $fileName = randCode(5).'-'.randCode(5).'-sp.png';
      $folderPath = '../files/uploads/supportWorkerProfile/';
      if (base64_to_image($profileImage, $folderPath, $fileName)) {
          $_POST['profileImg'] = $fileName;
          @unlink($folderPath.@$dt);
      } //End if condition
    }else{
      unset($_POST['profileImg']);
    } //End if condition


// print_r($_POST);die();

  // if(@$_FILES['profileImg']){
  //   $res = fileUpload($_FILES['profileImg'],"../files/uploads/supportWorkerProfile/",randCode(5).'-');
  //   if($res['status']){
  //     $_POST['profileImg'] = $res['fileName'];
  //   }//End if condition
  // }else{
  //   unset($_POST['profileImg']);
  // }//End if condition

  $res = dbQuery('post',$_POST,$support_worker_form_table);
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['profileImg'] = @$_POST['profileImg'] ? $domainPath.'/files/uploads/supportWorkerProfile/'.$_POST['profileImg'].'?k='.rand() : '';
  if($id){
    $res['successMsg'] = "Member has been updated successfully";
  }else{
    $res['successMsg'] = "New Member has been added successfully";
  }//End if condition

  //print_r($res);
  echo json_encode($res);

?>