<?php
    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

    //if(!isset($_POST)){exit();}
    //print_r($_POST);exit();


    $id = $session_user_id;
    $data = dbQuery("SELECT password FROM $users_table WHERE id = '$id'");
    $data = $data['data'][0];
    if(trim($data['password']) === trim($_POST['current_password'])){

        if(trim($_POST['new_password']) === trim($_POST['confirm_password'])){
            $newPassword = $_POST['new_password'];
            $res = dbQuery("UPDATE $users_table SET `password` = '$newPassword' WHERE id = '$id'");
            if($res['status']){
                $res['incorrectPassword'] = '';
                $res['successNotify'] = true;
                $res['successMsg'] = 'Your password has been reset successfully';
            }//End if condition 
        }else{
            $res = array('status' => true, 'matchError' => 'Password did not match');
        }//End if condition


    }else{
        $res = array('status' => true, 'incorrectPassword' => 'Incorrect password');
    }//End if condition
    echo json_encode($res);

?>