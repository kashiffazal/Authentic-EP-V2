<?php
    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

    // print_r($_POST);die();
    // print_r($_FILES);
    // exit();
    $_POST['full_name'] = split_name($_POST['full_name']);
    $_POST['first_name'] = $_POST['full_name'][0];
    $_POST['last_name'] = $_POST['full_name'][1];
    $profileImage = @$_POST['profileImage'];
    unset($_POST['full_name']);
    unset($_POST['profileImage']);

    // $id = $_POST['id'];
    $res = dbQuery('post', $_POST, $users_table);
    // $res = postDataWithFile(
    //     $_POST,$users_table,'update',array('kc'),"id = '$id'",$id,
    //     @$_FILES['profileImage'],"../files/uploads/user_profiles/",$id."_".randCode(5),"profileImage"
    // );//End calling function





    if($res['status']){
        $userData = dbQuery("SELECT id,status,first_name,last_name,email,gender,contact_number,profileImage,role AS kc FROM $users_table WHERE id = '".$res['id']."'");
        $data = $userData['data'][0];
        $role_id = $data['kc'];
        //print_r($userData);
        $resPer = dbQuery("SELECT role,permission_ref_ids AS pc FROM $users_role_table WHERE id = '$role_id'");
        $res['data'] = array_merge($data,$resPer['data'][0]);
        $_SESSION['user_name'] = $_POST['first_name'].' '.$_POST['last_name'];
        #If images in uploaded
        if ($profileImage) {
            $fileName = $res['id'].'_'.randCode(5).'profileImage.png';
            $folderPath = '../files/uploads/user_profiles/';
            if (base64_to_image($profileImage, $folderPath, $fileName)) {
                dbQuery('post', array('id' => $res['id'], 'profileImage' => $fileName), $users_table);
                $res['data']['profileImage'] = $fileName;
                @unlink($folderPath.$userData['data'][0]['profileImage']);
            } //End if condition
        } //End if condition

        $res['successNotify'] = true;
        $res['successMsg'] = "Profile has been updated successfully";
    }//End if condition
    //print_r($res);
    echo json_encode($res);

?>