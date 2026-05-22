<?php
  $comRefId = $_GET['com_ref_id'];
  $brcRefId = $_GET['brc_ref_id'];

  $res = dbQuery("
    UPDATE $companies_table SET is_default = '', default_branch_ref_id = '';
    UPDATE $companies_table SET is_default = 'true', default_branch_ref_id = '$brcRefId' WHERE id = '$comRefId';
  ");

  //#Get ans Set default company in Session
  if($res['status']){$_SESSION['defaultCompany'] = getDefaultCompany();}//End if condition

  $res['logo_path'] = $domainPath.'/files/uploads/companies_logo/';
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "Default company has been update";
  echo json_encode($res);
?>