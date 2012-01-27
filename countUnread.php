
<?php

$hostname = '{imap.gmail.com:993/ssl}INBOX';
$username = $_GET[ 'user' ];
$password = $_GET[ 'pass' ];





//open stream to gmail server
$inbox = imap_open($hostname,$username . '@gmail.com' ,$password) or die('Cannot connect to Gmail: ' . imap_last_error());



// get emails 
$emails = imap_search($inbox,'UNSEEN');

if ( $emails == false )
    echo "0";
else
    echo count($emails);


















?>