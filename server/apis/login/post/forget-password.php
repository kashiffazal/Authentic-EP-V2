<?php

    if(!isset($_POST) OR !(sizeof($_POST) > 0)){die();}

    require_once('../plugins/PHPMailer_v5.1/class.phpmailer.php'); //library added in download source
    
    $forgetPassLink = $redirectPath.'/resetPassword/'.$_POST['forgetPassData'];
    $email = $_POST['email'];
    $res = dbQuery("SELECT first_name,last_name,password,email FROM $users_table WHERE email = '$email'");
    //print_r($res);exit();

    if(sizeof($res['data']) >= 1){
      $res = $res['data'][0];

      $emailMsg = '
      <table style="border-collapse:collapse;table-layout:fixed;min-width:320px;width:100%;background-color:#f2f4f6" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td>

      <div style="margin:0 auto;max-width:560px;min-width:280px;width:280px;width:calc(28000% - 167440px);font-family:sans-serif">
        <p style="margin:0px;padding:10px 0px;font-size:12px;color:#717a8a;">Forget Password</p>
      </div><!--End Container -->
    
      <div role="section" style="background-color:#ffffff">
        <div style="margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word;font-family:sans-serif">
          <div style="margin:0px 20px;">
            <br/><br/>
            <a style="text-decoration:underline;color:#7856ff" href="'.$companyDetails['website'].'">
              <img style="border:0;display:block;height:auto;width:100%;max-width:170px" alt="'.$productName.' logo" width="200" src="'.$emailImagePath.'/img/product-logopsd-h.png">
            </a>
            <br/><br/>
            <p style="margin:0px">Hi '.$res['first_name'].' '.$res['last_name'].',</p>
            <br/>
            <h1 style="margin:0px;font-weight:normal;color:#111324;font-size:22px;line-height:31px;">Forgot your password?</h1>
            <p style="margin:0px">Few Step Reset your password</p>
            <br/>
            <a 
            style="border-radius:4px;display:inline-block;font-size:14px;font-weight:bold;line-height:24px;padding:12px 24px;text-align:center;text-decoration:none!important;color:#ffffff!important;background-color:#e96b28;font-family:sans-serif"
            href="'.$forgetPassLink.'" target="_blank" >Reset Password</a>
            <br/>
          </div><!--End margins-->
        </div><!--End Container -->
        <br/><br/>
      </div>
    
      <div style="margin:0 auto;max-width:560px;min-width:280px;width:280px;width:calc(28000% - 167440px);font-family:sans-serif">
        <p style="margin:0px;padding:10px 0px;font-size:12px;color:#717a8a;line-height: 19px;">We\'re '.$productName.'<br>'.$companyDetails['address'].'</p>
      </div><!--End Container -->
    
    </td></tr></tbody></table>
    ';


      $receiverArr = array(array('email' => $res['email'], 'name' => $res['first_name']." ".$res['last_name']));
      $content = array(
          'subject' => 'Forget password',
          'body' => $emailMsg,
          'plaintext' => 'This is the plain text version of the email content'
      );
      
      $res = emailPHPMailer($emailSenderArrProduct,$receiverArr,$content,$SMTPCred);

      if($res['status']){
        $res['successTitle'] = 'Email sent!';
        $res['successMsg'] = 'Please check your inbox.';
        $res['successNotify'] = true;
        $res['successNotifyType'] = 'notify';
      }//End if condition

    }else{
      $res['status'] = false;
      $res['errorTitle'] = 'Email is not registered';
      $res['errorMsg'] = 'Please provide your registered email';
    }//End if condition


    echo json_encode($res);



?>