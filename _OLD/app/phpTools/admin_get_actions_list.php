<?php
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';

global $wpdb;
$sql ="SELECT list_0_user_id_action_id.action_id,list_0_user_id_action_id.user_id,list_0_actions_base.txt,list_0_actions_base.status";
$sql .="FROM list_0_actions_base INNER JOIN list_0_user_id_action_id ON list_0_user_id_action_id.action_id =list_0_actions_base.id";

$posts = $wpdb->get_results($sql);

echo json_encode($posts);

?>