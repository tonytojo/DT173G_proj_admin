<?php /* made by Tony johansson tojo8500@student.miun.se */?>

<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="CSS/stilmall.css" type="text/css">

    <meta name="format-detection" content="telephone=no" />
</head>

<body>
    <header id="mainheader">
   <!--  <?php include "config/config.php";?> -->

<?php
//We make it possible to logout from the admin part
if (!empty($_SESSION)) 
{
    $currUser = $_SESSION['username'];
    echo "<a style=\"margin-top:1em; float:right;padding-right:1em\" href=\"logout.php\">LogOut $currUser </a>";
} 
?>
    <h1>Admin</h1>
    <?php include "includes/mainmenu.php";?>
    <button id="toggle-menu">Visa/dölj</button>
    </header>
          <section class="maincontent">
