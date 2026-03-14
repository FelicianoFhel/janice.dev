import React from 'react';

function Welcome() {
    React.useEffect(() => {
        document.title = 'Welcome — Janice.dev';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 antialiased">
            <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]" aria-hidden="true" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b812_1px,transparent_1px),linear-gradient(to_bottom,#94a3b812_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-60" aria-hidden="true" />

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
                        Welcome to
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
                        Janice
                        <span className="text-indigo-600 dark:text-indigo-400">.</span>dev
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                        Your Laravel + React app is up and running. Start building something great.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="#"
                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-colors"
                        >
                            Get started
                        </a>
                        <a
                            href="https://laravel.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg shadow-sm transition-colors"
                        >
                            Laravel docs
                        </a>
                    </div>
                </div>
            </main>

            <footer className="relative border-t border-slate-200 dark:border-slate-800 py-6 px-6">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span>Laravel · React 18</span>
                    <span>Built with Vite & Tailwind CSS</span>
                </div>
            </footer>
        </div>
    );
}

export default Welcome;
