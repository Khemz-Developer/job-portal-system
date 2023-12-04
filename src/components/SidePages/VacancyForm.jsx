import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react';


const VacancyForm = () => {
  
    const [formData, setFormData] = useState({
        jobId: '',
        jobField: '',
        jobPosition: '',
        jobDescription: '',
        salary:'',
        dueDate: null,
        workLocation:'',
        workType:'',
        workMethod:'',
        requiredSkills:'',
        educationalQualifications: ''
      });
  
  
      const [validationErrors, setValidationErrors] = useState({
        jobId: '',
        jobField: '',
        jobPosition: '',
        jobDescription: '',
        salary:'',
        dueDate: '',
        workLocation:'',
        workType:'',
        workMethod:'',
        requiredSkills:'',
        educationQualifications: '',
      });
  
      const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    
        // Validate the field when the user starts typing
        validateField(field, event.target.value);
      };

      const handleDateChange = (date) => {
        setFormData({ ...formData, dueDate: date });
      };
      
      const validateField = (field, value) => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
      }
      
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Validate all fields before submission
        for (const field in formData) {
          validateField(field, formData[field]);
          if (validationErrors[field]) {
            alert(`Please fix the errors`);
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
        Vacancy Creation Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
        <TextField
          label="Job ID"
          variant="outlined"
          fullWidth
          style={{width:'30%', zIndex: 0}}
          required
          value={formData.jobId}
          onChange={handleChange('jobId')}
          margin="normal"
        />
        {validationErrors.jobId && (
          <Typography color="error">{validationErrors.jobId}</Typography>
        )}
        </div>
        <div style={{ display: 'flex',flexDirection: 'row', gap: '30px'}}>
        <FormControl sx={{width:'50%',zIndex: 0}} variant="outlined" margin="normal" >
          <InputLabel>Job Field</InputLabel>
          <Select value={formData.jobField} onChange={handleChange('jobField')} label="Job Field">
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="finance">Finance</MenuItem>
            <MenuItem value="telecommunication">Telecommunication</MenuItem>
            <MenuItem value="software">Software</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Job Position"
          variant="outlined"
          fullWidth
          required
          style={{width:'50%',zIndex: 0}}
          value={formData.jobPosition}
          onChange={handleChange('jobPosition')}
          margin="normal"
        />
        {validationErrors.jobPosition && (
          <Typography color="error">{validationErrors.jobPosition}</Typography>
        )}
        </div>

        <TextField
          label="Job Description"
          variant="outlined"
          fullWidth
          required
          multiline
          sx={{zIndex: 0}}
          rows={4}
          value={formData.jobDescription}
          onChange={handleChange('jobDescription')}
          margin="normal"
        />
        {validationErrors.jobDescription && (
          <Typography color="error">{validationErrors.jobDescription}</Typography>
        )}

        <div style={{ display: 'flex',flexDirection: 'row', gap: '30px'}}>
        <TextField
          label="Salary"
          variant="outlined"
          fullWidth
          required
          style={{width:'60%',zIndex: 0}}
          value={formData.salary}
          onChange={handleChange('salary')}
          margin="normal"
        />
        {validationErrors.salary && (
          <Typography color="error">{validationErrors.salary}</Typography>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl variant="outlined" margin="normal" required style={{width:'40%',zIndex: 0}}>
        <DatePicker
          label="Due Date"
          inputFormat="MM/dd/yyyy"
          value={formData.dueDate}
          onChange={handleDateChange}
          slotProps={{ textField: { variant: 'outlined' } }}
        />
        </FormControl>
        </LocalizationProvider>
        </div>

        <TextField
          label="Work Location"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          required
          sx={{zIndex: 0}}
          value={formData.workLocation}
          onChange={handleChange('workLocation')}
          margin="normal"
        />
        {validationErrors.workLocation && (
          <Typography color="error">{validationErrors.workLocation}</Typography>
        )}

        <div style={{ display: 'flex',flexDirection: 'row', gap: '30px'}}>
        <FormControl variant="outlined" margin="normal" style={{width:'50%',zIndex: 0}} required> 
          <InputLabel>Work Type</InputLabel>
          <Select value={formData.workType} onChange={handleChange('workType')} label="Work Type">
            <MenuItem value="fullTime">Full-time</MenuItem>
            <MenuItem value="partTime">Part-time</MenuItem>
          </Select>
        </FormControl>


        <FormControl variant="outlined" margin="normal" style={{width:'50%',zIndex: 0}} required> 
          <InputLabel>Working Method</InputLabel>
          <Select value={formData.workMethod} onChange={handleChange('workMethod')} label="Work Method">
            <MenuItem value="OnSite">On-Site</MenuItem>
            <MenuItem value="WorkfromHome">Work from Home</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
          </Select>
        </FormControl>
        </div>

        <TextField
          label="Required Skills"
          variant="outlined"
          fullWidth
          multiline
          required
          sx={{zIndex: 0}}
          rows={6}
          value={formData.requiredSkills}
          onChange={handleChange('requiredSkills')}
          margin="normal"
        />
        {validationErrors.requiredSkills && (
          <Typography color="error">{validationErrors.requiredSkills}</Typography>
        )}
        
        <TextField
          label="Required Educational Qualifications"
          variant="outlined"
          sx = {{zIndex:'0'}}
          fullWidth
          multiline
          rows={5}
          required
          value={formData.educationalQualifications}
          onChange={handleChange('educationalQualifications')}
          margin="normal"
        />
        {validationErrors.educationalQualifications && (
          <Typography color="error" >{validationErrors.educationalQualifications}</Typography>
        )}

        <div style={{ textAlign: 'center' }}>
        <br></br>
        <Button type="submit" variant="contained" color="primary" >
          Submit
        </Button>
        </div>
      </form>
      </Paper>
    </Container>
  );
}

export default VacancyForm
