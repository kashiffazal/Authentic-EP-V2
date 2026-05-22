<?php

	$domainName = 'authenticlifecare.com.au';	
	if ($_SERVER['HTTP_HOST'] == 'localhost') {
			#Local Host
			$live_server = false;
			$host = "localhost";
			$user = "root";
			$password = "";
			$dbname = "authentic_ep";
			$mainDomain = "http://localhost/myProjects/react/Authentic-EP/authentic-ep-v2";
			$redirectPath = "http://localhost:3000/#";//for login email verification
			$pdfOrImagePath = $mainDomain."/public/img";
			$DIRECT_ACCESS_PAGE = (@$DIRECT_ACCESS_PAGE ? $DIRECT_ACCESS_PAGE : 'true');
		} else {
			$live_server = true;
			$host = "localhost";
			#Authentic Life Care
			$user = "authgzup_authentic_ep_user";
			$password = "HL-S.j=u;@E_";
			$dbname = "authgzup_authentic_ep";
			#The BPO Group
			// $user = "u533331373_block_ems_user";
			// $password = "C:sf||P7@j";
			// $dbname = "u533331373_block_ems";

			$mainDomain = "https://app.".$domainName;
			$redirectPath = $mainDomain."/#";//for login email verification
			$pdfOrImagePath = $mainDomain.'/img';
			$DIRECT_ACCESS_PAGE = (@$DIRECT_ACCESS_PAGE ? $DIRECT_ACCESS_PAGE : 'false');
		} //End if condition
	
	$public = $live_server ? "" : "/public";
	$domainPath = $mainDomain."/server";
	$clientDomainForLink = $mainDomain.$public."/w";
	$emailImagePath = "https://app.".$domainName;
	$companyLogoPath = $mainDomain.'/server/files/uploads/companies_logo/';


	if(!isset($_SERVER['HTTP_REFERER']) AND $DIRECT_ACCESS_PAGE != 'true'){
		header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
		exit;
	}//End if condition  
	
	//Set DSN and PDO instance
	$dsn = "mysql:host=".$host.";dbname=".$dbname.";charset=utf8mb4";
	$pdo = new PDO($dsn,$user,$password);
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$pdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
	
 	//@ JWT Token Secret Key
	$jwt_secret_key = '35GD57&$cs@#sSDG';

	//Variables for Third Party
	// $apiKeyCallMyAppCronJob = 'cma619aead426567'; //https://callmyapp.com/

	#cPanel Credentials for cPanel Api(s)
	// $server_username = "authgzup";
	// $server_password = "kf304kf$5fgkG";
	// $server_ip = "68.65.122.151";
	// $server_port = "2083";


	//@Status Color
	$statusDataGlobal = array(
		'all' => array('icon' => 'las la-list-ul', 'mobileIcon' => 'las la-list-ul', 'color' => 'red'),
		'approved' => array('icon' => 'las la-check-circle', 'mobileIcon' => 'las la-check', 'color' => 'green'),
		'unapproved' => array('icon' => 'las la-exclamation-circle', 'mobileIcon' => 'las la-exclamation', 'color' => 'orange'),
		'on_hold' => array('icon' => 'las la-pause-circle', 'mobileIcon' => 'las la-pause', 'color' => 'purple'),
		'deleted' => array('icon' => 'las la-times-circle', 'mobileIcon' => 'las la-times', 'color' => 'red'),
		'draft' => array('icon' => 'las la-table', 'mobileIcon' => 'las la-table', 'color' => '#e34395'),
		'requested' => array('icon' => 'las la-exclamation-circle', 'mobileIcon' =>  'las la-exclamation', 'color' => '#c44ceb'),
		'replaced' => array('icon' => 'las la-check-circle', 'mobileIcon' =>  'las la-check', 'color' => 'green'),
		'pending' => array('icon' => 'las la-exclamation-triangle', 'mobileIcon' => 'las la-exclamation-triangle', 'color' => 'purple'),
		'export' => array('icon' => 'las la-server', 'mobileIcon' => 'las la-server', 'color' => 'green'),
		'upload' => array('icon' => 'las la-upload', 'mobileIcon' => 'las la-upload', 'color' => 'purple'),
		'import' => array('icon' => 'las la-history', 'mobileIcon' => 'las la-history', 'color' => '#c44ceb'),
	);



	//Tables name
	$users_table = "ep_users";

	// -- User Management Tables
	$users_role_table = "ep_users_role";
	$users_permission_heads_table = "ep_users_permission_heads";
	$users_permission_list_table = "ep_users_permission_list";
	$users_status_table = "ep_users_status";

	// -- Others
	$dropdown_table = "ep_dropdown_general_list";
	$dropdown_country_table = "ep_dropdown_country_list";
	$dropdown_languages_table = "ep_dropdown_languages_list";
	$dropdown_state_table = "ep_dropdown_states_list";
	$dropdown_suburb_table = "ep_dropdown_suburb_list";
	$dropdown_timezone_table = "ep_dropdown_timezone_list";
	$public_holidays_aust_table = "ep_public_holidays_aust";

	// -- Modules
	$job_table = 'ep_jobs';
	$support_worker_form_table = 'ep_support_worker_form';
	$support_worker_status_table = 'ep_support_worker_status';
	$client_form_table = 'ep_client_form';
	$care_plan_table = 'ep_client_care_plan';
	$care_plan_risk_strategy_table = 'ep_client_care_plan_risk_strategy';
	$incident_form_table = 'ep_incident_form';
	$timesheet_employee_table = 'ep_timesheet_employee';
	$timesheet_staff_table = 'ep_timesheet_staff';
	$timesheet_client_table = 'ep_timesheet_client';
	$client_note_table = 'ep_client_note';
	$client_progress_note_table = 'ep_client_progress_note';
	$client_appointment_table = 'ep_client_appointment';

	// -- Service Plaining
	$service_list_table = 'ep_service_list';
	$service_plaining_table = 'ep_service_plaining';
	$service_plaining_rr_table = 'ep_service_plaining_request_replace';
	$service_plaining_rspw_table = 'ep_service_plaining_replaced_spw';
	$service_timing_table = 'ep_service_timing';
	$shift_edit_table = 'ep_shift_edit';
	$shift_unattended_table = 'ep_shift_unattended';


	// -- Document Generate Module
	$document_generate_table = 'ep_document_generate';
	$document_list_table = 'ep_document_list';

	// -- Document tracking Module
	$document_tracking_table = 'ep_document_tracking';

	// -- Reporting
	$report_column_preset_data_table = 'ep_report_column_preset_data';
	$report_column_preset_title_table  = 'ep_report_column_preset_title';

	// -- Backup
	$backup_table = 'ep_backup';

	// -- Companies
	$companies_table = "ep_companies";
	$branches_table = "ep_companies_branches";

	// -- Settings
	$email_module_main_table = 'ep_settings_email_module_main';
	$email_module_sub_table = 'ep_settings_email_module_sub';
	$email_delivery_servers_table = 'ep_settings_email_delivery_servers';
	$email_sender_receiver_table = 'ep_settings_email_sender_receiver';
	$email_template_table = 'ep_settings_email_template';
	$email_sent_list = 'ep_settings_email_sent_list';



	//@ Company Global Variable for Email Module
	$company_preset_title_ref_id = '4';
	

?>