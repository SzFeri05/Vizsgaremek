<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Cikkek extends Model
{
    //Adott iskolához tartozó elfogadott cikkek lekérése limit és offset segítségével
    // ./api/posztok
    public static function Cikkek($limit, $offset, $iskola)
    {
        return DB::select("SELECT *, cikkek.kep, diakok.felhasznalonev, diakok.evfolyam, diakok.profilKep, szakok.szakJeloles FROM cikkek INNER JOIN diakok ON cikkek.diak_id = diakok.id INNER JOIN szakok ON diakok.szak_id = szakok.id WHERE cikkek.elfogadva = 1 AND diakok.iskola_id = ". $iskola ." ORDER BY cikkek.datum DESC LIMIT " . $limit . " OFFSET " . $offset);
    }

    //Adott iskolához tartozó NEM elfogadott cikkek lekérése limit és offset segítségével
    // ./api/adminposztok
    public static function AdminCikkek($limit, $offset, $iskola)
    {
        return DB::select("SELECT *, cikkek.kep, diakok.felhasznalonev, diakok.evfolyam, diakok.profilKep, szakok.szakJeloles FROM cikkek INNER JOIN diakok ON cikkek.diak_id = diakok.id INNER JOIN szakok ON diakok.szak_id = szakok.id WHERE cikkek.elfogadva = 0 AND diakok.iskola_id = ". $iskola ." ORDER BY cikkek.datum DESC LIMIT " . $limit . " OFFSET " . $offset);
    }


    //Cikkek darabszáma
    protected $table = 'cikkek';
    public static function OsszesCikk()
    {
        return self::count();
    }


    //Új cikk felvitele az adatbázisba
    // ./api/ujcikk
    public static function ujCikk($postCim, $postSzoveg, $diakId, $kep)
    {
        return DB::insert("
            INSERT INTO `cikkek` (`cim`, `szoveg`, `diak_id`, `datum`, `elfogadva`, `elfogadta_id`, `kep`)
            VALUES (?, ?, ?, NOW(), '0', NULL, ?)
        ", [$postCim, $postSzoveg, $diakId, $kep]);
    }

    //Cikk elfogadása az admin felületről
    // ./api/cikkelfogadas
    public static function cikkElfogadas($adminId, $cikkSzoveg)
    {
        return DB::update("UPDATE `cikkek` SET `elfogadva`='1',`elfogadta_id`='" . $adminId . "' WHERE cikkek.szoveg = '" . $cikkSzoveg . "'");
    }

    //Cikk törlése az admin felületről
    // ./api/cikktorles
    public static function cikkTorles($cikkSzoveg)
    {
        return DB::delete("DELETE FROM `cikkek` WHERE cikkek.szoveg = '" . $cikkSzoveg . "'");
    }
}
