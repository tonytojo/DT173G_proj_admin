<?php include "config/config.php";?>
<?php include "includes/header.php";?>

<br>
<h2 class="page-title">Erfarenhet</h2>
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
<table id="experience" class="tblpost">
</table>

<!-- Input data for the education form -->
<!-- The code will scroll to this place instead of you having to do it youself -->
<div id="scroll-to-here">
<form class="myform" id="myform">
      <!--  Input Arbetsplats -->
   <div class="rad">
      <div class="col-25">
         <label for="workplace">Arbetsplats</label>
      </div>
      <div class="col-75">
         <input type="text" id="workplace" name="workplace">
      </div>
   </div>

      <!--  Input Title -->
   <div class="rad">
      <div class="col-25">
         <label for="title">Titel</label>
      </div>
      <div class="col-75">
         <input type="text" id="title" name="title">
      </div>
   </div>
               
      <!--  Input Anställningsår -->
   <div class="rad">
      <div class="col-25">
         <label for="start">Start</label>
      </div>
      <div class="col-75">
         <input type="text" id="start" name="start"  placeholder="YYYY-MM">
      </div>
   </div>

    <!--  Input Anställningslut -->
   <div class="rad">
      <div class="col-25">
         <label for="end">Slut</label>
      </div>
      <div class="col-75">
         <input type="text" id="end" name="end" placeholder="YYYY-MM">
      </div>
   </div>

   <div class="rad">
      <div class="col-25">
         <label for="description">Beskrivning</label>
      </div>
      <div class="col-75">
         <input type="text" id="description" name="description">
      </div>
   </div>
   
   <div class="rad">
      <input type="hidden" id="experienceId" name="experienceId" value="">
      <input class="submit-btn" id="addExperience" type="submit" value="Lägg till erfarenhet">
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

<script src="js/experience.js"></script>

<?php include "includes/footer.php";?>
