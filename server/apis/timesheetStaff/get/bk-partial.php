<?php
    
	$pdo_res = executePDO($query);
	// print_rp($pdo_res);
	$arr = array();
	$i = 1;
	while($row = $pdo_res['data']->fetch()){
		$row['fortnightStartDate'] = date('jS M Y',strtotime($row['fortnightStartDate']));
		$row['fortnightEndDate'] = date('jS M Y',strtotime($row['fortnightEndDate']));

		if($row['normal_hour']){$row['th'] = $row['normal_hour'];}
		if($row['weekend_hour_sat']){$row['th'] = $row['weekend_hour_sat'];}
		if($row['weekend_hour_sun']){$row['th'] = $row['weekend_hour_sun'];}
		if($row['public_holidays_hour']){$row['th'] = $row['public_holidays_hour'];}
		$row['th'] =  number_format(array_sum(explode(',',$row['th'])), 2, '.', '').' hr(s)';

		$lastUpdate = $row['updated_date'] ? $row['updated_date'].', '.$row['updated_time'] : $row['inserted_date'].', '.$row['inserted_time'];
		$row['lastUpdate'] = date('jS M Y, h:m:s a',strtotime($lastUpdate));
		$row['pdf_path'] = $domainPath.'/files/documents/timesheets/staff/'.$row['id']."-staff-timesheet-".($row['updated_date'] ? $row['updated_date'] : $row['inserted_date']).'.pdf?k='.rand();
		$row['key'] = $i;
		unset($row['inserted_date']);
		unset($row['inserted_time']);
		unset($row['updated_date']);
		unset($row['updated_time']);

		$arr[] = $row;
		$i++;
	}//End while loop	

?>