<?php

  $clientEmailContent = array(
    'subject' => 'Your Job Interview Call with '.$companyDetails['name'],
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
          <p>Thank you for attending our interview call, please note that we will update you about the next steps within 48 hours.</p>
          <p>If you do not receive a next step email within the mentioned time, please reply back to this email and ask for a status.</p>
          '.$emailSignature.'
        </div>
      </div>
    ',
    'plaintext' => 'Dear '.$dt['name'].',
        Thank you for attending our interview call, please note that we will update you about the next steps within 48 hours.
        If you do not receive a next step email within the mentioned time, please reply back to this email and ask for a status.'
  );




 // echo $clientEmailContent['body'];

?>