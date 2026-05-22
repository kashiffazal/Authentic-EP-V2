<?php
 
  $adminEmailContent = array(
    'subject' => 'Support Worker Form Submission from '.$data['first_name'].' '.$data['last_name'],
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
          <p>Dear Support Team</p>
          <p>You have received a new support worker from '.$data['first_name'].' '.$data['last_name'].'<br/>
          Please find attached pdf containing the details for your review.</p>
          <p>Regards</p>
          <p>Support Team - '.$companyDetails['name'].'</p>
        </div>
        
      </div>
    ',
    'plaintext' => 'Dear '.$companyDetails['emailAdminReceiver']['name'].',
      You have received a new support worker from '.$data['first_name'].' '.$data['last_name'].'
      Please find attached pdf containing the details for your review.'
  );



?>