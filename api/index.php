<?php

// Vercel: filesystem is read-only; point Laravel caches and logs to /tmp or stderr
if (getenv('VERCEL')) {
    putenv('APP_CONFIG_CACHE=/tmp/config.php');
    putenv('APP_EVENTS_CACHE=/tmp/events.php');
    putenv('APP_PACKAGES_CACHE=/tmp/packages.php');
    putenv('APP_ROUTES_CACHE=/tmp/routes.php');
    putenv('APP_SERVICES_CACHE=/tmp/services.php');
    putenv('LOG_CHANNEL=stderr');
}

require __DIR__ . '/../public/index.php';
