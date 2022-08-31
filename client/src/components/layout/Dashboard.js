import React from 'react';
import { Box, Container, Grid } from '@mui/material/';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dashboard = () => (
    <Container>
        <Box
            sx={{
                backgroundColor: 'primary.light',
            }}
        >
            <h1>Greeting</h1>
        </Box>
        <Box
            sx={{
                backgroundColor: 'primary.dark',
            }}
        >
            <h2>Calories</h2>
            <h3>Remaining = Goal - Food + Exercise</h3>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>LEFT</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>RIGHT</Item>
                </Grid>
            </Grid>
        </Box>
    </Container>
);
export default Dashboard;
