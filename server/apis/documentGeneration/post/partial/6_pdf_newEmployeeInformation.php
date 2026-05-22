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
        <td width='50%' style='text-align:left;'><img align='left' src='$pdfOrImagePath/logo-company.png' width='100px'></td>
        <td width='50%' style='text-align:right;'><img align='right' src='$pdfOrImagePath/NDIS-logo.png' width='100px'></td>
      </tr>
    </table>
    <br/>
    <!--h2 style='text-align:center;'>".$data['doc_name']."</!--h2>
    <!--hr style='margin:5px 0px;border: 0.5pt solid #ccc'/-->
  </div>
  ";
  //---------------------------------------//  
  $footer = '
  <hr style="margin:5px 0px;border: 1px solid #e96b28"/>
  <table width="100%" border="0" style="font-size:12px">
    <tr>
      <td width="40%"><a target="_blank" href="'.$companyDetails['website'].'">'.$companyDetails['websiteName'].'</a></td>
      <td width="60%" style="text-align:right">NDIS Provider # '.$providerNumber.' | ABN # '.$abnNumber.' | <i>Page {PAGENO} of {nbpg}</i></td>
    </tr>
  </table>
  ';

  $html = '<html>
  <head>
      <title>NEW EMPLOYEE INFORMATION</title>
      <style>
      .tableBorder{
        border:1px solid #000;
        border-right:unset;
        border-bottom:unset;
      }
      .tableBorder th{text-align:left;}
      .tableBorder th,
      .tableBorder td{
        font-size:12px;
        border-bottom:1px solid #000;
        border-right:1px solid #000;
        padding:8px;
      }
      .tableBorder .head{
        color:#fff;
        background:#696969;
      }
      </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  ';

  $html .= '  
      
  <h2 style="text-align:center">NEW EMPLOYEE INFORMATION</h2>

  <table width="100%" border="0" class="tableBorder" cellpadding="0" cellspacing="0">
    <tr><th colspan="4" class="head">EMPLOYEE INFORMATION</th></tr>  
    <tr>
      <th>Staff Full Name:</th>
      <td colspan="3">'.$data['first_name'].' '.$data['last_name'].'</td>
    </tr>
    <tr>
      <th width="25%">Residential Address:</th>
      <td width="45%">'.$data['your_addr'].'</td>
      <th width="13%">Postcode:</th>
      <td width="17%">'.$data['your_post_code'].'</td>
    </tr>
    <tr>
      <th>Postal Address:<br/>(if different)</th>
      <td></td>
      <th>Postcode:</th>
      <td></td>
    </tr>
    <tr>
      <th>Phone No (Home):</th>
      <td colspan="3">&nbsp;</td>
    </tr>
    <tr>
      <th>Phone No (Mobile):</th>
      <td colspan="3">'.$data['your_mobile'].'</td>
    </tr>
    <tr>
      <th>Email:</th>
      <td colspan="3">'.$data['your_email'].'</td>
    </tr>
    <tr>
      <th>Driver\'s Licence Number:<br/>(copy attached)</th>
      <td></td>
      <th>Expiry Date:</th>
      <td></td>
    </tr>
  </table>
  <br/><br/>
  
  <table width="100%" border="0" class="tableBorder" cellpadding="0" cellspacing="0">
    <tr><th colspan="4" class="head">PAYROLL INFORMATION</th></tr>  
    <tr><th width="25%">Tax File Number:</th><td width="75%"></td></tr>
    <tr><th>Date of Birth:</th><td>'.$data['dateOfBirth'].'</td></tr>
    <tr><th>Bank Name:</th><td></td></tr>
    <tr><th>BSB No:	</th><td></td></tr>
    <tr><th>Account Name:</th><td></td></tr>
    <tr><th>Account No:</th><td></td></tr>
  </table>
  <br/><br/>

  <table width="100%" border="0" class="tableBorder" cellpadding="0" cellspacing="0">
    <tr><th colspan="4" class="head">SUPERANNUATION</th></tr>  
    <tr><th width="25%">Superannuation<br/>Fund Name::</th><td width="75%"></td></tr>
    <tr><th>USI Number:</th><td></td></tr>
    <tr><th>Staff Number:</th><td></td></tr>
    <tr><th>Address:</th><td></td></tr>
    <tr><th>Phone No:</th><td></td></tr>
  </table>
  <br/><br/>
  <pagebreak>
  <table width="100%" border="0" class="tableBorder" cellpadding="0" cellspacing="0">
    <tr><th colspan="4" class="head">NEXT OF KIN INFORMATION</th></tr>  
    <tr>
      <th>Name:</th>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th>Relationship:</th>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th width="25%">Residential Address:</th>
      <td width="45%"></td>
      <th width="13%">Postcode:</th>
      <td width="17%"></td>
    </tr>
    <tr>
      <th>Postal Address:<br/>(if different)</th>
      <td></td>
      <th>Postcode:</th>
      <td></td>
    </tr>
    <tr>
      <th>Phone No (Home):</th>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th>Phone No (Work):</th>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th>Phone No (Mobile):</th>
      <td colspan="3">&nbsp;</td>
    </tr>
    <tr>
      <th>Email:</th>
      <td colspan="3">&nbsp;</td>
    </tr>
  </table>
  <br/><br/>

  <table width="100%" border="0" class="tableBorder" cellpadding="0" cellspacing="0">
    <tr><th colspan="4" class="head">EMPLOYEE SIGNATURE</th></tr>  
    <tr>
      <th width="25%">Signed:</th>
      <td width="45%"><br/><br/><br/><br/><br/><br/><br/><br/></td>
      <th width="13%">Date:</th>
      <td width="17%"></td>
    </tr>
    <tr><td colspan="4">Note: This information will not be provided to another person/entity without your authority.</td></tr>  
  </table>
  <br/><br/>
  <pagebreak>
  <table width="100%" border="0" class="tableBorder" cellpadding="0" cellspacing="0">
    <tr><th colspan="4" class="head">OFFICE USE ONLY</th></tr>  
    <tr>
      <th>Terms of Employment:</th>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th>Job Title/Classification:</th>
      <td colspan="3">'.$data['job_position'].'</td>
    </tr>
    <tr>
      <th>Commencement Date:</th>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th>Agreed Wage Rate:</th>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th>Applicable Award:</th>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th>Additional Benefits:</th>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th width="25%">Approved and Signed by employer:</th>
      <td width="45%"><br/><br/><br/><br/><br/><br/><br/><br/></td>
      <th width="13%">Date:</th>
      <td width="17%"></td>
    </tr>
  </table>
  <br/><br/>

    ';

  $html .= '</div></body></html>';


?>