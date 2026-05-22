<?php


  #Header ---------------------------------//
  $header = "
    <div style='margin:0px 0px;'>
      <table border='0' style='width:100%;padding:0;border-collapse: collapse;'>
        <tr>
          <td width='50%' style='text-align:left;'><img align='left' src='$pdfOrImagePath/logo-company.png' width='100px'></td>
          <td width='50%' style='text-align:right;'><img align='right' src='$pdfOrImagePath/NDIS-logo.png' width='100px'></td>
        </tr>
      </table>
      <h2 style='text-align:center;'>".$data['doc_name']."</h2><br/>
      <!--hr style='margin:5px 0px;border: 0.5pt solid #ccc'/-->
    </div>
  ";
  //---------------------------------------//  
  $footer = '
    <hr style="margin:5px 0px;border: 1px solid #e96b28"/>
    <table width="100%" border="0" style="font-size:12px">
      <tr>
        <td width="50%">Provider Number # '.$providerNumber.'</td>
        <td width="50%" style="text-align:right">ABN # '.$abnNumber.'</td>
      </tr>
    </table>
  ';

  $html = '<html>
  <head>
      <title>'.$data['doc_name'].'</title>
      <style>
        .underLine{
          border-bottom:1px solid #000;
          font-size:12px;
          padding-left:20px
        }
        .text-right{text-align:right}
        .table{
          width:100%;
          border-collapse: collapse;
        }
        .table tr td, .table tr th{font-size:12px;border:1px solid #666;padding: 9px 10px;border-right:none;border-bottom:none}
        .tbr{border-right:1px solid #666;border-bottom:1px solid #666}
      </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  ';

  $html .= '  
    <table width="100%" border="0">
      <tr>
        <td width="15%">
          Client Name:
        </td>
        <td width="30%" class="underLine">
          '.$data['first_name'].' '.$data['last_name'].'
        </td>
        <td width="18%" class="text-right">
          Date of Birth:
        </td>
        <td width="37%" class="underLine">
          '.$data['dateOfBirth'].'
        </td>
      </tr>
    </table>
    <br/><br/>
    <table width="100%" border="0">
    <tr>
      <td width="15%">
        NDIS Number:
      </td>
      <td width="85%" class="underLine">
        '.$data['ndisNumber'].'
      </td>
    </tr>
  </table>
  <br/><br/>
  <p>The following documents must be retained on each client file, as a minimum:</p>
  <table width="100%" class="table tbr">
    <tr>
      <th width="5%"></th>
      <th width="25%">Document</th>
      <th width="20%">Date Added to File</th>
      <th width="50%">Comments</th>
    </tr>
    <tr>
      <td><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-checked.jpg" width="15px"/></td>
      <td>Client File Checklist</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-checked.jpg" width="15px"/></td>
      <td>Participant Referral Form</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-checked.jpg" width="15px"/></td>
      <td>Client Initial Support Assessment Form</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-checked.jpg" width="15px"/></td>
      <td>NDIS Service Agreement</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-checked.jpg" width="15px"/></td>
      <td>Client Care Plan</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-checked.jpg" width="15px"/></td>
      <td>Client Handbook</td>
      <td></td>
      <td></td>
    </tr>
  </table>
  <br/><br/><br/><br/>
  <table width="100%" border="0">
    <tr>
      <td width="20%">Date File Opened:</td>
      <td width="30%" class="underLine">'.date('d / m / Y',strtotime($server_date)).'</td>
      <td width="13%" class="text-right">Signature:</td>
      <td width="37%" class="underLine"></td>
    </tr>
  </table>
  <br/><br/><br/><br/>
  <table width="100%" border="0">
    <tr>
      <td width="20%">Date File Closed:</td>
      <td width="30%" class="underLine">'.date('d / m / Y', strtotime($dt['varDateOfFileClosed'])).'</td>
      <td width="13%" class="text-right">Signature:</td>
      <td width="37%" class="underLine"></td>
    </tr>
  </table>  
  ';
  $html .= '</div></body></html>';


?>