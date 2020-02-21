<?php
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';
global $wpdb;
/*
> ajouter l' action a la liste de base des actions en status non publié

> ensuite on recupere l'id et on ajoute l'id de la nouvelle action a la liste des actions users

> créer une catégorie d evenement correspondant a l id de la nouvelle action

>> OPTIMISATIONS 
	> il faut voir si l'action n'existe pas deja dans la base d'action pour ne pas l'ajouter a nouveau
	> si l'action existe déja elle apparais PAS forcement dans la liste des suggestion si elle est pas encore modérée ... 
	> il faut donc chercher le texte dans la base action tous simplement et voir si elle existe déja 
	> si elle existe deja on recupere l id et ajoute juste l'action deja existante a la liste du user courant

>> RACCOURCIS PHP MY ADMIN 

LOGIN >> 
https://phpmyadmin.ovh.net/index.php?pma_username=mistermitest&pma_servername=mistermitest.mysql.db

TABLES >>>
https://phpmyadmin.ovh.net/sql.php?db=mistermitest&token=9cf29a0264615a574a58afb826c0309e&goto=db_structure.php&table=list_0_actions_base&pos=0#PMAURL-0:sql.php?db=mistermitest&table=list_0_actions_base&server=1&target=&token=9cf29a0264615a574a58afb826c0309e
https://phpmyadmin.ovh.net/sql.php?db=mistermitest&token=9cf29a0264615a574a58afb826c0309e&goto=db_structure.php&table=list_0_user_id_action_id&pos=0#PMAURL-0:sql.php?db=mistermitest&table=list_0_user_id_action_id&server=1&target=&token=9cf29a0264615a574a58afb826c0309e
https://phpmyadmin.ovh.net/sql.php?db=mistermitest&token=9cf29a0264615a574a58afb826c0309e&goto=db_structure.php&table=list_term_taxonomy&pos=0
https://phpmyadmin.ovh.net/index.php?db=mistermitest&target=db_structure.php&token=9cf29a0264615a574a58afb826c0309e#PMAURL-2:sql.php?db=mistermitest&table=list_terms&server=1&target=&token=9cf29a0264615a574a58afb826c0309e
*/

if(isset($_POST["actionId"])){
	
	
	$newActionId=$_POST["actionId"];
	global $current_user;
	$current_user= $current_user->id;
	
	 	//attacher l'action a l'utilisateur 
	 	$sql1= "INSERT INTO list_0_users_actions (`id`, `user_id`, `action_id`, `fav`, `done`) VALUES (NULL, '".$current_user."', '".$newActionId."', '0', '0');";
	 	if($wpdb->query( $wpdb->prepare($sql1))){
		 	//echo '1';
		 	//echo '<br> ajout action step 2 OK > '.$newActionId.'- '.$current_user;
		 	echo "1";
				 
				 
		 }
		 else{
		 	echo '000';
		 }
}
else{
 echo '0';
}
?>


















