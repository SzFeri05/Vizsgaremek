<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Szakok extends Model
{
    //Összes szak lekérdezése iskola id alapján
    // ./api/szakok
    public static function Szakok($id) {
        return DB::table("szakok")
            ->selectRaw("szakok.id, szakok.szakJeloles, szakok.nev")
            ->join("iskola_szak", "szakok.id", "=", "iskola_szak.szak_id")
            ->join("iskolak", "iskola_szak.iskola_id", "=", "iskolak.id")
            ->where("iskolak.id", "=", $id)
            ->orderBy("szakok.szakJeloles")
            ->get();
    }

    public static function SzakokWhereDiakId($id, $iskolaId)
    {
        return DB::select("SELECT szakok.szakJeloles, szakok.nev FROM szakok INNER JOIN iskola_szak ON szakok.id = iskola_szak.szak_id INNER JOIN iskolak ON iskola_szak.iskola_id = iskolak.id INNER JOIN diakok ON iskolak.id = diakok.iskola_id WHERE iskolak.id = " . $iskolaId . " AND szakok.id = " . $id . "");
    }
}
