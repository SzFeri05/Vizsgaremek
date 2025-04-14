<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CikkekTest extends TestCase
{
    public function test_api_posztok(): void
    {
        //Összes elfogadott cikk lekérdezése
        $adatok = [
            "oldal" => 1,
            "limit" => 4,
            "iskola" => 1
        ];

        $response = $this
            ->get("/api/posztok", $adatok);

        $this->assertNotEmpty($response->getContent());
    }

    public function test_api_adminPosztok(): void
    {
        //Összes nem elfogadott cikk lekérdezése
        $adatok = [
            "oldal" => 1,
            "limit" => 4,
            "iskola" => 1
        ];

        $response = $this
            ->get("/api/adminposztok", $adatok);

        $this->assertNotEmpty($response->getContent());
    }

    public function test_api_cikkElfogadas(): void
    {
        //Nem elfogadott cikk elfogadása
        $adatok = [
            "adminId" => 17,
            "cikkSzoveg" => "asd"
        ];

        $response = $this
            ->post("/api/cikkelfogadas", $adatok);

        $response->assertStatus(200);
    }

    public function test_api_ujCikk(): void
    {
        //Új cikk felvitele az adatbázisba
        $adatok = [
            "postCim" => "Új cikk",
            "postSzoveg" => "asd",
            "diakId" => "19"
        ];

        $response = $this
            ->post("/api/ujcikk", $adatok);

        $response->assertStatus(200);
    }

    public function test_api_cikkTorles(): void
    {
        //Nem elfogadott cikk törlése
        $adatok = [
            "cikkSzoveg" => "asd"
        ];

        $response = $this
            ->post("/api/cikktorles", $adatok);

        $response->assertStatus(200);
    }
}
