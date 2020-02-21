<?php

$path =  dirname( dirname( dirname( dirname( dirname( dirname(__FILE__))))) );
include_once $path . '/wp-load.php';

global $wpdb;
//$posts = $wpdb->get_results("SELECT ID, post_title FROM $wpdb->em_events WHERE post_status = 'publish' AND post_type='post'");
$posts = $wpdb->get_results("SELECT * FROM `list_em_events`");

//echo json_encode($posts);

    
print_r($posts);
//echo get_avatar_url(2);


/*

SELECT list_em_events.event_id,list_em_events.event_name,list_em_events.event_start_date,list_em_events.event_end_date,list_em_events.event_start_time,list_em_events.event_end_time,list_em_events.post_content  FROM list_em_events
INNER JOIN list_users
ON list_users.id = list_em_events.event_owner
*/

/*

require('connect.php');
if(isset($_GET["id"])){
	
	$actionId=$_GET["id"];
}

$sql = "SELECT * FROM `list_em_events`";
$result = $conn->query($sql);
$eventsList=[];
while ($row = $result->fetch_assoc()) {  

	$recup= explode(';',$row['event_attributes']);
	if(count($recup)>1){
		$actionIdBase= explode('"',$recup[1]);
		if($actionIdBase[1]==$actionId){
			array_push($eventsList,$row);
		}
	}
}

// echo get_avatar( get_the_author_meta( 'ID' ), 32 );

echo json_encode($eventsList);

*/
?>