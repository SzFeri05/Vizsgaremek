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
        $iskola = $request->input("iskola");     
        $offset = ($oldal - 1) * $limit;            

        $cikkek = Cikkek::Cikkek($limit, $offset, $iskola);
        $osszesCikkSzama = Cikkek::OsszesCikk();
        $oldalakSzama = ceil($osszesCikkSzama / $limit);

        foreach($cikkek as $cikk)
        {
            $kepBin = $cikk->kep;

            $png_header = hex2bin('89504e470d0a1a0a');
            $jpeg_header1 = hex2bin('ffd8ffe0');
            $jpeg_header2 = hex2bin('ffd8ffe1');
        
            $header = substr($kepBin, 0, 8);
        
            if (substr($header, 0, strlen($png_header)) === $png_header) {
                $imageType = 'png';
            } elseif (substr($header, 0, strlen($jpeg_header1)) === $jpeg_header1 || substr($header, 0, strlen($jpeg_header2)) === $jpeg_header2) {
                $imageType = 'jpeg';
            } else {
                $imageType = 'ismeretlen'; 
            } 

            $mimeType = 'image/' . $imageType;

            $kepDataUri = 'data:' . $mimeType . ';base64,' . base64_encode($kepBin);

            $cikk->kep = $kepDataUri;
        }

        foreach($cikkek as $cikk)
        {
            $kepBin = $cikk->profilKep;

            $png_header = hex2bin('89504e470d0a1a0a');
            $jpeg_header1 = hex2bin('ffd8ffe0');
            $jpeg_header2 = hex2bin('ffd8ffe1');
        
            $header = substr($kepBin, 0, 8); 
        
            if (substr($header, 0, strlen($png_header)) === $png_header) {
                $imageType = 'png';
            } elseif (substr($header, 0, strlen($jpeg_header1)) === $jpeg_header1 || substr($header, 0, strlen($jpeg_header2)) === $jpeg_header2) {
                $imageType = 'jpeg';
            } else {
                $imageType = 'ismeretlen'; 
            } 

            $mimeType = 'image/' . $imageType;

            $kepDataUri = 'data:' . $mimeType . ';base64,' . base64_encode($kepBin);

            $cikk->profilKep = $kepDataUri;
        }


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

    // ./api/adminposztok
    public function AdminCikkekLekerdezesse(Request $request)
    {
        $oldal = $request->input('oldal', 1);      
        $limit = $request->input('limit', 4);   
        $iskola = $request->input("iskola");  
        $offset = ($oldal - 1) * $limit; 

        $cikkek = Cikkek::AdminCikkek($limit, $offset, $iskola);
        $osszesCikkSzama = Cikkek::OsszesCikk();
        $oldalakSzama = ceil($osszesCikkSzama / $limit);
        
        foreach($cikkek as $cikk)
        {
            $kepBin = $cikk->kep;

            $png_header = hex2bin('89504e470d0a1a0a');
            $jpeg_header1 = hex2bin('ffd8ffe0');
            $jpeg_header2 = hex2bin('ffd8ffe1');
        
            $header = substr($kepBin, 0, 8); 
        
            if (substr($header, 0, strlen($png_header)) === $png_header) {
                $imageType = 'png';
            } elseif (substr($header, 0, strlen($jpeg_header1)) === $jpeg_header1 || substr($header, 0, strlen($jpeg_header2)) === $jpeg_header2) {
                $imageType = 'jpeg';
            } else {
                $imageType = 'ismeretlen'; 
            } 

            $mimeType = 'image/' . $imageType;

            $kepDataUri = 'data:' . $mimeType . ';base64,' . base64_encode($kepBin);

            $cikk->kep = $kepDataUri;
        }

        foreach($cikkek as $cikk)
        {
            $kepBin = $cikk->profilKep;

            $png_header = hex2bin('89504e470d0a1a0a');
            $jpeg_header1 = hex2bin('ffd8ffe0');
            $jpeg_header2 = hex2bin('ffd8ffe1');
        
            $header = substr($kepBin, 0, 8); 
        
            if (substr($header, 0, strlen($png_header)) === $png_header) {
                $imageType = 'png';
            } elseif (substr($header, 0, strlen($jpeg_header1)) === $jpeg_header1 || substr($header, 0, strlen($jpeg_header2)) === $jpeg_header2) {
                $imageType = 'jpeg';
            } else {
                $imageType = 'ismeretlen';
            } 

            $mimeType = 'image/' . $imageType;

            $kepDataUri = 'data:' . $mimeType . ';base64,' . base64_encode($kepBin);

            $cikk->profilKep = $kepDataUri;
        }


        if (empty($cikkek)) {
            return response()->json(["valasz" => "Nincsenek találatok!"], 400);
        } else {
            return response()->json([
                'posztok' => $cikkek,
                'oldal' => $oldal,
                'limit' => $limit,
                'osszes' => $osszesCikkSzama,
                'oldalakSzama' => $oldalakSzama,
            ], 200);
        }
    }

    // ./api/cikkelfogadas
    public function cikkElfogadasController(Request $request)
    {
        $adminId = $request->input("adminId");
        $cikkSzoveg = $request->input("cikkSzoveg");

        if(empty($cikkSzoveg) || empty($adminId))
        {
            return response()->json(["valasz" => "Hiányos adatok!"], 400);
        }
        else
        {
            $eredmeny = Cikkek::cikkElfogadas($adminId, $cikkSzoveg);

            if(empty($eredmeny))
            {
                return response()->json(["valasz" => "Sikertelen művelet!"], 400);
            }
            else
            {
                return response()->json(["valasz" => "Sikeres művelet!"], 200);
            }
        }
    }

    // ./api/cikktorles
    public function cikkTorlesController(Request $request)
    {
        $cikkSzoveg = $request->input("cikkSzoveg");

        if(empty($cikkSzoveg))
        {
            return response()->json(["valasz" => "Hiányos adat!"], 400);
        }
        else
        {
            $eredmeny = Cikkek::cikkTorles($cikkSzoveg);

            if(empty($eredmeny))
            {
                return response()->json(["valasz" => "Sikertelen művelet!"], 400);
            }
            else
            {
                return response()->json(["valasz" => "Sikeres művelet!"], 200);
            }
        }
    }

    // ./api/ujcikk
    public function ujCikkController(Request $request)
    {
        $postCim = $request->input("postCim");
        $postSzoveg = $request->input("postSzoveg");
        $diakId = $request->input("diakId");
        $kep = $request->file("kep");

        if($kep)
        {
            $request->validate([
                'kep' => 'required|image|mimes:jpeg,png,jpg,gif,jfif|max:2048',
            ]);
    
            $kepadat = file_get_contents($kep);
        }
        else
        {
            $kepadat = NULL;
        }

        
        if(empty($postCim) || empty($postSzoveg) || empty($diakId))
        {
            return response()->json(["valasz" => "Hiányos adatok!"]);
        }
        else
        {
            $eredmeny = Cikkek::ujCikk($postCim, $postSzoveg, $diakId, $kepadat);

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
