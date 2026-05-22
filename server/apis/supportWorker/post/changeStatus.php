<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  $dt = $_POST;
  $dt['statusData'] = json_decode($dt['statusData'],true);
  // print_r($dt);die();
  $id = $dt['id'];
  $status = $dt['statusData']['id'];

  $rejectReason = addslashes(@$dt['rejectReason']);
  $set = $rejectReason ? ", rejectReason = '$rejectReason'" : '';

  //@ If status is Hired then set Company, Branch and Manager
  if($status === '5'){
    //?Set Company and Branch
    if(@$dt['company_ref_id']){
      $cb = explode('=>',$dt['company_ref_id']);
      $companyRefId = $cb[0];
      $branchRefId = @$cb[1];
    }else{
      $companyRefId = $_SESSION['defaultCompany']['id'];
      $branchRefId = @$_SESSION['defaultCompany']['default_branch_ref_id'];
    }//End if condition
    $dt['manager_ref_id'] = @$dt['manager_ref_id'] ? $dt['manager_ref_id'] : '';
    $set .= ", company_ref_id = '$companyRefId', branch_ref_id = '$branchRefId', manager_ref_id = '".$dt['manager_ref_id']."'";
  }//End if condition
  // echo $set;die();

  //#Set password on hired
  //$set .= ($dt['statusData']['id'] == '5') ? ", password = '".randCode(10)."'" : '';
  //echo "UPDATE $support_worker_form_table SET status = '$status' $set WHERE id = '$id'";die();
  $res = dbQuery("UPDATE $support_worker_form_table SET status = '$status' $set WHERE id = '$id'");
  
  if($res['status'] AND ($dt['statusData']['id'] != '1') AND ($dt['statusData']['id'] != '8') AND ($dt['statusData']['id'] != '9')){
    // $emailSignature = '
    //   Kind Regards,<br/>
    //   Support Team<br/>
    //   '.$companyDetails['name-pyt'].'<br/>
    //   Website: <a href="'.$companyDetails['website'].'" target="_blank">'.$companyDetails['website'].'</a><br/> 
    //   Email: <a href="mailto:'.$companyDetails['emailSupport'].'">'.$companyDetails['emailSupport'].'</a>
    // ';
    // $receiverArr = array(array('email' => $dt['email'], 'name' => $dt['name']));
    // require_once '../plugins/PHPMailer_v5.1/class.phpmailer.php'; //library added in download source
    // include "../apis/supportWorker/post/email_templates/change_status_email_set_".$dt['statusData']['id'].".php";//$clientReceiverArr,$clientEmailContent

    // if($dt['statusData']['id'] === '5'){//If Staff is Hired then add accounts email into cc email array
    //   $emailCCArr[] = array('email' => $companyDetails['emailAccounts'], 'name' => 'Accounts Team');
    // }//End if condition

    // $res['email_status_res'] = emailPHPMailer($emailSenderArrCompany,$receiverArr,$clientEmailContent,$SMTPCred,false,$emailCCArr);
    $res['email_status_res'] = sendEmail('1','2',$dt['statusData']['id'],false,$id,@$companyRefId);
  }//End if condition 
  
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "Status has been updated successfully";
  echo json_encode($res);
?>