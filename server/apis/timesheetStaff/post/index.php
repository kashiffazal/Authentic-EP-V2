<?php
    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
    $data = $_POST;
    $data['status'] = 'approved';
    $data['approved_by'] = $session_user_id;

    $adminSign = $data['adminSign'];
    unset($data['adminSign']);
    
    // print_r($data);die();

    $res = dbQuery("post",$data,$timesheet_staff_table);

    if($res['status']){
        $insertedId = $res['id'];
        $adminSign && base64ToImage($_POST['adminSign'],'../files/documents/signatures/staff/'.$insertedId.'-a.png');
    
        if($adminSign){
            $pdfData = dbQuery("
                SELECT 
                ut.first_name,ut.last_name,ut.email,
                tset.json, tset.fortnightStartDate, tset.fortnightEndDate 
                FROM $users_table AS ut 
                INNER JOIN $timesheet_staff_table AS tset
                ON tset.inserted_by = ut.id
                WHERE tset.id = '$insertedId'
            ");
            // print_r($pdfData);
            $dt = $pdfData['data'][0];
            $json = empTimesheetJsonDataSet($dt['json'],$insertedId);

            //print_r($pdfData);die();
            //Create PDF
            require_once '../plugins/mpdf-8.1.4/vendor/autoload.php';
            include "../apis/timesheetStaff/post/pdf_html.php";//Set $html;
            $path = "../files/documents/timesheets/staff";
            $fileName = $res['id']."-staff-timesheet-".$server_date;
            $file_ref = createPDF($path,$fileName,$html,$header,$footer,'L');
            //print_r($file_ref);
        }//End if condition
        
    }//End if condition
    // print_r($res);
    echo json_encode($res);


?>