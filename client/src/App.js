import * as React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Switch,
} from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';

function App() {
    return (
        <Router>
            <React.StrictMode>
                <StyledEngineProvider injectFirst>
                    <Navbar />
                    <Routes>
                        <Route exact path="/" element={<Dashboard />} />
                    </Routes>
                </StyledEngineProvider>
            </React.StrictMode>
        </Router>
    );
}

export default App;
