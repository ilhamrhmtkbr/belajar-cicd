<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(function () {
        Route::prefix(config('api.version'))
            ->group(function () {
                Route::get('/storage/user-images/{filename}', function ($filename) {
                    // Validate filename format
                    if (!preg_match('/^[a-zA-Z0-9._-]+$/', $filename)) {
                        abort(404);
                    }

                    $path = storage_path('app/public/user-images/' . $filename);

                    if (!File::exists($path)) {
                        abort(404);
                    }

                    return response()->file($path);
                })->where('filename', '[a-zA-Z0-9._-]+');
            });
        Route::prefix(config('api.version'))
            ->middleware('throttle:custom_limiter')
            ->group(base_path('routes/api-v1.php'));
        Route::prefix(config('api.version') . '/auth')
            ->middleware('throttle:custom_limiter')
            ->group(base_path('domain/Auth/Routes/api-v1.php'));
        Route::prefix(config('api.version') . '/public')
            ->middleware('throttle:custom_limiter')
            ->group(base_path('domain/Public/Route/api-v1.php'));
        Route::prefix(config('api.version') . '/member')
            ->middleware('throttle:custom_limiter')
            ->group(base_path('domain/Member/Routes/api-v1.php'));
    }, channels: base_path('routes/channels.php'))
    ->withMiddleware(function (Middleware $middleware): void {
        //
        $middleware->alias([
            'auth.jwt.cookie' => \App\Http\Middleware\JwtCookieMiddleware::class,
            'auth.jwt.cookie-refresh' => \App\Http\Middleware\JwtCookieRefreshMiddleware::class
        ]);

        $middleware->use([
            \Illuminate\Http\Middleware\HandleCors::class,
            \App\Http\Middleware\AppLocaleMiddleware::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
