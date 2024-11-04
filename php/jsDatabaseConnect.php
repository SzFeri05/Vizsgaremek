<?php
    include "./databaseConnect.php";

    $teljesURL = explode('/', $_SERVER["REQUEST_URI"]);

    switch(end($teljesURL)) {
        case 'cikkek':
            $erkezettAdatok = file_get_contents("php://input");
            $erkezettAdatok = json_decode($erkezettAdatok, true);

            $lekeres = "SELECT * FROM posztok";
            $eredmeny = adatLekeres($lekeres);

            return strval($eredmeny);

        case 'diakok':
            $erkezettAdatok = file_get_contents("php://input");
            $erkezettAdatok = json_decode($erkezettAdatok, true);

            $lekeres = "SELECT * FROM diakok";
            $eredmeny = adatLekeres($lekeres);

            return strval($eredmeny);

        case 'iskolak':
            $erkezettAdatok = file_get_contents("php://input");
            //$erkezettAdatok = json_decode($erkezettAdatok, true);

            $lekeres = "SELECT * FROM iskolak";
            $eredmeny = adatLekeres($lekeres);

            return strval($eredmeny);

        default:
            break;
    }
?>