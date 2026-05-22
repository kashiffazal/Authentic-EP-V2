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
      <title>Employment Offer Letter</title>
      <style>
      p,ul li,ol li{font-size:13px;}
      p{line-height:24px;}
      .list{
        margin:0px;
        padding:0px;
        margin-left:20px;
      }
      .list li{
        line-height:24px;
      }
      .underLine,
      .underlineContent{
        border-bottom:1px solid #000;
        font-size:12px;
      }
      .underLine{
        padding-left:20px
      } 
      </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  <p>'.date('jS M Y',strtotime($server_date)).'<br/><br/>
  <b>Private and confidential</b><br/>
  '.$name.'<br/>
  '.$data['street_address'].'<br/><br/></p>
  <p>Dear '.$name.',<p/>
  <h2 style="text-align:center">Employment Offer Letter</h2>
  <p>I am pleased to offer you casual employment in the position of Support Worker/Cleaner with us at '.$companyDetails['name-pyt'].'. (\'the employer\') on the terms and conditions set out in this letter.</p>
  <ol class="list">
    <li>
      <b>Position</b>
      <ol class="list">
        <li>Your employment will be on a casual basis, as required.</li>
        <li>Each occasion that you work will be a separate contract of employment which ceases at the end of that engagement.</li>
        <li>As a casual staff, there is no guarantee of ongoing or regular work.</li>
        <li>The duties of this role are in the attached position description. On each occasion that you work you will be required to perform these duties and any other duties the employer may assign to you, having regard to your skills, training and experience.</li>
        <li>You will be required to perform your duties as reasonably directed by the employer.</li>
      </ol>
    </li>
    <li>
      <b>Terms and conditions of employment </b>
      <ol class="list">
        <li>Unless more generous provisions are provided in this letter or in the attached Schedule, the terms and conditions of your employment will be those set out in the Social, Community, Home Care and Disability Services Industry Award 2010 [MA000100] and applicable legislation. This includes, but is not limited to, the National Employment Standards in the Fair Work Act 2009. Neither the Social, Community, Home Care and Disability Services Industry Award 2010 [MA000100] nor any applicable legislation are incorporated into your contract of employment.</li>
        <li>Your employment may be terminated at any time by providing you with notice, to apply at the end of your current engagement.</li>
        <li>The additional terms and conditions set out in the attached Schedule will also apply to your employment. </li>
      </ol>
    </li>
    <li>
      <b>Remuneration</b> 
      <ol class="list">
        <li>You will be paid at the rate of $28 per hour, including the applicable casual loading.</li>
        <li>You will be paid fortnightly to the bank account nominated by you.</li>
        <li>The employer will also make superannuation payments on your behalf in accordance with the Superannuation Guarantee (Administration) Act 1992. </li>
        <li>Your remuneration will be reviewed annually and may be increased at the employer’s discretion.</li>
      </ol>
      <br/><br/><br/>
    </li>
    <li>
      <b>Your obligations to the employer</b> 
      <ol class="list">
        <li>
          You will be required to:
          <ol type="(a)">
            <li>Perform all duties to the best of your ability at all times;</li>
            <li>Use your best endeavors to promote and protect the interests of the employer; and</li>
            <li>Follow all reasonable and lawful directions given to you by the employer, including complying with policies and procedures as amended from time to time. These policies and procedures are not incorporated into your contract of employment.</li>
          </ol>
        </li>
      </ol>
    </li>
    <li>
      <b>Confidentiality</b>
      <ol class="list">
        <li>By accepting this letter of offer, you acknowledge and agree that you will not, during the course of your employment or thereafter, except with the consent of the employer, as required by law or in the performance of your duties, use or disclose confidential information relating to the business of the employer, including but not limited to client lists, trade secrets, client details and pricing structures.</li>
      </ol>
    </li>
    <li>
      <b>Entire agreement</b>
      <ol class="list">
        <li>The terms and conditions referred to in this letter constitute all the terms and conditions of your employment and replace any prior understanding or agreement between you and the employer.</li>
        <li>The terms and conditions referred to in this letter may only be varied by a written agreement signed by both you and the employer.</li>
      </ol>
    </li>
  </ol>
  <p>If you have any questions about the terms and conditions of employment, please don’t hesitate to contact '.$companyDetails['managerName'].' on <b>'.$companyDetails['managerNumber'].'</b>.</p>

  <pagebreak>
  <p><b>To accept this offer of employment please return a signed and dated copy of this letter to me via HelloSign by '.date('l, jS F',strtotime($server_date)).'.</b></p>
  <p>Yours sincerely,<p>
  <br/><br/><br/><br/><br/><br/>



  <b>'.$companyDetails['managerName'].'</b><br/>
  CEO & General Manager
  <br/>
  <hr/>

  <h2 style="text-align:center">Acknowledgement by the Staff</h2>
  <p>I, <span class="underlineContent">&nbsp;&nbsp;'.$name.'&nbsp;&nbsp;</span>, have read and understood this letter and accept the offer of employment from '.$companyDetails['name'].' on the terms and conditions set out in the letter. I understand that each engagement will constitute a separate contract of employment between us.</p>
  <br/><br/>
  <table width="100%" border="0">
    <tr>
      <td width="15%">Signed:</td>
      <td width="50%" class="underLine">&nbsp;</td>
      <td width="6%">Date:</td>
      <td width="29%" class="underLine">&nbsp;</td>
    </tr>
  </table>
  <br/>
  <table width="100%" border="0">
    <tr>
      <td width="15%">Print name:</td>
      <td width="85%" class="underLine">&nbsp;</td>
    </tr>
  </table>
  <pagebreak>
  
  <b>Position Description:</b>
  <ul class="list">
    <li>Assessing the practical and emotional needs of a client and drawing up a care plan</li>
    <li>Providing emotional support by talking to clients and listening to their problems and concerns</li>
    <li>Assisting with domestic tasks such as cooking, cleaning, washing and shopping</li>
    <li>Helping clients to budget and handle money</li>
    <li>Helping clients participate in leisure activities</li>
    <li>Leading meetings in residential or community centres about issues relevant to clients</li>
    <li>Making case notes and completing a logbook.</li>
    <li>Accompanying clients in meetings with other agencies and healthcare professionals</li>
    <li>Training clients in life skills</li>
    <li>Collating data and statistics and undertaking administrative duties</li>
    <li>Working with client\'s families to help them to support clients in the most effective way possible</li>
    <li>Liaising with other support workers, social workers and relevant members of the health care profession</li>
    <li>Attending meetings and training courses with colleagues</li>
  </ul>
  <br/>
  <b>Other duties/responsibilities of Disability Support Workers include:</b>
  <ul class="list">
    <li>Cleaning rooms</li>
    <li>Maintaining record of client progress</li>
    <li>Assessing client to determine continuing needs</li>
    <li>Assistance in building client self-image and self-confidence</li>
    <li>Assisting in developing and implementing client-specific programs to help these individuals build strong social skills and encourage independence whenever possible.</li>
    <li>Working in community-based settings such as group homes or care centres or in some cases provide care in the client’s home.</li>
  </ul>

  
';

  $html .= '</div></body></html>';


?>