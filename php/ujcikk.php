<?php

include "./databaseConnect.php";

$url = explode('/', $_SERVER['REQUEST_URI']);
$vegzodes = mb_strtolower(end($url));
$kerdojelesResz = explode('?', $vegzodes);


$bodyAdatok = json_decode(file_get_contents("php://input"), true);

switch ($kerdojelesResz[0]) {
    case "ujcikk":
        if ($_SERVER["REQUEST_METHOD" == "POST"]) {
            $lekeres = "INSERT INTO `posztok` (`postCim`, `postSzoveg`, `postVanKep`, `postKepElerhetoseg`, `postLetrehozasDatuma`, `postDiakID`) VALUES ('ASD', 'ASD', 0, 'ASD', current_timestamp(), 1)";
            $eredmeny = adatokManipulalasa($lekeres);

            if (is_array($eredmeny)) {
                header("CREATED", true, 201);
                echo json_encode($eredmeny, JSON_UNESCAPED_UNICODE);
            }
            
            else {
                header("NOT FOUND", true, 404);
                echo json_encode(["valasz" => "Nincs adat!"], JSON_UNESCAPED_UNICODE);
            }
        }

        else {
            header("BAD REQUEST", true, 405);
            echo json_encode(["valasz" => "Hibás metódus!"], JSON_UNESCAPED_UNICODE);
        }

        break;

    default:
        echo "Alapméretezett ág!";
        break;
}

?>