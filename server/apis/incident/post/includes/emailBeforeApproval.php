<?php
 
  $adminEmailContent = array(
    'subject' => '
      Internal Incident Form Submission for Approval from 
      '.$data['ud']['name'].' for '.(@$data['affected_person_name'] ? @$data['affected_person_name'] : $data['client_name']).' - '.
      (!@$data['inserted_date'] ? date('d-m-Y') : (!@$data['updated_date'] ? date('d-m-Y',strtotime(@$data['inserted_date'])) : date('d-m-Y',strtotime(@$data['updated_date'])))).'
      ',
    'body' => '
      <div style="border:1px solid #b3b3b3;border-radius:5px;">

        <div style="
          text-align:center;
          background-color: #ffdec6a6;
          background-position: 100% center;
          background-size: cover;
          background-image: url('.$pdfOrImagePath.'/home-bg.png);
        ">
          <div style="background:#ffffffde;padding: 20px;">
            <img src="'.$pdfOrImagePath.'/logo-company.png" width="120px">
            <h3>Support Worker Registration Form</h3>
            <!--hr style="border:1px dashed #e96b28;border-bottom:none"/-->
          </div>
        </div>

        <div style="padding:20px;">
          <p>Hello '.$companyDetails['name'].',</p>
          <p>'.$data['ud']['name'].' has submitted an incident form for '.(@$data['affected_person_name'] ? @$data['affected_person_name'] : $data['client_name']).'</p>
          <p><a href="'.$redirectPath.'/e/incidentLog">Please click here to review and approve the submitted form.</a></p>
          <p>Kind Regards</p>
          <p>Support Team</p>
          <p>'.$companyDetails['name-pyt'].'</p>
        </div>
        
      </div>
    ',
    'plaintext' => 'Hello '.$companyDetails['name'].',
      '.$data['ud']['name'].' has submitted an incident form for '.(@$data['affected_person_name'] ? @$data['affected_person_name'] : $data['client_name']).'
      Please click here to review and approve the submitted form.
      Kind Regards
      Support Team
      '.$companyDetails['name-pyt']
  );

  #File Name and Path variable is set from createPDF.php page
  $attachedFile = array(array('path' => $path."/".$file_ref['fileName'], 'name' => $file_ref['fileName']));

  $res['emailBeforeApproval'] = emailPHPMailer(
    $emailSenderArrCompany,//Sender
    array(
      array('name' => $companyDetails['managerName'], 'email' => 'm.ainan@'.$domainName) //Receive to Ainan
    ),//Receiver
    $adminEmailContent,//Content
    $SMTPCred,//SMTP Details
    $attachedFile,//Attachment
    array($companyDetails['emailAdminReceiver']) //CC to support
  );

  if($res['emailBeforeApproval']['status']){
    $data['email_before_approval'] = 'true';
  }else{
    $data['email_before_approval'] = '';
  }//End if condition



?>