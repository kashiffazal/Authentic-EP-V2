<?php

$sl = $live_server;
$localEmail = 'kashiffazal99@gmail.com';
$localCCEmail = 'kashiffazalfullstack@gmail.com';
//Company Details
$companyDetails = array();
$companyDetails['name'] = 'Authentic Life Care';
$companyDetails['name-pyt'] = 'Authentic Life Care Pty Ltd';

// $companyDetails['name'] = 'The BPO Group';
// $companyDetails['name-pyt'] = 'The BPO Group Pty Ltd';
#Email
$domainSenderEmail = 'admin@'.$domainName;
// $domainSenderEmail = 'kashiffazal99@gmail.com';
$companyDetails['emailSupport'] = $sl ? 'support@'.$domainName : $localEmail;
$companyDetails['emailAccounts'] = $sl ? 'accounts@'.$domainName : $localEmail;
$companyDetails['emailOperations'] = $sl ? 'operations@'.$domainName : $localEmail;
$companyDetails['emailAdminReceiver'] = array('name' => 'Support Team', 'email' => $sl ? 'support@'.$domainName : $localEmail);
$companyDetails['emailSender'] = array('name' => $companyDetails['name'], 'email' => $domainSenderEmail);

$companyDetails['address'] = '253 Hoddle Street Collingwood, VIC 3066';
$companyDetails['mobile'] = '041-366-7496';
$companyDetails['websiteName'] = $domainName;
$companyDetails['website'] = 'https://'.$domainName.'/';

$companyDetails['supportPersonName'] = 'Abid Ilyas';
$companyDetails['supportPersonContact'] = '0422 034 950';
$companyDetails['operationsPersonContact'] = '0413 664 496';

$companyDetails['managerName'] = 'Mohamed Ainan';
$companyDetails['managerNumber'] = '0413 667 496';
$companyDetails['assigningStaffMember'] = $companyDetails['managerName'];
$companyDetails['authorizedOfficerName'] = $companyDetails['managerName'];

$companyDetails['director_1_name'] = 'Haboon Elmi';
$companyDetails['director_1_number'] = '0423 254 061';


$companyDetails['defaultCCEmail'] = $sl ? 'm.ainan@'.$domainName : $localCCEmail;
// $companyDetails['defaultCCEmail'] =  $localCCEmail;
$companyDetails['defaultCCName'] = $companyDetails['managerName'];
$companyDetails['defaultBCCEmail'] = 'kashiffazal99@gmail.com';
$companyDetails['defaultBCCName'] = 'Kashif Fazal';

$productName = "Authentic-EP";
$providerNumber = "4050044981";
$abnNumber = "67628234079";

// $productName = "The BPO Group - EP";
// $providerNumber = "4126746987";
// $abnNumber = "79543197519";

#Email sender
$emailSenderArrCompany = $companyDetails['emailSender'];
$emailSenderArrProduct = array('email' => $domainSenderEmail, 'name' => $productName);

$emailCCArr = array(array('email' => $companyDetails['defaultCCEmail'], 'name' => $companyDetails['defaultCCName']));
$emailBCCArr = array(
    array('email' => $companyDetails['defaultBCCEmail'], 'name' => $companyDetails['defaultBCCName']),
    array('email' => 'abidilyas786@gmail.com', 'name' => 'AUL - BCC Emails')
);

$SMTPCred = array(
    // 'host' => 'innotechcloud.com',
    // 'username' => 'inquiry@innotechcloud.com',
    // 'password' => 'Xqzh8)G_vq,A',
    // 'port' => '465',
    // 'SMTPSecure' => 'ssl'

    // 'host' => 'smtp.gmail.com',
    // 'username' => 'kashiffazal99@gmail.com',
    // // 'password' => 'taufiq123#kashif$pakistanus$kk',
    // 'password' => 'wuuqxocylodljzwk',//It's app password not regular password
    // 'port' => 587,
    // 'SMTPSecure' => 'tls',

    //Support Email
    // 'host' => 'smtp.gmail.com',
    // 'username' => $domainSenderEmail,
    // // 'password' => 'aul786@@$',
    // 'password' => 'fvlxasglsambmnwz',//It's app password not regular password
    // 'port' => 587,
    // 'SMTPSecure' => 'tls',

    //Admin Email
    'host' => 'smtp.gmail.com',
    'username' => $domainSenderEmail,
    // 'password' => 'admin786$',
    'password' => 'vxblaqtgarahktpm',//It's app password not regular password
    'port' => 587,
    'SMTPSecure' => 'tls'
);