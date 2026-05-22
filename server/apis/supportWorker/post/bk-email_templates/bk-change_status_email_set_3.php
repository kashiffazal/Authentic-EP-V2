<?php

  $clientEmailContent = array(
    'subject' => 'Thank you for attending our Call',
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
          <p>Thank you so much for your time and attending our call, we would like to inform you that we will conduct an interview as per the agreed time over the call.</p>
          <p>If you do not receive an interview call on the agreed time, please reply back to this email and ask for a status.</p>
          '.$emailSignature.'
        </div>
      </div>
    ',
    'plaintext' => 'Dear '.$dt['name'].',
      Thank you so much for your time and attending our call, we would like to inform you that we will conduct an interview as per the agreed time over the call.
      If you do not receive an interview call on the agreed time, please reply back to this email and ask for a status.'
  );




 // echo $clientEmailContent['body'];

?>