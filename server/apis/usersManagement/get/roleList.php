<?php

  
  $permission = @$_GET['permission'];

  if($permission == 'true'){
    
    #Getting Role List
    $data = dbQuery("SELECT * FROM $users_role_table",array('reverse' => true));
    //print_rp($data);
    #Getting Permission heads abbr List
    $per_head = dbQuery("SELECT id,heads,abbr FROM $users_permission_heads_table",array('indexAsId' => true));
    $per_head = $per_head['data'];
    //print_rp($per_head);
    #Getting Permission abbr List
    $per_list = dbQuery("SELECT id,permission,head_ref_id,abbr FROM $users_permission_list_table",array('indexAsId' => true));
    $per_list = $per_list['data'];
    // print_rp($per_list);

    foreach($data['data'] as $key => $value){
      $arr = array();
      $title = array();
      if($value['permission_ref_ids'] == 'all'){
        $arr[] = $value['permission_ref_ids'];
      }else{
        $permission_ids = explode(",",$value['permission_ref_ids']);
        foreach($permission_ids as $key_inner => $value_inner){
          if(strpos($value_inner, 'h-') === false){
            $value_inner = str_replace('m-','',$value_inner) ;
            $arr[] = @$per_head[$per_list[$value_inner]['head_ref_id']]['abbr'].@$per_list[$value_inner]['abbr'].'-'.@$per_list[$value_inner]['permission'];
            $title[] = $value_inner ? @$per_head[$per_list[$value_inner]['head_ref_id']]['heads'].' > '.@$per_list[$value_inner]['permission'] : '';
          }//End if condition
        }//End foreach
      }//End if condition
      $value['permissions'] = implode("|",$arr);
      $value['headTitle'] = implode("|",$title);
      $data['data'][$key] = $value;
    }//End foreach

  }else{
    $query = "SELECT id AS value,role AS label, linkRole FROM $users_role_table";
    //If user is Developer then get all
    if($_SESSION['user_role_id'] == '1'){$query .= " WHERE (hideForOthers IS NULL OR hideForOthers != 'true') OR inserted_by = '$session_user_id'";}//End if condition
    $data = dbQuery($query,array('reverse' => true));
    $status = dbQuery("SELECT id AS value,status AS label FROM $users_status_table",array('reverse' => true));
    $data['status_data'] = $status['data'];
    $data['company_data'] = getCompanyWithBranches()['data'];
  }//End if condition
  echo json_encode($data);

?>