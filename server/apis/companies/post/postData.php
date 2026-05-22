<?php
  if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
  //if(!isset($_POST['data'])){exit();}
  // print_r($_POST);die();
  // print_r($_FILES);
  // exit();
  $oldLogo = @$_POST['oldLogo'];
  unset($_POST['oldLogo']);

  $id = @$_POST['id'];
  $keyword = $id ? 'update' : 'insert';
  $branches = @$_POST['branches_data'];
  unset($_POST['branches_data']);

  //@ Set Web Domain Name - Remove http,https,/,www.
  $_POST['company_domain_name'] = str_replace(array('http://','https://','/','www.'),array('','','',''),$_POST['company_domain_name']);

  $res = postDataWithFile(
    $_POST,$companies_table,$keyword,array(),"id = '$id'",$id,
    @$_FILES['company_logo'],"../files/uploads/companies_logo/",str_replace(" ","",$_POST['company_name'])."_".randCode(5),"company_logo"
  );//End calling function

  // print_r($res);

  #Remove old logo from directory on Update
  if($res['status'] AND $oldLogo){@unlink('../files/uploads/companies_logo/'.$oldLogo);}

  #Post Branches
  if($res['status'] AND $branches){
    $brData = multiFieldsJsonSeparate($branches);
    $branches = json_decode($brData['json'],true);
    $branchesIds = array();
    foreach(explode(',',$brData['branch']) as $k => $v){
      $data = array(
        'id' => @explode(',',@$brData['id'])[$k],
        'company_ref_id' => $res['id'],
        'branch' => explode(',',$brData['branch'])[$k],
        'phone_mobile_number' => explode(',',$brData['phone_mobile_number'])[$k],
        // 'mobile_number' => explode(',',$brData['mobile_number'])[$k],
        'email' => explode(',',$brData['email'])[$k],
        'address' => explode(',',$brData['address'])[$k]
      );
      $branchRes = dbQuery('post', $data, $branches_table);
      $branches['id'][$k+1] = $branchRes['id'];
      $branchesIds[] = $branchRes['id'];
    }//End foreach
    $branches = json_encode($branches);
    $postArr = array('id' => $res['id'], 'branches_data' => $branches,'branches_ref_ids' => implode(',',$branchesIds));
    // print_r($postArr);
    $res = dbQuery('post',$postArr,$companies_table);
    // print_r($branchRes);
  }//End if condition
  //print_r($res);

  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['new_logo'] = @$_FILES['company_logo'] ? $domainPath.'/files/uploads/companies_logo/'.$res['file_res']['fileName'] : '';
  if(@$_POST['id']){
    $res['successMsg'] = "Company has been updated successfully";
  }else{
    $res['successMsg'] = "New Company has been added successfully";
  }//End if condition

  echo json_encode($res);

?>