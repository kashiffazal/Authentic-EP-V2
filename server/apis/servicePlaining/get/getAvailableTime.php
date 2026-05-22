<?php
if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
$dt = $_POST;
// $dt['timeList'] = json_decode($dt['timeList'], true);
$dt['timeList'] = getAvailability($dt['spw1'],$dt['spw2'])['data']['dayMearge'];
// print_r($dt);die();
// totalHour

#If day available, if's it's not then it's mean Frequency is 'Daily'
if($dt['day']){
    $time = $dt['timeList'][$dt['day']];

    $time = explode('(%)', $time);
    // #SP1 start and end time
    $time[0] = explode(' to ', $time[0]);
    $sp1_startTime = strtotime($time[0][0]); //Start time
    $sp1_endTime = @strtotime($time[0][1]); //End time

    #Selected Time
    $sTime = $dt['time'];
    $sTime = explode(' to ', $sTime);
    $st_startTime = strtotime($sTime[0]); //Start time
    $st_endTime = strtotime($sTime[1]); //End time
    $total_Hour = differenceInHours($sTime[0],$sTime[1],true,'%h:%i');

    // #Compare available time - SP 1
    if (!($st_startTime >= $sp1_startTime && $st_endTime <= $sp1_endTime)) {
        $msg = 'Support worker is not available';
        echo json_encode(array('status' => true, 'msg'=> $msg));die();
    } //End if condition

    // #SP2 start and end time
    if (@$time[1]) {
        $time[1] = explode(' to ', $time[1]);
        $sp2_startTime = strtotime($time[1][0]); //Start time
        $sp2_endTime = strtotime($time[1][1]); //End time
        if (!($st_startTime >= $sp2_startTime && $st_endTime <= $sp2_endTime)) {
            $msg = 'Partner is not available';
            echo json_encode(array('status' => true, 'msg'=> $msg));die();
        } //End if condition
    } //End if condition
}else{
    
    #Check time for 'Daily'

    if(sizeof($dt['timeList']) !== 7){
        $msg = 'Support worker is not available';
        echo json_encode(array('status' => true, 'msg'=> $msg));die();
    }//End if condition

    #Selected Time
    $sTime = $dt['time'];
    $sTime = explode(' to ', $sTime);
    $st_startTime = strtotime($sTime[0]); //Start time
    $st_endTime = strtotime($sTime[1]); //End time
    $total_Hour = differenceInHours($sTime[0],$sTime[1],true,'%h:%i');


    foreach($dt['timeList'] as $time){

        $time = explode('(%)', $time);
        // #SP1 start and end time
        $time[0] = explode(' to ', $time[0]);
        $sp1_startTime = strtotime($time[0][0]); //Start time
        $sp1_endTime = strtotime($time[0][1]); //End time
    
        // #Compare available time - SP 1
        if (!($st_startTime >= $sp1_startTime && $st_endTime <= $sp1_endTime)) {
            $msg = 'Support worker is not available';
            echo json_encode(array('status' => true, 'msg'=> $msg));die();
        } //End if condition

        // #SP2 start and end time
        if (@$time[1]) {
            $time[1] = explode(' to ', $time[1]);
            $sp2_startTime = strtotime($time[1][0]); //Start time
            $sp2_endTime = strtotime($time[1][1]); //End time
            if (!($st_startTime >= $sp2_startTime && $st_endTime <= $sp2_endTime)) {
                $msg = 'Partner is not available';
                echo json_encode(array('status' => true, 'msg'=> $msg));die();
            } //End if condition
        } //End if condition

    }//End foreach


}//End if condition
echo json_encode(array('status' => true, 'msg' => @$msg, 'totalHour' => @$total_Hour));
