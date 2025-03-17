<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Cikkek extends Model
{
    // ./api/posztok
    public static function Cikkek($limit, $offset)
    {
        return DB::select("SELECT *, diakok.felhasznalonev FROM cikkek INNER JOIN diakok ON cikkek.diak_id = diakok.id WHERE cikkek.elfogadva = 1 ORDER BY cikkek.datum DESC LIMIT " . $limit . " OFFSET " . $offset);
    }

    // ./api/adminposztok
    public static function AdminCikkek($limit, $offset)
    {
        return DB::select("SELECT *, diakok.felhasznalonev FROM cikkek INNER JOIN diakok ON cikkek.diak_id = diakok.id WHERE cikkek.elfogadva = 0 ORDER BY cikkek.datum DESC LIMIT " . $limit . " OFFSET " . $offset);
    }


    protected $table = 'cikkek';
    public static function OsszesCikk()
    {
        return self::count();
    }


    // ./api/ujcikk
    public static function ujCikk($postCim, $postSzoveg, $diakId)
    {
        return DB::insert("INSERT INTO `cikkek` (`id`, `cim`, `szoveg`, `diak_id`, `datum`, `elfogadva`, `elfogadta_id`) VALUES (NULL,'" . $postCim . "','" . $postSzoveg . "', " . $diakId . ", current_timestamp(), '0', NULL)");
    }

    // ./api/cikkelfogadas
    public static function cikkElfogadas($adminId, $cikkSzoveg)
    {
        return DB::update("UPDATE `cikkek` SET `elfogadva`='1',`elfogadta_id`='" . $adminId . "' WHERE cikkek.szoveg = '" . $cikkSzoveg . "'");
    }

    // ./api/cikktorles
    public static function cikkTorles($cikkSzoveg)
    {
        return DB::delete("DELETE FROM `cikkek` WHERE cikkek.szoveg = '" . $cikkSzoveg . "'");
    }
}
