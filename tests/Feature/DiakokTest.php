<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DiakokTest extends TestCase
{
    public function test_example(): void
    {
        $response = $this
            ->get('/api/diakok');

        $response->assertStatus(200);
    }
}
