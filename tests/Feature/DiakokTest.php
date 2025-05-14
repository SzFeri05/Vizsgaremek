<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DiakokTest extends TestCase
{
    public function test_api_diakok(): void
    {
        //Összes diák lekérése
        $response = $this
            ->get('/api/diakok');

        $this->assertNotEmpty($response->getContent());
    }


    public function test_api_diakIdAlapjan(): void
    {
        //Egy diák lekérése id alapján (id: 18 --> nev: Gipsz Jakab)
        $diakAdat = [
            "id" => 18
        ];

        $response = $this
            ->post("/api/diakIdAlapjan", $diakAdat);

        $response->assertJson([["nev" => "Gipsz Jakab"]]);
    }

    public function test_api_diakNevAlapjan(): void
    {
        //Egy diák lekérése id alapján (felhasznalonev: GG_Jakk09 --> nev: Gipsz Jakab)
        $diakAdat = [
            "nev" => "GG_Jakk09"
        ];

        $response = $this
            ->post("/api/diakNevAlapjan", $diakAdat);

        $response->assertJson([["dNev" => "Gipsz Jakab"]]);
    }


    public function test_api_register_diak(): void 
    {
        //Új diák regisztrálása
        $ujDiakAdatai = [
            "email" => "teszt@gmail.com",
            "teljesNev" => "Teszt Sándor",
            "felhasznalonev" => "Teszter",
            "iskola" => 1,
            "osztaly" => 1,
            "evfolyam" => 9,
            "jelszo" => "1"
        ];

        $response = $this
            ->post("/api/registerdiak", $ujDiakAdatai);

        $response->assertStatus(201);
    }

    public function test_api_loginDiak(): void
    {
        //Bejelentkezés az újjonan létrehozott felhasználó fiókjába
        $diakAdat = [
            "felhasznalonev" => "Teszter",
            "jelszo" => "1"
        ];

        $response = $this
            ->post("/api/loginDiak", $diakAdat);

        $response->assertStatus(200);
    }

    public function test_api_diakModositas(): void
    {
        //Teszt Sándor diák adatainak módosítása (itt csak a jelszót módosítjuk)
        $ujAdatok = [
            "nev" => "Teszt Sándor",
            "felhasznalonev" => "Teszter",
            "jelszo" => "1",
            "id" => 40,
            "ujjelszo" => "2"
        ];

        $response = $this
            ->post("/api/diakmodositas", $ujAdatok);

        $response->assertStatus(200);
    }

    public function test_api_diakTorles():void 
    {
        //A teszt eredményeképp létrejött felhasználó (és általa [nem] feltöltött cikke) törlése
        $diakAdatai = [
            "id" => 40
        ];

        $response = $this
            ->post("/api/diaktorles", $diakAdatai);

        $response->assertStatus(204);
    }
}
