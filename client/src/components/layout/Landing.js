import React from 'react';
import Box from '@mui/material/Box';

export const Landing = () => (
    <Box
        sx={{
            width: 300,
            height: 300,
            backgroundColor: 'primary.dark',
            '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
            },
        }}
    >
        <h2>Landing</h2>
    </Box>
);
