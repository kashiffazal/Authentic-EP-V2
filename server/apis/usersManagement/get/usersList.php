<?php
  
  $query = "
    SELECT $users_table.*, $users_role_table.id AS role_id, $users_role_table.role AS role_name, $users_status_table.status AS status_name
    FROM $users_table   
    INNER JOIN $users_role_table  
    ON $users_table.role = $users_role_table.id
    INNER JOIN $users_status_table  
    ON $users_table.status = $users_status_table.id
    WHERE 
  ";

  //If user is Developer then get all user including hidden role user
  if($_SESSION['user_role_id'] == '1'){$query .= " ($users_role_table.hideForOthers IS NULL OR $users_role_table.hideForOthers != 'true') OR $users_role_table.inserted_by = '$session_user_id' AND";}//End if condition
  $query .= " $users_table.id != '$session_user_id' ORDER BY $users_table.id";

  $pdo_res = executePDO($query);
  $arr = array();
  $companyIds = array();
  $branchIds = array();
  $i = 1;
  while($row = $pdo_res['data']->fetch()){
    $row['profileImage'] = $row['profileImage'] ? $domainPath.'/files/uploads/user_profiles/'.$row['profileImage'].'?k='.rand() : '';
    $row['key'] = $i;
    //#Remove Brackets from Company and Branch Ref Ids
    $row['company_ref_ids'] = str_replace(array('(',')'),array('',''),$row['company_ref_ids']);
    $row['branch_ref_ids'] = str_replace(array('(',')'),array('',''),$row['branch_ref_ids']);
    $arr[] = $row;
    if($row['company_ref_ids']){$companyIds[] = $row['company_ref_ids'];}
    if($row['branch_ref_ids']){$branchIds[] = $row['branch_ref_ids'];}
    $i++;
  }//End while loop
  $arr = array_reverse($arr);
  // print_rp($arr);die();
  //Get Companies and Branches name
  $companyData = @dbQuery("SELECT id,company_name FROM $companies_table WHERE id IN(".implode(',',$companyIds).")",array('indexAsId' => true))['data'];
  $branchData = @dbQuery("SELECT id,branch FROM $branches_table WHERE id IN(".implode(',',$branchIds).")",array('indexAsId' => true))['data'];
  foreach ($arr as $k => $value) {
    if($value['company_ref_ids']){
      $value['company_ref_ids'] = explode(',',$value['company_ref_ids']);
      $c = array();
      foreach($value['company_ref_ids'] as $v){$c[] = $companyData[$v]['company_name'];}//End Foreach
      $value['company_ref_ids'] = $c;
      $arr[$k] = $value;
    }//End if condition
    if($value['branch_ref_ids']){
      $value['branch_ref_ids'] = explode(',',$value['branch_ref_ids']);
      $b = array();
      foreach($value['branch_ref_ids'] as $v){$b[] = $branchData[$v]['branch'];}//End Foreach
      $value['branch_ref_ids'] = $b;
      $arr[$k] = $value;
    }//End if condition
  }//End foreach

  echo json_encode(array('status' => true, 'data' => $arr));
?>
