<?php
  $res = dbQuery("SELECT id,preset_name,report_title_ref_id,columnRefIds FROM $report_column_preset_data_table");
  #Get Preset Title data
  $data = dbQuery("SELECT * FROM $report_column_preset_title_table",array('indexAsId' => true));
  $data = $data['data'];

  foreach($res['data'] as $key => $vl){
    $sd = $data[$vl['report_title_ref_id']];
    $res['data'][$key]['report_title'] = $sd['report_title'];
    #Getting Columns Name =======================//
    $sd['col_data'] = json_decode($sd['col_data'],true);
    $columnRefIds = explode(',',$vl['columnRefIds']);
    $colName = array();
    foreach($columnRefIds as $k => $v){
      $p = search_array_in_multidimensional($sd['col_data'],'value',$v);
      $colName[] = $sd['col_data'][$p]['label'];
    }//End foreach
    $res['data'][$key]['columnNamesArr'] = $colName;
    $res['data'][$key]['columnNames'] = implode(',',$colName);
    //===============================================//
  }//End foreach

  $res['data'] = array_reverse($res['data']);
  echo json_encode($res);


?>