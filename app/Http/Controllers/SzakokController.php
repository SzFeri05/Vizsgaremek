<?php

namespace App\Http\Controllers;

use App\Models\Szakok;
use Illuminate\Http\Request;

class SzakokController extends Controller
{
    // ./api/szakok
    public function Szakok(Request $req) {
        $id = $req->input("id");

        if(empty($id)) {
            return response()->json(["valasz" => "Nincsenek megadott adatok!"], 400);
        }

        $eredmeny = Szakok::Szakok($id);

        if(empty($eredmeny)) {
            return response()->json(["valasz" => "Nincenek találatok!"], 400);
        }

        return response()->json($eredmeny, 200);
    }

    // ./api/szakokId
    public function SzakokId(Request $req) {
        $id = $req->input("id");
        $iskolaId = $req->input("iskolaId");

        if(empty($id) || empty($iskolaId)) {
            return response()->json(["valasz" => "Nincsenek megadott adatok!"], 400);
        }

        $eredmeny = Szakok::SzakokWhereDiakId($id, $iskolaId);

        if(empty($eredmeny)) {
            return response()->json(["valasz" => "Nincenek találatok!"], 400);
        }

        return response()->json($eredmeny, 200);
    }
}
