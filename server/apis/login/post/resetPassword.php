<?php
    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

    //if(!isset($_POST)){exit();}
    //print_r($_POST);exit();

    $email = $_POST['email'];

    if(trim($_POST['new_password']) === trim($_POST['confirm_password'])){
        $newPassword = $_POST['new_password'];
        $res = dbQuery("UPDATE $users_table SET `password` = '$newPassword' WHERE email = '$email'");
        if($res['status']){
            //$res['successNotifyType'] = 'message';
            //$res['successNotify'] = true;
            //$res['successMsg'] = 'Your password has been reset successfully';
        }//End if condition 
    }else{
        $res = array(
          'status' => false,
          'errorNotifyType' => 'message',
          'errorMsg' => 'Password did not match'
        );
    }//End if condition
   
    echo json_encode($res);

?>