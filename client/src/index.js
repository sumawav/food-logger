import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Navbar from './components/layout/Navbar';

ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <Navbar />
        </StyledEngineProvider>
    </React.StrictMode>
);
