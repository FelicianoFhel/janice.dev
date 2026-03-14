import React from 'react';
import './bootstrap';
import { createRoot } from 'react-dom/client';
import Portfolio from './Portfolio.jsx';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<Portfolio />);
}
