import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const Logs = ({ boxSize }) => {
    const logBoxRef = useRef(null);

    const Log = JSON.parse(window.sessionStorage.getItem('Log')) 


    useEffect(() => {
        if (logBoxRef.current) {
            logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
        }
    }, [Log]);

    return (
        <Box
            ref={logBoxRef}
            sx={{
                width: boxSize+100,
                height: boxSize,
                overflowY: 'auto',
                border: "1px solid green"
            }}
        >
            {Log.map((log, index) => (
                <Box key={index} sx={{ whiteSpace: 'nowrap', fontSize: [12, 15] }}>{log}</Box>
            ))}
        </Box>
    )
};

export default Logs