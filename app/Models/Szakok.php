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
}
