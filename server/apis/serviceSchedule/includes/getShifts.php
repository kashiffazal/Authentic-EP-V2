<?php

  #Get all service shift by SPW or Partners
  $spData = dbQuery("
    SELECT 
    sp.id,sp.shift_no,sp.spw_ref_id,sp.spw_partner_ref_id,sp.client_ref_id,sp.frequency,sp.frequencyWeek,sp.service_date,sp.service_day,sp.service_start_time,sp.service_end_time,sp.service_recurring_type,sp.service_from_date,sp.service_to_date,sp.inserted_date,sp.inserted_time,sp.status,
    dr.id AS frequency_id,dr.name AS frequency_name,dr.abbr AS frequency_abbr,
    cl.id AS client_id,CONCAT(cl.first_name,' ',cl.last_name) AS client_name,
    CONCAT(spw.first_name,' ',spw.last_name) AS spw_name,
    CONCAT(spw2.first_name,' ',spw2.last_name) AS spw2_name
    FROM $service_plaining_table AS sp
    INNER JOIN $dropdown_table AS dr ON sp.frequency = dr.id
    INNER JOIN $client_form_table AS cl ON sp.client_ref_id = cl.id
    INNER JOIN $support_worker_form_table AS spw ON sp.spw_ref_id = spw.id
    LEFT JOIN $support_worker_form_table AS spw2 ON sp.spw_partner_ref_id = spw2.id
    WHERE (sp.spw_ref_id IN (".implode(',',$spwIds).") OR sp.spw_partner_ref_id IN (".implode(',',$spwIds).")) AND sp.status = 'approve'
  ")['data'];
  // print_rp($spData);
  $serviceDataBySPW = array();
  $shiftNoForFilterArr = array();
  $clientNameForFilterArr = array();
  $frequencyNameForFilterArr = array();
  $shiftIds = array();
  $shiftByFrequency = array();
  foreach($spData as $v){
    if($v['spw_ref_id']){$serviceDataBySPW[$v['spw_ref_id']][] = $v;}
    if($v['spw_partner_ref_id']){$serviceDataBySPW[$v['spw_partner_ref_id']][] = $v;}
    $shiftNoForFilterArr[] = array('label' => $v['shift_no'], 'value' => $v['id']);
    $clientNameForFilterArr[] = array('label' => $v['client_name'], 'value' => $v['client_id']);
    $frequencyNameForFilterArr[] = array('label' => $v['frequency_name'], 'value' => $v['frequency_id']);
    $shiftIds[] = $v['id'];
    $shiftByFrequency['data'][$v['frequency_abbr']][] = $v;
  }//End foreach

  //Set shift by frequency 
  $frequencyLabel = dbQuery("SELECT id,name,abbr,sequence FROM $dropdown_table WHERE list_name = 'service_frequency'")['data'];
  $frequencyLabel = sort_multidimensional_array_by_key($frequencyLabel,'sequence');
  $shiftByFrequencyMod = array();
  foreach($frequencyLabel as $v){
    $shiftByFrequencyMod['data'][$v['abbr']] = @$shiftByFrequency['data'][$v['abbr']] ? $shiftByFrequency['data'][$v['abbr']] : array();
    $shiftByFrequencyMod['info'][] = array('label' => $v['abbr'],'id' => $v['id'],'name' => $v['name']);
  }//End foreach
  $shiftByFrequency = $shiftByFrequencyMod;
  unset($shiftByFrequencyMod);
  // print_rp($shiftByFrequency);die();

  $clientNameForFilterArr = array_unique_multidimensional($clientNameForFilterArr);
  $frequencyNameForFilterArr = array_unique_multidimensional($frequencyNameForFilterArr);
  $serviceDayForFilterArr = array(
    array('label' => 'Monday', 'value' => 'monday'),
    array('label' => 'Tuesday', 'value' => 'tuesday'),
    array('label' => 'Wednesday', 'value' => 'wednesday'),
    array('label' => 'Thursday', 'value' => 'thursday'),
    array('label' => 'Friday', 'value' => 'friday'),
    array('label' => 'Saturday', 'value' => 'saturday'),
    array('label' => 'Sunday', 'value' => 'sunday')
  );


  // print_rp($spData);die();
  // print_rp($shiftByFrequency);die();
  // print_rp($serviceDataBySPW);
  // print_rp($shiftIds);

?>