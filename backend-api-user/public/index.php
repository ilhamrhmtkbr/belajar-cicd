<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Kernel::class);

frankenphp_handle_request(function () use ($kernel) {
    $request = Request::capture();

    try {
        $response = $kernel->handle($request);
        $response->send();
        $kernel->terminate($request, $response);

        // Optional: Force garbage collection
        if (function_exists('gc_collect_cycles')) {
            gc_collect_cycles();
        }

    } catch (\Throwable $e) {
        http_response_code(500);

        // Log error untuk debugging
        error_log($e->getMessage());

        // Response yang lebih aman untuk production
        if (config('app.debug')) {
            echo $e->getMessage();
        } else {
            echo 'Internal Server Error';
        }
    }
});
