<!DOCTYPE html>
<html lang="sv"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&amp;display=swap" rel="stylesheet">
    <title>LoginPage</title>
    <link rel="stylesheet" href="CSS/stilmall.css">
<body>

<?php
require 'classes/user.php';
$message = "";

//Return true if forms has been sent else false
function isFormSent(): bool
{
    return isset($_POST['login']) ? true : false;
}

//Return true if querystring in $item exist else false
function getQueryString($item)
{
    return isset($_GET[$item]) ? true : false;
}

function mainEngine(string &$message)
{
   if (isFormSent())
   {
      //If loginUser success we set $_SESSION['username']="tojo" in sql loginUser
      //If success we redirect to admin.php else we give error message
     if ((new User())->loginUser($_POST['username'], $_POST['password'])) 
     {
        header("Location:admin.php"); //Redirect to admin.php if successful login
     }
     else 
     {
        $message = "Felaktig användarnamn eller lösenord";
     }
   }
   else 
   {
      //This message(Inloggning krävs) is comming from admin or education or experience or webbsite or in case you are not logged in
      //This is just to prevent somebody from enter a secure page from urlen
      $message = getQueryString('message') ? $_GET['message'] : "";     
   }
}
mainEngine($message);
?>

   <div class="wrapper">
     <!--  Login credentials -->
      <div class="center-text">
         <span class="login-header-name">Tony Johansson</span><br><br>
         <span class="login-header-title">Webbutvecklare & Systemutvecklare</span>
      </div>
      <br><br>

      <div class="login-form-wrapper center">
         <?php 
        /*  Give error message if message is set */
         if (isset($message)) 
         {
            echo "<p class='error'>".$message."</p>";
         }
         ?>
      <!-- A form to enter login data such as username and password  -->
         <form class="login-form" method="post">
            <p>
               <label for="username">Användarnamn</label>
               <input type="text" id="username" name="username"  value="" required="">
            </p>
            <p>
               <label for="password">Lösenord</label>
               <input type="password" id="password" name="password" autocomplete="on" value="" required="">
            </p>
            <p>
               <input class="submit-btn" type="submit" value="Logga in" name="login">
            </p>
         </form>
      </div>
   </div> <!-- end wrapper -->
   <script src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous">
  </script>
</body>
</html>


