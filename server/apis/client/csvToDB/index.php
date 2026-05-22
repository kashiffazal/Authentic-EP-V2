<?php

$arr = getCSVToArr('./client/csvToDB/client-data-3.csv',true);


foreach($arr as $key => $value){
  $name = split_name($value['Name']);
  $value['first_name'] = $name[0];
  $value['last_name'] = $name[1];
  // $value['inserted_time'] = date('h:i:s A',strtotime($value['inserted_date']));
  // $value['inserted_date'] = date('Y-m-d',strtotime($value['inserted_date']));
  $value['dateOfBirth'] = date('d-m-Y',strtotime($value['dateOfBirth']));
  $value['ndisPlanDate'] = date('d-m-Y',strtotime($value['ndisPlanDate']));
  $value['ndisEndDate'] = date('d-m-Y',strtotime($value['ndisEndDate']));
  // $value['dateOfRef'] = date('d-m-Y',strtotime($value['dateOfRef']));
  // $value['understandServices'] = $value['understandServices'] == 'TRUE' ? 'true' : '';
  // $value['status'] = 'active';
  unset($arr[$key]['id']);
  unset($value['id']);
  unset($arr[$key]['Name']);
  unset($value['Name']);
  foreach($value as $k => $v){$arr[$key][$k] = $v == '-' ? '' : $v; }//End foreach
  // $arr[$key] = $value;
}//End foreach
$res = insert_SQL_multiple_row($arr,$client_form_table);
print_rp($res);
print_rp($arr);


?>