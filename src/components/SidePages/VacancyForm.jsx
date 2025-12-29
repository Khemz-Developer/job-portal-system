import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../authContext';

const VacancyForm = () => {
    const {authData} = useAuth();
    const token = authData.token;

    const [formData, setFormData] = useState({
        jobField: '',
        jobPosition: '',
        jobDescription: '',
        salary:'',
        dueDate: null,
        workLocation:'',
        workType:'',
        workMethod:'',
        requiredSkills:[],
        tempSkill: '',
        educationalQualifications: '',
        olSubjects: [],
        alSubjects: [],
        undergraduate: false,
        postgraduate: false,

      });
  
  
      const [validationErrors, setValidationErrors] = useState({
        jobField: '',
        jobPosition: '',
        jobDescription: '',
        salary:'',
        dueDate: '',
        workLocation:'',
        workType:'',
        workMethod:'',
        requiredSkills:'',
        educationalQualifications: '',
      });
  
      const handleChange = (field) => (event) => {
        let value = event.target.value;
        if(field ==='salary' ){
          // Convert the value to a number
          value = parseFloat(value);

          // Ensure it's a valid number
          if (isNaN(value)) {
            // Handle the case where the value is not a valid number
            // You can set it to 0 or show an error message
            value = 0;
          }
        }
        
        // Handle special case for requiredSkills
        if (field === 'requiredSkills') {
          value = value.split('\n').map(skill => skill.trim());
        }

        setFormData({ ...formData, [field]: value });
    
        // Validate the field when the user starts typing
        validateField(field,value);
      };

      const handleDateChange = (date) => {
        setFormData({ ...formData, dueDate:date });
        
      };
      
      const validateField = (field, value) => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
      }

      const handleCheckboxChange = (qualification) => () => {
        setFormData((prevFormData) => {
          // Reset data associated with the unchecked option
          const updatedFormData = {
            ...prevFormData,
            educationalQualifications: qualification,
          };
      
          // If unchecking 'O/L' or 'A/L', reset the subjects array
          if (qualification !== 'ol') {
            updatedFormData.olSubjects = [];
          }
          if (qualification !== 'al') {
            updatedFormData.alSubjects = [];
          }
      
          return updatedFormData;
        });
      };
      
      const handleAddSkill = () => {
        if (formData.tempSkill.trim() !== '') {
          setFormData((prevData) => ({
            ...prevData,
            requiredSkills: [...prevData.requiredSkills, prevData.tempSkill.trim()],
            tempSkill: '', // Clear the temporary skill
          }));
        }
      };
      
      const handleAddSubject = () => {
        const maxSubjects =
          formData.educationalQualifications === 'ol' ? 6 : 3;
    
        if (formData[formData.educationalQualifications + 'Subjects'].length < maxSubjects) {
          setFormData((prevData) => ({
            ...prevData,
            [formData.educationalQualifications + 'Subjects']: [
              ...prevData[formData.educationalQualifications + 'Subjects'],
              '',
            ],
          }));
        }
      };

      const handleSubjectChange = (qualification, index) => (event) => {
        const value = event.target.value;
        setFormData((prevData) => ({
          ...prevData,
          [qualification + 'Subjects']: prevData[qualification + 'Subjects'].map(
            (subject, i) => (i === index ? value : subject)
          ),
        }));
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
          'jobField',
          'jobPosition',
          'jobDescription',
          'salary',
          'dueDate',
          'workLocation',
          'workType',
          'workMethod',
          'requiredSkills',
          'educationalQualifications',
        ];

        const missingFields = requiredFields.filter((field) => !formData[field]);

        if (missingFields.length > 0) {
          alert(`Some fields need to be filled`);
          return;
        }

        try{
          const headers = {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          };
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/vacancies/create`,formData,headers);
          window.location.reload();
          if(response.status===201){
            console.log('Form Data:', formData);
            alert('Job Vacancy successfully created');
            console.log(response.data);
          }
        }catch(error){
            console.log(error);
            alert('Unsuccessful.Please try again');

        }
        // Handle form submission logic, e.g., sending data to a server
        
        // Add logic to send data to the server or perform other actions
      };
  
      // // Function to split the skills into an array
      // const getSkillsArray = () => {
      //   return formData.requiredSkills.split('\n').map(skill => skill.trim());
      // };
      
    return (
    <Container>
      <Paper elevation={4} component={Box} p={4}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        Vacancy Creation Form
      </Typography>
      <form onSubmit={handleSubmit}>

        <div style={{ display: 'flex',flexDirection: 'row', gap: '30px'}}>
        <FormControl sx={{width:'50%',zIndex: 0}} variant="outlined" margin="normal"  required>
          <InputLabel>Job Field</InputLabel>
          <Select value={formData.jobField} onChange={handleChange('jobField')} label="Job Field">
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Telecommunication">Telecommunication</MenuItem>
            <MenuItem value="Software">Software </MenuItem>
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
          label="Salary(Rs.)"
          variant="outlined"
          type='number'
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
          disablePast
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
          rows={3}
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
            <MenuItem value="Full-Time">Full-time</MenuItem>
            <MenuItem value="Part-Time">Part-time</MenuItem>
          </Select>
        </FormControl>


        <FormControl variant="outlined" margin="normal" style={{width:'50%',zIndex: 0}} required> 
          <InputLabel>Working Method</InputLabel>
          <Select value={formData.workMethod} onChange={handleChange('workMethod')} label="Work Method">
            <MenuItem value="OnSite">On-Site</MenuItem>
            <MenuItem value="Work from Home">Work from Home</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
          </Select>
        </FormControl>
        </div>
        <br></br>
        <div style={{ border: '1px solid #d3d3d3', padding: '10px'}}>
        <div>
        <TextField
          label="Enter Required Skills Here" 
          variant="outlined"
          fullWidth
          sx={{zIndex: 0}}
          value={formData.tempSkill}
          onChange={handleChange('tempSkill')}
          margin="normal"
        />
        </div>
        <button type="button" onClick={handleAddSkill}>
        Add Skill
        </button>  
        {/* Display the skills as a bulleted list */}
        
        <ul>
          {formData.requiredSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
       
        {validationErrors.requiredSkills && (
          <Typography color="error">{validationErrors.requiredSkills}</Typography>
        )}
        </div>
        
      <br></br> 
      <br></br> 
      <div style={{ border: '1px solid #d3d3d3', padding: '10px'}}>
      <h6>Minimum Required Educational Qualifications*</h6>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.educationalQualifications==='ol'}
              onChange={handleCheckboxChange('ol')}
            />
          }
          label="O/L"
        />
        {formData.educationalQualifications ==='ol' && (
          <div>
            {formData.olSubjects.map((subject, index) => (
              <div key={index} style={{ marginTop: '10px' }}>
                <TextField
                  label={`O/L Subject ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={subject}
                  onChange={handleSubjectChange('ol', index)}
                />
                
              </div>
              
            ))}
            <button type="button" onClick={handleAddSubject}>Add O/L Subject</button>
          </div>
        )}
      </FormGroup>

      <FormGroup >
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.educationalQualifications==='al'}
              onChange={handleCheckboxChange('al')}
            />
          }
          label="A/L"
        />
        {formData.educationalQualifications==='al' && (
          <div>
            {formData.alSubjects.map((subject, index) => (
              <div key={index} style={{ marginTop: '10px' }}>
                <TextField
                  label={`A/L Subject ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={subject}
                  onChange={handleSubjectChange('al', index)}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddSubject}>Add A/L Subject</button>
          </div>
        )}
      </FormGroup>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.educationalQualifications==='Undergraduate'}
              onChange={handleCheckboxChange('Undergraduate')}
            />
          }
          label="Undergraduate"
        />
      </FormGroup>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.educationalQualifications==='Postgraduate'}
              onChange={handleCheckboxChange('Postgraduate')}
            />
          }
          label="Postgraduate"
        />
      </FormGroup>

      {validationErrors.educationalQualifications && (
        <Typography color="error">
          {validationErrors.educationalQualifications}
        </Typography>
      )}
      <hr></hr>
      <Typography style={{ marginTop: '20px' }}>
            Selected Educational Qualifications:
            <br></br>
      </Typography>
            {formData.educationalQualifications && (
              <div>
                <Typography>
                  {formData.educationalQualifications === 'ol' && 'O/L'}
                  {formData.educationalQualifications === 'al' && 'A/L'}
                  {formData.educationalQualifications === 'Undergraduate' && 'Undergraduate'}
                  {formData.educationalQualifications === 'Postgraduate' && 'Postgraduate'}
                </Typography>

                {/* Display subjects if O/L or A/L is selected */}
                {['ol', 'al'].includes(formData.educationalQualifications) && (
                  <div>
                    <Typography variant="subtitle1">Subjects:</Typography>
                    {formData[formData.educationalQualifications + 'Subjects'].map((subject, index) => (
                      <Typography key={index}>
                        {formData.educationalQualifications === 'ol' && ` Subject ${index + 1}: ${subject}`}
                        {formData.educationalQualifications === 'al' && ` Subject ${index + 1}: ${subject}`}
                      </Typography>
                    ))}
                  </div>
                )}
              </div>
            )}
      
      </div>

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
