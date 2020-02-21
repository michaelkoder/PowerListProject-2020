<?php
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';
global $wpdb;

	$sql ="SELECT * FROM list_0_black_list";

	$posts = $wpdb->get_results($sql);
	
	echo json_encode($posts);

?>