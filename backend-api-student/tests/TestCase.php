<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Http;
use Tests\utils\Repository;

abstract class TestCase extends BaseTestCase
{
    public string $token;
    public string $url;

    protected function setUp(): void
    {
        parent::setUp();
        Repository::initData();
        $this->url = config('api.version');
        $res = Http::post('http://backend-api-user/'. $this->url .'/auth/login', [
            'username' => Repository::USERNAME,
            'password' => Repository::PASSWORD
        ]);
        $cookies = $res->header('Set-Cookie');
        preg_match('/access_token=([^;]+)/', $cookies, $matches);
        $this->token = $matches[1] ?? null;
        $res->dump();
    }

    protected function tearDown(): void
    {
        Repository::clearData();
        parent::tearDown();
    }
}
