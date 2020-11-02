<?php
declare (strict_types = 1);
error_reporting(E_ALL);

 require 'config/config.php';

class User
{
    private $db;
    private $accountname;
    private $password;

    /*  Connect to the database */
    public function __construct()
    {
        $this->db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DSN);
        $this->db->connect_errno > 0 ? die('Error when connecting to db[' . $db->connect_error . ']') : null;
    }

    //Validate the users credentials. Return true if correct else false
    public function loginUser(string $username, string $password): bool
    {
        //Code to prevent sql injection
        $username = mysqli_real_escape_string($this->db, $username);
        $password = mysqli_real_escape_string($this->db, $password);

        $result = mysqli_fetch_array($this->db->query("select username, password from user 
           where BINARY username = '$username' and BINARY password = '$password'"));
       
        if ($result != null) 
        {
            $_SESSION['username'] = $username;
            return true;
        }
        else 
        {
            return false;
        }

        return $result != null ? true : false;
    }
}
