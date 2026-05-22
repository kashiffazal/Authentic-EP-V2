<?php
    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
    // print_rp($_POST);

    $res = sentTestEmail($_POST);
    
    $res['successNotify'] = true;
    $res['successNotifyType'] = 'notify';
    $res['successMsg'] = "Test email sent successfully";

    echo json_encode($res);
?>