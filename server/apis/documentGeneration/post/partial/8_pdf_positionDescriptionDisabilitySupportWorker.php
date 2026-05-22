<?php

  // function GDOE($vl){//Get Dash on Empty
  //   global $data;
  //   return @$data[$vl] ? @$data[$vl] : '-';
  // }//End function

  // function GVFLC($value){//Get value from List;
  //   global $listData;
  //   $index = array_search($value, array_column($listData['countries'], 'value'));
  //   return $listData['countries'][$index]['label'];
  // }//End function

  // function GVFLS($value){//Get value from List;
  //   global $listData;
  //   $index = array_search($value, array_column($listData['states'], 'value'));
  //   return $listData['states'][$index]['label'];
  // }//End function


#Header ---------------------------------//
    $header = "
        <div style='margin:0px 0px;'>
            <table border='0' style='width:100%;padding:0;border-collapse: collapse;'>
                <tr>
                  <td width='50%' style='font-size:18px;color:#424242'>
                    <b>Support Worker Registration Form</b>
                  
                  </td>
                  <td width='50%' style='text-align:right;'><img align='right' src='$pdfOrImagePath/logo-company.png' width='90px'></td>
                </tr>
            </table>
            <!--hr style='margin:5px 0px;border: 0.5pt solid #ccc'/-->
        </div>
    ";
    //---------------------------------------//  
		$footer = '
			<!--hr style="margin:5px 0px;border: 1px solid #e96b28"/-->
			<table width="100%" border="0" style="font-size:12px">
					<tr>
							<td width="50%" ></td>
							<td width="50%" style="text-align: right;"><i>'.date("d-M-Y", strtotime($server_date)).', '.$server_time.'</i> | Page {PAGENO} of {nbpg}</td>
					</tr>
			</table>
		';

  $html = '<html>
  <head>
      <title>Client File CheckList</title>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  ';

  $html .= '  
asdfasdf sad f    
    
    ';

  $html .= '</div></body></html>';


?>