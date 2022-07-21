<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 1/17/2022
 * Time: 8:19 PM
 */


//database
require_once CORE . "Database.php";


require_once CORE . "TimeClock.php";
class Application
{

    public $user;
    public $db;
    public $timeClock;


    public function __construct(){
        //setup database

        try{
            $this->db = getDatabaseConn();
        }catch (Exception $e){
            die("Error: " . $e->getMessage());
        }



        $this->timeClock = new TimeClock($this->db);


    }

    public function route($Method){

        try{
            switch ($Method){
                case "GET" : //$this->getRequest();
                    break;

                case "POST" : $this->postRequest();
                    break;

                default : exit("Unknown request");

            }
        }catch (Exception $E){
            //TODO: code this part
            echo $E;
        }

    }


    private function postRequest(){
        try{
            $this->loadModule($_POST['module']);
        }catch(Exception $E){
            throw new Exception("Issue with Module", 0, $E);
        }

    }



    public function loadModule($Module)
    {

        $file = MODULES . "$Module.php";

        if(file_exists($file)){
            try{
                require $file;

                $this->$Module = new $Module($this);

                $this->$Module->execute();
            }catch (Exception $E){
                //TODO: code this part
                throw new Exception("Issue with $Module", 0, $E);
            }


        }else{
            throw new Exception("File Doesn't Exist");
        }
    }



}