<?php




  $referralReceiverArr = array(array('email' => $data['makeRefEmail'], 'name' => @$data['makeRefName']));

  $referralEmailContent = array(
    'subject' => $companyDetails['name'].' - Participant Referral Form for '.@$data['makeRefName'].' - '.$data['dateOfRef'],
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
          <p>Dear <strong>'.$data['makeRefName'].'</strong></p>
          <p>Thank you for submitting '.$companyDetails['name'].' Participant Referral Form for <strong>'.$data['first_name'].' '.$data['last_name'].'</strong> on <strong>'.$data['dateOfRef'].'</strong></p>
          <p>We have received your referral and our support team will be in touch with you soon.</p>
          <p>Kind Regards,</p>
          <p>Support Team<p>
          <p>'.$companyDetails['name-pyt'].'</p>
          <p>Website: <a href="'.$companyDetails['website'].'">'.$companyDetails['website'].'</a></p>
          <p>Email: <a href="mailto:'.$companyDetails['emailSupport'].'">'.$companyDetails['emailSupport'].'</a></p>
        </div>
      </div>
    ',
    'plaintext' => 'Dear '.$data['makeRefName'].',
      Thank you for submitting '.$companyDetails['name'].' Participant Referral Form for '.$data['first_name'].' '.$data['last_name'].' on '.date('m-d-Y',strtotime($data['dateOfRef'])).'
      We have received your referral and our support team will be in touch with you soon.
      Kind Regards,
      Support Team
      '.$companyDetails['name-pyt'].'
      Website: '.$companyDetails['website'].'
      Email: '.$companyDetails['emailSupport']
    );




 // echo $clientEmailContent['body'];

?>