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
            <button id="go_Btn">Go</button>
        </div>




        <div id="userViewWrapper" class="hidden">
            <div id="userView">
                <button id="clockIn_Btn">Clock In</button>
                <button id="clockOut_Btn">Clock Out</button>
                <button id="checkTime_Btn">Check Time</button>
                <button id="safety_Btn">Safety Sheet</button>
                <button id="exit_Btn">Exit</button>
            </div>
        </div>
    </div>


    <div id="modal_Bg" class="modalBackground hidden"></div>

    <div id="modalWrapper" class=" hidden">
        <div id="modal" class="">
            <div id="modalHeader"></div>

            <div id="modalMainArea">

            </div>
            <button id="exitModal_Btn">exit</button>

        </div>
    </div>



    <script type='module' src='js/main.js'></script>
</body>
</html>





<?php

?>
