<?php
session_start();

error_reporting(-1);
ini_set("display_errors", 1);

$devMode = false;
if ($devMode) {
    define('DB_HOST', "localhost");
    define('DB_USER', "tony");
    define('DB_PASSWORD', "Pissen30060");
    define('DB_DSN', "dt173g_projekt");
} 
else 
{
    define('DB_HOST', "studentmysql.miun.se");
    define('DB_USER', "tojo8500");
    define('DB_PASSWORD', "1xd4phin");
    define('DB_DSN', "tojo8500");
}