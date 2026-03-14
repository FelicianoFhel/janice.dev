import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/entry.jsx'],
            refresh: true,
        }),
    ],
    esbuild: {
        jsx: 'transform',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        cors: true,
    },
});
