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

        // Retry login dengan backoff
        $maxRetries = 3;
        $retryDelay = 2; // seconds

        for ($i = 0; $i < $maxRetries; $i++) {
            try {
                $this->performLogin();
                break; // Success, exit loop
            } catch (\RuntimeException $e) {
                if ($i === $maxRetries - 1) {
                    // Last retry failed, re-throw the exception
                    throw $e;
                }

                echo "Login attempt " . ($i + 1) . " failed, retrying in {$retryDelay} seconds...\n";
                sleep($retryDelay);
                $retryDelay *= 2; // Exponential backoff
            }
        }
    }

    private function performLogin(): void
    {
        $loginUrl = 'http://backend-api-user/user-api/v1/auth/login';

        try {
            $res = Http::timeout(30)->post($loginUrl, [
                'username' => Repository::USERNAME,
                'password' => Repository::PASSWORD
            ]);

            // Debug response
            echo "Login response status: " . $res->status() . "\n";
            echo "Login response headers: " . json_encode($res->headers()) . "\n";
            echo "Login response body: " . $res->body() . "\n";

            if (!$res->successful()) {
                throw new \RuntimeException("Login request failed with status: " . $res->status() . ". Body: " . $res->body());
            }

            $cookies = $res->header('Set-Cookie');
            if (!$cookies) {
                throw new \RuntimeException("No cookies in login response. Response: " . $res->body());
            }

            if (is_array($cookies)) {
                $cookieString = implode('; ', $cookies);
            } else {
                $cookieString = $cookies;
            }

            echo "Cookies received: " . $cookieString . "\n";

            if (!preg_match('/access_token=([^;]+)/', $cookieString, $matches)) {
                throw new \RuntimeException("Failed to get access_token from cookies: " . $cookieString . ". Response body: " . $res->body());
            }

            $this->token = $matches[1];
            echo "Token extracted: " . substr($this->token, 0, 20) . "...\n";

        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            throw new \RuntimeException("Connection failed to login service: " . $e->getMessage());
        }
    }

    protected function tearDown(): void
    {
        Repository::clearData();
        parent::tearDown();
    }
}
