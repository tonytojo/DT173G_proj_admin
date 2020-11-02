<?php include "config/config.php";?>
<?php include "includes/header.php";?>

<br>
<h2 class="page-title">Skapade webbplatser</h2>
<br>
<?php

function mainEngine(): void
{ 
    //This admin page is a secure page so if not logged in we redirect to login.php page else 
    //we show this admin page
    //A person is logged in if the session variable username = tojo
    //We also add a querystring to login.php if not logged in which say Inloggning krävs
    if ($_SESSION['username'] != "tojo") 
    {
        header("Location:login.php?message=Inloggning krävs"); //Redirect to login.php
        exit();
    } 
}
mainEngine();
?>

<!--  table element that is used for display the education data -->
<table id="webbsite" class="tblpost">
</table>

<!-- Input data for the education form -->
<!-- The code will scroll to this place instead of you having to do it youself -->
<div id="scroll-to-here">
<form class="myform" id="myform">
      <!--  Input Title -->
   <div class="rad">
      <div class="col-25">
         <label for="title">Title</label>
      </div>
      <div class="col-75">
         <input type="text" id="title" name="title">
      </div>
   </div>

      <!--  Input url -->
   <div class="rad">
      <div class="col-25">
         <label for="url">Url</label>
      </div>
      <div class="col-75">
         <input type="text" id="url" name="url">
      </div>
   </div>
               
      <!--  Input Beskrivning -->
   <div class="rad">
      <div class="col-25">
         <label for="description">Beskrivning</label>
      </div>
      <div class="col-75">
         <input type="text" id="description" name="description">
      </div>
   </div>
   
   <div class="rad">
      <input type="hidden" id="webbsiteId" name="webbsiteId" value="">
      <input class="submit-btn" id="addWebbsite" type="submit" value="Lägg till webbplats">
      <input id="reset" class="reset" type="reset" value="Reset">
   </div>
</form>
</div>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous">
  </script>

<script>
    var devMode = <?php echo json_encode($devMode, JSON_HEX_TAG); ?>; // Don't forget the extra semicolon!
</script>

<script src="js/webbsite.js"></script>

<?php include "includes/footer.php";?>
