<?php
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';
global $wpdb;

if(isset($_POST["actionId"])){
	
	if(isset($_POST["userId"])){
		$userId=$_POST["userId"];
	}
	else{
		global $current_user;
		$userId= $current_user->id;
	}
	$actionId=$_POST["actionId"];
	$sql0= "DELETE FROM list_0_users_actions WHERE action_id = ".$actionId." AND user_id = ".$userId.";";
	//echo $sql0;
	if($wpdb->query($sql0)){
		
			echo "1" ;
	}
	else{
		echo '00';
	}
}
else{
	echo '0';
}
?>


















