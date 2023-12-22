import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../authContext';
const UpdateVacancyForm = ({vacancyData, onCancel, onUpdate}) => {
    const {authData} = useAuth();
    const token = authData.token;
    
    const [editedData,setEditedData] = useState({...vacancyData});

    const [validationErrors, setValidationErrors] = useState({
        jobField: '',
        jobPosition: '',
        jobDescription: '',
        salary:'',
        // dueDate: '',
        workLocation:'',
        workType:'',
        workMethod:'',
        requiredSkills:'',
        educationQualifications: '',
      });
    
    const handleChange = (field)=>(event)=>{
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

        setEditedData({ ...editedData, [field]: value });
        // Validate the field when the user starts typing
        validateField(field,value);
    }
    
    // const handleDateChange = (date) => {

    //  // Ensure that date is a valid Date object
    //     if (date instanceof Date && !isNaN(date)) {
    //         setEditedData({ ...editedData, dueDate: date });
    //     } else {
    //         // Handle the case where date is not a valid Date object
    //         console.error("Invalid date:", date);
    //     }
    // };

    const validateField = (field, value) => {

        setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));

    };

    const handleCheckboxChange = (qualification) => () => {
        setEditedData((prevEditedData) => {
          // Reset data associated with the unchecked option
          const updatedEditedData = {
            ...prevEditedData,
            educationalQualifications: qualification,
          };
      
          // If unchecking 'O/L' or 'A/L', reset the subjects array
          if (qualification !== 'ol') {
            updatedEditedData.olSubjects = [];
          }
          if (qualification !== 'al') {
            updatedEditedData.alSubjects = [];
          }
      
          return updatedEditedData;
        });
    };
      
    const handleAddSkill = () => {
        if (editedData.tempSkill.trim() !== '') {
          setEditedData((prevData) => ({
            ...prevData,
            requiredSkills: [...prevData.requiredSkills, prevData.tempSkill.trim()],
            tempSkill: '', // Clear the temporary skill
          }));
        }
    };

    const handleRemoveSkill = (index) => () => {
        setEditedData((prevData) => {
            const updatedSkills = [...prevData.requiredSkills];
            updatedSkills.splice(index, 1); // Remove the skill at the specified index
            return {
                ...prevData,
                requiredSkills: updatedSkills,
            };
        });
    };

    const handleAddSubject = () => {
        const maxSubjects =
          editedData.educationalQualifications === 'ol' ? 6 : 3;
    
        if (editedData[editedData.educationalQualifications + 'Subjects'].length < maxSubjects) {
          setEditedData((prevData) => ({
            ...prevData,
            [editedData.educationalQualifications + 'Subjects']: [
              ...prevData[editedData.educationalQualifications + 'Subjects'],
              '',
            ],
          }));
        }
    };

    const handleSubjectChange = (qualification, index) => (event) => {
        const value = event.target.value;
        setEditedData((prevData) => ({
          ...prevData,
          [qualification + 'Subjects']: prevData[qualification + 'Subjects'].map(
            (subject, i) => (i === index ? value : subject)
          ),
        }));
    };

    const handleUpdate = async (event)=>{
        event.preventDefault();
    
        // Validate all fields before submission
        for (const field in editedData) {
          validateField(field, editedData[field]);
          
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
        //   'dueDate',
          'workLocation',
          'workType',
          'workMethod',
          'requiredSkills',
          'educationalQualifications',
        ];

        const missingFields = requiredFields.filter((field) => !editedData[field]);

        if (missingFields.length > 0) {
          alert(`Some fields need to be filled`);
          return;
        }

        // // Log the value of dueDate before setting it
        // console.log("Due Date Before Setting:", editedData.dueDate);

        try{
          const headers = {
                headers: {
                  Authorization: token ? `Bearer ${token}` : '',
                },
          };
          await axios.put(`http://localhost:3001/vacancies/edit/${editedData._id}`,editedData,headers);
          onUpdate();
        //   if(response.status===200){
        //     console.log('Form Data:', editedData);
        //     alert('Job Vacancy successfully updated');
        //   }
        }catch(error){
            console.log(error);
            // alert('Unsuccessful.Please try again');

        }
    }
    
    return(
    <Container>
        <Paper elevation={6} component={Box} p={4}>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                Edit Vacancy Details
            </Typography>
        <form onSubmit={handleUpdate}>

        <div style={{ display: 'flex',flexDirection: 'row', gap: '30px'}}>
        <FormControl sx={{width:'50%',zIndex: 0}} variant="outlined" margin="normal"  required>
            <InputLabel>Job Field</InputLabel>
            <Select value={editedData.jobField} onChange={handleChange('jobField')} label="Job Field">
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
            value={editedData.jobPosition}
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
            value={editedData.jobDescription}
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
            value={editedData.salary}
            onChange={handleChange('salary')}
            margin="normal"
        />
        {validationErrors.salary && (
            <Typography color="error">{validationErrors.salary}</Typography>
        )}

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl variant="outlined" margin="normal" required style={{width:'40%',zIndex: 0}}>
        <DatePicker
            label="Due Date"
            disablePast
            inputFormat="MM/dd/yyyy"
            value={(editedData.dueDate)}
            onChange={handleDateChange}
            slotProps={{ textField: { variant: 'outlined' } }}
        />
        </FormControl>
        </LocalizationProvider> */}
        </div>

        <TextField
            label="Work Location"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            required
            sx={{zIndex: 0}}
            value={editedData.workLocation}
            onChange={handleChange('workLocation')}
            margin="normal"
        />
        {validationErrors.workLocation && (
            <Typography color="error">{validationErrors.workLocation}</Typography>
        )}

        <div style={{ display: 'flex',flexDirection: 'row', gap: '30px'}}>
        <FormControl variant="outlined" margin="normal" style={{width:'50%',zIndex: 0}} required> 
            <InputLabel>Work Type</InputLabel>
            <Select value={editedData.workType} onChange={handleChange('workType')} label="Work Type">
            <MenuItem value="Full-Time">Full-time</MenuItem>
            <MenuItem value="Part-Time">Part-time</MenuItem>
            </Select>
        </FormControl>


        <FormControl variant="outlined" margin="normal" style={{width:'50%',zIndex: 0}} required> 
            <InputLabel>Working Method</InputLabel>
            <Select value={editedData.workMethod} onChange={handleChange('workMethod')} label="Work Method">
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
            value={editedData.tempSkill}
            onChange={handleChange('tempSkill')}
            margin="normal"
        />
        </div>
        <button type="button" onClick={handleAddSkill}>
            Add Skill
        </button>  

        {/* Display the skills as a bulleted list */}
        
        <ul>
            {editedData.requiredSkills.map((skill, index) => (
            <li key={index}>
                {skill} &nbsp; &nbsp;
                <button type="button" onClick={handleRemoveSkill(index)}>
                    Remove
                </button>
            </li>
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
                checked={editedData.educationalQualifications==='ol'}
                onChange={handleCheckboxChange('ol')}
            />
            }
            label="O/L"
        />
        {editedData.educationalQualifications ==='ol' && (
            <div>
            {editedData.olSubjects.map((subject, index) => (
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
                checked={editedData.educationalQualifications==='al'}
                onChange={handleCheckboxChange('al')}
            />
            }
            label="A/L"
        />
        {editedData.educationalQualifications==='al' && (
            <div>
            {editedData.alSubjects.map((subject, index) => (
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
                checked={editedData.educationalQualifications==='Undergraduate'}
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
                checked={editedData.educationalQualifications==='Postgraduate'}
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
            {editedData.educationalQualifications && (
                <div>
                <Typography>
                    {editedData.educationalQualifications === 'ol' && 'O/L'}
                    {editedData.educationalQualifications === 'al' && 'A/L'}
                    {editedData.educationalQualifications === 'Undergraduate' && 'Undergraduate'}
                    {editedData.educationalQualifications === 'Postgraduate' && 'Postgraduate'}
                </Typography>

                {/* Display subjects if O/L or A/L is selected */}
                {['ol', 'al'].includes(editedData.educationalQualifications) && (
                    <div>
                    <Typography variant="subtitle1">Subjects:</Typography>
                    {editedData[editedData.educationalQualifications + 'Subjects'].map((subject, index) => (
                        <Typography key={index}>
                        {editedData.educationalQualifications === 'ol' && ` Subject ${index + 1}: ${subject}`}
                        {editedData.educationalQualifications === 'al' && ` Subject ${index + 1}: ${subject}`}
                        </Typography>
                    ))}
                    </div>
                )}
                </div>
            )}
        
        </div>

        <div style={{ textAlign: 'center'}}>
        <br></br>
        <Button type="submit" variant="contained" color="primary" sx={{margin:'20px'}} >
            Update
        </Button>
        <Button variant="contained" onClick={onCancel} color='secondary'>
            Cancel
        </Button>
        </div>
        </form>
    </Paper>
  </Container>
)}

export default UpdateVacancyForm
