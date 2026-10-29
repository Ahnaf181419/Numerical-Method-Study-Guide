import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/manrope';
import 'katex/dist/katex.min.css';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
