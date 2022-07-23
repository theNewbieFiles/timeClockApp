<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/20/2022
 * Time: 7:45 PM
 */


require_once CORE . "Message.php";


class LogClockEvent{

    private $app;

    public function __construct(Application $App){
        $this->app = $App;
    }

    public function execute(){
        $msg = new Message();


        if($this->app->timeClock->clockEvent($_POST['username'])){

            $msg->success = true;

        } else{
            $msg->errorCode = 400;

            $msg->errorMsg = "Unable to log clock event";
        }
        $msg->send();
    }

}