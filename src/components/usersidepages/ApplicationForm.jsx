import { Description as DescriptionIcon } from '@mui/icons-material';
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
    nic: '',
    email: '',
    landlineNumber: '',
    mobileNumber: '',
    field: '',
    educationQualifications: '',
    experience: '',
    extracurricular:'',
    otherQualifications: '',
    cvFile: null,
    cvFileDataUrl: null,
  });

  const [validationErrors, setValidationErrors] = useState({
    nameWithInitials: '',
    fullName: '',
    gender: '',
    dob: '',
    nic: '',
    email: '',
    landlineNumber: '',
    mobileNumber: '',
    field: '',
    educationQualifications: '',
    experience: '',
    extracurricular:'',
    otherQualifications: '',
    cvFile: ''
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });

    // Validate the field when the user starts typing
    validateField(field, event.target.value);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFileChange(event);
    

  };

  const handleFileChange = (event) => {
    const files = event.target.files || event.dataTransfer.files;
    
    // Check if files is not undefined or null
    if (files && files.length > 0) {
      const file = files[0];

       // Check file type (only allow ZIP files)
      if (!file.type.match('application/zip') && !file.name.endsWith('.zip')) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          cvFile: 'Invalid file type. Please choose a ZIP file.',
        }));
        return;
      }
  
      // Check file size (max size: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          cvFile: 'File size exceeds 5MB. Please choose a smaller file.',
        }));
      } else {
        setFormData({ ...formData, cvFile: file, cvFileDataUrl: null  });
        setValidationErrors((prevErrors) => ({ ...prevErrors, cvFile: '' }));

         // Read the file and display the image
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update the state with the data URL
        setFormData((prevData) => ({
          ...prevData,
          cvFileDataUrl: e.target.result,
        }));
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);

      }
    }
  };
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  
  //   // Check file size (max size: 5MB)
  //   if (file && file.size > 5 * 1024 * 1024) {
  //     setValidationErrors((prevErrors) => ({
  //       ...prevErrors,
  //       cvFile: 'File size exceeds 5MB. Please choose a smaller file.',
  //     }));
  //   } else {
  //     setFormData({ ...formData, cvFile: file });
  //     setValidationErrors((prevErrors) => ({ ...prevErrors, cvFile: '' }));
  //   }
  // };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const validateField = (field, value) => {
    if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: 'Invalid email format' }));
    }else if(field === 'mobileNumber' && !/^(0|\+94)[1-9]\d{8}$/.test(value)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        mobileNumber: 'Invalid mobile number. It must be a valid mobile number.',
      }));
    }else if (field === 'landlineNumber' && !/^\d{10}$/.test(value)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        landlineNumber: 'Invalid landline number. It must be a number with 10 digits.',
      }));
    }else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    }
  };

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
          sx={{zIndex: 0}}
          required
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
          required
          sx={{zIndex: 0}}
          value={formData.fullName}
          onChange={handleChange('fullName')}
          margin="normal"
        />
        {validationErrors.fullName && (
          <Typography color="error">{validationErrors.fullName}</Typography>
        )}

        <div style={{ display: 'flex',flexDirection: 'row', gap: '30px'}}>
        <FormControl variant="outlined" margin="normal" style={{width:'30%',zIndex: 0}} required> 
          <InputLabel>Gender</InputLabel>
          <Select value={formData.gender} onChange={handleChange('gender')} label="Gender">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl variant="outlined" margin="normal" required style={{width:'40%',zIndex: 0}}>
        <DatePicker
          label="Date of Birth"
          disableFuture
          inputFormat="MM/dd/yyyy"
          value={formData.dob}
          onChange={handleDateChange}
        />
        </FormControl>
        </LocalizationProvider>
        
        <TextField
          label="NIC"
          variant="outlined"
          required
          style={{width:'35%',zIndex: 0}}
          value={formData.nic}
          onChange={handleChange('nic')}
          margin="normal"
        />
        {validationErrors.nic && (
          <Typography color="error">{validationErrors.nic}</Typography>
        )}
        </div>
        <div>
        <TextField
          label="Email"
          variant="outlined"
          sx = {{width:'75%',zIndex:'0'}}
          required
          value={formData.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        {validationErrors.email && (
          <Typography color="error" >{validationErrors.email}</Typography>
        )}

        </div>

        <TextField
          label="Mobile Number"
          variant="outlined"
          sx = {{width:'50%',zIndex:'0'}}
          required
          value={formData.mobileNumber}
          onChange={handleChange('mobileNumber')}
          margin="normal"
        />
        {validationErrors.mobileNumber && (
          <Typography color="error">{validationErrors.mobileNumber}</Typography>
        )}
        <div>
        <TextField
          label="Landline Number"
          variant="outlined"
          sx = {{width:'50%',zIndex:'0'}}
          value={formData.landlineNumber}
          onChange={handleChange('landlineNumber')}
          margin="normal"
        />
        {validationErrors.landlineNumber && (
          <Typography color="error">{validationErrors.landlineNumber}</Typography>
        )}
        </div>

        <FormControl sx={{width:'30%',zIndex: 0}} variant="outlined" margin="normal" >
          <InputLabel>Field</InputLabel>
          <Select value={formData.field} onChange={handleChange('field')} label="Field">
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="finance">Finance</MenuItem>
            <MenuItem value="telecommunication">Telecommunication</MenuItem>
            <MenuItem value="software">Software</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          
          label="Education Qualifications"
          variant="outlined"
          fullWidth
          multiline
          required
          sx={{zIndex: 0}}
          rows={6}
          value={formData.educationQualifications}
          onChange={handleChange('educationQualifications')}
          margin="normal"
        />
        {validationErrors.educationQualifications && (
          <Typography color="error">{validationErrors.educationQualifications}</Typography>
        )}

        <TextField
          label="Experience"
          variant="outlined"
          fullWidth
          multiline
          sx={{zIndex: 0}}
          rows={4} // Adjust the number of rows as needed
          value={formData.experience}
          onChange={handleChange('experience')}
          margin="normal"
        />
        {validationErrors.experience && (
          <Typography color="error">{validationErrors.experience}</Typography>
        )}

        <TextField
          label="Extra Curricular Activities"
          variant="outlined"
          fullWidth
          multiline
          sx={{zIndex: 0}}
          rows={4} // Adjust the number of rows as needed
          value={formData.extracurricular}
          onChange={handleChange('extracurricular')}
          margin="normal"
        />
        {validationErrors.extracurricular && (
          <Typography color="error">{validationErrors.extracurricular}</Typography>
        )}

        <TextField
          label="Other Qualifications"
          variant="outlined"
          fullWidth
          multiline
          sx={{zIndex: 0}}
          rows={4} // Adjust the number of rows as needed
          value={formData.otherQualifications}
          onChange={handleChange('otherQualifications')}
          margin="normal"
        />
        {validationErrors.otherQualifications && (
          <Typography color="error">{validationErrors.otherQualifications}</Typography>
        )}


        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '128px',
            marginTop: '16px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
              {!formData.cvFileDataUrl && (
          <Typography variant="body2" color="textSecondary">
            Drag and drop your ZIP file here (or click to choose)
          </Typography>
        )}
        {formData.cvFileDataUrl && (
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
              Selected File: {formData.cvFile.name}
            </Typography>
            <DescriptionIcon style={{ fontSize: 96, marginTop: '8px' }} />
          </div>
        )}
        </div>

        <div>
          <Typography variant="body2" color="textSecondary">
            Please choose a zip file not exceeding 5MB with your CV,NIC copy,Birth Certificate & Educational Certificates(If needed) 
          </Typography>
          <input
            type="file"
            accept=".zip"
            required
            onChange={handleFileChange}
            style={{ margin: '8px 0' }}
            
          />
          {validationErrors.cvFile && (
            <Typography color="error">{validationErrors.cvFile}</Typography>
          )}
        </div>

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
