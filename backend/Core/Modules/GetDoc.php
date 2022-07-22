<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/22/2022
 * Time: 10:35 AM
 */


require_once CORE . "Message.php";

class GetDoc
{

    private $app;

    public function __construct(Application $App){
        $this->app = $App;
    }

    public function execute(){
        $msg = new Message();


        if(isset($_POST['docID'])){

            $query = $this->app->db->prepare("SELECT * FROM documents WHERE id = ?");

            if($query->execute([$_POST['docID']])){
                $msg->sendSuccessful($query->fetch());
            }else{
                $msg->sendError(2, $query->errorInfo());
            }

        }else{
            $msg->sendError(2, "Missing Document ID");
            return;
        }





    }

}