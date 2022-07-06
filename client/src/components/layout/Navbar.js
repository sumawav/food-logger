import React from 'react';
import { Box, Flex, Text, Link } from 'rebass';

export const Navbar = () => {
    return (
        <Flex px={2} color="white" bg="black" alignItems="center">
            <Text p={2} fontWeight="bold">
                FLOG
            </Text>
            <Box mx="auto" />
            <Link variant="nav" href="#!">
                Journal
            </Link>
            <Link variant="nav" href="#!">
                Foods
            </Link>
            <Link variant="nav" href="#!">
                Profile
            </Link>
        </Flex>
    );
};
