<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Diakok extends Model
{
    //Összes diák lekérése
    // ./api/diakok
    public static function DiakLekeres()
    {
        return DB::select("SELECT * FROM diakok");
    }

    //Diák adatainak lekérése id alapján
    // ./api/diakIdAlapjan
    public static function DiakLekeresId($id)
    {
        return DB::select("SELECT * FROM diakok WHERE diakok.id = " . $id);
    }
    
    //Diák adatainak lekérése név alapján
    // ./api/diakNevAlapjan
    public static function DiakLekerdezesNev($nev)
    {
        return DB::table("diakok")
            ->selectRaw("diakok.id, diakok.nev as dNev, iskolak.nev as iNev, iskolak.id as iId, diakok.felhasznalonev, diakok.adminE, diakok.profilKep")
            ->join("iskolak", "diakok.iskola_id", "=", "iskolak.id")
            ->whereLike("diakok.felhasznalonev", $nev)
            ->get();
    }

    //Diák adatainak lekérdezése név egyezése és id nem egyezése alapján
    public static function DiakLekerdezesNevWhereNotId($nev, $id)
    {
        return DB::select("SELECT diakok.id, diakok.nev as dNev, iskolak.nev as iNev, diakok.felhasznalonev, diakok.adminE, diakok.profilKep FROM `diakok` INNER JOIN iskolak ON diakok.iskola_id = iskolak.id WHERE diakok.felhasznalonev = '" . $nev . "' AND diakok.id != " . $id);
    }

    //Új diák regisztrálása az adatbázisba
    // ./api/registerDiak
    public static function RegisterDiak($email, $teljesNev, $felhasznalonev, $iskola, $osztaly, $evfolyam, $jelszo) {
        return DB::table("diakok")
            ->insertGetId([
                "nev" => $teljesNev,
                "email" => $email,
                "evfolyam" => $evfolyam,
                "iskola_id" => $iskola,
                "szak_id" => $osztaly,
                "felhasznalonev" => $felhasznalonev,
                "jelszo" => $jelszo,
                "profilKep" => NULL
            ]);
    }

    //Diák bejelentkeztetése
    // ./api/loginDiak
    public static function LoginDiak($felhasznaloNev) {
        return DB::table("diakok")
            ->selectRaw("diakok.jelszo")
            ->whereLike("diakok.felhasznalonev", $felhasznaloNev, true)
            ->get();
    }

    //Diák jelszavának lekérése diák id alapján
    public static function DiakJelszoId($id) {
        return DB::table("diakok")
            ->selectRaw("diakok.jelszo")
            ->whereLike("diakok.id", $id)
            ->get();
    }


    //Diák adatainak módosítása
    // ./api/diakmodositas
    public static function DiakModositas($nev, $email, $felhasznalonev, $id, $kep = NULL)
    {
        if($kep == NULL) 
        {
            return DB::update("UPDATE `diakok` SET `nev`= ?,`email`= ?,`felhasznalonev`= ? WHERE diakok.id = ?", [$nev, $email, $felhasznalonev, $id]);
        }

        else
        {
            return DB::update("UPDATE `diakok` SET `nev`= ?,`email`= ?,`felhasznalonev`= ?, profilKep = ? WHERE diakok.id = ?", [$nev, $email, $felhasznalonev, $kep, $id]);
        }
    }

    //Diák törlése az adatbázisból
    // ./api/diaktorles
    public static function DiakTorles($id)
    {
        return DB::delete("DELETE FROM `diakok` WHERE diakok.id = " . $id);
    }

    //Diákhoz tartozó cikkek törlése az adatbázisból
    public static function DiakCikkTorles($id)
    {
        return DB::delete("DELETE FROM `cikkek` WHERE diak_id = " . $id);
    }
}
