import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const columns = [
    { id: 'jobField', label: 'Job Field', minWidth: 100 },
    { id: 'jobTitle', label: 'Job Title', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
];

function createData(jobField, jobTitle, status, docId) {
   return { jobField, jobTitle, status, docId };
}

const UserStatus = () => {
    const [userStatusRows, setUserStatusRows] = useState([]);

    useEffect(() => {
        const dummyUserStatus = [
            createData('IT', 'Software Engineer', 'Pending', '1'),
            createData('Finance', 'Financial Analyst', 'Approved', '2'),
            // Add more dummy data as needed
        ];

        setUserStatusRows(dummyUserStatus);
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                        User Status
                    </Typography>

                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table">
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
                                                {row[column.id]}
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
