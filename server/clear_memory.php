<?php 
  // foreach(array_keys(get_defined_vars()) as $strVarName){unset($$strVarName);} 
  foreach(get_defined_vars() as $k => $v)unset($$k);unset($k, $v);
?>