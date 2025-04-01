<?php

namespace App\Http\Controllers;

use App\Models\Diakok;
use Illuminate\Http\Request;

class DiakokController extends Controller
{
    // ./api/diakok
    public function DiakLekerdezes()
    {
        $eredmeny = Diakok::DiakLekeres();

        if(empty($eredmeny))
        {
            return response()->json(["valasz" => "Nincsenek találatok!"], 400);
        }
        else
        {
            return response()->json($eredmeny);
        }        
    }

    // ./api/diakIdAlapjan
    public function DiakIdController(Request $request)
    {
        $id = $request->input("id");

        if(empty($id))
        {
            return response()->json(["valasz" => "Hiányos adatok!"], 400);
        }
        else
        {
            $eredmeny = Diakok::DiakLekeresId($id);

            foreach($eredmeny as $e)
            {
                $kepBin = $e->profilKep;

                $png_header = hex2bin('89504e470d0a1a0a');
                $jpeg_header1 = hex2bin('ffd8ffe0');
                $jpeg_header2 = hex2bin('ffd8ffe1');
            
                $header = substr($kepBin, 0, 8); // Az első 8 byte beolvasása
            
                if (substr($header, 0, strlen($png_header)) === $png_header) {
                    $imageType = 'png';
                } elseif (substr($header, 0, strlen($jpeg_header1)) === $jpeg_header1 || substr($header, 0, strlen($jpeg_header2)) === $jpeg_header2) {
                    $imageType = 'jpeg';
                } else {
                    $imageType = 'ismeretlen'; // Ismeretlen formátum
                } // A fentebb definiált függvény

                $mimeType = 'image/' . $imageType;

                $kepDataUri = 'data:' . $mimeType . ';base64,' . base64_encode($kepBin);

                $e->profilKep = $kepDataUri;
            }

            if(empty($eredmeny))
            {
                return response()->json(["valasz" => "Nincsenek találatok!"], 400);
            }
            else
            {
                return response()->json($eredmeny, 200);
            }
        }
    }

    // ./api/diakNevAlapjan
    public function DiakNevController(Request $request)
    {
        $nev = $request->input("nev");

        if(empty($nev))
        {
            return response()->json(["valasz" => "Hiányos adatok!"]);
        }
        else
        {
            $eredmeny = Diakok::DiakLekerdezesNev($nev);

        foreach($eredmeny as $e)
        {
            $kepBin = $e->profilKep;

            $png_header = hex2bin('89504e470d0a1a0a');
            $jpeg_header1 = hex2bin('ffd8ffe0');
            $jpeg_header2 = hex2bin('ffd8ffe1');
        
            $header = substr($kepBin, 0, 8); // Az első 8 byte beolvasása
        
            if (substr($header, 0, strlen($png_header)) === $png_header) {
                $imageType = 'png';
            } elseif (substr($header, 0, strlen($jpeg_header1)) === $jpeg_header1 || substr($header, 0, strlen($jpeg_header2)) === $jpeg_header2) {
                $imageType = 'jpeg';
            } else {
                $imageType = 'ismeretlen'; // Ismeretlen formátum
            } // A fentebb definiált függvény

            $mimeType = 'image/' . $imageType;

            $kepDataUri = 'data:' . $mimeType . ';base64,' . base64_encode($kepBin);

            $e->profilKep = $kepDataUri;
        }

            if(empty($eredmeny))
            {
                return response()->json(["valasz" => "Nincsenek találatok!"]);
            }
            else
            {
                return response()->json($eredmeny);
            }
        }
    }

    // ./api/registerDiak
    public function RegisterDiak(Request $req) {
        $email = $req->input("email");
        $teljesNev = $req->input("teljesNev");
        $felhasznalonev = $req->input("felhasznalonev");
        $iskola = $req->input("iskola");
        $osztaly = $req->input("osztaly");
        $evfolyam = $req->input("evfolyam");
        $jelszo = password_hash($req->input("jelszo"), PASSWORD_DEFAULT);

        if(empty($email) || empty($teljesNev) || empty($felhasznalonev) || empty($iskola) || empty($osztaly) || empty($evfolyam) || empty($jelszo)) {
            return response()->json(["valasz" => "Hiányos adatok!"], 400);
        }

        $osszesDiak = Diakok::DiakLekeres();
        $felhasznalonevCheck = Diakok::DiakLekerdezesNev($felhasznalonev);

        foreach($osszesDiak as $diakok)
        {
            $kepBin = $diakok->profilKep;

            $png_header = hex2bin('89504e470d0a1a0a');
            $jpeg_header1 = hex2bin('ffd8ffe0');
            $jpeg_header2 = hex2bin('ffd8ffe1');
        
            $header = substr($kepBin, 0, 8); // Az első 8 byte beolvasása
        
            if (substr($header, 0, strlen($png_header)) === $png_header) {
                $imageType = 'png';
            } elseif (substr($header, 0, strlen($jpeg_header1)) === $jpeg_header1 || substr($header, 0, strlen($jpeg_header2)) === $jpeg_header2) {
                $imageType = 'jpeg';
            } else {
                $imageType = 'ismeretlen'; // Ismeretlen formátum
            } // A fentebb definiált függvény

            $mimeType = 'image/' . $imageType;

            $kepDataUri = 'data:' . $mimeType . ';base64,' . base64_encode($kepBin);

            $diakok->profilKep = $kepDataUri;
        }

        foreach($osszesDiak as $diak) {
            if(json_decode(json_encode($diak), true, JSON_UNESCAPED_UNICODE)["email"] == $email) {
                return response()->json(["valasz" => "Az email cím már foglalt!"], 400);
            }
        }

        if($felhasznalonevCheck->isEmpty())
        {
            $eredmeny = Diakok::RegisterDiak($email, $teljesNev, $felhasznalonev, $iskola, $osztaly, $evfolyam, $jelszo);

            if($eredmeny == false) {
                return response()->json(["valasz" => "Sikertelen regisztráció!"], 400);
            }
    
            return response()->json(["valasz" => "Sikeres regisztráció!"], 201);
        }
        else
        {
            return response()->json(["valasz" => "Ez a felhasználónév már foglalt!"]);
        }
    }

    // ./api/loginDiak
    public function LoginDiak(Request $req) {
        $felhasznalonev = $req->input("felhasznalonev");
        $jelszo = $req->input("jelszo");
        
        if(empty($jelszo)) {
            return response()->json(["valasz" => "Nincs megadva adat!"], 400);
        }

        $eredmeny = Diakok::LoginDiak($felhasznalonev);

        if($eredmeny->isEmpty()) {
            return response()->json(["valasz" => "A megadott felhasználónév nem található!"], 400);
        }

        $hasheltJelszo = json_decode($eredmeny, true)[0]["jelszo"];

        $egyezikE = password_verify($jelszo, $hasheltJelszo);

        if(!$egyezikE) {
            return response()->json(["valasz" => "Sikertelen bejelentkezés!"], 400);
        }

        return response()->json(["valasz" => $felhasznalonev], 200);
    }

    // ./api/diakmodositas
    public function DiakModositController(Request $request)
    {
        $nev = $request->input("nev");
        $email = $request->input("email");
        $felhasznalonev = $request->input("felhasznalonev");
        $jelszo = $request->input("jelszo");
        $id = $request->input("id");
        $kep = $request->file("kep");
        

        if($kep)
        {
            $request->validate([
                'kep' => 'required|image|mimes:jpeg,png,jpg,gif,jfif|max:2048',
            ]);
    
            $kepadat = file_get_contents($kep);
        }

        if(empty($nev) || empty($email) || empty($felhasznalonev) || empty($jelszo) || empty($id))
        {
            return response()->json(["valasz" => "Hiányos adatok!"], 400);
        }
        else
        {
            $felhasznalonevCheck = Diakok::DiakLekerdezesNevWhereNotId($felhasznalonev, $id);
            
            if(empty($felhasznalonevCheck))
            {
                $eredmeny = Diakok::DiakJelszoId($id);

                $hasheltJelszo = json_decode($eredmeny, true)[0]["jelszo"];

                $egyezikE = password_verify($jelszo, $hasheltJelszo);

                if($egyezikE)
                {
                    $modosit = Diakok::DiakModositas($nev, $email, $felhasznalonev, $id, $kepadat);

                    $modositott = Diakok::DiakLekeresId($id);

                    foreach($modositott as $profil)
                    {
                        $kepBin = $profil->profilKep;
            
                        $png_header = hex2bin('89504e470d0a1a0a');
                        $jpeg_header1 = hex2bin('ffd8ffe0');
                        $jpeg_header2 = hex2bin('ffd8ffe1');
                    
                        $header = substr($kepBin, 0, 8); // Az első 8 byte beolvasása
                    
                        if (substr($header, 0, strlen($png_header)) === $png_header) {
                            $imageType = 'png';
                        } elseif (substr($header, 0, strlen($jpeg_header1)) === $jpeg_header1 || substr($header, 0, strlen($jpeg_header2)) === $jpeg_header2) {
                            $imageType = 'jpeg';
                        } else {
                            $imageType = 'ismeretlen'; // Ismeretlen formátum
                        } // A fentebb definiált függvény
            
                        $mimeType = 'image/' . $imageType;
            
                        $kepDataUri = 'data:' . $mimeType . ';base64,' . base64_encode($kepBin);
            
                        $profil->profilKep = $kepDataUri;
                    }

                    return response()->json($modositott, 200);
                }
                else
                {
                    return response()->json(["valasz" => "Nem megfelelő jelszó!"], 400);
                }
        
                return response()->json(["valasz" => "Sikeres módosítás!"], 201);
            }
            else
            {
                return response()->json(["valasz" => "Ez a felhasználónév már foglalt!"]);
            }
        }
    }

    // ./api/diaktorles
    public function DiakTorlesController(Request $request)
    {
        $id = $request->input("id");

        $cikkeredmeny = Diakok::DiakCikkTorles($id);
        $eredmeny = Diakok::DiakTorles($id);

        if(empty($eredmeny))
        {
            return response()->json(["valasz" => "Sikertelen törlés!"], 400);
        }
        else
        {
            return response()->json(["valasz" => "Sikeres törlés!"], 204);
        }
    }
}
