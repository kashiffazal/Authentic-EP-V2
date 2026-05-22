<?php
    $id = $session_user_id;
    $data = dbQuery("SELECT first_name,last_name,gender,contact_number,email,profileImage,current_login,last_login,second_last_login FROM $users_table WHERE id = '$id'",
        array(
            'reverse' => true,
            //'dateFormat' => array('current_login,last_login,second_last_login','d-m-Y, h:m:s A'),
        )
    );
    if($data['status']){
        $dt = $data['data'][0];
        if(@$dt['profileImage']){
            $dt['db_image'] = $domainPath."/files/uploads/user_profiles/".$dt['profileImage'];
        }//End if condition
        $dt['totalTransactions'] = getTotalTransactions();
        
        $cDate = explode(',',$dt['current_login']);
        $lDate = explode(',',$dt['last_login']);
        $slDate = explode(',',$dt['second_last_login']);

        $dt['current_login'] = date('d-m-Y',strtotime($cDate[0])).','.$cDate[1];
        $dt['last_login'] = date('d-m-Y',strtotime($lDate[0])).','.$lDate[1];
        $dt['second_last_login'] = date('d-m-Y',strtotime($slDate[0])).','.$slDate[1];    
        
        unset($dt['key']);
        unset($dt['profileImage']);
        $data['data'] = $dt;
    }//End if condition
    //echo "<pre>";print_r($data);echo "</pre>";
    echo json_encode($data);
?>