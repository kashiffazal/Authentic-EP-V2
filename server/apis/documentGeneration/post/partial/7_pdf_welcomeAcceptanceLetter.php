<?php


  $name = $data['first_name'].' '.$data['last_name'];

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
      <title>Welcome Acceptance Letter</title>
      <style>
      p,ul li,ol li{font-size:13px;}
      p{line-height:24px;}
      .underlineContent{
        border-bottom:1px solid #000;
        font-size:12px;
      }
      </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  <h2 style="text-align:center">Welcome Acceptance Letter</h2>
  <p>'.date('jS M Y',strtotime($server_date)).'<br/><br/>
  '.$name.'<br/>
  '.$data['street_address'].'<br/><br/></p>
  <p>Dear '.$name.',</p>
  <p>I\'d like to welcome you to '.$companyDetails['name-pyt'].'. We are excited that you have accepted our job offer and agreed upon your start date. I trust that this letter finds you mutually excited about your new employment with '.$companyDetails['name-pyt'].'</p>
  <p>As mentioned during the interviews, while your new position reports to me, I\'d like to welcome you to the Support Workers department on behalf of all the staff. Each of us will play a role to ensure your successful integration into the department.</p>
  <p>We\'re expecting you for new staff orientation on 
  <span class="underlineContent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.date('d / m / Y',strtotime($dt['varOrientationOn'])).'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  You will meet with me online over skype to discuss your successful integration into our company and with Human Resources staff to learn about employment related issues.</p>
  <p>Again, welcome to the team. If you have questions prior to your start date, please call me at any time, or send me an email, if that is more convenient. We look forward to having you come on board.</p>
  <p>Regards,</p>
  <br/><br/>

  <p>
    '.$companyDetails['managerName'].'<br/>
    '.$companyDetails['name-pyt'].'<br/>
    CEO & General Manager
  </p>
 
';

  $html .= '</div></body></html>';


?>