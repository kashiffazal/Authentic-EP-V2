<?php
    $res = dbQuery("DELETE FROM $report_column_preset_data_table WHERE id = $value");
    $res['successNotify'] = true;
    $res['successNotifyType'] = 'notify';
    $res['successMsg'] = "Preset has been deleted successfully";
    echo json_encode($res);
?>
