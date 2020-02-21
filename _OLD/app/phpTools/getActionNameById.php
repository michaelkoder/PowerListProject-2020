<?php
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';
global $wpdb;


if(isset($_GET["actionId"])){
	
	$actionId=$_GET["actionId"];
	
	 	//attacher l'action a l'utilisateur 
	 	$sql1= "SELECT txt FROM `list_0_actions_base` WHERE cathId=".$actionId;
	 	//echo $sql1;
	 	if($name = $wpdb->get_results($sql1,ARRAY_A)){
		 	echo $name[0]['txt'];
		 }
		 else{
		 	echo '00';
		 }
}
else{
	echo '0';
}

?>
