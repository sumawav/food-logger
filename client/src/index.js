import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';

ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <Navbar />
            <Dashboard />
        </StyledEngineProvider>
    </React.StrictMode>
);
