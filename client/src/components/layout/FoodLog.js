import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material/';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import CircularProgressWithLabel from './CircularProgressWithLabel';
import LinearProgressWithLabel from './LinearProgressWithLabel';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const FoodLog = () => (
    <Container>
        <Box
            sx={{
                backgroundColor: 'primary.light',
            }}
        >
            <Typography variant="h1" component="div" color="text.primary">
                Log
            </Typography>
        </Box>
        <Box
            sx={{
                backgroundColor: 'primary.dark',
            }}
        >
            <Typography variant="h2" component="div" color="text.primary">
                Calories
            </Typography>
            <Typography variant="caption" component="div" color="text.primary">
                Remaining = Goal - Food + Exercise
            </Typography>

            <Item>
                <Typography variant="h3" component="div" color="text.primary">
                    Protein
                </Typography>
                <LinearProgressWithLabel value={20} />
                <Typography variant="h3" component="div" color="text.primary">
                    Carbohydrates
                </Typography>
                <LinearProgressWithLabel value={70} />
                <Typography variant="h3" component="div" color="text.primary">
                    Fats
                </Typography>
                <LinearProgressWithLabel value={55} />
            </Item>
        </Box>
    </Container>
);
export default FoodLog;
