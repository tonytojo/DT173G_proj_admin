<!-- <?php include "config/config.php";?> -->
<?php


include "includes/header.php";
function mainEngine(): void
{ 
    //This admin page is a secure page so if you are not logged in we redirect to login.php page 
    //else we show this admin page
    //A person is logged in if the session variable username = tojo
    //We also add a querystring to login.php that say "Inloggning krävs" if redirected to login.php
    if ($_SESSION['username'] != "tojo") 
    {
        header("Location:login.php?message=Inloggning krävs"); //Redirect to login.php
        exit();
    } 
}
mainEngine();

?>
  <!--   Here we have three tables that is used to load the data for utbildning, webbplats och erfarenhet -->
    <h2 class="page-title">Utbildning</h2>
    <table id="education">
    </table>

    <h2 class="page-title">Skapade webbplatser</h2>
    <table id="webbsite">
    </table>

    <h2 class="page-title">Erfarenhet</h2>
    <table id="experience">
    </table>

   
<script src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous">
  </script>

<script>
    var devMode = <?php echo json_encode($devMode, JSON_HEX_TAG); ?>; // Don't forget the extra semicolon!
</script>
  
<script src="js/admin.js"></script>

<?php include "includes/footer.php";?>


