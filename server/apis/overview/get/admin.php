<?php

  #Get Count data =================================================================#
  include './overview/get/admin-includes/count-data.php';  
  if(!@$value){
    #Get Recent Client Notes ========================================================#
    include './overview/get/admin-includes/recent-clients-status-note.php';
    $data['data']['recent_notes'] = $arr;
    #Get Recent Services Notes ======================================================#
    $data['data']['recent_services'] = servicePlainingList('approve',false,2,true);
    #Get Recent Services Notes ======================================================#
    $data['data']['recent_user'] = recentUser(true,2);
    #Get Line Chart data of services =================================================#
    include './overview/get/admin-includes/line-chart.php';
    $data['data']['line_chart'] = array('data' => $arr, 'label' => 'SERVICE STATUS');
    #================================================================================#  
  }//End if condition
  echo json_encode($data);
?>