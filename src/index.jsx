import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/scss/main.scss';

const domNode = document.getElementById('root');

// Use react 18 createRoot
const root = createRoot(domNode);

root.render(
	// Use strict mode for development.
	<StrictMode>
		<App />
	</StrictMode>
);
