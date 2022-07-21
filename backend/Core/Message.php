<?php
/**
 * Created by PhpStorm.
 * User: Gravy
 * Date: 7/20/2022
 * Time: 5:58 PM
 */

class Message
{
    //public $status;
    public $success;
    public $data;
    public $errorCode;
    public $errorMsg;

    public function __construct(){

        //set defaults
        //$this->status = "failed";
        $this->success = false;
        $this->data = null;
    }

    public function send(){
        echo json_encode($this);
    }



}