<?php


$tableArr = array(
    // $coa_table => array('name' => 'COA', 'number' => 'ac_name', 'col' => array('company_ref_id')),
    // $po_table => array('name' => 'PO Form', 'number' => 'po_number', 'col' => array('buyer_as_company_ref_id')),
    // $so_table => array('name' => 'SO Form', 'number' => 'so_number', 'col' => array('seller_as_company_ref_id')),
    // $py_table => array('name' => 'PY Form', 'number' => 'tr_code', 'col' => array('company_ref_id')),
    // $re_table => array('name' => 'RE Form', 'number' => 'tr_code', 'col' => array('company_ref_id', 'so_company_ref_id','po_company_ref_id')),
    // $ch_table => array('name' => 'CH Book', 'number' => 'tr_code', 'col' => array('company_ref_id', 'so_company_ref_id','po_company_ref_id')),
    // $ex_table => array('name' => 'EX Book', 'number' => 'tr_code', 'col' => array('company_ref_id')),
    // $gj_entries_table => array('name' => 'GJ Entries', 'number' => 'gj_ref_no', 'col' => array('gjt.company_ref_id')),
    $users_table => array('name' => 'User(s)', 'number' => "CONCAT(first_name,' ',last_name)", 'col' => array('company_ref_ids')),
);
// print_rp($tableArr);

$usedList = array();
foreach ($tableArr as $k => $vl) {
    $col = array();
    foreach ($vl['col'] as $v) {$col[] = "$v = '$value'";} //End foreach
    $res = dbQuery("SELECT " . $vl['number'] . " FROM $k WHERE " . implode(' OR ', $col));
    if ($res['status']) {
        foreach ($res['data'] as $p) {
            $usedList[$vl['name']][] = $p[$vl['number']];
        } //End foreach
    } //End if condition
} //End foreach
// print_rp($usedList);

if(!(sizeof($usedList) > 0)){
  $res = dbQuery("DELETE FROM $companies_table WHERE id = $value");
  $res['successNotify'] = true;
  $res['successNotifyType'] = 'notify';
  $res['successMsg'] = "Company has been deleted successfully";
}else{
  $res = array('status' => true, 'data' => $usedList, 'failedDeleteStatus' => true, 'msgTitle' => 'Company cannot be deleted, because it\'s used in the following module(s).');
}//End if condition

echo json_encode($res);