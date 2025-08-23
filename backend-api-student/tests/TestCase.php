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
        // List of possible login URLs to try
        $loginUrls = [
            'http://backend-api-user/user-api/v1/auth/login',
            'http://backend-api-user/api/v1/auth/login',
            'http://backend-api-user/api/auth/login',
            'http://backend-api-user:8000/user-api/v1/auth/login',
            'http://backend-api-user:8000/api/auth/login',
        ];

        $lastException = null;

        foreach ($loginUrls as $loginUrl) {
            try {
                echo "Trying login URL: $loginUrl\n";

                $res = Http::timeout(30)->post($loginUrl, [
                    'username' => Repository::USERNAME,
                    'password' => Repository::PASSWORD
                ]);

                // Debug response
                echo "Login response status: " . $res->status() . "\n";
                echo "Login response body: " . $res->body() . "\n";

                if (!$res->successful()) {
                    echo "❌ Login failed with status: " . $res->status() . "\n";
                    continue; // Try next URL
                }

                // Try to get token from response body first
                $responseData = $res->json();
                if (isset($responseData['data']['access_token']) || isset($responseData['access_token'])) {
                    $this->token = $responseData['data']['access_token'] ?? $responseData['access_token'];
                    echo "✅ Token from response body: " . substr($this->token, 0, 20) . "...\n";
                    return; // Success!
                }

                // Fallback to cookies
                $cookies = $res->header('Set-Cookie');
                if (!$cookies) {
                    echo "❌ No token in response body and no cookies\n";
                    continue; // Try next URL
                }

                if (is_array($cookies)) {
                    $cookieString = implode('; ', $cookies);
                } else {
                    $cookieString = $cookies;
                }

                if (!preg_match('/access_token=([^;]+)/', $cookieString, $matches)) {
                    echo "❌ No access_token in cookies: " . $cookieString . "\n";
                    continue; // Try next URL
                }

                $this->token = $matches[1];
                echo "✅ Token from cookies: " . substr($this->token, 0, 20) . "...\n";
                return; // Success!

            } catch (\Illuminate\Http\Client\ConnectionException $e) {
                echo "❌ Connection failed to $loginUrl: " . $e->getMessage() . "\n";
                $lastException = new \RuntimeException("Connection failed to login service: " . $e->getMessage());
                continue; // Try next URL
            } catch (\Exception $e) {
                echo "❌ Error with $loginUrl: " . $e->getMessage() . "\n";
                $lastException = $e;
                continue; // Try next URL
            }
        }

        // If we get here, all URLs failed
        throw $lastException ?: new \RuntimeException("All login URLs failed");
    }

    protected function tearDown(): void
    {
        Repository::clearData();
        parent::tearDown();
    }
}
