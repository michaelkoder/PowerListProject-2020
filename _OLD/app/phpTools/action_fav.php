<?php
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';
global $wpdb;

if(isset($_POST["actionId"])){
	
	$actionId=$_POST["actionId"];
	$actionStatus=$_POST["status"];
	
	 	//attacher l'action a l'utilisateur 
	 	$sql1= "UPDATE list_0_users_actions SET `fav` = '".$actionStatus."' WHERE `action_id` = ".$actionId.";";
	 	//echo $sql1;
	 	if($wpdb->query( $wpdb->prepare($sql1))){
		 	echo "1";
		 }
		 else{
		 	echo '00';
		 }
}
else{
	echo '0';
}
?>


















