import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../src/styles/index.scss';

// Add error handling
console.log("Initializing root element");

// Find the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    console.log("Root element found, creating root and rendering App");
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Error rendering React app:", error);
    rootElement.innerHTML = "<div style='color: red; padding: 20px;'>Error rendering application. Check console for details.</div>";
  }
} else {
  console.error("Root element not found!");
  document.body.innerHTML = "<div style='color: red; padding: 20px;'>Root element not found!</div>";
}

// Also initialize any vanilla JS components
try {
  console.log("Importing main.ts");
  import('../src/main.ts')
    .then(() => console.log("main.ts imported successfully"))
    .catch(err => console.error("Error importing main.ts:", err));
} catch (error) {
  console.error("Error importing main.ts:", error);
} 