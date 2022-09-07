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

const Dashboard = () => (
    <Container>
        <Box
            sx={{
                backgroundColor: 'primary.light',
            }}
        >
            <Typography variant="h1" component="div" color="text.primary">
                Greetings
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <CircularProgressWithLabel size={300} value={75} />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Typography
                            variant="h3"
                            component="div"
                            color="text.primary"
                        >
                            Protein
                        </Typography>
                        <LinearProgressWithLabel value={20} />
                        <Typography
                            variant="h3"
                            component="div"
                            color="text.primary"
                        >
                            Carbohydrates
                        </Typography>
                        <LinearProgressWithLabel value={70} />
                        <Typography
                            variant="h3"
                            component="div"
                            color="text.primary"
                        >
                            Fats
                        </Typography>
                        <LinearProgressWithLabel value={55} />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    </Container>
);
export default Dashboard;
