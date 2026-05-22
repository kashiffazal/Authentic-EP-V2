<?php

  $head = dbQuery("SELECT id,heads,abbr FROM $users_permission_heads_table ORDER BY sequence ASC");
  $head = $head['data'];
  // print_rp($head);

  $permission = dbQuery("SELECT id,permission,abbr,head_ref_id,head_index,sequence FROM $users_permission_list_table ORDER BY sequence ASC");
  $permission = $permission['data'];
  // print_rp($permission);
  $allIds = array();
  foreach($head as $key => $value){
    $i = 0;
    foreach($permission as $k => $vl){
      if($value['id'] === $vl['head_ref_id']){
        if($vl['head_index'] === '0'){
          $value['children'][$i] = $vl;
          $i++;
        }//End if condition
        if($vl['head_index'] === '1'){$value['children'][$i-1]['children'][] = $vl;}
        if($vl['head_index'] === '2'){$value['children'][$i-1]['children'][$i]['children'][] = $vl;}
        #If there is no Children permissions then make it single or as parent (e.g Reset Password) is a single permission and has no child permission
        if(@$value['children']['-1']){
          $value['id'] = $vl['id'];
          $value['heads'] = $vl['permission'];
          unset($value['children']);
        }//End 

        $head[$key] = $value;
      }//End if condition
    }//End foreach
  }//End foreach

  // print_rp($head);
  // die();

  foreach($head as $k => $v){
    $v['key'] = @$v['children'] ? 'h-'.$v['id'] : $v['id'];
    $v['title'] = $v['heads'].' ('.$v['abbr'].')';
    $allIds[] = $v['key'];
    unset($v['id']);
    unset($v['heads']);

    if(@$v['children']){
      $v['children'] = sort_multidimensional_array_by_key($v['children'],'sequence');
      foreach($v['children'] as $sk => $sv){

        $sv['key'] = 'm-'.$sv['id'];
        $sv['title'] = $sv['permission'].' ('.$v['abbr'].$sv['abbr'].')';
        $allIds[] = $sv['key']; 
        unset($sv['id']);
        unset($sv['permission']);
        unset($sv['head_ref_id']);
        unset($sv['head_index']);
        unset($sv['sequence']);

        if(@$sv['children']){
          $sv['children'] = sort_multidimensional_array_by_key($sv['children'],'sequence');
          foreach($sv['children'] as $isk => $isv){
            $isv['key'] = 'm-'.$isv['id'];
            $isv['title'] = $isv['permission'].' ('.$v['abbr'].$isv['abbr'].')';
            $allIds[] = $isv['key'];
            unset($isv['id']);
            unset($isv['permission']);
            unset($isv['head_ref_id']);
            unset($isv['head_index']);
            unset($isv['sequence']);
            $sv['children'][$isk] = $isv;
            if(@$isv['children']){
              $isv['children'] = sort_multidimensional_array_by_key($isv['children'],'sequence');
              foreach($isv['children'] as $iskk => $iskv){
                $iskv['key'] = 'm-'.$iskv['id'];
                $iskv['title'] = $iskv['permission'].' ('.$v['abbr'].$iskv['abbr'].')';
                $allIds[] = $iskv['key'];
                unset($iskv['id']);
                unset($iskv['permission']);
                unset($iskv['head_ref_id']);
                unset($iskv['head_index']);
                unset($iskv['sequence']);
                $sv['children'][$isk]['children'][$iskk] = $iskv;
              }//End foreach
            }//End if condition
          }//End foreach
        }//End if condition
        $v['children'][$sk] = $sv;
      }//End foreach
    }//End if condition
    $head[$k] = $v;
  }//End foreach

  // print_rp($head);
  // $allIds[] = 'check_all';
  sort($allIds);
  echo json_encode(array('status' => true, 'data' => array('data' => $head, 'allIds' => $allIds)));

  // print_rp($head);

?>