<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/21/2022
 * Time: 11:31 AM
 */

class GetDocumentsForUser
{
    private $app;

    public function __construct(Application $App){
        $this->app = $App;
    }

    public function execute(){

        $msg = new Message();

        if(isset($_POST['username'])){

            $query = $this->app->db->prepare("
        SELECT id, title, summary, signature, dateSigned FROM documents left JOIN(
        SELECT * FROM userdocs WHERE userdocs.username = ?) as tempTable
        ON documents.id = tempTable.docid
        ");

            if($query->execute([$_POST["username"]])){
                $msg->sendSuccessful($query->fetchAll());
            }else{
                $msg->sendError(2, $query->errorInfo());
            }

        }else{
            $msg->sendError(404, "no username");
        }




    }

}