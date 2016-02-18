<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');    
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
}   
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
} 
$files = $_FILES;
$postData = $_POST;

if(!empty($files)){
	$dir = "images/".$postData["type"]."/".$postData["userid"]; 
	if(is_dir($dir) === false){
		mkdir($dir, 0777, true);
	}
	foreach($files as $key => $value){
		
		$file_to_write = $value['tmp_name'];
		foreach($value["tmp_name"] as $k => $v){
			$file_to_write = $v;
			$uploaded_file = $dir."/".$value['name'][$k];
			if(move_uploaded_file($file_to_write, $uploaded_file)){
				$contents = file_get_contents($uploaded_file);
			}	
		}
		
	}
	
}else{
	return "{'error': 'empty files'}";
}

?>