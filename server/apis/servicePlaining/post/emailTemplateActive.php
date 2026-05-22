<?php

$clientEmailContent = array(
    'subject' => 'Congratulations for Being Shortlisted for a Interview Call with ' . $companyDetails['name'],
    'body' => '
      <div style="border:1px solid #b3b3b3;border-radius:5px;">

        <div style="
          text-align:center;
          background-color: #ffdec6a6;
          background-position: 100% center;
          background-size: cover;
          background-image: url(' . $pdfOrImagePath . '/home-bg.png);
        ">
          <div style="background:#ffffffde;padding: 20px;">
            <img src="' . $pdfOrImagePath . '/logo-company.png" width="120px">
            <!--h3>Support Worker Registration Form</h3-->
            <!--hr style="border:1px dashed #e96b28;border-bottom:none"/-->
          </div>
        </div>

        <div style="padding:20px;">
          <p>Dear ' . $dt['name'] . ',</p>
          <p>We are pleased to inform you that you are successfully qualified for an interview call for the position applied ' . (($dt['job_title'] && $dt['job_title'] != '-') ? ' called ' . $dt['job_title'] : '') . ' with ' . $companyDetails['name'] . '.</p>
          <p>Our HR Staff will give a call on your provided contact number within 48 hours. If you do not receive a call, please reply back to this email and ask for a status.</p>
          ' . $emailSignature . '
        </div>
      </div>
    ',
    'plaintext' => 'Dear ' . $dt['name'] . ',
        We are pleased to inform you that you are successfully qualified for an interview call' . ($dt['job_title'] ? ' for the position applied called ' . $dt['job_title'] : '') . ' with ' . $companyDetails['name'] . '.
        Our HR Staff will give a call on your provided contact number within 48 hours. If you do not receive a call, please reply back to this email and ask for a status.',
);

// echo $clientEmailContent['body'];
