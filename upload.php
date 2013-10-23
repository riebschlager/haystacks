<?php
    // requires php5
    define('UPLOAD_DIR', 'images/');
    $img = $_POST['img'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $id = uniqid();
    $file = UPLOAD_DIR . $id . '.png';
    $success = file_put_contents($file, $data);
    print $success ? $id : 'Unable to save the file.';
?>