<?php
	// print_rp($_POST);
  $res = getTableDataListWithPreset($_POST['column_preset_ref_id'],false,false,@$_POST['from_date'],@$_POST['to_date'],@$_POST['status']);
  if($res['status']){
		// print_r($res);
		$allTableData = $res;
    $tableCol = $res['presetData']['tableColArr'];
		$tableData = $res['data'];
   //   $data = $res['data'];
   //   print_r($res['col']['tableColArr']);
    // $sizeof = sizeof($res['data']);
    include './reporting/post/includes/partial_includes/table_header.php';//$htmlHeader;
    include './reporting/post/includes/partial_includes/table_footer.php';//$htmlFooter;

    $html = createHTMLTableForListData($tableCol,$tableData);
    $html = $htmlHeader.$html.$htmlFooter;

    #Creating PDF
    $reportTitle1 = $res['presetData']['reportTitle'];
    $reportTitle2 = $res['presetData']['presetName'];
    $dateTime = (@$_POST['from_date'] ? 'From '.$_POST['from_date'] : '');
    $dateTime .= (@$_POST['to_date'] ? ' To '.$_POST['to_date'] : '');
    if(@$_POST['from_date'] OR @$_POST['to_date']){$reportTitle2 = $reportTitle2.' | '.$dateTime;}
    $fileName = strtolower(str_replace(' ','_',$reportTitle1)) . $session_user_id;
    $savedHTMLFile = saveFile($fileName.'.html',$html,$folderPath);//Save html file for export
    #Save for sort in PDF
    saveFile($fileName.'.json',json_encode(array("column" => $tableCol, "data" => $tableData)),$folderPath);
    $res['fileName'] = $savedHTMLFile['fileName'];
    $res['resType'] = 'table';
		$res['tableData'] = array('column' => $tableCol, 'data' => $tableData, 'label' => $allTableData['presetData']['reportTitle'], 'desc' => $allTableData['presetData']['presetName'], 'fromToDate' => $dateTime, 'customFilterCol' => $allTableData['presetData']['customFilterCol']);
	}//End if condition
	echo json_encode($res);

?>