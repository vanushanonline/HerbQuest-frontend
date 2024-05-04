import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useRef } from 'react';

const Output = () => {
  const ref = useRef(null)
  const data = JSON.parse(window.sessionStorage.getItem('output')) 

  if (!data) window.location.href = '/home'

  return (
    <Box display={"flex"} alignItems={"center"} flexDirection="column" justifyContent="center" width="100%">
      <Box sx={{ height: '100%', width: '100%', display: 'flex', p: 4, pb: 0, justifyContent: 'center' }}>
        <Box ref={ref} sx={{ fontSize: '20px', 'td': { borderBottom: "none" } }}>
          <TableContainer component={Paper}>
            <Table border={1}>
              <TableBody>
                <TableRow>
                  <TableCell width={200}>Name</TableCell>
                  <TableCell>{data.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Biological Name</TableCell>
                  <TableCell>{data.bname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sri Lanka Places</TableCell>
                  <TableCell>{data.splace.join(', ')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Benefits</TableCell>
                  <TableCell>
                    {data.benefit.map(b => (
                      <Box key={b} component="span">• {b}<br /></Box>
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} sx={{ p: 0, pt: 5 }}>
                    <TableContainer component={Paper}>
                      <Table size="small" border={1}>
                        <TableBody>
                          <TableRow>
                            <TableCell width={200}>Disease</TableCell>
                            <TableCell>How to use</TableCell>
                          </TableRow>
                          {data.usage.map((u, index) => (
                            <TableRow key={index}>
                              <TableCell>{u.disease}</TableCell>
                              <TableCell>{u.use}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box ml={5}>
          <img src={data.img} alt="leaf" style={{ width: 350, height: 350 }} />
        </Box>
      </Box>
      <Box display="block" px={4} width="100%" py={2}>
        <Button variant="contained" onClick={() => {
          window.location.href = '/home'
          window.sessionStorage.setItem('output', null)
        }}>Back</Button>
      </Box>
    </Box>
  );
}

export default Output;
