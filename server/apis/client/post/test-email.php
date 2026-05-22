<?php
    error_reporting(0);
    require_once '../plugins/PHPMailer_v5.1/class.phpmailer.php'; //library added in download source
    include "../apis/supportWorker/post/email_templates/admin_email_set.php";//$adminEmailContent
    $res = emailPHPMailer($emailSenderArrCompany,array($companyDetails['emailAdminReceiver']),$adminEmailContent,$SMTPCred);
    print_r($res);

?>