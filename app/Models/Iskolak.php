<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Iskolak extends Model
{
    // ./api/iskolak
    public static function Iskolak() {
        return DB::table("iskolak")
            ->selectRaw("*")
            ->get();
    }


    // ./api/evfolyamok
    public static function Evfolyamok($id) {
        return DB::table("iskolak")
            ->selectRaw("iskolak.evfolyamDarab")
            ->where("iskolak.id", "=", $id)
            ->get();
    }
}
