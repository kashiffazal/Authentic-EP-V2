<?php

  function getColumnPreset(){
    global $report_column_preset_title_table, $report_column_preset_data_table;
    $resTitle = dbQuery("SELECT id AS value, report_title AS label, possible_status FROM $report_column_preset_title_table")['data'];
    $resData = dbQuery("SELECT id AS value, preset_name AS label,report_title_ref_id FROM $report_column_preset_data_table")['data'];
    // print_rp($resTitle);die();
    foreach ($resData as $vl) {
        foreach ($resTitle as $k => $v) {
            if ($vl['report_title_ref_id'] === $v['value']) {
              // $resTitle[$k]['possible_status'] = ($v['possible_status'] AND gettype($v['possible_status']) !== 'array') ? json_decode($v['possible_status'],true) : array();
              // $resTitle[$k]['possible_status'] = (gettype($v['possible_status']) !== 'arr/ay' && json_decode($v['possible_status'],true) );
             if(gettype($v['possible_status']) !== 'array'){
              $resTitle[$k]['possible_status'] = json_decode($v['possible_status'],true);
             }//End if condition
              $resTitle[$k]['data'][] = $vl;
            } //End if condition
        } //End foreach
        foreach($resTitle as $k => $v){
          if(!@$v['data']){$v['data'] = array();}
          if(!@$v['possible_status']){$v['possible_status'] = array();}
          $resTitle[$k] = $v;
        }//End foreach
    } //End foreach
    // print_rp($resTitle);
    return $resTitle;
  } //End function

  function getPresetColNameAndTable($presetId, $reportTitleRefId = false){
    global $report_column_preset_data_table, $report_column_preset_title_table;
    //#=============================================================================================
    //@ $reportTitleRefId is used to getting TAG list with all programming logic without preset for Email Module
    //#=============================================================================================

    if(!$reportTitleRefId){
      $res = dbQuery("
        SELECT
        cpd.*,
        cpt.*
        FROM $report_column_preset_data_table AS cpd
        INNER JOIN $report_column_preset_title_table AS cpt ON cpd.report_title_ref_id = cpt.id
        WHERE cpd.id = '" . $presetId . "'")['data'][0];
    }else{
      //#Getting TAG list without preset for Email Module
      $res = dbQuery("SELECT cpt.* FROM $report_column_preset_title_table AS cpt WHERE id = '$reportTitleRefId'")['data'][0];
      //?Getting colRefIds
      $colRefIds = array();
      foreach (json_decode($res['col_data'],true) as $v) {
        $colRefIds[] = $v['value'];
      }//End foreach
      $res['columnRefIds'] = implode(',',$colRefIds);
    }//End if condition
    // print_rp($res);

    $res['col_data'] = json_decode($res['col_data'], true);
    $res['columnRefIds'] = explode(',', @$res['columnRefIds']);
    $res['columnWidths'] = explode(',', @$res['columnWidths']);
    $res['columnAlign'] = explode(',', @$res['columnAlign']);
    // print_r($res);
    $tableAndColName = array(
      'tableName' => $res['report_main_table'], 
      'dateColName' => $res['date_col_name'],
      'reportTitle' => $res['report_title'],
      'presetName' => @$res['preset_name'],
      'whereCondition' => $res['where_condition'],
      'colName' => array(), 
      'customColName' => array(),
      'leftJoinData' => array(),
      'leftJoinWithIdData' => array(),
      // 'leftJoinWithIdColName' => array(),
      'tableColArr' => array(),
      'customFilterCol' => array(),
      'col_data' => $res['col_data'],
      'sampleValue' => array(),
      'prefixSessionVar' => array()
    );

    #Add requiredCustomCol into columnRefIds array
    foreach ($res['col_data'] as $k => $v) {
      if(@$v['requiredCustomCol']){
        foreach($v['requiredCustomCol'] as $rv){
          $r = search_array_in_multidimensional($res['col_data'],'colName','po_purchase_price');
          if(array_search($res['col_data'][$r]['value'], $res['columnRefIds']) === false){
            $res['col_data'][$r]['requiredCustomColStatus'] = true;
            $res['columnRefIds'][] = $res['col_data'][$r]['value'];
          }
        }//End foreach
      }//End if condition
      //? It's Prefix for value, attached at the start of the value
      if(@$v['prefixSessionVar']){
        $tableAndColName['prefixSessionVar'][$v['colName']] = $_SESSION[$v['prefixSessionVar']];
      }//End if condition
      //@Email Module Configuration
      //? It will be used to Send Test Email with sample values
      $tableAndColName['sampleValue'][$v['colName']] = $v['sampleValue'];
    }//End foreach
    // print_rp($res);

    foreach ($res['col_data'] as $k => $v) {
        $index = array_search($v['value'], $res['columnRefIds']);
        if ($index !== false) {
          if(@!$v['requiredCustomColStatus']){
            $col = array(
                'title' => $v['label'],
                'width' => @$res['columnWidths'][$index],
                'align' => @$res['columnAlign'][$index],
                'dataIndex' =>  $v['colName'],
                'sorter' =>  $v['sortType'],
            );
            $tableAndColName['tableColArr'][$index] = $col;
            $tableAndColName['customFilterCol'][$index] = array('label' => $col['title'], 'value' => $col['dataIndex']);
          }//End if condition
            // $tableAndColName['colName'][] = $v['colName'];

            #Add Required Col
            if(@$v['requiredCol']){
              foreach($v['requiredCol'] as $rv){$tableAndColName['colName'][] = $rv;}//End foreach
              if(@$v['status'] !== 'empty' AND @$v['status'] !== 'custom'){$tableAndColName['colName'][] = $v['colName'];}
            }else{
              if($v['colName'] !== 'key'){
                $tableAndColName['colName'][] = $v['colName'];
              }//End if condition
            }//end if condition

            #Add Custom Required column
            // if(@$v['requiredCustomCol']){
            //   foreach($v['requiredCustomCol'] as $rv){
            //     $tableAndColName['colName'][] = $rv;
            //     $tableAndColName['customColName'][] = $rv;
            //   }//End foreach
            // }//End if condition

            #Add Left Join data for Left Join in Query
            if(@$v['status'] === 'leftJoin'){
              $tableAndColName['leftJoinData'][] = array_merge(array($v['colName'],uniqid('prefix_')),$v['leftJoinData']);
            }//End if condition

            if(@$v['status'] === 'leftJoinWithId'){
              if(@$v['leftJoinWithIdData'][3]){$v['leftJoinWithIdData'][3] = $v['colName'];}
              $tableAndColName['leftJoinWithIdData'][] = $v['leftJoinWithIdData'];
            }//End if condition
        } //End if condition
    } //End 
    #Sort an associative array in ascending order, according to the key
    ksort($tableAndColName['tableColArr']);
    ksort($tableAndColName['customFilterCol']);

    $tableAndColName['colName'] = array_unique($tableAndColName['colName']);
    $tableAndColName['customColName'] = array_unique($tableAndColName['customColName']);

    // print_r($tableAndColName);die();
    // print_r($tableAndColName['colName']);
    // print_r($tableAndColName['customColName']);die();
    // print_rp($tableAndColName);
    return $tableAndColName;
  } //End function

  function setSelectColAndLeftJoin($data){
    $selectCols = '';
    $leftJoin = '';
    foreach($data['leftJoinData'] as $v){
      if(array_search($v[0],$data['colName']) !== false){
        if (strpos($v[2], ',') !== false) {
          $c = explode(',',$v[2]);
          $selectCols .= " ,CONCAT($v[1].$c[0],' ',$v[1].$c[1])";
        }else{
          $selectCols .= ",$v[1].$v[2]";
        }//End if condition
        $selectCols .= " AS $v[0]";
        $leftJoin .= " LEFT JOIN $v[3] AS $v[1] ON mt.$v[0] = $v[1].id";
      }//End if condition
    }//End foreach
    return array(@$selectCols,@$leftJoin);
  }//End function

  function setSelectColAndLeftJoinWithID($data){
    $selectCols = '';
    $leftJoin = '';
    $leftJoinSecondLayers = '';
    $tableArr = array();
    foreach($data['leftJoinWithIdData'] as $v){$tableArr[$v[2].'=>'.$v[1]][] = array(array(@$v[5],uniqid('prefixLJID_2_')),array($v[0],(@$v[3] ? @$v[3] : $v[0]),(@$v[4] ? @$v[4] : false)));}//End foreach
    // print_r($tableArr);
    foreach($tableArr as $k => $value){
      // print_r($value);
      $prefix1 = uniqid('prefixLJID_1_');
      // $prefix2 = uniqid('prefixLJID_2_');
      foreach($value as $vl){
 
        if(@$vl[0][0]){
          
          if (strpos($vl[1][2], ',') !== false) {
            $c = explode(',',$vl[1][2]);
            $selectCols .= " ,CONCAT(".$vl[0][1].".$c[0],' ',".$vl[0][1].".$c[1]) AS ".$vl[1][1];
          }else{
            $selectCols .= ",".$vl[0][1].".".$vl[1][2]." AS ".$vl[1][1];
          }//End if condition
          $leftJoinSecondLayers .= " LEFT JOIN ".$vl[0][0]." AS ".$vl[0][1]." ON $prefix1.".$vl[1][0]." = ".$vl[0][1].".id";
          
          // echo $vl[1][0].' | ';
          $index = array_search($vl[1][0],$data['colName']);
          unset($data['colName'][$index]);

        }else{
          $selectCols .= ", $prefix1.".$vl[1][0]." AS ".$vl[1][1];
          if($vl[1][0] !== $vl[1][1]){
            $index = array_search($vl[1][1],$data['colName']);
            unset($data['colName'][$index]);
          }//En dif condition
        }//End if condition

      }//End foreach
      $k = explode('=>',$k);
      $leftJoin .= " LEFT JOIN $k[0] AS $prefix1 ON mt.$k[1] = $prefix1.id";
      $leftJoin .= $leftJoinSecondLayers;

      // if(@$k[2]){
      //   $leftJoin .= " LEFT JOIN $k[2] AS $prefix2 ON $prefix1.$v[0] = $prefix2.id";
      // }

    }//End foreach
    return array($selectCols,$leftJoin,$data);
  }//End if condition

  function getTableDataListWithPreset($presetId,$reportTitleRefId = false, $rowId = false,$fromDate = false, $toDate = false, $status = false){
    //#=============================================================================================
    //@ $reportTitleRefId and $rowId is used for Tag list for Email Module not For Reporting Module
    //#=============================================================================================

    $data = getPresetColNameAndTable($presetId,$reportTitleRefId);
    // print_rp($data);
    
    //? When $rowId is 'sampleValue' then just get sample value for send test email from Email Module
    //? Otherwise make query and get actual data from DB 
    if($rowId !== 'sampleValue'){
      //# Making query ========================================================#
      $selectColAndLeftJoin = setSelectColAndLeftJoin($data);
      $selectCols = $selectColAndLeftJoin[0];
      $leftJoin = $selectColAndLeftJoin[1];
      foreach($data['customColName'] as $k => $v){
        $index = array_search($v,$data['colName']);
        if($index !== false){unset($data['colName'][$index]);}//End if condition
      }//End foreach
      //#=======================================================================#

      $selectColAndLeftJoinWithId = setSelectColAndLeftJoinWithID($data);
      $selectCols .= $selectColAndLeftJoinWithId[0];
      $leftJoin .= $selectColAndLeftJoinWithId[1];
      $data = $selectColAndLeftJoinWithId[2];
      // print_r($l);die();

      //#Fetch with specific status ==========================================#
      if($status){$whereClose = "WHERE mt.status = '$status'";}//End if condition

      //#Add date range if available ===========================================#
      if($data['dateColName'] !== 'inserted_date'){
        $dateCol = "DATE_FORMAT(STR_TO_DATE(mt.".$data['dateColName'].",'%d-%m-%Y'),'%Y-%m-%d')";
      }else{
        $dateCol = "DATE(mt.".$data['dateColName'].")";
      }//End if condition
      if ($fromDate or $toDate) {
        if ($fromDate) {$fromDate = date('Y-m-d', strtotime($fromDate));}
        if ($toDate) {$toDate = date('Y-m-d', strtotime($toDate));}
        if ($fromDate AND !$toDate) {$dateConition = "$dateCol >= '$fromDate'";} //End if condition
        if (!$fromDate AND $toDate) {$dateConition = "$dateCol <= '$toDate'";} //End if condition
        if ($fromDate and $toDate) {$dateConition = "$dateCol BETWEEN '$fromDate' AND '$toDate'";} //End if condition
        $whereClose = (@$whereClose ? $whereClose." AND " : "WHERE ") . @$dateConition;
      } //End if condition
      //#=======================================================================#
      
      //#Set where condition from preset table if it's given ===================#
      if($data['whereCondition']){
        $whereClose = (@$whereClose ? $whereClose." AND " : "WHERE ") . @$data['whereCondition'];
      }//End if condition
      
      if($rowId){
        $whereClose = (@$whereClose ? $whereClose." AND " : "WHERE ") . "mt.id = '$rowId'";
      }//End if condition

      //#Creating Main Query and execute =======================================#
      $query = "SELECT mt.".implode(',mt.',$data['colName']).$selectCols.' FROM '.$data['tableName'].' AS mt '.$leftJoin.' '.@$whereClose.' ORDER BY '.($data['dateColName'] ? $dateCol : 'mt.id');
      
      // echo $query;die();
      // echo $query.' -------------------- ';
      $res = runQueryForPresetTable($query,$data['prefixSessionVar']);

    }else{
      //? Set Prefix value
      if(sizeof($data['prefixSessionVar']) > 0){
        foreach ($data['sampleValue'] as $key => $vl) {
          foreach ($data['prefixSessionVar'] as $k => $v) {
            if($k === $key){$data['sampleValue'][$key] = $v.$vl;}
          }//End foreach
        }//End foreach
      }//End if condition
      //? Getting sample values to send test email from Email Module 
      $res = array('status' => true, 'data' => array($data['sampleValue']));
    }//End if condition for sample value
    
    unset($data['sampleValue']);
    $res['presetData'] = $data;
    // print_rp($res);
    return $res;
  }//End function

  function runQueryForPresetTable($query,$prefixSessionVarArr = array()){
    global $service_list_table;
    $pdo_res = executePDO($query);
    $errorMsg = $pdo_res['errorMsg'];
    if(!$errorMsg){
      // echo $pdo_res['errorMsg'];
      #Separate Columns for make separate query then add main data or table array
      $colSeparate = array(
        'services_ref_ids' => array()
      );
      
      $arr = array();$i = 1;
      $emptyPlaceholder = '- ';
      while($row = $pdo_res['data']->fetch()) {
        #Set Separate Col Array
        foreach($colSeparate as $k => $v){if(@$row[$k]){foreach(explode(',',$row[$k]) as $ev){$colSeparate[$k][] = $ev;}}}//End foreach
        $row['key'] = $i;
        if(@$row['status']){$row['status'] = ucwords(str_replace('_',' ',$row['status']));}
        
        if(array_key_exists('first_name', $row) OR array_key_exists('last_name', $row)){
          $row['full_name'] = @$row['first_name'].' '.@$row['last_name'];
        }//End if condition
        if(array_key_exists('first_name', $row) AND @!$row['first_name']){$row['first_name'] = $emptyPlaceholder;}
        if(array_key_exists('last_name', $row) AND @!$row['last_name']){$row['last_name'] = $emptyPlaceholder;}

        if(array_key_exists('inserted_date', $row)){
          $row['inserted_date'] = dateFormat($row['inserted_date'],false,'d-m-Y');
          $row['inserted_date_time'] = $row['inserted_date'].', '.$row['inserted_time'];
        }else{
          $row['inserted_date_time'] = $emptyPlaceholder;
        }//End if condition
        if(array_key_exists('updated_date', $row)){
          $row['updated_date'] = dateFormat($row['updated_date'],false,'d-m-Y');
          $row['updated_date_time'] = $row['updated_date'].', '.$row['updated_time'];
        }else{
          $row['updated_date_time'] = $emptyPlaceholder;
        }//End if condition  

        $r = array();
        foreach($row as $k => $v){
          //?Add Placeholder in empty value
          $r[$k] = (isset($row[$k])) ? $row[$k] : $emptyPlaceholder;
          //?Add Prefix into value
          if(@$prefixSessionVarArr[$k]){$r[$k] = $prefixSessionVarArr[$k].$row[$k];}
        }//End foreach
        $row = $r;

        $arr[] = $row;
        $i++;
      } //End while loop
      // print_r($arr);
      #Fetch missing or separated columns ===================================================================#
      if(sizeof($colSeparate['services_ref_ids']) > 0){
        $serviceData = dbQuery("SELECT id,CONCAT(code,'-',name) AS name FROM $service_list_table WHERE id IN(".implode(',',$colSeparate['services_ref_ids']).")",array('indexAsId' => true));
        $colSeparate['services_ref_ids'] = $serviceData;
      }//End if condition
      #======================================================================================================#
      // print_r($colSeparate);
      #Update data or table array with separate column data
      foreach($arr as $key => $value){
        foreach($colSeparate as $k => $v){
          // print_rp(@$value);
          if(@$value[$k] AND @$value[$k] !== $emptyPlaceholder){
            $value[$k] = explode(',',$value[$k]);
            $dt = array();
            foreach($value[$k] as $id){
              // print_rp(@$v);
              $dt[] = @$v[$id]['name'];
            }//End foreach
            $arr[$key][$k] = implode(', ',$dt);
            // $arr[$key][$k] = $value[$k];
          }//End if condition
        }//End foreach
      }//End foreach
      #===================================================#
      // print_r($arr);
      $res = array('status' => true, 'data' => $arr);
    }else{
      $res = array('status' => false, 'errorMsg' => $errorMsg, 'errorNotifyType' => 'notify');
    }//End if condition of ErrorMsg
    return $res;
  }//End function


  function createHTMLTableForListData($tableCol,$tableData){
    $html = '<table class="list_table" width="100%" cellspacing="0"><tr>';
    foreach($tableCol as $v){$html .= '<th width="'.$v['width'].'%" align="'.$v['align'].'">'.$v['title'].'</th>';}//End foreach
    $html .= '</tr>';
    foreach ($tableData as $key => $value) {
      $html .= '<tr>';
      foreach($tableCol as $k => $v){$html .= '<td align="'.$v['align'].'">' .(@$value[$v['dataIndex']] ? $value[$v['dataIndex']] : '-'). '</td>';}//End foreach
      $html .= '</tr>';
    } //End foreach
    $html .= '</table>';
    return $html;
  }//End function