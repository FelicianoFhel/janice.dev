<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>
        <meta name="description" content="Professional portfolio of Janice A. Calapiz — Information Systems & Institutional Development. Experience, skills, education, and contact.">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <meta property="og:title" content="{{ config('app.name', 'Laravel') }} — Professional Portfolio">
        <meta property="og:description" content="Professional portfolio of Janice A. Calapiz. Information Systems, institutional development, and administrative leadership.">
        <meta property="og:type" content="website">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        @vite(['resources/css/app.css', 'resources/js/entry.jsx'])
    </head>
    <body class="antialiased">
        <div id="root"></div>
    </body>
</html>
