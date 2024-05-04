import { Box, Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useRef, useState } from 'react';
import uploadpreview from "../res/uploadpreview.png";
import Logs from './Logs';
import { send_blob } from '../api'


const log = msg => {

    function getTimestamp() {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const timestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return timestamp;
    }

    let Log = JSON.parse(window.sessionStorage.getItem('Log'))
    if (!Log) Log = []

    Log.push(`${getTimestamp()}: ${msg}`)
    window.sessionStorage.setItem('Log', JSON.stringify(Log))

}

const Upload = () => {
    const [mode, setMode] = useState('upload');
    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isCaptured, setIsCaptured] = useState(false);
    const inputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const screenHeight = window.innerHeight;
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const boxSize = bigScreen ? screenHeight > 600 ? 500 : 360 : 300

    const handleModeChange = async (event) => {
        setMode(event.target.value);
        log(`Tab entered ${event.target.value}`)

        setImageSrc(null);
        setIsCaptured(false);
        if (event.target.value === 'capture') {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                log(`Camera on`)

            } catch (error) {
                console.error('Error accessing the camera.', error);
                log(`Error accessing the camera: ${error}`)

            }
        } else {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();

                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
                videoRef.current = null;
                log(`Camera off`)
            }
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
            setImageFile(file);
            log(`Image selected from local`)
        } else {
            log(`Error on selecting image from local`)
        }
    };

    const handleCapture = () => {
        if (!isCaptured) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            if (!canvas || !video) return;

            const context = canvas.getContext('2d');

            // Calculate the dimensions to crop the video to a square
            const width = video.videoWidth;
            const height = video.videoHeight;
            const minDimension = Math.min(width, height);
            const startX = (width - minDimension) / 2;
            const startY = (height - minDimension) / 2;

            // Set the dimensions of the canvas
            canvas.width = boxSize;
            canvas.height = boxSize;

            // Draw the cropped video to the canvas
            context.drawImage(video, startX, startY, minDimension, minDimension, 0, 0, canvas.width, canvas.height);

            // Create a blob from the canvas
            canvas.toBlob(blob => {
                setImageFile(blob);
                const url = URL.createObjectURL(blob);
                setImageSrc(url);
                setIsCaptured(true);
            })
            log(`Image Captured via camera`)

        } else {
            setImageSrc(null);
            setIsCaptured(false);
            setImageFile(null);
            log(`Captured image was cleared`)
        }
    };

    const sendToBackend = async () => {

        log(`Captured image send to backend`)

        console.log('Sending to backend:', imageFile);


        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            const response = await send_blob(formData)
            log(`${response.message}`)

            if (response.status === 0){
                window.sessionStorage.setItem('output', JSON.stringify(response.data))
                window.location.href = '/home/output'
            }
        } catch (error) {
            log(`Error on API call`);
        }



       
    };

    if (bigScreen)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" my={6}>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mr: 15 }} >

                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <RadioGroup row value={mode} onChange={handleModeChange}>
                            <FormControlLabel value="upload" control={<Radio />} label="Upload" />
                            <FormControlLabel value="capture" control={<Radio />} label="Capture" />
                            <FormControlLabel value="log" control={<Radio />} label="Log" />
                        </RadioGroup>
                    </Box>

                    {mode === 'upload' && (
                        <>
                            <Box display={"flex"} alignItems="center" justifyContent="center" width="100%">
                                <Button variant="contained" onClick={() => inputRef.current.click()}>Browse</Button>
                                {imageSrc && <Button variant="contained" sx={{ ml: 2 }} onClick={sendToBackend} >Analyze</Button>}
                            </Box>
                        </>
                    )}

                    {mode === 'capture' && (
                        <>
                            <Box display={"flex"} alignItems="center" justifyContent="center" width="100%">
                                <Button variant="contained" onClick={handleCapture}>
                                    {isCaptured ? 'Retake' : 'Capture'}
                                </Button>
                                {imageSrc && isCaptured && (
                                    <Button variant="contained" onClick={sendToBackend} sx={{ ml: 5 }}>
                                        Analyze
                                    </Button>
                                )}
                            </Box>
                        </>
                    )}

                </Box>


                {mode === 'upload' && (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={inputRef}
                            onChange={handleFileSelect}
                        />
                        <img src={imageSrc ? imageSrc : uploadpreview} alt="Preview" style={{ width: `${boxSize}px`, height: `${boxSize}px`, border: "1px solid green" }} />
                    </>
                )}


                {mode === 'capture' && (
                    <>
                        <Box sx={{ width: boxSize, height: boxSize, border: "1px solid green" }}>
                            <video ref={videoRef} style={{ display: !isCaptured ? "block" : "none", width: `${boxSize}px`, height: `${boxSize}px`, objectFit: "cover" }} autoPlay></video>
                            {imageSrc && <img src={imageSrc} alt="Captured" style={{ width: `${boxSize}px`, height: `${boxSize}px` }} />}
                        </Box>
                        <canvas ref={canvasRef} style={{ display: 'none' }} width={`${boxSize}`} height={`${boxSize}`}></canvas>
                    </>
                )}

                {mode === 'log' && (
                    <>
                        <Box sx={{ width: boxSize, height: boxSize }}>
                            <Logs boxSize={boxSize} />
                        </Box>
                    </>
                )}

            </Box>
        );

    return (
        <Box display="flex" flexDirection="column" alignItems="center" my={5}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <RadioGroup row value={mode} onChange={handleModeChange}>
                    <FormControlLabel value="upload" control={<Radio />} label="Upload" />
                    <FormControlLabel value="capture" control={<Radio />} label="Capture" />
                    <FormControlLabel value="Log" control={<Radio />} label="Log" />
                </RadioGroup>
            </Box>

            {mode === 'upload' && (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={inputRef}
                        onChange={handleFileSelect}
                    />
                    <img src={imageSrc ? imageSrc : uploadpreview} alt="Preview" style={{ width: `${boxSize}px`, height: `${boxSize}px`, border: "1px solid green" }} />
                    <Box display={"flex"} alignItems="center" justifyContent="center" mt={4} width="100%">
                        <Button variant="contained" onClick={() => inputRef.current.click()}>Browse</Button>
                        {imageSrc && <Button variant="contained" sx={{ ml: 5 }} onClick={sendToBackend} >Analyze</Button>}
                    </Box>
                </>
            )}

            {mode === 'capture' && (
                <>
                    <Box sx={{ width: boxSize, height: boxSize, border: "1px solid green" }}>
                        <video ref={videoRef} style={{ display: !isCaptured ? "block" : "none", width: `${boxSize}px`, height: `${boxSize}px`, objectFit: "cover" }} autoPlay></video>
                        {imageSrc && <img src={imageSrc} alt="Captured" style={{ width: `${boxSize}px`, height: `${boxSize}px` }} />}
                    </Box>
                    <canvas ref={canvasRef} style={{ display: 'none' }} width={`${boxSize}`} height={`${boxSize}`}></canvas>
                    <Box display={"flex"} alignItems="center" justifyContent="center" mt={4} width="100%">
                        <Button variant="contained" onClick={handleCapture}>
                            {isCaptured ? 'Retake' : 'Capture'}
                        </Button>
                        {imageSrc && isCaptured && (
                            <Button variant="contained" onClick={sendToBackend} sx={{ ml: 5 }}>
                                Analyze
                            </Button>
                        )}
                    </Box>
                </>
            )}

            {mode === 'Log' && (
                <>
                    <Box sx={{ width: boxSize, height: boxSize }}>
                        <Logs boxSize={boxSize - 100} />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Upload;
