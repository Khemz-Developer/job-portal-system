import { Description as DescriptionIcon } from '@mui/icons-material';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../authContext';
import uploadFile from '../../utils/fileUpload';
const ApplicationForm = ({jobTitle,jobField,jobPosition,eduDetails,olSubjects,alSubjects}) => {
  //const [fileDropped, setFileDropped] = useState(false);
  const {authData} = useAuth();
  const token = authData.token;

  const [formData, setFormData] = useState({
    jobPosition: jobPosition,
    jobTitle: jobTitle,
    nameWithInitials: '',
    fullName: '',
    gender: '',
    dob: null,
    nic: '',
    email: '',
    landlineNumber: '',
    mobileNumber: '',
    field: '',
    eduDetails: eduDetails,
    educationalQualifications: '',
    olSubjects : olSubjects,
    alSubjects : alSubjects,
    olGrades: Array(olSubjects.length).fill(''),
    alGrades: Array(alSubjects.length).fill(''),
    experience: '',
    extracurricular:'',
    otherQualifications: '',
    cvFile: null,
    cvFileDataUrl: null,
    cvFileName: null,
  });

  const [validationErrors, setValidationErrors] = useState({
    jobPosition:'',
    nameWithInitials: '',
    fullName: '',
    gender: '',
    dob: '',
    nic: '',
    email: '',
    landlineNumber: '',
    mobileNumber: '',
    field: '',
    educationalQualifications: '',
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
    //setFileDropped(true);
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

  const handleRemoveFile = () => {
    setFormData((prevData) => ({
      ...prevData,
      cvFile: null,
      cvFileDataUrl: null,
    }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, cvFile: '' }));
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleGradeChange = (event, index, eduType) => {
    const updatedGrades = [...formData[`${eduType}Grades`]];
    updatedGrades[index] = event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${eduType}Grades`]: updatedGrades,
    }));
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate all fields before submission
    for (const field in formData) {
      validateField(field, formData[field]);
      if (validationErrors[field]) {
        alert(`Please fix the errors`);
        return;
      }
    }

    // Validate all required fields before submission
    const requiredFields = [
      'nameWithInitials',
      'fullName',
      'gender',
      'dob',
      'nic',
      'email',
      'mobileNumber',
      'field',
      'educationalQualifications',
      'cvFile',
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
        alert(`Some fields need to be filled`);
        return;
    }
    const fileName = formData.cvFile.name;
    try {
      // Upload the CV file to Firebase Storage
      const downloadURL = await uploadFile('CVs',fileName, formData.cvFile);
  
      // You can use the downloadURL as needed, for example, storing it in the database or displaying it to the user
      console.log('CV file uploaded successfully. Download URL:', downloadURL);
      const headers = {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
      
      console.log('Headers:', headers); // Check headers in console
      await axios.post('http://localhost:3001/applications/create',{
        ...formData,
        cvFileDataUrl: downloadURL,
        cvFileName: fileName},headers);

      window.location.reload();
      // Add logic to send other form data to the server or perform other actions
      alert('Successfully applied for the Vacancy');
      console.log('Form Data:', formData);
      
  
    } catch (error) {
      // Handle errors 
      console.error('Error submitting the form:', error);
      alert('Error submitting the form. Please try again.');
    }

  };


  return (
    <Container>
      <Paper elevation={4} component={Box} p={4}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        Application Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
            Job Title: {formData.jobTitle}
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
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl variant="outlined"  margin="normal" style={{width:'40%',zIndex: 0}} required>
        <DatePicker
          label="Date of Birth"
          disableFuture
          inputFormat="MM/dd/yyyy"
          value={formData.dob}
          onChange={handleDateChange}
          slotProps={{ textField: { variant: 'outlined' } }}
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
        
        <FormControl sx={{width:'30%',zIndex: 0}} variant="outlined" margin="normal" required>
          <InputLabel>Field</InputLabel>
          <Select value={formData.field} onChange={handleChange('field')} label="Field" >
            <MenuItem value={jobField}>{jobField}</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Educational Qualifications"
          variant="outlined"
          fullWidth
          multiline
          required
          sx={{zIndex: 0}}
          rows={6}
          value={formData.educationalQualifications}
          onChange={handleChange('educationalQualifications')}
          margin="normal"
        />
        {validationErrors.educationalQualifications && (
          <Typography color="error">{validationErrors.educationalQualifications}</Typography>
        )}

        {eduDetails === 'ol' && (
          <div>
            <Typography variant='h6' gutterBottom>
                O/L Grades
            </Typography>
            <div style={{ display: 'flex',flexDirection: 'row', gap: '20px'}}>
            {olSubjects.map((subject,index)=>{
              return(
                <div key={index}>
                <Typography sx={{zIndex: 0}}>{subject}</Typography>
                <TextField
                  variant='outlined'
                  required
                  sx={{zIndex: 0}}
                  value={formData.olGrades[index]}
                  onChange={(event) => handleGradeChange(event, index, 'ol')}
                  margin='normal'
                />
                </div>
              )
            })}
            </div>
          </div>
        )}

        {eduDetails === 'al' && (
          <div>
            <Typography variant='body1' gutterBottom>
                A/L Grades
            </Typography>
            <div style={{ display: 'flex',flexDirection: 'row', gap: '20px'}}>
            {alSubjects.map((subject,index)=>{
              return(
                <div key={index}>
                <Typography sx={{justifyContent:'center', zIndex: 0}} >{subject}</Typography>
                <TextField
                  variant='outlined'
                  required
                  sx={{zIndex: 0}}
                  value={formData.alGrades[index]}
                  onChange={(event) => handleGradeChange(event, index, 'al')}
                  margin='normal'
                  //ccc
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
            <Button variant="outlined" color="secondary" onClick={handleRemoveFile}>
              Remove
            </Button>
          </div>
        )}
        </div>

        <div>
          <Typography variant="body2" color="textSecondary">
            Please choose a zip file not exceeding 5MB with your CV,NIC copy,Birth Certificate & Educational Certificates(If needed) 
          </Typography>
          {!formData.cvFileDataUrl && (
          <input
            id='fileInput'
            type="file"
            accept=".zip"
            required
            onChange={handleFileChange}
            style={{ margin: '8px 0'}} 
            //cursor: fileDropped ? 'not-allowed' : 'pointer'
            //disabled={fileDropped}
          />
          )}
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
