<?php
/**
 * Created by PhpStorm.
 * User: chris
 * Date: 7/19/2022
 * Time: 4:39 PM
 */

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Arc Login Site</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/css.css">

    <!--
    image from
    <a href="https://www.flaticon.com/free-icons/safety-glasses" title="safety glasses icons">Safety glasses icons created by Freepik - Flaticon</a>
    -->

</head>
<body>
<div id="main-container">

    <div id="wrapper">
        <input id="userID" type="text">
        <button id="login_Btn">Login</button>
        <button id="checkTime_Btn">Check Time</button>
        <button id="safety_Btn">Safety Sheet</button>
    </div>





    <div id="views">
        <?php /*include FRONTEND_PAGE . "home.php"*/?>


        <?php /*include FRONTEND_PAGE . "documents.php"*/?>


        <?php /*include FRONTEND_PAGE . "doc.php"*/?>

        <?php /*include FRONTEND_PAGE . "timecheck.php"*/ ?>
    </div>
</div>

<script type='module' src='js/main.js'></script>
</body>
</html>





<?php

?>
