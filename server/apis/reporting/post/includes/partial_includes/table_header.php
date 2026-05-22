<?php
$htmlHeader = '
   <html xmlns:x="urn:schemas-microsoft-com:office:excel">
   <head>
   <title>Reporting</title>
   <!--[if gte mso 9]>
   <xml>
         <x:ExcelWorkbook>
            <x:ExcelWorksheets>
               <x:ExcelWorksheet>
                     <x:Name>Student Data</x:Name>
                     <x:WorksheetOptions>
                        <x:Print>
                           <x:ValidPrinterInfo/>
                        </x:Print>
                     </x:WorksheetOptions>
               </x:ExcelWorksheet>
            </x:ExcelWorksheets>
         </x:ExcelWorkbook>
   </xml>
   <![endif]-->
   <style>
      .list_table{
         font-size: 12px;
         border-left:1px solid #d8d8d8;
      }
      .list_table th{
         padding:6px 6px;
         border-top:1px solid #d8d8d8;
         // text-align:left;
         border-bottom: 1px solid #e2e2e2;
         border-right:1px solid #d8d8d8
      }
      .list_table td{
         padding:4px 6px;
         border-bottom: 1px solid #e2e2e2;
         border-right:1px solid #d8d8d8
      }
      /*.list_table tr:nth-child(even) {background: #f5f5f5}
      /.list_table tr:nth-child(odd) {background: #FFF}*/
      .gj_row_separator{
         padding: 0px !important;
         height: 2px;
      }
   </style>
   </head>
   <body style="font-family: \'Roboto\', sans-serif;">';
?>