<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDirectory = 'C:' . DIRECTORY_SEPARATOR . 'xampp' . DIRECTORY_SEPARATOR . 'htdocs' . DIRECTORY_SEPARATOR . 'NeoLearn_Athanasia_Adamidou_ics21019' . DIRECTORY_SEPARATOR . 'myuploads' . DIRECTORY_SEPARATOR;


    if (!file_exists($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }

    $uploadedFile = $uploadDirectory . basename($_FILES['file']['name']);

    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadedFile)) {
        $response = [
            'status' => 'success',
            'message' => 'File uploaded successfully.',
            'file_path' => $uploadedFile,
        ];
        echo json_encode($response);
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Error uploading file.',
        ];
        echo json_encode($response);
    }
}
?>
