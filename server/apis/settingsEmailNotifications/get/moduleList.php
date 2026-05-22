<?php
    //@ GEtting Module And Sub Module List
    $mainModuleList = dbQuery("SELECT * FROM $email_module_main_table ORDER BY sequence")['data'];
    $subModuleList = dbQuery("SELECT * FROM $email_module_sub_table ORDER BY sequence")['data'];

    //? Getting company tags
    $companyTags = dbQuery("SELECT col_data FROM $report_column_preset_title_table WHERE id = '".$company_preset_title_ref_id."'")['data'][0]['col_data'];
    $companyTags = json_decode($companyTags,true);
    unset($companyTags[0]);//Removing Sr/Key

    foreach ($mainModuleList as $ky =>  $vl) {
      //@Setting Tags
      if($vl['report_title_ref_id']){
        //? Getting relevant module tags         
        $moduleTags = dbQuery("SELECT col_data FROM $report_column_preset_title_table WHERE id = '".$vl['report_title_ref_id']."'")['data'][0]['col_data'];
        $moduleTags = json_decode($moduleTags,true);
        unset($moduleTags[0]);//Removing Sr/Key
        //? Merge Module and Company tags 
        $vl['tags'] = array_merge($moduleTags,$companyTags);
        $mainModuleList[$ky] = $vl;
      }//End if condition
      foreach ($subModuleList as $v) {
        //@Setting Sections by section col
        if($v['sections']){$v['sections'] = json_decode($v['sections'],true);}
        //@Setting section by table info
        if($v['section_by_table_info']){
          $stInfo = json_decode($v['section_by_table_info']);
          $v['sections'] = dbQuery("SELECT ".$stInfo[1]." AS name, ".$stInfo[2]." AS label FROM ".$stInfo[0])['data'];
        }//End if condition
        //@Set sub Module with Main Module
        if($vl['id'] === $v['module_ref_id']){$mainModuleList[$ky]['subList'][] = $v;}//End if condition
      }//End foreach
    }//End foreach

    $res = array('status' => true);
    $res['data']['moduleList'] = $mainModuleList;

    echo json_encode($res);

?>