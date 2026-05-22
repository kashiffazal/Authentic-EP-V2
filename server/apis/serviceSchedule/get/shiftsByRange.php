<?php
  
  // if(!isset($_GET)){die();}
  $from = $_GET['from'];
  $to = $_GET['to'];
  $spwIds = explode(',',$_GET['spwIds']);
  $gridDateFormat = 'Y-m-d';
  // print_r($spwIds);
  #Get all service shift by SPW or Partners
  include '../apis/serviceSchedule/sch_functions.php';
  include "../apis/serviceSchedule/includes/getShifts.php";//print_rp($spData);//print_rp($serviceDataBySPW);//print_rp($shiftIds);

  $shiftArray = array();
  // $fromServiceDate = $from;
  // $toServiceDate = $to;
  // $fromServiceDate = date($gridDateFormat, strtotime("-28 days",strtotime($from)));
  // $toServiceDate = date($gridDateFormat, strtotime("+28 days",strtotime($to)));
  foreach($spwIds as $id){
    if(@$serviceDataBySPW[$id]){$shiftArray = array_merge($shiftArray,serviceListRecurring($id,$serviceDataBySPW[$id],1,'Y-m-d',$from,$to,28));}
  }//End foreach;

  #Add unique recurring shift id ===========//
  $shiftArray = shiftArrayUniqueRecurringId($shiftArray);//unique_recurring_id

  
  $gridCols = array();
  // if($_GET['type'] === 'fortnight'){
    $gridCols[] = array($from,date('l',strtotime($from)));
    for ($i=0; $i < 13; $i++) {
      $gridCols[$i+1][] = date($gridDateFormat,strtotime('+'.($i+1).' days',strtotime($from))); 
      $gridCols[$i+1][] = date('l',strtotime($gridCols[$i+1][0]));
    }
  // }//End if condition
  // print_r($gridCols);
  // print_r($shiftArray);
  
  //Get Replacement Requested Shifts and update requested as true
  $shiftArray = filterRequestedForReplacementShift($shiftArray,$shiftIds);
  echo json_encode(array('status' => true, 'data' => $shiftArray, 'shiftByFrequency' => $shiftByFrequency,'cols' => $gridCols));

?>