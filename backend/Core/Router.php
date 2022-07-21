<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 1/17/2022
 * Time: 8:19 PM
 */

class Router
{
    private $uri;
    
    public function __construct(){

    }

    public function route($Method){

    }

    public function getRequest()
    {
        $this->uri = $this->geturi()[0];
        switch ($this->uri){
            case "cmd":
                $this->getCommand();
                break;

            default:
                //include_once FRONTEND_PAGE . "main.php";
        }


        
    }

    public function getCommand(){
        print_r($_GET);
        $app = new Application();



        $app->loadModule($this->uri[1]);
    }

    public function postRequest()
    {


        $app = new Application();



        $app->loadModule($_POST['module']);


    }

    public function geturi(){
        $uri = $_SERVER['REQUEST_URI'];
        $uri = explode("/", $uri);
        array_shift($uri);

        return $uri;
    }

}