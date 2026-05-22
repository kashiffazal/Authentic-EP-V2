<?php

$res = getAvailability($_GET['spw1'],$_GET['spw2']);
echo json_encode($res);
