<?php
    $headers ='From: mon_adresse@votredomaine.com'."\n";
    $headers .='Reply-To: adresse@votredomaine.com'."\n";
    $headers .='Content-Type: text/plain; charset="iso-8859-1"'."\n";
    $headers .='Content-Transfer-Encoding: 8bit';
    mail('adresseemaildedestination@domaine.com', 'Sujet', 
    'Message contenu de l email', $headers); 
?>