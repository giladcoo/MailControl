<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
"http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
  <title>Email viewer</title>
  <style>
  body {background-image: url(http://localhost/background.jpg);
        background-color: black;

        }
  .boxed {
  border: 2px groove blue ;
  background-color: white;
  
}
  </style>

 
  
  </head>
  
  <body> 
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

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
	$message .= "<div class=\"boxed\" align=\"right\">";
	$message .= "<b>Date: </b>" . $date . "<br>" . "<b>Subject:  </b>" . $subject; 
	$message .= "<hr /><br><br>";
	$message .= imap_base64(imap_fetchbody($inbox,$email_number,2));          //get body of current email
	$message .= "</div>";
	$message .= "<br>";
	
 
  }
   
} 

// close the connection 
imap_close($inbox);

//return a string containing requested emails
echo $message;

?>

</body>
</html>