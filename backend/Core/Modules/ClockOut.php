<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/20/2022
 * Time: 7:57 PM
 */


require_once CORE . "Message.php";


class ClockOut
{
    private $app;

    public function __construct(Application $App){
        $this->app = $App;
    }

    public function execute(){
        $msg = new Message();


        if($this->app->timeClock->clockOut($_POST['username'])){

            $msg->success = true;

        } else{
            $msg->errorCode = 400;

            $msg->errorMsg = "Unable to login";
        }
        $msg->send();
    }

}