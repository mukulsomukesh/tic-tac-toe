import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

function LabelBox({ label, value }) {
    return (
        <Box
            py={2}
            px={4}
            borderRadius="md"
            fontWeight="bold"
            textAlign="center"
            border={"2px solid"}
            borderColor={"brand.200"}
            color="brand.200"
            minWidth="60px"
            display="flex"
            alignItems="center"
        >
            {label} <Text ml={5}>{value}</Text>
        </Box>
    );
}

export default function Users() {
    const xWon = useSelector((state)=> state.appReducer.xWon )
    const oWon = useSelector((state)=> state.appReducer.oWon )
    const draw = useSelector((state)=> state.appReducer.draw )


    return (
        <Flex mt={5} justifyContent="space-between">
            <LabelBox label="O" value={oWon} />
            <LabelBox label="Draw" value={draw} />
            <LabelBox label="X" value={xWon} />
        </Flex>
    );
}
