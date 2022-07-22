<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/20/2022
 * Time: 8:30 AM
 */

require_once CORE . "Message.php";

class GetUserInfo
{

    private $app;

    public function __construct(Application $App){
        $this->app = $App;
    }

    public function execute(){
        $msg = new Message();

        if(isset($_POST['username'])){


            $query = $this->app->db->prepare("Select fName, lName, user_status FROM users WHERE username = ?");

            if($query->execute([$_POST['username']])){

                if($user = $query->fetch()){
                    $msg->sendSuccessful($user);
            }else{
                    $msg->sendError(300, "Username Doesn't Exists");
                }
            }
        }else{
            $msg->sendError(300, "Username Is Blank");
        }




    }

}