<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/20/2022
 * Time: 1:32 PM
 */


require_once CORE . "Message.php";


class UserInfo
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

            return;
        }


        $query = $this->app->db->prepare("Select fName, lName, user_status FROM users WHERE username = ?");


        if($query->execute([$_POST['username']])){
            $user = $query->fetch();

            //print_r($user);

            echo json_encode([
                'username' => $_POST['username'],
                'firstName' => $user['fName'],
                'lastName' => $user['lName'],
            ]);
        }else{
            throw new Exception("username look up failed");
        }


    }

}