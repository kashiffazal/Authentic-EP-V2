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
      <br/><br/>
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
      <title>Initial Support Assessment Form</title>
      <style>
        .tableBoxContainer{
          border:2px solid #000;
          padding:5px;
        } 
        .underLine,
        .underLineNoPadding{
          border-bottom:1px solid #000;
          font-size:12px;
          padding-left:20px
        }
        .underLineNoPadding{
          padding-left:0px;
        }
        .empty-box-content,
        .box-content{
          font-size:12px;
          border : 1px solid #000;
          padding:10px;
          text-align : justify;
        }
        .empty-box-content{
          height:20px;
        }
        .signBox{
          padding-bottom:63px
        }
        .text-right{text-align:right}
      </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  ';

  $html .= '
    <h2 style="text-align:center;">'.$data['doc_name'].'</h2><br/>
    <div class="tableBoxContainer">
      <table width="100%" border="0">
        <tr>
          <td width="10%">Date:</td>
          <td width="20%" class="underLine">'.date('d / m / Y',strtotime($dt['varDocumentDate'])).'</td>
          <td width="28%" class="text-right">Assessing Staff Member:</td>
          <td width="42%" class="underLine">'.$companyDetails['assigningStaffMember'].'</td>
        </tr>
      </table>
      <div style="padding-top:15px;padding-left:5px">
        <img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/> &nbsp;&nbsp;
        NDIS Plan attached (if applicable)
      </div>
    </div>

    <h4>CLIENT DETAILS</h4>
    <div class="tableBoxContainer">
      <table width="100%" border="0">
        <tr>
          <td width="15%">First Name:</td>
          <td width="20%" class="underLine">'.$data['first_name'].'</td>
          <td width="15%" class="text-right">Last Name:</td>
          <td width="50%" class="underLine">'.$data['last_name'].'</td>
        </tr>
      </table>
      <table width="100%" border="0">
        <tr>
          <td width="15%">Date of Birth:</td>
          <td width="20%" class="underLine">'.date('d / m / Y',strtotime($data['dateOfBirth'])).'</td>
          <td width="15%" class="text-right">Age:</td>
          <td width="20%" class="underLine">'.floor(abs(strtotime($server_date) - strtotime($data['dateOfBirth'])) / (365*60*60*24)).' Years</td>
          <td width="10%" class="text-right">Gender:</td>
          <td width="20%" class="underLine">'.$data['gender'].'</td>
        <tr>
      </table>
    </div>

    <h4>GUARDIAN DETAILS (if applicable)</h4>
    <div class="tableBoxContainer">
      <table width="100%" border="0">
        <tr>
          <td width="13%">Full Name:</td>
          <td width="27%" class="underLine">'.$data['guardianName'].'</td>
          <td width="10%" class="text-right">Address:</td>
          <td width="50%" class="underLine">'.$data['guardianAddress'].'</td>
        </tr>
      </table>
      <table width="100%" border="0">
        <tr>
          <td width="13%">Suburb:</td>
          <td width="27%" class="underLine">'.$data['guardianSubrub'].'</td>
          <td width="10%" class="text-right">State:</td>
          <td width="12%" class="underLine">'.$data['guardianState'].'</td>
          <td width="18%" class="text-right">Phone Number:</td>
          <td width="20%" class="underLine">'.$data['guardianMobNumber'].'</td>
        </tr>
      </table>
    </div>

    <h4>SUPPORTER INVOLVEMENT</h4>
    <p>Does the client or their guardian have a preference regarding family, friend and/or advocate involvement? If so, how will they be supported to participate?</p>
    '.($dt['varSupporterInvolvement'] ? '<div class="box-content">'.$dt['varSupporterInvolvement'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">'.$dt['varSupporterInvolvement'].'</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->

    <h4>COMMUNICATION AND ACCESSIBILITY NEEDS</h4>
    <p>Does the client have any specific communication or accessibility needs? If so, list these along with strategies to support them.</p>
    '.($dt['varCommunicationAndAccessibilityNeeds'] ? '<div class="box-content">'.$dt['varCommunicationAndAccessibilityNeeds'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->

    <h4>HEALTH, WELLBEING AND SAFETY REQUIREMENTS</h4>
    <p>Does the client have any health, wellbeing or safety needs that need to be considered in service delivery?</p>
    '.($dt['varHealthWellbeingAndSafetyRequirements'] ? '<div class="box-content">'.$dt['varHealthWellbeingAndSafetyRequirements'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->

    <h4>JOINT PLANNING / CASE COORDINATION</h4>
    <p>Is there any joint planning and case coordination with other services that involve the client?</p>
    '.($dt['varJointPlanningCaseCoordination'] ? '<div class="box-content">'.$dt['varJointPlanningCaseCoordination'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->

    <h4>CONNECTION</h4>
    <p>(IF APPLICABLE) Does the client (or their guardian, if applicable) have any preferences regarding their connection to their Aboriginal and Torres Strait Islander culture and community?</p>
    '.($dt['varConnectionIfApplication1'] ? '<div class="box-content">'.$dt['varConnectionIfApplication1'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->

    <br/>
    <p>(IF APPLICABLE) Does the client (or their guardian, if applicable) have any preferences regarding their cultural, spiritual and/or language connection?</p>
    '.($dt['varConnectionIfApplication2'] ? '<div class="box-content">'.$dt['varConnectionIfApplication2'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->
    
    <br/>
    <p>Does the client (or their guardian, if applicable) have any preferences regarding their links to family, friendships and other support networks?</p>
    '.($dt['varConnectionDoesTheClient'] ? '<div class="box-content">'.$dt['varConnectionDoesTheClient'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->

    <br/>
    <p>What barriers to community participation exist for the client? What strategies will be put in place to help the client overcome these?</p>
    '.($dt['varConnectionWhatBarrier'] ? '<div class="box-content">'.$dt['varConnectionWhatBarrier'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->

    <h4>PERSONAL REFLECTION</h4>
    <p>What are the client\'s:</p>
    '.($dt['varPersonalGoals'] ? '<div class="box-content"><b>Goals?&nbsp;&nbsp;&nbsp;&nbsp;</b>'.$dt['varPersonalGoals'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td width="15%">Goals? </td><td width="85%" class="underLine"></td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>      
    </table-->
    <br/>
    '.($dt['varPersonalStrengths'] ? '<div class="box-content"><b>Strengths?&nbsp;&nbsp;&nbsp;&nbsp;</b>'.$dt['varPersonalStrengths'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td width="15%">Strengths? </td><td width="85%" class="underLine"></td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>      
    </table-->
    <br/>
    '.($dt['varPersonalNeeds'] ? '<div class="box-content"><b>Needs?&nbsp;&nbsp;&nbsp;&nbsp;</b>'.$dt['varPersonalNeeds'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td width="15%">Needs? </td><td width="85%" class="underLine"></td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>      
    </table-->
    <br/>
    '.($dt['varPersonalWishes'] ? '<div class="box-content"><b>Wishes?&nbsp;&nbsp;&nbsp;&nbsp;</b>'.$dt['varPersonalWishes'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td width="15%">Wishes? </td><td width="85%" class="underLine"></td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>
      <tr><td colspan="2" class="underLine">&nbsp;</td></tr>      
    </table-->
    <br/>
    <p>How can '.$companyDetails['name'].' support these things?</p>
    '.($dt['varPersonalHowCanSupportThings'] ? '<div class="box-content">'.$dt['varPersonalHowCanSupportThings'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->
    <br/>
    <p>How can '.$companyDetails['name'].' support the client to develop, maintain and strengthen their independence, problem solving, social and self-care skills (appropriate to their age, developmental stage and cultural circumstances)?</p>
    '.($dt['varPersonalHowCanSupportClients'] ? '<div class="box-content">'.$dt['varPersonalHowCanSupportClients'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->

    <h4>SERVICE DELIVERY</h4>
    <p>How, when and where will '.$companyDetails['name'].' supports be delivered?</p>
    '.($dt['varServiceDeliveryDelivered'] ? '<div class="box-content">'.$dt['varServiceDeliveryDelivered'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->
    <br/>
    <p>What other actions will be taken by '.$companyDetails['name'].' to support service delivery? Can referrals and linkages to other services and activities that will enhance the client\'s community participation be provided?</p>
    '.($dt['varServiceDeliverySupport'] ? '<div class="box-content">'.$dt['varServiceDeliverySupport'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
      <tr><td class="underLine">&nbsp;</td></tr>
    </table-->
    <br/>
    <p>How often will service delivery be reviewed?</p>
    '.($dt['varServiceDeliveryReviewed'] ? '<div class="box-content">'.$dt['varServiceDeliveryReviewed'].'</div>' : '<div class="empty-box-content">&nbsp;</div>').'
    <!--table width="100%" border="0">
      <tr><td class="underLine"></td></tr>
    </table-->

    <pagebreak>

    <h4>AGREEMENT</h4>
    <img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/> &nbsp;&nbsp;
    All parties agree with this Support Assessment.<br/>
    <img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/> &nbsp;&nbsp;
    A copy of this Support Assessment has been provided to the client (or guardian, if applicable)<br/>
    
    <br/>
    <h4>Client/Guardian</h4>
    <table width="100%" border="0">
        <tr>
          <td width="50%">
            <table width="100%" border="0" class="tableBoxContainer">
              <tr><td>Full Name:</td></tr>
              <tr><td class="underLineNoPadding">'.($data['guardianName'] ? $data['guardianName'] : $data['first_name'].' '.$data['last_name']).'</td></tr>
              <tr><td>Date:</td></tr>
              <tr><td class="underLineNoPadding">&nbsp;</td></tr>
            </table>
          </td>
          <td width="50%" valign="top">
            <table width="100%" border="0" class="tableBoxContainer">
              <tr><td class="signBox">Signature Client/ Guardian:</td></tr>
            </table>
          </td>
        </tr>
    </table>

    <br/>
    <h4>Assessing Staff Member</h4>
    <table width="100%" border="0">
        <tr>
          <td width="50%">
            <table width="100%" border="0" class="tableBoxContainer">
              <tr><td>Full Name:</td></tr>
              <tr><td class="underLineNoPadding">'.$companyDetails['assigningStaffMember'].'</td></tr>
              <tr><td>Date:</td></tr>
              <tr><td class="underLineNoPadding">&nbsp;</td></tr>
            </table>
          </td>
          <td width="50%" valign="top">
            <table width="100%" border="0" class="tableBoxContainer">
              <tr><td class="signBox">Signature of Staff Member:</td></tr>
            </table>
          </td>
        </tr>
    </table>
    ';

  $html .= '</div></body></html>';


?>