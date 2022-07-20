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

echo ABSPATH;
echo "<br />";


//load the config file or exit if there isn't one
$configFile = ABSPATH . DS . "config.php";

if(file_exists($configFile)){
   require_once $configFile;
}else{
    echo "config file missing <br />";
    exit();
}

