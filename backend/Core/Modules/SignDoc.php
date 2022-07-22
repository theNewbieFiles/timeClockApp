<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/22/2022
 * Time: 11:32 AM
 */


require_once CORE . "Message.php";

class SignDoc
{
    private $app;

    public function __construct(Application $App){
        $this->app = $App;
    }

    public function execute(){
        $msg = new Message();

        if(isset($_POST['docID']) && isset($_POST['username'])){

            $query = $this->app->db->prepare("INSERT INTO userdocs (docID, username, signature) VALUES (?, ?, ?)");

            if($query->execute([$_POST['docID'], $_POST['username'], $_POST['signature'], ])){
                $msg->sendSuccessful();
            }else{
                $msg->sendError(2, $query->errorInfo());
            }

        }else{
            $msg->sendError(2, "Missing Document ID");
            return;
        }
    }

}