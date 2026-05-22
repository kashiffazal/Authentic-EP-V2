<?php

  $clientEmailContent = array(
    'subject' => 'Your '.(($dt['job_title'] AND $dt['job_title'] != '-') ? $dt['job_title'] : '').' Job Application is on Hold With '.$companyDetails['name'],
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
          <p>With reference to your job application with '.$companyDetails['name'].', we would like to inform you that your application is on hold at the moment which means that the position has already been filled. However, your application is still on priority list to consider for the next available positions.</p>
          <p>We wish you best of luck for your future, please do not hesitate to apply for our upcoming jobs.</p>
          '.$emailSignature.'
        </div>
      </div>
    ',
    'plaintext' => 'Dear '.$dt['name'].',
        With reference to your job application with '.$companyDetails['name'].', we would like to inform you that your application is on hold at the moment which means that the position has already been filled. However, your application is still on priority list to consider for the next available position.
        We wish you best of luck for your future, please do not hesitate to apply for our upcoming jobs.'
  );




 // echo $clientEmailContent['body'];

?>