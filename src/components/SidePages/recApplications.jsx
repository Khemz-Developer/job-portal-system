import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomModal from './modal';
const columns = [
    {id:'field', label:'Job Field', minWidth:100},
    {id:'jobPosition', label:'Job Position', minWidth:100},
    {id:'nameWithInitials', label:'Name', minWidth:100},
    {id:'submittedDate', label:'Submitted Date', minWidth:100},
    {id:'cvFileDataUrl', label:'Attached Documents', minWidth:100},
    {id:'modifies', label:'Modifications', minWidth:100}
]

const RecApplications = () => {
    const [applicationStatusRows,setApplicationStatusRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedApplication,setSelectedApplication] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const fetchData = async ()=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/applications/getByPending`)
            setApplicationStatusRows(response.data);
        }catch(error){
            console.error('Error fetching Data: ', error);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);


    const handleChangePage = (event,newPage)=>{
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event)=>{
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleView = (row)=>{
        setSelectedApplication(row);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        // Clear the selectedVacancy and close the modal
        setSelectedApplication(null);
        setModalOpen(false);
    };

    const handleAccept = async (appId)=>{
        try{
            await axios.patch(`${process.env.REACT_APP_API_URL}/applications/editStatusAccept/${appId}`);
            fetchData();
        }catch(error){
            console.error('Error editing status of applications: ', error);
        }
    };

    const handleReject = async (appId)=>{
        try{
            await axios.patch(`${process.env.REACT_APP_API_URL}/applications/editStatusReject/${appId}`);
            fetchData();
        }catch(error){
            console.error('Error editing status of applications: ', error);
        }
    }
    return (
        <Container maxWidth='lg'>
            <Paper elevation={12} sx={{p: '2%' }}>
                <Typography variant='h5' gutterBottom textAlign="center" fontWeight="medium" sx={{ my: '10px' }}>
                    Submitted Applications for Job Vacancies
                </Typography>
                <TableContainer sx={{ maxHeight:500 }}>
                    <Table>
                    <TableHead sx={{backgroundColor:'#d3d3d3'}}>
                        <TableRow>
                            {columns.map((column)=>(
                                <TableCell
                                    key = {column.id}
                                    align = {column.align}
                                    style = {{minWidth:column.minWidth, fontWeight:'bold', fontSize:'16px'}}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applicationStatusRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row)=>(
                            <TableRow key={row._id} hover role="checkbox" tabIndex={-1}>
                                {columns.map((column)=>(
                                    <TableCell key={column.id} align={column.align}>
                                        {column.id ==='modifies'?(
                                            <div>
                                                <Button onClick={()=>{handleView(row)}} style={{backgroundColor:'green', color:'white', marginRight:'12px'}}>View</Button>
                                                <Button onClick={()=>{handleAccept(row._id)}} style={{backgroundColor:'blue', color:'white', marginRight:'12px'}}>Accept</Button>
                                                <Button onClick={()=>{handleReject(row._id)}} style={{backgroundColor:'Red', color:'white'}}>Reject</Button>
                                            </div>
                                        ): column.id==='submittedDate' ? (
                                            new Date(row[column.id]).toISOString().split('T')[0]
                                        ): column.id === 'cvFileDataUrl' ? (
                                            // Display file name and provide a link to download
                                            <a href={row.cvFileDataUrl} download={row.cvFileName}>
                                                {row.cvFileName}
                                            </a>
                                        ): (
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
                    count={applicationStatusRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                
            </Paper>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {isModalOpen && (
                <CustomModal open={isModalOpen} onClose={handleModalClose} Data={selectedApplication} onCancel={handleModalClose} scenario="view" />
            )}
        </Container>
  );
}

export default RecApplications
