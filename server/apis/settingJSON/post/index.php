<?php

   if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
   $dt = $_POST;
   //print_r($dt);die();
   $jsonFormat = array(
      'getTransactionYear' => $dt['getTransactionYear'],
      'narrationFormatGJ' => $dt['narrationFormatGJ'],
      'addCOA' => array(
         'contractPrefix' => explode(',',$dt['contractPrefix']),
         'showItemFieldOnContPre' => (bool) @$dt['showItemFieldOnContPre'],
         'showItemFieldOnChange' => (bool) @$dt['showItemFieldOnChange'],
         'treeviewCategoryAsParentGroup' => (bool) @$dt['treeviewCategoryAsParentGroup'],
         'treeviewCategoryAsSuffix' => (bool) @$dt['treeviewCategoryAsSuffix']
      ),
      'formSetting' => array(
         'po' => array(
           'separateDelivery' => (bool) @$dt['po_separateDelivery'],
           'step' => (bool) @$dt['po_step'],
           'allowClickOnSteps' => (bool) @$dt['po_allowClickOnSteps'],
           'stepAsSections' => (bool) @$dt['po_stepAsSections'],
           'sukriRatio' => $dt['po_sukriRatio'],
           'stepOrSectionTitle' => array(
            'title1' => $dt['po_step_title1'],
            'desc1' => $dt['po_step_desc1'],
            'title2' => $dt['po_step_title2'],
            'desc2' => $dt['po_step_desc2'],
            'title3' => $dt['po_step_title3'],
            'desc3' => $dt['po_step_desc3'],
            'title4' => $dt['po_step_title4'],
            'desc4' => $dt['po_step_desc4']
           )
         ),
         'so' => array(
           'separateDelivery' => (bool) @$dt['so_separateDelivery'],
           'step' => (bool) @$dt['so_step'],
           'allowClickOnSteps' => (bool) @$dt['so_allowClickOnSteps'],
           'stepAsSections' => (bool) @$dt['so_stepAsSections'],
           'sukriRatio' => $dt['so_sukriRatio'],
           'stepOrSectionTitle' => array(
            'title1' => $dt['so_step_title1'],
            'desc1' => $dt['so_step_desc1'],
            'title2' => $dt['so_step_title2'],
            'desc2' => $dt['so_step_desc2'],
            'title3' => $dt['so_step_title3'],
            'desc3' => $dt['so_step_desc3'],
            'title4' => $dt['so_step_title4'],
            'desc4' => $dt['so_step_desc4']
           )
         )
      )
   );//End array

   $res = array();
   $res['status'] = @file_put_contents('./settingJSON/'.$session_user_id.'.json', json_encode($jsonFormat)) ? true : false;
   $res['data'] = $jsonFormat;
   $res['data']['dst'] = json_decode(file_get_contents('./settingJSON/defaultAppSettings.json'),true);
   $res['successNotify'] = true;
   $res['successNotifyType'] = 'notify';
   $res['successMsg'] = 'Settings has been updated successfully';
   echo json_encode($res);

?>