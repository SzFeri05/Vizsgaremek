<?php
    include "./databaseConnect.php";

    $teljesURL = explode('/', $_SERVER["REQUEST_URI"]);

    switch(end($teljesURL)) {
        case 'cikkek':
            $erkezettAdatok = file_get_contents("php://input");
            $erkezettAdatok = json_decode($erkezettAdatok, true);

            $lekeres = "SELECT * FROM posztok";
            echo adatLekeres($lekeres);

            break;

        case 'diakok':
            $erkezettAdatok = file_get_contents("php://input");
            $erkezettAdatok = json_decode($erkezettAdatok, true);

            $lekeres = "SELECT * FROM diakok";
            echo adatLekeres($lekeres);

            break;

        case 'iskolak':
            $erkezettAdatok = file_get_contents("php://input");
            $erkezettAdatok = json_decode($erkezettAdatok, true);

            $lekeres = "SELECT * FROM iskolak";
            echo adatLekeres($lekeres);

            break;

        default:        
            break;
    }
?>