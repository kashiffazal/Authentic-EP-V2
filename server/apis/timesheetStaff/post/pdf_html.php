<?php

  // function GVFLC($value){//Get value from List;
  //   global $_POST;
  //   $data = json_decode($_POST['clientsList'],true);
  //   $index = array_search($value, array_column($data, 'id'));
  //   return $data[$index]['name'];
  // }//End function

  function GN($name,$i){
    global $json;
    return @$json[$name][$i] ? @$json[$name][$i].' hrs' : '-';
  }//End function
// echo "asd";

#Header ---------------------------------//
    $header = "
        <div style='margin:0px 0px;'>
            <table border='0' style='width:100%;padding:0;border-collapse: collapse;'>
                <tr>
                  <td width='50%' style='font-size:18px;color:#424242'>
                    <b>Staff Timesheet</b>
                  </td>
                  <td width='50%' style='text-align:right;'><img align='right' src='$pdfOrImagePath/logo-company.png' width='90px'></td>
                </tr>
            </table>
            <!--hr style='margin:5px 0px;border: 0.5pt solid #ccc'/-->
        </div>
    ";
    //---------------------------------------//  
		$footer = '
			<!--hr style="margin:5px 0px;border: 1px solid #e96b28"/-->
			<table width="100%" border="0" style="font-size:12px">
					<tr>
							<td width="50%" ></td>
							<td width="50%" style="text-align: right;"><i>'.date("d-M-Y", strtotime($server_date)).', '.$server_time.'</i> | Page {PAGENO} of {nbpg}</td>
					</tr>
			</table>
		';

  $html = '<html>
  <head>
      <title>Staff Timesheet</title>
      <style>
      .container{
        border:1px solid #e96b28;
        padding:10px;
        height:100%;
        /*background:#eeeeee;*/
      }
      .table{
        width:100%;
        border-collapse: collapse;
      }
      .table tr td{font-size:12px;border:1px solid #999;padding: 9px 10px;border-bottom:none;}
      .tbb{border-bottom:1px solid #999}
      .section{
        background:#e96b28;
        font-size:16px;
        color:#fff;
        font-weight:bold;
        padding:10px;
        margin:-10px;
        margin-bottom:10px;
        margin-top:10px;
      }
      .label{
        font-weight:bold;
        background:#f7f7f7;
        padding:100px;
      }




      </style>
  </head>
  <body style="font-family: \'Roboto\', sans-serif;">
  ';

  $html .= '
  <div class="container">
    <div class="section" style="margin-top:-10px">Other Details</div>
    
    <table class="table tbb">
      <tr>
        <td class="label" width="25%">Staff Name</td>
        <td class="label" width="25%">Staff Email</td>
        <td class="label" width="25%">Fortnight Start</td>
        <td class="label" width="25%">Fortnight End</td>
      </tr>
      <tr>
        <td class="value">'.$dt['first_name'].' '.$dt['last_name'].'</td>
        <td class="value">'.$dt['email'].'</td>
        <td class="value">'.date('jS M Y',strtotime($dt['fortnightStartDate'])).'</td>
        <td class="value">'.date('jS M Y',strtotime($dt['fortnightEndDate'])).'</td>
      </tr>
    </table>

    <div class="section">Timesheet</div>';
      //$jsData = json_decode($dt['json'],true);
      // print_r($json);
      // $jsd = array();
      for($i = 1; $i <= sizeof($json['client_ref_id']); $i++){
        $html .= '
        <table class="table tbb">
          <tr>
            <td class="label" width="25%">Date</td>
            <td class="label" width="25%">Shift No.</td>
            <td class="label" width="25%">Client Name</td>
            <td class="label" width="25%">Service Type</td>
          </tr>
          <tr>
            <td class="value">
            '.date('d-m-Y',strtotime($json['date'][$i])).'
            '.date('l',strtotime($json['date'][$i])).'
            </td>
            <td class="value">'.($json['shift_no'][$i] ? $json['shift_no'][$i] : '-').'</td>
            <td class="value">'.$json['client_name'][$i].'</td>
            <td class="value">'.$json['service_type'][$i].'</td>
          </tr>
          <tr>
            <td class="label">Start Time</td>
            <td class="label">End Time</td>     
            <td class="label">Client Signature</td>
            <td class="label">Staff Signature</td>
			</tr>
          <tr>
            <td class="value">'.($json['start_time_mod'][$i] ? $json['start_time_mod'][$i] : $json['start_time'][$i]).'</td>
            <td class="value">'.($json['end_time_mod'][$i] ? $json['end_time_mod'][$i] : $json['end_time'][$i]).'</td>
            <td class="value" rowspan="9" style="height:200px;text-align:center"><img style="max-width:160px" src="'.$json['client_sign'][$i].'" /></td>
            <td class="value" rowspan="9" style="height:200px;text-align:center"><img style="max-width:160px" src="'.$json['staff_sign'][$i].'" /></td>
          </tr>
          <tr>
            <td class="label">Working Hour</td>
            <td class="label">Public Holiday Hour</td>
          </tr>
          <tr>
            <td class="value">'.$json['normal_hour'][$i].'</td>
            <td class="value">'.$json['public_holidays_hour'][$i].'</td>  
          </tr>
          <tr>  
            <td class="label">Weekend Hour (Saturday)</td>
            <td class="label">Weekend Hour (Sunday)</td>
          </tr>
          <tr>
            <td class="value">'.$json['weekend_hour_sat'][$i].'</td>
            <td class="value">'.$json['weekend_hour_sun'][$i].'</td>
          </tr>
          <tr>
            <td class="label">Total '.$json['day_hour_label'][$i].' Hour</td>
            <td class="label">Km Travel</td>
          </tr>
          <tr><td class="value">'.$json['total_hour'][$i].'</td>
            <td class="value">'.(@$json['km_travel'][$i] ? $json['km_travel'][$i] : '0').'</td>
          </tr>
          <tr>
            <td class="label" colspan="2">Description</td>
          </tr>
          <tr>
            <td class="value" colspan="2">'.(@$json['description'][$i] ? $json['description'][$i] : '-').'</td>
           
          </tr>
        </table>
        <!--hr style="margin-top:10px;margin-bottom:0px"/-->
        
        ';
        if($i <= sizeof($json['client_ref_id'])-1){$html .='<pagebreak>';}
      }//End for


  $html .='
    <div class="section">
      <span style="color:#fff;font-size:16px;font-weight:bold;">Manager Signature/Approval:</span>
    </div>
    <table class="table tbb">
      <tr>
        <td width="100%" style="height:135px;">
          <img style="max-width:150px" src="'.$domainPath.'/files/documents/signatures/staff/'.$insertedId.'-a.png">
        </td>
      </tr>
    </table>

  </div></body></html>';




?>