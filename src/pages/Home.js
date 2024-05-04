import { Box, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Output from '../components/Output';
import Upload from '../components/Upload';
import bg from "../res/bg.jpg";

const Home = () => {
    let location = useLocation();

    const screenHeight = window.innerHeight;
    const fs1 = screenHeight > 600 ? 75 : 50
    const fs2 = screenHeight > 600 ? 25 : 18

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={[1, 0]}>
            <Box position="relative" width={["100%", "80vw"]} height={["calc( 100vh - 720px)", "calc( 100vh - 33vw )"]}
                sx={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover', // Cover the entire area of the box
                    backgroundPosition: 'center', // Center the background image
                    backgroundRepeat: 'no-repeat' // Prevent repeating the background image
                }}
            >
                <Box display="flex" justifyContent="Center" alignItems="center" height="100%">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor: "rgba(255,255,255,0.75)",
                            borderRadius: 1,
                            width: ["100%", "80vh"]
                        }}
                    >
                        <Typography sx={{
                            color: "Green",
                            WebkitTextStrokeWidth: '3px',
                            WebkitTextStrokeColor: 'black',
                            fontSize: [40, fs1],
                            fontFamily: "poppins",
                            fontWeight: 600
                        }}>HerbQuest</Typography>
                        <Typography sx={{
                            color: "Green",
                            WebkitTextStrokeWidth: '1px',
                            WebkitTextStrokeColor: 'black',
                            fontSize: [15, fs2],
                            fontFamily: "poppins",
                            fontStyle: "italic",
                            fontWeight: 600
                        }}>Unveil the Green, Leaf by Leaf!</Typography>
                        <Typography sx={{
                            color: "Green",
                            WebkitTextStrokeWidth: '1px',
                            WebkitTextStrokeColor: 'black',
                            fontFamily: "poppins",
                            fontSize: [15, fs2],
                            fontWeight: 600
                        }}>AI Powered Herbal Leaves Detection</Typography>
                    </Box>
                </Box>
            </Box>

            <Box bgcolor="#232323" width={["100%", "80vw"]} minHeight={["calc(  100vh - calc( 100vh - 720px) )", "calc(  100vh - calc( 100vh - 33vw ) )"]} >
                {location.pathname.includes('output') ? <Output /> : <Upload />}
            </Box>
        </Box>

    );
};

export default Home;
