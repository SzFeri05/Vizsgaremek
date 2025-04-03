<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ElsoTeszt extends TestCase
{
    /**
     * A diakok endpoint működik-e.
     */
    public function test_diakok_endpoint_mukodik(): void
    {
        $response = $this->get("/api/diakok");

        $response->assertStatus(200);
    }
}