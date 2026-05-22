<?php

$res = dbQuery("SELECT * FROM $document_list_table WHERE status = 'active'");

$typeList = array();
$docList = array();
foreach($res['data'] as $k => $v){
	$typeList[] = $v['type'];
	$docList[strtolower(str_replace(' ','',$v['type']))][] = array('label' => $v['doc_name'], 'value' => $v['id'], 'take_data' => $v['take_data'], 'modal_width' => (int) @$v['take_date_modal_width']);
}//End foreach

$typeList = array_values(array_unique($typeList));
foreach($typeList as $k => $v){$typeList[$k] = array('label' => $v, 'value' => strtolower(str_replace(' ','',$v)));}

$res = array('status' => true, 'data' => array('typeList' => $typeList, 'docList' => $docList));
echo json_encode($res);

?>