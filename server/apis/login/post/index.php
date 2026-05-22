<?php


  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

  $res = login_with_session($_POST,"first_name,last_name,email,gender,contact_number,company_ref_ids,branch_ref_ids,profileImage,slug_color,approve_status,role AS kc");
  if($res['status'] AND !$res['unverified'] AND $res['approve']){
    $data = $res['data'];
    $data['nameSlug'] = name_slug($data['first_name'].' '.$data['last_name']);
    $role_id = $data['kc'];
    $resPer = dbQuery("SELECT role,permission_ref_ids AS pc FROM $users_role_table WHERE id = '$role_id'");
    $res['data'] = array_merge($data,$resPer['data'][0]);
    $_SESSION['permission_ids_list'] = $resPer['data'][0]['pc'];
    
    $value = $data['id']; #$value is id variable in getJSON.php
    include './settingJSON/get/getJSON.php';
    $res['data']['st'] = $settingJSON;
    $res['data']['st']['dst'] = $devSettingJSON;
    #Add Settings in Session for Server-Side Scripting
    $_SESSION['dst'] = $devSettingJSON;

    #Get User Company List with Branches
    $userCompany = getUserCompanyWithBranches($res['data']['company_ref_ids'],$res['data']['branch_ref_ids']);
    $res['data']['userCompanyList'] = $userCompany;
    $_SESSION['userCompanyList'] = $userCompany;
    #Get default company
    $defaultCompany = getDefaultCompany();
    $res['data']['defaultCompany'] = $defaultCompany;
    $_SESSION['defaultCompany'] = $defaultCompany;

    //@ Generate a JWT token
    $res['data']['token'] = createJWTToken($_SESSION);
    session_destroy();

  }//End if condition
  echo json_encode($res);

?>
