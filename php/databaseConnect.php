<?php
    function adatLekeres($muvelet) {
        $db = new mysqli("localhost", "root", "", "vizsga");

        if($db->connect_errno == 0) {
            $eredmeny = $db->query($muvelet);

            if($db->errno == 0) {
                if($eredmeny->num_rows > 0) {
                    $adatok = $eredmeny->fetch_all(MYSQLI_ASSOC);
                }

                else {
                    $adatok = array("valasz" => "Nincsenek találatok.");
                }
            }

            else {
                $adatok = $db->error;
            }
        }

        else {
            $adatok = $db->connect_error;
        }

        return json_encode($adatok, JSON_UNESCAPED_UNICODE);

        $db->close();
    }
?>