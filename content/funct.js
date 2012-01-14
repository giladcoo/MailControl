


//declare event handlers for login screen buttons
function initialize()
{
   document.getElementById( "okButton" ).addEventListener( "command",doOk, true );
   document.getElementById( "cancelButton" ).addEventListener( "command",doCancel, true );
}


//in case we press "ok" in  login screen, this function checks user
 function doOk()
{

 Components.utils.import("chrome://accessBar/content/commonVariables.jsm");
 

   var response;

       
       user.userName = document.getElementById( "userNameTextbox" ).value;
        user.userPassword = document.getElementById( "passwordTextbox" ).value;
	   
	   
	   
	 if ( !( validateInput( user.userName, user.userPassword )  ) )
		     alert( "!Invalid Input" );
			  
     else
{	 
           
      var url = "https://www.google.com/accounts/ClientLogin";
      var request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);
   

   request.onload = function(aEvent)          //in case object was created successfully
	  {
	     response = aEvent.target.responseText;                   //recieve response from mail server
         
		 
		 if ( response[0 ] == 'S' && response[1] == 'I' && response[2] == 'D' )         //check if user exists
		 {
		     
			 self.opener.document.getElementById( "searchTextbox" ).disabled = false;
			 self.opener.document.getElementById( "searchButton" ).disabled = false;
			 user.isLogin = true;
		     self.close();
         }			
    
	    else
     
	     {
    	 document.getElementById( "msgDescription" ).style.backgroundColor = "red";
         document.getElementById( "msgDescription" ).style.color = "white";
         document.getElementById( "msgDescription" ).childNodes[ 0 ].nodeValue = "Not authenticated.";
         }
			
      }		
	  
   };
	  request.onerror = function(aEvent)      //in case object creation faliled
	  {
         window.alert("Error Status: " + aEvent.target.status);
      }; 
	  
	  
	  
	 
	 //send http request to gmail server in order to authenticate user
	request.open("POST", url, true);  
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
    request.send("accountType=HOSTED_OR_GOOGLE&Email=" + user.userName +  "@gmail.com&Passwd=" + user.userPassword +  "&service=cl&source=Gulp-CalGulp-1.05");  
 
   

};


//in case we press "cancel" in login screen
function doCancel()
{
   
 self.close();
};


//checks if user input has proper length
function validateInput(  name,  pass )
{
   
     if ( ( name.length >= 6 ) && (name.length <= 10 ) )
	     return true;
     else
	     return false;
		 
	
	 if ( pass.length >= 8 )
	     return true;
	else
	     return false;

};







