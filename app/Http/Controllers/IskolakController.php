<?php

namespace App\Http\Controllers;

use App\Models\Iskolak;
use Illuminate\Http\Request;

class IskolakController extends Controller
{
    // ./aip/iskolak
    public function Iskolak() {
        $eredmeny = Iskolak::Iskolak();

        if(empty($eredmeny)) {
            return response()->json(["valasz" => "Nincsenek találatok!"], 400);
        }

        return response()->json($eredmeny, 200);
    }


    // ./api/evfolyamok
    public function Evfolyamok(Request $req) {
        $id = $req->input("id");

        if(empty($id)) {
            return response()->json(["valasz" => "Nincs megadott adat!"], 400);
        }

        $eredmeny = Iskolak::Evfolyamok($id);

        if(empty($eredmeny)) {
            return response()->json(["valasz" => "Nincsenek találatok!"], 400);
        }

        return response()->json($eredmeny, 200);
    }
}
