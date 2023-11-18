import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react';


const ApplicationForm = () => {
    const [formData, setFormData] = useState({
        nameWithInitials: '',
        fullName: '',
        gender: '',
        dob: null,
        email: '',
        contactNumber: '',
        field: '',
        cvFile: null,
      });
    
      const [validationErrors, setValidationErrors] = useState({
        nameWithInitials: '',
        fullName: '',
        gender: '',
        dob: '',
        email: '',
        contactNumber: '',
        field: '',
      });
    
      const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    
        // Validate the field when the user starts typing
        validateField(field, event.target.value);
      };
    
      const handleFileChange = (event) => {
        setFormData({ ...formData, cvFile: event.target.files[0] });
      };
    
      const handleDateChange = (date) => {
        setFormData({ ...formData, dob: date });
      };
    
      const validateField = (field, value) => {
        if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
          setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: 'Invalid email format' }));
        } else if (field === 'contactNumber' && !/^\d{10}$/.test(value)) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [field]: 'Invalid contact number. It must be a number with 10 digits.',
          }));
        } else {
          setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        }
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Validate all fields before submission
        for (const field in formData) {
          validateField(field, formData[field]);
          if (validationErrors[field]) {
            alert(`Please fix the error in the ${field} field.`);
            return;
          }
        }
    
        // Handle form submission logic, e.g., sending data to a server
        console.log('Form Data:', formData);
        // Add logic to send data to the server or perform other actions
      };
    
    
      return (
        <Container>
          <Paper elevation={4} component={Box} p={4}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
            Application Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
             Job Title: Trainee - Software Engineer
            </Typography>
            <TextField
              label="Name with Initials"
              variant="outlined"
              fullWidth
              value={formData.nameWithInitials}
              onChange={handleChange('nameWithInitials')}
              margin="normal"
            />
            {validationErrors.nameWithInitials && (
              <Typography color="error">{validationErrors.nameWithInitials}</Typography>
            )}
    
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={formData.fullName}
              onChange={handleChange('fullName')}
              margin="normal"
            />
            {validationErrors.fullName && (
              <Typography color="error">{validationErrors.fullName}</Typography>
            )}
    
            <div style={{ display: 'flex',flexDirection: 'row', gap: '30px'}}>
            <FormControl variant="outlined" margin="normal" style={{width:'45%'}}>
              <InputLabel>Gender</InputLabel>
              <Select value={formData.gender} onChange={handleChange('gender')} label="Gender">
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl variant="outlined" margin="normal" style={{width:'60%'}}>
            <DatePicker
              label="Date of Birth"
              inputFormat="MM/dd/yyyy"
              value={formData.dob}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params}
              margin="normal"/>}
              
            />
            </FormControl>
            </LocalizationProvider>
            </div>
    
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange('email')}
              margin="normal"
            />
            {validationErrors.email && (
              <Typography color="error" >{validationErrors.email}</Typography>
            )}
            
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              value={formData.contactNumber}
              onChange={handleChange('contactNumber')}
              margin="normal"
            />
            
            {validationErrors.contactNumber && (
              <Typography color="error">{validationErrors.contactNumber}</Typography>
            )}
    
            <FormControl fullWidth variant="outlined" margin="normal" >
              <InputLabel>Field</InputLabel>
              <Select value={formData.field} onChange={handleChange('field')} label="Field">
                <MenuItem value="hr">HR</MenuItem>
                <MenuItem value="finance">Finance</MenuItem>
                <MenuItem value="telecommunication">Telecommunication</MenuItem>
                <MenuItem value="software">Software</MenuItem>
              </Select>
            </FormControl>
    
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ margin: '16px 0' }}
            />
            <div style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary" >
              Submit
            </Button>
            </div>
          </form>
          </Paper>
        </Container>
      );
    
}

export default ApplicationForm
