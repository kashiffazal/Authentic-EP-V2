<?php
  #Getting Essentials variables from DB
  #Getting Client Details
  $clientData = dbQuery("
    SELECT 
      CONCAT(cl.first_name,' ',cl.last_name) AS client_name,cl.dateOfBirth AS client_dob,cl.gender AS client_gender,cl.ndisNumber AS client_ndisNumber,cl.contactNumber AS client_contactNumber,
      CONCAT(cl.street_address,', ',cl.suburb,', ',st.name,', ',cl.postCode) AS client_address 
    FROM $client_form_table AS cl 
    LEFT JOIN $dropdown_state_table as st ON cl.state = st.id
    WHERE cl.id = '".$data['client_ref_id']."'
  ")['data'][0];
  $data = array_merge($data,$clientData);
  // print_rp($clientData);

  #Getting SPW or User
  if($data['whos_filling'] === 'user'){$data['spw_user_ref_id'] =  $data['spw_user_ref_id'].'=>';}//End if condition
  $data['ud'] = getSPWInfo($data['spw_user_ref_id'],$data['client_ref_id'])['data'];
  // print_rp($data['ud']);

  #Getting Subject of Allegation
  if(@$data['spw_ref_id_allegation'] AND @$data['spw_ref_id_allegation'] !== '-'){//Means if it's Support Worker
    $data['sa'] = getSPWInfo($data['spw_ref_id_allegation'])['data'];
    $data['sa']['employer'] = $companyDetails['name'];
  }else{
    $data['sa']['name'] = @$data['allegation_surname'].' '.@$data['allegation_other_name'];
    $data['sa']['gender'] = @$data['allegation_gender'];
    $data['sa']['mobile'] = @$data['allegation_phone'];
    $data['sa']['employer'] = '';
    $data['sa']['service_provided'] = '';
  }//End if condition

  #Getting Service name fro array
  foreach($data['ud']['service_provided'] as $v){
    if($data['activity_engaged'] === $v['value']){
      $data['activity_engaged'] = $v['label'];
    }//End if condition
  }//End foreach
  
  #Create PDF
  require_once '../plugins/mpdf-8.1.4/vendor/autoload.php';
  include "../apis/incident/post/includes/pdf_html.php";//Set $html;
  $path = "../files/documents/incident/forms";
  if(@$_SESSION['link_id'] OR @$external){
    #Create PDF for SPW
    $fileName = $res['id'].'-una-incident-form';
  }else{
    #Create PDF for Admin 
    $fileName = $res['id'].'-apr-incident-form';
  }//End if condition
  
  $file_ref = createPDF($path,$fileName,$html,$header,$footer);
  // print_rp($file_ref);


?>