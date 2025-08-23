<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\utils\Repository;

abstract class TestCase extends BaseTestCase
{
    public ?string $token;
    public string $url;

    protected function setUp(): void
    {
        parent::setUp();
        Repository::initData();
        $this->url = config('api.version');

        try {
            // Tambahkan headers yang diperlukan
            $res = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])->post('http://backend-api-user' . $this->url . '/auth/login', [
                'username' => Repository::USERNAME,
                'password' => Repository::PASSWORD
            ]);

            Log::info('Login Response:', [
                'status' => $res->status(),
                'body' => $res->json(),
                'headers' => $res->headers()
            ]);

            if ($res->successful()) {
                $cookies = $res->header('Set-Cookie');
                if (is_array($cookies)) {
                    $cookies = implode('; ', $cookies);
                }

                preg_match('/access_token=([^;]+)/', $cookies, $matches);
                $this->token = $matches[1] ?? null;

                if (!$this->token) {
                    Log::error('Token not found in cookies', ['cookies' => $cookies]);
                }
            } else {
                Log::error('Login failed', [
                    'status' => $res->status(),
                    'response' => $res->json()
                ]);
                $this->token = null;
            }

        } catch (\Exception $e) {
            Log::error('Login exception', ['error' => $e->getMessage()]);
            $this->token = null;
        }
    }

    protected function tearDown(): void
    {
        Repository::clearData();
        parent::tearDown();
    }
}
