
var isLogin = false;


function initialize()
{

   document.getElementById( "okButton" ).addEventListener( "command",doOk, true );
   document.getElementById( "cancelButton" ).addEventListener( "command",doCancel, true );
    isLogin = false;




}

 function doOk()
{

   var userName;
   var password;

   var response;

  
       userName = document.getElementById( "userNameTextbox" ).value;
       password = document.getElementById( "passwordTextbox" ).value;
	   
	   
	   
	 if ( !( validateInput( userName, password )  ) )
	     {
		     alert( "!Invalid Input" );
			 
		 
		 }
 
       
     else
{	 
           
            var url = "https://www.google.com/accounts/ClientLogin";
      var request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);
   

   request.onload = function(aEvent)          //success
	  {
	     response = aEvent.target.responseText;
         
		 
		 if ( response[0 ] == 'S' && response[1] == 'I' && response[2] == 'D' )
		 {
		     
			 self.opener.document.getElementById( "searchTextbox" ).disabled = false;
			 self.opener.document.getElementById( "searchButton" ).disabled = false;
			 isLogin = true;
			 
			
			 
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
	  request.onerror = function(aEvent)      //falilure
	  {
         window.alert("Error Status: " + aEvent.target.status);
      }; 
	  
	  
	  
	 
	 
	request.open("POST", url, true);  
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
    request.send("accountType=HOSTED_OR_GOOGLE&Email=" + userName +  "@gmail.com&Passwd=" + password +  "&service=cl&source=Gulp-CalGulp-1.05");  
 
 

         
      


 


};

function doCancel()
{
 self.close();
};


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

