<!-- <?php include "config/config.php";?> -->
<?php include "includes/header.php";?>

<br>
<h2 class="page-title">Utbildning</h2>
<br>
<?php
function mainEngine(): void
{ 
    //This education page is a secure page so if not logged in we redirect to login.php 
    //page else we show this admin page
    //A person is logged in if the session variable username = tojo
    //We also add a querystring to login.php that say Inloggning krävs if redirected to login.php
  if ($_SESSION['username'] != "tojo") 
  {
        header("Location:login.php?message=Inloggning krävs"); //Redirect to login.php
        exit();
  }
}
mainEngine();
?>
  <!--  table element that is used for display the education data -->
   <table id="education" class="tblpost">
   </table>

<!-- Input data for the education form -->
<!-- The code will scroll to this place instead of you having to do it youself -->
<div id="scroll-to-here">
   <form class="myform" id="myform">
      <!--  Input Lärosäte -->
      <div class="rad">
         <div class="col-25">
            <label for="school">Lärosäte</label>
         </div>
         <div class="col-75">
            <input type="text" id="school" name="school">
         </div>
      </div>

      <!--  Input Kursnamn -->
      <div class="rad">
         <div class="col-25">
            <label for="courseName">Kursnamn</label>
         </div>
         <div class="col-75">
            <input type="text" id="courseName" name="courseName">
         </div>
      </div>
               
      <!--  Input Kursår -->
      <div class="rad">
         <div class="col-25">
            <label for="year">Kursår</label>
         </div>
         <div class="col-75">
            <input type="text" id="year" name="year">
         </div>
      </div>
   
      <div class="rad">
         <input type="hidden" id="educationId" name="educationId" value="">
         <input class="submit-btn" id="addEducation" type="submit" value="Lägg till utbildning">
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

<script src="js/education.js"></script>

<?php include "includes/footer.php";?>
