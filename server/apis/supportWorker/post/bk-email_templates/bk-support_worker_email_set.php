<?php




  $clientReceiverArr = array(array('email' => $data['email'], 'name' => $data['first_name'].' '.$data['last_name']));

  $clientEmailContent = array(
    'subject' => $companyDetails['name'].' - Your support worker form has been successfully submitted',
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
          <p>Dear '.$data['first_name'].' '.$data['last_name'].',</p>
          <p>Thank you for submitting support worker form on '.$companyDetails['name'].'.</p>
          <p>We have received your details and some one from our support team will contact you soon.</p>
          <p>Regards</p>
          <p>Support Team - '.$companyDetails['name'].'</p>
        </div>
      </div>
    ',
    'plaintext' => 'Dear '.$data['first_name'].' '.$data['last_name'].',
      Thank you for submitting support worker form on '.$companyDetails['name'].'.
      We have received your details and some one from our support team will contact you soon.'
  );




 // echo $clientEmailContent['body'];

?>