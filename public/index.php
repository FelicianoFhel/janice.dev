<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Serverless platforms (e.g., Vercel) use a read-only app filesystem.
// Force Laravel cache/log targets to writable/stream destinations.
if (is_dir('/tmp')) {
    if (! getenv('APP_CONFIG_CACHE')) {
        putenv('APP_CONFIG_CACHE=/tmp/config.php');
    }
    if (! getenv('APP_EVENTS_CACHE')) {
        putenv('APP_EVENTS_CACHE=/tmp/events.php');
    }
    if (! getenv('APP_PACKAGES_CACHE')) {
        putenv('APP_PACKAGES_CACHE=/tmp/packages.php');
    }
    if (! getenv('APP_ROUTES_CACHE')) {
        putenv('APP_ROUTES_CACHE=/tmp/routes.php');
    }
    if (! getenv('APP_SERVICES_CACHE')) {
        putenv('APP_SERVICES_CACHE=/tmp/services.php');
    }
    if (! getenv('VIEW_COMPILED_PATH')) {
        putenv('VIEW_COMPILED_PATH=/tmp');
    }
    if (! getenv('SESSION_DRIVER')) {
        putenv('SESSION_DRIVER=cookie');
    }
    if (! getenv('LOG_CHANNEL')) {
        putenv('LOG_CHANNEL=stderr');
    }
}

/*
|--------------------------------------------------------------------------
| Check If The Application Is Under Maintenance
|--------------------------------------------------------------------------
|
| If the application is in maintenance / demo mode via the "down" command
| we will load this file so that any pre-rendered content can be shown
| instead of starting the framework, which could cause an exception.
|
*/

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| this application. We just need to utilize it! We'll simply require it
| into the script here so we don't need to manually load our classes.
|
*/

require __DIR__.'/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request using
| the application's HTTP kernel. Then, we will send the response back
| to this client's browser, allowing them to enjoy our application.
|
*/

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);
