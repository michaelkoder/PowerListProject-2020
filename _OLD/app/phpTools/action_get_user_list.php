<?php
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';
global $wpdb;

if(isset($_GET["userId"])){
	
	$userId=$_GET["userId"];
	
}
else{
	global $current_user;
	$userId= $current_user->id;
}
	$sql ="SELECT list_0_actions_base.id,list_0_actions_base.cathId,list_0_actions_base.txt,list_0_users_actions.fav,list_0_users_actions.done FROM list_0_users_actions "; 
	$sql .="INNER JOIN list_0_actions_base ";
	$sql .="ON list_0_users_actions.action_id = list_0_actions_base.id ";
	$sql .="WHERE list_0_users_actions.user_id=".$userId;
	
	// RECUPERER la liste des actions du userID
	// echo $sql;
	// echo '$userId '.$userId.'<br>';
	if($posts = $wpdb->get_results($sql)){
			echo json_encode($posts);
	}
	else{
		echo '00';
	}
	
	//print_r($posts);
	//$output = array_map(function ($object) { return $object->action_id; }, $posts);
	//echo implode(', ', $output);
?>