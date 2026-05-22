<?php

$res = dbQuery("SELECT id AS value, report_title AS label,col_data FROM $report_column_preset_title_table");

foreach ($res['data'] as $k => $v) {
  $data = json_decode($v['col_data'], true);
  // $colData = array();
  // foreach($data as $c){
  //   #Get column according to app type
  //   if($c['type'] === 'mutual' OR (strpos(@$_SESSION['appType'],$c['type']) !== false)){$colData[] = $c;}//End if condition
  // }//End foreach
  // $res['data'][$k]['col_data'] = $colData;
  $res['data'][$k]['col_data'] = $data;
} //End foreach
$res['rangeSliderData'] = array('widthArr' => array(), 'colorArr' => array('#C0392B','#9B59B6','#2980B9','#1ABC9C','#27AE60','#F1C40F','#E67E22','#2874A6','#2471A3','#2E86C1','#2980B9','#3498DB','#5499C7','#5DADE2'));

if (@$value) {
    // $res = array();
    $data = dbQuery("SELECT * FROM $report_column_preset_data_table WHERE id = '$value'");
    $data = $data['data'][0];
    $data['columnRefIds'] = explode(',', $data['columnRefIds']);
    $data['columnWidths'] = explode(',', $data['columnWidths']);
    $data['columnAlign'] = explode(',', $data['columnAlign']);

    #Get Cal Data
    foreach ($res['data'] as $vl) {if ($data['report_title_ref_id'] === $vl['value']) {$colData = $vl['col_data'];break;}} //End foreach

    $selectedColumnData = array();
    $widthArrForRangeSlider = array();
    foreach ($data['columnRefIds'] as $k => $v) {
      foreach ($colData as $vl) {if ($v == $vl['value']) {$selectedColumnData[$k]['title'] = $vl['label'];break;}} //End foreach
      $selectedColumnData[$k]['align'] = $data['columnAlign'][$k];
      $selectedColumnData[$k]['width'] = $data['columnWidths'][$k];
      
      if($k === 0){
      $widthArrForRangeSlider[] = (int) explode('%',$data['columnWidths'][$k])[0];
      }else{
        $widthArrForRangeSlider[$k] = (int) $widthArrForRangeSlider[$k-1] + explode('%',$data['columnWidths'][$k])[0];  
      }//End if condition
    } //End foreach
    #Remove last element of array
    array_pop($widthArrForRangeSlider);

    $data['colData'] = $colData;
    $data['selectedColumnData'] = $selectedColumnData;
    $data['rangeSliderData'] = array('widthArr' => $widthArrForRangeSlider, 'colorArr' => $res['rangeSliderData']['colorArr']);
    $res['loadedData'] = $data;
} //End if condition

echo json_encode($res);
