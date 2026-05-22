<?php

  $clientEmailContent = array(
    'subject' => 'Welcome '.$dt['name'].' to '.$companyDetails['name'].(($dt['job_title'] && $dt['job_title'] != '-') ? ' - '.$dt['job_title'] : ''),
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
            <!--h3>Support Worker Registration Form</h3-->
            <!--hr style="border:1px dashed #e96b28;border-bottom:none"/-->
          </div>
        </div>

        <div style="padding:20px;">
          <p>Dear '.$dt['name'].',</p>
          <p>We are very pleased to inform you that you have successfully qualified as a support worker with '.$companyDetails['name'].'.</p>
          <p>We would like to welcome you in our support workers team and will send you the employment contracts in the next step.</p>
          <p>You are requested to review and sign so that we can start assigning you the available shifts with our respected clients.</p>
          <p>Please make sure that you sign electronically all the employment contracts and documents via Hellosign</p>
          <ul>
            <li>Employment Offer Letter</li>
            <li>Welcome Acceptance letter</li>
            <li>Casual (Award) Employment Contract </li>
            <li>New Staff Information</li>
            <li>Position Description Disability Support Worker</li>
            <li>Staff Code of Conduct</li>
            <li>Staff Handbook</li>
          </ul>
          <p>We will prepare your job card as well and send you so that you can carry that card with you during the shift with '.$companyDetails['name'].'. Please send us a good quality picture of your own so that we can prepare a job card for you.</p>
          '.$emailSignature.'
        </div>
      </div>
    ',
    'plaintext' => 'Dear '.$dt['name'].',
        We are very pleased to inform you that you have successfully qualified as a support worker with '.$companyDetails['name'].'.
        We would like to welcome you in our support workers team and will send you the employment contracts in the next step.
        You are requested to review and sign so that we can start assigning you the available shifts with our respected clients.
        Please make sure that you sign electronically all the employment contracts and documents via Hellosign
        Employment Offer Letter
        Acceptance letter
        Employment Contract
        New Staff Information
        Position Description Disability Support Worker
        Staff Code of Conduct
        Staff Handbook
        We will prepare your job card as well and send you so that you can carry that card with you during the shift with '.$companyDetails['name'].'. Please send us a good quality picture of your own so that we can prepare a job card for you.'
  );




 // echo $clientEmailContent['body'];

?>