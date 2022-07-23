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


    public function clockIn($Username){
        $query = $this->db->prepare("INSERT INTO clock (username, event) values (?, 1)");

        if($query->execute([$Username])){

            $query = $this->db->prepare("UPDATE users SET user_status = 1 WHERE username = ?");

            if($query->execute([$Username])){
                return true;
            }
        }

        return false;
    }

    public function clockOut($Username){
        $query = $this->db->prepare("INSERT INTO clock (username, event) values (?, 0)");

        if($query->execute([$Username])){
            $query = $this->db->prepare("UPDATE users SET user_status = 0 WHERE username = ?");

            if($query->execute([$Username])){
                return true;
            }
        }

        return false;
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