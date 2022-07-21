<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/20/2022
 * Time: 2:56 PM
 */


require_once CORE . "Message.php";


class GetTimesForUser
{

    private $app;

    public function __construct(Application $App){
        $this->app = $App;
    }

    public function execute(){

        $msg = new Message();


        if(isset($_POST['username'])){
            $query = $this->app->db->prepare("SELECT * FROM clock where username = ? order by time_stamp limit 60;");

            if($query->execute([$_POST['username']])){

                $msg->success = true;
                $msg->data = $query->fetchAll();
            }else{
                $msg->errorMsg = $query->errorInfo();
            }
        }else{
            $msg->errorMsg = "username is blank";
        }


        $msg->send();

    }

}