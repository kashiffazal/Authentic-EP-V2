<?php

  $clientEmailContent = array(
    'subject' => 'Your '.(($dt['job_title'] AND $dt['job_title'] != '-') ? $dt['job_title'] : '').' Job Application has been Unsuccessful with '.$companyDetails['name'],
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
          <p>With reference to your job application with '.$companyDetails['name'].', we are sorry to inform you that unfortunately, you do not qualify for the position '.$dt['job_title'].' and hence we had to reject your application.</p>
          <p>Please see below the reason for rejection:</p>
          <p style="white-space: pre-wrap">'.stripslashes($rejectReason).'</p>
          <p>If you have any concerns or questions regarding your decline application, please email us at <a href="mailto:'.$companyDetails['emailSupport'].'">'.$companyDetails['emailSupport'].'</a></p>
          <p>We wish you best of luck for your future, please do not hesitate to apply for our upcoming positions.</p>
          '.$emailSignature.'
        </div>
      </div>
    ',
    'plaintext' => 'Dear '.$dt['name'].',
        With reference to your job application with '.$companyDetails['name'].', we are sorry to inform you that unfortunately you do not qualify for the position '.$dt['job_title'].' and hence we had to reject your application.
        Please see below the reason for rejection:
        '.$rejectReason.'
        We wish you best of luck for your future, please do not hesitate to apply for our upcoming positions.'
  );




 // echo $clientEmailContent['body'];

?>