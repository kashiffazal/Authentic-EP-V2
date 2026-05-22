<?php

  // $pdfOrImagePath = '';
  // $companyDetails = array('name-pyt' => '');
  // $data = array('doc_name' => 'asdf', 'first_name' => 'Kashif', 'last_name' => 'Fazal');

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
      <!--hr style='margin:5px 0px;border: 0.5pt solid #ccc'/-->
    </div>
  ";
  //---------------------------------------//  
  $footer = '
    <hr style="margin:5px 0px;margin-top:50px;border: 1px solid #e96b28"/>
    <table width="100%" border="0" style="font-size:12px">
      <tr>
          <td width="50%">'.$companyDetails['name-pyt'].'</td>
          <td width="50%" style="text-align: right;"><i>Page {PAGENO} of {nbpg}</td>
      </tr>
    </table>
  ';

  $html = '<html>
  <head>
    <title>'.$data['doc_name'].'</title>
    <style>
      .bar{border-bottom:2px solid #000;}
      .bar2{border-bottom:3px solid #000;}
      .l-blue-c{color:blue}
      ol li,
      p,
      table tr td{font-size:12px}
      ol li{margin-bottom:10px;line-height:20px;}
      .m-0{margin-bottom:0px !important}
      .signBox{
        border-top:1px dotted #000;
        padding-top:7px;
        padding-bottom:70px
      }
      .ol-padding{
        margin:0px;
        padding-left:20px;
      }
      .table1{
        width:100%;
        border-collapse: collapse;
      }
      .table1 tr td{font-size:12px;border:none;padding: 9px 10px;border-bottom:1px solid #666}
      .table1 tr td p{padding-bottom:5px}
    </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  ';

  $html .= '  
      <br/><br/><br/><br/><br/><br/><br/>
      <h1>CASUAL (AWARD) EMPLOYMENT CONTRACT</h1>
      <h1 style="font-weight:400">'.$companyDetails['name-pyt'].'</h1>
      <h2 style="font-weight:400">and</h2>
      <h1 style="font-weight:400">'.$data['first_name'].' '.$data['last_name'].'</h1>
      <pagebreak>
      <p>This Contract</p>
      <p>is made on <b>'.date('M jS Y').'</b></p>
      <p>Between</p>
      <p>See <b>Item 1</b> of the Schedule <b>(Employer)</b></p>
      <p>and</p>
      <p>See <b>Item 2</b> of the Schedule <b>(You)</b></p>
      <div class="bar"></div>
      <p><b>BACKGROUND</b></p>
      <ol class="ol-padding" type="A">
        <li>The Employer has agreed to employ you and you have agreed to work for the Employer in the position described at <b>Item 3</b> of the Schedule.</li>
        <li>The Employer and you have agreed to enter into this Contract to record the terms and conditions of your employment.</li>
        <li class="m-0">The Employer acknowledges its obligation to apply the applicable employment protections to you and to abide by the provisions contained in any relevant legislation.</li>
      </ol>
      <div class="bar"></div>
      <p class="m-0">The Employer And You Agree that:</p>
      <ol class="ol-padding">
        <li>
          <p><b>DEFINITIONS</b></p>
          <p><b>Associated Entities</b> has the same meaning as in the Corporations Act 2001 (Cth).</p>
          <p><b>Confidential Information</b> means all the information including trade secrets, Intellectual Property, marketing and business plans, participant and supplier lists, computer software applications and programs, business contacts, finance, remuneration details, data concerning the Employer or any of its associated entities or any participant of the Employer’s, finances, operating margins, prospect’s lists, and transactions of the Employer, but does not include information in the public domain otherwise than through a breach of an obligation of confidentiality.</p>
          <p><b>Contract</b> means this employment contract.</p>
          <p><b>Intellectual Property</b> means all form of intellectual property rights throughout the world including but not limited to present and future copyright, registered and unregistered trademarks, patent, design, rights, trade mark, any other intellectual or industrial property rights, discovery, invention, secret process or improvement in procedure of any kind whether arising from statute, under common law or in equity and confidential information including know-how and trade-secrets.</p>
          <p><b>Moral Rights</b> has the meaning given to it in the Copyright Act 1968 (Cth) and includes rights of integrity of authorship, rights of attribution of authorship and similar rights that exist or may come to exist anywhere in the world.</p>
          <p><b>The Act</b> means the <i>Fair Work Act 2009 (Cth).</i></p>
          <p><b>Works</b> means all inventions, policies, practices, designs, drawings, plans, software, hardware, reports, documents, systems, improvements and other materials.</p>
          <br/>
        </li>
        <li class="p-m-b">
          <p><b>COMMENCEMENT AND WARRANTIES</b></p>
          <ol class="ol-padding" >
            <li>Your date of commencement of employment with the Employer is identified at <b>Item 4</b> of the Schedule.</li>
            <li>Your continued employment is contingent on having and maintaining an appropriate working visa. Where the visa expires, your employment will be terminated.</li>
            <li>The terms and conditions of your employment will be in accordance with the Contract and, where applicable, the Industrial Instrument as named in <b>Item 5</b> of the Schedule <b>(the Industrial Instrument)</b>, as varied and amended from time to time.</li>
            <li class="p-m-b">
              <p class="p-m-t">You agree that: </p>
              <ol class="ol-padding" type="a">
                <li>you hold the qualifications and have the skills as represented by you to the Employer</li>
                <li>you have disclosed to the Employer any restraint or restriction which may affect your performance of work</li>
                <li>you enter into this contract without any form of coercion</li>
                <li>you are legally entitled to work in Australia, and agree to produce the appropriate documentation where requested by the Employer and</li>
                <li class="p-m-b">you have and will maintain the licences and qualifications necessary to fulfil your role.</li>
              </ol>
            </li>
          </ol>
        </li>
        <li class="p-m-b">
          <p class="p-m-t"> <b>POSITION AND TITLE</b></p>
          <ol class="ol-padding">
            <li>You are employed on a casual basis in the position described at <b>Item 3</b> of the Schedule.</li>
            <li class="p-m-b">You may be required to perform other tasks from time to time, as reasonably requested by the Employer.</li>
          </ol>
        </li>
        <li>
          <p class="p-t-b"><b>PRINCIPAL DUTIES</b></p>
          <ol class="ol-padding">
            <li>You may be provided with an outline of your duties before or on commencement of your employment. The outline is not intended to be an exhaustive list of the duties you may be required to perform, rather an indication of the kinds of duties that fall within the scope of the position.</li>
            <li>
              <p class="p-m-t">You also have general duties to:</p>
              <ol class="ol-padding" type="a">
                <li>comply with reasonable directions given to you by the Employer</li>
                <li>at all times act faithfully, honestly and diligently</li>
                <li>ensure you are performing solely work related activities in work time</li>
                <li>exhibit a professional and courteous attitude when dealing with the Employer, its customers, staffs, suppliers and other members of the public and</li>
                <li>act in the Employer’s best interests at all times.</li>
              </ol>
            </li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>EMPLOYER POLICIES AND PROCEDURES</b></p>
          <p>You agree that:</p>
          <ol class="ol-padding" type="a">
            <li>you will comply with all the Employer\'s policies and procedures, as amended from time to time at the sole discretion of the Employer</li>
            <li>the specific detail of the Employer’s policies do not form a term of your contract and</li>
            <li>failure to comply with the Employer’s policies may result in disciplinary action, up to and including dismissal.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>DRIVER HISTORY</b></p>
          <ol class="ol-padding">
            <li>You may be required to provide information in order for the Employer to complete a driver history check.</li>
            <li>If a driver history check is completed and is not to the satisfaction of the Employer, it may result in disciplinary action.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>LICENCES, CLEARANCES AND REGISTRATIONS</b></p>
          <ol class="ol-padding">
            <li>
              <p class="p-m-t" >You are required to hold and maintain the following:</p>
              <ol class="ol-padding" type="a">
                <li>Certificate III <span class="l-blue-c">or</span> Certificate IV in Disability <span class="l-blue-c">or</span> Aged Care or Individual Support or equivalent </li>
                <li>Driver licence</li>
                <li>NDIS Worker Orientation Completion Certificate</li>
              </ol>
            </li>
            <li>The Employer may require you to provide evidence that you hold the above</li>
            <li>These are considered essential requirements of your role. The Employer reserves the right to terminate your employment without notice in the event that you fail to maintain these and you are unable to perform the requirements of your role.</li>
            <li>You must notify the Employer immediately in the event that you no longer hold, or are no longer eligible to hold, any of the above.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>WORKING WITH CHILDREN CHECK</b></p>
          <ol class="ol-padding">
            <li>You will be required to undergo a Working with Children check as an essential requirement of your position.</li>
            <li>The Employer may require you to provide evidence that you hold the check at any time during your employment.</li>
            <li>The Employer reserves the right to terminate your employment without notice in the event that you fail to maintain this clearance and are unable to perform the requirements of your role.</li>
            <li>You must notify the Employer immediately in the event that you no longer hold, or are no longer eligible to hold, this clearance.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>NATIONAL POLICE CHECK</b></p>
          <ol class="ol-padding">
            <li>You will be required to undergo a National Police check as an essential requirement of your role.</li>
            <li>The Employer may require you to repeat this check at any time during your employment.</li>
            <li>The Employer reserves the right to terminate your employment without notice in the event that you do not pass this check to its satisfaction and are unable to perform the requirements of your role.</li>
            <li>You must notify the Employer immediately in the event that you are charged with any criminal offence.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>PRE-EMPLOYMENT MEDICAL EXAMINATION</b></p>
          <ol class="ol-padding">
            <li>You will be required to undergo a pre-employment medical examination. The purpose of this medical examination is to determine whether there are any pre-existing conditions which may prevent or impact upon the efficient performance of your duties.</li>
            <li>Evidence that you have undertaken this medical examination must be provided to the Employer prior to the commencement date, along with the required form confirming your fitness to perform your role.</li>
            <li>In the event the medical examination indicates any pre-existing conditions which may prevent or impact upon the efficient performance of your duties, the Employer reserves the right to withdraw this offer of employment.</li>
            <li>Upon commencement with the Employer, you will be reimbursed the reasonable cost of this medical assessment upon the provision of a receipt.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>PLACE OF EMPLOYMENT</b></p>
          <ol class="ol-padding">
            <li>Your principal place of employment will be at the location described in <b>Item 6</b> of the Schedule, or as otherwise reasonably directed by the Employer.</li>
            <li>Due to the nature of the role and the business, you will be required to travel to, and work at, participant and prospective participant sites within a reasonable travelling distance, as directed by the Employer.</li>
            <li>You may also be required to travel as reasonably necessary for the performance of your duties.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>HOURS OF WORK</b></p>
          <ol class="ol-padding">
            <li>The business\' normal span of hours of operation are outlined at <b>Item 7</b> of the Schedule.</li>
            <li>You are employed as a casual staff and are required to perform the hours of work allocated by the Employer from time to time. </li>
            <li>The Employer will give you reasonable notice of when you are required to work in accordance with any requirements under the Industrial Instrument. The Employer does not guarantee to provide you with a minimum or maximum amount of work.</li>
            <li>Your maximum ordinary hours per week as a casual staff will be in accordance with the applicable Industrial Instrument. You may also be required to work reasonable additional hours.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>HOURS OF WORK</b></p>
          <ol class="ol-padding">
            <li>You are required to complete regular time recordings as directed by management.</li>
            <li>You are responsible for the completion of your own time record. Completing time records on behalf of another staff or permitting another staff to do so on your behalf, may result in disciplinary action, up to and including dismissal.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>REMUNERATION</b></p>
          <ol class="ol-padding">
            <li>Your pay is set out at <b>Item 8</b> of the Schedule.</li>
            <li>The rate of pay is inclusive of the casual loading required by the Industrial Instrument. The casual loading is paid to you in satisfaction of entitlements not payable to casual staffs under the National Employment Standards, including to the extent permissible paid personal/carer\'s leave, paid annual leave and public holidays.</li>
            <li>You will be entitled to any applicable penalty rates, overtime rates, allowances or loadings appropriate to your position as set out in the Industrial Instrument.</li>
            <li>Where your pay exceeds any legislative and Industrial Instrument minimum entitlements, any amount paid in excess of these minimum entitlements may be used to offset any entitlement that may otherwise have been applicable.</li>
            <li>In the event that a finding or determination is made that you are not a casual staff by a court, tribunal or governmental authority, to the extent permissible by law, the Employer reserves the right to recover any casual loading paid to you. </li>
            <li>The Employer will make Superannuation contributions on your behalf in accordance with legislation.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>ANNUAL LEAVE</b></p>
          <p>You are not entitled to annual leave due to your casual employment status.</p>
        </li>
        <li>
          <p class="p-m-t"> <b>LONG SERVICE LEAVE</b></p>
          <p>You are not entitled to annual leave due to your casual employment status.</p>
        </li>
        <li>
          <p class="p-m-t"> <b>PERSONAL/CARER\'S LEAVE</b></p>
          <p>You are not entitled to paid personal/carer\'s leave due to your casual employment status.</p>
        </li>
        <li>
          <p class="p-m-t"> <b>OTHER LEAVE</b></p>
          <p>All other leave, including compassionate leave, parental leave and community service leave, will be provided to you in accordance with the Employer’s policy and/or the Act, whichever is more generous.</p>
        </li>
        <li>
          <p class="p-m-t"> <b>PUBLIC HOLIDAYS</b></p>
          <ol class="ol-padding">
            <li>You are entitled to be absent from work on a day or part day that is a public holiday in accordance with the Act, unless reasonably required to work by the Employer.</li>
            <li>As a casual staff, any such absence will be unpaid, unless reasonably required to work by the Employer.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>VEHICLE ALLOWANCE</b></p>
          <ol class="ol-padding">
            <li>You may be required to use your private motor vehicle for work purposes. Where required, you will be entitled to a vehicle allowance in accordance with the Industrial Instrument.</li>
            <li>All rules regarding when the vehicle allowance is payable is in accordance with the Industrial Instrument. You will not be entitled to any further payments in respect of work-related use of your private vehicle.</li>
            <li>You are required ensure that your vehicle is neat and clean at all times and maintained in a state of good mechanical order.</li>
            <li>Additional rules regarding vehicles and driving are set out in the Handbook which you are expected to read and fully comply with. The Employer reserves the right to vary, alter or withdraw these arrangements and will provide reasonable notice of any such changes.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>COMPANY SET OF KEYS</b></p>
          <ol class="ol-padding">
            <li>You may be provided with a company set of keys in order to complete your duties as directed by the Employer. </li>
            <li>This company set of keys may only be used for business purposes. Reasonable personal use is only permitted where specifically authorised by the Employer.</li>
            <li>The use of the company property is subject to the terms and conditions contained within the Handbook.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>COMPANY PROPERTY</b></p>
          <ol class="ol-padding">
            <li>You may be provided with company property in order to complete your duties as directed by the Employer. </li>
            <li>This property may only be used for business purposes. Reasonable personal use is only permitted where specifically authorised by the Employer.</li>
            <li>The use of the company property is subject to the terms and conditions contained within the Handbook.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>CONFIDENTIAL INFORMATION</b></p>
          <p>You agree at all times during and after your employment with the Employer:</p>
          <ol class="ol-padding" type="a">
            <li>to refrain from directly or indirectly disclosing to a third party Confidential Information except in the proper course of carrying out your duties</li>
            <li>not to use the Confidential Information for any purpose other than for the benefit of the Employer</li>
            <li>to keep confidential all Employer Confidential Information and</li>
            <li>to comply with the terms of this Contract unless otherwise required by applicable laws or regulations.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>INTELLECTUAL PROPERTY</b></p>
          <ol class="ol-padding">
            <li>All Intellectual Property rights arising from any Works created or developed by you in the course of your employment (whether alone or with others) will belong to the Employer and you agree to immediately disclose to the Employer all such Works. </li>
            <li>You agree that all existing Intellectual Property rights, title and interest in all Works created or developed by you in the course of your employment (whether alone or with others) are vested in the Employer and upon their creation, all such rights will vest in the Employer. You agree to execute all documents and do all acts required to secure any Intellectual Property rights for the Employer.</li>
            <li>For the benefit of the Employer, you consent to any and all acts or omissions (whether occurring before or after this consent is given) in relation to all Works made or to be made by you in the course of your employment which might otherwise infringe your Moral Rights in those Works.</li>
            <li>You warrant that you have consented without coercion or without relying on any representations other than those set out in this contract.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>NON-DISPARAGEMENT</b></p>
          <ol class="ol-padding">
            <li>You must not at any time, either during your employment, or at any time after termination, disparage or otherwise make any statement, or permit or authorise any statement to be made, which is calculated or reasonably likely to damage the reputation or cause other damage to the Employer or any Associated Entity, or any of their respective staffs or officers.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>TERMINATION OF EMPLOYMENT</b></p>
          <ol class="ol-padding">
            <li>At any time during the operation of the Contract, either party may terminate your employment by providing one hour’s verbal or written notice of termination or one hour’s pay in lieu of notice.</li>
            <li>On termination of employment for any reason, you must immediately return to the Employer all property, documents and items relating to the business of the Employer which you have in your possession or control. This includes, but is not limited to, any car, equipment, papers, keys, reports, computers, information, programs, records and documents, intellectual property and other information, in whatever form, relating in any way to the Employer or its participants.</li>
            <li>On termination of employment for any reason, you must also irretrievably delete any Confidential Information stored on any computer, magnetic or optical disk or memory, and all matter derived from those sources in your possession, custody, care or control outside the Employer’s premises.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>NON-SOLICITATION</b></p>
          <ol class="ol-padding">
            <li>
              <p class="p-m-t" >27.1	During your employment and from the date this Contract ceases, you agree that you will not directly or indirectly, whether for your own benefit or for the benefit of another entity, solicit, canvass, approach (or attempt to solicit, canvass or approach) or accept an approach from a participant of the Employer for a period of: </p>
              <ol class="ol-padding" type="i">
                <li>12 months</li>
              </ol>
            </li>
            <li>Each of the above obligations are separate and independent obligations. In the event that one or more of the obligations are found to be unenforceable, the remaining obligations will continue to apply.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>REDUNDANCY</b></p>
          <p>If your position is made redundant, you shall not be entitled to any payment except as required under the Act.</p>
        </li>
        <li>
          <p class="p-m-t"> <b>ASSIGNMENT</b></p>
          <ol class="ol-padding">
            <li>You may not assign or transfer the rights and benefits under this contract</li>
            <li>The Employer may assign its rights and obligations under the Contract to any person, business, company or entity.</li>
          </ol>
        </li>
        <li>
          <p class="p-m-t"> <b>GOVERNING LAW</b></p>
          <p>The Contract shall be governed by the jurisdiction of the courts in the State or Territory as described at <b>Item 9</b> of the Schedule. </p>
        </li>
        <li>
          <p class="p-m-t"> <b>VARIATION OF TERMS</b></p>
          <p>The terms of the Contract may be varied from time to time by mutual agreement in writing between the parties.</p>
        </li>
        <li>
          <p class="p-m-t"> <b>SEVERABILITY</b></p>
          <p class="p-m-t p-b-t">If any of the terms and conditions of the Contract are void, or become voidable by reason of any statute or rule of law then that term or condition shall be severed from the Contract without affecting the enforceability of the remaining terms and conditions.</p>
        </li>
        <li>
          <p class="p-m-t"> <b>ENTIRE AGREEMENT</b></p>
          <p>The contents of the Contract constitute the entire agreement between you and the Employer. Any previous agreements, understandings, and negotiations on this subject matter cease to have effect.</p>
        </li>
        <li>
          <p class="p-m-t"> <b>FAIR WORK INFORMATION STATEMENT</b></p>
          <p>By signing the Contract you acknowledge that the Employer has provided you with a copy of the Fair Work Information Statement.</p>
        </li>
      </ol>
      <pagebreak/>
      <p class="m-t-0"><b>SIGNED BY AN AUTHORISED OFFICER OF THE EMPLOYER</b></p>
      <br/><br/><br/><br/>
      <div style="font-size:12px">'.$companyDetails['authorizedOfficerName'].'</div>
      <table width="100%" class="table">
        <tr>
          <td width="33.3%" class="signBox">Authorised Officer Name</td>
          <td width="33.3%"></td>
          <td width="33.3%" class="signBox">Authorised Officer Signatures</td>
        </tr>
      </table>
      <table width="100%" class="table">
        <tr>
          <td width="33.3%" class="signBox">Title of Authorised Officer</td>
          <td width="33.3%"></td>
          <td width="33.3%" class="signBox">Dated</td>
        </tr>
      </table>
      <p><b>SIGNED BY YOU</b></p>
      <br/><br/><br/><br/>
      <div style="font-size:12px">'.$data['first_name'].' '.$data['last_name'].'</div>
      <table width="100%" class="table">
        <tr>
          <td width="33.3%" class="signBox">Staff Full Name</td>
          <td width="33.3%"></td>
          <td width="33.3%" class="signBox">Staff Signatures</td>
        </tr>
      </table>
      <table width="100%" class="table">
        <tr>
          <td width="33.3%" class="signBox">Dated</td>
          <td width="33.3%"></td>
          <td width="33.3%"></td>
        </tr>
      </table>
      <pagebreak>

      <h1>SCHEDULE</h1>
      <div class="bar2"></div>
      <table class="table1 tbr">
        <tr>
          <td>Item 1</td>
          <td>Employer name and details</td>
          <td>
            <p>'.$companyDetails['name-pyt'].'trading as '.$companyDetails['name-pyt'].'</p><br/>
            <p>ABN: '.$abnNumber.'</p><br/>
            <p>Address: '.$companyDetails['address'].'</p>
          </td>
        <tr>
        <tr>
          <td>Item 2</td>
          <td>Your name and details</td>
          <td>'.$data['first_name'].' '.$data['last_name'].' - '.$data['street_address'].'</td>
        <tr>
        <tr>
          <td>Item 3</td>
          <td>Position</td>
          <td>'.$data['job_position'].'</td>
        <tr>
        <tr>
          <td>Item 4</td>
          <td>Commencement date</td>
          <td>'.date('M jS Y').'</td>
        <tr>
        <tr>
          <td>Item 5</td>
          <td>The Industrial Instrument</td>
          <td>Social, Community, Home Care and Disability Services Industry Award 2010</td>
        <tr>
        <tr>
          <td>Item 6</td>
          <td>Location</td>
          <td>
            <p>'.$companyDetails['address'].'</p><br/>
            <p>Due to the nature of the role and the business, you will be required to travel to, and work at, participant and prospective participant sites within a reasonable travelling distance, as directed by the Employer.</p><br/>
            <p>You may also be required to travel as reasonably necessary for the performance of your duties.</p>
          </td>
        <tr>
        <tr>
          <td>Item 7</td>
          <td>Business normal hours of operation</td>
          <td>
            Monday to Sunday<br/>
            24 hours 
          </td>
        <tr>
        <tr>
          <td>Item 8</td>
          <td>Pay</td>
          <td>$'.$dt['varPayRatePerHour'].' per hour exclusive of superannuation</td>
        <tr>
        <tr>
          <td>Item 9</td>
          <td>Governing Law</td>
          <td>Victoria</td>
        <tr>
      </table>
    ';

  $html .= '</div></body></html>';


?>