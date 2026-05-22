<?php
   if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}
   // print_r($_POST);
   $exportType = $_POST['type'];
   $fileName = $_POST['fileName'];

   $fileName = explode('.',$fileName);
   $filePath = '../report_files/'.$session_user_id.'/';

   if(@$_POST['sortedCol']){
      $data = json_decode(file_get_contents($filePath.$fileName[0].'.json'),true);
      $sortData = json_decode($_POST['sortedCol'],true); 
      include './reporting/post/includes/partial_includes/table_header.php';//$htmlHeader;
      include './reporting/post/includes/partial_includes/table_footer.php';//$htmlFooter;
      include './reporting/reportingFunctions.php';
      $data['data'] = sort_multidimensional_array_by_key($data['data'],$sortData['column'],($sortData['order'] === 'Descend'));
      $html = createHTMLTableForListData($data['column'],$data['data']);
      $fileContent = $htmlHeader.$html.$htmlFooter;
   }else{
      $fileContent = file_get_contents($filePath.$fileName[0].'.html');
   }//End if condition

   if($exportType === 'excel'){
      $res = saveFile($fileName[0].'.xls',$fileContent,$filePath);
   }//End if condition

   if($exportType === 'csv'){
      $res = htmlTableToCSV($fileContent,$fileName[0],$filePath);
   }//End if condition

   if($exportType === 'pdf'){
      if($_POST['pdfOtherData']){
         $pdfOtherData = json_decode($_POST['pdfOtherData'],true);
         // print_r($_POST['pdfOtherData']);die();
         $pdfHeader = '
            <table border="0" width="100%" style="font-size:12px">
               <tr>
                  <td width="40%">Report Type: '.$pdfOtherData['label'].'<br/>Preset Name: '.$pdfOtherData['desc'].'</td>
                  <td width="60%" style="text-align:right">Total Record : '.$pdfOtherData['totalRecord'].($pdfOtherData['fromToDate'] ? ' | '.$pdfOtherData['fromToDate'] : '').'<br/>'.$pdfOtherData['otherDetails'].'</td>
               </tr>
            </table>
            <hr style="margin:5px 0px;border: 0.5pt solid #ccc"/>
         ';
      }//End if condition
      
      ini_set("pcre.backtrack_limit", "50000000");
      require_once '../plugins/mpdf-8.1.4/vendor/autoload.php';
      include './reporting/post/includes/partial_includes/pdf_footer.php';//$pdfFooter;
      $res = createPDF(
         $filePath,
         $fileName[0], //File Name
         $fileContent,//HTML
         $pdfHeader,
         $pdfFooter,
         'L'
      );
   }//End if condition

   

   $res['filePath'] = $domainPath . "/report_files/" . $session_user_id . "/" . $res['fileName'].'?us='.rand();
   echo json_encode($res);

?>