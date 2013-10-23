<?php

$id = $_GET['id'];
header('Content-Description: File Transfer');
header("Content-type: image/png");
header("Content-disposition: attachment; filename= ".$id.".png");
readfile('images/' . $id . '.png');

?>