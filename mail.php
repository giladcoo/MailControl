
<html>
<head>
  <title>Email viewer</title>
  <img align="right" src="http://localhost/mc.jpg"width="100" height="50"  />
  <br>
  <br>
  <br>
  <h1>Unread email from: 
  <?php
     echo $_GET[ 'searchKey' ];
	 ?>
 </h1>
    
  </head>
  
  <body>
 
 
<?php
$hostname = '{imap.gmail.com:993/ssl}INBOX';
$username = $_GET[ 'user' ];
$password = $_GET[ 'pass' ];
$key = $_GET[ 'searchKey' ];
$message = "<div style=\"color:red\" align=\"right\"><br>NO MESSAGES</div>";



//open stream to gmail server
$inbox = imap_open($hostname,$username . '@gmail.com' ,$password) or die('Cannot connect to Gmail: ' . imap_last_error());



// get emails 
$emails = imap_search($inbox,'UNSEEN FROM ' . $key );

// if emails are returned, traverse emails
if($emails) {
  
  
  $message = "";
 
  rsort($emails);                          //sort emails
  
  
  foreach($emails as $email_number) 
  {
    
    $overview = imap_fetch_overview($inbox,$email_number,0);  
	
	if ( array_key_exists( "subject", get_object_vars( $overview[0] ) ) )   //check if subject included in message
     {  $subject = $overview[0]->subject; 	                               //get subject of current email
	    $tempSubject = imap_mime_header_decode($subject);
        $subject = quoted_printable_decode($tempSubject[0]->text);
	 }
   else
      $subject = "";
	   
                                    	   
    
	$date = $overview[0]->date;                                  //get date of current email
	$message .= "<div align=\"right\">";
    $message .= "<br><br>";
	$message .= "<b>Date: </b>" . $date . "<br>" . "<b>Subject:   </b>" . $subject; 
	$message .= "<br><br>";
	$message .= imap_base64(imap_fetchbody($inbox,$email_number,2));          //get body of current email
	$message .= "</div>";
	$message .= "<hr />";
	
 
  }
   
} 

// close the connection 
imap_close($inbox);

//return a string containing requested emails
echo $message;

?>

</body>
</html>