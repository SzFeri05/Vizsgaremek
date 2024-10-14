<?php
    include "./databaseConnect.php";

    $teljesURL = explode('/', $_SERVER["REQUEST_URI"]);

    switch(end($teljesURL)) {
        case 'cikkek':
            $erkezettAdatok = file_get_contents("php://input");
            $erkezettAdatok = json_decode($erkezettAdatok, true);

            $lekeres = "SELECT * FROM posztok";
            echo adatLekeres($lekeres);

            //return $eredmeny;
            break;
        
        default:
            break;
    }
?>