<?php 
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
define('WP_USE_THEMES', false);
include_once $path . '/wp-load.php';

//http://wp-events-plugin.com/documentation/shortcodes/

if(isset($_GET["id"])){
	
	$cathId=$_GET["id"];
	
	echo do_shortcode('[event_form]');
}
?>