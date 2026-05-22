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

  // $servicesName = '';
  // if($data['services_ref_ids']){
  //   $servicesName = array();
  //   foreach(explode(',',$data['services_ref_ids']) as $v){
  //     if(@$data['serviceList'][$v]['name']){$servicesName[] = $data['serviceList'][$v]['name'];}
  //   }
  //   $servicesName = implode(', ', $servicesName);
  // }//End if condition

  $servicesName = '';
    foreach($data['serviceList'] as $v){
      if($dt['varServiceType'] == $v['id']){$servicesName = $data['serviceList'][$dt['varServiceType']]['name'];}
    }//End foreach

  


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
      <title>Service Agreement</title>
      <style>
      p,ul li{font-size:13px;}
      p{line-height:24px;}
      .borderContainer{
        border:2px solid #000;
        padding:5px;
      }
      .fs-16{font-size:16px}
      .tableOfContentHeading{
        color:#4283cc;
        font-size:18px;
        font-weight:400
      }
      .tableOfContentList{
        margin:0px;
        padding:0px;
        margin-left:20px;
      }
      .tableOfContentList li{
        line-height:24px;
      }
      .tableOfContentList .head{
        float: left; 
        width: 96%;
      }
      .tableOfContentList .pageNumber{
        float: right; 
        width: 3%;
        text-align:right;
      }
      .underLine,
      .underlineContent{
        border-bottom:1px solid #000;
        font-size:12px;
      }
      .underLine{
        padding-left:20px
      } 
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
        padding:5px;
      }
      </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  ';

  $html .= '  
    <br/><br/><br/><br/><br/><br/><br/>
    <div style="text-align:center">
      <h1 style="line-height:54px">
        NDIS Service Agreement<br/>
        Between<br/>
        '.$companyDetails['name'].'<br/>
        &<br/>
        Participant / Participant\'s Representative
      </h1>
    </div>
    <br/><br/><br/>
    <div class="borderContainer fs-16"><b>NOTE:</b> A Service Agreement can be made between a participant and an '.$companyDetails['name'].' or a participant\'s representative and a '.$companyDetails['name'].'. A participant\'s representative is someone close to the participant, such as a family member or friend or someone who manages the funding for supports under a participant\'s NDIS plan.</div>
    <pagebreak>
    
    <h1 style="text-align:center;font-weight:400">Table of Contents</h1>
    <b class="tableOfContentHeading">Contents</b>
    <ol class="tableOfContentList">
      <li><div class="head">Parties ........................................................................................................................................... </div> <div class="pageNumber">3</div></li>
      <li><div class="head">Summary ...................................................................................................................................... </div> <div class="pageNumber">3</div></li>
      <li><div class="head">Schedule of Supports .................................................................................................................... </div> <div class="pageNumber">4</div></li>
      <li><div class="head">Responsibilities of '.$companyDetails['name'].' .......................................................................................... </div> <div class="pageNumber">4</div></li>
      <li><div class="head">Responsibilities of the Participant/Participant\'s Representative ................................................... </div> <div class="pageNumber">5</div></li>
      <li><div class="head">Payments - Please select one option ............................................................................................. </div> <div class="pageNumber">5</div></li>
      <li><div class="head">Changes to this Service Agreement  .............................................................................................. </div> <div class="pageNumber">6</div></li>
      <li><div class="head">Ending this Service Agreement ..................................................................................................... </div> <div class="pageNumber">6</div></li>
      <li><div class="head">Feedback, Complaints, and Disputes ............................................................................................ </div> <div class="pageNumber">7</div></li>
      <li><div class="head">Conflict of Interest ........................................................................................................................ </div> <div class="pageNumber">7</div></li>
      <li><div class="head">Goods and Services Tax (GST) ...................................................................................................... </div> <div class="pageNumber">8</div></li>
      <li><div class="head">Contact Details ............................................................................................................................. </div> <div class="pageNumber">8</div></li>
      <li><div class="head">Cancellation Policy ........................................................................................................................ </div> <div class="pageNumber">9</div></li>
      <li><div class="head">Privacy and Confidentiality ........................................................................................................... </div> <div class="pageNumber">9</div></li>
      <li><div class="head">Surveillance Cameras ................................................................................................................... </div> <div class="pageNumber">10</div></li>
      <li><div class="head">Additional Fees/Charges ............................................................................................................... </div> <div class="pageNumber">10</div></li>
      <li><div class="head">Consent ......................................................................................................................................... </div> <div class="pageNumber">10</div></li>
    </ol>
    <pagebreak>


    <h2>1. Parties</h2>
    <p>
      This <b>Service Agreement</b> is for <span class="underlineContent">&nbsp;&nbsp;'.$data['first_name'].' '.$data['last_name'].'&nbsp;&nbsp;</span>, Date of Birth <span class="underlineContent">&nbsp;&nbsp;'.date('d/m/Y',strtotime($data['dateOfBirth'])).'&nbsp;&nbsp;</span>, Address <span class="underlineContent">&nbsp;&nbsp;'.$data['street_address'].'&nbsp;&nbsp;</span>,
      and NDIS Reference number <span class="underlineContent">&nbsp;&nbsp;'.$data['ndisNumber'].'&nbsp;&nbsp;</span>, a participant in the National Disability Insurance Scheme and is made between:
    </p>

      <table border="0" width="100%">
        <tr>
          <td width="40%"><b>[Participant / participant\'s representative</b> (such as a family member or friend)]</td>
          <td width="60%" class="underLine">'.($data['guardianName'] ? $data['guardianName'] : $data['first_name'].' '.$data['last_name']).'</span></td>
        </tr>
      </table>
      <br/>and<br/><br/>
      <table border="0" width="100%">
        <tr>
          <td width="40%"><b>'.$companyDetails['name'].'</b></td>
          <td width="60%"><b>'.$companyDetails['name-pyt'].', ABN'.$abnNumber.'</b></td>
        </tr>
      </table>
      <br/>
      <p>
        This Service Agreement will commence on <span class="underlineContent">&nbsp;&nbsp;'.date('d F Y',strtotime($dt['varCommenceDate'])).'&nbsp;&nbsp;</span> for the period 
        <span class="underlineContent">'.date('d F Y',strtotime($dt['varForThePeriodFrom'])).'</span> to 
        <span class="underlineContent">'.date('d F Y',strtotime($dt['varForThePeriodTo'])).'</span>
      </p>

      <h2>2. Summary</h2>
      <p>This Service Agreement is made for the purpose of providing <span class="underlineContent">&nbsp;&nbsp;'.$servicesName.'&nbsp;&nbsp;</span> Scheme under the participant\'s NDIS plan.</p>
      <p>A copy of the participant\'s NDIS plan is attached to this Service Agreement: <span class="underlineContent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
      <p>he parties agree that this Service Agreement is made in the context of the NDIS rules & guidelines, which is a scheme that aims to:</p>
      <ul class="tableOfContentList">
        <li>Support the independence and social and economic participation of the participant.</li>
        <li>Enable people with a disability to exercise choice and control in the pursuit of their goals and the planning and delivery of their supports.</li>
      </ul>
      <pagebreak>

      <h2>3. Schedule of Supports</h2>
      <p>The supports and their prices are set out in the attached Schedule of Supports. All prices are GST inclusive (if applicable) and include the cost of providing the supports.</p>
      <table width="100%" border="0" class="tableBorder" cellpadding="0" cellspacing="0">
        <tr>
          <th width="20%">Support Name</th>
          <th width="20%">Description of Support</th>
          <th width="20%">Price and Payment information</th>
          <th width="20%">When will supports be provided</th>
          <th width="20%">How the support will be provided</th>
        </tr>
        <tr><td>'.$servicesName.'</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
      </table>

      <h2>4. Responsibilities of '.$companyDetails['name'].'</h2>
      <p>'.$companyDetails['name'].' agreed to:</p>
      <ul class="tableOfContentList">
        <li>Review the provision of <span class="underlineContent">&nbsp;&nbsp;'.$servicesName.'&nbsp;&nbsp;</span> Scheme at each occasion of service with the participant</li>
        <li>Once agreed, '.$companyDetails['name'].' will provide <span class="underlineContent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> that meet the participant\'s needs at the participant\'s preferred day, date and time.</li>
        <li>Communicate openly and honestly in a timely manner.</li>
        <li>Treat the participant with courtesy and respect.</li>
        <li>Consult the participant on decisions about how treatment is provided.</li>
        <li>Give the participant information about managing any complaints or disagreements and details of the '.$companyDetails['name'].'\'s cancellation policy (if relevant).</li>
        <li>Listen to the participant\'s feedback and resolve problems quickly.</li>
        <li>Give the participant a minimum of 24 hours\' notice if the '.$companyDetails['name'].' has to change a scheduled appointment to provide <span class="underlineContent">&nbsp;&nbsp;'.$servicesName.'&nbsp;&nbsp;</span>.</li>
        <li>Live the participant the required notice if the '.$companyDetails['name'].' needs to end the Service Agreement (see ‘Ending this Service Agreement\' below for more information).</li>
        <li>Protect the participant\'s privacy and confidential information.</li>
        <li> Provide support in a manner consistent with all relevant laws, including the National Disability Insurance Scheme Act 2013 and rules, and the Australian Consumer Law; keep accurate records on the supports provided to the participant.</li>
        <li> Issue regular invoices and statements of the <span class="underlineContent">&nbsp;&nbsp;'.$servicesName.'&nbsp;&nbsp;</span> delivered to the participant as per the Terms of Business for Registered '.$companyDetails['name'].'.</li>
        <li>Storing your information carefully and making sure it is kept private.</li>
        <li>Obeying all the rules and laws that apply. This includes the National Disability Insurance Scheme Act 2013, the National Disability Insurance Scheme Rules and the NDIS Commission Requirements.</li>
        <li>'.$companyDetails['name'].' will provide invoices and statements for supports, if the client requests. And, whenever practical, checking whether GST applies.</li>
      </ul>

      <h2>5. Responsibilities of the Participant/Participant\'s Representative</h2>
      <p>The participant/participant\'s representative agrees to:</p>
      <ul class="tableOfContentList">
        <li>Inform the '.$companyDetails['name'].' about how they wish the <span class="underlineContent">&nbsp;&nbsp;'.$servicesName.'&nbsp;&nbsp;</span> to be delivered to meet the participant\'s needs.</li>
        <li>Treat the '.$companyDetails['name'].' with courtesy and respect.</li>
        <li>Talk to '.$companyDetails['name'].' representative if you have any concerns about the <span class="underlineContent">&nbsp;&nbsp;'.$servicesName.'&nbsp;&nbsp;</span> being provided.</li>
        <li>Give '.$companyDetails['name'].' a minimum of 24 hours\' notice if you cannot make a scheduled appointment; and if the notice is not provided by you, '.$companyDetails['name'].'\'s cancellation policy will apply</li>
        <li>Give '.$companyDetails['name'].' the required notice if you need to end the Service Agreement (see ‘Ending this Service Agreement\' below for more information), and</li>
        <li>Let '.$companyDetails['name'].' know immediately if your NDIS plan is suspended or replaced by a new NDIS plan or you stopped being a participant in the NDIS.<li>
      </ul>

      <h2>6. Payments - Please select one option.</h2>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;<img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/> &nbsp;&nbsp;<b>NDIA Managed</b></p>
      <p>The '.$companyDetails['name'].' will seek payment for their provision of supports after the participant or their representative confirms satisfactory delivery by signing the client time sheet.</p>
      <p>The participant has nominated the NDIA to manage the funding for supports provided under this service agreement. After providing those supports, '.$companyDetails['name'].' will claim payment for those supports from the NDIA.</p>
      <p>Invoices will be issued directly to the NDIA.</p>

      <p>&nbsp;&nbsp;&nbsp;&nbsp;<img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/> &nbsp;&nbsp;<b>Self-Managed</b></p>
      <p>The '.$companyDetails['name'].' will seek payment for their provision of supports after the participant or their representative confirms satisfactory delivery by signing the client time sheet.</p>
      <p>The participant has chosen to self-manage the funding for NDIS supports provided under this service agreement. After providing those supports, '.$companyDetails['name'].' will send the participant an invoice for those supports for the participant to pay. The participant will pay the invoice by Cheque/Direct Deposit/Direct Debit/Credit Card within 7 days.</p>
      
      <pagebreak>

      <p>&nbsp;&nbsp;&nbsp;&nbsp;<img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/> &nbsp;&nbsp;<b>Participant\'s Nominee</b></p>
      <p>The '.$companyDetails['name'].' will seek payment for their provision of supports after the participant or their representative confirms satisfactory delivery by signing the client time sheet.</p>
      <p>The participant\'s Nominees manage the funding for supports provided under this Service Agreement. After providing those supports, '.$companyDetails['name'].' will send the participant\'s Nominee an invoice for those supports for the participant\'s Nominee to pay. The participant\'s Nominee will pay the invoice by Cheque/Direct Deposit/Direct Debit/Credit Card within 7 days.</p>
      
      <p>&nbsp;&nbsp;&nbsp;&nbsp;<img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/> &nbsp;&nbsp;<b>Registered Plan Management</b></p>
      <p>The '.$companyDetails['name'].' will seek payment for their provision of supports after the participant or their representative confirms satisfactory delivery by signing the client time sheet.</p>
      <p>The participant has nominated the Plan Management 
      <span class="underlineContent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      to manage the funding for NDIS supports provided under this Service Agreement. After providing those supports, '.$companyDetails['name'].' will claim payment for those supports from 
      <span class="underlineContent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      .</p>
      <p>The Plan Manager will pay the invoice by Cheque/Direct Deposit/Direct Debit/Credit Card within 7 days.</p>
      

      <h2>7. Changes to this Service Agreement</h2>
      <p>In all circumstances, we will aim to rebook or alter a service rather than cancel, where this is appropriate considering operational and staff requirements. Temporary alterations to the scheduled services can be made with the agreement of both the Participant / Participant\'s Representative and '.$companyDetails['name'].'. No charge will apply if prior notice of twenty four (24) hours or more is provided by the Participant / Participant\'s Representative.</p>
      <p>If permanent changes to supports or their delivery are required, then the Participant / Participant\'s Representative and '.$companyDetails['name'].' agree to discuss and review this Service Agreement. Changes to this Service Agreement will be in writing, signed and dated by the Participant / Participant\'s Representative and '.$companyDetails['name'].'.</p>

      <h2>8. Ending this Service Agreement</h2>
      <p>This Agreement may be terminated at any time by either the Participant / Participant\'s Representative or by '.$companyDetails['name'].' by giving one month written notice.</p>
      <p>'.$companyDetails['name'].' may suspend or terminate the Agreement immediately if any staff member is placed in a situation that compromises their safety or welfare. This will be enforced immediately via verbal confirmation, followed by a written notice outlining the concerns and actions taken by '.$companyDetails['name'].'.</p>

      <h2>9. Feedback, Complaints, and Disputes</h2>
      <p>'.$companyDetails['name'].' is committed to providing a high standard of services and supports.</p>
      <p>The Participant / Participant\'s Representative is entitled to make complaints without fear of retribution. Our organization welcomes feedback so that we can continue to provide quality support and continuous improvement to our services.</p>
      <p>If the participant wishes to give the '.$companyDetails['name'].' feedback, the participant can talk to Contact Person on <b>'.$companyDetails['operationsPersonContact'].'</b> or <a href="mailto:'.$companyDetails['emailOperations'].'">'.$companyDetails['emailOperations'].'</a>.</p>
      <p>If the participant is not happy with the provision of 
      <span class="underlineContent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      and wishes to make a complaint, the participant can talk to <b>'.$companyDetails['director_1_number'].' - '.$companyDetails['director_1_name'].' - Director</b></p>
      <p>If the participant is not satisfied or does not want to talk to this person, the participant can contact on the following:</p>
      <ul class="tableOfContentList">
        <li>NDIS: 1800 800 110</li>
        <li>NDIS Commissioner: 1800 035 544</li>
        <li>The Australian Human Rights Commission: 1300 656 419</li>
        <li>VIC Ombudsman: 03 9613 6222<li>
      </ul>

      <h2>10. Conflict of Interest</h2>
      <p>'.$companyDetails['name'].' recognizes a Conflict of Interest may occur when assisting customers with financial management of their plan, providing coordination supports and access services. Where potential and/or actual conflict of interest occurs, we ensure that customers and their chosen representatives are aware and are provided with the knowledge and information to make informed choices and decisions. This includes ensuring that a customer\'s choice of services is not limited to those provided by '.$companyDetails['name'].'.</p>
      
      <pagebreak>

      <h2>11. Goods and Services Tax (GST) </h2>
      <p>For the purposes of GST legislation, the Parties confirm that:</p> 
      <ul class="tableOfContentList">
        <li>A supply of <span class="underlineContent">&nbsp;&nbsp;'.$servicesName.'&nbsp;&nbsp;</span> under this Service Agreement is a supply of one or more of the reasonable and necessary supports specified in</li>
        <li>The statement included, under subsection 33(2) of the National Disability Insurance Scheme Act 2013 (NDIS Act), in the participant\'s NDIS plan currently in effect under section 37 of the NDIS Act;</li>
        <li> The participant\'s NDIS plan is expected to remain in effect during the period the <span class="underlineContent">&nbsp;&nbsp;'.$servicesName.'&nbsp;&nbsp;</span> are provided; and</li>
        <li>The <span class="underlineContent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        will immediately notify the '.$companyDetails['name'].' if the participant\'s NDIS Plan is replaced by a new plan or the participant stops being a participant in the NDIS.<li>
      </ul>  
      
      <h2>12. Contact Details</h2>
      <p>The participant or the participant\'s representative can be contacted on:</p>
      <table width="100%" border="0" class="tableBorder" cellpadding="0" cellspacing="0">
        <tr><th width="20%">Phone</th><td width="80%"></td></tr>
        <tr><th>Mobile</th><td>'.$data['contactNumber'].'</td></tr>
        <tr><th>Email</th><td>'.$data['email'].'</td></tr>
        <tr><th>Address</th><td>'.$data['street_address'].'</td></tr>
        <tr><th>Alternative contact person</th><td></td></tr>
      </table>
      <p>The '.$companyDetails['name'].' ('.$companyDetails['name'].') can be contacted on:</p>
      <table width="100%" border="0" class="tableBorder" cellpadding="0" cellspacing="0">
        <tr><th width="20%">Contact name</th><td width="80%">'.$companyDetails['managerName'].' and '.$companyDetails['director_1_name'].'</td></tr>
        <tr><th>Phone</th><td>'.$companyDetails['managerNumber'].' and '.$companyDetails['director_1_number'].'</td></tr>
        <tr><th>Email</th><td><a href="mailto:'.$companyDetails['emailSupport'].'">'.$companyDetails['emailSupport'].'</td></tr>
        <tr><th>Address</th><td>'.$companyDetails['address'].'</td></tr>
      </table>

      <pagebreak>

      <h2>13. Cancellation Policy</h2>
      <p>The Participant / Participant\'s Representative will provide 24 hours prior notice of a cancellation request</p>
      <p>In the event of a cancellation with less than 24 hours\' notice, '.$companyDetails['name'].' will charge the NDIS one (1) hour\'s value late fee. The NDIS has specific provisions which allow that a late fee can only be charge to a maximum of eight (8) times per calendar year. Any additional incidents of cancellations without 24 hour notice beyond the eight (8) allowed by the NDIS may incur the full service fee being charged directly to the Participant / Participant\'s Representative. '.$companyDetails['name'].' aims:</p>
      <ul class="tableOfContentList">
        <li>To reflect the requirements of the NDIS Terms of Business for Registered '.$companyDetails['name'].' and the NDIA Price Guide.</li>
        <li>To balance customer and organizational interests in relation to cancellations and no-shows.</li>
        <li>To make all reasonable attempts to ensure the safety of customers who are no shows</li>
      </ul> 

      <h2>14. Privacy and Confidentiality</h2>
      <p>'.$companyDetails['name'].' will need to collect personal information about you which will assist us to give you the best care possible. This information will be stored in your personal record and will remain confidential as far as is legally permissible. '.$companyDetails['name'].' will write to advise you if your personal information becomes compromised</p>
      <p>'.$companyDetails['name'].' complies with State / Territory and Commonwealth legislation regarding</p>
      <ol type="a" class="tableOfContentList">
        <li>Collection, use and disclosure of your personal information</li>
        <li>Your rights to access your personal information</li>
        <li>Your right to withdraw consent to the release of personal information at anytime</li>
      </ol>
      <p>You are entitled to request access to your information and ask for amendments to be made to information that may be incorrect or out of date. </p>
      <p>There may be occasions when it is beneficial to you if we are able to inform family, doctors, hospital staff and other service providers in regard to your health and services being provided.</p>
      <p>There may be occasion where consent to access your information may be denied or limited. In this instance the reasons and limits will be explained to you</p>
    
      <pagebreak>

      <h2>15. Surveillance Cameras</h2>
      <p>When you engage '.$companyDetails['name'].' to deliver services in your home, certain workplace rules and regulations apply. As a customer of '.$companyDetails['name'].', you must advise our staffs if surveillance cameras are being used to monitor your home, including; identifying their locations and ensuring warnings are displayed as to their use. If a customer or their representative has concerns about the practices of an staff following the observation of footage, these must be raised with the relevant '.$companyDetails['name'].' office, not with the support professional directly.</p>
    
      <h2>16. Additional Fees/Charges</h2>
      <p>If services provided by '.$companyDetails['name'].' at the request of the Participant / Participant\'s Representative exceed the allocated NDIS funding, it is the Participant\'s / Participant\'s Representative\'s responsibility to pay the outstanding balance in accordance with the specified NDIS fee structure.</p> 
      <p>Additional expenses not specified in the Service Support Table are the responsibility of the Participant / Participant\'s Representative, and will be invoiced directly to the Participant / Participant\'s Representative. For example, entry fees, event tickets, meals and accommodation for both you and your support professional. Transport in a supports professional\'s vehicle will be charged at a rate of $1 per KM as well as any parking costs.</p>
      <p>For services provided as fee for service, '.$companyDetails['name'].' may alter the private fees and charges in line with the financial year, and will provide customers with four (4) weeks\' notice prior to implementing any revised rates.</p>
      <p>'.$companyDetails['name'].' may increase NDIS price limits in line with the financial year and/or when an updated NDIS Price Guide is released from the NDIA. '.$companyDetails['name'].' will work with you to discuss these changes and work within the terms of the current NDIS Price Guide.</p>

      <h2>17. Consent</h2>
      <p>'.$companyDetails['name'].' Services commits to respecting and upholding individuals\' rights and their right to protect and access their personal information. We collect your information to provide you with the best and most appropriate linkages and referrals you require.</p>
      <p>Please note the word ‘Participant\' will be used with reference to you, as a user of the National Disability Insurance Scheme (NDIS).</p>
      <p>We protect the collection, use and disclosure of your personal, health and medical information in accordance with the Commonwealth Privacy Legislation and the Health Records Act 2001. We will only disclose information with your prior consent.</p>
      <p>By authorizing services I give</p>
      <ol class="tableOfContentList">
        <li>Written Consent</li>
        <li>Verbal Consent</li>
        <li>Do not have capacity to provide consent</li>
      </ol>

      <p><i><b>Note: consent can be provided on behalf of participant</b></i></p>
      <p>
        <span class="underlineContent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        (Name of person acting on behalf of participant*)
      </p>
      <p><b><i>*Person/s acting on behalf of the participant must be documented as parent and/or legal guardian or nominated representative</i></b></p>
      <p>'.$companyDetails['name'].' Services has discussed with me how my information will be collected, used, stored and disclosed. I have been given a copy of the information. I understand and give consent for my information to be collected, used, stored and shared.</p>
      <p><b><i>Note: Information may still be shared when necessary to provide a health service and/or to comply with request from statutory body</i></b></p>
      
      <h2>Checklist for Service Agreement for Participant only</h2>
      <table border="0" width="100%">
        <tr>
          <td width="5%" valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td width="95%">I know who is making the Agreement</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>This might be me and my service '.$companyDetails['name'].', or it might be my trusted person and my service '.$companyDetails['name'].'. </td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I know what supports to include.</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I know what is expected of me.</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I know what is expected of my service '.$companyDetails['name'].'.</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I know how the supports will be paid for.</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I know what to do if I want to make changes.</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I know what to do if I want to end the Agreement.</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I know what to do if I have a problem and I know who to contact.</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I have written my Service Agreement, or I have worked with my '.$companyDetails['name'].' to write the Agreement.</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I have signed the Agreement.</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I have attached my NDIS Plan to the Agreement if I want to.</td>
        </tr>
        <tr>
          <td valign="top"><img style="vertical-align:middle" src="'.$pdfOrImagePath.'/check-box-uncheck.jpg" width="15px"/></td>
          <td>I have kept a copy of the Agreement for my records.</td>
        </tr>
      </table>      
      
      <pagebreak>

      <h2 style="text-align:center">Agreement Signatures</h2>
      <br/><br/>
      <p>The parties agree to the terms and conditions of this Service Agreement.</p>
      
      <br/><br/><br/><br/><br/>
      <table border="0" width="100%">
        <tr>
          <td width="45%" class="underline">&nbsp;</td>
          <td width="10%"></td>
          <td width="45%" class="underline">'.($data['guardianName'] ? $data['guardianName'] : $data['first_name'].' '.$data['last_name']).'</td>
        </tr>
        <tr>
          <td>Signature of [participant/participant\'s representative]</td>
          <td></td>
          <td>Name of [participant/participant\'s representative] </td>
        </tr>
      </table>

      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <table border="0" width="100%">
        <tr>
          <td width="45%" class="underline">&nbsp;</td>
          <td width="10%"></td>
          <td width="45%" class="underline">'.$companyDetails['managerName'].'</td>
        </tr>
        <tr>
          <td>Signature of authorized person from '.$companyDetails['name'].'</td>
          <td></td>
          <td>Name of authorized person from '.$companyDetails['name'].'</td>
        </tr>
      </table>

      <br/><br/>
      Date: '.date('d-m-Y',strtotime($server_date)).'

      ';

  $html .= '</div></body></html>';


?>