import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../authContext';


const columns = [
    { id: 'field', label: 'Job Field', minWidth: 100 },
    { id: 'jobPosition', label: 'Job Title', minWidth: 100 },
    { id: 'submittedDate', label: 'Submitted Date', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
];

const UserStatus = () => {
    const {authData} = useAuth();
    const token = authData.token;

    const [userStatusRows,setUserStatusRows] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const fetchData = async (token)=>{
        const headers = {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          };
          
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/status`,headers);
            setUserStatusRows(response.data);
        }catch(error){
            console.error('Error fetching data:',error);
        }
    }

    useEffect(()=>{
        fetchData(token);
    },[token]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={12} sx={{ p: '2%' }}>
                
                    <Typography variant="h5"  gutterBottom textAlign="center" fontWeight="medium" sx={{ my: '10px' }}>
                        Status of Applied Job Vacancies
                    </Typography>
                {/* //stickyHeader aria-label="sticky table" */}
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table > 
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, fontSize: '16px', fontWeight: 'bold'  }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userStatusRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row.docId} hover role="checkbox" tabIndex={-1}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align}>
                                                 {column.id==='submittedDate' ? (
                                                    new Date(row[column.id]).toISOString().split('T')[0]
                                                    ):(
                                                    row[column.id]
                                                 )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={userStatusRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
 
}

export default UserStatus
