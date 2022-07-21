<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/20/2022
 * Time: 5:09 PM
 */


require_once CORE . "Message.php";


class TimeEvent
{
    private $app;

    public function __construct(Application $App){
        $this->app = $App;
    }

    public function execute(){
        if(!isset($_POST['username'])){
            echo json_encode([
                "status" => 'false',
                "msg" => "username is blank"
            ]);

            exit();
        }


        if($this->app->timeClock->timeStamp($_POST['username'])){
            echo json_encode([
                'status' => 'true'
            ]);
        }else{
            throw new Exception("Error with TimeClock");
        }
    }

}



