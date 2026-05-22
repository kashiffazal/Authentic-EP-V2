<?php
 
  $newUserEmailContent = array(
    'subject' => 'Your Login Credentials for '.$companyDetails['name'].' Staff Panel',
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
          <p>Dear '.$fullName.'</p>
          <p>Our Team has created your account in Staff Panel of '.$companyDetails['name'].' on '.date('d/m/Y',strtotime($server_date)).'</p>
          <p>Kindly use the following details to access your account</p>
          <p>Username: '.$_POST['username'].'<br/>Password: '.$_POST['password'].'</p>
          <p>Visit <a href="'.$mainDomain.'">'.$mainDomain.'</a> for login to your Staff Panel</p>
          <p>Best of luck for your work!</p>
          <p>Thank You</p>
          <p>Support Team <br/> '.$companyDetails['name'].'</p>
        </div>
        
      </div>
    ',
    'plaintext' => 'Dear '.$fullName.'
      Our Team has created your account in Staff Panel of '.$companyDetails['name'].' on '.date('d/m/YYY',strtotime($server_date)).'
      Kindly use the following details to access your account
      Username: '.$_POST['username'].'Password: '.$_POST['password'].'
      Visit '.$mainDomain.' for login to your Staff Panel
      Best of luck for your work!
      Thank You
      Support Team '.$companyDetails['name']
  );


?>