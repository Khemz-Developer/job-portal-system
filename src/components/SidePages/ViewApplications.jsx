import { Description as DescriptionIcon } from '@mui/icons-material';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from "react";
const ViewApplications = ({applicationData,onCancel}) => {
  const [getData] = useState({...applicationData})
  
  const dobDate = new Date(getData.dob); // Convert 'dob' to a Date object
  const dobDatePart = dobDate.toISOString().split('T')[0]; // Get the date part
  return (
    <Container>
      <Paper elevation={4} component={Box} p={4}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        Application Form Details
      </Typography>
      <form>
        <Typography variant="body1" gutterBottom>
            Job Title: {getData.jobTitle}
        </Typography>
        <TextField
          label="Name with Initials"
          variant="outlined"
          fullWidth
          sx={{zIndex: 0}}
          value={getData.nameWithInitials}
          margin="normal"
        />

        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          sx={{zIndex: 0}} 
          value={getData.fullName}
          margin="normal"
        />

        <div style={{ display: 'flex',flexDirection: 'row', gap: '30px'}}>
        <TextField
          label="Gender"
          variant="outlined"
          style={{width:'30%',zIndex: 0}}
          value={getData.gender}
          margin="normal"
        />
{/*         
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl variant="outlined"  margin="normal" style={{width:'40%',zIndex: 0}} required>
        <DatePicker
          label="Date of Birth"
          inputFormat="MM/dd/yyyy"
          value={getData.dob}
          slotProps={{ textField: { variant: 'outlined' } }}
        />
        </FormControl>
        </LocalizationProvider> */}
        <TextField
          label="Date of Birth"
          variant="outlined"
          style={{width:'30%',zIndex: 0}}
          value={dobDatePart}
          margin="normal"
        />
        
        <TextField
          label="NIC"
          variant="outlined"
          style={{width:'35%',zIndex: 0}}
          value={getData.nic}
          margin="normal"
        />

        </div>
        <div>
        <TextField
          label="Email"
          variant="outlined"
          sx = {{width:'75%',zIndex:'0'}}
          value={getData.email}
          margin="normal"
        />

        </div>

        <TextField
          label="Mobile Number"
          variant="outlined"
          sx = {{width:'50%',zIndex:'0'}}
          value={getData.mobileNumber}
          margin="normal"
        />

        <div>
        <TextField
          label="Landline Number"
          variant="outlined"
          sx = {{width:'50%',zIndex:'0'}}
          value={getData.landlineNumber}
          margin="normal"
        />
        </div>
        
        <TextField
          label="Field"
          variant="outlined"
          sx={{width:'30%',zIndex: 0}}
          value={getData.field}
          margin="normal"
        />
        
        <TextField
          label="Educational Qualifications"
          variant="outlined"
          fullWidth
          multiline
          sx={{zIndex: 0}}
          rows={6}
          value={getData.educationalQualifications}
          margin="normal"
        />

        {getData.eduDetails === 'ol' && (
          <div>
            <Typography variant='h6' gutterBottom>
                O/L Grades
            </Typography>
            <div style={{ display: 'flex',flexDirection: 'row', gap: '20px'}}>
            {getData.olSubjects.map((subject,index)=>{
              return(
                <div key={index}>
                <Typography sx={{zIndex: 0}}>{subject}</Typography>
                <TextField
                  variant='outlined'
                  sx={{zIndex: 0}}
                  value={getData.olGrades[index]}
                  margin='normal'
                />
                </div>
              )
            })}
            </div>
          </div>
        )}

        {getData.eduDetails === 'al' && (
          <div>
            <Typography variant='body1' gutterBottom>
                A/L Grades
            </Typography>
            <div style={{ display: 'flex',flexDirection: 'row', gap: '20px'}}>
            {getData.alSubjects.map((subject,index)=>{
              return(
                <div key={index}>
                <Typography sx={{justifyContent:'center', zIndex: 0}} >{subject}</Typography>
                <TextField
                  variant='outlined'
                  sx={{zIndex: 0}}
                  value={getData.alGrades[index]}
                  margin='normal'
                />
              </div>
              )
            })}
            </div>
          </div>
        )}

        <TextField
          label="Experience"
          variant="outlined"
          fullWidth
          multiline
          sx={{zIndex: 0}}
          rows={4} // Adjust the number of rows as needed
          value={getData.experience}
          margin="normal"
        />

        <TextField
          label="Extra Curricular Activities"
          variant="outlined"
          fullWidth
          multiline
          sx={{zIndex: 0}}
          rows={4} // Adjust the number of rows as needed
          value={getData.extracurricular}
          margin="normal"
        />

        <TextField
          label="Other Qualifications"
          variant="outlined"
          fullWidth
          multiline
          sx={{zIndex: 0}}
          rows={4} // Adjust the number of rows as needed
          value={getData.otherQualifications}
          margin="normal"
        />
        <div
          style={{
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '128px',
            marginTop: '16px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
        {getData.cvFileDataUrl && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" color="textSecondary">
              Selected File: {getData.cvFileName}
            </Typography>
            <DescriptionIcon style={{ fontSize: 96, marginTop: '8px' }} />
          </div>
        )}
        </div>
        <br></br>
        <div style={{ textAlign: 'center' }}>
        <Button type="button" variant="contained" onClick = {onCancel}  color="primary" >
          Back
        </Button>
        </div>
      </form>
      </Paper>
    </Container>
  );
}

export default ViewApplications
