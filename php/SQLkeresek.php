<?php
    include "./databaseConnect.php";

    $url = explode('/', $_SERVER['REQUEST_URI']);
    $vegzodes = mb_strtolower(end($url));
    $kerdojelesResz = explode('?', $vegzodes);


    $bodyAdatok = json_decode(file_get_contents("php://input"), true);

    switch($kerdojelesResz[0]) {
        case "teszt":
            $lekeres = "SELECT * FROM diakok";
            $eredmeny = adatokLekerdezese($lekeres);

            echo json_encode($eredmeny, JSON_UNESCAPED_UNICODE);
            break;
        
        default:
            echo "Alapméretezett ág!";
            break;
    }
?>