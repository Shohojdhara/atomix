import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './docs/App';
import './styles/index.scss';

// Find the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Also initialize any vanilla JS components
import './main.ts'; 