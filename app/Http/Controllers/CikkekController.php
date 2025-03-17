<?php

namespace App\Http\Controllers;

use App\Models\Cikkek;
use Illuminate\Http\Request;

class CikkekController extends Controller
{
    // ./api/posztok
    public function CikkekLekerdezesse(Request $request)
    {
        $oldal = $request->input('oldal', 1);      
        $limit = $request->input('limit', 4);     
        $offset = ($oldal - 1) * $limit;            

        $cikkek = Cikkek::Cikkek($limit, $offset);
        $osszesCikkSzama = Cikkek::OsszeCikk();
        $oldalakSzama = ceil($osszesCikkSzama / $limit);


        if (empty($cikkek)) {
            return response()->json(["valasz" => "Nincsenek találatok!"], 400);
        } else {
            return response()->json([
                'posztok' => $cikkek,
                'oldal' => $oldal,
                'limit' => $limit,
                'osszes' => $osszesCikkSzama,
                'oldalakSzama' => $oldalakSzama
            ], 200);
        }
    }

    // ./api/ujcikk
    public function ujCikkController(Request $request)
    {
        $postCim = $request->input("postCim");
        $postSzoveg = $request->input("postSzoveg");
        $diakId = $request->input("diakId");


        if(empty($postCim) || empty($postSzoveg) || empty($diakId))
        {
            return response()->json(["valasz" => "Hiányos adatok!"]);
        }
        else
        {
            $eredmeny = Cikkek::ujCikk($postCim, $postSzoveg, $diakId);

            if(empty($eredmeny))
            {
                return response()->json(["valasz" => "Sikertelen cikkfelvitel!"]);
            }
            else
            {
                return response()->json(["valasz" => "Sikeres feltöltés!"]);
            }   
        }     
    }
}
