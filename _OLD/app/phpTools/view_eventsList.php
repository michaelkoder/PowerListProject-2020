<?php 
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
define('WP_USE_THEMES', false);
include_once $path . '/wp-load.php';

//http://wp-events-plugin.com/documentation/shortcodes/

if(isset($_GET["id"])){

	if(isset($_GET["limite"])){
		$limite=$_GET["limite"];
	}
	else{$limite=5;}
	$cathId=$_GET["id"];
	
	//echo do_shortcode('[events_list scope="future" order="asc" limit="'.$limite.'" category="'.$cathId.'"]');
	echo do_shortcode('[events_list_grouped category="'.$cathId.'"]');

}
?>