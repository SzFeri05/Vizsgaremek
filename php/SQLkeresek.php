<?php
include "./databaseConnect.php";

$url = explode('/', $_SERVER['REQUEST_URI']);
$vegzodes = mb_strtolower(end($url));
$kerdojelesResz = explode('?', $vegzodes);


$bodyAdatok = json_decode(file_get_contents("php://input"), true);

switch ($kerdojelesResz[0]) {
    case "evfolyamok":

        break;

    case "posztok":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $lekeres = "SELECT * FROM posztok";
            $eredmeny = adatokLekerdezese($lekeres);

            if (is_array($eredmeny)) {
                header("OK", true, 200);
                echo json_encode($eredmeny, JSON_UNESCAPED_UNICODE);
            } else {
                header("NOT FOUND", true, 404);
                echo json_encode(["valasz" => "Nincs adat!"], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header("BAD REQUEST", true, 405);
            echo json_encode(["valasz" => "Hibás metódus!"], JSON_UNESCAPED_UNICODE);
        }

        break;

    case "iskolak":
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            $lekeres = "SELECT * FROM iskolak";
            $eredmeny = adatokLekerdezese($lekeres);

            if (is_array($eredmeny)) {
                header("OK", true, 200);
                echo json_encode($eredmeny, JSON_UNESCAPED_UNICODE);
            } else {
                header("NOT FOUND", true, 404);
                echo json_encode(["valasz" => "Nincs adat!"], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header("BAD REQUEST", true, 405);
            echo json_encode(["valasz" => "Hibás metódus!"], JSON_UNESCAPED_UNICODE);
        }

        break;


    case "evfolyamok":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $lekeres = "SELECT iskolak.evfolyamDarab FROM iskolak WHERE iskolak.iskID = " . $bodyAdatok["id"] . ";";
            $eredmeny = adatokLekerdezese($lekeres);

            if (is_array($eredmeny)) {
                header("OK", true, 200);
                echo json_encode($eredmeny, JSON_UNESCAPED_UNICODE);
            } else {
                header("NOT FOUND", true, 404);
                echo json_encode(["valasz" => "Nincs adat!"], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header("BAD REQUEST", true, 405);
            echo json_encode(["valasz" => "Hibás metódus!"], JSON_UNESCAPED_UNICODE);
        }

        break;

    case "szakok":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            var_dump($bodyAdatok["id"]);
            $lekeres = "SELECT iskolak.szakDarab FROM iskolak WHERE iskolak.iskID = " . $bodyAdatok["id"] . ";";
            $eredmeny = adatokLekerdezese($lekeres);

            if (is_array($eredmeny)) {
                header("OK", true, 200);
                echo json_encode($eredmeny, JSON_UNESCAPED_UNICODE);
            } else {
                header("NOT FOUND", true, 404);
                echo json_encode(["valasz" => "Nincs adat!"], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header("BAD REQUEST", true, 405);
            echo json_encode(["valasz" => "Hibás metódus!"], JSON_UNESCAPED_UNICODE);
        }

        break;

    case "diakok":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $lekeres = "SELECT * FROM diakok";
            $eredmeny = adatokLekerdezese($lekeres);

            if (is_array($eredmeny)) {
                header("OK", true, 200);
                echo json_encode($eredmeny, JSON_UNESCAPED_UNICODE);
            } else {
                header("NOT FOUND", true, 404);
                echo json_encode(["valasz" => "Nincs adat!"], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header("BAD REQUEST", true, 405);
            echo json_encode(["valasz" => "Hibás metódus!"], JSON_UNESCAPED_UNICODE);
        }

        break;

    case "ujcikk":
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $lekeres = "INSERT INTO `posztok` (`postID`, `postCim`, `postSzoveg`, `postVanKep`, `postKepElerhetoseg`, `postLetrehozasDatuma`, `postElfogadva`, `postDiakID`) VALUES (NULL, '" . $bodyAdatok["postCim"] . "', '" . $bodyAdatok["postSzoveg"] . "', '" . $bodyAdatok["postVanKep"] . "', '" . $bodyAdatok["postKepElerhetoseg"] . "', current_timestamp(), '0', '1');";
            $eredmeny = adatokManipulalasa($lekeres);

            if ($eredmeny == "Sikeres művelet!") {
                header("CREATED", true, 201);
                echo json_encode($eredmeny, JSON_UNESCAPED_UNICODE);
            } else {
                header("NOT FOUND", true, 404);
                echo json_encode(["valasz" => "Sikertelen művelet!"], JSON_UNESCAPED_UNICODE);
            }
        } else {
            header("BAD REQUEST", true, 405);
            echo json_encode(["valasz" => "Hibás metódus!"], JSON_UNESCAPED_UNICODE);
        }

        break;

    default:
        echo json_encode(["valasz" => "Hibás kérés!"]);
        break;
}
