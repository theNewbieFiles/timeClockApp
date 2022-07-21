<?php
/**
 * Created by PhpStorm.
 * User: chris
 * Date: 7/19/2022
 * Time: 5:05 PM
 */

define("DS", DIRECTORY_SEPARATOR);

//define paths
define( 'ABSPATH', __DIR__ . DS );
define( "BACKEND", ABSPATH . "backend" . DS);
define( "CORE", BACKEND . "Core" . DS);
define( "MODULES", CORE . "Modules" . DS);


//in case its needed
require_once CORE . "Message.php";


//load the config file or exit if there isn't one
$configFile = CORE . "config.php";

if(file_exists($configFile)){
   require_once $configFile;
}else{
    $msg = new Message();
    $msg->errorMsg = "Config File Is Missing";
    $msg->errorCode = 1;

    $msg->send();
    exit();
}




//Application
require_once CORE . "Application.php";

$app = new Application();

//route incoming request
$app->route($_SERVER['REQUEST_METHOD']);
