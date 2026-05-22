<?php
   
   if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
   if($_POST['from_date']){$_POST['from_date'] = date('d-m-Y', strtotime($_POST['from_date']));}
   if($_POST['to_date']){$_POST['to_date'] = date('d-m-Y', strtotime($_POST['to_date']));}
   
   #Some Mutual Variables
   $folderPath = '../report_files/' . $session_user_id;
   #Reporting functions
   include './reporting/reportingFunctions.php';
   include './reporting/post/includes/getDataList.php';



?>