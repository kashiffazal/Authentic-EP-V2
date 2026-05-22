<?php
 
  $adminEmailContent = array(
    'subject' => 'Participant Referral Form from '.@$data['makeRefName'].' for '.$data['first_name'].' '.$data['last_name'],
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
            <h3>Participant Referral Form</h3>
            <!--hr style="border:1px dashed #e96b28;border-bottom:none"/-->
          </div>
        </div>

        <div style="padding:20px;">
          <p>Dear <strong>Support Team</strong></p>
          <p>You have received a Referral Form from <strong>'.@$data['makeRefName'].'</strong> for <strong>'.$data['first_name'].' '.$data['last_name'].'</strong> on <strong>'.$data['dateOfRef'].'</strong><p/>
          <p><strong>PDF</strong> is attached below in email</p>
          <p><strong>Thank you</strong></p>
        </div>
        
      </div>
    ',
    'plaintext' => 'Dear Support Team,
      You have received a Referral Form from '.@$data['makeRefName'].' for '.$data['first_name'].' '.$data['last_name'].' on '.$data['dateOfRef'].'
      PDF is attached below in email
      Thank you'
  );



?>