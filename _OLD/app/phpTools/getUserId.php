<?php
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';
global $wpdb;


 if ( ! function_exists( 'wp_get_current_user' ) )
        return 0;
    $user = wp_get_current_user();
    $current_user=$user->ID;
	
	if($current_user){
	    
    	echo $current_user;
	}
	else{
	    
	    echo "00";
	}
?>
