import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import bg from "../res/bg.jpg";

const Auth = () => {
    let location = useLocation();

    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() => { sessionStorage.setItem("login", false) },[])

    if (bigScreen)
        return (
            <Box display="flex" justifyContent={"center"}>
                <Box display="flex">
                    <Box component={'img'} sx={{ fontFamily: "poppins", objectFit: "cover", width: "80vh", height: "100vh", zIndex: 0 }} src={bg} alt='road background' />
                    <Box
                        sx={{
                            position: "absolute",
                            top: ["80px", "180px"],
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor: "rgba(255,255,255,0.75)",
                            borderRadius: 1,
                            width: "80vh"
                        }}
                    >
                        <Typography sx={{
                            color: "Green",
                            WebkitTextStrokeWidth: '3px',
                            WebkitTextStrokeColor: 'black',
                            fontSize: 75,
                            fontFamily: "poppins",
                            fontWeight: 600
                        }}>HerbQuest</Typography>
                        <Typography sx={{
                            color: "Green",
                            WebkitTextStrokeWidth: '1px',
                            WebkitTextStrokeColor: 'black',
                            fontSize: 25,
                            fontFamily: "poppins",
                            fontStyle: "italic",
                            fontWeight: 600
                        }}>Unveil the Green, Leaf by Leaf!</Typography>
                        <Typography sx={{
                            color: "Green",
                            WebkitTextStrokeWidth: '1px',
                            WebkitTextStrokeColor: 'black',
                            fontFamily: "poppins",
                            fontSize: 25,
                            fontWeight: 600
                        }}>AI Powered Herbal Leaves Detection</Typography>
                    </Box>
                    <Box  height={"100vh"} sx={{ bgcolor: "#232323", px: "20px" }}>
                        {location.pathname.includes('register') ? <Register /> : <Login />}
                    </Box>
                </Box>
            </Box>
        )
    else return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={1}>
            <Box position="relative" width={["100%", "1280px"]} height={'200px'}>
                <Box component={'img'} position="absolute" width="100%" height="100%" sx={{ objectFit: "cover" }} src={bg} alt='road background' />
                <Box display="flex" flexDirection="column" mt={4} alignItems="center" position="absolute" width="100%" sx={{ bgcolor: "rgba(211, 255, 209,0.75)", borderRadius: 1, }}>
                    <Typography sx={{
                        color: "Green",
                        WebkitTextStrokeWidth: '3px',
                        WebkitTextStrokeColor: 'black',
                        fontSize: 40,
                        fontFamily: "poppins",
                        fontWeight: 600
                    }}>HerbQuest</Typography>
                    <Typography sx={{
                        color: "Green",
                        WebkitTextStrokeWidth: '1px',
                        WebkitTextStrokeColor: 'black',
                        fontSize: 15,
                        fontFamily: "poppins",
                        fontStyle: "italic",
                        fontWeight: 600
                    }}>Unveil the Green, Leaf by Leaf!</Typography>
                    <Typography sx={{
                        color: "Green",
                        WebkitTextStrokeWidth: '1px',
                        WebkitTextStrokeColor: 'black',
                        fontFamily: "poppins",
                        fontSize: 15,
                        fontWeight: 600
                    }}>AI Powered Herbal Leaves Detection</Typography>
                </Box>
            </Box>

            <Box pt={8} bgcolor="#232323" height="calc( 100vh - 200px)" width={["100%", "1280px"]} >
                {location.pathname.includes('register') ? <Register /> : <Login />}
            </Box>
        </Box>
    )
}

export default Auth