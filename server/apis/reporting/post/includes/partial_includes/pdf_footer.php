<?php
$pdfFooter = "
   <hr style='margin:5px 0px;border: 0.5pt solid #ccc'/>
   <table border='0' width='100%' style='font-size:12'>
      <tr>
         <td width='40%'>" . dateFormat($server_date,$server_time) . "</td>
         <td width='60%' style='text-align:right'>Page {PAGENO} of {nbpg}</td>
      </tr>
   </table>
";
?>