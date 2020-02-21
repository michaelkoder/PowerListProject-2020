<?php
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';
global $wpdb;

if(isset($_GET["actionId"])){
	
	$newAction=$_GET["actionId"];
	
	//recuperation de la catégorie ID pour supprimer la 2 eme donnée de la 2 eme table des catégories evenements
	$sql0= "SELECT term_id  FROM `list_terms` WHERE `name` LIKE '".$newAction."'";

	
	if($cathId=$wpdb->get_results($sql0)){
		
		$cathId=$cathId[0]->term_id;
		// nn supprime les 2 elements des tables des catégories evenements !
		$sql1= "DELETE FROM list_terms WHERE name = ".$newAction.";";
		$sql1.= "DELETE FROM list_term_taxonomy WHERE term_id = ".$cathId.";";
		$sql1.= "DELETE FROM list_0_actions_base WHERE id = ".$newAction.";";
		$sql1.= "DELETE FROM list_0_user_id_action_id WHERE action_id = ".$newAction.";";

		$queries = explode(';', $sql1);
		$return ='';
		foreach($queries as $query) {
			  	if($query){
			  		
					if($wpdb->query( $wpdb->prepare($query))){
					 $return ='1';
				   	}
				   	else{
					 $return ='000';
				   	}
			  	}
		  		
			}
			echo $return ;
			//	
	}
	else{
		echo '<br>00';
	}
}
else{
	echo '<br>0';
}
?>


















