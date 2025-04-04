<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SzakokTest extends TestCase
{
    public function test_api_szakok(): void
    {
        //Összes szak lekérése ami az Iparihoz tartozik (id: 1)
        $iskolaAdat = [
            "id" => 1
        ];

        $response = $this->post('/api/szakok', $iskolaAdat);

        $response->assertStatus(200);
    }
}
