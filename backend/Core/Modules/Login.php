<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/20/2022
 * Time: 8:30 AM
 */

require_once CORE . "Message.php";

class Login
{

    private $app;

    public function __construct(Application $App){
        $this->app = $App;
    }

    public function execute(){

        $msg = new Message();

        $query = $this->app->db->prepare("Select fName, lName, user_status FROM users WHERE username = ?");


        if($query->execute([$_POST['username']])){

            if($user = $query->fetch()){
                $msg->success = true;

                $msg->data = $user;

                $msg->send();
            }else{
                $msg->errorCode = 300;
                $msg->errorMsg = "no user name";

                $msg->send();
            }


            //print_r($user);


        }else{
            throw new Exception("username look up failed");
        }
    }

}