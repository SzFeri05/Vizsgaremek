<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Cikkek extends Model
{
    // ./api/posztok
    public static function Cikkek($limit, $offset)
    {
        return DB::select("SELECT *, diakok.felhasznalonev FROM cikkek INNER JOIN diakok ON cikkek.diak_id = diakok.id LIMIT " . $limit . " OFFSET " . $offset);
    }


    protected $table = 'cikkek';
    public static function OsszeCikk()
    {
        return self::count();
    }


    // ./api/ujcikk
    public static function ujCikk($postCim, $postSzoveg, $diakId)
    {
        return DB::insert("INSERT INTO `cikkek` (`id`, `cim`, `szoveg`, `diak_id`, `datum`, `elfogadva`, `elfogadta_id`) VALUES (NULL,'" . $postCim . "','" . $postSzoveg . "', ". /* . $diakId . */" 1, current_timestamp(), '0', NULL)");
    }
}
