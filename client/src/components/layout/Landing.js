import React from 'react';
import { Heading, Box } from 'rebass';

export const Landing = () => (
    <Box
        sx={{
            px: 4,
            py: 6,
            backgroundImage:
                'url(https://source.unsplash.com/random/1024x768?sky)',
            backgroundSize: 'cover',
            borderRadius: 8,
            color: 'white',
            bg: 'gray',
        }}
    >
        <Heading textAlign="center" fontSize={[5, 6]}>
            Landing
        </Heading>
    </Box>
);
