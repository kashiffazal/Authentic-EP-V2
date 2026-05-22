<?php
  $res = dbQuery("
    SELECT 
    et.*, CONCAT(ut.first_name,' ',ut.last_name) AS inserted_by
    FROM $email_template_table AS et 
    INNER JOIN $users_table AS ut ON et.inserted_by = ut.id
    WHERE et.module_ref_id = '".$_GET['module']."' AND et.sub_module_ref_id = '".$_GET['subModule']."' AND et.section_ref_name = '".$_GET['section']."'
  ");

  //@ Setting Tags for Sample Values to be used in Template
  //? Module Data Tags
  $colDataTagIdModule = dbQuery("SELECT report_title_ref_id FROM $email_module_main_table WHERE id = '".$_GET['module']."'")['data'][0]['report_title_ref_id'];
  $colTagsModule = dbQuery("SELECT col_data FROM $report_column_preset_title_table WHERE id = '$colDataTagIdModule'")['data'][0]['col_data'];
  $colTagsModule = json_decode($colTagsModule,true);
  $sampleTagsArrModule = array();
  foreach ($colTagsModule as $key => $v) {$sampleTagsArrModule[$v['colName']] = $v['sampleValue'];}//End foreach
  //? Company Data Tags
  $colTagsCompany = dbQuery("SELECT col_data FROM $report_column_preset_title_table WHERE id = '$company_preset_title_ref_id'")['data'][0]['col_data'];
  $colTagsCompany = json_decode($colTagsCompany,true);
  $sampleTagsArrCompany = array();
  foreach ($colTagsCompany as $key => $v) {$sampleTagsArrCompany[$v['colName']] = $v['sampleValue'];}//End foreach
  //? Merge Module and Company Sample-Tags and Col-Tags
  $sampleTagsArr = array_merge($sampleTagsArrModule,$sampleTagsArrCompany);
  $colTags = array_merge($colTagsModule,$colTagsCompany);
  
  foreach ($res['data'] as $k => $v) {
    $v['inserted_date'] = dateFormat($v['inserted_date'],$v['inserted_time']);
    //? With Sample value
    $v['template_sample'] = str_replace('{{$company_logo}}',"$pdfOrImagePath/sample-logo-email-value.png?k=".rand(),$v['template']);
    $v['template_sample'] = tagConvertEmail($v['template_sample'],$sampleTagsArr,$colTags);
    //? Without sample value - Just Variable
    $v['template'] = str_replace('{{$company_logo}}',"$pdfOrImagePath/sample-logo-email-variable.png?k=".rand(),$v['template']);
    $res['data'][$k] = $v;
  }//End foreach
  echo json_encode($res);
?>