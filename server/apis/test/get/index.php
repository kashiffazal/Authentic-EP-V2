<?php
  // $k = [];
  // $arr = array();
  // foreach ($k as $key => $value) {$arr[] = array( "label" =>  "Age", "tag" => "{{{$value}}}", "col"=>  $value, "desc"=> "" );}
  // echo json_encode($arr);
  // die();

  $res = sendEmail('3','5','',false,'2','1');
  print_rp($res);

  // require_once('../apis/reporting/reportingFunctions.php');
  // $tagData = getTableDataListWithPreset(false,'2','sampleValue');
  // print_rp($tagData);

  

  // function emailPHPMailerNew($senderArr,$receiverArr,$content,$SMTPArray = false,$attachment = false,$addCC = array(),$addBCC = array()){
  //   //@Required a phpMailer file with custom-configuration
  //   include '../plugins/PHPMailer_v6.8.0/vendor/autoload-config.php'; //library added in download source

  //   $res = array();
  //   if(!@$receiverArr[0]['email']){
  //     $res['status'] = false;
  //     $res['errorTitle'] = "Invalid Email";
  //     $res['errorMsg'] = "Email is not available";
  //     $res['errorType'] = "";
  //     $res['errorNotifyType'] = "notify";
  //     $res['errorDuration'] = ERROR_DURATION;
  //     return false;
  //   }//End if condition
    
  //   $mail = new $PHPMailer(true);
  //   // print_rp($mail);
  //   $mail->CharSet = 'UTF-8';
  //   $mail->IsHTML(true);
  //   if($SMTPArray){
  //     $mail->IsSMTP();                                      // set mailer to use SMTP
  //     $mail->Host = $SMTPArray['host'];  // specify main and backup server
  //     $mail->SMTPDebug = 0; 
  //     $mail->SMTPAuth = true;     // turn on SMTP authentication
  //     $mail->Username = $SMTPArray['username'];  // SMTP username
  //     $mail->Password = $SMTPArray['password']; // SMTP password
  //     //If SMTP requires TLS encryption then set it
  //     if(@$SMTPArray['SMTPSecure']){$mail->SMTPSecure = $SMTPArray['SMTPSecure'];}//End if condition
  //     //Set TCP port to connect to 
  //     if(@$SMTPArray['port']){$mail->Port = $SMTPArray['port'];}//End if condition
  //   }//End if condition

  //   $mail->setFrom($senderArr['email'],$senderArr['name'],false);
  //   $mail->addReplyTo(
  //     @$senderArr['reply-to-email'] ? $senderArr['reply-to-email'] : $senderArr['email'],
  //     @$senderArr['reply-to-name'] ? $senderArr['reply-to-name'] : $senderArr['name'],false);
  //   #Add Receiver
  //   foreach($receiverArr as $value){
  //     if($value['name']){
  //       $mail->addAddress($value['email'], $value['name']);
  //     }else{
  //       $mail->addAddress($value['email']);
  //     }//End if condition
  //   }//End foreach
  //   #Add CC
  //   foreach($addCC as $value){
  //     if($value['name']){
  //       $mail->addCC($value['email'], $value['name']);
  //     }else{
  //       $mail->addCC($value['email']);
  //     }//End if condition
  //   }//End foreach
  //   #Add BCC
  //   foreach($addBCC as $value){
  //     if($value['name']){
  //       $mail->addBCC($value['email'], $value['name']);
  //     }else{
  //       $mail->addBCC($value['email']);
  //     }//End if condition
  //   }//End foreach

  //   //Provide file path and name of the attachments
  //   if($attachment){
  //     foreach($attachment as $value){
  //       if($value['name']){
  //         $mail->addAttachment($value['path'], $value['name']);
  //       }else{
  //         $mail->addAttachment($value['path']);
  //       }//End if condition
  //     }//End foreach
  //   }//End foreach

  //   $mail->Subject = $content['subject'];
  //   //$mail->Body = $content['body'];
  //   $mail->MsgHTML($content['body']);
  //   if($content['plaintext']){$mail->AltBody = $content['plaintext'];}

  //   try{
  //     $mail->send();
  //     $res['status'] = true;
  //     $res['successTitle'] = 'Sent';
  //     $res['successMsg'] = 'Message has been sent successfully';
  //     $res['successNotify'] = false;
  //     $res['successNotifyType'] = '';
  //     $res['successDuration'] = SUCCESS_DURATION;
  //   }catch(Exception $e){
  //     $res['status'] = false;
  //     $res['errorTitle'] = 'Email Sending Error';
  //     $res['errorMsg'] = $e->getMessage();
  //     $res['errorType'] = "";
  //     $res['errorNotifyType'] = "notify";
  //     $res['errorDuration'] = ERROR_DURATION;
  //     // $res['var_dump'] = var_dump($mail);

  //     //Type of Error reporting
  //     // $mail->ErrorInfo;
  //     // $e->errorMessage();
  //     // $e->getMessage();

  //   }//End if condition
  //   $mail->ClearAllRecipients();
    
  //   return $res;
  // }//End function













die();
// include "../cPanel/function.php";
// echo '<h4>cPanel API</h4>';



// $setDateTimeArr = array(
//   'date' => array(
//     'day' => '29',
//     'month' => '11',
//     'year' => '2022',
//   ),
//   'time' => array(
//     'hour' => '4',
//     'min' => '25',
//     'ampm' => 'pm',
//     'timeZone' => 'Asia/Karachi'
//   )
// );
// $setDateTimeArr = http_build_query($setDateTimeArr);
// $k = create_cron_job($setDateTimeArr,'https://app.authenticlifecare.com.au/server/apis/index.php/servicePlaining/post/unattendedShiftCronJob/dr/ig/se/ig');
// print_rp($k);

// $p = remove_cron_job('3434');
// print_rp($p);
?>