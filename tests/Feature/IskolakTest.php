<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class IskolakTest extends TestCase
{
    public function test_api_iskolak(): void
    {
        //Összes iskola lekérése
        $response = $this
            ->get('/api/iskolak');

        $response->assertStatus(200);
    }

    public function test_api_evfolamyok(): void
    {
        //Évfolyamok lekérése az Iparihoz (id: 1)
        $iskolaAdat = [
            "id" => 1
        ];

        $response = $this
            ->post("/api/evfolyamok", $iskolaAdat);

        $response->assertStatus(200);
    }
}
