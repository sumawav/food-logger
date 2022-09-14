import * as React from 'react';
import { BrowserRouter as Router, ROute, Switch } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';

function App() {
    return (
        <React.StrictMode>
            <StyledEngineProvider injectFirst>
                <Navbar />
                <Dashboard />
            </StyledEngineProvider>
        </React.StrictMode>
    );
}

export default App;
