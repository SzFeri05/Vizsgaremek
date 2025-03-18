<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Diakok extends Model
{
    // ./api/diakok
    public static function DiakLekeres()
    {
        return DB::select("SELECT * FROM diakok");
    }

    // ./api/diakIdAlapjan
    public static function DiakLekeresId($id)
    {
        return DB::select("SELECT * FROM diakok WHERE diakok.id = " . $id);
    }
    
    // ./api/diakNevAlapjan
    public static function DiakLekerdezesNev($nev)
    {
        return DB::table("diakok")
            ->selectRaw("diakok.id, diakok.nev as dNev, iskolak.nev as iNev, diakok.felhasznalonev, diakok.adminE")
            ->join("iskolak", "diakok.iskola_id", "=", "iskolak.id")
            ->whereLike("diakok.felhasznalonev", $nev)
            ->get();
    }

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
                "jelszo" => $jelszo
            ]);
    }

    // ./api/loginDiak
    public static function LoginDiak($felhasznaloNev) {
        return DB::table("diakok")
            ->selectRaw("diakok.jelszo")
            ->whereLike("diakok.felhasznalonev", $felhasznaloNev)
            ->get();
    }

    public static function DiakJelszoId($id) {
        return DB::table("diakok")
            ->selectRaw("diakok.jelszo")
            ->whereLike("diakok.id", $id)
            ->get();
    }


    // ./api/diakmodositas
    public static function DiakModositas($nev, $email, $felhasznalonev, $id)
    {
        return DB::update("UPDATE `diakok` SET `nev`='" . $nev . "',`email`='" . $email . "',`felhasznalonev`='" . $felhasznalonev . "' WHERE diakok.id = " . $id);
    }
}
