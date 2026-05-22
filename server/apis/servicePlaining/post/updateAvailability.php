<?php
    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
    //print_r($_POST);die();

        $days_availibility = multiFieldsJsonSeparate($_POST['data']);
        $data = array();
        $data['id'] = $_POST['id'] ? $_POST['id'] : $_SESSION['link_id'];
        $data['days_availibility_json'] = @$days_availibility['json'];
        $data['days_availibility_day'] = @$days_availibility['day'];
        $data['days_availibility_from'] = @$days_availibility['from'];
        $data['days_availibility_to'] = @$days_availibility['to'];
        $data['days_availibility_na'] = @$days_availibility['not_available'];
        // print_r($data);
        $res = dbQuery("post",$data,$support_worker_form_table);


        $res['successNotify'] = true;
        $res['successNotifyType'] = 'notify';
        $res['successMsg'] = "Service availability has been updated successfully";
        $res['updatedData'] = json_decode($data['days_availibility_json'],true);

        echo json_encode($res);

?>