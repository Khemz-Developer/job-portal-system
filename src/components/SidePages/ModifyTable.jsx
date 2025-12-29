import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../authContext';
import CustomModal from './modal';
const columns = [
    {id:'jobField', label:'Job Field', minWidth:100},
    {id:'jobPosition', label:'Job Position', minWidth:100},
    {id:'createdDate', label:'Created Date', minWidth:100},
    {id:'dueDate', label:'Due Date', minWidth:100},
    {id:'modifies', label:'Modifications', minWidth:100}
]

// function createData(jobField, jobPosition, createdDate, dueDate, modifies,docId) {
//     return { jobField, jobPosition, createdDate, dueDate, modifies, docId };
// }

const ModifyTable = () => {
    const {authData} = useAuth();
    const token = authData.token;
    
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [vacancyStatusRows,setVacancyStatusRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isModalOpen, setModalOpen] = useState(false);
    
   

    const fetchData = async (token)=>{
        const headers = {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          };
          
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/vacancies/get-all`,headers);
            setVacancyStatusRows(response.data);
        }catch(error){
            console.error('Error fetching data:',error);
        }
    }

    useEffect(()=>{
        fetchData(token);
    },[token]);

    const handleChangePage = (event,newPage)=>{
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event)=>{
        setRowsPerPage(+event.target.value);
        setPage(0);
    }
    
    const handleEdit = (row)=>{
        console.log("Selected Row:", row);
        setSelectedVacancy(row);
        setModalOpen(true);
    }

    const handleModalClose = () => {
        // Clear the selectedVacancy and close the modal
        setSelectedVacancy(null);
        setModalOpen(false);
    };

    const handleUpdateTable = () => {
        // Implement logic to update the data in ModifyTable component
        // You might need to re-fetch the data or update the state, depending on your implementation.
        fetchData(token);
        setSelectedVacancy(null);
        setModalOpen(false);
        console.log('Table Updated!');
      };

    const handleDelete = async (vacancyId)=>{
        try{
            const headers = {
                headers: {
                  Authorization: token ? `Bearer ${token}` : '',
                },
            };
            await axios.delete(`${process.env.REACT_APP_API_URL}/vacancies/deleteById/${vacancyId}`,headers);
            fetchData(token);
        }catch(error){
            console.error('Error fetching data:',error);
        }
    }
    
    return (
        <Container maxWidth='lg'>
            <Paper elevation={12} sx={{p: '2%' }}>
                <Typography variant='h5' gutterBottom textAlign="center" fontWeight="medium" sx={{ my: '10px' }}>
                    Created Job Vacancy Details
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
                        {vacancyStatusRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row)=>(
                            <TableRow key={row._id} hover role="checkbox" tabIndex={-1}>
                                {columns.map((column)=>(
                                    <TableCell key={column.id} align={column.align}>
                                        {column.id ==='modifies'?(
                                            <div>
                                                <Button onClick={()=>{handleEdit(row)}} style={{backgroundColor:'green', color:'white', marginRight:'12px'}}>View & Edit</Button>
                                                <Button onClick={()=>{handleDelete(row._id)}} style={{backgroundColor:'Red', color:'white'}}>Delete</Button>
                                            </div>
                                        ):(column.id==='createdDate' || column.id==='dueDate')?(
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
                    count={vacancyStatusRows.length}
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
                <CustomModal open={isModalOpen} onClose={handleModalClose} Data={selectedVacancy} onUpdate={handleUpdateTable} onCancel={handleModalClose} scenario="update" />
            )}
        </Container>
        
  );
}

export default ModifyTable
