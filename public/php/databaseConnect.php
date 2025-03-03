<?php
function adatokLekerdezese($muvelet)
{
    $db = new mysqli("localhost", "root", "", "13c_suliujsag");

    if ($db->connect_errno == 0) {
        $eredmeny = $db->query($muvelet);

        if ($db->errno == 0) {
            if ($eredmeny->num_rows != 0) {
                return $adatok = $eredmeny->fetch_all(MYSQLI_ASSOC);
            } else {
                return "Nincs találat!";
            }
        } else {
            return $db->error;
        }
    } else {
        echo $db->connect_error;
    }
}

function adatokManipulalasa($muvelet)
{
    $db = new mysqli("localhost", "root", "", "13c_suliujsag");

    if ($db->connect_errno == 0) {
        $db->query($muvelet);

        if ($db->errno == 0) {
            if ($db->affected_rows > 0) {
                return "Sikeres művelet!";
            } else if ($db->affected_rows == 0) {
                return "Sikertelen művelet!";
            } else {
                return $db->error;
            }
        } else {
            return $db->error;
        }
    } else {
        echo $db->connect_error;
    }
}
?>