<?php
  $res = dbQuery("
  SELECT cn.id,cn.client_ref_id,
  GROUP_CONCAT(cn.note SEPARATOR '(%)') AS note,
  GROUP_CONCAT(cn.inserted_date SEPARATOR '(%)') AS inserted_date,
  GROUP_CONCAT(cn.inserted_time SEPARATOR '(%)') AS inserted_time,
  CONCAT(ct.first_name,' ',ct.last_name) AS client_name,
  GROUP_CONCAT(ut.first_name,' ',ut.last_name SEPARATOR '(%)') AS sp_name,
  GROUP_CONCAT(ut.id SEPARATOR '(%)') as sp_id,
  GROUP_CONCAT(ut.profileImage SEPARATOR '(%)') as sp_img,
  ut.slug_color
  FROM $client_note_table AS cn
  INNER JOIN $client_form_table AS ct ON cn.client_ref_id = ct.id
  INNER JOIN $users_table AS ut ON cn.inserted_by = ut.id
  WHERE cn.status = 'active'
  GROUP BY cn.client_ref_id
  ORDER BY cn.id DESC LIMIT 5
  ");
  $arr = array();
  foreach($res['data'] as $v){
  $v['note'] = explode('(%)',$v['note']);
  $v['sp_name'] = explode('(%)',$v['sp_name']);
  $v['sp_id'] = explode('(%)',$v['sp_id']);
  $v['sp_img'] = explode('(%)',$v['sp_img']);

  $v['inserted_date'] = explode('(%)',$v['inserted_date']);
  $v['inserted_time'] = explode('(%)',$v['inserted_time']);
  foreach($v['inserted_date'] as $kd => $vd){
    $v['note'][$kd] = array(
      'note' => $v['note'][$kd], 
      'date' => dateFormat($vd,$v['inserted_time'][$kd])
    );
  }//End foreach
  #Set name and image in single array for make it unique
  foreach($v['sp_name'] as $kp =>  $vp){
    $v['sp_name'][$kp] = array(
      'name' => $vp, 
      'img' => @$v['sp_img'][$kp] ? $v['sp_img'][$kp] : '',
      'nameSlug' => name_slug($vp),
      'slug_color' => $v['slug_color']
    );
  }//End foreach
  $v['sp_name'] = array_unique_multidimensional($v['sp_name']);
  #Set image complete url
  foreach($v['sp_name'] as $kp =>  $vp){$v['sp_name'][$kp]['img'] = $vp['img'] ? $domainPath.'/files/uploads/user_profiles/'.$vp['img'].'?k='.rand() : '';}
  unset($v['sp_img'],$v['slug_color']);
  $arr[] = $v;
  }//End foreach

?>