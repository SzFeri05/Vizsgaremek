<?php
include "./databaseConnect.php";

$url = explode('/', $_SERVER['REQUEST_URI']);
$vegzodes = mb_strtolower(end($url));
$kerdojelesResz = explode('?', $vegzodes);


$bodyAdatok = json_decode(file_get_contents("php://input"), true);

switch ($kerdojelesResz[0]) {
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
            $lekeres = "SELECT iskolak.evfolyamDarab FROM iskolak WHERE iskolak.id = " . $bodyAdatok['id'] . ";";
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
            $lekeres = "SELECT szakok.id, szakok.szakJeloles, szakok.nev FROM szakok INNER JOIN iskola_szak ON szakok.id = iskola_szak.szak_id INNER JOIN iskolak ON iskola_szak.iskola_id = iskolak.id WHERE iskolak.id = " . $bodyAdatok["id"] . " ORDER BY szakok.szakJeloles ;";
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
            $lekeres = "INSERT INTO `cikkek` (`id`, `cim`, `szoveg`, `diak_id`, `datum`, `elfogadva`, `elfogadta_id`) VALUES (NULL,'" . $bodyAdatok["postCim"] . "','" . $bodyAdatok["postSzoveg"] . "', 1, current_timestamp(), 0, NULL)";
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

    case "diakNevAlapjan":
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            $nev = $bodyAdatok["nev"];

            $lekeres = "SELECT * FROM diakok WHERE diakok.nev LIKE '". $nev ."';";
            $eredmeny = adatokLekerdezese($lekeres);

            if(!empty($eredmeny)) {
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

    case "registerdiak":
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            $email = $bodyAdatok["email"];
            $teljesNev = $bodyAdatok["teljesNev"];
            $felhasznaloNev = $bodyAdatok["felhasznaloNev"];
            $iskola = $bodyAdatok["iskola"];
            $osztaly = $bodyAdatok["osztaly"];
            $evfolyam = $bodyAdatok["evfolyam"];
            $jelszo = password_hash($bodyAdatok["jelszo"], PASSWORD_DEFAULT);

            $felkeres = "INSERT INTO `diakok` (`id`, `nev`, `email`, `evfolyam`, `iskola_id`, `szak_id`, `felhasznalonev`, `jelszo`) VALUES (NULL, '". $teljesNev ."', '". $email ."', '". $evfolyam ."', '". $iskola ."', '". $osztaly ."', '". $felhasznaloNev ."', '". $jelszo ."');";
            $eredmeny = adatokManipulalasa($felkeres);

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
