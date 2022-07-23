<?php
/**
 * Created by PhpStorm.
 * User: chris
 * Date: 7/19/2022
 * Time: 12:34 PM
 */

class TimeClock
{
    private $db;

    public function __construct(PDO $DB){
        $this->db = $DB;
    }

    public function clockEvent($Username){
        //get current users login state
        $query = $this->db->prepare("SELECT user_status FROM users WHERE username = ?");

        if($query->execute([$Username])){

            $userStatus = $query->fetch()["user_status"];

            $query = $this->db->prepare("INSERT INTO clock (username, event) values (?, ?)");

            if($query->execute([$Username, $userStatus])){

                $query = $this->db->prepare("UPDATE users SET user_status = ? WHERE username = ?");

                $userStatus = !$userStatus;


                if($query->execute([$userStatus, $Username])){
                    return true;
                }
            }

            return false;


        }

        return true;

    }


}




/*

getting dates after a certain time

You can select this by :

select * from table_name where date_column > "2001-01-01 00:00:00"

or if you need data within certain time frame then you can try using between key word such as:

select * from table_name where date_column
between "2018-01-04 00:00:00" and "2018-01-04 11:59:59";
Note that date format should be in YYYY-MM-DD HH:MM:SS


*/