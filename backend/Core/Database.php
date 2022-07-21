<?php



function getDatabaseConn(){

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try
    {
        $pdo = new PDO(
            'mysql:host='. HOST .';dbname='. DB_NAME,
            DB_USERNAME,
            DB_PASSWORD,
            $options
        );

        $pdo->exec("SET time_zone = '-6:00'");


    }
    catch(PDOException $e)
    {
        throw new Exception("Couldn't connect to database", 0, $e);

    }

    return $pdo;
}


