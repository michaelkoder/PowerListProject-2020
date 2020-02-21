<?php
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';
global $wpdb;
/*

	> il faut voir si l'action n'existe pas deja dans la base d'action pour ne pas l'ajouter a nouveau
	> si l'action existe déja elle apparais PAS forcement dans la liste des suggestion si elle est pas encore modérée ... 
	> il faut donc chercher le texte dans la base action tous simplement et voir si elle existe déja 
	> si elle existe deja on recupere l id et ajoute juste l'action deja existante a la liste du user courant


>> il faut commencer par chercher l'action dans la base > si elle existe on retourne l'id de l existante 
	> si elle n'existe pas on la crée et on retourne l'id de la nouvelle action 

*/

if(isset($_POST["actionTxt"])){
	
	$newAction=$_POST["actionTxt"];
	//on verifie que l'action n est pas déja présente dans la base > si NON > on l ajoute 
	$sqlTest="SELECT * FROM `list_0_actions_base` WHERE `txt` = '".$newAction."'";
	$posts = $wpdb->get_results($sqlTest);
	
	if(count($posts)==0){
	//Creation de la categorie evenement associée au nouvel evenement
			$sql2= "INSERT INTO `list_terms` (`term_id`, `name`, `slug`, `term_group`) VALUES (NULL, '".$newAction."', '".$newAction."', 0);";
			
		 	if($wpdb->query( $wpdb->prepare($sql2))){
			 	//echo '1';
			 	$newCathId=$wpdb->insert_id;
			 	//echo '<br> ajout cathegorie step 1 OK > '.$newCathId.'- '.$current_user;
			 	// 2 eme etape de creation de la catégorie > on met 22 en parent ID pour regrouper les cathégories d'actions en sous catégories
			 	$sql3= "INSERT INTO `list_term_taxonomy` (`term_taxonomy_id`, `term_id`, `taxonomy`, `description`, `parent`, `count`) ";
			 	$sql3.= " VALUES (NULL, ".$newCathId.", 'event-categories', '', 59, 0); ";

				 	if($wpdb->query( $wpdb->prepare($sql3))){
					 	echo $newActionId;
					 		
					 		//on ajoute l action a la base des actions au statut zéro > donc elle n apparais pas d'office dansla liste des suggestions 
							// je doit la valider en la mettant a status 1 
							$sql0= "INSERT INTO list_0_actions_base (`id`,`cathId`, `txt`, `status`) VALUES (NULL, '".$newCathId."', '".$newAction."', '0');";
						
							if($wpdb->query( $wpdb->prepare($sql0))){
						 	
							 		$newActionId=$wpdb->insert_id;
								 	echo $newActionId.';'.$newCathId;
								 		
							}
							else{
							 echo '<br>0000';
							}
							
					 }
					 else{
					 	echo '<br>000';
					 }
					 
			 }
			 else{
			 	echo '<br>00';
			 }
			 
	}
	else{
		//si l'action existe déja on retourne son id 
	 	echo $posts[0]->id;
	}
	
}
else{
 echo '0';
}
?>


















