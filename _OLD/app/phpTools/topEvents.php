<?php 
$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
define('WP_USE_THEMES', false);
include_once $path . '/wp-load.php';

//http://wp-events-plugin.com/documentation/shortcodes/
//near_unit="km" near_distance="10"


function get_user_ip() {
	// On test les variables serveur…
    foreach ( array(
             'HTTP_CLIENT_IP', 
             'HTTP_X_FORWARDED_FOR', 
             'HTTP_X_FORWARDED', 
             'HTTP_X_CLUSTER_CLIENT_IP', 
             'HTTP_FORWARDED_FOR', 
             'HTTP_FORWARDED', 
             'REMOTE_ADDR' ) as $key ) {
    	// … si elles existes…
        if ( array_key_exists( $key, $_SERVER ) === true ) {
        	// … et pour chacune de leurs valeurs…
            foreach ( explode( ',', $_SERVER[ $key ] ) as $ip ) {
                $ip = trim( $ip );
                // … si c'est une adresse IP, mais pas une interne (ex : 192.0.0.1)…
                if ( filter_var( $ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE ) !== false 
                  // … ou une adresse de loopback (ex : 127.0.0.1)…
                  && ( ( ip2long( $ip ) & 0xff000000 ) != 0x7f000000 ) ) {
                  	// … on la retourne 🙂
                    return $ip;
                }
            }
        }
    }
    // Si aucune valeur n'est correte on renvoie false
    return false;
}
echo 'user IP 

function get_user_coords() {
	//
	$ip = get_user_ip();
	if ( ! $ip ) {
		return false;
	}
		
	// … au format littéral
	$ip = ip2long( $ip );
	if ( ! $ip ) {
		return false;
	}

	global $wpdb;
	$infos = $wpdb->get_row( 
    			$wpdb->prepare( 
    				"SELECT * FROM {$wpdb->prefix}ip2location_db5 WHERE %d BETWEEN ip_from AND ip_to", 
    				$ip ) );
	if ( $infos ) {
		return array(
		'lat' => $infos->latitude;
		'
echo 'user IP > '.get_user_ip();
echo 'user POSITION > '.get_user_coords();

	//echo do_shortcode('[events_list limit="5" near="43.289802, 5.393456" ]');


?>



<script type="text/javascript"
    src="http://www.google.com/jsapi?key=AIzaSyCgyEXz45n0Cwf4joBf4-Er68YsXIbpodM"></script>
<script type="text/javascript">
google.load("maps", "2.x", {callback: initialize});

function initialize() {
  if (google.loader.ClientLocation) {
      var ngtude;
		);
		// Nous obtenons aussi :
		// La ville : $infos->city_name;
		// La région : $infos->region_name;
		// Le pays : $infos->country_name;
		// Le code Pays : $infos->country_code;
	}
}

> '.get_user_ip();

	//echo do_shortcode('[events_li
echo 'user POSITION > '.get_user_coords()();st limit="5" near="43.289802, 5.393456" ]');


?>