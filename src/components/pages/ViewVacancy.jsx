import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
const ViewVacancy = ({vacancyData,onCancel}) => {
  const [getData] = useState({...vacancyData})
  const dueTime = new Date(getData.props.dueDate); // Convert 'dob' to a Date object
  const dueDate1 = dueTime.toISOString().split('T')[0]; // Get the date part  
  return (
    <Container >
    <Paper elevation={4} component={Box} p={4}>
    <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
      Vacancy Details
    </Typography>
    <Typography variant="h6" gutterBottom >
      Job Title: {getData.props.heading}
    </Typography>
    <Typography variant="body1" textAlign={'justify'} gutterBottom>
      Job Description:
      <br></br>
      <Typography variant="body2">
        {getData.props.details}
      </Typography>
    </Typography>
    <Typography variant="body1" gutterBottom>
      Salary: Rs.{getData.props.salary}/=
    </Typography>
    <Typography variant="body1" >
      Required Skills:
    </Typography>
    <ul>
        {getData.props.details1.map((skill, index) => (
            <li  key={index}>
                <Typography variant='body2'>{skill}</Typography>
            </li>
        ))}
    </ul>
    <Typography variant="body1" gutterBottom>
      Work Location: {getData.props.workLocation}
    </Typography> 
    <Typography variant="body1" gutterBottom>
      Work Type: {getData.props.workType}
    </Typography> 
    <Typography variant="body1" gutterBottom>
      Work Method: {getData.props.workMethod}
    </Typography>   
    <Typography variant="body1" gutterBottom>
        Minimum Required Educational Qualifications:  {getData.props.eduDetails}
    </Typography>
    <br></br>
    <Typography variant="body1" textAlign={'center'} gutterBottom>
        You can apply for this vacancy till {dueDate1}
    </Typography>
    <br></br>
    <div style={{ textAlign: 'center' }}>
        <Button type="button" variant="contained" onClick = {onCancel}  color="primary" >
          Back
        </Button>
    </div>
    </Paper>
    </Container>
  )
}

export default ViewVacancy
